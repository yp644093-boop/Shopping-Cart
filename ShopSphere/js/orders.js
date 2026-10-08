// Orders Management
class OrdersPage {
  /**
   * Initialize orders page
   */
  static async init() {
    Auth.requireLogin();
    await this.loadOrders();
  }

  /**
   * Load user orders
   */
  static async loadOrders() {
    const container = document.getElementById('orders-list');
    const emptyState = document.getElementById('empty-orders');

    if (!container) return;

    try {
      const user = Auth.getCurrentUser();
      const orders = await API.getOrders(user.id);

      if (orders.length === 0) {
        container.innerHTML = '';
        if (emptyState) emptyState.style.display = 'block';
        return;
      }

      if (emptyState) emptyState.style.display = 'none';

      container.innerHTML = orders.map(order => `
        <div class="order-card">
          <div class="order-header">
            <div>
              <h3>${order.id}</h3>
              <p class="order-date">${new Date(order.created_at).toLocaleDateString()}</p>
            </div>
            <div class="order-status ${order.status}">
              ${this.formatStatus(order.status)}
            </div>
          </div>
          <div class="order-items">
            <h4>Items:</h4>
            <ul>
              ${order.items.map(item => `
                <li>${item.name} × ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</li>
              `).join('')}
            </ul>
          </div>
          <div class="order-details">
            <div class="detail">
              <span class="label">Total:</span>
              <span class="value">$${order.total.toFixed(2)}</span>
            </div>
            <div class="detail">
              <span class="label">Delivery:</span>
              <span class="value">${order.estimated_delivery}</span>
            </div>
          </div>
          <div class="order-actions">
            <button class="btn btn-secondary" onclick="OrdersPage.viewOrder('${order.id}')">
              View Details
            </button>
          </div>
        </div>
      `).join('');

    } catch (error) {
      container.innerHTML = '<p class="error">Error loading orders</p>';
    }
  }

  /**
   * Format order status
   */
  static formatStatus(status) {
    const statusMap = {
      'pending': '⏳ Pending',
      'confirmed': '✓ Confirmed',
      'shipped': '🚚 Shipped',
      'delivered': '✓ Delivered',
      'cancelled': '✕ Cancelled'
    };
    return statusMap[status] || status;
  }

  /**
   * View order details
   */
  static viewOrder(orderId) {
    // For now, just show alert
    // In future, could show modal or navigate to detail page
    alert(`Order Details: ${orderId}\n\nView order tracking at the delivery service.`);
  }
}

// Order Confirmation Page
class OrderConfirmation {
  /**
   * Initialize order confirmation page
   */
  static async init() {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('order_id');

    if (!orderId) {
      window.location.href = 'index.html';
      return;
    }

    await this.loadOrder(orderId);
  }

  /**
   * Load order for confirmation display
   */
  static async loadOrder(orderId) {
    const container = document.getElementById('confirmation-content');
    if (!container) return;

    try {
      const order = await API.getOrderById(orderId);

      container.innerHTML = `
        <div class="confirmation-success">
          <div class="success-icon">✓</div>
          <h1>Order Confirmed!</h1>
          <p>Thank you for your purchase. Your order has been received and is being processed.</p>
        </div>

        <div class="confirmation-details">
          <div class="detail-section">
            <h3>Order Number</h3>
            <p class="order-number">${order.id}</p>
          </div>

          <div class="detail-section">
            <h3>Order Date</h3>
            <p>${new Date(order.created_at).toLocaleDateString('en-US', { 
              year: 'numeric', month: 'long', day: 'numeric' 
            })}</p>
          </div>

          <div class="detail-section">
            <h3>Estimated Delivery</h3>
            <p>${order.estimated_delivery}</p>
          </div>
        </div>

        <div class="order-summary">
          <h2>Order Summary</h2>
          
          <div class="summary-items">
            ${order.items.map(item => `
              <div class="summary-item">
                <span>${item.name} × ${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            `).join('')}
          </div>

          <div class="summary-totals">
            <div class="summary-row">
              <span>Subtotal:</span>
              <span>$${order.subtotal.toFixed(2)}</span>
            </div>
            <div class="summary-row">
              <span>Tax:</span>
              <span>$${order.tax.toFixed(2)}</span>
            </div>
            <div class="summary-row">
              <span>Shipping:</span>
              <span>$${order.shipping.toFixed(2)}</span>
            </div>
            <div class="summary-row total">
              <span>Total:</span>
              <span>$${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div class="shipping-address">
          <h2>Shipping Address</h2>
          <div class="address-box">
            <p>${order.shipping.name}</p>
            <p>${order.shipping.address}</p>
            <p>${order.shipping.city}, ${order.shipping.state} ${order.shipping.zip}</p>
            <p>${order.shipping.country}</p>
            <p>📧 ${order.shipping.email}</p>
            <p>📞 ${order.shipping.phone}</p>
          </div>
        </div>

        <div class="confirmation-actions">
          <a href="orders.html" class="btn btn-primary">View All Orders</a>
          <a href="products.html" class="btn btn-secondary">Continue Shopping</a>
        </div>
      `;

    } catch (error) {
      container.innerHTML = `
        <div class="error-message">
          <p>Could not load order details</p>
          <p>${error.message}</p>
          <a href="index.html" class="btn btn-primary">Go Home</a>
        </div>
      `;
    }
  }
}

// Initialize based on page
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('orders-list')) {
    OrdersPage.init();
  }
  if (document.getElementById('confirmation-content')) {
    OrderConfirmation.init();
  }
});
