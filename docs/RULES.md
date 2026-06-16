# Development Guidelines

## Code Style

### Comments

- Do not add comments to code.
- The only exception is JSDoc/TSDoc documentation blocks for functions, classes, hooks, interfaces, or complex public APIs.
- Prefer self-explanatory names over comments.

### Documentation

- Use JSDoc/TSDoc when documenting:
  - Public functions
  - Public classes
  - Custom hooks
  - Complex business logic that benefits from API-style documentation

Example:

```ts
/**
 * Calculates the final price after applying discounts.
 */
function calculatePrice() {}
```

### Writing Style

- Never use em dashes (—) in generated text.
- Replace em dashes with:
  - Periods.
  - Parentheses.
  - Commas.
  - Bullet points.
  - Any natural alternative depending on context.

- Avoid the common AI writing pattern that heavily relies on em dashes.
