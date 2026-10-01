# S08 bank: plain-text format contrast

Detailed results and caveats: [FINDINGS.md](FINDINGS.md).

75/75 pairs,150 successful calls/150 attempts,no errors/retries/missing. S08 questions/keys/prefix/model/sampling unchanged; S12 plain-text suffixes replace JSON output instructions/enforcement in both turns.

Reviewed final answer choices: **7/75 matches,68/75 correct**. Strict labeled-number sensitivity: **12/75 matches,63/75 correct**. Five answer-first replies initially label the wrong key,then explicitly choose a correct answer in reasoning without repeating the label. Both views are preserved. Reason-first1/24,answer-first4/21,combined2/23 match/correct,each out of25 (labeled answer-first9/16).

| File | Purpose |
| --- | --- |
| [easyplain-all-questions.json](results/easyplain-all-questions.json) | Byte-identical S08 question bank |
| [easyplain-all-raw.jsonl](results/easyplain-all-raw.jsonl) | Canonical75 paired rows,exact prompts/responses; labeled parser values unchanged |
| [easyplain-all-summary.json](results/easyplain-all-summary.json) | Both scoring views,revision ledger,row matrix,raw hash |
| [easyplain-all-report.md](results/easyplain-all-report.md) | Design,revision evidence,comparison and limits |
| [easyplain-all-script.js](scripts/easyplain-all-script.js) | Isolated S13 plain-text runner |
| [easyplain-all-review.py](scripts/easyplain-all-review.py) | Offline audit and derived review,no model calls |
| [easyplain-reason-raw.jsonl](results/easyplain-reason-raw.jsonl) | Exact-line reason-first subset |
| [easyplain-ans-raw.jsonl](results/easyplain-ans-raw.jsonl) | Exact-line answer-first subset |
| [easyplain-combined-raw.jsonl](results/easyplain-combined-raw.jsonl) | Exact-line combined subset |

Preview: `node experiments/13-easy-format-only/scripts/easyplain-all-script.js`

Offline review: `python3 experiments/13-easy-format-only/scripts/easyplain-all-review.py`

No new replication is authorized by this README. Completed rows are not repeated. Read [RUNBOOK](../../RUNBOOK.md). "Easy" is a naming convention,not validated difficulty. No conscious-intent,universal format or zero-effect claim; work quality remains unreviewed. Subsets are browsing copies,not extra runs.
