
const body = document.body;
const themeButton = document.querySelector('[data-theme]');
const savedTheme = localStorage.getItem('ufqe-theme');
if (savedTheme === 'dark') body.classList.add('dark');
if (themeButton) {
  const refresh = () => { themeButton.textContent = body.classList.contains('dark') ? '☀' : '☾'; themeButton.setAttribute('aria-label', body.classList.contains('dark') ? 'Activer le mode clair' : 'Activer le mode sombre'); };
  refresh();
  themeButton.addEventListener('click', () => { body.classList.toggle('dark'); localStorage.setItem('ufqe-theme', body.classList.contains('dark') ? 'dark' : 'light'); refresh(); });
}
const progress = document.querySelector('.reading-progress');
if (progress) window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
});
const article = document.querySelector('.story-content');
if (article) {
  let size = Number(localStorage.getItem('ufqe-font-size') || 1.16);
  const apply = () => article.style.fontSize = `${size}rem`;
  apply();
  document.querySelector('[data-font-plus]')?.addEventListener('click', () => { size=Math.min(1.55,size+.08); localStorage.setItem('ufqe-font-size',size); apply(); });
  document.querySelector('[data-font-minus]')?.addEventListener('click', () => { size=Math.max(.95,size-.08); localStorage.setItem('ufqe-font-size',size); apply(); });
}
const search = document.querySelector('[data-search]');
if (search) search.addEventListener('input', () => {
  const q = search.value.trim().toLocaleLowerCase('fr'); let visible = 0;
  document.querySelectorAll('[data-story]').forEach(card => { const show = card.textContent.toLocaleLowerCase('fr').includes(q); card.hidden = !show; if(show) visible++; });
  const empty = document.querySelector('.empty'); if(empty) empty.style.display = visible ? 'none' : 'block';
});
