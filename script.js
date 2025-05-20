// Shared functions across all pages

// Check if user is logged in on page load
function checkAuth() {
  const protectedPages = ['account.html', 'audio.html'];
  const currentPage = window.location.pathname.split('/').pop();
  
  if(protectedPages.includes(currentPage)) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if(!user) {
      window.location.href = 'auth.html?type=login&redirect=' + currentPage.split('.')[0];
    }
  }
}

// Initialize page
window.onload = function() {
  checkAuth();
  
  // Update auth buttons visibility
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const authButtons = document.querySelector('.auth-buttons');
  
  if(authButtons) {
    if(user) {
      authButtons.innerHTML = `
        <span>Welcome, ${user.username}</span>
        <button onclick="logout()">Logout</button>
      `;
    }
  }
};

function logout() {
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html';
}