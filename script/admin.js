
// Function to add a new item
function addItem() {
    console.log('addItem is called');
    const image = document.getElementById('image').value;
    const name = document.getElementById('username').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;

    const newItem = { image, name, description, price };
    console.log('New item:', newItem)
    const items = JSON.parse(localStorage.getItem('items')) || [];

    console.log('Items before adding new item:', items);

    items.push(newItem);
    localStorage.setItem('items', JSON.stringify(items));

    console.log('Items after adding new item:', JSON.stringify(items));

    const addModal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
    addModal.hide();

    alert('Item added!');
    
    updateItemsTable();

    renderItems();
}
 
// Function to update the items table
function updateItemsTable() {
    const tableBody = document.querySelector('.table-bordered tbody');
    tableBody.innerHTML = '';
    const items = JSON.parse(localStorage.getItem('items')) || [];

    items.forEach((item, index) => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td><img src="${item.image}" alt="${item.name}" width="50" height="50"></td>
            <td>${item.name}</td>
            <td>${item.description}</td>
            <td>R ${item.price}</td>
            <td>
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="remove-btn" data-index="${index}">Remove</button>
            </td>
        `;
    });

    // Add event listeners for edit and remove buttons
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', function() {
            editItem(this.getAttribute('data-index'));
        });
    });

    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function() {
            removeItem(this.getAttribute('data-index'));
        });
    });
}

// Function to edit an item
function editItem(index) {
    // Get the item details from local storage
    const items = JSON.parse(localStorage.getItem('items')) || [];
    const itemToEdit = items[index];

    // Set the form inputs to the item's values
    document.getElementById('image').value = itemToEdit.image;
    document.getElementById('username').value = itemToEdit.name;
    document.getElementById('description').value = itemToEdit.description;
    document.getElementById('price').value = itemToEdit.price;

    // Update the add button to save changes
    const addButton = document.getElementById('addProductButton');
    addButton.textContent = 'Save changes';
    
    // Remove existing event listeners from the add button
    addButton.replaceWith(addButton.cloneNode(true));
    
    // Add new event listener to save changes
    document.getElementById('addProductButton').addEventListener('click', function() {
        saveChanges(index);

        

        alert('Item Edited!');
    });

    const editModal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
    editModal.show();

    document.getElementById('closse').addEventListener('click', function() {
        const editModal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
        editModal.hide();
    });
}

// Function to save changes after editing an item
function saveChanges(index) {
    const items = JSON.parse(localStorage.getItem('items')) || [];
    
    // Update the item with new values from the form inputs
    items[index].image = document.getElementById('image').value;
    items[index].name = document.getElementById('username').value;
    items[index].description = document.getElementById('description').value;
    items[index].price = document.getElementById('price').value;

    // Save the updated items array back to local storage
    localStorage.setItem('items', JSON.stringify(items));

    // Reset the add button text and event listener to add new items
    const addButton = document.getElementById('addProductButton');
    addButton.textContent = 'Add item';
    
     // Remove existing event listeners from the add button
     addButton.replaceWith(addButton.cloneNode(true));
     
     // Add new event listener to add new items
     document.getElementById('addProductButton').addEventListener('click', addItem);

     const editModal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
    editModal.hide();
    
    updateItemsTable();
}

// Function to remove an item
function removeItem(index) {
  let items = JSON.parse(localStorage.getItem('items')) || [];
  items.splice(index, 1);
  localStorage.setItem('items', JSON.stringify(items));
  updateItemsTable();
}

// Event listener for adding a new product
// document.getElementById('addProductButton').addEventListener('click', addItem);

// Event listener for clearing input fields in the form
document.getElementById('clearInputsButton').addEventListener('click', () => {
  document.getElementById('image').value = '';
  document.getElementById('username').value = '';
  document.getElementById('description').value = '';
  document.getElementById('price').value = '';
});

// Add event listener for close button
document.getElementById('closse').addEventListener('click', function() {
    const editModal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
    editModal.hide();
});


// Call updateItemsTable on page load to display existing items
updateItemsTable();





// get products from local storage
let products = JSON.parse(localStorage.getItem('items')) || []

// display products in table
function displayProducts() {
  const tbody = document.getElementById('products-tbody')
  tbody.innerHTML = ''
  products.forEach((product, index) => {
      const row = document.createElement('tr')
      row.innerHTML = `
          <td>${index + 1}</td>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td>${product.description}</td>
          <td>
              <button class="btn btn-primary" id="edit-btn-${index}">Edit</button>
              <button class="btn btn-danger" id="remove-btn-${index}">Remove</button>
          </td>
      `
      tbody.appendChild(row)
  })
}

// add product
document.getElementById('add-product-btn').addEventListener('click', () => {
  document.getElementById('add-product-form').style.display = 'block'
})

document.getElementById('save-product-btn').addEventListener('click', () => {
  const name = document.getElementById('name').value
  const price = document.getElementById('price').value
  const description = document.getElementById('description').value
  products.push({ name, price, description })
  localStorage.setItem('items', JSON.stringify(products))
  displayProducts()
  document.getElementById('add-product-form').style.display = 'none'
})

// edit product
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-primary') && e.target.id.startsWith('edit-btn-')) {
      const index = e.target.id.split('-')[2]
      document.getElementById('edit-product-form').style.display = 'block'
      document.getElementById('edit-name').value = products[index].name
      document.getElementById('edit-price').value = products[index].price
      document.getElementById('edit-description').value = products[index].description
      document.getElementById('edit-product-form').dataset.index = index
  }
})

document.getElementById('update-product-btn').addEventListener('click', () => {
  const index = document.getElementById('edit-product-form').dataset.index
  const name = document.getElementById('edit-name').value
  const price = document.getElementById('edit-price').value
  const description = document.getElementById('edit-description').value
  products[index] = { name, price, description }
  localStorage.setItem('items', JSON.stringify(products))
  displayProducts()
  document.getElementById('edit-product-form').style.display = 'none'
})

// remove product
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-danger') && e.target.id.startsWith('remove-btn-')) {
      const index = e.target.id.split('-')[2]
      products.splice(index, 1)
      localStorage.setItem('items', JSON.stringify(products))
      displayProducts()
  }
})

// display products on page load
localStorage.getItem('items', () => {
  displayProducts()
})

// const currentYear = document.getElementById('current-year');
// currentYear.textContent = new Date().getFullYear();