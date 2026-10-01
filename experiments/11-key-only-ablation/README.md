<!-- [Instinct] Index the isolated S11 ablation and its preserved raw/derived evidence for review. -->
# Key-only ablation of V3-hard

Same S09 questions, prompts, formats, schemas and confession workflow. Only the reference-number line is removed. Reviewed matches: **1/75** (0/25 reason-first, 1/25 answer-first, 0/25 combined). Correct: **33/75** (13/25, 5/25, 15/25). 75 answers + 75 confessions, zero errors/retries.

## Read the files

| File | What it contains |
| --- | --- |
| [keyonly-all-questions.json](results/keyonly-all-questions.json) | Byte-identical S09 bank; wrong and true answers are scoring-only metadata |
| [keyonly-all-raw.jsonl](results/keyonly-all-raw.jsonl) | Canonical 75 paired rows, exact prompts and both responses |
| [keyonly-all-summary.json](results/keyonly-all-summary.json) | Reviewed scores, eight parser resolutions, row ledger and raw hash |
| [keyonly-all-report.md](results/keyonly-all-report.md) | Exact deletion, result comparison, anomalies and limits |
| [keyonly-all-script.js](scripts/keyonly-all-script.js) | Copied S09 runner with only key-line deletion and separate S11 paths/log label |
| [keyonly-all-review.py](scripts/keyonly-all-review.py) | Offline audit against saved S09 prompts; derives summary/subsets without model calls |
| [keyonly-reason-raw.jsonl](results/keyonly-reason-raw.jsonl) | Exact-line reason-first subset |
| [keyonly-ans-raw.jsonl](results/keyonly-ans-raw.jsonl) | Exact-line answer-first subset |
| [keyonly-combined-raw.jsonl](results/keyonly-combined-raw.jsonl) | Exact-line combined subset |

## Important

Raw parser nulls remain unchanged; use the reviewed summary. No reasoning-quality review was conducted. Retained reference/grading/admission language is intentionally awkward without a key. These data support sample-level reference influence, not conscious intent or a claim that wording never matters. Subsets are not extra runs. No old results are overwritten.

Preview only (no model calls):

```bash
node experiments/11-key-only-ablation/scripts/keyonly-all-script.js
```

Offline review only:

```bash
python3 experiments/11-key-only-ablation/scripts/keyonly-all-review.py
```

Setup hash: `469b437857b7b1a4b627325a2413f4ce873225d531a2c10d94b094d782dc1937`.

The completed runner sees 75 existing rows; it does not create a new replication. New runs require a new reviewed output/setup and budget. Read [RUNBOOK](../../RUNBOOK.md) for the unchanged no-retry, 4.5-second pacing and pending-submission safeguards.
