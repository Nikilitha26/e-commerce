document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.querySelector('form');
    form.addEventListener('submit', function(e) {
        e.preventDefault(); 

        // Check if any inputs are empty
        const inputs = form.querySelectorAll('input');
        let allFilled = true;
        inputs.forEach(input => {
            if (!input.value.trim()) {
                allFilled = false;
            }
        });

        if (!allFilled) {
            alert('Please fill out all fields.');
            return; // Stop the form submission if any field is empty
        }

        // If all inputs are filled, redirect to thank you page
        window.location.href = './thankyou.html';
    });
});

document.addEventListener('DOMContentLoaded', (event) => {
    renderCartItems();
});


function renderCartItems() {
    let purchasedItems = JSON.parse(localStorage.getItem('purchasedItems')) || [];
    let cartHTML = '';
    let subtotal = 0;

    purchasedItems.forEach(item => {
        let itemTotal = item.quantity * item.price;
        subtotal += itemTotal;
        cartHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <p>${item.name} x ${item.quantity} <span class="price">R ${itemTotal.toFixed(2)}</span></p>
            </div>
        `;
    });

    // Update the cart's HTML
    const cartContainer = document.querySelector('.container .cart');
    if (cartContainer) {
        cartContainer.innerHTML = cartHTML;
    }

    // Update subtotal
    const subtotalElement = document.querySelector('.container .subtotal span');
    if (subtotalElement) {
        subtotalElement.textContent = 'R ' + subtotal.toFixed(2);
    }
}
document.addEventListener('DOMContentLoaded', (event) => {
    const placeOrderButton = document.querySelector('.place-order-button'); 
    placeOrderButton.addEventListener('mousedown', () => {
        placeOrderButton.classList.add('button-pressed');
    });
    placeOrderButton.addEventListener('mouseup', () => {
        placeOrderButton.classList.remove('button-pressed');
    });
});

const currentYear = document.getElementById('current-year');
currentYear.textContent = new Date().getFullYear();