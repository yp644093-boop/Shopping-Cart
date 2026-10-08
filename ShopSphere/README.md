# ShopSphere - E-Commerce Frontend

A modern, responsive e-commerce website built with vanilla HTML, CSS, and JavaScript. Fully functional with mock data and ready for backend integration.

## 📋 Features

✅ **Complete E-Commerce Functionality**
- Product listing with search and category filters
- Product details page with images and specifications
- Shopping cart with quantity controls
- Checkout process with form validation
- Order confirmation and order history

✅ **User Authentication**
- Login system
- Registration system
- User profile management
- Protected pages (orders only accessible when logged in)

✅ **Responsive Design**
- Desktop (1920px+)
- Tablet (768px - 1024px)
- Mobile Portrait (360px - 768px)
- Mobile Landscape
- Fully responsive navigation

✅ **Modern UI/UX**
- Clean, professional design
- Smooth animations and transitions
- Product rating system
- Stock status indicators
- Cart badge with item count
- Toast notifications

✅ **API-Ready Architecture**
- Modular JavaScript structure
- Mock API functions ready for backend connection
- All data operations isolated in `api.js`
- Easy to replace mock functions with fetch() calls

## 🗂️ Project Structure

```
ShopSphere/
├── index.html                 # Home page
├── products.html             # Products listing
├── product.html              # Product details
├── cart.html                 # Shopping cart
├── checkout.html             # Checkout form
├── order-confirmation.html   # Order confirmation
├── orders.html               # Order history
├── login.html                # Login page
├── register.html             # Registration page
├── css/
│   ├── style.css            # Main stylesheet
│   └── responsive.css       # Responsive design
├── js/
│   ├── api.js               # API wrapper (mock functions)
│   ├── auth.js              # Authentication utilities
│   ├── cart.js              # Cart management
│   ├── checkout.js          # Checkout logic
│   ├── orders.js            # Orders management
│   ├── products.js          # Product database
│   ├── app.js               # Main app functionality
└── README.md                # This file
```

## 🚀 Quick Start

1. **Open the project:**
   - No installation or build process needed!
   - Simply open `index.html` in your web browser

2. **Start exploring:**
   - Click "Shop Now" to browse products
   - Search or filter by category
   - Add items to cart
   - Register/Login to checkout

## 🔑 Demo Credentials

**Demo Mode Features:**
- Registration: Use any email and password (min 6 characters)
- Login: Use the same email/password you registered with
- Payment: Use any valid card format (e.g., 4532 1234 5678 9010)
- All data is stored in browser's `localStorage`

## 📦 Mock Data

The project includes **15 realistic sample products** with:
- Product images (Unsplash)
- Detailed descriptions
- Pricing
- Stock status
- Customer ratings and reviews
- Categories (Electronics, Accessories)

## 🔌 API-Ready Architecture

### Mock API Functions (in `js/api.js`)

All API functions are already defined and ready for backend integration:

```javascript
// Get all products
API.getProducts(filters)

// Get product by ID
API.getProductById(id)

// Authentication
API.loginUser(email, password)
API.registerUser(name, email, password)
API.logoutUser()

// Orders
API.createOrder(orderData)
API.getOrders(userId)
API.getOrderById(orderId)

// Cart (local operations)
API.getCart()
API.addToCart(product, quantity)
API.removeFromCart(productId)
```

### How to Connect Backend

1. Open `js/api.js`
2. Replace mock functions with `fetch()` calls to your backend:

```javascript
// Example: Replace this
static async getProducts(filters = {}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let products = [...productsDatabase];
      // mock logic...
      resolve(products);
    }, 300);
  });
}

// With this
static async getProducts(filters = {}) {
  const response = await fetch('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(filters)
  });
  return response.json();
}
```

## 🎨 Design Highlights

- **Color Scheme:** Professional blue theme with neutrals
- **Typography:** Clean, readable sans-serif fonts
- **Spacing:** Consistent padding and margins
- **Components:**
  - Modern product cards with hover effects
  - Responsive navbar with mobile menu
  - Clean forms with validation feedback
  - Order tracking cards
  - Cart summary sidebar

## 💾 Data Storage

- **Cart:** `localStorage` (browser storage)
- **User Session:** `localStorage` with auth token
- **Orders:** `localStorage` for demo mode
- **Products:** In-memory database (`js/products.js`)

## 🔒 Security Notes

- This is a frontend demo with mock authentication
- In production, implement proper backend authentication
- Use HTTPS for secure data transmission
- Validate all inputs on the backend
- Never store sensitive data in localStorage (production)

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 🎓 Learning Points

This project demonstrates:
- Vanilla JavaScript ES6+ features
- Async/await patterns
- DOM manipulation and events
- Responsive CSS Grid and Flexbox
- Mobile-first design approach
- Modular code architecture
- localStorage API
- Form validation
- URL parameters handling

## 🚀 Next Steps for Backend Integration

1. **Set up your backend API** (Node.js, Python, etc.)
2. **Create API endpoints:**
   - `GET /api/products`
   - `GET /api/products/:id`
   - `POST /api/auth/login`
   - `POST /api/auth/register`
   - `POST /api/orders`
   - `GET /api/orders/:userId`

3. **Update `js/api.js`** to call your endpoints
4. **Add JWT token handling** for authenticated requests
5. **Implement payment processing** (Stripe, PayPal, etc.)

## 📝 File Descriptions

### HTML Files
- **index.html** - Landing page with hero section and featured products
- **products.html** - Product grid with search and filters
- **product.html** - Detailed product view
- **cart.html** - Shopping cart management
- **checkout.html** - Multi-section checkout form
- **order-confirmation.html** - Order success page
- **orders.html** - User's order history
- **login.html** - User login form
- **register.html** - User registration form

### CSS Files
- **style.css** - All styling, animations, and component styles
- **responsive.css** - Mobile-first responsive breakpoints

### JavaScript Files
- **api.js** - Mock API functions (connect backend here)
- **auth.js** - Authentication and user management
- **cart.js** - Shopping cart functionality
- **checkout.js** - Checkout form processing
- **orders.js** - Order management and confirmation
- **products.js** - Product database
- **app.js** - Main app logic and product page functions

## ⚙️ Customization

### Change Colors
Edit CSS variables in `css/style.css`:
```css
:root {
  --primary-color: #2563eb;
  --secondary-color: #64748b;
  /* ... more colors */
}
```

### Add More Products
Edit `js/products.js` and add to `productsDatabase` array

### Modify Checkout Fields
Edit `checkout.html` form and update validation in `js/checkout.js`

## 📄 License

Free to use for educational and commercial projects.

## 🤝 Support

For issues or questions about the code structure, refer to the inline comments in each JavaScript file.

---

**Built with ❤️ for modern e-commerce development**
