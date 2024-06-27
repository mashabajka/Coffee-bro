console.log('>>> script loaded');

function initializeCart() {
  console.log('>>> initialisation');
  if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([]));
  }
}

function addToCart({ id, name, text, url, price, priceDiscount, discount, quantity }) {
  let cart = JSON.parse(localStorage.getItem('cart'));
  
  // Check if the item already exists in the cart
  const index = cart.findIndex(item => item.id === id);

  if (index > -1) {
      // Update the quantity and price if the item already exists
      cart[index].quantity += quantity;
      // cart[index].price = price;
      // cart[index].name = name;
  } else {
      // Add new item to the cart
      cart.push({ id, name, text, url, price, priceDiscount, discount, quantity  });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
}

function minusCart({id, name, text, url, price, priceDiscount, discount, quantity }) {
  let cart = JSON.parse(localStorage.getItem('cart'));
  
  // Check if the item already exists in the cart
  const index = cart.findIndex(item => item.id === id);

  if (index > -1) {
    if(cart[index].quantity !== 0) {
      // Update the quantity and price if the item already exists
      cart[index].quantity -= quantity;
      // cart[index].price = price;
      // cart[index].name = name;
    }
 
  } else {
      // Add new item to the cart
      cart.push({ id, name, text, url, price, priceDiscount, discount, quantity });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
}

function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart'));

  cart = cart.filter(item => item.id !== id);

  localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to display the cart
function displayCart() {
  let cart = JSON.parse(localStorage.getItem('cart'));
  const cartDiv = document.getElementById('cart');

  cartDiv.innerHTML = '';

  cart.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.textContent = `Item: ${item.id}, Quantity: ${item.quantity}, Price: $${item.price}`;
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.onclick = () => removeFromCart(item.id);
      itemDiv.appendChild(removeButton);
      cartDiv.appendChild(itemDiv);
  });

  if (cart.length === 0) {
      cartDiv.textContent = 'Cart is empty.';
  }
}


function findCount(id) {
  let cart = JSON.parse(localStorage.getItem('cart'));

  const index = cart.findIndex(item => item.id === id);

if(cart[index]?.quantity !== 0) {
  return cart[index]?.quantity
}
return 0
}

function findAllcarts() {
  let cart = JSON.parse(localStorage.getItem('cart'));
  return cart
}

