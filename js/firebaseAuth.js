// Firebase configuration (replace with your actual config)
const firebaseConfig = {
    apiKey: "AIzaSyB_p2_6U4RKE-pez3RlXlWBazogfBn-axs",
    authDomain: "campus-crave-web-app.firebaseapp.com",
    projectId: "campus-crave-web-app",
    storageBucket: "campus-crave-web-app.appspot.com",
    messagingSenderId: "481215343958",
    appId: "1:481215343958:web:6e83c6a0136adf9272faf7"
  };
  
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
const auth = firebase.auth();

// Firebase Realtime Database reference
const dbRealtime = firebase.database();

function signUpUser(event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value;
    const contact = document.getElementById("contact").value;

    // Check if email already exists
    auth.fetchSignInMethodsForEmail(email)
        .then((methods) => {
            if (methods.length > 0) {
                // If the email is already in use, show an alert
                alert("Email is already in use. Please try logging in.");
            } else {
                // If email is not in use, create the user
                auth.createUserWithEmailAndPassword(email, password)
                    .then(userCredential => {
                        const user = userCredential.user;

                        // Save the user data to Firestore
                        db.collection("users").doc(user.uid).set({
                            name: name,
                            contact: contact,
                            email: email,
                            createdAt: firebase.firestore.FieldValue.serverTimestamp()
                        })
                        .then(() => {
                            console.log("User data saved to Firestore");

                            // Save the user data to Realtime Database
                            dbRealtime.ref('users/' + user.uid).set({
                                name: name,
                                contact: contact,
                                email: email,
                                preferences: {}, // Additional fields you may add
                                createdAt: new Date().toISOString() // Initial timestamp
                            })
                            .then(() => {
                                console.log("User data saved to Realtime Database");

                                // Redirect to login page after successful sign-up
                                window.location.href = "login.html";
                            })
                            .catch((error) => {
                                console.error("Error saving user data to Realtime Database: ", error);
                            });
                        })
                        .catch((error) => {
                            console.error("Error saving user data to Firestore: ", error);
                        });
                    })
                    .catch((error) => {
                        console.error("Error creating user: ", error.message);
                    });
            }
        })
        .catch((error) => {
            console.error("Error checking email existence: ", error.message);
        });
}


// Wait until the DOM is fully loaded to attach the event listener
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("signup-form").addEventListener("submit", signUpUser);
});

// Login function
function loginUser(email, password) {
    console.log("Attempting to log in with:", email, password); 
    return auth.signInWithEmailAndPassword(email, password)
    
        .then((userCredential) => {
            console.log("Login successful:", userCredential.user);
            
            // Store the user ID in localStorage
            localStorage.setItem("authUserId", userCredential.user.uid);
            localStorage.setItem("email", email);

            return userCredential.user;
        })
        .catch((error) => {
            console.error("Login error:", error.message);
            throw error;
        });
}


// Logout function
function logoutUser() {
    return auth.signOut()
        .then(() => {
            console.log("User logged out successfully.");
        })
        .catch((error) => {
            console.error("Logout error:", error.message);
            throw error;
        });
}
