# Sveltekit Error Handling

`load` error goes to current page `+error.svelte` using sveltekit `throw error(404)`.
if not using `error`, sveltekit will use `handleError`

`handle` or `+server.js` error will respond with either a fallback error page or a JSON representation of the error object, depending on the request's Accept headers. You can customise the fallback error page by adding a src/error.html file:
