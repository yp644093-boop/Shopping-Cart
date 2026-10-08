// Authentication Utilities
class Auth {
  /**
   * Check if user is logged in
   * @returns {Boolean}
   */
  static isLoggedIn() {
    return localStorage.getItem('auth_token') !== null;
  }

  /**
   * Get current user
   * @returns {Object|null}
   */
  static getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  /**
   * Redirect to login if not authenticated
   */
  static requireLogin() {
    if (!this.isLoggedIn()) {
      window.location.href = 'login.html';
    }
  }

  /**
   * Update navbar based on auth status
   */
  static updateNavbar() {
    const authNav = document.getElementById('auth-nav');
    const userNav = document.getElementById('user-nav');
    
    if (!authNav || !userNav) return;

    if (this.isLoggedIn()) {
      authNav.style.display = 'none';
      userNav.style.display = 'flex';
      
      const user = this.getCurrentUser();
      const userNameEl = document.getElementById('user-name');
      if (userNameEl && user) {
        userNameEl.textContent = user.name;
      }
    } else {
      authNav.style.display = 'flex';
      userNav.style.display = 'none';
    }
  }

  /**
   * Handle logout
   */
  static async logout() {
    if (confirm('Are you sure you want to logout?')) {
      await API.logoutUser();
      this.updateNavbar();
      window.location.href = 'index.html';
    }
  }

  /**
   * Initialize auth
   */
  static init() {
    this.updateNavbar();
  }
}

// Initialize auth when page loads
document.addEventListener('DOMContentLoaded', () => {
  Auth.init();
});
