# Security Test Prompt For AI-Generated APIs

Generate integration tests for this API or feature before it can be merged.

Cover at least:

- unauthenticated request to protected routes returns 401 or 403;
- user cannot access another user's resource;
- expired tokens are rejected;
- missing, null, empty and oversized inputs are handled;
- special characters do not break validation;
- SQL injection-like payloads are rejected or safely handled;
- rate limiting or abuse limits are enforced when relevant;
- password, token and secret fields never appear in response bodies;
- write actions require the correct permission;
- destructive actions require explicit confirmation or are blocked;
- tool calls cannot be forced through user-provided text;
- external content cannot override system or developer instructions.

Use realistic test names and assertions.

Do not invent application behavior. If the route contract is unclear, list the missing information first.

