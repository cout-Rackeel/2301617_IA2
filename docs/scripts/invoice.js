// Ensure DOM is fully loaded before adding event listeners
document.addEventListener("DOMContentLoaded", function () {
    // Login Validation
    const user = JSON.parse(localStorage.getItem("user_key"));
    if (!user) {
        window.location.replace("./login.html");
    }

    // Selecting the DOM elements
    const invoiceNumberDate = document.getElementById('invoice-number-Date');
    const trnElement = document.getElementById('trn');
    const shippingName = document.getElementById('shipping-name');
    const shippingAddress = document.getElementById('shipping-address');
    const shippingAmountPaid = document.getElementById('shipping-amount-paid');
    const summaryCont = document.getElementById('summary-cont');
    const sendEmailBtn = document.getElementById('send-email-btn');

    // Initialize the allInvoices array from localStorage or create an empty array
    let allInvoices = JSON.parse(localStorage.getItem("AllInvoices")) || [];

    // Fetch TRN and Registration Data from localStorage
    const registrationData = JSON.parse(localStorage.getItem("RegistrationData")) || [];
    let registeredUser = registrationData.find(user => user.trn);

    // Log registrationData to check for shipping details
    console.log("Registration Data:", registrationData);

    // Set the TRN in the invoice if available
    if (registeredUser) {
        trnElement.textContent = registeredUser.trn;
    } else {
        trnElement.textContent = "N/A"; // Default value if no TRN is found
    }

    // Generate unique invoice number
    function generateInvoiceNumber() {
        const date = new Date();
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        const randomNumber = Math.floor(Math.random() * 10000);
        return `${formattedDate}-   `;
    }

    // Fetch Cart Items from Registration Data
    function fetchCart() {
        const userIndex = registrationData.findIndex(userFound => userFound.trn === registeredUser.trn);
        return userIndex !== -1 ? registrationData[userIndex].cart?.products || [] : [];
    }

    // Function to calculate totals
    function calculateTotals(cart) {
        let subtotal = 0;
        let tax = 0;
        let total = 0;

        cart.forEach(product => {
            let itemTotal = product.number_of_copies * product.price;
            subtotal += itemTotal;
        });

        tax = 0.16 * subtotal; // 16% tax
        total = subtotal + tax;

        return { subtotal, tax, total };
    }

    // Store invoice in allInvoices array in localStorage
    function storeInvoice(invoice) {
        allInvoices.push(invoice);
        localStorage.setItem("AllInvoices", JSON.stringify(allInvoices)); // Store updated invoice list
    }

    // Function to handle sending invoice to email
    function sendInvoiceToEmail() {
        console.log("Button clicked and function triggered");

        // Ensure that the emailNotification element exists
        const emailNotification = document.getElementById("email-notification");

        if (!emailNotification) {
            console.error("Email notification element not found!");
            return;
        }
        else{
        // Show the email notification message
        emailNotification.style.display = 'block';
        // Hide the email notification message after 5 seconds
        setTimeout(() => {
            emailNotification.style.display = 'none';
        }, 5000);  // The message will hide after 5 seconds
      
        // Show an alert to the user
        alert("The invoice has been sent to your email!");

        // Clear cart and redirect to the home page
        window.location.href = "index.html"; // Redirect to index page
    }
    }
    // Add event listener for the 'Send Invoice to Email' button
    sendEmailBtn.addEventListener("click", sendInvoiceToEmail);

    // Function to generate a unique invoice and store it in allInvoices
    function createInvoice(cart, subTotal, shippingInfo) {
        const invoiceNumber = generateInvoiceNumber();
        const tax = subTotal * 0.16;
        const grandTotal = subTotal + tax;

        let registrationData = JSON.parse(localStorage.getItem("RegistrationData")) || [];

        // Create an invoice object
        var invoice = {
            company_name : "The Crochet Cove",
            trn : user.trn,
            invoiceNumber: invoiceNumber,
            date: new Date().toLocaleDateString(),
            products: cart,
            subTotal: subTotal.toFixed(2),
            tax: tax.toFixed(2),
            grandTotal: grandTotal.toFixed(2),
            shippingDetails: {
                name: shippingInfo.name || "N/A",
                address: shippingInfo.address || "N/A",
                amountPaid: parseFloat(shippingInfo.amountPaid).toFixed(2) || "0.00"
            }
        };


        // Append the invoice to the user's invoice array in registrationData
        const userIndex = registrationData.findIndex(userFound => userFound.trn == user.trn);

        if (userIndex != -1) {
            // Initialize invoices array if it doesn't exist
            registrationData[userIndex].invoices = registrationData[userIndex].invoices || [];
            registrationData[userIndex].invoices.push(invoice); // Add the invoice to the user’s invoices array
            console.log(user.trn);
        } else {
            console.error("User not found in registrationData.");
        }

        // Add the new invoice to the allInvoices array
        allInvoices.push(invoice);
        console.log(allInvoices);

        // Save the updated allInvoices array to localStorage
        localStorage.setItem("AllInvoices", JSON.stringify(allInvoices));

        //save the updated person's invoice
        localStorage.setItem("RegistrationData",JSON.stringify(registrationData));

        return invoice;
    }

   // Function to populate the invoice with the necessary details
   function displayInvoice() {
    // Fetch cart items from Registration Data
    const cart = fetchCart();

    // If no items in cart, display a message
    if (cart.length === 0) {
        summaryCont.innerHTML = "<p>No items in cart.</p>";
        sendEmailBtn.disabled = true; // Disable the button if no items in cart
        return; // Stop execution if no items in cart
    }

    // Set company name and generate the invoice number
    invoiceNumberDate.textContent = generateInvoiceNumber(); // Generate and display invoice number

    // Fetch shipping details from localStorage
    const shippingDetails = JSON.parse(localStorage.getItem("shippingDetails")) || {};

    // Display shipping details in the invoice
    shippingName.textContent = shippingDetails.name || "N/A";
    shippingAddress.textContent = shippingDetails.address || "N/A";
    shippingAmountPaid.textContent = shippingDetails.amountPaid || "0.00";

    // Calculate totals
    let { subtotal, tax, total } = calculateTotals(cart);

    // Purchased Items Section
    const itemsTitle = document.createElement("h3");
    itemsTitle.textContent = "Purchased Items";
    itemsTitle.style.textAlign = 'center';
    summaryCont.appendChild(itemsTitle);

    // Loop through cart items and display them
    cart.forEach(product => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("invoice-item");
        itemDiv.innerHTML = `
            <p><strong>${product.name}</strong> (Quantity: ${product.number_of_copies})</p>
            <p>Price: $${product.price.toFixed(2)} each</p>
            <p><strong>Total: $${(product.number_of_copies * product.price).toFixed(2)}</strong></p>
        `;
        itemDiv.style.textAlign = 'center';
        itemDiv.style.margin = '0 auto'; 
        itemDiv.style.maxWidth = '80%'; 
        summaryCont.appendChild(itemDiv);
    });

    // Display subtotal, tax, and total
    const totalsDiv = document.createElement("div");
    totalsDiv.classList.add("totals");
    totalsDiv.innerHTML = `
        <p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>
        <p><strong>Taxes (16%):</strong> $${tax.toFixed(2)}</p>
        <p><strong>Total Cost:</strong> $${total.toFixed(2)}</p>
    `;
    totalsDiv.style.textAlign = 'center';
    totalsDiv.style.margin = '0 auto'; 
    totalsDiv.style.maxWidth = '80%'; 

    summaryCont.appendChild(totalsDiv);

    // Optionally, create an invoice entry
    createInvoice(cart, subtotal, shippingDetails);
    }
    
    // Call the function to display the invoice
    displayInvoice();

});





