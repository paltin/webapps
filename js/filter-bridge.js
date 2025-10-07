import { HIRAGANA_DATA, BASE_SYMBOLS, GRID_LAYOUT } from "./hira-data.js";
import { initKanaFilter } from "./kana-filter.js";

// Minimal wiring for console testing only. Does not alter UI behavior.
const bridge = {};

bridge.data = { HIRAGANA_DATA, BASE_SYMBOLS, GRID_LAYOUT };

bridge.filter = initKanaFilter({
  data: HIRAGANA_DATA,
  gridLayout: GRID_LAYOUT,
  defaultSymbols: BASE_SYMBOLS,
  initialSelected: BASE_SYMBOLS,
  onApply(selected) {
    console.log("[kana-filter] apply", selected);
  },
  onOpenChange(open) {
    console.log("[kana-filter] open:", open);
  }
});

// Expose for manual console tests
window.__kanaData = bridge.data;
window.__kanaFilter = bridge.filter;

console.log("[kana-filter] bridge ready: __kanaFilter available");
