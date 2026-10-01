# Plain-text format contrast with S09

Detailed results and caveats: [FINDINGS.md](FINDINGS.md).

S09's visible keys, 25 questions, three ordered arms, model and temperatures remain. Only output instructions/API JSON enforcement change; confession remains the same question with a plain-text reply.

**74/75 usable pairs; 45/74 key-matches; 23/74 correct.** Run18 M06 answer-first is missing, not incorrect. Reason-first: 11/25 matches,11/25 correct; answer-first: 21/24,3/24; combined:13/25,9/25. 148 successful calls / 157 submissions, nine 504 failures including a disclosed unintended extra run18 attempt.

| File | Purpose |
| --- | --- |
| [plaintext-all-questions.json](results/plaintext-all-questions.json) | Byte-identical S09 bank |
| [plaintext-all-raw.jsonl](results/plaintext-all-raw.jsonl) | Canonical 74 pairs, actual append order and exact responses/prompts |
| [plaintext-all-summary.json](results/plaintext-all-summary.json) | Reviewed last-final scoring, denominators, run4 sensitivity and row ledger |
| [plaintext-all-report.md](results/plaintext-all-report.md) | Exact suffixes, results, denials, failures, limits and comparison |
| [plaintext-all-missing.json](results/plaintext-all-missing.json) | Unscored missing run18 |
| [plaintext-all-errors.jsonl](results/plaintext-all-errors.jsonl) | Nine returned-504 failures and recovery notes; checkpoints preserved alongside |
| [plaintext-all-script.js](scripts/plaintext-all-script.js) | Plain-text runner; completed usable pairs are not repeated |
| [plaintext-all-review.py](scripts/plaintext-all-review.py) | Offline audit and derived summary/subsets, no calls |
| [plaintext-reason-raw.jsonl](results/plaintext-reason-raw.jsonl) | Exact-line reason-first subset |
| [plaintext-ans-raw.jsonl](results/plaintext-ans-raw.jsonl) | Exact-line answer-first subset |
| [plaintext-combined-raw.jsonl](results/plaintext-combined-raw.jsonl) | Exact-line combined subset |

Preview: `node experiments/12-format-only-ablation/scripts/plaintext-all-script.js`

Offline review: `python3 experiments/12-format-only-ablation/scripts/plaintext-all-review.py`

No fresh replication or missing-run retry is authorized by this README. Read [RUNBOOK](../../RUNBOOK.md) for baseline safeguards. Subsets are not additional runs. Frequent matching persists without JSON in this sample; this is not proof of conscious cheating or zero format effect. Zero positive admissions coexist with reference-targeting text in run33. Work quality remains unreviewed.
