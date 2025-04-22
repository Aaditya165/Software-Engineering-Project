// Product data
const products = [
    {
        id: 1,
        name: "Funky shirt",
        price: 800,
        image: "img/products/f1.jpg"
    },
    {
        id: 2,
        name: "Big floral pattern shirt",
        price: 1200,
        image: "img/products/f2.jpg"
    },
    {
        id: 3,
        name: "Floral shirt",
        price: 1000,
        image: "img/products/f3.jpg"
    },
    {
        id: 4,
        name: "Cherry blossom shirt",
        price: 1100,
        image: "img/products/f4.jpg"
    },
    {
        id: 5,
        name: "Cat print top",
        price: 2000,
        image: "img/products/f8.jpg"
    },
    {
        id: 6,
        name: "Purple floral shirt",
        price: 1200,
        image: "img/products/f5.jpg"
    },
    {
        id: 7,
        name: "Corduroy shirt",
        price: 1200,
        image: "img/products/f6.jpg"
    },
    {
        id: 8,
        name: "Loose pant",
        price: 1200,
        image: "img/products/f7.jpg"
    },
    {
        id: 9,
        name: "Half pant",
        price: 1200,
        image: "img/products/n6.jpg"
    },
    {
        id: 10,
        name: "Checkered shirt full",
        price: 1200,
        image: "img/products/n2.jpg"
    },
    {
        id: 11,
        name: "White shirt",
        price: 1200,
        image: "img/products/n3.jpg"
    },
    {
        id: 12,
        name: "Printed shirt",
        price: 1800,
        image: "img/products/n4.jpg"
    }
];

// Initialize cart with empty array if null
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Clear any corrupted cart data
function validateCart() {
    if (!Array.isArray(cart)) {
        cart = [];
        saveCart();
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();
    // Show confirmation to user
    alert(`Added ${product.name} to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCartItems();
}

function incrementQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += 1;
        saveCart();
        renderCartItems();
    }
}

function decrementQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            // If quantity would become 0, remove the item
            return removeFromCart(productId);
        }
        saveCart();
        renderCartItems();
    }
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + (item.quantity || 0), 0);
    document.querySelectorAll('#cart-count').forEach(el => {
        el.textContent = count;
    });
}

function updateLoginButton() {
    const loginLinks = document.querySelectorAll('#login-link');
    if (localStorage.getItem('loggedIn') === 'true') {
        loginLinks.forEach(link => {
            link.textContent = 'Logout';
            link.setAttribute('href', '#');
            link.onclick = function(e) {
                e.preventDefault();
                localStorage.removeItem('loggedIn');
                localStorage.removeItem('userEmail');
                alert('You have been logged out');
                window.location.reload();
            };
        });
    } else {
        loginLinks.forEach(link => {
            link.textContent = 'Login';
            link.setAttribute('href', 'login.html');
            link.onclick = null;
        });
    }
}

function renderProducts() {
    const productsContainer = document.getElementById('products');
    if (productsContainer) {
        productsContainer.innerHTML = products.map(product => `
            <div class="product">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Rs ${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `).join('');
        
        // Add event listeners after rendering
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const productId = parseInt(button.getAttribute('data-id'));
                addToCart(productId);
            });
        });
    }
}

function renderCartItems() {
    const cartContainer = document.getElementById('cart-items');
    const totalContainer = document.getElementById('total-price');
    const deliverySection = document.getElementById('delivery-details-section');
    
    if (cartContainer && totalContainer) {
        if (cart.length === 0) {
            cartContainer.innerHTML = '<p>Your cart is empty</p>';
            totalContainer.textContent = '0';
            
            // Hide delivery details if cart is empty
            if (deliverySection) {
                deliverySection.style.display = 'none';
            }
        } else {
            cartContainer.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" width="50">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>Rs ${item.price.toFixed(2)}</p>
                    </div>
                    <div class="quantity-controls">
                        <button class="quantity-btn decrement" data-id="${item.id}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn increment" data-id="${item.id}">+</button>
                    </div>
                    <span class="item-total">Rs ${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                </div>
            `).join('');

            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            totalContainer.textContent = total.toFixed(2);
            
            // Show delivery details if items in cart
            if (deliverySection) {
                deliverySection.style.display = 'block';
            }
            
            // Add event listeners for remove buttons
            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const productId = parseInt(button.getAttribute('data-id'));
                    removeFromCart(productId);
                });
            });
            
            // Add event listeners for quantity buttons
            document.querySelectorAll('.increment').forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const productId = parseInt(button.getAttribute('data-id'));
                    incrementQuantity(productId);
                });
            });
            
            document.querySelectorAll('.decrement').forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const productId = parseInt(button.getAttribute('data-id'));
                    decrementQuantity(productId);
                });
            });
        }
    }
}

// Add welcome message if logged in
function showWelcomeMessage() {
    if (localStorage.getItem('loggedIn') === 'true') {
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
}

// Handle delivery form submission
function setupDeliveryForm() {
    const deliveryForm = document.getElementById('delivery-form');
    if (deliveryForm) {
        deliveryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (localStorage.getItem('loggedIn') !== 'true') {
                alert('Please login to checkout');
                window.location.href = 'login.html';
                return;
            }
            
            if (cart.length === 0) {
                alert('Your cart is empty');
                return;
            }
            
            // Get form data
            const formData = {
                fullName: document.getElementById('full-name').value,
                address: document.getElementById('address').value,
                phone: document.getElementById('phone').value,
                instructions: document.getElementById('delivery-instructions').value,
                items: cart,
                total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
            };
            
            // In a real app, you would send this data to a server
            console.log('Order submitted:', formData);
            
            // Show order confirmation
            alert('Thank you for your order! Your items will be delivered soon.');
            
            // Clear cart after successful order
            cart = [];
            saveCart();
            renderCartItems();
            
            // Reset form
            deliveryForm.reset();
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    validateCart(); // Clean any corrupted data
    renderProducts();
    renderCartItems();
    updateCartCount();
    updateLoginButton(); // Update login/logout button state
    showWelcomeMessage(); // Show welcome message if logged in
    setupDeliveryForm(); // Set up delivery form handling
});