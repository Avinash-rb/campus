// class FoodItem {
//     constructor(name, price, isVeg, image) {
//         this.name = name;
//         this.price = price;
//         this.isVeg = isVeg;
//         this.image = image;
//     }

//     // Method to check if food is vegetarian
//     isVegetarian() {
//         return this.isVeg ? "Vegetarian" : "Non-Vegetarian";
//     }

//     // Method to create card HTML
//     createCard() {
//         return `
//             <div class="meal-card">
//                 <img src="${this.image}" alt="${this.name}" onerror="this.src='images/default-food.jpg'">
//                 <h2>${this.name}</h2>
//                 <p class="price">₹${this.price}</p>
//                 <p class="veg-status">${this.isVegetarian()}</p>
//                 <button onclick="addToCart('${this.name}', ${this.price})">Add</button>
//             </div>
//         `;
//     }
// }
     let email=localStorage.getItem("email");
     let plan=localStorage.getItem("plan");
// // Cart Class to manage selected items
// class Cart {
//     constructor() {
//         this.items = {}; // Store items with name as key and count as value
//     }

//     // Method to add item to cart
//     addItem(name, price) {
//         if (this.items[name]) {
//             this.items[name].count++;
//         } else {
//             this.items[name] = { price: price, count: 1 };
//         }
//         this.saveToFirebase(name);
//     }

//     // Save item count to Firebase for persistence
//     async saveToFirebase(name) {
//         const userId = firebase.auth().currentUser ? firebase.auth().currentUser.uid : null;
//         if (!userId) {
//             alert("Please log in to select a meal.");
//             return;
//         }
//         try {
//             await db.collection("users").doc(userId).collection("cart").doc(name).set({
//                 count: this.items[name].count,
//                 price: this.items[name].price,
//             });
//             console.log(`Updated count of ${name} for user: ${userId}`);
//         } catch (error) {
//             console.error("Error updating cart:", error);
//         }
//     }
// }

// // Create instance of Cart
// const cart = new Cart();

// // Add to Cart function to be called on button click
// function addToCart(name, price) {
//     cart.addItem(name, price);
// }

// // Generate menu items dynamically
// const foodItems = [
//     new FoodItem("Chapati", 180, true, "images/chapati.jpg"),
//     new FoodItem("Jowar Roti", 180, true, "images/Jowar Roti.jpg"),
//     new FoodItem("Paneer", 180, true, "images/Paneer.jpg"),
//     new FoodItem("Veg Kolhapuri", 180, true, "images/Veg Kolhapuri.jpg"),
//     new FoodItem("Baingan Masala", 180, true, "images/Baingan Masala.jpg"),
//     new FoodItem("Aloo Curry", 180, true, "images/Aloo Curry.jpg"),
//     new FoodItem("Bhindi", 180, true, "images/Bhindi.jpg"),
//     new FoodItem("Cauliflower", 180, true, "images/Cauliflower.jpg"),
//     new FoodItem("Cabbage", 180, true, "images/Cabbage.jpg"),
// ];

// // Render food items in the menu
// function renderMenu() {
//     const mealContainer = document.getElementById("meal_cards");
//     mealContainer.innerHTML = ""; // Clear existing items

//     foodItems.forEach(food => {
//         mealContainer.innerHTML += food.createCard();
//     });
// }

// // Call renderMenu on page load
// document.addEventListener("DOMContentLoaded", renderMenu);