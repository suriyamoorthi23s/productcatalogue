<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> efcfcab787cadebd06c3351184e6725342738533
# Product Catalogue Browser

A single-page product catalogue built with React, using the public
[dummyjson.com](https://dummyjson.com/products) API. No backend, no mock data.

## Setup

```bash
npm install
npm run dev
```

Requires Node 18+. Runs on Vite's default dev server (usually http://localhost:5173).

## Data source

Live requests to `https://dummyjson.com`. Chose the real API over a mocked
JSON file since it already supports search and category filtering server-side,
and its natural network latency was a more honest way to test the
stale-response race condition than an artificial delay would be.

`dummyjson` can't combine full-text search with a category filter in a single
request, so when both are present, `fetchProducts` searches first (the more
selective, user-driven input) and narrows the result to the category
client-side. Price range, in-stock, and sorting are also applied client-side
after the fetch — see `src/api/products.js` and `src/pages/CatalogPage.jsx`.

## Handling stale responses

`useProducts` (`src/hooks/useProducts.js`) keeps a `requestIdRef` that
increments on every new fetch. When a response comes back, it's only applied
to state if its request ID still matches the latest one issued. The previous
in-flight request is also aborted via `AbortController` when a new one
starts. Together this means a slow, earlier response can never overwrite a
faster, later one — even without the abort, the stale response is silently
dropped because its ID no longer matches.

## Pagination vs infinite scroll

Chose **pagination** over infinite scroll. The task requires that "browser
back returns to the exact list state — same scroll position, same filters,
same page." A specific page number is a much simpler, more reliable piece of
state to store in the URL and restore than an infinite-scroll cursor or
"items loaded so far" count, and it makes shared/refreshed URLs
deterministic rather than approximate.

## Custom hooks

- **`useDebouncedValue(value, delay)`** — generic debounce hook, not tied to
  search. Reused for the search input AND both price range inputs.
- **`useUrlState(schema)`** — reusable URL-as-state hook. Takes a schema of
  keys with defaults/parsers/serializers and returns `[state, setState]`
  backed by `useSearchParams`. Not specific to this catalogue — could sync
  any form/filter state to the URL.
- **`useScrollRestoration(key, ready)`** — reusable scroll-position hook
  keyed to any string (here, the URL path+query) and gated by a "ready" flag
  so it doesn't restore onto skeleton loaders.
- `useProducts` and `useCategories` are more page-specific data-fetching hooks.

## Memoization

- `ProductCard` is wrapped in `memo` — the grid can re-render on unrelated
  state (e.g. a filter input typed but not yet debounced) without
  re-rendering every card.
- The filtered/sorted product list and the current page slice are computed
  in `useMemo`, keyed to the specific filter/sort/page values that affect
  them, so a typed-but-not-yet-applied input doesn't recompute the full list.

## Accessibility

- All filters are native `<select>`, `<input>`, and `<button>` elements —
  tab order follows DOM order.
- Cards are real links (`react-router-dom` `Link`), so Enter opens them
  natively.
- Escape on the detail view calls `navigate(-1)`, returning through browser
  history rather than a fresh navigation — this is also what makes scroll
  position and filters restore correctly.

## Out of scope (per task)

Auth, cart, checkout, a real backend, automated tests, dark mode.

## What I'd change with more time

- Commit granularity: early development commits were made periodically
  rather than one-per-feature, and a few files were duplicated under
  different casing (fixed in a later commit — see history). With more time
  I'd commit per-feature from the start (search, filters, URL sync, detail
  view, accessibility) and run a case-sensitivity check earlier.
- Add automated tests for the stale-response race condition and URL state
  round-tripping specifically, since those are the hardest parts to verify
  by hand.
- Debounce the price range inputs' *effect on fetch* separately from their
  effect on the URL, so typing a price doesn't cause a URL replace on every
  keystroke pause even when it doesn't change the result set.
<<<<<<< HEAD
=======
=======
1. Initial build prompt
"[Task brief pasted: search, filters, URL state, detail view, pagination, keyboard access, custom hook, README requirements] — build this as a real, working project, not a sketch, and run the build/lint before handing it back."
→ This one prompt covered the entire initial build, including data source, hooks, pages, and components.

2. Build-time failure (not a prompt — something that broke)
The first Tailwind config write failed: create_file errored because tailwind.config.js already existed from the Vite scaffold. Fixed by deleting the stub and recreating it with real design tokens instead of patching the default in place.

3. Lint follow-up prompt (judgment call)
"npm run lint is flagging set-state-in-effect warnings in useProducts.js and ProductDetailPage.jsx — should these be fixed or left?"
→ Decided to leave them: standard loading-state-reset pattern, fixing would add indirection for no real gain.

4. Correction prompt (overrode AI's first draft)
"The detail links are carrying the full catalogue query string onto /product/:id — that's unnecessary since going back already restores the previous URL from browser history. Simplify buildDetailPath to just /product/${id}."
→ Original draft had this redundant logic; caught it in review before asking for the fix.

5. My own verification (not a prompt — my review process)
Read useUrlState.js, useProducts.js, and useScrollRestoration.js line by line myself, ran build/lint personally, and manually tested the full flow (search → debounce → filter change → open product → back button → confirm filters/scroll restored)
>>>>>>> 53bdb73a365b05c1d69a0c230c68704616f371fd
>>>>>>> efcfcab787cadebd06c3351184e6725342738533
