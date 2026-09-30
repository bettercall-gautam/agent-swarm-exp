<!-- (instinct) Use experiments as the umbrella and separate session code from evidence. -->
# Experiment history

Each numbered session has `scripts/`, `results/` and a README explaining the design and findings. Session and arm names in historical raw records are preserved.

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
