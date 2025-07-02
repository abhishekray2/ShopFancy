import { getCartProductFromLS } from "./getCartProducts.js";

// Function to find or create cart value element
const getCartValueElement = () => {
  let cartValue = document.querySelector("#cartValue");
  if (!cartValue) {
    cartValue = document.createElement('div');
    cartValue.id = 'cartValue';
    const navbar = document.querySelector('.navbar-right');
    if (navbar) {
      navbar.appendChild(cartValue);
    }
  }
  return cartValue;
};

export const updateCartValue = () => {
  try {
    const cartProducts = getCartProductFromLS();
    const totalItems = cartProducts.reduce((total, item) => total + (parseInt(item.quantity) || 0), 0);
    
    // Update cart value in header
    const cartValue = getCartValueElement();
    if (cartValue) {
      cartValue.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> ${totalItems}`;
    }
    
    // Update item count if we're on the cart page
    const itemCountElement = document.querySelector("#itemCount");
    if (itemCountElement) {
      itemCountElement.textContent = totalItems;
    }

    // Trigger storage event for other tabs
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'cartProducts',
      newValue: localStorage.getItem('cartProducts'),
      oldValue: null,
      storageArea: localStorage
    }));
    
    return totalItems;
  } catch (error) {
    console.error("Error updating cart value:", error);
    return 0;
  }
};

// Initialize cart value on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartValue();
  console.log('Cart value initialized');
});

// Update cart value when localStorage changes
window.addEventListener('storage', (e) => {
  if (e.key === 'cartProducts') {
    console.log('Storage event triggered for cart');
    updateCartValue();
  }
});
