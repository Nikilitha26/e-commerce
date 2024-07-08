document.querySelectorAll('.add-to-cart').forEach((button) => {
  button.addEventListener('click', (event) => {
      event.preventDefault();
      const itemId = event.target.dataset.itemId;
      addItemToCart(itemId);
  });
});

function addItemToCart(itemId) {
  // Implement your logic to add the item with the given itemId to the cart
  console.log(`Item with ID ${itemId} added to the cart.`);
}

const currentYear = document.getElementById('current-year');
currentYear.textContent = new Date().getFullYear();