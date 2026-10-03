// Category filter + text search for any [data-filter-scope] block.
// Items: [data-item] with data-cats="A|B" and optional data-text.
// Groups ([data-item-group]) hide when all their items are hidden.
// The active filter is mirrored in ?filter= so it survives reloads and sharing.
export function initFilters() {
  document.querySelectorAll<HTMLElement>('[data-filter-scope]').forEach((scope) => {
    const buttons = scope.querySelectorAll<HTMLButtonElement>('[data-filter]');
    const search = scope.querySelector<HTMLInputElement>('[data-search]');
    const items = scope.querySelectorAll<HTMLElement>('[data-item]');
    const groups = scope.querySelectorAll<HTMLElement>('[data-item-group]');
    const empty = scope.querySelector<HTMLElement>('[data-empty]');
    let active = 'all';

    const apply = () => {
      const q = (search?.value || '').trim().toLowerCase();
      let shown = 0;
      items.forEach((el) => {
        const cats = (el.dataset.cats || '').split('|');
        const ok =
          (active === 'all' || cats.includes(active)) &&
          (!q || (el.dataset.text || el.textContent || '').toLowerCase().includes(q));
        el.hidden = !ok;
        if (ok) shown++;
      });
      groups.forEach((g) => (g.hidden = !g.querySelector('[data-item]:not([hidden])')));
      if (empty) empty.hidden = shown > 0;
    };

    buttons.forEach((btn) =>
      btn.addEventListener('click', () => {
        active = btn.dataset.filter || 'all';
        buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
        apply();
        const url = new URL(location.href);
        if (active === 'all') url.searchParams.delete('filter');
        else url.searchParams.set('filter', active);
        history.replaceState(null, '', url);
      }),
    );
    search?.addEventListener('input', apply);

    const initial = new URL(location.href).searchParams.get('filter');
    Array.from(buttons).find((b) => b.dataset.filter === initial)?.click();
  });
}
