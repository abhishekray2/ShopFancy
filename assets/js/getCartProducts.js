import { updateCartValue } from "./updateCartValue.js"; // Importing the function to update the cart value on the page

export const getCartProductFromLS = () => {
  try {
    const cartData = localStorage.getItem("cartProducts");
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error("Error reading cart data from localStorage:", error);
    return [];
  }
};
