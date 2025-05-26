document.addEventListener("DOMContentLoaded", () => {
    const email = localStorage.getItem("email");
    const ordersList = document.getElementById("ordersList");
  
    if (!email) {
      ordersList.innerHTML = "<p class='no-orders'>You must be logged in to view your orders.</p>";
      return;
    }
  
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
  
    const userOrders = allOrders.filter(order => order.email === email);
  
    if (userOrders.length === 0) {
      ordersList.innerHTML = "<p class='no-orders'>You have no orders yet.</p>";
      return;
    }
  
    userOrders.forEach((order, index) => {
      const orderEl = document.createElement("div");
      orderEl.className = "order";
      orderEl.innerHTML = `
        <p><strong>Order #${index + 1}</strong></p>
        <p><strong>Date:</strong> ${order.date}</p>
        <p><strong>Items:</strong> ${order.items.join(", ")}</p>
        <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
      `;
      ordersList.appendChild(orderEl);
    });
  });
  