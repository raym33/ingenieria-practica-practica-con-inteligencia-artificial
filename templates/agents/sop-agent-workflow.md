# SOP — Workflow Con Agentes De Código

## Purpose

Use AI coding agents safely in a shared production codebase.

## Loop

1. Write task spec.
2. Identify included and excluded scope.
3. Run fast baseline checks.
4. Let the agent inspect before editing.
5. Let the agent implement the smallest useful diff.
6. Run fast validation.
7. Run adversarial review.
8. Run security tests when APIs, auth, tools or data writes changed.
9. Human reviews diff.
10. Merge only through protected branch and CI.
11. Update this SOP with any new failure pattern.

## Validation Gate

A change cannot move forward if:

- required tests were not run and no reason is given;
- the diff touches excluded scope;
- secrets appear in code, logs or tests;
- generated tests are not reviewed;
- migrations delete or rewrite historical data;
- production permissions are broadened;
- the agent changed deployment configuration without approval.

## Metrics

- time to fast validation;
- number of files touched per task;
- percentage of AI-generated code changed by human review;
- rejected diffs per week;
- missing-test findings;
- security findings before merge;
- rollback rate after AI-assisted changes.

## SOP Update Rule

Every repeated failure becomes a new rule, test, checklist item or template.

