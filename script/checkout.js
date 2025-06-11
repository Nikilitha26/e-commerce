// === Check if cart container exists and render on load ===
document.addEventListener('DOMContentLoaded', function () {
  renderCheckoutTable();

  // const clearCartBtn = document.getElementById('clear-cart');
  // if (clearCartBtn) {
  //   clearCartBtn.addEventListener('click', clearCart);
  // }

});

// === Function to clear cart ===
function clearCart() {
  Swal.fire({
    title: 'Clear Cart?',
    text: 'Are you sure you want to remove all items from your cart?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#b97b56',
    cancelButtonColor: '#aaa',
    confirmButtonText: 'Yes, clear it!',
    background: '#fff',
    color: 'rgb(148, 118, 103)'
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem('cart');
      renderCheckoutTable();
      Swal.fire({
        title: 'Cart Cleared',
        text: 'Your cart has been emptied.',
        icon: 'success',
        confirmButtonColor: '#b97b56',
        background: '#fff',
        color: 'rgb(148, 118, 103)'
      });
    }
  });
}

// === Function to render checkout table ===
function renderCheckoutTable() {
  const checkoutContainer = document.getElementById('checkout-container');
  if (!checkoutContainer) return;

  let purchasedItems = [];
  try {
    purchasedItems = JSON.parse(localStorage.getItem('cart')) || [];
  } catch (e) {
    console.error('Failed to parse cart:', e);
  }

  let subtotal = 0;

  if (purchasedItems.length > 0) {
    let tableHTML = `
      <table class="table-bordered">
        <tr>
          <th>Item</th>
          <th>Name</th>
          <th>Description</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Total</th>
          <th>Action</th>
        </tr>
    `;

    purchasedItems.forEach(item => {
      const price = parseFloat(item.price);
      const itemTotal = item.quantity * price;
      subtotal += itemTotal;
    
      tableHTML += `
        <tr>
          <td><img src="${item.image[0]}" class="checkout-item-image"></td>
          <td>${item.name}</td>
          <td>${item.description}</td>
          <td>
            <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-item-id="${item.id}">
          </td>
          <td>R ${price.toFixed(2)}</td>
          <td class="item-total">R ${itemTotal.toFixed(2)}</td>
          <td>
            <button class="remove-item-btn" data-item-id="${item.id}">Remove</button>
          </td>
        </tr>
      `;
    });
    

    tableHTML += `
      <tr>
        <td colspan="5" class="text-right"><strong>Subtotal:</strong></td>
        <td><strong>R ${subtotal.toFixed(2)}</strong></td>
        <td></td>
      </tr>
      </table>
      <div class="checkout-button-container">
        <button id="checkout-button1" class="btn5">Proceed to Checkout</button>
        <button id="continue-shopping" class="btn">Continue Shopping</button>
      </div>
    `;

    checkoutContainer.innerHTML = `
    <div class="checkout-wrapper">
      ${tableHTML}
      <button id="clear-cart" class="clear-cart-btn">Clear Cart</button>
    </div>
  `;

    attachEventListeners();

    // Continue shopping
    document.getElementById('continue-shopping').addEventListener('click', function () {
      window.location.href = './products.html';
    });

    // Proceed to checkout
    document.getElementById('checkout-button1').addEventListener('click', function () {
      const email = localStorage.getItem('email');
      if (!email) {
        Swal.fire({
          icon: 'error',
          title: 'Login Required',
          text: 'You must be logged in to checkout.',
          confirmButtonColor: '#b97b56',
          background: '#fff',
          color: 'rgb(148, 118, 103)'
        });
        return;
      }

      if (purchasedItems.length === 0) {
        Swal.fire({
          icon: 'info',
          title: 'Cart Empty',
          text: 'Your cart is empty.',
          confirmButtonColor: '#b97b56',
          background: '#fff',
          color: 'rgb(148, 118, 103)'
        });
        return;
      }

      const total = purchasedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      const pendingOrder = {
        email: email,
        date: new Date().toLocaleString(),
        items: purchasedItems,
        total: total
        
      };

      localStorage.setItem("pendingOrder", JSON.stringify(pendingOrder));
      window.location.href = './payments.html';
    });

  } else {
    checkoutContainer.innerHTML = '';
    const emptyMsg = document.getElementById('empty-cart-message');
    if (emptyMsg) emptyMsg.style.display = 'block';
  }
  updateCartCount();
}

// === Function to attach listeners to quantity inputs and remove buttons ===
function attachEventListeners() {
  const quantityInputs = document.querySelectorAll('.quantity-input');
  quantityInputs.forEach(input => {
    input.addEventListener('change', event => {
      updateQuantity(event.target.dataset.itemId, parseInt(event.target.value));
    });
  });

  const removeButtons = document.querySelectorAll('.remove-item-btn');
  removeButtons.forEach(button => {
    button.addEventListener('click', event => {
      const itemId = parseInt(event.target.dataset.itemId);
      Swal.fire({
        title: 'Remove Item?',
        text: 'Are you sure you want to remove this item from the cart?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#b97b56',
        cancelButtonColor: '#aaa',
        confirmButtonText: 'Yes, remove it',
        background: '#fff',
        color: 'rgb(148, 118, 103)'
      }).then((result) => {
        if (result.isConfirmed) {
          removeItem(itemId);
        }
      });
    });
  });
}

// === Function to update item quantity in localStorage ===
function updateQuantity(itemId, newQuantity) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const itemIndex = cart.findIndex(item => item.id === parseInt(itemId));

  if (itemIndex !== -1) {
    if (newQuantity >= 1) {
      cart[itemIndex].quantity = newQuantity;
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCheckoutTable();
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Quantity',
        text: 'Quantity must be at least 1.',
        confirmButtonColor: '#b97b56',
        background: '#fff',
        color: 'rgb(148, 118, 103)'
      });
    }
  } else {
    console.error(`Item with id ${itemId} not found in cart.`);
  }
}

// === Function to remove item from localStorage ===
function removeItem(itemId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.id !== itemId);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCheckoutTable();
}

// === Update cart badge ===
// function updateCartCount() {
//   const cart = JSON.parse(localStorage.getItem('cart')) || [];
//   const count = cart.reduce((sum, item) => sum + item.quantity, 0);
//   const badge = document.getElementById('cart-count');
//   if (badge) badge.textContent = count;
// }

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
