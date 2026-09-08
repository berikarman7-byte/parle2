/*
  words-loader.js
  ----------------
  Загружает ~10 000 французских слов из открытого частотного списка
  hermitdave/FrequencyWords (построен на субтитрах OpenSubtitles,
  лицензия MIT) — это реальные, часто употребляемые слова, а не
  мусор из заголовков Википедии.

  Слова делятся на 20 категорий по 500 (по частоте употребления).
  Переводы НЕ хранятся заранее — они подгружаются через бесплатный
  словарь MyMemory только тогда, когда пользователь открывает
  конкретную карточку, и кэшируются в localStorage, чтобы повторно
  не запрашивать одно и то же слово.
*/

const WORDS_SOURCE_URL =
  "https://raw.githubusercontent.com/hermitdave/FrequencyWords/master/content/2018/fr/fr_50k.txt";

const TOTAL_WORDS = 10000;
const WORDS_PER_CATEGORY = 500;
const TRANSLATE_CACHE_PREFIX = "parle2_translation_";

// Необязательно: впишите сюда свой email, чтобы поднять дневной лимит
// MyMemory с 5000 до 10000 переводов в сутки (лимит общий на ваш IP).
const MYMEMORY_EMAIL = ""; // например: "you@example.com"

function isCleanFrenchWord(w) {
  // только буквы (с французскими диакритиками), апострофы и дефисы,
  // длина 2..20 символов — отсеивает цифры, аббревиатуры, мусор
  return /^[a-zàâäçéèêëîïôöùûüÿœæ'-]{2,20}$/i.test(w);
}

async function loadWordCategories() {
  const res = await fetch(WORDS_SOURCE_URL);
  if (!res.ok) {
    throw new Error("Не удалось загрузить словарь (HTTP " + res.status + ")");
  }
  const text = await res.text();

  const seen = new Set();
  const clean = [];
  for (const line of text.split("\n")) {
    const word = line.trim().split(" ")[0];
    if (!word) continue;
    const lower = word.toLowerCase();
    if (!isCleanFrenchWord(lower) || seen.has(lower)) continue;
    seen.add(lower);
    clean.push(lower);
    if (clean.length >= TOTAL_WORDS) break;
  }

  const categories = {};
  for (let i = 0; i < clean.length; i += WORDS_PER_CATEGORY) {
    const start = i + 1;
    const end = Math.min(i + WORDS_PER_CATEGORY, clean.length);
    const name = `Fréquence ${start}\u2013${end}`;
    categories[name] = clean.slice(i, i + WORDS_PER_CATEGORY).map((w) => ({
      fr: w,
      en: null, // переведётся при первом просмотре карточки
    }));
  }
  return categories;
}

function getCachedTranslation(word) {
  try {
    return localStorage.getItem(TRANSLATE_CACHE_PREFIX + word);
  } catch {
    return null;
  }
}

function setCachedTranslation(word, translation) {
  try {
    localStorage.setItem(TRANSLATE_CACHE_PREFIX + word, translation);
  } catch {
    /* localStorage недоступен — просто не кэшируем */
  }
}

async function translateWord(word) {
  const cached = getCachedTranslation(word);
  if (cached) return cached;

  const url = new URL("https://api.mymemory.translated.net/get");
  url.searchParams.set("q", word);
  url.searchParams.set("langpair", "fr|en");
  if (MYMEMORY_EMAIL) url.searchParams.set("de", MYMEMORY_EMAIL);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Перевод недоступен");
  const data = await res.json();
  const translation =
    (data.responseData && data.responseData.translatedText) || "";
  const clean = translation.toLowerCase().trim();

  if (clean && !clean.includes("mymemory") && !clean.includes("invalid")) {
    setCachedTranslation(word, clean);
    return clean;
  }
  throw new Error("Перевод недоступен");
}

window.wordsAPI = { loadWordCategories, translateWord };
