# Experiment history

**Old names.** Early notes used other labels. Sessions A, B and C are S01, S02 and S03; "S4" to "S6" are S04 to S06; "v2" is S08; "v3" and "v3-hard" are S09; the "no-key baseline" is S10. File names keep the old labels (for example `v2-all-raw.jsonl`) so saved evidence is not renamed.

Each numbered session has `scripts/`, `results/`, a README explaining the design, and a `FINDINGS.md` with its detailed results and caveats. Session and arm names in historical raw records are preserved.

- [01-math](01-math/README.md)
- [02-knowledge](02-knowledge/README.md)
- [03-mixed](03-mixed/README.md)
- [04-honesty](04-honesty/README.md)
- [05-amnesty-threat](05-amnesty-threat/README.md)
- [06-prompt-control](06-prompt-control/README.md)
- [07-smoke-test](07-smoke-test/README.md)
- [08-v2-field-order](08-v2-field-order/README.md)
- [09-v3-hard](09-v3-hard/README.md)
- [10-no-key-control](10-no-key-control/README.md)

[Shared runner, worker and monitor](shared/README.md) are stored once, not copied into the early sessions. [Legacy evidence](legacy/README.md) predates the ten numbered sessions.

Canonical `all-raw` files and arm subsets contain the same runs. Never add them together. Running scripts can spend API quota; this folder organization does not authorize new experiments.

[Findings](../FINDINGS.md) | [Runbook](../RUNBOOK.md)
