export function createKanaFilter({
  trigger,
  title = 'Выбор элементов',
  data,
  gridLayout,
  defaultSymbols = [],
  initialSelected,
  onApply = () => {},
  onStateChange = () => {},
}) {
  if (!Array.isArray(data) || !data.length) {
    throw new Error('Kana filter requires non-empty data array.');
  }

  const symbolMap = new Map(data.map((item) => [item.symbol, item]));
  const allSymbols = data.map((item) => item.symbol);
  const defaults = new Set((defaultSymbols.length ? defaultSymbols : allSymbols).filter((sym) => symbolMap.has(sym)));
  let selected = new Set((initialSelected || defaultSymbols || allSymbols).filter((sym) => symbolMap.has(sym)));
  let isOpen = false;

  const panel = document.createElement('aside');
  panel.className = 'kana-filter';
  panel.setAttribute('aria-hidden', 'true');
  panel.innerHTML = `
    <div class="kana-filter__header">
      <strong>${title}</strong>
      <button type="button" class="kana-filter__close" aria-label="Закрыть панель">×</button>
    </div>
    <div class="kana-filter__content">
      <div class="kana-filter__toolbar">
        <button type="button" class="btn ghost js-select-all">Выбрать все</button>
        <button type="button" class="btn ghost js-clear">Снять все</button>
        <button type="button" class="btn ghost js-defaults">По умолчанию</button>
      </div>
      <div class="kana-filter__grid"></div>
    </div>
    <div class="kana-filter__actions">
      <button type="button" class="btn js-apply">Применить выбранные</button>
    </div>
  `;

  document.body.appendChild(panel);

  const gridEl = panel.querySelector('.kana-filter__grid');
  const closeBtn = panel.querySelector('.kana-filter__close');
  const selectAllBtn = panel.querySelector('.js-select-all');
  const clearBtn = panel.querySelector('.js-clear');
  const defaultsBtn = panel.querySelector('.js-defaults');
  const applyBtn = panel.querySelector('.js-apply');

  function renderGrid() {
    gridEl.innerHTML = '';
    gridLayout.forEach((row) => {
      row.forEach((symbol) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'kana-filter__item';

        if (!symbol) {
          button.classList.add('kana-filter__item--empty');
          gridEl.appendChild(button);
          return;
        }

        const entry = symbolMap.get(symbol);
        if (!entry) {
          button.classList.add('kana-filter__item--empty');
          gridEl.appendChild(button);
          return;
        }

        button.dataset.kana = entry.symbol;
        button.innerHTML = `
          <span class="kana-filter__kana">${entry.symbol}</span>
          <span class="kana-filter__romaji">${entry.romaji}</span>
        `;
        if (selected.has(entry.symbol)) {
          button.classList.add('selected');
        }
        button.addEventListener('click', () => {
          if (selected.has(entry.symbol)) {
            selected.delete(entry.symbol);
            button.classList.remove('selected');
          } else {
            selected.add(entry.symbol);
            button.classList.add('selected');
          }
        });
        gridEl.appendChild(button);
      });
    });
  }

  function setSelectedSymbols(symbols) {
    selected = new Set(symbols.filter((sym) => symbolMap.has(sym)));
    if (isOpen) {
      renderGrid();
    }
  }

  function open() {
    if (isOpen) return;
    isOpen = true;
    renderGrid();
    panel.classList.add('kana-filter--open');
    panel.setAttribute('aria-hidden', 'false');
    onStateChange(true);
  }

  function close() {
    if (!isOpen) return;
    isOpen = false;
    panel.classList.remove('kana-filter--open');
    panel.setAttribute('aria-hidden', 'true');
    onStateChange(false);
  }

  if (trigger) {
    trigger.addEventListener('click', () => open());
  }

  closeBtn.addEventListener('click', () => close());

  selectAllBtn.addEventListener('click', () => {
    setSelectedSymbols(allSymbols);
  });

  clearBtn.addEventListener('click', () => {
    setSelectedSymbols([]);
  });

  defaultsBtn.addEventListener('click', () => {
    setSelectedSymbols(Array.from(defaults));
  });

  applyBtn.addEventListener('click', () => {
    onApply(Array.from(selected));
    close();
  });

  // Render once so keyboard focus works even before opening
  renderGrid();

  return {
    open,
    close,
    isOpen: () => isOpen,
    getSelectedSymbols: () => Array.from(selected),
    setSelectedSymbols,
    destroy() {
      panel.remove();
    },
  };
}
