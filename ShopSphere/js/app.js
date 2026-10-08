// Main App Functionality
class App {
  /**
   * Initialize app
   */
  static async init() {
    this.setupNavigation();
    this.setupSearch();
    this.setupMobileMenu();
  }

  /**
   * Setup navigation
   */
  static setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });
  }

  /**
   * Setup search functionality
   */
  static setupSearch() {
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = document.getElementById('search-input').value;
        window.location.href = `products.html?search=${encodeURIComponent(query)}`;
      });
    }
  }

  /**
   * Setup mobile menu toggle
   */
  static setupMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
      menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
      });

      // Close menu when clicking links
      navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('active');
        });
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
          navMenu.classList.remove('active');
        }
      });
    }
  }
}

// Products Listing Page
class ProductsPage {
  /**
   * Initialize products page
   */
  static async init() {
    this.loadFilters();
    await this.loadProducts();
  }

  /**
   * Load category filters
   */
  static loadFilters() {
    const categoriesContainer = document.getElementById('categories');
    if (!categoriesContainer) return;

    const categories = ['electronics', 'accessories'];
    
    categoriesContainer.innerHTML = `
      <label class="filter-item">
        <input type="radio" name="category" value="" checked onchange="ProductsPage.applyFilters()">
        <span>All Categories</span>
      </label>
      ${categories.map(cat => `
        <label class="filter-item">
          <input type="radio" name="category" value="${cat}" onchange="ProductsPage.applyFilters()">
          <span>${cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
        </label>
      `).join('')}
    `;
  }

  /**
   * Load products
   */
  static async loadProducts() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const search = urlParams.get('search') || '';
      
      const products = await API.getProducts({ search });
      this.renderProducts(products);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }

  /**
   * Render products
   */
  static renderProducts(products) {
    const container = document.getElementById('products-grid');
    if (!container) return;

    if (products.length === 0) {
      container.innerHTML = '<p class="no-products">No products found</p>';
      return;
    }

    container.innerHTML = products.map(product => `
      <div class="product-card">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          <div class="product-badge">${product.stock > 0 ? 'In Stock' : 'Out of Stock'}</div>
        </div>
        <div class="product-info">
          <h3>${product.name}</h3>
          <div class="product-rating">
            <span class="stars">${this.renderStars(product.rating)}</span>
            <span class="rating-value">${product.rating} (${product.reviews})</span>
          </div>
          <p class="product-description">${product.description.substring(0, 60)}...</p>
          <div class="product-footer">
            <span class="price">$${product.price.toFixed(2)}</span>
            <div class="product-actions">
              <a href="product.html?id=${product.id}" class="btn btn-small btn-outline">View</a>
              <button class="btn btn-small btn-primary" onclick="ProductsPage.quickAdd(${product.id})">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  /**
   * Render star rating
   */
  static renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
      stars += '★';
    }
    if (hasHalfStar) {
      stars += '☆';
    }
    
    return stars;
  }

  /**
   * Quick add to cart
   */
  static async quickAdd(productId) {
    try {
      const product = await API.getProductById(productId);
      CartManager.addItemWithNotification(product);
    } catch (error) {
      alert('Error adding to cart');
    }
  }

  /**
   * Apply filters
   */
  static async applyFilters() {
    const selectedCategory = document.querySelector('input[name="category"]:checked').value;
    
    try {
      const products = await API.getProducts({ 
        category: selectedCategory || undefined
      });
      this.renderProducts(products);
    } catch (error) {
      console.error('Error applying filters:', error);
    }
  }
}

// Product Details Page
class ProductDetailsPage {
  /**
   * Initialize product details page
   */
  static async init() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    if (!productId) {
      window.location.href = 'products.html';
      return;
    }

    await this.loadProduct(productId);
    this.setupQuantityControls();
  }

  /**
   * Load product details
   */
  static async loadProduct(productId) {
    try {
      const product = await API.getProductById(productId);
      this.renderProduct(product);
    } catch (error) {
      window.location.href = 'products.html';
    }
  }

  /**
   * Render product details
   */
  static renderProduct(product) {
    const container = document.getElementById('product-details');
    if (!container) return;

    container.innerHTML = `
      <div class="details-image">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="details-info">
        <h1>${product.name}</h1>
        <div class="rating">
          <span>${ProductsPage.renderStars(product.rating)}</span>
          <span class="rating-text">${product.rating}/5 (${product.reviews} reviews)</span>
        </div>
        <div class="details-price">
          <span class="price">$${product.price.toFixed(2)}</span>
          <span class="stock ${product.stock > 0 ? 'available' : 'unavailable'}">
            ${product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
        </div>
        <p class="details-description">${product.description}</p>
        
        <div class="details-actions">
          <div class="quantity-selector">
            <button id="qty-decrease" class="qty-btn">−</button>
            <input type="number" id="qty-input" value="1" min="1" max="${product.stock}" readonly>
            <button id="qty-increase" class="qty-btn">+</button>
          </div>
          <button class="btn btn-primary btn-large" id="add-to-cart-btn" 
            onclick="ProductDetailsPage.addToCart(${product.id})">
            Add to Cart
          </button>
        </div>

        <div class="details-specs">
          <h3>Product Details</h3>
          <ul>
            <li><strong>Category:</strong> ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</li>
            <li><strong>In Stock:</strong> ${product.stock > 0 ? 'Yes' : 'No'}</li>
            <li><strong>SKU:</strong> PROD-${product.id}</li>
          </ul>
        </div>
      </div>
    `;

    // Store product data for later use
    window.currentProduct = product;
  }

  /**
   * Setup quantity controls
   */
  static setupQuantityControls() {
    const decreaseBtn = document.getElementById('qty-decrease');
    const increaseBtn = document.getElementById('qty-increase');
    const qtyInput = document.getElementById('qty-input');

    if (decreaseBtn && increaseBtn && qtyInput) {
      decreaseBtn.addEventListener('click', () => {
        const currentQty = parseInt(qtyInput.value);
        if (currentQty > 1) {
          qtyInput.value = currentQty - 1;
        }
      });

      increaseBtn.addEventListener('click', () => {
        const maxQty = parseInt(qtyInput.getAttribute('max'));
        const currentQty = parseInt(qtyInput.value);
        if (currentQty < maxQty) {
          qtyInput.value = currentQty + 1;
        }
      });
    }
  }

  /**
   * Add to cart
   */
  static addToCart(productId) {
    const qtyInput = document.getElementById('qty-input');
    const quantity = parseInt(qtyInput.value) || 1;

    if (window.currentProduct) {
      CartManager.addItemWithNotification(window.currentProduct, quantity);
    }
  }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  App.init();

  if (document.getElementById('products-grid')) {
    ProductsPage.init();
  }

  if (document.getElementById('product-details')) {
    ProductDetailsPage.init();
  }
});
