// Carnet de Mots — app logic
// Expects a global VOCAB object (see words.js):
// { "Category name": [["motFrançais","english translation"], ...], ... }

const STORAGE_KEY = "carnet-de-mots-progress-v1";
const THEME_KEY = "carnet-de-mots-theme";
const STREAK_KEY = "carnet-de-mots-streak";

const ACCENTS = [
  "#2563eb", "#db2777", "#059669", "#d97706",
  "#7c3aed", "#0891b2", "#dc2626", "#4f46e5",
  "#65a30d", "#ea580c", "#0d9488", "#c026d3",
  "#ca8a04", "#2dd4bf", "#e11d48", "#3b82f6",
  "#84cc16", "#f97316", "#8b5cf6", "#06b6d4"
];

let progress = loadProgress();
let categories = Object.keys(VOCAB);
let currentCategory = null;
let order = [];
let index = 0;
let flipped = false;

// ---------- persistence ----------

function loadProgress(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  }catch(e){ return {}; }
}

function saveProgress(){
  try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); }catch(e){}
}

function markFor(category){
  if(!progress[category]) progress[category] = {};
  return progress[category];
}

function categoryStats(name){
  const marks = markFor(name);
  const words = VOCAB[name].map(pair => pair[0]);
  const known = words.filter(w => marks[w] === "known").length;
  const review = words.filter(w => marks[w] === "review").length;
  return { known, review, total: words.length };
}

function allStats(){
  let known = 0, total = 0;
  categories.forEach(name => {
    const s = categoryStats(name);
    known += s.known;
    total += s.total;
  });
  return { known, total };
}

// ---------- streak ----------

function updateStreak(){
  const todayStr = new Date().toISOString().slice(0,10);
  let data;
  try{ data = JSON.parse(localStorage.getItem(STREAK_KEY)) || { streak: 0, last: null }; }
  catch(e){ data = { streak: 0, last: null }; }

  if(data.last !== todayStr){
    if(data.last){
      const diffDays = Math.round((new Date(todayStr) - new Date(data.last)) / 86400000);
      data.streak = diffDays === 1 ? data.streak + 1 : 1;
    } else {
      data.streak = 1;
    }
    data.last = todayStr;
    try{ localStorage.setItem(STREAK_KEY, JSON.stringify(data)); }catch(e){}
  }
  return data.streak;
}

// ---------- theme ----------

function initTheme(){
  let theme = "light";
  try{ theme = localStorage.getItem(THEME_KEY) || "light"; }catch(e){}
  document.documentElement.setAttribute("data-theme", theme);
}

function toggleTheme(){
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  try{ localStorage.setItem(THEME_KEY, next); }catch(e){}
}

// ---------- confetti ----------

function burstConfetti(){
  if(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const count = 32;
  for(let i = 0; i < count; i++){
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = ACCENTS[Math.floor(Math.random() * ACCENTS.length)];
    piece.style.animationDuration = `${0.9 + Math.random() * 0.9}s`;
    piece.style.width = piece.style.height = `${5 + Math.random() * 6}px`;
    piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 2000);
  }
}

// ---------- shuffling ----------

function shuffle(arr){
  const a = arr.slice();
  for(let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ---------- home view ----------

function renderHome(){
  const overall = allStats();
  document.getElementById("totalKnown").textContent = overall.known;
  document.getElementById("totalWords").textContent = overall.total;
  document.getElementById("streakDays").textContent = updateStreak();

  const grid = document.getElementById("categoryGrid");
  grid.innerHTML = "";
  categories.forEach((name, i) => {
    const s = categoryStats(name);
    const pct = s.total ? Math.round((s.known / s.total) * 100) : 0;
    const accent = ACCENTS[i % ACCENTS.length];

    const card = document.createElement("button");
    card.className = "cat-card";
    card.style.setProperty("--accent", accent);
    card.innerHTML = `
      <span class="cat-name">${name}</span>
      <span class="cat-count">${s.total} words${s.known ? ` · ${s.known} known` : ""}</span>
      <div class="cat-bar"><div class="cat-bar-fill" style="width:${pct}%; background:${accent};"></div></div>
    `;
    card.addEventListener("click", () => openCategory(name));
    grid.appendChild(card);
  });
}

function showHome(){
  currentCategory = null;
  document.getElementById("homeView").style.display = "block";
  document.getElementById("deckView").style.display = "none";
  document.getElementById("summaryView").style.display = "none";
  renderHome();
}

// ---------- deck view ----------

function openCategory(name){
  currentCategory = name;
  order = shuffle(VOCAB[name].map((_, i) => i));
  index = 0;
  flipped = false;
  document.getElementById("deckTitle").textContent = name;
  document.getElementById("homeView").style.display = "none";
  document.getElementById("summaryView").style.display = "none";
  document.getElementById("deckView").style.display = "block";
  renderCard();
}

function currentPair(){
  return VOCAB[currentCategory][order[index]];
}

function renderProgress(){
  const s = categoryStats(currentCategory);
  const pct = (index / order.length) * 100;
  document.getElementById("progressFill").style.width = `${pct}%`;
  document.getElementById("posLabel").textContent = `${index + 1} / ${order.length}`;
  document.getElementById("statKnownInline").textContent = s.known;
  document.getElementById("statReviewInline").textContent = s.review;
}

function renderCard(){
  const [fr, en] = currentPair();
  document.getElementById("wordFr").textContent = fr;
  document.getElementById("wordEn").textContent = en;
  document.getElementById("card").classList.remove("flipped");
  flipped = false;
  renderProgress();
}

function flipCard(){
  flipped = !flipped;
  document.getElementById("card").classList.toggle("flipped", flipped);
}

function advance(mark){
  const marks = markFor(currentCategory);
  marks[currentPair()[0]] = mark;
  saveProgress();

  if(index + 1 >= order.length){
    showSummary();
  } else {
    index += 1;
    renderCard();
  }
}

// ---------- summary view ----------

function showSummary(){
  const s = categoryStats(currentCategory);
  document.getElementById("statKnown").textContent = s.known;
  document.getElementById("statReview").textContent = s.review;
  document.getElementById("summarySub").textContent =
    s.review > 0
      ? `You've been through every card in "${currentCategory}." A few are worth another look.`
      : `You've been through every card in "${currentCategory}." Nice work.`;

  document.getElementById("deckView").style.display = "none";
  document.getElementById("summaryView").style.display = "block";

  if(s.review === 0) burstConfetti();
}

// ---------- events ----------

document.getElementById("themeToggle").addEventListener("click", toggleTheme);
document.getElementById("btnBack").addEventListener("click", showHome);
document.getElementById("btnHome").addEventListener("click", showHome);

document.getElementById("card").addEventListener("click", flipCard);
document.addEventListener("keydown", (e) => {
  if(document.getElementById("deckView").style.display === "none") return;
  if(e.code === "Space" || e.code === "Enter"){ e.preventDefault(); flipCard(); }
  if(e.key === "ArrowRight") advance("known");
  if(e.key === "ArrowLeft") advance("review");
  if(e.key === "Escape") showHome();
});

document.getElementById("btnKnown").addEventListener("click", () => advance("known"));
document.getElementById("btnReview").addEventListener("click", () => advance("review"));

document.getElementById("btnShuffle").addEventListener("click", () => {
  order = shuffle(order);
  index = 0;
  renderCard();
});

document.getElementById("btnRestart").addEventListener("click", () => {
  order = shuffle(VOCAB[currentCategory].map((_, i) => i));
  index = 0;
  document.getElementById("summaryView").style.display = "none";
  document.getElementById("deckView").style.display = "block";
  renderCard();
});

document.getElementById("btnReviewMissed").addEventListener("click", () => {
  const marks = markFor(currentCategory);
  const reviewIndices = VOCAB[currentCategory]
    .map((pair, i) => ({ pair, i }))
    .filter(({ pair }) => marks[pair[0]] === "review")
    .map(({ i }) => i);

  order = reviewIndices.length
    ? shuffle(reviewIndices)
    : shuffle(VOCAB[currentCategory].map((_, i) => i));
  index = 0;
  document.getElementById("summaryView").style.display = "none";
  document.getElementById("deckView").style.display = "block";
  renderCard();
});

// ---------- boot ----------

initTheme();
showHome();
