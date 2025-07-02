# ShopFancy - Modern E-Commerce Platform

ShopFancy is a feature-rich e-commerce platform built with modern web technologies. It offers a seamless shopping experience with a beautiful user interface and robust functionality.

![Hero Image](public/images/heroSection.svg)

## Features

- **User Authentication**: Secure user registration and login system
- **Product Catalog**: Browse through various categories of products
- **Product Details**: Detailed product information with images and specifications
- **Shopping Cart**: Add/remove items, update quantities
- **Order Management**: Track and manage your orders
- **Payment Integration**: Secure payment processing
- **Responsive Design**: Works seamlessly across all devices
- **Real-time Updates**: Cart and product quantity updates in real-time

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js
- **Build Tool**: Vite.js
- **Database**: JSON (File-based storage)
- **Deployment**: Vercel

## Project Structure

```
ShopFancy/
├── api/                  # Backend API endpoints
│   ├── auth.js          # Authentication endpoints
│   └── product.js       # Product-related endpoints
├── assets/
│   ├── css/            # CSS stylesheets
│   │   ├── details.css
│   │   ├── payment.css
│   │   ├── style.css
│   │   └── welcome.css
│   └── js/             # JavaScript modules
│       ├── addToCart.js
│       ├── details.js
│       ├── main.js
│       ├── navbar.js
│       └── many more...
├── data/                # JSON data storage
│   └── users.json
├── public/              # Static assets
│   └── images/         # Product and UI images
│       ├── products/   # Product images
│       └── various UI assets
└── HTML Pages          # Main application pages
    ├── index.html      # Home page
    ├── products.html   # Products listing
    ├── details.html    # Product details
    ├── addToCart.html  # Shopping cart
    └── more pages...
```

### Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/abhishekray2/ShopFancy.git
   cd ShopFancy
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Start the backend server
   ```bash
   node assets/js/server.js
   ```

The application will be available at `http://localhost:5173`

## Pages

- **Welcome Page** (`welcome.html`): Introduction and onboarding
- **Home Page** (`index.html`): Main product listing and categories
- **Products** (`products.html`): Detailed product catalog
- **Product Details** (`details.html`): Individual product information
- **Cart** (`addToCart.html`): Shopping cart management
- **Payment** (`payment.html`): Secure checkout process
- **Order Confirmation** (`order-confirmation.html`): Post-purchase confirmation
- **About** (`about.html`): Company information
- **Contact** (`contact.html`): Customer support and inquiries
- **Profile** (`profile.html`): User profile management

## Development

### Building for Production

```bash
npm run build
```

This will generate optimized files in the `dist` directory.

### Development Server

```bash
npm run dev
```

Runs the app in development mode with hot-reload.

## Deployment

The project is configured for deployment on Vercel. You can deploy in two ways:

### Method 1: GitHub Integration (Recommended)
1. Push your code to GitHub
2. Visit [Vercel](https://vercel.com)
3. Import your repository
4. Deploy automatically

### Method 2: Vercel CLI
1. Install Vercel CLI: `npm install -g vercel`
2. Run: `vercel login`
3. Deploy: `vercel`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Authors

- ABHISHEK RAY - Initial work

## Acknowledgments

- Special thanks to all contributors
- Icons and images from various free resources
- Built with ❤️ using modern web technologies 
