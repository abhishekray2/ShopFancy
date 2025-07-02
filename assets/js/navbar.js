// Function to check if user is logged in
function isUserLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user'));
    return !!user;
}

// Function to get user email
function getUserEmail() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? user.email : '';
}

// Function to handle logout
function handleLogout() {
    localStorage.removeItem('user');
    window.location.href = '/welcome.html';
}

// Function to get cart count
function getCartCount() {
    try {
        const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
        return cartProducts.reduce((total, item) => total + (parseInt(item.quantity) || 0), 0);
    } catch (error) {
        console.error('Error getting cart count:', error);
        return 0;
    }
}

// Function to generate auth section HTML
function getAuthSectionHTML() {
    if (isUserLoggedIn()) {
        return `
            <div class="user-profile-section">
                <div class="user-menu">
                    <button class="profile-button">
                        <i class="fas fa-user-circle"></i> ${getUserEmail()}
                    </button>
                    <div class="dropdown-menu">
                        <a href="/profile.html"><i class="fas fa-user-edit"></i> Edit Profile</a>
                        <a href="#" onclick="handleLogout()"><i class="fas fa-sign-out-alt"></i> Logout</a>
                    </div>
                </div>
            </div>
        `;
    } else {
        return `
            <div class="sing_in_up">
                <a href="welcome.html"><i class="fas fa-user"></i> SIGN IN</a>
                <a href="welcome.html"><i class="fas fa-user-plus"></i> SIGN UP</a>
            </div>
        `;
    }
}

const navbarHTML = `
  <header class="section-navbar">
    <section class="top_txt">
      <div class="head container">
        <div class="head_txt">
          <p><i class="fas fa-truck-fast"></i> Free shipping, 30-day return or refund guarantee.</p>
        </div>
        ${getAuthSectionHTML()}
      </div>
    </section>
    <div class="container">
      <div class="navbar-brand">
        <a href="index.html">
          <h1>ShopFancy</h1>
        </a>
      </div>
      
      <div class="search-container">
        <form class="search-form">
          <input type="text" class="search-input" placeholder="Search Products...">
          <button type="submit" class="search-btn">
            <i class="fas fa-search"></i>
          </button>
        </form>
      </div>

      <nav class="navbar">
        <ul>
          <li><a href="/" class="nav-link">HOME</a></li>
          <li><a href="about.html" class="nav-link">ABOUT</a></li>
          <li><a href="products.html" class="nav-link">PRODUCTS</a></li>
          <li><a href="contact.html" class="nav-link">CONTACT</a></li>
          <a href="addToCart.html" class="nav-link">
              <i class="fa-solid fa-cart-shopping"></i> ${getCartCount()}
          </a>
        </ul>
        
        <div class="mobile-search">
          <form class="search-form">
            <input type="text" class="search-input" placeholder="Search Products...">
            <button type="submit" class="search-btn">
              <i class="fas fa-search"></i>
            </button>
          </form>
        </div>
      </nav>

      <!-- <a href="addToCart.html" id="cartValue">
        <i class="fa-solid fa-cart-shopping"></i> ${getCartCount()}
      </a> -->

      <div class="mobile-menu-icon">
        <i class="fas fa-bars"></i>
      </div>
    </div>
  </header>
`;

// Function to initialize the navbar
function initializeNavbar() {
    // Insert the navbar at the start of the body
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);

    // Add mobile menu toggle functionality
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const navbar = document.querySelector('.navbar');

    mobileMenuIcon.addEventListener('click', () => {
        navbar.classList.toggle('active');
        mobileMenuIcon.querySelector('i').classList.toggle('fa-bars');
        mobileMenuIcon.querySelector('i').classList.toggle('fa-times');
    });

    // Highlight current page in navigation
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage || 
            (currentPage === '/' && link.getAttribute('href') === '/') ||
            (currentPage.includes(link.getAttribute('href')) && link.getAttribute('href') !== '/')) {
            link.classList.add('active');
        }
    });

    // Add dropdown functionality for user profile
    const profileButton = document.querySelector('.profile-button');
    if (profileButton) {
        profileButton.addEventListener('click', () => {
            const dropdownMenu = document.querySelector('.dropdown-menu');
            dropdownMenu.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (event) => {
            if (!event.target.closest('.user-menu')) {
                const dropdownMenu = document.querySelector('.dropdown-menu');
                if (dropdownMenu) {
                    dropdownMenu.classList.remove('show');
                }
            }
        });
    }

    // Initialize search functionality
    const searchForms = document.querySelectorAll('.search-form');
    searchForms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const searchInput = this.querySelector('.search-input');
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `products.html?search=${encodeURIComponent(query)}`;
            }
        });
    });
}

// Initialize the navbar when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeNavbar);

// Listen for cart updates
window.addEventListener('storage', (e) => {
    if (e.key === 'cartProducts') {
        const cartValue = document.querySelector('#cartValue');
        if (cartValue) {
            cartValue.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> ${getCartCount()}`;
        }
    }
});

// Export the handleLogout function to make it available globally
window.handleLogout = handleLogout;
