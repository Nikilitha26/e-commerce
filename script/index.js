const currentYear = document.getElementById('current-year');
if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

const currentURL = window.location.href;
document.querySelectorAll('.nav-link').forEach(link => {
  if (link.href === currentURL) {
    link.classList.add('active');
  }
});

document.querySelectorAll('.category-slideshow').forEach(slideshow => {
  const slides = slideshow.querySelectorAll('.slide');
  let index = 0;
  if (slides.length > 0) {
    slides[index].classList.add('active');

    setInterval(() => {
      slides[index].classList.remove('active');
      index = (index + 1) % slides.length;
      slides[index].classList.add('active');
    }, 3000);
  }
});

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById('cart-count');
  if (badge) badge.textContent = count;
}

// Update cart count once on page load
updateCartCount();
