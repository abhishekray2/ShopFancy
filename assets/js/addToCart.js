import { getCartProductFromLS } from "./getCartProducts.js"; // Importing the function to get cart products from localStorage
import { showToast } from "./showToast.js"; // Importing the function to show a toast message
import { updateCartValue } from "./updateCartValue.js"; // Importing the function to update the cart value on the page
import { products } from "../../api/product.js"; // Import products to get product details

// -----------------------------------------------------
// Get the cart data from localStorage on page load
// --------------------------------------------------------
getCartProductFromLS();
updateCartValue(); // Initialize cart value

// -----------------------------------------------------
// Function to add a product to the cart and update localStorage
// --------------------------------------------------------
export const addToCart = (event, id, stock) => {
  event.preventDefault();

  // Get current cart products from localStorage
  let cartProducts = getCartProductFromLS();

  // Find the product data
  const product = products.find(p => p.id === id);
  if (!product) {
    showToast("error", "Product not found");
    return;
  }

  let quantity = 1;
  let price = product.price;

  // Check if we're on the details page
  if (window.location.pathname.includes('details.html')) {
    const quantityInput = document.getElementById("quantityInput");
    if (quantityInput) {
      quantity = parseInt(quantityInput.value) || 1;
    }
  } else {
    // For product listing page
    const productElement = event.target.closest('.product-card');
    if (productElement) {
      const quantityElement = productElement.querySelector(".productQuantity");
      if (quantityElement) {
        quantity = parseInt(quantityElement.textContent) || 1;
      }
    }
  }

  // Validate quantity
  if (isNaN(quantity) || quantity < 1) {
    showToast("error", "Invalid quantity");
    return;
  }

  // Check stock
  if (quantity > stock) {
    showToast("error", `Only ${stock} items available in stock`);
    return;
  }

  // Find if product already exists in cart
  let existingProduct = cartProducts.find(item => item.id === id);

  if (existingProduct) {
    // Update existing product
    const newQuantity = existingProduct.quantity + quantity;
    
    // Check if new quantity exceeds stock
    if (newQuantity > stock) {
      showToast("error", `Cannot add more items. Stock limit is ${stock}`);
      return;
    }

    existingProduct.quantity = newQuantity;
    existingProduct.price = price * newQuantity;

    // Update the product in the cart array
    cartProducts = cartProducts.map(item => 
      item.id === id ? existingProduct : item
    );
    
    showToast("success", `Updated ${product.name} quantity in cart`);
  } else {
    // Add new product to cart
    cartProducts.push({
      id,
      quantity,
      price: price * quantity,
      name: product.name,
      image: product.image,
      category: product.category
    });
    
    showToast("add", `${product.name} added to cart`);
  }

  // Save to localStorage
  localStorage.setItem("cartProducts", JSON.stringify(cartProducts));

  // Update cart value in UI
  updateCartValue();

  // Trigger storage event for other tabs
  window.dispatchEvent(new StorageEvent('storage', {
    key: 'cartProducts',
    newValue: localStorage.getItem('cartProducts'),
    oldValue: null,
    storageArea: localStorage
  }));

  return cartProducts;
};
