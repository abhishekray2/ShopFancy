import { products } from '../../api/product.js';
import { fetchQuantityFromCartLS } from "./fetchQuantityFromCartLS.js";
import { getCartProductFromLS } from "./getCartProducts.js";
import { incrementDecrement } from "./incrementDecrement.js";
import { removeProdFromCart } from "./removeProdFromCart.js";
import { updateCartProductTotal } from "./updateCartProductTotal.js";

// Add error handling for module loading
window.addEventListener('error', function(e) {
  console.error('Script error:', e);
}, true);

// Get cart products from localStorage
let cartProducts = getCartProductFromLS();
console.log("Initial cartProducts from localStorage:", cartProducts);

// Filter products that are in the cart
let filterProducts = products.filter((curProd) => {
  const isInCart = cartProducts.some((curElem) => curElem.id === curProd.id);
  console.log(`Checking product ${curProd.id}: ${isInCart ? 'found in cart' : 'not in cart'}`);
  return isInCart;
});

console.log("Filtered Products:", filterProducts);
console.log("Cart Products:", cartProducts);

// -----------------------------------------------------
// to update the addToCart page
// --------------------------------------------------------
const cartElement = document.querySelector("#productCartContainer");
const templateContainer = document.querySelector("#productCartTemplate");
const orderSummarySection = document.querySelector(".order-summary-section");
const itemCountElement = document.querySelector("#itemCount");
const cartValueElement = document.querySelector("#cartValue");

if (!cartElement || !templateContainer) {
  console.error("Required DOM elements not found:", {
    cartElement: !!cartElement,
    templateContainer: !!templateContainer
  });
}

// Function to update cart count in header and item count
const updateCartCount = () => {
  const cartProducts = getCartProductFromLS();
  const totalItems = cartProducts.reduce((total, item) => total + item.quantity, 0);
  
  // Update the cart value in header
  if (cartValueElement) {
    cartValueElement.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> ${totalItems}`;
  }
  
  // Update the items count in cart page
  if (itemCountElement) {
    itemCountElement.textContent = totalItems;
  }
};

// Function to display all cart products in the cart page
const showCartProduct = () => {
  if (!cartElement || !templateContainer) {
    console.error("Cannot show cart products - required elements missing");
    return;
  }

  // Clear existing content first
  cartElement.innerHTML = '';

  // Update cart count
  updateCartCount();

  // Check if cart is empty
  if (filterProducts.length === 0) {
    cartElement.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-cart"></i>
        <h3>Your cart is empty</h3>
        
        <a href="products.html" class="browse-products-btn">
          <i class="fas fa-shopping-bag"></i>
          Browse Products
        </a>
      </div>
    `;

    // Hide order summary when cart is empty
    if (orderSummarySection) {
      orderSummarySection.style.display = 'none';
    }
    return;
  }

  // Show order summary when cart has items
  if (orderSummarySection) {
    orderSummarySection.style.display = 'block';
  }

  // Iterate over the filtered products to display them in the cart
  filterProducts.forEach((curProd) => {
    try {
      const { category, id, image, name, stock, price } = curProd;

      // Clone the template
      let productClone = document.importNode(templateContainer.content, true);

      // Fetch the quantity and price from localStorage
      const lSActualData = fetchQuantityFromCartLS(id, price);

      // Update the cloned template with product data
      productClone.querySelector(".cart-item").setAttribute("id", `card${id}`);
      productClone.querySelector(".category").textContent = category;
      productClone.querySelector(".productName").textContent = name;
      productClone.querySelector(".productImage").src = image;
      productClone.querySelector(".productImage").alt = name;

      productClone.querySelector(".productQuantity").textContent = lSActualData.quantity;
      productClone.querySelector(".productQuantity").setAttribute("data-quantity", lSActualData.quantity);
      productClone.querySelector(".productPrice").textContent = `₹${lSActualData.price.toFixed(2)}`;

      // Attach event listeners
      const cartItem = productClone.querySelector(".cart-item");
      
      // Add increment/decrement handlers
      const quantityControls = productClone.querySelector(".quantity-controls");
      const incrementBtn = productClone.querySelector(".cartIncrement");
      const decrementBtn = productClone.querySelector(".cartDecrement");

      if (incrementBtn) {
        incrementBtn.addEventListener("click", (event) => {
          incrementDecrement(event, id, stock, price);
          updateCartCount(); // Update count after increment
        });
      }

      if (decrementBtn) {
        decrementBtn.addEventListener("click", (event) => {
          incrementDecrement(event, id, stock, price);
          updateCartCount(); // Update count after decrement
        });
      }

      // Add remove button handler
      const removeButton = productClone.querySelector(".remove-to-cart-button");
      if (removeButton) {
        removeButton.addEventListener("click", () => {
          removeProdFromCart(id);
          
          // Update cart display without page reload
          cartProducts = getCartProductFromLS();
          filterProducts = products.filter((prod) => 
            cartProducts.some((item) => item.id === prod.id)
          );
          showCartProduct();
          updateCartProductTotal();
          updateCartCount(); // Update count after removal
        });
      }

      // Append to cart container
      cartElement.appendChild(productClone);
    } catch (error) {
      console.error("Error adding product to cart display:", error);
    }
  });

  // Update cart totals
  updateCartProductTotal();
};

// Show cart products
showCartProduct();

// Setup checkout button
const setupCheckoutButton = () => {
  const checkoutBtn = document.getElementById('proceedToCheckout');
  if (!checkoutBtn) return;

  checkoutBtn.addEventListener('click', () => {
    const cartProducts = getCartProductFromLS();
    
    if (!cartProducts || cartProducts.length === 0) {
      alert('Your cart is empty! Please add some products before checkout.');
      return;
    }

    // Prepare checkout data
    const checkoutData = cartProducts.map(cartItem => {
      const productDetails = products.find(prod => prod.id === cartItem.id);
      return {
        id: cartItem.id,
        name: productDetails ? productDetails.name : `Product ${cartItem.id}`,
        price: cartItem.price,
        quantity: cartItem.quantity,
        unitPrice: productDetails ? productDetails.price : (cartItem.price / cartItem.quantity),
        image: productDetails ? productDetails.image : null,
        category: productDetails ? productDetails.category : 'Unknown'
      };
    });

    try {
      // Store checkout data
      sessionStorage.setItem('checkoutCart', JSON.stringify(checkoutData));
      sessionStorage.setItem('checkoutSource', 'cart');

      // Show loading state
      checkoutBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting...';
      checkoutBtn.disabled = true;

      // Redirect to payment page
      setTimeout(() => {
        window.location.href = 'payment.html';
      }, 500);

    } catch (error) {
      console.error("Error during checkout:", error);
      alert('Something went wrong. Please try again.');
      
      // Reset button
      checkoutBtn.innerHTML = '<i class="fas fa-credit-card"></i> Proceed to Checkout';
      checkoutBtn.disabled = false;
    }
  });
};

// Initialize checkout button
setupCheckoutButton();

// Update cart count on page load
updateCartCount();
