# Devtool

## Why

typescript is a bit of a pain, and sveltekit auto generated types is not suit my requirements

## How

1. we watch for file changes
2. create global type
3. so we can use dynamic automated import with type safety

## Task

convert js file, extract all `export const`, then write index.d.ts
to `lib/types`

- `lib/schema/view.js` to `lib/types/view.d.ts`
- `lib/schema/database.js` to `lib/types/db.d.ts`

read all in handler, export zod type to declaration that
can be used outside repository