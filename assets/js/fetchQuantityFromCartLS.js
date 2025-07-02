import { getCartProductFromLS } from "./getCartProducts"; // Importing the function to get cart products from localStorage

export const fetchQuantityFromCartLS = (id, price) => {
  // Get the list of cart products from localStorage using the getCartProductFromLS function
  let cartProducts = getCartProductFromLS();

  // Find the product in the cart that matches the given id
  let existingProduct = cartProducts.find((curProd) => curProd.id === id);

  // Default quantity is set to 1 if the product is not found
  let quantity = 1;

  // If the product already exists in the cart, use the stored quantity and price
  if (existingProduct) {
    quantity = existingProduct.quantity; // Set the quantity to the existing quantity in the cart
    price = existingProduct.price; // Update the price to the stored price (if applicable)
  }

  // Return an object containing the quantity and price of the product
  return { quantity, price };
};
