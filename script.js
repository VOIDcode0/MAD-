const products = [
  {
    id: 1,
    title: "Watch",
    price: 999,
    image: "images/product-1.jpg"
  },
  {
    id: 2,
    title: "Headphone",
    price: 1499,
    image: "images/product-2.jpg"
  },
  {
    id: 3,
    title: "shoes",
    price: 2000,
    image: "images/product-3.jpg"
  },
  {
    id: 4,
    title: "purse",
    price: 3000,
    image: "images/product-4.jpg"
  }
];

const state = {
  cart: []
};

const productGrid = document.getElementById("product-grid");
const summaryItems = document.getElementById("summary-items");
const summarySubtotal = document.getElementById("summary-subtotal");
const notifyButton = document.getElementById("notify-button");
const placeOrderButton = document.getElementById("place-order-button");
const emptyCartButton = document.getElementById("empty-cart-button");
const productTemplate = document.getElementById("product-card-template");

function formatCurrency(value) {
  return `Rs. ${Math.round(value)}`;
}

function addToCart(productId) {
  const existingItem = state.cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    state.cart.push({ id: productId, quantity: 1 });
  }

  renderCart();
}

function renderProducts() {
  productGrid.innerHTML = "";

  products.forEach((product) => {
    const fragment = productTemplate.content.cloneNode(true);
    const image = fragment.querySelector(".product-image");
    const title = fragment.querySelector(".product-title");
    const price = fragment.querySelector(".product-price");
    const addButton = fragment.querySelector(".add-button");

    image.src = product.image;
    image.alt = product.title;
    title.textContent = product.title;
    price.textContent = formatCurrency(product.price);
    addButton.addEventListener("click", () => addToCart(product.id));

    productGrid.appendChild(fragment);
  });
}

function renderCart() {
  let totalItems = 0;
  let subtotal = 0;

  state.cart.forEach((item) => {
    const product = products.find((entry) => entry.id === item.id);
    if (!product) {
      return;
    }

    totalItems += item.quantity;
    subtotal += product.price * item.quantity;
  });

  summaryItems.textContent = String(totalItems);
  summarySubtotal.textContent = formatCurrency(subtotal);
}

notifyButton.addEventListener("click", () => {
  alert("Notifications enabled");
});

placeOrderButton.addEventListener("click", () => {
  if (!state.cart.length) {
    alert("Your cart is empty");
    return;
  }

  alert("Order placed successfully");
  state.cart = [];
  renderCart();
});

emptyCartButton.addEventListener("click", () => {
  state.cart = [];
  renderCart();
});

renderProducts();
renderCart();
