import { products } from '../../api/product.js';
import { addToCart } from './addToCart.js';
import { updateCartValue } from './updateCartValue.js';
import { homeQuantityToggle } from "./homeQuantityToggle.js";

const productContainer = document.getElementById("productContainer");
const productTemplate = document.getElementById("productTemplate");

// Initialize filter buttons
function initializeFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');
      
      const category = button.getAttribute('data-category').toLowerCase();
      filterProducts(category);
    });
  });
}

// Filter products based on category
function filterProducts(category) {
  const cards = document.querySelectorAll('.product-card');
  
  cards.forEach(card => {
    const cardCategory = card.querySelector('.category').textContent.toLowerCase();
    if (category === 'all' || cardCategory === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Function to display products
function showProducts() {
  try {
    if (!productContainer || !productTemplate) {
      console.error("Required elements not found");
      return;
    }

    // Clear existing content
    productContainer.innerHTML = '';

    // Display each product
    products.forEach((product) => {
      const { id, name, price, image, category, stock, brand, description } = product;
      const productClone = document.importNode(productTemplate.content, true);

      // Get the product card element
      const card = productClone.querySelector(".product-card");
      card.setAttribute("data-product-id", id);
      card.setAttribute("data-keywords", `${name} ${category} ${brand} ${description}`.toLowerCase());

      // Set product details
      productClone.querySelector(".category").textContent = category;
      productClone.querySelector(".productName").textContent = name;
      productClone.querySelector(".productDescription").textContent = description;
      productClone.querySelector(".productImage").src = image;
      productClone.querySelector(".productImage").alt = name;
      productClone.querySelector(".productPrice").textContent = `₹${price}`;
      productClone.querySelector(".productStock").textContent = stock;

      // Set stock badge
      const badge = productClone.querySelector(".product-badge");
      if (stock <= 0) {
        badge.textContent = "Out of Stock";
        badge.classList.add("out-of-stock");
      } else if (stock <= 10) {
        badge.textContent = "Low Stock";
        badge.classList.add("low-stock");
      }

      // Add event listeners for quantity buttons
      const incrementBtn = productClone.querySelector(".cartIncrement");
      const decrementBtn = productClone.querySelector(".cartDecrement");
      const quantityElement = productClone.querySelector(".productQuantity");

      incrementBtn.addEventListener("click", () => {
        const currentQty = parseInt(quantityElement.textContent);
        if (currentQty < stock) {
          quantityElement.textContent = currentQty + 1;
        }
      });

      decrementBtn.addEventListener("click", () => {
        const currentQty = parseInt(quantityElement.textContent);
        if (currentQty > 1) {
          quantityElement.textContent = currentQty - 1;
        }
      });

      // Add event listeners for buttons
      const addToCartBtn = productClone.querySelector(".add-to-cart-button");
      const viewDetailsBtn = productClone.querySelector(".view-details-button");

      addToCartBtn.addEventListener("click", (event) => {
        event.preventDefault();
        const quantity = parseInt(quantityElement.textContent);
        if (stock > 0) {
          addToCart(event, id, stock);
          // Update cart value after adding to cart
          updateCartValue();
        } else {
          alert("Sorry, this product is out of stock!");
        }
      });

      viewDetailsBtn.addEventListener("click", () => {
        window.location.href = `details.html?id=${id}`;
      });

      productContainer.appendChild(productClone);
    });

    // Initialize filters after products are loaded
    initializeFilters();

    // Add animation styles if not already present
    if (!document.querySelector('#product-animations')) {
      const style = document.createElement('style');
      style.id = 'product-animations';
      style.textContent = `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .product-card {
          animation: fadeIn 0.5s ease;
        }
      `;
      document.head.appendChild(style);
    }

  } catch (error) {
    console.error("Error displaying products:", error);
    if (productContainer) {
      productContainer.innerHTML = `
        <div class="error-message">
          <i class="fas fa-exclamation-circle"></i>
          <h3>Error displaying products</h3>
          <p>Please try refreshing the page</p>
        </div>
      `;
    }
  }
}

// Initialize products when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  showProducts();
});
