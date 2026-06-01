---
name: new-essay
description: Add a new essay to the Dojji site. Creates the essay HTML file with ASCII art header, body, and auto-generated cross-links to thematically related existing essays. Updates the index page list and search index entries. Trigger when the user says "new essay", "add an essay", "publish <title>", or pastes raw essay text and asks to add it.
---

# Adding a new essay to Dojji

Dojji is a static GitHub Pages site at the repo root. No build step. Each essay is a standalone HTML file in `essays/`. The site holds together by a single CSS file, a tiny JS for search, and **hand-curated cross-links** between essays — those links are the entire point of the site, so generate them with care.

## Required inputs

If the user hasn't supplied these, ask once:
- **title** (e.g. "On Solitude")
- **body** (the prose itself, in paragraphs)
- **date** (default to today, ISO `YYYY-MM-DD`)
- **category** (optional, one or two words shown after the date)

## Steps

### 1. Pick a slug
Lowercase, hyphenated, no `on-` prefix duplication. `"On Solitude"` → `on-solitude`. File path: `essays/<slug>.html`.

### 2. Read every existing essay
List `essays/` and read each `.html`. You need the actual content — read them, do not skim filenames. Build a mental map of each essay's core moves (the question it asks, the image it uses, the conclusion it lands on).

### 3. Design an ASCII art header
One distinct piece per essay, ~10–18 lines tall, centered visually. It should evoke the essay's core image, not illustrate it literally. Reference points already in the site:
- **On Grief** — falling dots into a ground line (rain into earth)
- **On Love** — two labeled boxes dissolving into a single point ("silence")
- **On Power** — a pyramid above a horizon with `◌`
- **Index** — a double-cone meeting at `◌` ("branches of one root")

Rules:
- Monospace-safe characters only: ASCII plus the small set already in use (`◌ · ─ ╭ ╮ ╰ ╯ │ ╲ ╱ ▲ ╶ ╴`). No emoji.
- Keep total height under ~18 lines so it doesn't dominate on mobile.
- Wrap in `<pre class="ascii" aria-hidden="true">`. Backslashes in HTML `<pre>` are fine as-is; only escape `<`, `>`, `&`.
- The `◌` (dotted circle) is the recurring "empty center" motif — try to land on or near it.

### 4. Write the essay HTML
Copy the structure of an existing essay (e.g. `essays/on-grief.html`) exactly — same nav, footer, ASCII block placement, classes. Replace the title, meta line, ASCII, and body. Each paragraph in one `<p>` tag.

### 5. Generate inline cross-links (this is the soul of the site)
Read the new essay alongside each existing one. For each existing essay, find the **single sharpest moment** where the new essay's prose names a concept the older essay treats directly (e.g. "self", "have", "image", "lose", "leverage", "concept"). Wrap **one** such word in each direction with `<a href="other-slug.html">word</a>`. Aim for 1–2 inline links per existing essay, no more — they should feel like a reader's whisper, not a footnote.

The link is not decoration. It must point to a place where the other essay genuinely turns on that word. If no such moment exists, skip the link rather than force it.

### 6. Generate the Branches section
At the end of every essay, a `<section class="branches">` lists each thematically-related existing essay with a one-sentence "thread" — the specific idea the two essays share. Format:

```html
<section class="branches" aria-label="Related essays">
  <h2>Branches</h2>
  <ul>
    <li>
      <a class="b-title" href="other-slug.html">On Other →</a>
      <div class="b-thread">One sentence naming the shared move, not a summary.</div>
    </li>
  </ul>
</section>
```

Threads should be specific ("The labels that let you love are the labels that let you lose") not generic ("Both essays discuss perception"). Write them fresh per pairing.

### 7. Add reciprocal branches and inline links to existing essays
For every essay you linked **from** the new one, open that essay and add a reciprocal entry: a Branches list item pointing **back** to the new essay, with its own thread sentence, plus at most one inline link in the older essay's body pointing to the new one. This is the rule that keeps the graph bidirectional. Don't forget it.

### 8. Update `index.html`
Add a new `<li>` at the top of `#essay-list` (newest first):

```html
<li data-search="<slug words> <key terms from body>">
  <a class="essay-link" href="essays/<slug>.html">
    <div class="e-row">
      <span class="e-date">YYYY-MM-DD</span>
      <span class="e-title">On Title</span>
    </div>
    <div class="e-summary">One-line summary, plainspoken.</div>
  </a>
</li>
```

The `data-search` attribute is what the site search matches against. Put the slug, the title, and ~8–15 lowercase keywords from the body (concepts, named things, characteristic words). No commas needed.

### 9. Verify
- Open the new essay in a browser (or `python3 -m http.server` from repo root) and check: ASCII renders centered, inline links work, Branches section appears, every reciprocal link exists in the other direction.
- Type the new essay's title in the homepage search bar — it should be the only result.
- Press `/` on the homepage — search should focus.

## What not to do
- Don't introduce a build step, framework, bundler, or new dependency.
- Don't add images. ASCII art only.
- Don't write a Branches entry to **every** existing essay reflexively — only the ones with a genuine thread. Two strong branches beat four weak ones.
- Don't commit unless the user asks.

## File layout reference
```
/
  index.html          ← essay list + search
  about.html
  CNAME               ← djey.space
  .nojekyll
  essays/<slug>.html  ← one file per essay
  assets/styles.css
  assets/main.js
  .claude/skills/new-essay/SKILL.md  ← this file
```
