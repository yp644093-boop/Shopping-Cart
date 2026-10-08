// Cart Management Utilities
class CartManager {
  /**
   * Update cart icon badge
   */
  static updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    if (badge) {
      const count = API.getCartCount();
      badge.textContent = count;
      badge.style.display = count > 0 ? 'block' : 'none';
    }
  }

  /**
   * Render cart items on page
   */
  static renderCart() {
    const cartContainer = document.getElementById('cart-items');
    const emptyCart = document.getElementById('empty-cart');
    const cart = API.getCart();

    if (!cartContainer) return;

    if (cart.length === 0) {
      cartContainer.innerHTML = '';
      if (emptyCart) emptyCart.style.display = 'block';
      return;
    }

    if (emptyCart) emptyCart.style.display = 'none';

    cartContainer.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-details">
          <h3>${item.name}</h3>
          <p class="price">$${item.price.toFixed(2)}</p>
        </div>
        <div class="cart-item-quantity">
          <button class="qty-btn" onclick="CartManager.decreaseQuantity(${item.id})">−</button>
          <input type="number" value="${item.quantity}" min="1" readonly>
          <button class="qty-btn" onclick="CartManager.increaseQuantity(${item.id})">+</button>
        </div>
        <div class="cart-item-total">
          $${(item.price * item.quantity).toFixed(2)}
        </div>
        <button class="remove-btn" onclick="CartManager.removeItem(${item.id})">
          <i class="icon">✕</i>
        </button>
      </div>
    `).join('');

    this.updateCartSummary();
  }

  /**
   * Update cart summary (total, subtotal, etc.)
   */
  static updateCartSummary() {
    const subtotal = API.getCartTotal();
    const tax = subtotal * 0.1; // 10% tax
    const shipping = subtotal > 0 ? 10 : 0;
    const total = subtotal + tax + shipping;

    // Update all relevant elements
    const elements = {
      'cart-subtotal': subtotal.toFixed(2),
      'cart-tax': tax.toFixed(2),
      'cart-shipping': shipping.toFixed(2),
      'cart-total': total.toFixed(2)
    };

    for (const [id, value] of Object.entries(elements)) {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    }
  }

  /**
   * Increase item quantity
   */
  static increaseQuantity(productId) {
    const cart = API.getCart();
    const item = cart.find(i => i.id === productId);
    if (item && item.quantity < 99) {
      API.updateCartQuantity(productId, item.quantity + 1);
      this.renderCart();
      this.updateCartBadge();
    }
  }

  /**
   * Decrease item quantity
   */
  static decreaseQuantity(productId) {
    const cart = API.getCart();
    const item = cart.find(i => i.id === productId);
    if (item && item.quantity > 1) {
      API.updateCartQuantity(productId, item.quantity - 1);
      this.renderCart();
      this.updateCartBadge();
    }
  }

  /**
   * Remove item from cart
   */
  static removeItem(productId) {
    if (confirm('Remove item from cart?')) {
      API.removeFromCart(productId);
      this.renderCart();
      this.updateCartBadge();
    }
  }

  /**
   * Add item to cart with notification
   */
  static addItemWithNotification(product, quantity = 1) {
    API.addToCart(product, quantity);
    this.updateCartBadge();
    this.showNotification(`${product.name} added to cart!`);
  }

  /**
   * Show notification
   */
  static showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification success';
    notification.textContent = message;
    document.body.appendChild(notification);

    // Auto remove
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);

    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  /**
   * Initialize cart on page load
   */
  static init() {
    this.updateCartBadge();
    this.renderCart();
  }
}

// Initialize cart
document.addEventListener('DOMContentLoaded', () => {
  CartManager.init();
});
