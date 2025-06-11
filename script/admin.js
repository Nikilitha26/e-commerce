// document.addEventListener('DOMContentLoaded', () => {


// footer
// document.getElementById("currentYear").textContent = new Date().getFullYear();
// const current = window.location.href;

// Function to add a new item
function addItem() {
    const image = document.getElementById('image').value;
    const name = document.getElementById('username').value;
    const description = document.getElementById('description').value;
    const price = parseFloat(document.getElementById('price').value);
  
    const newItem = { image, name, description, price };
  
    console.log('New item:', newItem);
  
    let items = JSON.parse(localStorage.getItem('items')) || [];
  
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
 
  function renderItems(items) {
    const tbody = document.getElementById('products-tbody');
    tbody.innerHTML = '';
    items.forEach((product, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td><img src="${product.image}" alt="${product.name}" style="width: 80px; height: auto;"></td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.description}</td>
        <td>
          <button class="btn btn-primary" id="edit-btn-${index}">Edit</button>
          <button class="btn btn-danger" id="remove-btn-${index}">Remove</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  }
  
// Function to update the items table
function updateItemsTable() {
    const tableBody = document.querySelector('.table-bordered tbody');
    tableBody.innerHTML = '';
    const items = JSON.parse(localStorage.getItem('items')) || [];

    items.forEach((item, index) => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <img class="item-image" src="${Array.isArray(item.image) ? item.image[0] : item.image}" alt="${item.name}">
            <td>${item.name}</td>
            <td>${item.description}</td>
            <td class="pprice">R ${item.price}</td>
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

  const newImage = document.getElementById('image').value.trim();
  if (newImage !== '') {
    // Convert comma-separated string to array of trimmed URLs
    items[index].image = newImage.split(',').map(url => url.trim());
  }

  items[index].name = document.getElementById('username').value;
  items[index].description = document.getElementById('description').value;
  items[index].price = document.getElementById('price').value;

  localStorage.setItem('items', JSON.stringify(items));

    // SweetAlert confirmation
    Swal.fire({
      title: 'Success!',
      text: 'Item edited successfully.',
      icon: 'success',
      confirmButtonColor: '#d4a373', // your theme's gold color
      confirmButtonText: 'OK',
      background: 'white',
      color: 'rgb(148, 118, 103)'
    }).then(() => {
      // Optional: Reload the page after closing the alert
      location.reload();
    });

  // Reset button
  const oldAddButton = document.getElementById('addProductButton');
  const newAddButton = oldAddButton.cloneNode(true);
  newAddButton.textContent = 'Add item';
  newAddButton.id = 'addProductButton';
  oldAddButton.replaceWith(newAddButton);

  newAddButton.addEventListener('click', addItem);

  const editModal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
  editModal.hide();

  updateItemsTable();
  displayProducts();
}


// Function to remove an item
function removeItem(index) {
  let items = JSON.parse(localStorage.getItem('items')) || [];
  items.splice(index, 1);
  localStorage.setItem('items', JSON.stringify(items));
  updateItemsTable();
}

// Event listener for adding a new product
document.getElementById('addProductButton').addEventListener('click', addItem);

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
// let products = JSON.parse(localStorage.getItem('items')) || []

function displayProducts() {
  const tbody = document.getElementById('products-tbody');
  tbody.innerHTML = '';

  //Refresh data from localStorage
  const products = JSON.parse(localStorage.getItem('items')) || [];

  products.forEach((product, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td>${product.description}</td>
      <td>
        <button class="btn btn-primary" id="edit-btn-${index}">Edit</button>
        <button class="btn btn-danger" id="remove-btn-${index}">Remove</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}


// add product
// document.getElementById('add-product-btn').addEventListener('click', () => {
//   document.getElementById('add-product-form').style.display = 'block'
// })

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
// });