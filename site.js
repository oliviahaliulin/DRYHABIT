/* Footer year */
document.getElementById('year').textContent = new Date().getFullYear();

/* Mobile menu */
const menuButton = document.querySelector('.menu-button');
const mobileMenu = document.getElementById('mobile-menu');

function setMenu(open) {
  mobileMenu.hidden = !open;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}

menuButton.addEventListener('click', () => setMenu(mobileMenu.hidden));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !mobileMenu.hidden) {
    setMenu(false);
    menuButton.focus();
  }
});
matchMedia('(min-width: 821px)').addEventListener('change', e => { if (e.matches) setMenu(false); });

/* Scroll progress bar */
const progress = document.querySelector('.progress');
let ticking = false;

function updateProgress() {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  ticking = false;
}

addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateProgress);
    ticking = true;
  }
}, { passive: true });
updateProgress();

/* Product gallery (product page only) */
const galleryImage = document.getElementById('gallery-image');

if (galleryImage) {
  const gallery = [
    ['dry-habit-product.webp', 'Overhead view of the U-shaped Dry Habit mat on an ivory background'],
    ['dry-habit-vanity.webp', 'Dry Habit mat placed around a white vessel sink'],
    ['dry-habit-placement.webp', 'Hands placing the mat around a sink'],
    ['dry-habit-detail.webp', 'Close view of the mat texture and bound edge'],
    ['dry-habit-interior.webp', 'Double-sink bathroom with mats at both sinks']
  ];
  const thumbs = [...document.querySelectorAll('.thumb')];
  const count = document.getElementById('gallery-count');
  let selected = 0;

  function showImage(index) {
    selected = index;
    galleryImage.src = 'assets/' + gallery[index][0];
    galleryImage.alt = gallery[index][1];
    count.textContent = `${index + 1} / ${gallery.length}`;
    thumbs.forEach((button, i) => {
      const active = i === index;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }

  thumbs.forEach(button => button.addEventListener('click', () => showImage(Number(button.dataset.index))));
  document.getElementById('gallery-next').addEventListener('click', () => showImage((selected + 1) % gallery.length));
}

/* Fit guide dialog (product page only) */
const dialog = document.getElementById('fit-dialog');

if (dialog) {
  document.querySelectorAll('#fit-button, #fit-button-secondary')
    .forEach(button => button.addEventListener('click', () => dialog.showModal()));
  document.getElementById('dialog-close').addEventListener('click', () => dialog.close());
  document.getElementById('dialog-done').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
}
