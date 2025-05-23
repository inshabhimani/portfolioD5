// script.js
const cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartContainer = document.getElementById('cart-items');
const totalPrice = document.getElementById('total');
const cartSidebar = document.getElementById('cart');
const cartCount = document.getElementById('cart-count'); // Make sure this span exists in your HTML

function toggleCart() {
  cartSidebar.classList.toggle('open');
  renderCart();
}

function addToCart(product) {
  const existing = cart.find(p => p.name === product.name);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

function decreaseQuantity(name) {
  const item = cart.find(p => p.name === name);
  if (item) {
    item.qty--;
    if (item.qty <= 0) {
      // Remove item if quantity is 0
      const index = cart.findIndex(p => p.name === name);
      cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
  }
}

function removeFromCart(name) {
  const index = cart.findIndex(p => p.name === name);
  if (index > -1) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
  }
}

function renderCart() {
  cartContainer.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    const div = document.createElement('div');
    div.innerHTML = `
      <p>
        ${item.name} 
        (<span>${item.qty}</span>) - ₹${item.price * item.qty}
        <button onclick="decreaseQuantity('${item.name}')">−</button>
        <button onclick="removeFromCart('${item.name}')">Remove</button>
      </p>
    `;
    cartContainer.appendChild(div);
  });
  totalPrice.innerText = `Total: ₹${total}`;
}

function updateCartCount() {
  let count = 0;
  cart.forEach(item => count += item.qty);
  if (cartCount) {
    cartCount.textContent = count;
  }
}

function checkout() {
  // Calculate total
  let total = 0;
  cart.forEach(item => total += item.price * item.qty);

  // Some random positive quotes
  const quotes = [
    "Self-care is how you take your power back.",
    "You deserve to feel beautiful every day!",
    "Thank you for supporting small businesses!",
    "Glow inside and out. Thank you for shopping!",
    "Beauty begins the moment you decide to be yourself."
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  alert(
    `Thank you for your purchase!\n\nYour total bill is: ₹${total}\n\n${randomQuote}`
  );

  // Optionally, clear the cart after checkout
  // cart.length = 0;
  // localStorage.setItem('cart', JSON.stringify(cart));
  // renderCart();
  // updateCartCount();
}

document.getElementById('theme-toggle').onclick = function () {
  document.body.classList.toggle('dark-mode');
  // Change icon
  const icon = document.getElementById('theme-icon');
  if (document.body.classList.contains('dark-mode')) {
    icon.textContent = '🌞';
  } else {
    icon.textContent = '🌙';
  }
};
document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  updateCartCount();
});
