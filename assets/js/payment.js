document.addEventListener('DOMContentLoaded', function () {
    console.log("Payment page loaded");

    // Initialize the page
    initializePage();

    // Set up event listeners
    setupEventListeners();
});

function initializePage() {
    // Load cart data
    const checkoutCart = JSON.parse(sessionStorage.getItem('checkoutCart') || '[]');
    const buyNowOrder = JSON.parse(sessionStorage.getItem('buyNowOrder') || 'null');
    const checkoutSource = sessionStorage.getItem('checkoutSource') || 'unknown';

    let orderItems = [];
    let subtotal = 0;

    // Process orders based on source
    if (buyNowOrder && !checkoutCart.length) {
        orderItems.push({
            name: buyNowOrder.name,
            quantity: buyNowOrder.quantity,
            unitPrice: buyNowOrder.price,
            totalPrice: buyNowOrder.totalPrice,
            image: buyNowOrder.image || null
        });
        subtotal = buyNowOrder.totalPrice;
    } else if (checkoutCart.length > 0) {
        checkoutCart.forEach(item => {
            const itemTotal = item.price;
            orderItems.push({
                name: item.name || `Product ${item.id}`,
                quantity: item.quantity,
                unitPrice: item.unitPrice || (item.price / item.quantity),
                totalPrice: itemTotal,
                image: item.image || null
            });
            subtotal += itemTotal;
        });
    } else {
        showToast('error', 'No items in cart. Please add items first.');
        setTimeout(() => {
            window.location.href = 'products.html';
        }, 2000);
        return;
    }

    // Update the order summary
    updateOrderSummary(orderItems, subtotal);
}

function updateOrderSummary(orderItems, subtotal) {
    const orderItemsContainer = document.getElementById('orderItems');
    if (!orderItemsContainer) return;

    // Clear existing items
    orderItemsContainer.innerHTML = '';

    // Add new items
    orderItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'order-item';
        itemElement.innerHTML = `
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>Quantity: ${item.quantity} | Unit Price: ₹${item.unitPrice.toFixed(2)}</p>
            </div>
            <div class="item-price">₹${item.totalPrice.toFixed(2)}</div>
        `;
        orderItemsContainer.appendChild(itemElement);
    });

    // Calculate totals
    const shippingCost = subtotal >= 500 ? 0 : 50;
    const tax = subtotal * 0.18;
    const total = subtotal + shippingCost + tax;

    // Update summary values
    document.getElementById('subtotal').textContent = `₹${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = shippingCost === 0 ? 'Free' : `₹${shippingCost.toFixed(2)}`;
    document.getElementById('tax').textContent = `₹${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `₹${total.toFixed(2)}`;
    document.getElementById('buttonAmount').textContent = `₹${total.toFixed(2)}`;
}

function setupEventListeners() {
    // Payment method switching
    document.querySelectorAll('.payment-method').forEach(method => {
        method.addEventListener('click', function() {
            // Update active states
            document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('active'));
            this.classList.add('active');

            // Show selected payment section
            document.querySelectorAll('.payment-section').forEach(section => {
                section.classList.remove('active');
            });
            const selectedMethod = this.getAttribute('data-method');
            const targetSection = document.getElementById(selectedMethod + 'Payment');
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });

    // Card number formatting
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            if (formattedValue.length <= 19) {
                e.target.value = formattedValue;
            }
        });
    }

    // Expiry date formatting
    const expiryInput = document.getElementById('expiryDate');
    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }

    // CVV numeric only
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });
    }

    // PIN code numeric only
    const pincodeInput = document.getElementById('pincode');
    if (pincodeInput) {
        pincodeInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });
    }

    // Form submission
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', handleFormSubmission);
    }

    // Input animations
    document.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('focus', function() {
            this.closest('.form-group').classList.add('focused');
        });

        input.addEventListener('blur', function() {
            if (!this.value) {
                this.closest('.form-group').classList.remove('focused');
            }
        });
    });
}

function handleFormSubmission(e) {
    e.preventDefault();

    if (!validateForm()) {
        showToast('error', 'Please fill in all required fields correctly');
        return;
    }

    // Show loading overlay
    document.getElementById('loadingOverlay').style.display = 'flex';

    // Simulate payment processing
    setTimeout(() => {
        // Hide loading overlay
        document.getElementById('loadingOverlay').style.display = 'none';

        // Generate random order number
        const orderNumber = Math.floor(Math.random() * 1000000);
        document.getElementById('orderNumber').textContent = orderNumber;

        // Show success overlay
        document.getElementById('successOverlay').style.display = 'flex';

        // Clear cart data
        sessionStorage.removeItem('buyNowOrder');
        sessionStorage.removeItem('checkoutCart');
        sessionStorage.removeItem('checkoutSource');

        if (sessionStorage.getItem('checkoutSource') === 'cart') {
            localStorage.removeItem('cartProductLS');
        }

        // Redirect after delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 3000);
    }, 2000);
}

function validateForm() {
    let isValid = true;
    const activePaymentMethod = document.querySelector('.payment-method.active').getAttribute('data-method');

    // Common fields
    const commonFields = ['email', 'firstName', 'lastName', 'address', 'city', 'state', 'pincode'];
    
    // Payment method specific fields
    const methodFields = {
        card: ['cardNumber', 'expiryDate', 'cvv', 'cardName'],
        upi: ['upiId'],
        netbanking: ['bankSelect']
    };

    // Validate common fields
    commonFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!validateField(field)) isValid = false;
    });

    // Validate payment method specific fields
    methodFields[activePaymentMethod].forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!validateField(field)) isValid = false;
    });

    // Additional validation for specific fields
    if (activePaymentMethod === 'card') {
        const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
        if (cardNumber.length !== 16) {
            markInvalid(document.getElementById('cardNumber'));
            isValid = false;
        }

        const expiryDate = document.getElementById('expiryDate').value;
        if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
            markInvalid(document.getElementById('expiryDate'));
            isValid = false;
        }

        const cvv = document.getElementById('cvv').value;
        if (cvv.length < 3 || cvv.length > 4) {
            markInvalid(document.getElementById('cvv'));
            isValid = false;
        }
    }

    return isValid;
}

function validateField(field) {
    if (!field) return true;
    
    const value = field.value.trim();
    if (!value) {
        markInvalid(field);
        return false;
    }
    
    markValid(field);
    return true;
}

function markInvalid(field) {
    field.classList.add('invalid');
    field.classList.remove('valid');
}

function markValid(field) {
    field.classList.remove('invalid');
    field.classList.add('valid');
}

function showToast(type, message) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span class="toast-message">${message}</span>
    `;

    const container = document.getElementById('toastContainer');
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Payment validation and processing logic
class PaymentProcessor {
    constructor() {
        this.form = document.getElementById('paymentForm');
        this.cardNumber = document.getElementById('cardNumber');
        this.expiryDate = document.getElementById('expiryDate');
        this.cvv = document.getElementById('cvv');
        this.cardName = document.getElementById('cardName');
        this.submitButton = document.querySelector('.submit-payment');
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Card number validation and formatting
        this.cardNumber.addEventListener('input', (e) => this.formatCardNumber(e));
        this.cardNumber.addEventListener('blur', () => this.validateCardNumber());

        // Expiry date validation and formatting
        this.expiryDate.addEventListener('input', (e) => this.formatExpiryDate(e));
        this.expiryDate.addEventListener('blur', () => this.validateExpiryDate());

        // CVV validation
        this.cvv.addEventListener('input', (e) => this.formatCVV(e));
        this.cvv.addEventListener('blur', () => this.validateCVV());

        // Card name validation
        this.cardName.addEventListener('blur', () => this.validateCardName());

        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    formatCardNumber(e) {
        let value = e.target.value.replace(/\D/g, '');
        let formattedValue = '';
        
        for (let i = 0; i < value.length && i < 16; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += value[i];
        }
        
        e.target.value = formattedValue;
        
        // Update card preview
        document.getElementById('previewCardNumber').textContent = 
            formattedValue || '•••• •••• •••• ••••';

        // Update card type icon based on first digit
        this.updateCardType(value);
    }

    updateCardType(cardNumber) {
        const cardTypeIcon = document.getElementById('cardTypeIcon');
        const firstDigit = cardNumber.charAt(0);

        switch (firstDigit) {
            case '4':
                cardTypeIcon.innerHTML = '<i class="fab fa-cc-visa"></i>';
                break;
            case '5':
                cardTypeIcon.innerHTML = '<i class="fab fa-cc-mastercard"></i>';
                break;
            case '3':
                cardTypeIcon.innerHTML = '<i class="fab fa-cc-amex"></i>';
                break;
            default:
                cardTypeIcon.innerHTML = '<i class="fas fa-credit-card"></i>';
        }
    }

    formatExpiryDate(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        
        e.target.value = value;
        
        // Update card preview
        document.getElementById('previewCardExpiry').textContent = value || 'MM/YY';
    }

    formatCVV(e) {
        let value = e.target.value.replace(/\D/g, '');
        e.target.value = value.slice(0, 4);
    }

    validateCardNumber() {
        const value = this.cardNumber.value.replace(/\s/g, '');
        const isValid = this.luhnCheck(value) && value.length >= 15;
        
        this.updateValidationUI(this.cardNumber, isValid);
        return isValid;
    }

    validateExpiryDate() {
        const value = this.expiryDate.value;
        const [month, year] = value.split('/');
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;

        const isValid = 
            month >= 1 && 
            month <= 12 && 
            year >= currentYear &&
            (year > currentYear || month >= currentMonth);

        this.updateValidationUI(this.expiryDate, isValid);
        return isValid;
    }

    validateCVV() {
        const value = this.cvv.value;
        const isValid = /^\d{3,4}$/.test(value);
        
        this.updateValidationUI(this.cvv, isValid);
        return isValid;
    }

    validateCardName() {
        const value = this.cardName.value.trim();
        const isValid = value.length >= 3 && /^[a-zA-Z\s]+$/.test(value);
        
        this.updateValidationUI(this.cardName, isValid);
        return isValid;
    }

    updateValidationUI(element, isValid) {
        if (isValid) {
            element.classList.remove('invalid');
            element.classList.add('valid');
        } else {
            element.classList.remove('valid');
            element.classList.add('invalid');
        }
    }

    luhnCheck(cardNumber) {
        let sum = 0;
        let isEven = false;
        
        // Loop through values starting from the rightmost digit
        for (let i = cardNumber.length - 1; i >= 0; i--) {
            let digit = parseInt(cardNumber.charAt(i));

            if (isEven) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }

            sum += digit;
            isEven = !isEven;
        }

        return sum % 10 === 0;
    }

    async processPayment(paymentData) {
        // Simulate API call to payment processor
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate 90% success rate
                if (Math.random() < 0.9) {
                    resolve({
                        success: true,
                        transactionId: 'txn_' + Math.random().toString(36).substr(2, 9),
                        message: 'Payment processed successfully'
                    });
                } else {
                    reject(new Error('Payment processing failed. Please try again.'));
                }
            }, 2000);
        });
    }

    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            ${message}
        `;
        document.body.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    async handleSubmit(e) {
        e.preventDefault();

        // Validate all fields
        const isCardNumberValid = this.validateCardNumber();
        const isExpiryValid = this.validateExpiryDate();
        const isCvvValid = this.validateCVV();
        const isCardNameValid = this.validateCardName();

        if (!isCardNumberValid || !isExpiryValid || !isCvvValid || !isCardNameValid) {
            this.showToast('Please check your card details and try again.', 'error');
            return;
        }

        // Disable submit button and show loading state
        this.submitButton.disabled = true;
        this.submitButton.classList.add('loading');

        try {
            // Get payment amount from the total
            const paymentAmount = document.getElementById('total').textContent.replace('$', '');

            // Process payment
            const paymentData = {
                amount: parseFloat(paymentAmount),
                cardNumber: this.cardNumber.value.replace(/\s/g, ''),
                expiryDate: this.expiryDate.value,
                cvv: this.cvv.value,
                cardName: this.cardName.value
            };

            const result = await this.processPayment(paymentData);

            // Clear cart after successful payment
            localStorage.removeItem('cart');

            // Show success message
            this.showToast('Payment successful! Redirecting to confirmation page...');

            // Save order details to localStorage for confirmation page
            const orderDetails = {
                orderId: result.transactionId,
                amount: paymentAmount,
                date: new Date().toISOString(),
                items: JSON.parse(localStorage.getItem('cart') || '[]')
            };
            localStorage.setItem('lastOrder', JSON.stringify(orderDetails));

            // Redirect to confirmation page
            setTimeout(() => {
                window.location.href = '/order-confirmation.html';
            }, 2000);

        } catch (error) {
            this.showToast(error.message || 'Payment failed. Please try again.', 'error');
            this.submitButton.disabled = false;
            this.submitButton.classList.remove('loading');
        }
    }
}

// Initialize payment processor when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const paymentProcessor = new PaymentProcessor();
});

// Handle payment method switching
document.querySelectorAll('.payment-method').forEach(method => {
    method.addEventListener('click', () => {
        // Remove active class from all methods
        document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('active'));
        // Add active class to clicked method
        method.classList.add('active');

        // Hide all payment sections
        document.querySelectorAll('.payment-section').forEach(section => {
            section.style.display = 'none';
        });

        // Show selected payment section
        const selectedMethod = method.getAttribute('data-method');
        document.getElementById(`${selectedMethod}Payment`).style.display = 'block';
    });
});

// Load cart items and user profile when page loads
window.addEventListener('load', () => {
    loadCartItems();
    loadUserProfile();
});

// Function to load cart items
function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderItemsContainer = document.getElementById('orderItems');
    let subtotal = 0;

    orderItemsContainer.innerHTML = '';

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'order-item';
        itemElement.innerHTML = `
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>Quantity: ${item.quantity}</p>
            </div>
            <div class="item-price">$${(item.price * item.quantity).toFixed(2)}</div>
        `;
        orderItemsContainer.appendChild(itemElement);
        subtotal += item.price * item.quantity;
    });

    // Update totals
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    document.getElementById('paymentAmount').textContent = `$${total.toFixed(2)}`;
}

const API_BASE_URL = 'http://localhost:3000';

// Function to load user profile
async function loadUserProfile() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;

    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/profile/${user.id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        if (data.success) {
            const profile = data.profile;
            const addressElement = document.getElementById('shippingAddress');
            
            if (profile.address && profile.city && profile.postalCode) {
                addressElement.textContent = `${profile.address}, ${profile.city}, ${profile.postalCode}`;
            } else {
                addressElement.textContent = 'No shipping address found';
            }
        }
    } catch (error) {
        console.error('Failed to load profile:', error);
        document.getElementById('shippingAddress').textContent = 'Error loading shipping address';
    }
} 