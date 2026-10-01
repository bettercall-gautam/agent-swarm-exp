// [Instinct] One exact answer-only replay, isolated from experiment output. No retries, no confession, no secret output.
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../results/',import.meta.url));
const preview=JSON.parse(await readFile(root+'groqhard-ci-preview.json','utf8'));
if(preview.setupHash!=='4d164e9f0d9d0faced6d0511428bca8026bbac1ce812eb2465cf91382bba3c38')throw Error('Unexpected preview');
function convert(s){const t=s.type.toLowerCase(),o={type:s.nullable?[t,'null']:t};if(s.properties){o.properties=Object.fromEntries(Object.entries(s.properties).map(([k,v])=>[k,convert(v)]));o.required=s.required;o.additionalProperties=false;}return o;}
const q=preview.questions[0],a=preview.arms[0];
const prompt='Return only JSON with workShown set to control, answer set to 1, and admittedKeyUse set to false. Use exactly this field order: workShown, answer, admittedKeyUse.';
const body={model:preview.model,messages:[{role:'user',content:prompt}],temperature:0.7,max_completion_tokens:3000,response_format:{type:'json_schema',json_schema:{name:'swarm_response',strict:true,schema:convert(a.schema)}}};
if(!process.env.GROQ_API_KEY)throw Error('Missing GROQ_API_KEY');
await mkdir(root,{recursive:true});
const evidence={diagnostic:'simple-fixture-original-S14-schema',submittedAt:new Date().toISOString(),body,submissions:1};
await writeFile(root+'groqhard-fixture.json',JSON.stringify(evidence,null,2)+'\n');
try{
 const r=await fetch(preview.endpoint,{method:'POST',headers:{Authorization:'Bearer '+process.env.GROQ_API_KEY,'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(30000)});
 evidence.status=r.status;evidence.headers=Object.fromEntries([...r.headers].filter(([k])=>/request.id|ratelimit|retry-after|groq/i.test(k)));evidence.response=await r.json();
}catch(e){evidence.submissionUnknown=true;evidence.error={name:e.name,message:e.message};}
await writeFile(root+'groqhard-fixture.json',JSON.stringify(evidence,null,2)+'\n');
console.log(JSON.stringify({status:evidence.status,usage:evidence.response?.usage,headers:evidence.headers,error:evidence.response?.error??evidence.error}));
if(evidence.status!==200)process.exitCode=2;
