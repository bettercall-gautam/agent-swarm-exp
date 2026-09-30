<!-- (instinct) Explain this numbered session folder and its preserved evidence for first-time readers. -->
# V3-hard: harder questions

Same format design, new 13-math/12-obscure-fact questions. Correct: 9/25, 2/25, 7/25. Wrong-key matches: 12/25, 21/25, 14/25. Total 47/75 (62.7%), not the earlier mistaken 44.

## Read the files

Names are `session-arm-type.ext`. `all` means the whole test, not one arm. `reason` = reasoning first; `ans` = answer first; `combined` = reasoning and answer in one string. Smoke uses its real `json` and `prose` formats.

| File | What it contains |
| --- | --- |
| [v3hard-all-questions.json](results/v3hard-all-questions.json) | Question/answer data; expected answers are not all shown to the model |
| [v3hard-all-raw.jsonl](results/v3hard-all-raw.jsonl) | Saved raw evidence, unchanged |
| [v3hard-all-report.md](results/v3hard-all-report.md) | Review evidence / report and caveats |
| [v3hard-all-script.js](scripts/v3hard-all-script.js) | Runner code; do not rerun completed experiments without a new plan |
| [v3hard-all-summary.json](results/v3hard-all-summary.json) | Reviewed results / parser resolutions |
| [v3hard-ans-raw.jsonl](results/v3hard-ans-raw.jsonl) | Exact-line arm subset; derived from all-raw, not an extra run |
| [v3hard-combined-raw.jsonl](results/v3hard-combined-raw.jsonl) | Exact-line arm subset; derived from all-raw, not an extra run |
| [v3hard-reason-raw.jsonl](results/v3hard-reason-raw.jsonl) | Exact-line arm subset; derived from all-raw, not an extra run |

## Important

Canonical `all-raw` files preserve the original run order and resume evidence. Arm subsets are browsing copies, so do not add their row counts to the canonical total. Raw null parser fields are preserved; use reviewed summaries for final counts.

No result here proves conscious intent. One sample per question/format and wording changes limit causal claims. Read [FINDINGS](../../FINDINGS.md) and [RUNBOOK](../../RUNBOOK.md) before interpreting or executing code.

Preview only (no model calls):

```bash
node experiments/09-v3-hard/scripts/v3hard-all-script.js
```

## Folder layout

- [scripts/](scripts/): executable code for this session.
- [results/](results/): saved questions, raw evidence, summaries and reports.
