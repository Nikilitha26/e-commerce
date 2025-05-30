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
      new CreateItem(1, 'Black Ladies Jumpsuit', 'Gym Wear',[
        'https://i.pinimg.com/736x/82/65/02/8265020100200f91ad7d3ed1bb280b13.jpg',
        'https://i.pinimg.com/736x/4a/ab/76/4aab7630ab197255dd076c603d775e84.jpg',
        'https://i.pinimg.com/736x/75/f0/e3/75f0e3ea4118a294fb9c723dd053e1d9.jpg', 
      ], 'Elevate your workout style with our Black Women’s Gym Jumpsuit — a sleek, sculpting one-piece designed for maximum comfort and performance. Made from breathable, stretch-fit fabric, it moves with you while offering full support and a flattering fit, whether you are hitting the gym or running errands in style.', 1, 1000.00),

      new CreateItem(2, 'Pink 4 piece Gym Set', 'Gym Wear', [
        'https://i.pinimg.com/736x/07/2a/fc/072afc9aa62d01911b83ad7f1067c3ac.jpg',
        'https://i.pinimg.com/736x/1d/da/d2/1ddad2e3010ea0e92ac78689d44722ed.jpg',
        'https://i.pinimg.com/736x/31/31/9e/31319e07fdadb9069965b287e0e00628.jpg',
      ], 'Power up your fitness routine with our 4-Piece Women’s Gym Set, featuring a supportive sports bra, a sleek short-sleeve top, high-waisted shorts, and full-length leggings. Made from breathable, stretchy, and sweat-wicking fabric, this matching set offers versatility, comfort, and a flattering fit — perfect for every workout, from cardio to strength training and beyond.', 1, 2000.00),

      new CreateItem(3, 'Blue 4 Piece Gym Set', 'Gym Wear', [
        'https://raw.githubusercontent.com/Nikilitha26/hostedImagesEndOfModule/57ef3987bb74394dd4a2d440640c34cb85f7bab1/Screenshot%202024-06-14%20100748.png',
        'https://i.pinimg.com/736x/26/84/af/2684afbcff329a9e6b9ea11cebadfd44.jpg',
        'https://i.pinimg.com/736x/e4/a1/a8/e4a1a8b29c5a4ef249448a7c7b0a44e2.jpg',
      ], 'Power up your fitness routine with our 4-Piece Women’s Gym Set, featuring a supportive sports bra, a sleek short-sleeve top, high-waisted shorts, and full-length leggings. Made from breathable, stretchy, and sweat-wicking fabric, this matching set offers versatility, comfort, and a flattering fit — perfect for every workout, from cardio to strength training and beyond.', 1, 2000.00),

      new CreateItem(4, 'Black 2 piece Gym Set', 'Gym Wear', [
        'https://i.pinimg.com/736x/3d/12/85/3d12856a0bc2e0cd6304ef1d22dbad0a.jpg',
        'https://i.pinimg.com/736x/0f/d4/d8/0fd4d851774c0e68365da0bb94c73e48.jpg',
        'https://i.pinimg.com/736x/5f/6f/74/5f6f74e7d100898a070128746cbe4495.jpg',
    ], 'Stay stylish and supported with our 2-Piece Women’s Gym Set, featuring a high-performance sports bra and matching high-waisted short leggings. Designed with soft, stretchy, and moisture-wicking fabric, this set offers a flattering fit and ultimate comfort — perfect for intense workouts or casual activewear.', 1, 900.00),

      new CreateItem(5, 'Purple Gym Water Bottle', 'Gym Essentials',[
        'https://i.pinimg.com/736x/53/d3/59/53d359c2e33e04a1cc6e999ac071c4d5.jpg',
        'https://i.pinimg.com/736x/35/e8/2a/35e82a9fde1d482d10133a97f578b140.jpg',
        'https://i.pinimg.com/736x/53/d3/59/53d359c2e33e04a1cc6e999ac071c4d5.jpg',
      ], 'Stay hydrated and motivated with our Plastic Gym Water Bottle, designed with time markers to help you track your daily water intake. Made from durable, BPA-free plastic, this lightweight bottle features a secure flip-top lid, easy-carry handle, and clear measurements to keep you on track throughout your workout or busy day. Stylish, practical, and leak-proof — it’s the perfect companion for your fitness journey.', 1, 650.00),

      new CreateItem(6, 'Black Intelligent Touch Temperature Display Cup', 'Gym Essentials', [
        'https://i.pinimg.com/736x/99/a4/9a/99a49ad515a03aafad1abf6c84706338.jpg',
        'https://i.pinimg.com/736x/c4/e1/1a/c4e11ad0848ff31535971c291ec214ae.jpg',
        'https://i.pinimg.com/736x/b3/f8/1e/b3f81e18baf693a8da6f2a82469d1a42.jpg',
      ], 'Meet the future of hydration with our Black Intelligent Water Bottle — a sleek, smart bottle designed to keep you on track. Featuring a touch-activated LED temperature display, this bottle lets you know if your drink is hot or cold at a glance. Its insulated, stainless steel design keeps beverages at the perfect temperature for hours, while the modern black finish adds a touch of style to your routine. Smart, stylish, and essential for everyday wellness.', 1, 1000.00),
      
      new CreateItem(7, 'Black and Pink Waist Trainer', 'Gym Essentials', [
        'https://i.pinimg.com/736x/91/79/fa/9179fabb68b2d32cc93f06218976bce4.jpg',
        'https://i.pinimg.com/736x/0c/f0/70/0cf070e65449ffa0befcea72be707b9e.jpg',
        'https://i.pinimg.com/736x/f3/48/eb/f348eba0dea77e3bd1ad2e974ae4d261.jpg',
    ], 'Sculpt your silhouette and boost your confidence with our Waist Trainer, designed to support your fitness goals and enhance your natural curves. Made from high-compression, breathable fabric, it provides firm yet comfortable support during workouts or daily wear. With adjustable straps and a secure fit, it helps improve posture, increase sweat, and shape your waistline — giving you that snatched look you love.', 1, 850.00),

      new CreateItem(8, 'Black Waist Trainer', 'Gym Essentials', [
        'https://i.pinimg.com/736x/0d/1e/6c/0d1e6c62392b0b7433484a9988e8481a.jpg',
        'https://i.pinimg.com/736x/20/ec/f6/20ecf6082204b26a281c6c23c0ed4f4b.jpg',
        'https://i.pinimg.com/736x/6c/1a/45/6c1a45b8554f73cbc6c531e663305641.jpg',
      ], 'Sculpt your silhouette and boost your confidence with our Waist Trainer, designed to support your fitness goals and enhance your natural curves. Made from high-compression, breathable fabric, it provides firm yet comfortable support during workouts or daily wear. With adjustable straps and a secure fit, it helps improve posture, increase sweat, and shape your waistline — giving you that snatched look you love.', 1, 850.00),

      new CreateItem(9, 'Pink Wrist Watch', 'Gym Essentials',[
        'https://i.pinimg.com/736x/f7/e7/ab/f7e7ab56f39ae1432af0dadefbdfa361.jpg',
        'https://i.pinimg.com/736x/07/22/68/072268c6f7dd27ab77fc0844e7953cd0.jpg',
        'https://i.pinimg.com/736x/f7/e7/ab/f7e7ab56f39ae1432af0dadefbdfa361.jpg',
    ], 'Stay on top of your fitness goals with our Gym Wrist Watch, built for performance and style. This sleek, durable watch features a digital display with stopwatch, step counter, heart rate monitor, and calorie tracker — everything you need to monitor your progress. Sweat-resistant and comfortable for all-day wear, it’s the perfect accessory to keep you motivated in and out of the gym.', 1, 1600.00),

      new CreateItem(10, 'Black Wrist Watch', 'Gym Essentials', [
        'https://github.com/Nikilitha26/hostedImagesEndOfModule/blob/main/Screenshot%202024-06-11%20082323.png?raw=true',
        'https://i.pinimg.com/736x/04/5e/b7/045eb7c81930c2bcc881e026870e1953.jpg',
        'https://i.pinimg.com/736x/7f/c4/5a/7fc45a932a7cba2535149ac4cae7975a.jpg',
    ], 'Stay on top of your fitness goals with our Gym Wrist Watch, built for performance and style. This sleek, durable watch features a digital display with stopwatch, step counter, heart rate monitor, and calorie tracker — everything you need to monitor your progress. Sweat-resistant and comfortable for all-day wear, it’s the perfect accessory to keep you motivated in and out of the gym.', 1, 1600.00),

      new CreateItem(11, 'Pink Waterproof Gym Bag', 'Gym Bags', [
        'https://i.pinimg.com/736x/93/e1/89/93e189538a4849f6af3ca682757b00c7.jpg',
        'https://i.pinimg.com/736x/2c/d1/64/2cd164aea1bce1f0645a13d53243fe95.jpg',
        'https://i.pinimg.com/736x/93/e1/89/93e189538a4849f6af3ca682757b00c7.jpg',
    ], 'Keep your gear safe and organized with our Waterproof Gym Bag, designed for active lifestyles. Made from durable, water-resistant material, this bag features multiple compartments, including a separate shoe pocket and wet/dry section to keep your items clean and protected. Lightweight yet spacious, it’s perfect for the gym, travel, or everyday use — combining function, style, and reliability in one sleek design.', 1, 1200.00),

      new CreateItem(12, 'Black Waterproof Gym Bag', 'Gym Bags', [
        'https://i.pinimg.com/736x/e3/a1/b6/e3a1b6e2108d3ad5f56b743a54aec243.jpg',
        'https://i.pinimg.com/736x/5c/99/df/5c99df97225abe53c0371b1349a856c5.jpg',
        'https://i.pinimg.com/736x/9e/e5/7a/9ee57a6fd45f4cb65c7695448df62740.jpg'
    ], 'Keep your gear safe and organized with our Waterproof Gym Bag, designed for active lifestyles. Made from durable, water-resistant material, this bag features multiple compartments, including a separate shoe pocket and wet/dry section to keep your items clean and protected. Lightweight yet spacious, it’s perfect for the gym, travel, or everyday use — combining function, style, and reliability in one sleek design.', 1, 1300.00)
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
      const noResultsMessage = document.getElementById("no-results-message");
      itemsList.innerHTML = '';
    
      if (itemArray.length === 0) {
        noResultsMessage.style.display = 'block';  // Show message
        return;
      } else {
        noResultsMessage.style.display = 'none';   // Hide message
      }
    
      itemArray.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.classList.add('item-container');
        itemCard.innerHTML = `
          <img class="item-image" src="${Array.isArray(item.image) ? item.image[0] : item.image}" alt="${item.name}">
          <div class="item-details">
            <h3>${item.name}</h3>
            <p><strong>Price:</strong> R${item.price.toFixed(2)}</p>
            <button class="btn btn-gold" data-action="add" id="${item.id}" title="Add to Cart">
              <i class="fas fa-cart-plus"></i>
            </button>
            <a href="product-detail.html?id=${item.id}" class="btn btn-gold view-more-btn">View More</a>
          </div>
        `;
        itemsList.appendChild(itemCard);
      });
    
      attachViewMoreListeners();
      attachAddToCartListeners();
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

    // if not logged in concepts
    function attachAddToCartListeners() {
      document.querySelectorAll('[data-action="add"]').forEach(button => {
        button.addEventListener('click', (e) => {
          const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
          if (!isLoggedIn) {
            Swal.fire({
              icon: 'warning',
              title: 'Login Required',
              text: 'Please log in to add items to your cart.',
              confirmButtonColor: 'rgb(148, 118, 103)',
              background: 'white'
            }).then(() => {
              window.location.href = "login.html";
            });
    
            return;
          }
    
          const itemId = parseInt(button.id);
          const cart = JSON.parse(localStorage.getItem("cart")) || [];
          const existingItem = cart.find(item => item.id === itemId);
    
          if (existingItem) {
            existingItem.quantity += 1;
          } else {
            const product = items.find(i => i.id === itemId);
            if (product) {
              cart.push({ ...product });
            }
          }
    
          localStorage.setItem("cart", JSON.stringify(cart));
          Swal.fire({
            icon: 'success',
            title: 'Added to Cart!',
            text: 'Your item was added to the cart.',
            confirmButtonColor: 'rgb(148, 118, 103)',
            background: 'white'
          });
          setTimeout(() => {
            window.location.href = "checkout.html";
          }, 1500);
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
  
    
    function addToCart(itemId) {
      const allItems = JSON.parse(localStorage.getItem("items")) || [];
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
    
      const product = allItems.find(item => item.id === parseInt(itemId));
    
      if (product) {
        const existing = cart.find(p => p.id === product.id);
        if (existing) {
          existing.quantity += 1;
        } else {
          cart.push({ ...product, quantity: 1 });
        }
    
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
    
        Swal.fire({
          icon: 'success',
          iconColor: 'rgb(148, 118, 103)', 
          title: 'Added to cart!',
          text: `${product.name} has been added.`,
          confirmButtonColor: 'rgb(148, 118, 103)',
          background: '#fff',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false
        });
    
        setTimeout(() => {
          window.location.href = './checkout.html';
        }, 2000); 
      }
    }
    
    
  
    // Initial rendering
    renderItems(items);
  });
  