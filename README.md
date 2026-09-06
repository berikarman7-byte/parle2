# Carnet de Mots — French vocabulary flashcards

A small, static flashcard site for learning French vocabulary. No build step,
no framework — just `index.html`, `style.css`, `script.js`, and `words.js`.

## Files

- `index.html` — page structure
- `style.css` — the "school notebook" look (ruled paper, red margin line)
- `script.js` — flashcard logic (flip, shuffle, know-it / review, progress saved
  in the browser via `localStorage`)
- `words.js` — the vocabulary data. Everything you'd want to edit lives here.

## Running it locally

Just open `index.html` in a browser. No server or build tools needed.

## Putting it on GitHub Pages

1. Create a new repository on GitHub and push these four files to it
   (plus this README if you like):
   ```
   git init
   git add .
   git commit -m "Carnet de mots"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. On GitHub, go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to "Deploy from a branch",
   pick the `main` branch and the `/ (root)` folder, then save.
4. GitHub will give you a URL like
   `https://<your-username>.github.io/<repo-name>/` within a minute or two.

## About the word count

You asked for 10,000 words. I want to be straight with you about why this
ships with about 660 instead: I looked for an open, ready-made French
word list I could drop in at that scale, but what's actually available
either blocks automated downloads or is machine-generated from Wikipedia
titles — full of markup artifacts, proper nouns, and outright mistranslations,
not something worth teaching from. Rather than pad the count with
low-quality entries, I hand-built ~660 common, everyday words across 20
categories (greetings, numbers, family, food, verbs, adjectives, and more),
each one checked for accuracy.

If you want to grow it further, `words.js` is easy to extend yourself or
hand to an AI tool along with this format:

```js
"Category name": [
  ["le mot", "the word"],
  ["l'autre mot", "the other word"],
],
```

A few solid places to pull additional words from:
- [Tatoeba](https://tatoeba.org/) — a large, community-checked sentence and
  word database with a French–English export.
- A French frequency list, e.g. the one in
  [hermitdave/FrequencyWords](https://github.com/hermitdave/FrequencyWords) —
  gives you words ranked by how common they are, which you'd still need to
  pair with translations.
- Any French textbook's vocabulary appendix, which is usually already
  organized by topic the way `words.js` is.

Whatever you add, keep the `[french, english]` pair format and it'll show
up automatically as a new category (or more entries in an existing one) —
no changes needed to `script.js` or `style.css`.
