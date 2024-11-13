// subscription.js

document.addEventListener("DOMContentLoaded", () => {
    // Class for Subscription Plans
    class SubscriptionPlan {
        constructor(name, price, bhajiLimit) {
            this.name = name;
            this.price = price;
            this.bhajiLimit = bhajiLimit;
        }

        savePlanToFirestore() {
            const user = firebase.auth().currentUser;
            if (user) {
                // Save the subscription selection to Firestore for the logged-in user
                firebase.firestore().collection("subscriptions").doc(user.uid).set({
                    planName: this.name,
                    price: this.price,
                    bhajiLimit: this.bhajiLimit,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                }).then(() => {
                    alert(`${this.name} plan selected successfully!`);
                }).catch((error) => {
                    console.error("Error saving subscription: ", error);
                    alert("Failed to save the subscription.");
                });
            } else {
                alert("Please log in to select a plan.");
            }
        }
    }

    // Function to select and save the plan
    window.selectPlan = (planName) => {
        let selectedPlan;
        localStorage.setItem("plan", planName);
        switch (planName) {
            case "platinum":
                selectedPlan = new SubscriptionPlan("Platinum", 5000, 3);
                break;
            case "gold":
                selectedPlan = new SubscriptionPlan("Gold", 4500, 2);
                break;
            case "silver":
                selectedPlan = new SubscriptionPlan("Silver", 4100, 1);
                break;
            default:
                console.error("Invalid plan name");
                return;
        }

        // Save the selected plan to Firestore
        selectedPlan.savePlanToFirestore();
    };
});
