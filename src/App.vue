<template>
  <div class="card">
    <header>
      <h1 class="title">日本語ボキャブラリー練習</h1>
      <p v-if="!showResult" class="counter">{{ currentPosition + 1 }}/{{ deck.length }}</p>
    </header>
    <div v-if="showResult" class="result">
      <p>Your score is: {{ score }}/{{ deck.length }} {{ score/deck.length*100 }}%</p>
      <form @submit="retry">
        <div>
          <button tabindex="0" type="submit">Retry</button>
        </div>
      </form>
    </div>
    <div v-else-if="showFeedback" class="feedback">
      <p v-if="deck[currentPosition].kana === answer" class="ok">✔ Correct!</p>
      <p v-else class="bad">✖ Incorrect. <strong>{{ deck[currentPosition].mean }}</strong>: <strong>{{ deck[currentPosition].kana }}</strong></p>
      <form @submit="nextCard">
        <div>
          <button tabindex="0" type="submit">Continue</button>
        </div>
      </form>
    </div>
    <div v-else class="question">
      <p class="prompt">Type the kana for:</p>
      <p class="meaning">{{ deck[currentPosition].mean  }}</p>
      <form @submit="checkAnswer">
        <div>
          <label for="answer" hidden>Your answer</label>
          <input tabindex="0" name="answer" id="answer" type="text" v-model="answer" autocomplete="off"
            autocapitalize="none" autocorrect="off" inputmode="text" lang="ja" placeholder="かな"
            @keydown.enter.prevent="handleEnter" />
        </div>
        <div>
          <button tabindex="0" type="submit">Submit</button>
        </div>
      </form>
    </div>    
  </div>
</template>

<script setup>
import { ref } from 'vue';
import vocabulary from './data/vocabulary.json'

const deck = ref(shuffleDeck())
const currentPosition = ref(0)
const answer = ref('')
const score = ref(0)
const showFeedback = ref(false)
const showResult = ref(false)
function shuffleDeck() {
  // Clone vocabulary into deck
  let deck = [...vocabulary]
  let currentIndex = vocabulary.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [deck[currentIndex], deck[randomIndex]] = [
      deck[randomIndex], deck[currentIndex]];
  }

  return deck
}


function checkAnswer() {
  if (deck.value[currentPosition.value].kana === answer.value) {
    score.value++
  }

  showFeedback.value = true
}

function nextCard() {
  if (currentPosition.value + 1 === deck.value.length) {
    showResult.value = true
  } else {
    showFeedback.value = false
    currentPosition.value++
    answer.value = ''
  }
}

function retry() {
  deck.value = shuffleDeck()
  currentPosition.value = 0
  answer.value = ''
  score.value = 0
  showFeedback.value = false
  showResult.value = false
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;600;700&display=swap');

:root{
  --bg: #0f1220;
  --bg-card: #161a2e;
  --text: #e9ecf1;
  --text-dim: #b7bed0;
  --accent: #6ea8fe;
  --accent-2: #8ef0c2;
  --danger: #ff7a90;
  --ok: #71e5a1;
  --ring: #9db9ff;
  --shadow: 0 10px 30px rgba(0,0,0,.35);
  --radius: 18px;
  --space: 18px;
}

@media (prefers-color-scheme: light) {
  :root{
    --bg: #f6f7fb;
    --bg-card: #ffffff;
    --text: #1b2132;
    --text-dim: #5a6481;
    --accent: #3a63ff;
    --accent-2: #22b07d;
    --danger: #e54666;
    --ok: #18a566;
    --ring: #6b8bff;
    --shadow: 0 8px 28px rgba(20,31,58,.12);
  }
}

/* Page scaffold */
html, body, #app {
  height: 100%;
}
body{
  margin:0;
  padding: 0;
  background:
    radial-gradient(1200px 800px at 10% -10%, rgba(110,168,254,.15), transparent 40%),
    radial-gradient(1000px 600px at 110% 10%, rgba(142,240,194,.12), transparent 40%),
    var(--bg);
  color: var(--text);
  font-family: "Noto Sans JP", system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display:grid;
  place-items:center;
}

/* -------------------------------------------------------
   Card layout
------------------------------------------------------- */
.card{
  width: min(680px, 92vw);
  background: var(--bg-card);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: clamp(18px, 3.5vw, 28px);
  border: 1px solid rgba(255,255,255,.06);
  animation: pop .28s ease-out;
}

@keyframes pop {
  from { transform: translateY(8px) scale(.98); opacity: 0; }
  to   { transform: translateY(0)    scale(1);   opacity: 1; }
}

/* Header */
header{
  display:flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}

.title{
  margin:0;
  font-weight: 700;
  letter-spacing: .2px;
  line-height: 1.15;
  font-size: clamp(20px, 3.2vw, 28px);
}

/* counter pill */
.counter{
  margin:0;
  font-weight: 600;
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 14px;
}

/* -------------------------------------------------------
   Common sections
------------------------------------------------------- */
.result, .feedback, .question{
  display:grid;
  gap: 16px;
}

/* Prompt + meaning */
.prompt{
  margin: 8px 0 0;
  color: var(--text-dim);
  font-weight: 600;
  letter-spacing: .3px;
}
.meaning{
  margin: 2px 0 14px;
  font-size: clamp(20px, 5vw, 30px);
  line-height: 1.2;
  font-weight: 700;
}

/* Score line */
.result > p{
  margin: 4px 0 8px;
  font-weight: 700;
  font-size: clamp(16px, 3.2vw, 20px);
}

/* Feedback states */
.feedback p{
  margin: 0;
  font-size: clamp(16px, 3vw, 20px);
}
.feedback p.ok{
  color: var(--ok);
}
.feedback p.bad{
  color: var(--danger);
}
.feedback strong{
  font-weight: 700;
}

/* -------------------------------------------------------
   Forms, inputs, buttons
------------------------------------------------------- */
form{
  display:flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}

input[type="text"]{
  width: min(420px, 100%);
  font-family: "Noto Sans JP", system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
  font-weight: 600;
  font-size: clamp(18px, 4.2vw, 24px);
  line-height: 1.2;
  color: var(--text);
  background: rgba(255,255,255,.06);
  border: 1px solid var(--ring);
  border-radius: 14px;
  padding: 14px 16px;
  outline: none;
  transition: border-color .15s ease, box-shadow .15s ease, background .15s ease;
}
input[type="text"]::placeholder{
  color: color-mix(in srgb, var(--text-dim) 70%, transparent);
}
input[type="text"]:focus{
  border-color: var(--ring);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--ring) 20%, transparent);
  background: rgba(255,255,255,.09);
}
input[lang="ja"]{
  ime-mode: active; /* helps some browsers hint IME */
}

/* Buttons */
button{
  appearance: none;
  font-family: inherit;
  font-weight: 700;
  font-size: 14px;
  line-height: 1;
  color: #0b122b;
  background: linear-gradient(180deg, var(--accent) 0%, color-mix(in srgb, var(--accent) 85%, #0b122b) 100%);
  border: none;
  border-radius: 12px;
  padding: 12px 16px;
  cursor: pointer;
  transition: transform .04s ease, filter .12s ease, box-shadow .12s ease;
  box-shadow: 0 6px 16px color-mix(in srgb, var(--accent) 30%, transparent);
}
button:hover{ filter: brightness(1.05); }
button:active{ transform: translateY(1px); }
button:focus-visible{
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}

/* Make the single button rows align nicely */
form > div{
  display:flex;
  align-items:center;
}

/* -------------------------------------------------------
   Utility bits
------------------------------------------------------- */
[hidden]{ display:none !important; }

/* Reduce motion preference */
@media (prefers-reduced-motion: reduce){
  *{ animation: none !important; transition: none !important; }
}
</style>
