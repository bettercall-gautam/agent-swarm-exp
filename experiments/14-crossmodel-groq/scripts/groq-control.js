// [AI assistant] One exact answer-only replay, isolated from experiment output. No retries, no confession, no secret output.
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../results/',import.meta.url));
const preview=JSON.parse(await readFile(root+'groqhard-ci-preview.json','utf8'));
if(preview.setupHash!=='4d164e9f0d9d0faced6d0511428bca8026bbac1ce812eb2465cf91382bba3c38')throw Error('Unexpected preview');
function convert(s){const t=s.type.toLowerCase(),o={type:s.nullable?[t,'null']:t};if(s.properties){o.properties=Object.fromEntries(Object.entries(s.properties).map(([k,v])=>[k,convert(v)]));o.required=s.required;o.additionalProperties=false;}return o;}
const q=preview.questions[0],a=preview.arms[0];
const prompt=a.promptTemplate.replace('{{QUESTION}}',q.problem).replace('{{LEAKED_KEY}}',q.forbiddenAnswer);
// [AI assistant] Published Groq product-review control, changing model20b to120b and retaining the S14 temp/cap. Not experiment data.
const body={model:'openai/gpt-oss-120b',messages:[{role:'system',content:'Extract product review information from the text.'},{role:'user',content:"I bought the UltraSound Headphones last week and I'm really impressed! The noise cancellation is amazing and the battery lasts all day. Sound quality is crisp and clear. I'd give it 4.5 out of 5 stars."}],temperature:0.7,max_completion_tokens:3000,response_format:{type:'json_schema',json_schema:{name:'product_review',strict:true,schema:{type:'object',properties:{product_name:{type:'string'},rating:{type:'number'},sentiment:{type:'string',enum:['positive','negative','neutral']},key_features:{type:'array',items:{type:'string'}}},required:['product_name','rating','sentiment','key_features'],additionalProperties:false}}}};
if(!process.env.GROQ_API_KEY)throw Error('Missing GROQ_API_KEY');
await mkdir(root,{recursive:true});
const evidence={diagnostic:'published-product-review-120b-control',submittedAt:new Date().toISOString(),body,submissions:1};
await writeFile(root+'groqhard-control.json',JSON.stringify(evidence,null,2)+'\n');
try{
 const r=await fetch(preview.endpoint,{method:'POST',headers:{Authorization:'Bearer '+process.env.GROQ_API_KEY,'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(30000)});
 evidence.status=r.status;evidence.headers=Object.fromEntries([...r.headers].filter(([k])=>/request.id|ratelimit|retry-after|groq/i.test(k)));evidence.response=await r.json();
}catch(e){evidence.submissionUnknown=true;evidence.error={name:e.name,message:e.message};}
await writeFile(root+'groqhard-control.json',JSON.stringify(evidence,null,2)+'\n');
console.log(JSON.stringify({status:evidence.status,usage:evidence.response?.usage,headers:evidence.headers,error:evidence.response?.error??evidence.error}));
if(evidence.status!==200)process.exitCode=2;
