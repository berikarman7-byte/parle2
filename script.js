/*
  script.js
  ----------
  Логика карточек: показывает французское слово, при перевороте
  подгружает перевод через wordsAPI.translateWord (см. words-loader.js),
  позволяет отмечать "знаю" / "повторить", хранит прогресс
  в localStorage и умеет перемешивать колоду.
*/

const PROGRESS_KEY_PREFIX = "parle2_progress_";

let categories = {};
let deck = [];
let currentIndex = 0;
let isFlipped = false;

const els = {
  loading: document.getElementById("loading"),
  controls: document.getElementById("controls"),
  cardArea: document.getElementById("cardArea"),
  categorySelect: document.getElementById("categorySelect"),
  shuffleBtn: document.getElementById("shuffleBtn"),
  progressLabel: document.getElementById("progressLabel"),
  card: document.getElementById("card"),
  cardFront: document.getElementById("cardFront"),
  cardBack: document.getElementById("cardBack"),
  reviewBtn: document.getElementById("reviewBtn"),
  knowBtn: document.getElementById("knowBtn"),
};

function progressKey(fr) {
  return PROGRESS_KEY_PREFIX + fr;
}

function isKnown(fr) {
  try {
    return localStorage.getItem(progressKey(fr)) === "known";
  } catch {
    return false;
  }
}

function setKnown(fr, known) {
  try {
    localStorage.setItem(progressKey(fr), known ? "known" : "review");
  } catch {
    /* ignore */
  }
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function updateProgressLabel() {
  const known = deck.filter((w) => isKnown(w.fr)).length;
  els.progressLabel.textContent = `${known}/${deck.length} appris`;
}

function renderCard() {
  isFlipped = false;
  els.card.classList.remove("flipped");
  const word = deck[currentIndex];
  els.cardFront.textContent = word.fr;
  els.cardBack.textContent = "\u2026";
  prefetchUpcoming();
}

async function showTranslation() {
  const word = deck[currentIndex];
  if (!word.en) {
    els.cardBack.textContent = "Chargement\u2026";
    try {
      word.en = await window.wordsAPI.translateWord(word.fr);
    } catch (e) {
      els.cardBack.textContent = "Traduction indisponible, r\u00e9essayez";
      return;
    }
  }
  els.cardBack.textContent = word.en;
}

function prefetchUpcoming() {
  for (let offset = 1; offset <= 3; offset++) {
    const w = deck[currentIndex + offset];
    if (w && !w.en) {
      window.wordsAPI
        .translateWord(w.fr)
        .then((t) => (w.en = t))
        .catch(() => {});
    }
  }
}

function nextCard() {
  currentIndex = (currentIndex + 1) % deck.length;
  renderCard();
  updateProgressLabel();
}

function loadCategory(name) {
  deck = categories[name];
  currentIndex = 0;
  renderCard();
  updateProgressLabel();
}

function populateCategorySelect() {
  els.categorySelect.innerHTML = "";
  Object.keys(categories).forEach((name) => {
    const opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    els.categorySelect.appendChild(opt);
  });
}

els.card.addEventListener("click", () => {
  isFlipped = !isFlipped;
  els.card.classList.toggle("flipped", isFlipped);
  if (isFlipped) showTranslation();
});

els.knowBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  setKnown(deck[currentIndex].fr, true);
  nextCard();
});

els.reviewBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  setKnown(deck[currentIndex].fr, false);
  nextCard();
});

els.shuffleBtn.addEventListener("click", () => {
  deck = shuffle(deck);
  currentIndex = 0;
  renderCard();
});

els.categorySelect.addEventListener("change", (e) => {
  loadCategory(e.target.value);
});

async function init() {
  try {
    categories = await window.wordsAPI.loadWordCategories();
  } catch (e) {
    els.loading.textContent =
      "Impossible de charger le dictionnaire en ligne. V\u00e9rifiez votre connexion et rechargez la page.";
    return;
  }
  populateCategorySelect();
  loadCategory(Object.keys(categories)[0]);
  els.loading.classList.add("hidden");
  els.controls.classList.remove("hidden");
  els.cardArea.classList.remove("hidden");
}

init();

