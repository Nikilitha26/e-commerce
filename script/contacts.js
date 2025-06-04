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


document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get all input elements in the form
        const inputs = form.querySelectorAll('input');

        // Check if any inputs are empty
        let allFilled = true;
        inputs.forEach(input => {
            if (!input.value) {
                allFilled = false;
            }
        });

        if (!allFilled) {
            // If any inputs are empty, show an alert
            alert('Please fill out all fields.');
            return; // Stop the form submission
        }

        // If all inputs are filled, show a message and reset the form
        alert('Message Submitted!');
        form.reset();
    });
});

const currentYear = document.getElementById('current-year');
currentYear.textContent = new Date().getFullYear();