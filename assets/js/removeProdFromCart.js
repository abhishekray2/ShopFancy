import { showToast } from "./showToast.js";
import { updateCartValue } from "./updateCartValue.js";

export const removeProdFromCart = (productId) => {
  let cartData = JSON.parse(localStorage.getItem("cartProducts")) || [];
  
  // Find the product to get its name before removing
  const productToRemove = cartData.find(item => item.id === productId);
  const productName = productToRemove ? productToRemove.name : 'Product';
  
  // Remove the product
  cartData = cartData.filter((curElem) => curElem.id !== productId);
  localStorage.setItem("cartProducts", JSON.stringify(cartData));
  
  // Show toast notification
  showToast("remove", `${productName} removed from cart`);
  
  // Update cart value in UI
  updateCartValue();
  
  return cartData;
};
