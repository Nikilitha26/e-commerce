// Constructor for creating item objects
function CreateItem(id, name, category, image, description, quantity, price) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.image = image;
    this.description = description;
    this.quantity = quantity;
    this.price = price;
  }
  
  // Initialize default items in localStorage if not already set
  if (!localStorage.getItem("items")) {
    const initialItems = [
      new CreateItem(1, 'Black 2 piece gym wear', 'Gym Wear', 'https://i.pinimg.com/736x/82/65/02/8265020100200f91ad7d3ed1bb280b13.jpg', 'The most comfortable and stylish gymwear you can ever find, it is long sleeve with long pants protecting you from transferring the sweat.', 1, 500.00),
      new CreateItem(2, 'Pink 2 piece skirt gymwear', 'Gym Wear', 'https://raw.githubusercontent.com/Nikilitha26/hostedImagesEndOfModule/1cd522b4aa0e28f1e2eb2eaad01fc70d042c25be/Screenshot%202024-06-14%20100259.png', 'The best skirt gymwear, a 2 piece where there are tights in which you can put your phone in.', 1, 450.00),
      new CreateItem(4, 'Blue 4 Piece Gym Wear', 'Gym Wear', 'https://raw.githubusercontent.com/Nikilitha26/hostedImagesEndOfModule/57ef3987bb74394dd4a2d440640c34cb85f7bab1/Screenshot%202024-06-14%20100748.png', 'The best waist trainer fast waist slim.', 1, 800.00),
      new CreateItem(7, 'Black Intelligent Touch Temperature Display Cup', 'Gym Essentials', 'https://github.com/Nikilitha26/hostedImagesEndOfModule/blob/main/Screenshot%202024-06-05%20133250.png?raw=true', 'Perfect For Outdoor Activities, Travel, And Fitness. Tracks the temperature.', 1, 300.00),
      new CreateItem(11, 'Black and Pink Waist Trainer', 'Gym Essentials', 'https://github.com/Nikilitha26/hostedImagesEndOfModule/blob/main/Screenshot%202024-06-05%20132201.png?raw=true', 'The best waist trainer you could ever think of. You get immediate result unexpectedly.', 1, 300.00),
      new CreateItem(12, 'Purple Wrist Watch', 'Gym Essentials', 'https://github.com/Nikilitha26/hostedImagesEndOfModule/blob/main/Screenshot%202024-06-11%20082123.png?raw=true', '5.11cm Square Screen With phone features, 100+ Sports Modes, Fitness Tracker, Outdoor Smartwatch.', 1, 600.00),
      new CreateItem(13, 'Black Wrist Watch', 'Gym Essentials', 'https://github.com/Nikilitha26/hostedImagesEndOfModule/blob/main/Screenshot%202024-06-11%20082323.png?raw=true', '5.11cm Square Screen With phone features, 100+ Sports Modes, Fitness Tracker, Outdoor Smartwatch.', 1, 600.00),
      new CreateItem(14, 'Pink waterproof sport bag', 'Gym Bags', 'https://github.com/Nikilitha26/hostedImagesEndOfModule/blob/main/Screenshot%202024-06-05%20134611.png?raw=true', 'The best carry bag for gym, everything fits. It is also a waterproof bag, meaning it is much safer.', 1, 400.00),
      new CreateItem(15, 'Black waterproof sport bag', 'Gym Bags', 'https://github.com/Nikilitha26/hostedImagesEndOfModule/blob/main/Screenshot%202024-06-05%20135804.png?raw=true', 'The best carry bag for gym, everything fits. It is also a waterproof bag, meaning it is much safer.', 1, 400.00)
    ];
  
    localStorage.setItem("items", JSON.stringify(initialItems));
  }
  
  // DOMContentLoaded ensures the DOM is fully loaded before accessing elements
  document.addEventListener("DOMContentLoaded", () => {
    const items = JSON.parse(localStorage.getItem("items")) || [];
    const itemsList = document.getElementById("items-list");
    const searchInput = document.getElementById("search-input");
    const sortSelect = document.getElementById("sort-select");
  
    // Render all items on page
    function renderItems(itemArray) {
      itemsList.innerHTML = '';
      itemArray.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.classList.add('item-container');
        itemCard.innerHTML = `
          <img class="item-image" src="${item.image}" alt="${item.name}">
          <div class="item-details">
            <h3>${item.name}</h3>
            <p><strong>Price:</strong> R${item.price.toFixed(2)}</p>
            <button class="btn btn-gold" data-id="${item.id}">Add to Cart</button>
            <button class="btn btn-gold view-more-btn" data-id="${item.id}">View More</button>
          </div>
        `;
        itemsList.appendChild(itemCard);
      });
  
      attachViewMoreListeners();
    }
  
    // Show modal with product details
    function showModal(product) {
      const modalTitle = document.getElementById("productModalLabel");
      const modalBody = document.getElementById("productModalBody");
  
      modalTitle.textContent = product.name;
      modalBody.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="img-fluid mb-3" style="max-height: 250px;">
        <p><strong>Price:</strong> R${product.price.toFixed(2)}</p>
        <p><strong>Category:</strong> ${product.category}</p>
        <p><strong>Description:</strong> ${product.description}</p>
      `;
  
      const modal = new bootstrap.Modal(document.getElementById("productModal"));
      modal.show();
    }
  
    // Attach event listeners to all view-more buttons
    function attachViewMoreListeners() {
      document.querySelectorAll(".view-more-btn").forEach(button => {
        button.addEventListener("click", (e) => {
          const id = parseInt(e.target.dataset.id);
          const product = items.find(i => i.id === id);
          if (product) showModal(product);
        });
      });
    }
  
    // Filter items by search input
    searchInput.addEventListener('keyup', () => {
      const term = searchInput.value.toLowerCase();
      const filtered = items.filter(item =>
        item.name.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term)
      );
      renderItems(filtered);
    });
  
    // Sort items by selected option
    sortSelect.addEventListener('change', () => {
      let sorted = [...items];
      const option = sortSelect.value;
  
      if (option === 'price-high-to-low') sorted.sort((a, b) => b.price - a.price);
      else if (option === 'price-low-to-high') sorted.sort((a, b) => a.price - b.price);
      else if (option === 'alphabetical') sorted.sort((a, b) => a.name.localeCompare(b.name));
      else if (option === 'category') sorted.sort((a, b) => a.category.localeCompare(b.category));
  
      renderItems(sorted);
    });
  
    // Add item to cart
    document.addEventListener('click', e => {
      if (e.target.classList.contains('add-to-cart')) {
        const id = parseInt(e.target.dataset.id);
        let cart = JSON.parse(localStorage.getItem("purchasedItems")) || [];
        const product = items.find(i => i.id === id);
        const existing = cart.find(i => i.id === id);
  
        if (existing) {
          existing.quantity += 1;
        } else {
          cart.push({ ...product, quantity: 1 });
        }
  
        localStorage.setItem("purchasedItems", JSON.stringify(cart));
        alert("Added to cart!");
      }
    });
  
    // Initial rendering
    renderItems(items);
  });
  