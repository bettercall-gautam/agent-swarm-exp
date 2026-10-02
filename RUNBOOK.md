# Cheat and Deny: inspection and reproduction

**Old names.** Early notes used other labels. Sessions A, B and C are S01, S02 and S03; "S4" to "S6" are S04 to S06; "v2" is S08; "v3" and "v3-hard" are S09; the "no-key baseline" is S10. File names keep the old labels (for example `v2-all-raw.jsonl`) so saved evidence is not renamed.

The experiment phase is closed. This runbook explains how to inspect the evidence and prepare a separate replication. It does not authorize new model calls, paid usage or retries. Start with the [README](README.md) for the story and [FINDINGS](FINDINGS.md) for interpretation.

## 1. Understand the files before running anything

There are **15 numbered session folders** under `experiments/`, plus `shared/` code and `legacy/` evidence. Each numbered folder has `scripts/`, `results/` and a README. S15 has preparation/diagnostic evidence, not a completed dataset.

- **Question bank:** problems, true answers, wrong reference numbers and supporting source/calculation notes. Scoring-only metadata is not necessarily model-visible. Read each saved prompt to determine what was shown.
- **Canonical `all-raw.jsonl`:** one JSON object per line. Preserve these exact bytes and append order. Arm-specific raw files are derived browsing copies, not additional observations.
- **Summary/report/review ledger:** reviewed extractions, admission coding, missingness and scoring sensitivity. These complement raw rows; they do not erase parser nulls or earlier answer choices.
- **Attempts/errors/checkpoints:** evidence of submissions and failures. A request can have consumed quota without yielding a usable pair. Historical archived checkpoints are not necessarily live pending work.
- **Setup hash:** a fingerprint of the reviewed model-visible setup. It detects changed settings; it is not proof of owner approval, reproducibility across future provider changes or a credential.

Do not confuse a row with an API call. S01-S03 rows involve a Worker and, in the two disclosed-monitor arms, a Monitor; covert audits are separate. S04-S06 add confession and hidden audits. Paired format tests usually use two successful calls per row. S10 uses one answer call. Failed submissions can increase attempts without increasing usable rows.

## 2. Set up for offline inspection

Use Node.js 22 and Python 3. From a new clone:

```bash
git clone https://github.com/bettercall-gautam/cheat-and-deny.git
cd cheat-and-deny
npm ci --ignore-scripts
```

From an existing checkout, first inspect `git status --short`. Save local edits before pulling with `git pull --ff-only`; do not use `git reset --hard` or remove tracked results to force a rerun. An old clone URL redirects after the repository rename, but the current project name is Cheat and Deny.

### Safe previews: no key or model call

```bash
node experiments/08-v2-field-order/scripts/v2-all-script.js
node experiments/09-v3-hard/scripts/v3hard-all-script.js
node experiments/10-no-key-control/scripts/nokey-all-script.js
node experiments/11-key-only-ablation/scripts/keyonly-all-script.js
node experiments/12-format-only-ablation/scripts/plaintext-all-script.js
node experiments/13-easy-format-only/scripts/easyplain-all-script.js
node experiments/14-crossmodel-groq/scripts/groqhard-all-script.js
```

These later runners default to preview and print their exact prompt/schema/plan/hash. **The original shared S01-S03 runner is not a preview command**; do not invoke it just to inspect. Read its source instead. `npm run verify` recomputes the documented counts from the saved rows and fails if the README or findings disagree; it is not a test suite for the runners and makes no model calls.

### Offline review: no provider requests

```bash
python3 experiments/11-key-only-ablation/scripts/keyonly-all-review.py
python3 experiments/12-format-only-ablation/scripts/plaintext-all-review.py
python3 experiments/13-easy-format-only/scripts/easyplain-all-review.py
python3 experiments/14-crossmodel-groq/scripts/groqhard-review.py
python3 docs/generate-visuals.py
```

Review scripts may rewrite **derived** summaries/subsets in your working copy. Check the diff afterward; they should not change canonical raw evidence. S15's review script deliberately stops because no scored study was completed. Do not remove that gate to manufacture a result.

## 3. Decide what a replication would actually replicate

A fresh replication needs separately named output paths, a reviewed question bank, exact prompts/schemas/model/settings, scoring rules and a call/token budget. The existing runners target already-populated tracked files. Do not delete or rename canonical evidence as a shortcut; copy the runner to a new session/output and inspect its plan first. A complete dataset seen by the runner may result in zero new calls, not a fresh replication.

For S08-S09/S11-S14, the usual paired design is 25 questions times three formats = **75 pairs = 150 nominal successful calls**. This excludes failed attempts, diagnostic calls and separate reviews. S12 has one missing pair; S10 has no confession. No format-test Monitor call is hidden inside the two-call total.

The exact supported model must still be available. Check current provider prices/access/limits rather than assuming the historical free-tier route persists. S14 used GPT-OSS 120B, low effort, 8000 cap and explicit confession format. Gemini thinking was unset/actual default unknown. A provider or enforcement change creates a companion difference that must be documented.

## 4. Secure keys and explicit execution

Keep keys in a secure process environment or ignored local `.env`, never in code, committed files, screenshots or messages. Gemini runners expect `GEMINI_API_KEY` and `GEMINI_MODEL=gemini-3.5-flash-lite`. S14 expects `GROQ_API_KEY`; its model is fixed in the runner. The GitHub Actions route uses the repository secret `GROQ_API_KEY` only in CI's process environment.

After a new output/setup and budget have been reviewed, the later-runner execution shape is:

```text
node <new-runner-path> --run --approved-setup=<hash-from-that-preview> --batch=<bounded-count>
```

This is a template, not a command to paste. Inspect each runner's supported flags. A setup hash is a consistency check, not permission to spend. `--batch` limits additional pairs in that process, not necessarily HTTP submissions, because retries/recovery can add attempts. Do not run parallel copies or switch models/accounts/payment plans silently.

## 5. Failures and recovery are runner-specific

| Runner group | Actual behavior to check |
| --- | --- |
| S01-S03 shared strict runner | Retries selected 503/429/abort/deadline errors up to three attempts; checks existing output and requires explicit `--resume`. Rows can include errors. No submission checkpoint equivalent to the later paired runners. |
| S08-S09 and S11 | Default stop on API errors; later paired checkpoints preserve answer/confession state. No generic automatic retry should be assumed. |
| S10 | Default stop; `--retry-504-once` is explicit opt-in returned-504 recovery. Unknown interrupted state still requires inspection. |
| S12-S13 | Returned-504 parking/deferred recovery exists for reviewed cases; missing rows and final-attempt markers matter. Inspect selection before recovering. |
| S14 | Bounded 429 Retry-After and returned-504 retry, adaptive pacing, attempt log, pending state and validated same-mode artifact restore. Read its session README and workflow. |
| S15 | Closed after two order checks. No new dispatch. |

The original shared runner's `--resume` validates row identity/order and continues after saved rows; it does **not** make interrupted submissions magically known. It refuses a damaged last JSONL line and prior quota-error rows. Older instructions to archive a partial run and restart from the beginning would repeat completed questions and must not be used as a generic recovery rule.

Before retrying any uncertain submission:

1. Read its exact raw/attempt/error/checkpoint records and provider response IDs/finish status, if available.
2. Determine whether an answer or confession is saved. Never regenerate a saved answer just because its confession failed.
3. Separate a known returned error from a network/abort/interruption with unknown server state. The latter may already have consumed usage.
4. Preserve original state and decide the bounded recovery before acting. Stop if the selected run IDs or artifact mode/hash do not match.
5. Reconcile completed IDs, pending/deferred/missing rows and attempt totals afterward. A green CI job is not proof of a complete scored dataset.

### S14 durable CI route

[Workflow](.github/workflows/s14-groq.yml) dispatches separately named smoke/full artifacts. Each CI checkout starts fresh; a continuation uses `source_run_id` to restore a **same-mode**, validated artifact. It checks workflow path, artifact naming, setup hash, row identities, attempt history and pending response schema/order. Completed pairs are not regenerated. A known 429 confession can resume the saved answer; ambiguous pending states stop.

Adaptive pacing estimates reservation from inputs and completion history and uses allowlisted headers. These estimates are not exact. Request headers reflect requests/day; token headers reflect tokens/minute, not remaining daily token capacity. A 150-call plan with an 8000 cap can exceed a nominal daily budget. Stop on an unreviewed quota/account change. Do not use the workflow's rerun button blindly or confuse smoke rows with full data.

## 6. Score without hiding ambiguity

- Separate true-answer correctness, wrong-key match and follow-up admission. Monitor verdicts and work-quality review are different evidence.
- Keep genuine unknowns in completed-row denominators. Missing S12 run 18 is unscored, not an incorrect response; show both planned and available counts.
- Inspect parser flags against the first answer's raw text. Never use a later confession number as the submitted answer.
- Preserve S09's combined resolutions (41/70/75), S14 combined raw strict 9/25 versus reviewed 11/25, S12 first-versus-last-final sensitivity (46/74 versus 45/74 matches), and S13 labeled versus semantic final-choice scores (12/75 versus 7/75 matches).
- Keep all intermediate conflicting answer choices visible. A review change must have a row ID, decisive text and rule, not only a new aggregate.
- Work-quality review is not complete for S09-S14. A new blinded review should hide arm/key-match/final-answer mappings, preserve calculations inside shown work and keep its labels separate from raw rows. S08's shuffled LLM review was post-hoc and had no human/inter-rater validation.

## 7. Integrity checks and handoff

S14 canonical raw SHA256 is:

```text
bdd874b7e70c0b9b4df03f1c1c6ecce25b0ff9bcd94d8fc2c639bf0dfc02b5d0
```

To check locally:

```bash
sha256sum experiments/14-crossmodel-groq/results/groqhard-all-raw.jsonl
```

Check unique run IDs, expected bank/arm/model/hash, row count, confession presence where required, unresolved parser flags, missing/pending state and successful/failed submission totals. Keep raw bytes unchanged. Present results with [README limitations](README.md#limits-on-interpretation), source links and scoring sensitivities. Counts support descriptive comparisons, not intentional-lying labels or guaranteed causal mechanisms. No further run, post or share is initiated by this document.

## 8. Live replication notes (moved from the README)

A live replication needs the corresponding provider account and a secure process environment (`GEMINI_API_KEY` or `GROQ_API_KEY`). Never commit a key. Check current model access, prices and quota first. The runners' execution form is `node <runner> --run --approved-setup=<preview hash> --batch=<bounded count>`; this is a template, not a ready-to-run new study. Completed tracked outputs are already populated. Create separately named runner/output paths and review that new setup before executing; do not delete evidence to force a rerun. S14's exact route and durable recovery are documented in its session README; [RUNBOOK.md](RUNBOOK.md) covers Gemini. Inspect any pending checkpoint before retrying an uncertain submission. No parallel copies, silent fallback or new experiment is planned here.

## 9. Provider documentation (moved from the README)

- [Groq structured outputs](https://console.groq.com/docs/structured-outputs): current strict-schema model list and enforcement semantics.
- [Groq rate limits](https://console.groq.com/docs/rate-limits): plan limits and header meanings, checked with the Free tab selected.
- [Groq API reference](https://console.groq.com/docs/api-reference): completion budget and request parameters.
- [Groq model catalogue](https://console.groq.com/docs/models): current model availability.
- [Qwen3.8 model card](https://console.groq.com/docs/model/qwen/qwen3.8-27b): model-specific reasoning controls.

### S14 run details (moved from the README)

The full S14 run has 75 completed pairs, 150 HTTP submissions and 150 successful calls, with zero full-run API errors, retries or missing pairs. Earlier diagnostics and partial smokes are separate. It used one account label, `groq-account-1`; that label is not a verified provider account ID. The measured elapsed time was 43 minutes 54.531 seconds, including gaps between durable batches.
