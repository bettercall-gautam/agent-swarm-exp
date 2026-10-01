<!-- [Instinct] Document the prepared Groq runner, provider/schema differences and execution safeguards before any key use or run. -->
# S14 preparation: Groq cross-model S09 contrast

Status: experiment pairs not yet completed. Six isolated diagnostic/control submissions established a successful original M01 answer at cap8000; three earlier requests failed. Diagnostic controls are not experiment pairs. The owner approved cap8000 on October1 after the diagnostics.

## Preserved and changed

Copied [S09 runner](../09-v3-hard/scripts/v3hard-all-script.js) into [groqhard-all-script.js](scripts/groqhard-all-script.js); all old scripts remain unchanged. [groqhard-all-questions.json](results/groqhard-all-questions.json) is byte-identical to S09. Same25 hard questions,3 arms/rotation,prompt strings,answer0.7/confession0,two-turn history,numeric scoring and original parser.75 planned pairs =150 successful calls. No actual Monitor call.

Changed: Groq OpenAI-compatible Chat Completions endpoint `https://api.groq.com/openai/v1/chat/completions`, model `openai/gpt-oss-120b`, process environment `GROQ_API_KEY`; strict JSON Schema translation; new8000 `max_completion_tokens` cap; provider error/usage accounting. The former Gemini import/client/call are retained as comments in this copy. This is a cross-provider contrast with documented companion differences, not literally only a model-name swap.

Gemini `NUMBER`/`STRING`/`BOOLEAN` types translate to standard JSON Schema; nullable numeric answer uses `["number","null"]`,all fields required,objects additionalProperties:false. The same prompt requests reason-first/answer-first order. Groq strict schema support does NOT establish property order: official docs inspected do not promise Gemini-equivalent propertyOrdering. Actual response key order is saved/audited; a mismatch stops execution with the response in the checkpoint. Combined and confession remain `{response:string}`.

Thinking/reasoning_effort is unset. Groq documents its gpt-oss default as medium; Gemini thinking was unset/unknown. Do not infer equivalent hidden reasoning configuration. Temperature0 is not a guarantee of repeat-identical output.

## Preview and smoke

Requires Node with native fetch and dependencies already used by the repo (`npm ci`). No Groq SDK/package changes.

```bash
node experiments/14-crossmodel-groq/scripts/groqhard-all-script.js
```

Preview exposes exact prompts,schemas,plan,endpoint,cap and setup hash without a key or API call. Reviewed setup hash:

`cc075097149c5f088f8eefdd9965cffc38de3bbe505474e60088281d4ee70dfd`

Only after the owner approves the intended calls and credential route,with key provided securely in process environment:

```bash
node experiments/14-crossmodel-groq/scripts/groqhard-all-script.js --run --smoke --approved-setup=cc075097149c5f088f8eefdd9965cffc38de3bbe505474e60088281d4ee70dfd --batch=3
```

Smoke output is `groqhard-smoke-raw.jsonl`,never mixed with full results. Smoke supports the first two questions across all three formats,six pairs/twelve successful calls if completed; batch3 runs one question's three formats,six calls. Starting with one question limits quota risk and checks all three output orders. A full replication starts separate fresh output,not a smoke resume. Default batch3,maximum75. Completed run IDs are not repeated.

## Token budget and safety

Official published base limits are30RPM,1000RPD,8KTPM,200KTPD,subject to organization-specific limits.150 calls capped at8000 output tokens could exceed200K daily even before prompt/history tokens; the cap is NOT a guarantee the full run fits today. Confession repeats the original prompt and answer,adding input. Hidden reasoning can also use completion budget. A clipped/empty finish does not count as a completed response; the runner stops,preserving response-ID/usage/finish reason in the attempt log. No cap/model/schema fallback is automatic. Usage is logged for account-budget review; remaining daily capacity must be checked before full execution.

Requests are paced at least4.5 seconds apart within a process. This alone does not guarantee8KTPM: returned429 may require waiting. Honor one Retry-After retry only when a finite header is between0 and120seconds; longer/missing/unusable values stop rather than guess. Returned504 gets one retry after10seconds. Other errors,network/abort unknown submission state,malformed JSON,truncation,field-order violations all stop. No paid fallback.

Every HTTP submission and returned response/error is recorded in an attempts JSONL,including response IDs,finish reasons,usage and Retry-After. A pending checkpoint retains submitted/received answer/confession state. Secrets never enter tracked outputs. Never delete a checkpoint just to resume.

Returned504-exhausted answer pair with no saved answer can be explicitly parked via `--park-504` (with normal run/setup flags); this archives checkpoint and records deferred status without model calls. Continue independent pairs. At the end,`--finish-deferred --batch=1` selects exactly one untried deferred pair and makes one final submission (no automatic retry). If it fails504 again,`--mark-missing-504` archives and marks it missing,not incorrect. Other pending states need inspection and a specific recovery decision; saved answers are not regenerated just because a confession failed. Recovery flags require the owner's approved recovery scope and do not grant permission themselves.

No push authorized by this file. Missing data and actual order changes must accompany results. Cross-provider output-order support and token/truncation behavior need live smoke verification before claiming arm comparability.

## Official sources inspected

- https://console.groq.com/docs/structured-outputs : gpt-oss-120b strict JSON Schema support,required/closed-object rules; no property-order guarantee found.
- https://console.groq.com/docs/api-reference : endpoint,max_completion_tokens,temperature,reasoning_effort medium default for gpt-oss,JSON Schema response_format.
- https://console.groq.com/docs/model/openai/gpt-oss-120b : model capabilities/context/output limits.
- https://console.groq.com/docs/rate-limits : published org-level limits,Retry-After and rate-limit headers.

## Prepared GitHub Actions route (not pushed or run)

The owner sets a repository Actions secret named `GROQ_API_KEY` in GitHub directly. The workflow [.github/workflows/s14-groq.yml](../../.github/workflows/s14-groq.yml) receives it only in the run step's process environment. Node22, `npm ci --ignore-scripts`, and root working directory match the local runner; dotenv tolerates a missing `.env` and keeps the supplied environment. The runner itself is unchanged.

Manual `workflow_dispatch` input `mode=smoke` runs `--smoke --batch=6`: first two questions, all three arms, six pairs / twelve successful calls. It can stop earlier on order/schema/truncation/errors. Input `mode=full` runs `--batch=75`: seventy-five pairs /150 successful calls, only after smoke verification and a separate go-ahead. The runner's documented bounded retries can increase submission counts; dispatch is not permission to exceed an approved call/budget scope.

Artifact name: `s14-groq-<mode>-<run_id>-<run_attempt>`, retained30 days. Download the entire artifact. It includes the fixed question bank, CI preview, console log, raw JSONL, attempt JSONL, and any pending/recovery/checkpoint JSON. Failed jobs still upload evidence.

Each CI job starts from its checkout, not previous artifacts. **Do not rerun a failed/partial run or dispatch another full run without inspecting evidence and preparing a reviewed resume route.** Concurrency queues rather than cancels, but does not deduplicate separate dispatches. GitHub's re-run button can submit duplicate paid/credit-bearing calls. No automatic retries of the workflow or automatic full dispatch are configured. Partial data is not full completion, and a successful job still needs verification of expected row count/order/schema/usage. No smoke or full run has happened yet.

## Strict-output diagnostics and reasoning evidence

Initial smoke failed on its first answer request (HTTP400 `json_validate_failed`, empty failed_generation). An identical one-call replay and a one-call alternate nullable-number `anyOf` spelling also failed. A separate published product-review control succeeded on120b. These are diagnostics, not completed S14 pairs, and do not establish the error's cause.

The successful control returned `message.reasoning` separately from the JSON `message.content`;110 of165 completion tokens were reasoning tokens. The S14 runner now preserves returned answer/confession reasoning separately for evidence, without modifying model-visible history. Requested "answer-first" means **JSON-field order only**, not answer before hidden/model reasoning. Even perfect JSON order would not establish a pre-reasoning commitment on this provider. Model reasoning claims are generated reports, not privileged evidence of cognition. No full run has started.

Cap8000 permits more reasoning/output than the initial3000 setting and can change truncation/missingness. One successful M01 diagnostic used6224 completion tokens,5594 reported reasoning. This supports cap pressure but is not proof that every failure had the same cause. Multi-day duration is not yet measured.
