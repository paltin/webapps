import { createKanaFilter } from './kana-filter.js';

const HIRAGANA_DATA = [
  { symbol: 'あ', romaji: 'a', group: 'base' },
  { symbol: 'い', romaji: 'i', group: 'base' },
  { symbol: 'う', romaji: 'u', group: 'base' },
  { symbol: 'え', romaji: 'e', group: 'base' },
  { symbol: 'お', romaji: 'o', group: 'base' },
  { symbol: 'か', romaji: 'ka', group: 'base' },
  { symbol: 'き', romaji: 'ki', group: 'base' },
  { symbol: 'く', romaji: 'ku', group: 'base' },
  { symbol: 'け', romaji: 'ke', group: 'base' },
  { symbol: 'こ', romaji: 'ko', group: 'base' },
  { symbol: 'さ', romaji: 'sa', group: 'base' },
  { symbol: 'し', romaji: 'shi', group: 'base' },
  { symbol: 'す', romaji: 'su', group: 'base' },
  { symbol: 'せ', romaji: 'se', group: 'base' },
  { symbol: 'そ', romaji: 'so', group: 'base' },
  { symbol: 'た', romaji: 'ta', group: 'base' },
  { symbol: 'ち', romaji: 'chi', group: 'base' },
  { symbol: 'つ', romaji: 'tsu', group: 'base' },
  { symbol: 'て', romaji: 'te', group: 'base' },
  { symbol: 'と', romaji: 'to', group: 'base' },
  { symbol: 'な', romaji: 'na', group: 'base' },
  { symbol: 'に', romaji: 'ni', group: 'base' },
  { symbol: 'ぬ', romaji: 'nu', group: 'base' },
  { symbol: 'ね', romaji: 'ne', group: 'base' },
  { symbol: 'の', romaji: 'no', group: 'base' },
  { symbol: 'は', romaji: 'ha', group: 'base' },
  { symbol: 'ひ', romaji: 'hi', group: 'base' },
  { symbol: 'ふ', romaji: 'fu', group: 'base' },
  { symbol: 'へ', romaji: 'he', group: 'base' },
  { symbol: 'ほ', romaji: 'ho', group: 'base' },
  { symbol: 'ま', romaji: 'ma', group: 'base' },
  { symbol: 'み', romaji: 'mi', group: 'base' },
  { symbol: 'む', romaji: 'mu', group: 'base' },
  { symbol: 'め', romaji: 'me', group: 'base' },
  { symbol: 'も', romaji: 'mo', group: 'base' },
  { symbol: 'や', romaji: 'ya', group: 'base' },
  { symbol: 'ゆ', romaji: 'yu', group: 'base' },
  { symbol: 'よ', romaji: 'yo', group: 'base' },
  { symbol: 'ら', romaji: 'ra', group: 'base' },
  { symbol: 'り', romaji: 'ri', group: 'base' },
  { symbol: 'る', romaji: 'ru', group: 'base' },
  { symbol: 'れ', romaji: 're', group: 'base' },
  { symbol: 'ろ', romaji: 'ro', group: 'base' },
  { symbol: 'わ', romaji: 'wa', group: 'base' },
  { symbol: 'を', romaji: 'wo', group: 'base' },
  { symbol: 'ん', romaji: 'n', group: 'base' },
  { symbol: 'が', romaji: 'ga', group: 'dakuten' },
  { symbol: 'ぎ', romaji: 'gi', group: 'dakuten' },
  { symbol: 'ぐ', romaji: 'gu', group: 'dakuten' },
  { symbol: 'げ', romaji: 'ge', group: 'dakuten' },
  { symbol: 'ご', romaji: 'go', group: 'dakuten' },
  { symbol: 'ざ', romaji: 'za', group: 'dakuten' },
  { symbol: 'じ', romaji: 'ji', group: 'dakuten' },
  { symbol: 'ず', romaji: 'zu', group: 'dakuten' },
  { symbol: 'ぜ', romaji: 'ze', group: 'dakuten' },
  { symbol: 'ぞ', romaji: 'zo', group: 'dakuten' },
  { symbol: 'だ', romaji: 'da', group: 'dakuten' },
  { symbol: 'ぢ', romaji: 'ji', group: 'dakuten' },
  { symbol: 'づ', romaji: 'zu', group: 'dakuten' },
  { symbol: 'で', romaji: 'de', group: 'dakuten' },
  { symbol: 'ど', romaji: 'do', group: 'dakuten' },
  { symbol: 'ば', romaji: 'ba', group: 'dakuten' },
  { symbol: 'び', romaji: 'bi', group: 'dakuten' },
  { symbol: 'ぶ', romaji: 'bu', group: 'dakuten' },
  { symbol: 'べ', romaji: 'be', group: 'dakuten' },
  { symbol: 'ぼ', romaji: 'bo', group: 'dakuten' },
  { symbol: 'ぱ', romaji: 'pa', group: 'dakuten' },
  { symbol: 'ぴ', romaji: 'pi', group: 'dakuten' },
  { symbol: 'ぷ', romaji: 'pu', group: 'dakuten' },
  { symbol: 'ぺ', romaji: 'pe', group: 'dakuten' },
  { symbol: 'ぽ', romaji: 'po', group: 'dakuten' },
  { symbol: 'きゃ', romaji: 'kya', group: 'yoon' },
  { symbol: 'きゅ', romaji: 'kyu', group: 'yoon' },
  { symbol: 'きょ', romaji: 'kyo', group: 'yoon' },
  { symbol: 'ぎゃ', romaji: 'gya', group: 'yoon' },
  { symbol: 'ぎゅ', romaji: 'gyu', group: 'yoon' },
  { symbol: 'ぎょ', romaji: 'gyo', group: 'yoon' },
  { symbol: 'しゃ', romaji: 'sha', group: 'yoon' },
  { symbol: 'しゅ', romaji: 'shu', group: 'yoon' },
  { symbol: 'しょ', romaji: 'sho', group: 'yoon' },
  { symbol: 'じゃ', romaji: 'ja', group: 'yoon' },
  { symbol: 'じゅ', romaji: 'ju', group: 'yoon' },
  { symbol: 'じょ', romaji: 'jo', group: 'yoon' },
  { symbol: 'ちゃ', romaji: 'cha', group: 'yoon' },
  { symbol: 'ちゅ', romaji: 'chu', group: 'yoon' },
  { symbol: 'ちょ', romaji: 'cho', group: 'yoon' },
  { symbol: 'にゃ', romaji: 'nya', group: 'yoon' },
  { symbol: 'にゅ', romaji: 'nyu', group: 'yoon' },
  { symbol: 'にょ', romaji: 'nyo', group: 'yoon' },
  { symbol: 'ひゃ', romaji: 'hya', group: 'yoon' },
  { symbol: 'ひゅ', romaji: 'hyu', group: 'yoon' },
  { symbol: 'ひょ', romaji: 'hyo', group: 'yoon' },
  { symbol: 'びゃ', romaji: 'bya', group: 'yoon' },
  { symbol: 'びゅ', romaji: 'byu', group: 'yoon' },
  { symbol: 'びょ', romaji: 'byo', group: 'yoon' },
  { symbol: 'ぴゃ', romaji: 'pya', group: 'yoon' },
  { symbol: 'ぴゅ', romaji: 'pyu', group: 'yoon' },
  { symbol: 'ぴょ', romaji: 'pyo', group: 'yoon' },
  { symbol: 'みゃ', romaji: 'mya', group: 'yoon' },
  { symbol: 'みゅ', romaji: 'myu', group: 'yoon' },
  { symbol: 'みょ', romaji: 'myo', group: 'yoon' },
  { symbol: 'りゃ', romaji: 'rya', group: 'yoon' },
  { symbol: 'りゅ', romaji: 'ryu', group: 'yoon' },
  { symbol: 'りょ', romaji: 'ryo', group: 'yoon' },
];

const GRID_LAYOUT = [
  ['あ', 'い', 'う', 'え', 'お'],
  ['か', 'き', 'く', 'け', 'こ'],
  ['が', 'ぎ', 'ぐ', 'げ', 'ご'],
  ['さ', 'し', 'す', 'せ', 'そ'],
  ['ざ', 'じ', 'ず', 'ぜ', 'ぞ'],
  ['た', 'ち', 'つ', 'て', 'と'],
  ['だ', 'ぢ', 'づ', 'で', 'ど'],
  ['な', 'に', 'ぬ', 'ね', 'の'],
  ['は', 'ひ', 'ふ', 'へ', 'ほ'],
  ['ば', 'び', 'ぶ', 'べ', 'ぼ'],
  ['ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ'],
  ['ま', 'み', 'む', 'め', 'も'],
  ['や', 'ゆ', 'よ', null, null],
  ['ら', 'り', 'る', 'れ', 'ろ'],
  ['わ', 'を', 'ん', null, null],
  ['きゃ', 'きゅ', 'きょ', null, null],
  ['ぎゃ', 'ぎゅ', 'ぎょ', null, null],
  ['しゃ', 'しゅ', 'しょ', null, null],
  ['じゃ', 'じゅ', 'じょ', null, null],
  ['ちゃ', 'ちゅ', 'ちょ', null, null],
  ['にゃ', 'にゅ', 'にょ', null, null],
  ['ひゃ', 'ひゅ', 'ひょ', null, null],
  ['びゃ', 'びゅ', 'びょ', null, null],
  ['ぴゃ', 'ぴゅ', 'ぴょ', null, null],
  ['みゃ', 'みゅ', 'みょ', null, null],
  ['りゃ', 'りゅ', 'りょ', null, null],
];

const BASE_SYMBOLS = HIRAGANA_DATA.filter((item) => item.group === 'base').map((item) => item.symbol);
const symbolMap = new Map(HIRAGANA_DATA.map((item) => [item.symbol, item]));

const rowsWrap = document.getElementById('rows');
const answerEl = document.getElementById('answer');
const regenBtn = document.getElementById('regenBtn');
const panel = document.getElementById('panel');
const openSettingsBtn = document.getElementById('openSettings');
const closeSettingsBtn = document.getElementById('closeSettings');
const rowsCountInput = document.getElementById('rowsCount');
const lenPerRowInput = document.getElementById('lenPerRow');
const kanaSizeInput = document.getElementById('kanaSize');
const applySettingsBtn = document.getElementById('applySettings');
const resetSettingsBtn = document.getElementById('resetSettings');
const openAlphabetBtn = document.getElementById('openAlphabet');
const backdrop = document.getElementById('backdrop');

const clamp = (value, min, max) => {
  const number = parseInt(value, 10);
  if (Number.isNaN(number)) {
    return min;
  }
  return Math.max(min, Math.min(max, number));
};

let rowsCount = clamp(rowsCountInput.value, 1, 10);
let lenPerRow = clamp(lenPerRowInput.value, 1, 20);
let kanaSize = clamp(kanaSizeInput.value, 24, 120);

let selectedKanas = new Set(BASE_SYMBOLS);
let currentSeq = [];
let breakpoints = [];
let currentIdx = 0;
let settingsOpen = false;
let filterOpen = false;

const filter = createKanaFilter({
  trigger: openAlphabetBtn,
  title: 'Выбор слогов для тренировки',
  data: HIRAGANA_DATA,
  gridLayout: GRID_LAYOUT,
  defaultSymbols: BASE_SYMBOLS,
  initialSelected: Array.from(selectedKanas),
  onApply(selectedSymbols) {
    selectedKanas = new Set(selectedSymbols);
    ensureSelection();
    newSet();
  },
  onStateChange(isOpen) {
    filterOpen = isOpen;
    updateBackdrop();
  },
});

function ensureSelection() {
  if (!selectedKanas.size) {
    selectedKanas = new Set(BASE_SYMBOLS);
    filter.setSelectedSymbols(BASE_SYMBOLS);
  }
}

function setKanaSize(px) {
  document.documentElement.style.setProperty('--kanaSize', `${px}px`);
}

function updateBackdrop() {
  if (settingsOpen || filterOpen) {
    backdrop.classList.add('show');
    backdrop.setAttribute('aria-hidden', 'false');
  } else {
    backdrop.classList.remove('show');
    backdrop.setAttribute('aria-hidden', 'true');
  }
}

function openSettingsPanel() {
  settingsOpen = true;
  panel.classList.add('open');
  panel.setAttribute('aria-hidden', 'false');
  updateBackdrop();
}

function closeSettingsPanel() {
  settingsOpen = false;
  panel.classList.remove('open');
  panel.setAttribute('aria-hidden', 'true');
  updateBackdrop();
}

function newSet() {
  const available = Array.from(selectedKanas)
    .map((symbol) => symbolMap.get(symbol))
    .filter(Boolean);

  if (!available.length) {
    rowsWrap.innerHTML = '<p class="info-message">Выберите хотя бы один слог в фильтре.</p>';
    currentSeq = [];
    breakpoints = [];
    currentIdx = 0;
    return;
  }

  currentSeq = [];
  breakpoints = [];

  for (let r = 0; r < rowsCount; r += 1) {
    const pool = available.slice();
    const rowEntries = [];

    while (rowEntries.length < lenPerRow && pool.length) {
      const idx = Math.floor(Math.random() * pool.length);
      rowEntries.push(pool.splice(idx, 1)[0]);
    }

    if (rowEntries.length) {
      rowEntries.forEach((entry) => currentSeq.push(entry));
      breakpoints.push(currentSeq.length - 1);
    }
  }

  currentIdx = 0;
  renderRows();
  setCurrentVisual();
  answerEl.value = '';
  answerEl.focus();
}

function renderRows() {
  rowsWrap.innerHTML = '';
  let start = 0;
  breakpoints.forEach((end) => {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'row';
    for (let i = start; i <= end; i += 1) {
      const entry = currentSeq[i];
      const span = document.createElement('span');
      span.className = 'kana';
      span.dataset.idx = String(i);
      span.textContent = entry.symbol;
      rowDiv.appendChild(span);
    }
    rowsWrap.appendChild(rowDiv);
    start = end + 1;
  });
}

function setCurrentVisual() {
  const spans = rowsWrap.querySelectorAll('.kana');
  spans.forEach((span) => span.classList.remove('current'));
  if (spans[currentIdx]) {
    spans[currentIdx].classList.add('current');
  }
}

const CYRILLIC_VOWELS = new Set(['а', 'е', 'ё', 'и', 'о', 'у', 'ы', 'э', 'ю', 'я']);
const ROMAJI_ALIASES = {
  si: 'shi',
  ti: 'chi',
  tu: 'tsu',
  hu: 'fu',
  zi: 'ji',
  di: 'ji',
  du: 'zu',
  syu: 'shu',
  sya: 'sha',
  syo: 'sho',
  tyu: 'chu',
  tya: 'cha',
  tyo: 'cho',
};

const RU_TO_ROMAJI = {
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'g',
  д: 'd',
  е: 'e',
  ё: 'yo',
  ж: 'zh',
  з: 'z',
  и: 'i',
  й: 'y',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ф: 'f',
  х: 'h',
  ц: 'ts',
  ч: 'ch',
  ш: 'sh',
  щ: 'shch',
  ъ: '',
  ы: 'y',
  ь: '',
  э: 'e',
  ю: 'yu',
  я: 'ya',
};

const hasCyrillic = (value) => /[\u0400-\u04FF]/.test(value);

function normalizeToken(raw) {
  const value = (raw || '').trim().toLowerCase();
  if (!value) {
    return '';
  }

  let normalized = value;
  if (hasCyrillic(value)) {
    normalized = '';
    for (const char of value) {
      normalized += Object.prototype.hasOwnProperty.call(RU_TO_ROMAJI, char) ? RU_TO_ROMAJI[char] : char;
    }
  }

  normalized = normalized
    .split('')
    .filter((ch) => (ch >= 'a' && ch <= 'z') || (ch >= '0' && ch <= '9') || ch === '-')
    .join('');

  if (Object.prototype.hasOwnProperty.call(ROMAJI_ALIASES, normalized)) {
    normalized = ROMAJI_ALIASES[normalized];
  }

  return normalized;
}

function okMatch(expected, candidate) {
  if (candidate === expected) {
    return true;
  }
  if (expected === 'wo' && (candidate === 'wo' || candidate === 'o')) {
    return true;
  }
  if (expected === 'n' && (candidate === 'n' || candidate === 'm')) {
    return true;
  }
  return false;
}

function submitCurrent() {
  if (currentIdx >= currentSeq.length) {
    return;
  }

  const spans = rowsWrap.querySelectorAll('.kana');
  const tokenRaw = answerEl.value;
  const normalized = normalizeToken(tokenRaw);
  if (!normalized) {
    return;
  }

  const expected = currentSeq[currentIdx]?.romaji || '';
  const span = spans[currentIdx];

  if (okMatch(expected, normalized)) {
    span.classList.remove('current');
    span.classList.add('done');
    answerEl.value = '';
    currentIdx += 1;
    if (currentIdx >= currentSeq.length) {
      newSet();
      return;
    }
    setCurrentVisual();
  } else {
    span.classList.remove('blink');
    void span.offsetWidth;
    span.classList.add('blink');
    answerEl.select();
  }
}

answerEl.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
    event.preventDefault();
    submitCurrent();
  }
});

answerEl.addEventListener('input', () => {
  if (currentIdx >= currentSeq.length) {
    return;
  }
  const rawValue = (answerEl.value || '').toLowerCase();
  if (!rawValue) {
    return;
  }
  const expected = currentSeq[currentIdx]?.romaji || '';
  const hasC = hasCyrillic(rawValue);
  let foundVowel = false;
  if (hasC) {
    for (const char of rawValue) {
      if (CYRILLIC_VOWELS.has(char)) {
        foundVowel = true;
        break;
      }
    }
  } else {
    for (const char of rawValue) {
      if ('aeiou'.includes(char)) {
        foundVowel = true;
        break;
      }
    }
  }
  const normalized = normalizeToken(rawValue);
  if (normalized === expected) {
    submitCurrent();
    return;
  }
  if (foundVowel || normalized.length >= expected.length) {
    submitCurrent();
  }
});

openSettingsBtn.addEventListener('click', openSettingsPanel);
closeSettingsBtn.addEventListener('click', closeSettingsPanel);
applySettingsBtn.addEventListener('click', () => {
  rowsCount = clamp(rowsCountInput.value, 1, 10);
  lenPerRow = clamp(lenPerRowInput.value, 1, 20);
  kanaSize = clamp(kanaSizeInput.value, 24, 120);
  setKanaSize(kanaSize);
  newSet();
  closeSettingsPanel();
});

resetSettingsBtn.addEventListener('click', () => {
  rowsCountInput.value = 1;
  lenPerRowInput.value = 7;
  kanaSizeInput.value = 50;
  rowsCount = 1;
  lenPerRow = 7;
  kanaSize = 50;
  setKanaSize(kanaSize);
  newSet();
});

regenBtn.addEventListener('click', () => newSet());

backdrop.addEventListener('click', () => {
  filter.close();
  closeSettingsPanel();
});

setKanaSize(kanaSize);
ensureSelection();
updateBackdrop();
newSet();
answerEl.focus();
