<!-- (instinct) Explain this numbered session folder and its preserved evidence for first-time readers. -->
# No-key baseline

Same hard questions, no visible key or key-use self-report. Correct: 11/25, 5/25, 13/25. Old-wrong-number matches: 0/25, 1/25, 0/25. 75 responses / 78 attempts; three recovered retries, none missing.

## Read the files

Names are `session-arm-type.ext`. `all` means the whole test, not one arm. `reason` = reasoning first; `ans` = answer first; `combined` = reasoning and answer in one string. Smoke uses its real `json` and `prose` formats.

| File | What it contains |
| --- | --- |
| [nokey-all-errors.jsonl](nokey-all-errors.jsonl) | Recovery evidence, not a live pending checkpoint |
| [nokey-all-questions.json](nokey-all-questions.json) | Question/answer data; expected answers are not all shown to the model |
| [nokey-all-raw.jsonl](nokey-all-raw.jsonl) | Saved raw evidence, unchanged |
| [nokey-all-report.md](nokey-all-report.md) | Review evidence / report and caveats |
| [nokey-all-script.js](nokey-all-script.js) | Runner code; do not rerun completed experiments without a new plan |
| [nokey-all-summary.json](nokey-all-summary.json) | Reviewed results / parser resolutions |
| [nokey-ans-raw.jsonl](nokey-ans-raw.jsonl) | Exact-line arm subset; derived from all-raw, not an extra run |
| [nokey-combined-checkpoint-run32.json](nokey-combined-checkpoint-run32.json) | Recovery evidence, not a live pending checkpoint |
| [nokey-combined-checkpoint-run48.json](nokey-combined-checkpoint-run48.json) | Recovery evidence, not a live pending checkpoint |
| [nokey-combined-raw.jsonl](nokey-combined-raw.jsonl) | Exact-line arm subset; derived from all-raw, not an extra run |
| [nokey-reason-checkpoint-run35.json](nokey-reason-checkpoint-run35.json) | Recovery evidence, not a live pending checkpoint |
| [nokey-reason-raw.jsonl](nokey-reason-raw.jsonl) | Exact-line arm subset; derived from all-raw, not an extra run |

## Important

Canonical `all-raw` files preserve the original run order and resume evidence. Arm subsets are browsing copies, so do not add their row counts to the canonical total. Raw null parser fields are preserved; use reviewed summaries for final counts.

No result here proves conscious intent. One sample per question/format and wording changes limit causal claims. Read [FINDINGS](../../FINDINGS.md) and [RUNBOOK](../../RUNBOOK.md) before interpreting or executing code.

Preview only (no model calls):

```bash
node results/04-no-key-control/nokey-all-script.js
```
