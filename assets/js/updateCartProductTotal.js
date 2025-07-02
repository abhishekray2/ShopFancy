import { getCartProductFromLS } from "./getCartProducts"; // Importing the function to fetch cart products from localStorage

// Function to update the cart product total (subtotal and final total)
export const updateCartProductTotal = () => {
  // Selecting the DOM elements where the totals will be displayed
  let productSubTotal = document.querySelector(".productSubTotal");
  let productFinalTotal = document.querySelector(".productFinalTotal");

  // Retrieve cart products from localStorage
  let localCartProducts = getCartProductFromLS();

  // Initial value for the total price accumulator
  let initialValue = 0;

  // Calculate the total price of all products in the cart
  let totalProductPrice = localCartProducts.reduce((accum, curElem) => {
    // Parse the price of each product, default to 0 if it's not a valid number
    let productPrice = parseInt(curElem.price) || 0;
    // Accumulate the total product price
    return accum + productPrice;
  }, initialValue);

  // Set the subtotal value in the productSubTotal element
  productSubTotal.textContent = `₹${totalProductPrice}`;

  // Set the final total value (including a fixed ₹50 additional charge) in the productFinalTotal element
  productFinalTotal.textContent = `₹${totalProductPrice + 50}`;
};
