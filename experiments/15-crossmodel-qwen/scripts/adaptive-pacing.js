// [AI assistant] Prepared only. Header-guided pacing estimates next TPM reservation; never claims an exact token count or daily-token budget.
export function durationMs(s){
 if(typeof s!=='string'||!s.trim())return null;
 if(/^\d+(?:\.\d+)?$/.test(s))return Math.ceil(Number(s)*1000);
 const units={ms:1,s:1000,m:60000,h:3600000,d:86400000};let total=0,used='';
 for(const m of s.matchAll(/(\d+(?:\.\d+)?)(ms|s|m|h|d)/g)){total+=Number(m[1])*units[m[2]];used+=m[0];}
 return used===s?Math.ceil(total):null;
}
export class AdaptivePacer{
 constructor({now=()=>Date.now(),minSpacingMs=4500,fallbackMs=65000}={}){this.now=now;this.min=minSpacingMs;this.fallback=fallbackMs;this.lastSubmission=null;this.state=null;this.samples={answer:[],confession:[]};}
 recordSubmission(){this.lastSubmission=this.now();}
 observe(headers,usage,kind){
  const get=k=>headers.get(k);const number=k=>{const s=get(k);return s!==null&&s!==''&&Number.isFinite(Number(s))?Number(s):null;};
  this.state={observedAt:this.now(),remainingTokens:number('x-ratelimit-remaining-tokens'),limitTokens:number('x-ratelimit-limit-tokens'),remainingDailyRequests:number('x-ratelimit-remaining-requests'),tokenResetMs:durationMs(get('x-ratelimit-reset-tokens')),dailyRequestResetMs:durationMs(get('x-ratelimit-reset-requests')),retryAfterMs:durationMs(get('retry-after'))};
  if(Number.isFinite(usage?.completion_tokens))this.samples[kind].push(usage.completion_tokens);
  return this.state;
 }
 estimate(messages,kind){
  // Characters are a rough input-token estimate, not a tokenizer. Estimate completion from same-phase responses, with headroom. Cap/prompt/history unchanged.
  const input=Math.ceil(messages.reduce((n,m)=>n+m.content.length,0)/3)+messages.length*12;
  const recent=this.samples[kind].slice(-10);const completion=recent.length?Math.ceil(Math.max(...recent)*1.25):(kind==='answer'?4000:300);
  return input+Math.min(8000,completion);
 }
 delayMs(messages,kind){
  const now=this.now(),spacing=this.lastSubmission===null?0:Math.max(0,this.min-(now-this.lastSubmission));const s=this.state;
  if(!s)return {waitMs:spacing,reason:'initial-minimum-spacing',estimate:this.estimate(messages,kind)};
  if(s.remainingDailyRequests!==null&&s.remainingDailyRequests<1)return {stop:true,reason:'daily-request-limit',resetMs:s.dailyRequestResetMs};
  const estimate=this.estimate(messages,kind),elapsed=now-s.observedAt;
  if(s.remainingTokens===null||s.tokenResetMs===null)return {waitMs:Math.max(spacing,this.lastSubmission===null?0:this.fallback-(now-this.lastSubmission)),reason:'missing-header-fallback',estimate};
  if(elapsed>=s.tokenResetMs)return {waitMs:spacing,reason:'token-reset-elapsed',estimate};
  if(s.remainingTokens>=estimate)return {waitMs:spacing,reason:'estimated-budget-available',estimate};
  return {waitMs:Math.max(spacing,s.tokenResetMs-elapsed+1000),reason:'await-token-reset',estimate};
 }
 retryDecision(status){const ms=this.state?.retryAfterMs;if(status!==429||ms===null||ms<0||ms>120000)return {stop:true,reason:'retry-unavailable-or-out-of-bounds'};return {waitMs:ms+1000,reason:'returned429-retry-after'};}
}
