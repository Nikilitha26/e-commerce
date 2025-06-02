function renderAllOrders() {
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  const container = document.getElementById('all-orders-container');

  if (orders.length === 0) {
    container.innerHTML = '<p>No orders found.</p>';
    return;
  }

  let html = '';
  orders.forEach((order, index) => {
    const items = order.items || [];
    let orderHTML = `<div class="order-wrapper" data-index="${index}">
      <div class="order-title">Order #${index + 1}</div>`;
    let subtotal = 0;

    items.forEach(item => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;
      orderHTML += `
        <div class="cart-item">
          <img src="${(item.image && item.image[0]) || './images/default.jpg'}" alt="${item.name}" />
          <p>${item.name} x ${item.quantity} <span class="price">R ${itemTotal.toFixed(2)}</span></p>
        </div>
      `;
    });

    orderHTML += `
      <div class="subtotal">Subtotal: R ${subtotal.toFixed(2)}</div>
      <button class="btn  btn-sm mt-2 delete-order-btn">Delete Order</button>
    </div>`;
    html += orderHTML;
  });

  container.innerHTML = html;

  // Add delete functionality
  document.querySelectorAll('.delete-order-btn').forEach((btn, idx) => {
btn.addEventListener('click', () => {
Swal.fire({
  title: 'Are you sure?',
  text: 'This will permanently delete the order.',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#b97b56',
  cancelButtonColor: '#b97b56',
  confirmButtonText: 'Yes, delete it!',
  background: '#fff',
  color: '#222'
  
}).then((result) => {
  if (result.isConfirmed) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.splice(idx, 1); // remove the selected order
    localStorage.setItem('orders', JSON.stringify(orders));
    renderAllOrders(); // re-render
    Swal.fire({
      title: 'Deleted!',
      text: 'The order has been removed.',
      icon: 'success',
      confirmButtonColor: '#b97b56',
      background: '#fff',
      color: '#222'
    });
  }
});
});
});
}

document.addEventListener('DOMContentLoaded', renderAllOrders);