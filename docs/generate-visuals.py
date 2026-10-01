# [Instinct] Regenerate static explanatory visuals from saved summary data; no model calls or external dependencies.
from pathlib import Path
import json
from html import escape
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'docs'
INK='#251f21';SECOND='#585254';TEAL='#73a89a';RULE='#eae9ea';BG='#ffffff'
def text(x,y,s,size=20,weight=400,color=INK):return f'<text x="{x}" y="{y}" font-family="Arial, sans-serif" font-size="{size}" font-weight="{weight}" fill="{color}">{escape(s)}</text>'
def wrap(title,body,w,h):return f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" role="img"><title>{escape(title)}</title><rect width="{w}" height="{h}" fill="{BG}"/>{body}</svg>\n'
s=json.loads((ROOT/'experiments/09-v3-hard/results/v3hard-all-summary.json').read_text())
g=json.loads((ROOT/'experiments/14-crossmodel-groq/results/s14-summary.json').read_text())
A=['split-reason-first','split-answer-first','combined'];labels=['Reason-first','Answer-first','Combined'];sc={a['arm']:a['keyMatches'] for a in s['arms']}
assert [sc[a] for a in A]==[12,21,14]
assert [g['arms'][a]['keyMatch'] for a in A]==[14,11,11]
b=text(36,46,'Wrong-key matches on the hard bank',28,600)+text(36,78,'Observed counts out of 25 per format. One sample per question/format.',17,color=SECOND)
b+='<rect x="36" y="102" width="16" height="16" fill="'+INK+'"/>'+text(62,116,'S09 Gemini',17)+'<rect x="250" y="102" width="16" height="16" fill="'+TEAL+'"/>'+text(276,116,'S14 GPT-OSS',17)
for n in [0,5,10,15,20,25]:
 x=230+n*22;b+=f'<line x1="{x}" y1="151" x2="{x}" y2="426" stroke="{RULE}"/>'+text(x-5,450,str(n),15,color=SECOND)
for i,a in enumerate(A):
 y=173+i*86;b+=text(36,y+28,labels[i],20,600)
 for j,v in enumerate([sc[a],g['arms'][a]['keyMatch']]):
  yy=y+j*30;b+=f'<rect x="230" y="{yy}" width="{v*22}" height="23" fill="{[INK,TEAL][j]}"/>'+text(238+v*22,yy+19,f'{v}/25',17,600)
b+=text(36,488,'S14 combined: reviewed 11/25; raw strict parser 9/25.',17,600)+text(36,518,'Same bank, different provider/settings. Not a causal effect estimate.',17,color=SECOND)
(OUT/'hard-bank-key-matches.svg').write_text(wrap('Reviewed key matches by format: S09 12,21,14; S14 14,11,11 out of 25.',b,900,550))
b=text(30,44,'One answer/confession pair',28,600)+text(30,76,'Paired format tests. S10 is answer-only; S11 omits the visible key.',17,color=SECOND)
boxes=[(30,'Fresh prompt',['Problem + visible wrong key','Instruction + incentive','Requested output format']),(315,'Call 1: answer',['Save raw answer + usage','Audit actual JSON order','Do not reuse other rows']),(600,'Call 2: confession',['Carry this prompt + answer','Ask about reference use','Save raw reply + usage'])]
for x,title,lines in boxes:
 b+=f'<rect x="{x}" y="119" width="255" height="169" rx="8" fill="#fbfaf9" stroke="{RULE}"/>'+text(x+17,152,title,20,600)
 for i,l in enumerate(lines):b+=text(x+17,187+i*31,l,16)
for x in [291,576]:b+=f'<path d="M{x} 199h17m-6-5 6 5-6 5" fill="none" stroke="{INK}" stroke-width="2"/>'
b+=f'<path d="M727 288v29H442v26" fill="none" stroke="{INK}" stroke-width="2"/>'
b+=f'<rect x="220" y="348" width="440" height="87" rx="8" fill="#ffffff" stroke="{TEAL}" stroke-width="2"/>'+text(243,383,'Offline review: match, correctness, admission',17,600)+text(243,414,'Raw evidence stays unchanged; revisions get a ledger.',16,color=SECOND)
b+=text(30,476,'25 questions x 3 formats = 75 pairs = 150 nominal successful calls.',19,600)+text(30,507,'Failures and diagnostics add attempts, not usable pairs. No Monitor call here.',16,color=SECOND)
(OUT/'answer-confession-flow.svg').write_text(wrap('A fresh prompt, answer call, confession call with same history, then offline review.',b,900,540))
print('Wrote two static SVGs from saved sources')
