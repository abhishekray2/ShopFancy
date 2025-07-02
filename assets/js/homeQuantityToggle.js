export const homeQuantityToggle = (event, id, stock) => {
  // Find the closest product card element
  const currentCardElement = event.target.closest('.product-card');
  if (!currentCardElement) return;

  // Select the element that displays the product quantity
  const productQuantity = currentCardElement.querySelector(".productQuantity");
  if (!productQuantity) return;

  // Get the current quantity, defaulting to 1 if not set
  let quantity = parseInt(productQuantity.textContent) || 1;

  // Handle increment
  if (event.target.classList.contains("cartIncrement")) {
    if (quantity < stock) {
      quantity += 1;
    }
  }

  // Handle decrement
  if (event.target.classList.contains("cartDecrement")) {
    if (quantity > 1) {
      quantity -= 1;
    }
  }

  // Update the displayed quantity
  productQuantity.textContent = quantity;

  // Store the quantity as a data attribute
  productQuantity.setAttribute("data-quantity", quantity.toString());

  // Return the updated quantity
  return quantity;
};
