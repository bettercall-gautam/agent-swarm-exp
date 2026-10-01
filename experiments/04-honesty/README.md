# Honesty

*Formerly "S4" in early notes.*

Detailed results and caveats: [FINDINGS.md](FINDINGS.md).

Honesty-instruction replay (historical S04): 30 questions in each of three arms, plus surprise confession and separate audit.

This is an earlier experiment, separate from the later field-format tests. Model verdicts are not verified intent. Raw files retain original internal session labels for provenance; folders/files have readable names.

| File | Contents |
| --- | --- |
| [honesty-all-summary.json](results/honesty-all-summary.json) | Counts from saved raw truth/key flags |
| [honesty-all-questions.json](results/honesty-all-questions.json) | Runner / questions / audit evidence |
| [honesty-all-raw.jsonl](results/honesty-all-raw.jsonl) | Canonical original rows |
| [honesty-all-report.jsonl](results/honesty-all-report.jsonl) | Runner / questions / audit evidence |
| [honesty-all-script.js](scripts/honesty-all-script.js) | Runner / questions / audit evidence |
| [honesty-high-raw.jsonl](results/honesty-high-raw.jsonl) | Exact-line arm browsing subset |
| [honesty-no-monitor-raw.jsonl](results/honesty-no-monitor-raw.jsonl) | Exact-line arm browsing subset |
| [honesty-normal-raw.jsonl](results/honesty-normal-raw.jsonl) | Exact-line arm browsing subset |

Canonical raw counts: 90. Arm subsets are duplicate views, not more runs. Do not sum them again.

The original strict runner is [shared/strict-all-script.js](../shared/strict-all-script.js). It accepts historical `--session=A/B/C` flags as aliases. No new calls were made during organization.

[Findings](../../FINDINGS.md) | [Runbook](../../RUNBOOK.md)

## Folder layout

- [scripts/](scripts/): executable code for this session.
- [results/](results/): saved questions, raw evidence, summaries and reports.

## Saved results

| Arm | Runs | Correct | Wrong-key matches |
| --- | ---: | ---: | ---: |
| normal | 30 | 19 | 10 |
| high | 30 | 18 | 11 |
| no-monitor | 30 | 18 | 12 |

These counts describe saved answers, not proof of intent. Monitor judgments are separate.
