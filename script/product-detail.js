// nav
const current = window.location.href;
document.querySelectorAll('.nav-link').forEach(link => {
  if (link.href === current) {
    link.classList.add('active');
  }
});

document.querySelectorAll('.category-slideshow').forEach(slideshow => {
  const slides = slideshow.querySelectorAll('.slide');
  let index = 0;
  slides[index].classList.add('active');

  setInterval(() => {
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
  }, 3000); // Change image every 3 seconds
});

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  let totalCount = 0;
  cart.forEach(item => {
    totalCount += item.quantity;
  });

  const cartCountElement = document.getElementById('cart-count');
  if (cartCountElement) {
    cartCountElement.textContent = totalCount;
  }
}