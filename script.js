// Carnet de Mots — app logic
// Expects a global VOCAB object (see words.js):
// { "Category name": [["motFrançais","english translation"], ...], ... }

const STORAGE_KEY = "carnet-de-mots-progress-v1";

let progress = loadProgress();
let categories = Object.keys(VOCAB);
let currentCategory = categories[0];
let order = [];
let index = 0;
let flipped = false;

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

function shuffle(arr){
  const a = arr.slice();
  for(let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildCategoryPicker(){
  const select = document.getElementById("categorySelect");
  select.innerHTML = "";
  categories.forEach(name => {
    const opt = document.createElement("option");
    opt.value = name;
    opt.textContent = `${name} (${VOCAB[name].length})`;
    select.appendChild(opt);
  });
  select.value = currentCategory;
  select.addEventListener("change", () => selectCategory(select.value));
}

function selectCategory(name){
  currentCategory = name;
  order = shuffle(VOCAB[name].map((_, i) => i));
  index = 0;
  flipped = false;
  document.getElementById("deckCount").textContent = `${VOCAB[name].length} words`;
  showDeckView();
  renderCard();
}

function currentPair(){
  return VOCAB[currentCategory][order[index]];
}

function renderTally(){
  const tallyEl = document.getElementById("tally");
  tallyEl.innerHTML = "";
  const marks = markFor(currentCategory);
  order.forEach((wordIndex, i) => {
    const dot = document.createElement("span");
    let cls = "dot";
    const fr = VOCAB[currentCategory][wordIndex][0];
    if(i === index) cls += " current";
    else if(marks[fr] === "known") cls += " seen-known";
    else if(marks[fr] === "review") cls += " seen-review";
    dot.className = cls;
    tallyEl.appendChild(dot);
  });
}

function renderCard(){
  const [fr, en] = currentPair();
  document.getElementById("wordFr").textContent = fr;
  document.getElementById("wordEn").textContent = en;
  document.getElementById("card").classList.remove("flipped");
  flipped = false;
  document.getElementById("posLabel").textContent = `Card ${index + 1} of ${order.length}`;
  renderTally();
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

function showDeckView(){
  document.getElementById("deckView").style.display = "block";
  document.getElementById("summaryView").style.display = "none";
}

function showSummary(){
  const marks = markFor(currentCategory);
  const words = VOCAB[currentCategory].map(pair => pair[0]);
  const known = words.filter(w => marks[w] === "known").length;
  const review = words.filter(w => marks[w] === "review").length;

  document.getElementById("statKnown").textContent = known;
  document.getElementById("statReview").textContent = review;
  document.getElementById("summarySub").textContent =
    review > 0
      ? `You've been through every card in "${currentCategory}." A few are worth another look.`
      : `You've been through every card in "${currentCategory}." Nice work.`;

  document.getElementById("deckView").style.display = "none";
  document.getElementById("summaryView").style.display = "block";
  renderTally();
}

document.getElementById("card").addEventListener("click", flipCard);
document.addEventListener("keydown", (e) => {
  if(document.getElementById("deckView").style.display === "none") return;
  if(e.code === "Space" || e.code === "Enter"){ e.preventDefault(); flipCard(); }
  if(e.key === "ArrowRight") advance("known");
  if(e.key === "ArrowLeft") advance("review");
});

document.getElementById("btnKnown").addEventListener("click", () => advance("known"));
document.getElementById("btnReview").addEventListener("click", () => advance("review"));

document.getElementById("btnShuffle").addEventListener("click", () => {
  order = shuffle(order);
  index = 0;
  renderCard();
});

document.getElementById("btnRestart").addEventListener("click", () => {
  order = shuffle(order.length ? order : VOCAB[currentCategory].map((_, i) => i));
  index = 0;
  showDeckView();
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
  showDeckView();
  renderCard();
});

buildCategoryPicker();
selectCategory(currentCategory
