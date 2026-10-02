// [AI assistant] Restore reviewed same-mode evidence only; verify exact setup, identities, JSON, and a returned429 confession checkpoint. No model calls or secret access.
import {readdir,readFile,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('../results/',import.meta.url));
const mode=process.argv[3];if(!['smoke','full'].includes(mode))throw Error('Mode required');
const stem=mode==='smoke'?'groqhard-smoke':'groqhard-all';
async function walk(p){let o=[];for(const d of await readdir(p,{withFileTypes:true})){const f=path.join(p,d.name);o.push(...(d.isDirectory()?await walk(f):[f]));}return o;}
const files=await walk(process.argv[2]);
if(files.some(f=>/recovery\.json$|checkpoint\.json$/.test(f)))throw Error('Ambiguous recovery evidence');
const one=name=>{const a=files.filter(f=>path.basename(f)===name);if(a.length!==1)throw Error('Missing or ambiguous '+name);return a[0];};
const raw=await readFile(one(stem+'-raw.jsonl'),'utf8');if(raw&&!raw.endsWith('\n'))throw Error('Partial result row');
const rows=raw.trim()?raw.trim().split('\n').map(JSON.parse):[];
const preview=JSON.parse(await readFile(root+'groqhard-ci-preview.json','utf8'));
const sourcePreview=JSON.parse(await readFile(one('groqhard-ci-preview.json'),'utf8'));
if(sourcePreview.setupHash!==preview.setupHash)throw Error('Source setup mismatch');
const h=preview.setupHash,limit=mode==='smoke'?6:75;
if(rows.length>limit||new Set(rows.map(x=>x.run)).size!==rows.length)throw Error('Invalid rows');
function validateAnswer(raw,p){const a=JSON.parse(raw),arm=preview.arms.find(x=>x.arm===p.arm);if(JSON.stringify(Object.keys(a))!==JSON.stringify(arm.fieldOrder))throw Error('Answer order mismatch');if(arm.arm==='combined'){if(typeof a.response!=='string')throw Error('Invalid combined answer');}else if((a.answer!==null&&(typeof a.answer!=='number'||!Number.isFinite(a.answer)))||typeof a.workShown!=='string'||typeof a.admittedKeyUse!=='boolean')throw Error('Invalid split answer');}
for(const r of rows){const p=preview.plan[r.run-1];if(!Number.isInteger(r.run)||r.run<1||r.run>limit||r.setupHash!==h||r.questionId!==p.questionId||r.arm!==p.arm||!r.fieldOrderMatchesRequested)throw Error('Invalid result identity');validateAnswer(r.rawAnswer,p);const c=JSON.parse(r.rawConfession);if(Object.keys(c).length!==1||typeof c.response!=='string')throw Error('Invalid confession');}
const attemptText=await readFile(one(stem+'-attempts.jsonl'),'utf8');if(!attemptText.endsWith('\n'))throw Error('Partial attempt row');const attempts=attemptText.trim().split('\n').map(JSON.parse);
if(attempts.filter(x=>x.event==='received').length<rows.length*2)throw Error('Incomplete response evidence');
const pendingFiles=files.filter(f=>f.endsWith('.pending.json'));let pending=null;
if(pendingFiles.length){if(pendingFiles.length!==1||path.basename(pendingFiles[0])!==stem+'-raw.jsonl.pending.json')throw Error('Ambiguous pending');pending=JSON.parse(await readFile(pendingFiles[0],'utf8'));const p=preview.plan[pending.index];if(!Number.isInteger(pending.index)||pending.index<0||pending.index>=limit||rows.some(r=>r.run===pending.index+1)||pending.setupHash!==h||pending.questionId!==p.questionId||pending.arm!==p.arm||pending.status!=='confession-submitting'||pending.lastError?.status!==429||pending.lastError?.submissionUnknown||!pending.rawAnswer||pending.rawConfession)throw Error('Not a known confession429');validateAnswer(pending.rawAnswer,p);const last=attempts.at(-1);if(last.event!=='returned-error'||last.status!==429)throw Error('Last attempt not returned429');const answer=attempts.filter(x=>x.event==='received').at(-1);if(!answer||attempts.filter(x=>x.event==='received').length!==rows.length*2+1)throw Error('Ambiguous saved-answer usage');pending.answerUsage=answer.usage;pending.recoverySource={mode,sourceDirectory:process.argv[2],originalStatus:pending.status};}
// [AI assistant] Validate all source evidence before writes, then retain every attempt and pending payload.
await writeFile(root+stem+'-raw.jsonl',raw);await writeFile(root+stem+'-attempts.jsonl',attemptText);
if(pending)await writeFile(root+stem+'-raw.jsonl.pending.json',JSON.stringify(pending,null,2)+'\n');
console.log('Restored '+rows.length+' '+mode+' pairs'+(pending?' and saved-answer confession429':'')+'; no model calls.');
