import { showToast } from "./showToast.js";
import { updateCartProductTotal } from "./updateCartProductTotal.js";

export const incrementDecrement = (event, productId, stock, price) => {
  try {
    const button = event.target;
    const quantityElement = button.parentElement.querySelector(".productQuantity");
    const priceElement = button.closest(".cart-item").querySelector(".productPrice");
    let quantity = parseInt(quantityElement.textContent);
    const isIncrement = button.classList.contains("cartIncrement");

    // Get product name for toast message
    let cartData = JSON.parse(localStorage.getItem("cartProducts")) || [];
    const product = cartData.find(item => item.id === productId);
    const productName = product ? product.name : 'Product';

    if (isIncrement) {
      if (quantity >= stock) {
        showToast("error", `Only ${stock} items available in stock`);
        return;
      }
      quantity++;
      showToast("success", `Increased ${productName} quantity`);
    } else {
      if (quantity <= 1) {
        showToast("error", "Quantity cannot be less than 1");
        return;
      }
      quantity--;
      showToast("success", `Decreased ${productName} quantity`);
    }

    // Update quantity display
    quantityElement.textContent = quantity;
    quantityElement.setAttribute("data-quantity", quantity);

    // Update price display
    const totalPrice = (price * quantity).toFixed(2);
    priceElement.textContent = `₹${totalPrice}`;

    // Update localStorage
    cartData = cartData.map(item => {
      if (item.id === productId) {
        return {
          ...item,
          quantity: quantity,
          price: price * quantity
        };
      }
      return item;
    });
    localStorage.setItem("cartProducts", JSON.stringify(cartData));

    // Update cart total
    updateCartProductTotal();

  } catch (error) {
    console.error("Error updating quantity:", error);
    showToast("error", "Error updating quantity");
  }
};
