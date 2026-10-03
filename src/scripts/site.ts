const root = document.documentElement;

// Theme toggle — the initial theme is set by an inline script in <head>.
document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((btn) =>
  btn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme-resolved') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    root.setAttribute('data-theme-resolved', next);
    try {
      localStorage.setItem('theme', next);
    } catch {}
  }),
);

// Header border once the page scrolls.
const header = document.querySelector<HTMLElement>('[data-header]');
const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Mobile menu.
const menuBtn = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const mobileNav = document.querySelector<HTMLElement>('[data-mobile-nav]');
const setMenu = (open: boolean) => {
  if (!menuBtn || !mobileNav) return;
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  mobileNav.hidden = !open;
  document.body.style.overflow = open ? 'hidden' : '';
};
menuBtn?.addEventListener('click', () => setMenu(!!mobileNav?.hidden));
window.addEventListener('keydown', (e) => e.key === 'Escape' && mobileNav && !mobileNav.hidden && setMenu(false));
window.matchMedia('(min-width: 1081px)').addEventListener('change', (e) => e.matches && setMenu(false));

// Reveal-on-scroll.
const io = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    }),
  { rootMargin: '0px 0px -8% 0px' },
);
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Lightbox: any <a data-lb="group"> opens its href; arrows/swipe move within the group.
const lb = document.querySelector<HTMLDialogElement>('[data-lightbox]');
if (lb) {
  const img = lb.querySelector<HTMLImageElement>('[data-lb-img]')!;
  const caption = lb.querySelector<HTMLElement>('[data-lb-caption]')!;
  const count = lb.querySelector<HTMLElement>('[data-lb-count]')!;
  let items: HTMLAnchorElement[] = [];
  let index = 0;

  const show = (i: number) => {
    index = (i + items.length) % items.length;
    const a = items[index];
    img.src = a.href;
    img.alt = a.dataset.alt || '';
    caption.textContent = a.dataset.caption || '';
    caption.hidden = !a.dataset.caption;
    count.textContent = items.length > 1 ? `${index + 1} / ${items.length}` : '';
    lb.classList.toggle('single', items.length < 2);
    [index + 1, index - 1].forEach((j) => {
      const n = items[(j + items.length) % items.length];
      if (n) new Image().src = n.href;
    });
  };

  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[data-lb]');
    if (!a || e.metaKey || e.ctrlKey) return;
    e.preventDefault();
    items = Array.from(document.querySelectorAll<HTMLAnchorElement>(`a[data-lb="${a.dataset.lb}"]`)).filter(
      (el) => el.offsetParent !== null,
    );
    show(items.indexOf(a));
    lb.showModal();
    document.body.style.overflow = 'hidden';
  });
  lb.addEventListener('close', () => {
    document.body.style.overflow = '';
    img.removeAttribute('src');
  });
  lb.querySelector('[data-lb-close]')!.addEventListener('click', () => lb.close());
  lb.querySelector('[data-lb-prev]')!.addEventListener('click', () => show(index - 1));
  lb.querySelector('[data-lb-next]')!.addEventListener('click', () => show(index + 1));
  lb.addEventListener('click', (e) => {
    const t = e.target as HTMLElement;
    if (t === lb || t.matches('[data-lb-stage]')) lb.close();
  });
  lb.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') show(index + 1);
    if (e.key === 'ArrowLeft') show(index - 1);
  });
  let touchX: number | null = null;
  lb.addEventListener('touchstart', (e) => (touchX = e.touches[0].clientX), { passive: true });
  lb.addEventListener('touchend', (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 45) show(index + (dx < 0 ? 1 : -1));
    touchX = null;
  });
}
