// Checkout Processing
class Checkout {
  /**
   * Initialize checkout page
   */
  static init() {
    this.renderOrderSummary();
    this.setupFormValidation();
  }

  /**
   * Render order summary on checkout page
   */
  static renderOrderSummary() {
    const summaryContainer = document.getElementById('order-summary');
    if (!summaryContainer) return;

    const cart = API.getCart();

    if (cart.length === 0) {
      summaryContainer.innerHTML = '<p>Your cart is empty</p>';
      return;
    }

    const itemsHTML = cart.map(item => `
      <div class="summary-item">
        <span>${item.name} × ${item.quantity}</span>
        <span>$${(item.price * item.quantity).toFixed(2)}</span>
      </div>
    `).join('');

    const subtotal = API.getCartTotal();
    const tax = subtotal * 0.1;
    const shipping = 10;
    const total = subtotal + tax + shipping;

    summaryContainer.innerHTML = `
      <div class="summary-items">
        ${itemsHTML}
      </div>
      <div class="summary-totals">
        <div class="summary-row">
          <span>Subtotal:</span>
          <span>$${subtotal.toFixed(2)}</span>
        </div>
        <div class="summary-row">
          <span>Tax (10%):</span>
          <span>$${tax.toFixed(2)}</span>
        </div>
        <div class="summary-row">
          <span>Shipping:</span>
          <span>$${shipping.toFixed(2)}</span>
        </div>
        <div class="summary-row total">
          <span>Total:</span>
          <span>$${total.toFixed(2)}</span>
        </div>
      </div>
    `;
  }

  /**
   * Setup form validation and submission
   */
  static setupFormValidation() {
    const form = document.getElementById('checkout-form');
    if (!form) return;

    form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  /**
   * Handle form submission
   */
  static async handleSubmit(e) {
    e.preventDefault();

    // Check authentication
    if (!Auth.isLoggedIn()) {
      alert('Please login first to complete purchase');
      window.location.href = 'login.html';
      return;
    }

    // Get form data
    const formData = new FormData(e.target);
    
    // Validate form
    if (!this.validateForm(formData)) {
      return;
    }

    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Processing...';

    try {
      const user = Auth.getCurrentUser();
      const cart = API.getCart();
      const subtotal = API.getCartTotal();
      const tax = subtotal * 0.1;
      const shipping = 10;

      const orderData = {
        user_id: user.id,
        items: cart,
        shipping: {
          name: formData.get('shipping_name'),
          email: formData.get('shipping_email'),
          phone: formData.get('shipping_phone'),
          address: formData.get('shipping_address'),
          city: formData.get('shipping_city'),
          state: formData.get('shipping_state'),
          zip: formData.get('shipping_zip'),
          country: formData.get('shipping_country')
        },
        billing: {
          same_as_shipping: formData.get('same_address') === 'on',
          name: formData.get('billing_name') || formData.get('shipping_name'),
          address: formData.get('billing_address') || formData.get('shipping_address'),
          city: formData.get('billing_city') || formData.get('shipping_city'),
          state: formData.get('billing_state') || formData.get('shipping_state'),
          zip: formData.get('billing_zip') || formData.get('shipping_zip'),
          country: formData.get('billing_country') || formData.get('shipping_country')
        },
        payment: {
          method: formData.get('payment_method'),
          last_four: formData.get('card_number').slice(-4)
        },
        subtotal: subtotal,
        tax: tax,
        shipping: shipping,
        total: subtotal + tax + shipping
      };

      // Create order
      const order = await API.createOrder(orderData);

      // Clear cart
      API.clearCart();
      CartManager.updateCartBadge();

      // Redirect to confirmation
      window.location.href = `order-confirmation.html?order_id=${order.id}`;

    } catch (error) {
      alert('Error processing order: ' + error.message);
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  }

  /**
   * Validate form fields
   */
  static validateForm(formData) {
    const errors = [];

    // Shipping validation
    if (!formData.get('shipping_name')) errors.push('Name is required');
    if (!formData.get('shipping_email') || !this.isValidEmail(formData.get('shipping_email'))) {
      errors.push('Valid email is required');
    }
    if (!formData.get('shipping_phone')) errors.push('Phone is required');
    if (!formData.get('shipping_address')) errors.push('Address is required');
    if (!formData.get('shipping_city')) errors.push('City is required');
    if (!formData.get('shipping_state')) errors.push('State is required');
    if (!formData.get('shipping_zip')) errors.push('ZIP code is required');

    // Payment validation
    if (!formData.get('payment_method')) errors.push('Payment method is required');
    if (!this.isValidCardNumber(formData.get('card_number'))) {
      errors.push('Valid card number is required');
    }
    if (!this.isValidExpiry(formData.get('card_expiry'))) {
      errors.push('Valid expiry date is required');
    }
    if (!formData.get('card_cvv') || formData.get('card_cvv').length < 3) {
      errors.push('Valid CVV is required');
    }

    if (errors.length > 0) {
      alert('Please fix the following errors:\n\n' + errors.join('\n'));
      return false;
    }

    return true;
  }

  /**
   * Validate email
   */
  static isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /**
   * Validate card number (Luhn algorithm)
   */
  static isValidCardNumber(cardNumber) {
    const cleaned = cardNumber.replace(/\s/g, '');
    return /^\d{13,19}$/.test(cleaned) && this.luhnCheck(cleaned);
  }

  /**
   * Luhn algorithm check
   */
  static luhnCheck(num) {
    let sum = 0;
    let isEven = false;
    for (let i = num.length - 1; i >= 0; i--) {
      let digit = parseInt(num.charAt(i), 10);
      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      isEven = !isEven;
    }
    return sum % 10 === 0;
  }

  /**
   * Validate expiry date
   */
  static isValidExpiry(expiry) {
    return /^\d{2}\/\d{2}$/.test(expiry);
  }

  /**
   * Toggle billing address
   */
  static toggleBillingAddress() {
    const billingSection = document.getElementById('billing-address-section');
    const checkbox = document.getElementById('same_address');
    
    if (billingSection && checkbox) {
      billingSection.style.display = checkbox.checked ? 'none' : 'block';
    }
  }
}

// Initialize checkout
document.addEventListener('DOMContentLoaded', () => {
  Checkout.init();
});
