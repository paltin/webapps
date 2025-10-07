// Step 3: Kana filter API stub (no DOM yet)
// Usage:
//   const filter = initKanaFilter({ data, gridLayout, defaultSymbols, initialSelected, onApply, onOpenChange })
//   filter.open(); filter.close(); filter.getSelected(); filter.setSelected([...])

/**
 * @param {Object} options
 * @param {{symbol:string, romaji:string, group?:string}[]} options.data
 * @param {string[][]} options.gridLayout
 * @param {string[]} options.defaultSymbols
 * @param {string[]} [options.initialSelected]
 * @param {(selected:string[])=>void} options.onApply
 * @param {(open:boolean)=>void} [options.onOpenChange]
 */
export function initKanaFilter({
  data,
  gridLayout,
  defaultSymbols,
  initialSelected,
  onApply,
  onOpenChange = () => {},
}) {
  if (!Array.isArray(data) || data.length === 0) throw new Error('kana-filter: data is empty');
  if (!Array.isArray(gridLayout) || gridLayout.length === 0) throw new Error('kana-filter: gridLayout is empty');
  if (!Array.isArray(defaultSymbols)) throw new Error('kana-filter: defaultSymbols must be array');
  if (typeof onApply !== 'function') throw new Error('kana-filter: onApply is required');

  const symbolSet = new Set(data.map((d) => d.symbol));
  const normalizeList = (list) => (Array.isArray(list) ? list.filter((s) => symbolSet.has(s)) : []);

  let isOpen = false;
  let selected = new Set(normalizeList(initialSelected?.length ? initialSelected : defaultSymbols));

  function open() {
    if (isOpen) return;
    isOpen = true;
    onOpenChange(true);
  }
  function close() {
    if (!isOpen) return;
    isOpen = false;
    onOpenChange(false);
  }
  function getSelected() {
    return Array.from(selected);
  }
  function setSelected(list) {
    selected = new Set(normalizeList(list));
  }
  function apply() {
    if (selected.size === 0) setSelected(defaultSymbols);
    onApply(getSelected());
    close();
  }
  function destroy() {
    // nothing to cleanup yet
  }

  return { open, close, isOpen: () => isOpen, getSelected, setSelected, apply, destroy };
}
