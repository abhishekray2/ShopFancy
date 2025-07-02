// Import products from your JSON file or product.js
import { products } from '../../api/product.js';
import { addToCart } from './addToCart.js';
import { showToast } from './showToast.js';
import { updateCartValue } from './updateCartValue.js';

// Only run this code if we're on the details page
if (window.location.pathname.includes('details.html')) {
  document.addEventListener("DOMContentLoaded", function () {
    // Extract product ID from the URL query parameters
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");  // Get product ID from URL

    if (productId) {
      // Find the product by ID (convert to number for comparison)
      const product = products.find(p => p.id === parseInt(productId));

      if (product) {
        // Update breadcrumb
        document.getElementById("productBreadcrumb").textContent = product.name;

        // Populate the product details
        document.getElementById("productName").textContent = product.name;
        document.getElementById("productCategory").textContent = product.category;
        document.title = `${product.name} - ShopFancy`;

        // Check if brand exists before displaying
        const brandElement = document.getElementById("productBrand");
        if (product.brand) {
          brandElement.textContent = product.brand;
          brandElement.style.display = 'block';
        } else {
          brandElement.style.display = 'none';
        }

        document.getElementById("productDescription").textContent = product.description;
        document.getElementById("productPrice").textContent = `₹${product.price.toLocaleString()}`;
        
        // Update stock badge with appropriate styling
        const stockElement = document.getElementById("productStock");
        if (product.stock > 20) {
          stockElement.textContent = "In Stock";
          stockElement.classList.add("in-stock");
        } else if (product.stock > 0) {
          stockElement.textContent = `Only ${product.stock} left`;
          stockElement.classList.add("low-stock");
        } else {
          stockElement.textContent = "Out of Stock";
          stockElement.classList.add("out-of-stock");
        }

        // Set product image with loading state
        const imageElement = document.getElementById("productImage");
        imageElement.src = product.image || "https://via.placeholder.com/300?text=Product+Image";
        imageElement.alt = product.name;
        
        // Add loading class and remove it when image loads
        imageElement.classList.add("loading");
        imageElement.onload = () => imageElement.classList.remove("loading");

        // Set max quantity based on stock
        const quantityInput = document.getElementById("quantityInput");
        quantityInput.max = product.stock;
        
        // Get button elements
        const buyNowBtn = document.getElementById("buyNowBtn");
        const addToCartBtn = document.getElementById("addToCartBtn");

        // Disable buttons and quantity input if out of stock
        if (product.stock <= 0) {
          buyNowBtn.disabled = true;
          buyNowBtn.textContent = "Out of Stock";
          addToCartBtn.disabled = true;
          addToCartBtn.textContent = "Out of Stock";
          quantityInput.disabled = true;
        }

        // Add to Cart button functionality
        if (addToCartBtn && !addToCartBtn.disabled) {
          addToCartBtn.addEventListener("click", function(event) {
            event.preventDefault();
            
            // Get quantity from input
            const quantity = parseInt(quantityInput.value) || 1;
            
            // Validate quantity
            if (quantity < 1) {
              showToast("error", "Please select a valid quantity");
              return;
            }

            if (quantity > product.stock) {
              showToast("error", `Sorry, only ${product.stock} items available in stock`);
              return;
            }

            // Add to cart using the imported function
            addToCart(event, product.id, product.stock);
            
            // Show success message
            showToast("success", `${product.name} added to cart`);
            
            // Update cart value in UI
            updateCartValue();
          });
        }

        // Buy Now button functionality
        if (buyNowBtn && !buyNowBtn.disabled) {
          buyNowBtn.addEventListener("click", function(event) {
            event.preventDefault();

            // Get quantity from input
            const quantity = parseInt(quantityInput.value) || 1;

            // Validate quantity
            if (quantity < 1) {
              showToast("error", "Please select a valid quantity");
              return;
            }

            if (quantity > product.stock) {
              showToast("error", `Sorry, only ${product.stock} items available in stock`);
              return;
            }

            // Calculate total price
            const totalPrice = product.price * quantity;

            // Create order information
            const orderInfo = {
              id: product.id,
              name: product.name,
              price: product.price,
              quantity: quantity,
              totalPrice: totalPrice,
              image: product.image,
              category: product.category,
              timestamp: new Date().getTime()
            };

            // Store order info in sessionStorage
            sessionStorage.setItem('buyNowOrder', JSON.stringify(orderInfo));
            sessionStorage.setItem('checkoutSource', 'buyNow');

            // Create cart format for payment page
            const cartFormat = [{
              id: product.id,
              price: totalPrice,
              quantity: quantity,
              name: product.name,
              image: product.image,
              category: product.category,
              unitPrice: product.price
            }];

            sessionStorage.setItem('checkoutCart', JSON.stringify(cartFormat));

            // Redirect to payment page
            window.location.href = 'payment.html';
          });
        }

        // Populate specifications
        populateSpecifications(product);

      } else {
        // Product not found
        const productDetailsElement = document.querySelector(".product-details");
        if (productDetailsElement) {
          productDetailsElement.innerHTML = `
            <div class="error-container">
              <i class="fas fa-exclamation-circle"></i>
              <h2>Product Not Found</h2>
              <p>The product you're looking for could not be found.</p>
              <a href="products.html" class="back-button">
                <i class="fas fa-arrow-left"></i>
                Back to Products
              </a>
            </div>
          `;
        }
      }
    } else {
      // No product ID in URL
      const productDetailsElement = document.querySelector(".product-details");
      if (productDetailsElement) {
        productDetailsElement.innerHTML = `
          <div class="error-container">
            <i class="fas fa-exclamation-triangle"></i>
            <h2>No Product Selected</h2>
            <p>Please select a product to view its details.</p>
            <a href="products.html" class="back-button">
              <i class="fas fa-arrow-left"></i>
              Browse Products
            </a>
          </div>
        `;
      }
    }
  });
}

// Function to create a specification row
function createSpecRow(label, value) {
    const row = document.createElement('div');
    row.className = 'spec-row';
    
    const labelElement = document.createElement('div');
    labelElement.className = 'spec-label';
    labelElement.textContent = label;
    
    const valueElement = document.createElement('div');
    valueElement.className = 'spec-value';
    valueElement.textContent = value;
    
    row.appendChild(labelElement);
    row.appendChild(valueElement);
    return row;
}

// Function to populate specifications based on product category
function populateSpecifications(product) {
    const generalSpecs = document.getElementById('generalSpecs');
    const technicalSpecs = document.getElementById('technicalSpecs');
    const physicalSpecs = document.getElementById('physicalSpecs');
    const additionalSpecs = document.getElementById('additionalSpecs');

    // Clear existing specs
    generalSpecs.innerHTML = '';
    technicalSpecs.innerHTML = '';
    physicalSpecs.innerHTML = '';
    additionalSpecs.innerHTML = '';

    // Common specifications for all products
    generalSpecs.appendChild(createSpecRow('Brand', product.brand));
    generalSpecs.appendChild(createSpecRow('Model', product.model || 'N/A'));
    generalSpecs.appendChild(createSpecRow('Category', product.category));
    generalSpecs.appendChild(createSpecRow('Warranty', '1 Year Manufacturer Warranty'));

    // Category-specific specifications
    switch (product.category.toLowerCase()) {
        case 'laptops':
        case 'computers':
            // Technical Specs
            technicalSpecs.appendChild(createSpecRow('Processor', product.processor || 'N/A'));
            technicalSpecs.appendChild(createSpecRow('RAM', product.ram || 'N/A'));
            technicalSpecs.appendChild(createSpecRow('Storage', product.storage || 'N/A'));
            technicalSpecs.appendChild(createSpecRow('Graphics', product.graphics || 'N/A'));
            technicalSpecs.appendChild(createSpecRow('Display', product.display || 'N/A'));
            technicalSpecs.appendChild(createSpecRow('Operating System', product.os || 'N/A'));

            // Physical Specs
            physicalSpecs.appendChild(createSpecRow('Weight', product.weight || 'N/A'));
            physicalSpecs.appendChild(createSpecRow('Dimensions', product.dimensions || 'N/A'));
            physicalSpecs.appendChild(createSpecRow('Color', product.color || 'N/A'));
            break;

        case 'mobiles':
        case 'phones':
            // Technical Specs
            technicalSpecs.appendChild(createSpecRow('Processor', product.processor || 'N/A'));
            technicalSpecs.appendChild(createSpecRow('RAM', product.ram || 'N/A'));
            technicalSpecs.appendChild(createSpecRow('Storage', product.storage || 'N/A'));
            technicalSpecs.appendChild(createSpecRow('Display', product.display || 'N/A'));
            technicalSpecs.appendChild(createSpecRow('Camera', product.camera || 'N/A'));
            technicalSpecs.appendChild(createSpecRow('Battery', product.battery || 'N/A'));

            // Physical Specs
            physicalSpecs.appendChild(createSpecRow('Weight', product.weight || 'N/A'));
            physicalSpecs.appendChild(createSpecRow('Dimensions', product.dimensions || 'N/A'));
            physicalSpecs.appendChild(createSpecRow('Color', product.color || 'N/A'));
            break;

        case 'audio':
            // Technical Specs
            technicalSpecs.appendChild(createSpecRow('Driver Size', product.driverSize || 'N/A'));
            technicalSpecs.appendChild(createSpecRow('Frequency Response', product.frequency || 'N/A'));
            technicalSpecs.appendChild(createSpecRow('Connectivity', product.connectivity || 'N/A'));
            technicalSpecs.appendChild(createSpecRow('Battery Life', product.batteryLife || 'N/A'));

            // Physical Specs
            physicalSpecs.appendChild(createSpecRow('Weight', product.weight || 'N/A'));
            physicalSpecs.appendChild(createSpecRow('Color', product.color || 'N/A'));
            break;

        case 'wearables':
            // Technical Specs
            technicalSpecs.appendChild(createSpecRow('Display', product.display || 'N/A'));
            technicalSpecs.appendChild(createSpecRow('Battery Life', product.batteryLife || 'N/A'));
            technicalSpecs.appendChild(createSpecRow('Sensors', product.sensors || 'N/A'));
            technicalSpecs.appendChild(createSpecRow('Compatibility', product.compatibility || 'N/A'));

            // Physical Specs
            physicalSpecs.appendChild(createSpecRow('Weight', product.weight || 'N/A'));
            physicalSpecs.appendChild(createSpecRow('Water Resistance', product.waterResistance || 'N/A'));
            physicalSpecs.appendChild(createSpecRow('Color', product.color || 'N/A'));
            break;
    }

    // Additional Information
    additionalSpecs.appendChild(createSpecRow('In the Box', product.inTheBox || 'Product with standard accessories'));
    additionalSpecs.appendChild(createSpecRow('Manufacturer', product.manufacturer || product.brand));
    additionalSpecs.appendChild(createSpecRow('Country of Origin', product.origin || 'N/A'));
    additionalSpecs.appendChild(createSpecRow('Release Date', product.releaseDate || 'N/A'));
}
