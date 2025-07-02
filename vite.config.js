// vite.config.js
import { defineConfig } from "vite";
import { resolve } from "path";
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"), // main entry point (e.g., home page)
        about: resolve(__dirname, "about.html"), // Additional HTML pages
	      welcome: resolve(__dirname, "welcome.html"),
        contact: resolve(__dirname, "contact.html"),
        products: resolve(__dirname, "products.html"),
        addToCart: resolve(__dirname, "addToCart.html"),
        details: resolve(__dirname, "details.html"),
        payment: resolve(__dirname, "payment.html"),
        paymentSuccess: resolve(__dirname, "order-confirmation.html"),
        // Add more entry points for other HTML files as needed
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
});
