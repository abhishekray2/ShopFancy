import "/assets/css/style.css";
import { products } from "../../api/product.js";
import { showProductContainer } from "./homeProductCards.js";
import { getCartProductFromLS } from "./getCartProducts.js";

// Only import details.js if we're on the details page
if (window.location.pathname.includes('details.html')) {
  import("./details.js");
}

// Initialize cart
getCartProductFromLS();

// Get all products and display them
document.addEventListener("DOMContentLoaded", () => {
  // Any other initialization code can go here
});

// Product filtering functionality
function initializeProductFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');
      
      const category = button.dataset.category;
      filterProducts(category);
    });
  });
}

function filterProducts(category) {
  const products = document.querySelectorAll('.product-card');
  
  products.forEach(product => {
    const productCategory = product.querySelector('.category').textContent.toLowerCase();
    if (category === 'all' || productCategory.includes(category)) {
      product.style.display = 'block';
      product.style.animation = 'fadeIn 0.5s ease';
    } else {
      product.style.display = 'none';
    }
  });
}

// Enhanced product display
function displayProducts(products) {
  const productContainer = document.getElementById('productContainer');
  const template = document.getElementById('productTemplate');

  productContainer.innerHTML = '';

  products.forEach(product => {
    const productElement = template.content.cloneNode(true);
    
    // Add product badge if it's new or on sale
    const badge = productElement.querySelector('.product-badge');
    if (product.isNew) {
      badge.textContent = 'New';
    } else if (product.discount > 0) {
      badge.textContent = `${product.discount}% Off`;
    } else {
      badge.remove();
    }

    // Set product details
    productElement.querySelector('.category').textContent = product.category;
    productElement.querySelector('.productName').textContent = product.name;
    productElement.querySelector('.productDescription').textContent = product.description;
    productElement.querySelector('.productImage').src = product.image;
    productElement.querySelector('.productImage').alt = product.name;
    
    // Set prices
    const price = productElement.querySelector('.productPrice');
    const actualPrice = productElement.querySelector('.productActualPrice');
    
    if (product.discount > 0) {
      const discountedPrice = product.price * (1 - product.discount / 100);
      price.textContent = `$${discountedPrice.toFixed(2)}`;
      actualPrice.textContent = `$${product.price.toFixed(2)}`;
    } else {
      price.textContent = `$${product.price.toFixed(2)}`;
      actualPrice.style.display = 'none';
    }

    // Set stock
    productElement.querySelector('.productStock').textContent = product.stock;

    // Add event listeners
    const addToCartBtn = productElement.querySelector('.add-to-cart-button');
    const viewDetailsBtn = productElement.querySelector('.view-details-button');
    const incrementBtn = productElement.querySelector('.cartIncrement');
    const decrementBtn = productElement.querySelector('.cartDecrement');
    const quantityElement = productElement.querySelector('.productQuantity');

    addToCartBtn.addEventListener('click', () => addToCart(product));
    viewDetailsBtn.addEventListener('click', () => viewDetails(product));
    
    incrementBtn.addEventListener('click', () => {
      const currentQty = parseInt(quantityElement.textContent);
      if (currentQty < product.stock) {
        quantityElement.textContent = currentQty + 1;
      }
    });

    decrementBtn.addEventListener('click', () => {
      const currentQty = parseInt(quantityElement.textContent);
      if (currentQty > 1) {
        quantityElement.textContent = currentQty - 1;
      }
    });

    productContainer.appendChild(productElement);
  });

  // Initialize filters after products are loaded
  initializeProductFilters();
}

// Add some animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

// Mobile Menu Toggle
const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
const mobileMenuClose = document.querySelector('.mobile-menu-close');
const navbar = document.querySelector('.navbar');

function toggleMenu(show) {
  navbar.classList.toggle('active', show);
  document.body.style.overflow = show ? 'hidden' : '';
  const icon = mobileMenuIcon.querySelector('i');
  if (show) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
}

if (mobileMenuIcon) {
  mobileMenuIcon.addEventListener('click', () => {
    toggleMenu(true);
  });
}

if (mobileMenuClose) {
  mobileMenuClose.addEventListener('click', () => {
    toggleMenu(false);
  });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navbar?.contains(e.target) && 
      !mobileMenuIcon?.contains(e.target) && 
      navbar?.classList.contains('active')) {
    toggleMenu(false);
  }
});

// Prevent scrolling when mobile menu is open
document.addEventListener('touchmove', (e) => {
  if (navbar?.classList.contains('active')) {
    e.preventDefault();
  }
}, { passive: false });
