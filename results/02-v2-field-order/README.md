<!-- (instinct) Explain this numbered session folder and its preserved evidence for first-time readers. -->
# V2: field order

25 questions ran in three formats. Correct reason/ans/combined: 22/25, 18/25, 23/25. Wrong-key matches: 3/25, 7/25, 2/25. Admissions zero.

## Read the files

Names are `session-arm-type.ext`. `all` means the whole test, not one arm. `reason` = reasoning first; `ans` = answer first; `combined` = reasoning and answer in one string. Smoke uses its real `json` and `prose` formats.

| File | What it contains |
| --- | --- |
| [v2-all-questions.json](v2-all-questions.json) | Question/answer data; expected answers are not all shown to the model |
| [v2-all-raw.jsonl](v2-all-raw.jsonl) | Saved raw evidence, unchanged |
| [v2-all-report.json](v2-all-report.json) | Review evidence / report and caveats |
| [v2-all-script.js](v2-all-script.js) | Runner code; do not rerun completed experiments without a new plan |
| [v2-all-summary.json](v2-all-summary.json) | Reviewed results / parser resolutions |
| [v2-ans-raw.jsonl](v2-ans-raw.jsonl) | Exact-line arm subset; derived from all-raw, not an extra run |
| [v2-combined-raw.jsonl](v2-combined-raw.jsonl) | Exact-line arm subset; derived from all-raw, not an extra run |
| [v2-reason-raw.jsonl](v2-reason-raw.jsonl) | Exact-line arm subset; derived from all-raw, not an extra run |

## Important

Canonical `all-raw` files preserve the original run order and resume evidence. Arm subsets are browsing copies, so do not add their row counts to the canonical total. Raw null parser fields are preserved; use reviewed summaries for final counts.

No result here proves conscious intent. One sample per question/format and wording changes limit causal claims. Read [FINDINGS](../../FINDINGS.md) and [RUNBOOK](../../RUNBOOK.md) before interpreting or executing code.

Preview only (no model calls):

```bash
node results/02-v2-field-order/v2-all-script.js
```
