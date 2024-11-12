// Simulated cart data retrieval (from localStorage)
const cart = JSON.parse(localStorage.getItem('cart')) || []; // Retrieve or initialize cart

document.getElementById('checkout-btn').addEventListener('click', openCartSummary);

//Open Cart Function
function openCartSummary() {
    const cartSummary = document.getElementById('cart-summary');
    cartSummary.innerHTML = ''; // Clear previous items

    let totalCost = 0;
    cart.forEach(item => {
        const itemElement = document.createElement('p');
        itemElement.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartSummary.appendChild(itemElement);
        totalCost += item.price;
    });

    document.getElementById('total-cost').textContent = totalCost.toFixed(2);
    document.getElementById('checkout-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('checkout-modal').style.display = 'none';
}

document.getElementById('proceed-to-Purchasing and Shipping').addEventListener('click', () => {
    // Hide cart summary and show shipping details
    document.getElementById('checkout-modal').style.display = 'none';
    document.getElementById('shipping-details').style.display = 'block';
    
});

//Navigate back to Cart Page Function 
function goBackToCart() {
    document.getElementById('shipping-details').style.display = 'none';
    document.getElementById('checkout-modal').style.display = 'flex';
}

document.getElementById('confirm-checkout').addEventListener('click', () => {
    // Collect shipping details
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const amountPaid = document.getElementById('amount-paid').value;

    if (name && address && amountPaid) {
        const shippingInfo = { name, address, amountPaid };
        localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));
        alert(`Thank you, ${name}! Your order has been confirmed.`); 
        window.location.href = 'invoice.html';
        
        // Clear cart (from localStorage)
        localStorage.removeItem('cart');
        
        // Hide shipping details and reset
        document.getElementById('shipping-details').style.display = 'none';
    } else {
        alert("Please complete all fields before confirming.");
    }
});
