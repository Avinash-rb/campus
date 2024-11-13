// Class for Food Items
class FoodItem {
    constructor(name, price, isVeg, image) {
        this.name = name;
        this.price = price;
        this.isVeg = isVeg;
        this.image = image;
    }

    isVegetarian() {
        return this.isVeg ? "Veg" : "Non-Veg";
    }

    createCard() {
        return `
            <div class="meal-card">
                <img src="${this.image}" alt="${this.name}" onerror="this.src='images/default-food.jpg'">
                <h2>${this.name}</h2>
                <p class="price">₹${this.price}</p>
                <p class="veg-status">${this.isVegetarian()}</p>
                <button onclick="addToCart('${this.name}', ${this.price}); Check('${this.name}')">Add</button>
            </div>
        `;
    }
}

// Menu Items Database
const foodItems = [
    new FoodItem("Chapati", 180, true, "images/chapati.jpg"),
    new FoodItem("Jowar Roti", 180, true, "images/Jowar Roti.jpg"),
    new FoodItem("Paneer", 180, true, "images/Paneer.jpg"),
    new FoodItem("Veg Kolhapuri", 180, true, "images/Veg Kolhapuri.jpg"),
    new FoodItem("Baingan Masala", 180, true, "images/Baingan Masala.jpg"),
    new FoodItem("Aloo Curry", 180, true, "images/Aloo Curry.jpg"),
    new FoodItem("Bhindi", 180, true, "images/Bhindi.jpg"),
    new FoodItem("Cauliflower", 180, true, "images/Cauliflower.jpg"),
    new FoodItem("Cabbage", 180, true, "images/Cabbage.jpg"),
];

// Cart functionality
let cart = [];

function addToCart(name, price) {
    cart.push({ name, price });
    updateCartDisplay();
    showNotification(`Selected ${name} for Today!`);
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }

    const cartTotal = document.getElementById('cart-total');
    if (cartTotal) {
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotal.textContent = `₹${total}`;
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Menu initialization and display
function initializeMenu() {
    const mealCardsContainer = document.getElementById("meal_cards");
    if (mealCardsContainer) {
        mealCardsContainer.innerHTML = foodItems.map(item => item.createCard()).join('');
    }
}

// Navigation handlers
function setupNavigation() {
    // Menu button handler
    const menuBtn = document.querySelector('.btn.view-menu');
    if (menuBtn) {
        menuBtn.addEventListener('click', () => window.location.href = "menu.html");
    }

    // Dinner and Lunch button handlers
    const dinnerBtn = document.getElementById('dinner-button');
    const lunchBtn = document.getElementById('lunch-button');

    if (dinnerBtn) {
        dinnerBtn.addEventListener('click', () => window.location.href = "dinner.html");
    }
    if (lunchBtn) {
        lunchBtn.addEventListener('click', () => window.location.href = "menu.html");
    }

    // Subscription button handler
    const subscriptionBtn = document.querySelector('.btn.subscription');
    if (subscriptionBtn) {
        subscriptionBtn.addEventListener('click', () => window.location.href = "SubscriptionPage.html");
    }
}

// Menu filtering functionality
function filterMenu(type) {
    const items = document.querySelectorAll('.meal-card');
    items.forEach(item => {
        const isVeg = item.querySelector('.veg-status').textContent === 'Veg';
        item.style.display = (type === 'all' || 
            (type === 'veg' && isVeg) || 
            (type === 'nonveg' && !isVeg)) ? 'block' : 'none';
    });
}

// Login functionality
function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (validateLogin(username, password)) {
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'menu.html';
    } else {
        showNotification('Invalid username or password');
    }
}

function validateLogin(username, password) {
    return username.length > 0 && password.length > 0;
}

// Subscription handling
function handleSubscription(plan) {
    if (!localStorage.getItem('isLoggedIn')) {
        window.location.href = 'login.html';
        return;
    }
    // Add subscription logic here
    showNotification(`Selected ${plan} plan`);
}

// Check login status
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const loginRequired = document.body.classList.contains('login-required');
    
    if (loginRequired && !isLoggedIn) {
        window.location.href = 'login.html';
    }
}

// Logout functionality
function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeMenu();
    setupNavigation();
    checkLoginStatus();
    updateCartDisplay();

    // Setup login form listener if on login page
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

// Error handling for images
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'images/default-food.jpg';
    }
}, true);

// Search functionality
function searchMenu(query) {
    const items = document.querySelectorAll('.meal-card');
    items.forEach(item => {
        const name = item.querySelector('h2').textContent.toLowerCase();
        item.style.display = name.includes(query.toLowerCase()) ? 'block' : 'none';
    });
}

// Price sorting functionality
function sortByPrice(direction) {
    const container = document.getElementById('meal_cards');
    const items = Array.from(container.getElementsByClassName('meal-card'));
    
    items.sort((a, b) => {
        const priceA = parseInt(a.querySelector('.price').textContent.replace('₹', ''));
        const priceB = parseInt(b.querySelector('.price').textContent.replace('₹', ''));
        return direction === 'asc' ? priceA - priceB : priceB - priceA;
    });

    container.innerHTML = '';
    items.forEach(item => container.appendChild(item));
}


function Check(name) {
    // Retrieve the 'previous' value from localStorage (which tracks remaining orders)
    let retrievedValue = localStorage.getItem('previous');
    let number = parseInt(retrievedValue);

    // Check if 'previous' value exists and is valid
    if (isNaN(number) || number <= 0) {
        alert("You have reached your maximum limit of ordering.");
        return;  // Exit the function if the order limit is reached
    } else {
        // Decrease the number of remaining orders
        number--;

        // Update the 'previous' value in localStorage
        localStorage.setItem("previous", number);

        // Alert the user about the remaining orders
        alert("You can order " + number + " more dishes.");

        // Retrieve the array from localStorage or create an empty array if not found
        let arr = JSON.parse(localStorage.getItem('dishArray')) || [];

        // Check if the dish is already in the array
        let dishFound = false;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].name === name) {
                // If the dish is found, increment its frequency
                arr[i].frequency++;
                dishFound = true;
                break;
            }
        }

        // If the dish is not found, add it to the array with a frequency of 1
        if (!dishFound) {
            arr.push({ name: name, frequency: 1 });
        }

        // Save the updated array back to localStorage
        localStorage.setItem('dishArray', JSON.stringify(arr));

        // Optional: You can log the array to see the updated data
        console.log(arr);
    }
}
