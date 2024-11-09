// Selecting Elements
const cartSummary = document.getElementById("cart-summary");
const totalCostEl = document.getElementById("total-cost");
const proceedToPurchaseBtn = document.getElementById("proceed-to-Purchasing and Shipping");
const shippingDetails = document.getElementById("shipping-details");
const confirmCheckoutBtn = document.getElementById("confirm-checkout");
const shippingForm = document.getElementById("shipping-form");

// Input fields for shipping details
const nameInput = document.getElementById("name");
const addressInput = document.getElementById("address");
const amountPaidInput = document.getElementById("amount-paid");

let cart = [];

// Fetch Cart Items from Local Storage
function fetchCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Display Cart Summary
function displayCartSummary() {
    cart = fetchCart();
    let totalCost = 0;

    if (cart.length === 0) {
        cartSummary.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cart.forEach((product) => {
            const item = document.createElement("div");
            item.className = "cart-item";
            item.innerHTML = `
                <p><strong>${product.name}</strong> x ${product.number_of_copies} @ $${product.price.toFixed(2)}</p>
                <p>Total: $${(product.number_of_copies * product.price).toFixed(2)}</p>
            `;
            cartSummary.appendChild(item);
            totalCost += product.number_of_copies * product.price;
        });
    }

    totalCostEl.textContent = totalCost.toFixed(2);
}

// Show Shipping Details Form
function proceedToShipping() {
    shippingDetails.style.display = "block";  // Show the shipping form
}

// Function to save shipping details to localStorage
function saveShippingDetails() {
    const shippingDetails = {
        name: nameInput.value,
        address: addressInput.value,
        amountPaid: amountPaidInput.value
    };

    // Store the shipping details in localStorage as a JSON string
    localStorage.setItem('shippingDetails', JSON.stringify(shippingDetails));
}

// Go Back to Cart Summary
function goBackToCart() {
    shippingDetails.style.display = "none";  // Hide the shipping form
}

// Confirm Checkout
function confirmCheckout() {
    if (shippingForm.checkValidity()) {
        // Save shipping details before confirming
        saveShippingDetails();
        alert("Checkout confirmed. Thank you for your purchase!");
        window.location.href = "invoice.html"; // Redirect to confirmation page
    } else {
        alert("Please fill out all shipping details.");
    }
}

// Event Listeners
proceedToPurchaseBtn.addEventListener("click", proceedToShipping);
confirmCheckoutBtn.addEventListener("click", confirmCheckout);

// Initialize cart summary on page load
displayCartSummary();
