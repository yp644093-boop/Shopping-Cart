// API Wrapper - Mock Data Functions
// These functions are designed to be replaced with actual API calls later
// Just replace the function body with fetch() calls to your backend

class API {
  // ==================== PRODUCTS ====================
  
  /**
   * Get all products
   * @param {Object} filters - Optional filters {category, search}
   * @returns {Promise<Array>}
   */
  static async getProducts(filters = {}) {
    // TODO: Replace with: return fetch('/api/products', {...})
    return new Promise((resolve) => {
      setTimeout(() => {
        let products = [...productsDatabase];
        
        if (filters.category) {
          products = products.filter(p => p.category === filters.category);
        }
        
        if (filters.search) {
          const search = filters.search.toLowerCase();
          products = products.filter(p => 
            p.name.toLowerCase().includes(search) || 
            p.description.toLowerCase().includes(search)
          );
        }
        
        resolve(products);
      }, 300); // Simulate network delay
    });
  }

  /**
   * Get single product by ID
   * @param {Number} productId
   * @returns {Promise<Object>}
   */
  static async getProductById(productId) {
    // TODO: Replace with: return fetch(`/api/products/${productId}`, {...})
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = productsDatabase.find(p => p.id === productId);
        if (product) {
          resolve(product);
        } else {
          reject(new Error('Product not found'));
        }
      }, 200);
    });
  }

  /**
   * Get products by category
   * @param {String} category
   * @returns {Promise<Array>}
   */
  static async getProductsByCategory(category) {
    // TODO: Replace with: return fetch(`/api/products?category=${category}`, {...})
    return this.getProducts({ category });
  }

  // ==================== AUTHENTICATION ====================

  /**
   * User login
   * @param {String} email
   * @param {String} password
   * @returns {Promise<Object>}
   */
  static async loginUser(email, password) {
    // TODO: Replace with: return fetch('/api/auth/login', {method: 'POST', body: JSON.stringify({...})})
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock validation
        if (email && password && email.includes('@')) {
          const user = {
            id: 1,
            email: email,
            name: email.split('@')[0],
            token: 'mock_jwt_token_' + Date.now()
          };
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('auth_token', user.token);
          resolve(user);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 400);
    });
  }

  /**
   * User registration
   * @param {String} name
   * @param {String} email
   * @param {String} password
   * @returns {Promise<Object>}
   */
  static async registerUser(name, email, password) {
    // TODO: Replace with: return fetch('/api/auth/register', {method: 'POST', body: JSON.stringify({...})})
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name && email && password) {
          if (password.length < 6) {
            reject(new Error('Password must be at least 6 characters'));
            return;
          }
          
          const user = {
            id: Math.random(),
            name: name,
            email: email,
            token: 'mock_jwt_token_' + Date.now()
          };
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('auth_token', user.token);
          resolve(user);
        } else {
          reject(new Error('All fields are required'));
        }
      }, 400);
    });
  }

  /**
   * Logout user
   * @returns {Promise<void>}
   */
  static async logoutUser() {
    // TODO: Replace with: return fetch('/api/auth/logout', {method: 'POST'})
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('auth_token');
        resolve();
      }, 200);
    });
  }

  /**
   * Get current logged-in user
   * @returns {Promise<Object|null>}
   */
  static async getCurrentUser() {
    // TODO: Replace with: return fetch('/api/auth/me', {...})
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = localStorage.getItem('user');
        resolve(user ? JSON.parse(user) : null);
      }, 100);
    });
  }

  // ==================== ORDERS ====================

  /**
   * Create new order
   * @param {Object} orderData - {user_id, items, shipping, billing, total}
   * @returns {Promise<Object>}
   */
  static async createOrder(orderData) {
    // TODO: Replace with: return fetch('/api/orders', {method: 'POST', body: JSON.stringify({...})})
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!orderData.items || orderData.items.length === 0) {
          reject(new Error('Cart is empty'));
          return;
        }

        const order = {
          id: 'ORDER-' + Date.now(),
          user_id: orderData.user_id,
          items: orderData.items,
          shipping: orderData.shipping,
          billing: orderData.billing,
          total: orderData.total,
          status: 'pending',
          created_at: new Date().toISOString(),
          estimated_delivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()
        };

        // Store order in localStorage
        let orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));

        resolve(order);
      }, 500);
    });
  }

  /**
   * Get all orders for user
   * @param {Number} userId
   * @returns {Promise<Array>}
   */
  static async getOrders(userId) {
    // TODO: Replace with: return fetch(`/api/orders?user_id=${userId}`, {...})
    return new Promise((resolve) => {
      setTimeout(() => {
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        const userOrders = orders.filter(o => o.user_id === userId);
        resolve(userOrders);
      }, 300);
    });
  }

  /**
   * Get order by ID
   * @param {String} orderId
   * @returns {Promise<Object>}
   */
  static async getOrderById(orderId) {
    // TODO: Replace with: return fetch(`/api/orders/${orderId}`, {...})
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        const order = orders.find(o => o.id === orderId);
        if (order) {
          resolve(order);
        } else {
          reject(new Error('Order not found'));
        }
      }, 200);
    });
  }

  // ==================== CART (Local Operations) ====================

  /**
   * Get cart from localStorage
   * @returns {Array}
   */
  static getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }

  /**
   * Save cart to localStorage
   * @param {Array} cart
   */
  static saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  /**
   * Add item to cart
   * @param {Object} product
   * @param {Number} quantity
   */
  static addToCart(product, quantity = 1) {
    const cart = this.getCart();
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        ...product,
        quantity: quantity
      });
    }

    this.saveCart(cart);
  }

  /**
   * Remove item from cart
   * @param {Number} productId
   */
  static removeFromCart(productId) {
    const cart = this.getCart();
    const filteredCart = cart.filter(item => item.id !== productId);
    this.saveCart(filteredCart);
  }

  /**
   * Update cart item quantity
   * @param {Number} productId
   * @param {Number} quantity
   */
  static updateCartQuantity(productId, quantity) {
    const cart = this.getCart();
    const item = cart.find(item => item.id === productId);
    if (item) {
      item.quantity = Math.max(1, quantity);
      this.saveCart(cart);
    }
  }

  /**
   * Clear cart
   */
  static clearCart() {
    localStorage.removeItem('cart');
  }

  /**
   * Get cart total
   * @returns {Number}
   */
  static getCartTotal() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  /**
   * Get cart item count
   * @returns {Number}
   */
  static getCartCount() {
    const cart = this.getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
  }
}
