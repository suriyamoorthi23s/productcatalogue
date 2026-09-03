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