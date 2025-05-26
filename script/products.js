function CreateItem(id, name, category, image, description, quantity, price){
    this.id = id
    this.name = name
    this.category = category
    this.image = image
    this.description = description
    this.quantity = quantity
    this.price = price

}

let item1 = new CreateItem(1, 'Black 2 piece gym wear', 'Gym Wear', 'https://github.com/Nikilitha26/hostedImagesEndOfModule/blob/main/Screenshot%202024-06-11%20173050.png?raw=true','The most comfortable and stylish gymwear you can ever find, it is long sleeve with long pants protecting you from transfering the sweat.', 1, 500.00)

let item2 = new CreateItem(2, 'Pink 2 piece skirt gymwear','Gym Wear' ,'https://raw.githubusercontent.com/Nikilitha26/hostedImagesEndOfModule/1cd522b4aa0e28f1e2eb2eaad01fc70d042c25be/Screenshot%202024-06-14%20100259.png', 'The best skirt gymwear, a 2 piece where there are thights in which you can put your phone in.', 1, 450.00)

let item4 = new CreateItem(4, 'Blue 4 Piece Gym Wear', 'Gym Wear', 'https://raw.githubusercontent.com/Nikilitha26/hostedImagesEndOfModule/57ef3987bb74394dd4a2d440640c34cb85f7bab1/Screenshot%202024-06-14%20100748.png', 'The best waist trainer fast waist slim.',1,  800.00  )

let item7 = new CreateItem(7, 'Black Intelligent Touch Temperature Display Cup,', 'Gym Essentials','https://github.com/Nikilitha26/hostedImagesEndOfModule/blob/main/Screenshot%202024-06-05%20133250.png?raw=true', 'Perfect For Outdoor Activities, Travel, And Fitness. Tracks the temperature.', 1, 300.00  )

let item11 = new CreateItem(11, 'Black and Pink Waist Trainer ', 'Gym Essentials','https://github.com/Nikilitha26/hostedImagesEndOfModule/blob/main/Screenshot%202024-06-05%20132201.png?raw=true', 'The best waist trainer you could ever think of. You get immediate result unexpectedly.', 1, 300.00  )

let item12 = new CreateItem(12, 'Purple Wrist Watch', 'Gym Essentials','https://github.com/Nikilitha26/hostedImagesEndOfModule/blob/main/Screenshot%202024-06-11%20082123.png?raw=true', '5.11cm Square Screen With phone features, 100+ Sports Modes, Fitness Tracker, Outdoor Smartwatch.', 1, 600.00  )

let item13 = new CreateItem(13, 'Black Gym Wrist Watch ', 'Gym Essentials','https://github.com/Nikilitha26/hostedImagesEndOfModule/blob/main/Screenshot%202024-06-11%20082323.png?raw=true', '5.11cm Square Screen With phone features, 100+ Sports Modes, Fitness Tracker, Outdoor Smartwatch.', 1, 600.00  )

let item14= new CreateItem(14, 'Pink waterproof sport bag', 'Gym Bags','https://github.com/Nikilitha26/hostedImagesEndOfModule/blob/main/Screenshot%202024-06-05%20134611.png?raw=true', 'The best carry bag for gym, everything fits. It is also a waterrproof bag, meaning it is much safer.', 1, 400.00  )

let item15 = new CreateItem(15, 'Black waterproof sport bag', 'Gym Bags','https://github.com/Nikilitha26/hostedImagesEndOfModule/blob/main/Screenshot%202024-06-05%20135804.png?raw=true', 'The best carry bag for gym, everything fits. It is also a waterrproof bag, meaning it is much safer.', 1, 400.00  )

let items = [item1, item2, item4, item7,item11, item12, item13, item14, item15,]

localStorage.setItem('items', JSON.stringify(items));
let purchasedItems = []



function searchItems() {

    let items = JSON.parse(localStorage.getItem('items')) || [];

    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const filteredItems = items.filter(item => {
        return item.name.toLowerCase().includes(searchInput) || 
               item.price.toString().includes(searchInput);
    });
    renderItems(filteredItems);
}


const itemsList = document.createElement('div');

// / Add event listener for search input
document.getElementById('search-input').addEventListener('keyup', searchItems);

document.getElementById('but').addEventListener('click', function(event) {
    event.preventDefault(); 
});


    // Iterate over each filtered item and create HTML elements for them
    function renderItems(filteredItems) {
        document.getElementById('main').style.display = 'none';
        const itemsList = document.getElementById('items-list');
        itemsList.innerHTML = '';

        if (filteredItems.length === 0) {
          itemsList.innerHTML = '<p>No results found.</p>';
        } else {
          filteredItems.forEach(item => {
            const itemContainer = document.createElement('div');
            itemContainer.classList.add('item-container');

            const itemImage = document.createElement('img');
            itemImage.src = item.image;
            itemImage.alt = item.name;
            itemImage.classList.add('item-image');

            const itemDetails = document.createElement('div');
            itemDetails.classList.add('item-details');
            itemDetails.innerHTML = `
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p>Price: R ${item.price}</p>
                <!-- Add other details as needed -->
            `;

            const addToCartButton = document.createElement('button');
            addToCartButton.textContent = 'Add To Cart';
            addToCartButton.setAttribute('data-item-id', item.id);
            addToCartButton.classList.add('btn2', 'add-to-cart');
            itemContainer.appendChild(addToCartButton);

            itemsList.appendChild(itemContainer);
            itemContainer.appendChild(itemImage);
            itemContainer.appendChild(itemDetails);
          });


              itemsList.innerHTML += '<p>End of results.</p>';

    }

}


function addToCart(id) {
    console.log('Attempting to add item to cart with ID:', id);


    let purchasedItems = JSON.parse(localStorage.getItem('purchasedItems')) || [];

    let itemToAdd = items.find(item => item.id === id);
    if (!itemToAdd) {
        console.error('Item not found!');
        return;
    }


    let existingItemIndex = purchasedItems.findIndex(item => item.id === itemToAdd.id);
    if (existingItemIndex !== -1) {

        purchasedItems[existingItemIndex].quantity += 1;
    } else {

        itemToAdd.quantity = 1;
        purchasedItems.push(itemToAdd);
    }


    localStorage.setItem('purchasedItems', JSON.stringify(purchasedItems));

    alert('Item added to cart');

    console.log(`Item ${id} added to cart!`);
}

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('add-to-cart-btn')) {
        let itemId = parseInt(event.target.getAttribute('data-item-id'));
        addToCart(itemId);
    }
});
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('add-to-cart')) {
        let itemId = parseInt(event.target.getAttribute('data-item-id'));
        addToCart(itemId);
    }
});

document.getElementById('sort-select').addEventListener('change', function() {
    const sortValue = this.value;
    let sortedItems;
  
    switch (sortValue) {
      case 'price-high-to-low':
        sortedItems = items.sort((a, b) => b.price - a.price);
        break;
      case 'price-low-to-high':
        sortedItems = items.sort((a, b) => a.price - b.price);
        break;
      case 'alphabetical':
        sortedItems = items.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'category':
        sortedItems = items.sort((a, b) => a.category.localeCompare(b.category));
        break;
      default:
        sortedItems = items;
    }
 


    document.getElementById('items-list').innerHTML = '';
  
    renderItems(sortedItems);
  });


items.forEach(item => {
    main.innerHTML += `
        <div id="main-div">
        
        <!-- Button trigger modal -->
        <button type="button" class="btn1" data-bs-toggle="modal" data-bs-target="#modal${item.id}">
            View Details
        </button>
         <button type="button" class="btn2 add-to-cart-btn" data-item-id="${item.id}">
                Add To Cart
            </button>
        <!-- Modal -->
        <div class="modal fade" id="modal${item.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel${item.id}" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
        <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel${item.id}">${item.name}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <img src="${item.image}" alt="${item.name}" class="item-image">
        <p>${item.description}</p>
        
        <p>Price: R ${item.price}</p>
        </div>
        </div>
        </div>
        </div>
        <img src="${item.image}" alt="${item.name}" class="item-image">
        <p>${item.name}</p>
        <p>R ${item.price}</p>
        </div>
     
    `;


});
window.addEventListener('storage', function(event) {
    if (event.key === 'items') {

        let updatedItems = JSON.parse(localStorage.getItem('items')) || [];
        renderItems(updatedItems); 
    }
});


const currentYear = document.getElementById('current-year');
currentYear.textContent = new Date().getFullYear();