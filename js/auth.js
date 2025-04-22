// Simple user storage (in a real app, use a backend)
const users = [
    {
        email: "aaditya@gmail.com",
        password: "1234"
    }
];

// Update login status in the UI
function updateLoginButton() {
    const loginLink = document.getElementById('login-link');
    if (loginLink) {
        if (localStorage.getItem('loggedIn') === 'true') {
            loginLink.textContent = 'Logout';
            loginLink.setAttribute('href', '#');
            loginLink.onclick = function(e) {
                e.preventDefault();
                localStorage.removeItem('loggedIn');
                localStorage.removeItem('userEmail');
                alert('You have been logged out');
                window.location.reload();
            };
        } else {
            loginLink.textContent = 'Login';
            loginLink.setAttribute('href', 'login.html');
            loginLink.onclick = null;
        }
    }
}

// Check login status on page load
document.addEventListener('DOMContentLoaded', () => {
    // Update login/logout button
    updateLoginButton();
    
    // Show logged-in status if on home page or cart page
    const isHomePage = window.location.pathname.endsWith('index.html') || 
                       window.location.pathname.endsWith('/');
    const isCartPage = window.location.pathname.endsWith('cart.html');
    
    if ((isHomePage || isCartPage) && localStorage.getItem('loggedIn') === 'true') {
        const userEmail = localStorage.getItem('userEmail');
        const header = document.querySelector('header');
        
        // If welcome message doesn't exist, create it
        if (!document.getElementById('welcome-message')) {
            const welcomeMsg = document.createElement('div');
            welcomeMsg.id = 'welcome-message';
            welcomeMsg.style.background = '#e8f5e9';
            welcomeMsg.style.padding = '10px';
            welcomeMsg.style.borderRadius = '5px';
            welcomeMsg.style.marginBottom = '15px';
            welcomeMsg.style.textAlign = 'center';
            welcomeMsg.innerHTML = `<p>Welcome back, <strong>${userEmail}</strong>! You are logged in.</p>`;
            
            // Insert after header
            header.parentNode.insertBefore(welcomeMsg, header.nextSibling);
        }
    }
    
    // Handle login form if on login page
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const message = document.getElementById('login-message');
            
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                localStorage.setItem('loggedIn', 'true');
                localStorage.setItem('userEmail', email);
                message.textContent = 'Login successful!';
                message.style.color = 'green';
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                message.textContent = 'Invalid email or password';
                message.style.color = 'red';
            }
        });
    }
    
    // Only redirect if on login page and already logged in
    if (localStorage.getItem('loggedIn') === 'true' && 
        window.location.pathname.endsWith('login.html')) {
        window.location.href = 'index.html';
    }
});