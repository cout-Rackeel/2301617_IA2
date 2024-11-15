let allInvoices = JSON.parse(localStorage.getItem("AllInvoices")) || [];
let registrationData = JSON.parse(localStorage.getItem("RegistrationData")) || {};  

//calculate age function
function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function ShowUserFrequency(){
  const registrationData = JSON.parse(localStorage.getItem('RegistrationData') || '[]');

  if (registrationData.length === 0) {
    document.getElementById('frequencyCharts').innerHTML = `
      <div class="no-data">
        <h2>No Registration Data Available</h2>
        <p>Please register some users to see the frequency analysis.</p>
      </div>
    `;
    return;
  }

  // Process gender data
  const genderData = registrationData.reduce((acc, user) => {
    const gender = user.gender || 'Not Specified';
    acc[gender] = (acc[gender] || 0) + 1;
    return acc;
  }, {});

  // Process age data
  const ageData = registrationData.reduce((acc, user) => {
    const age = calculateAge(user.dob);
    if (age >= 18 && age <= 25) acc['18-25'] = (acc['18-25'] || 0) + 1;
    else if (age >= 26 && age <= 35) acc['26-35'] = (acc['26-35'] || 0) + 1;
    else if (age >= 36 && age <= 50) acc['36-50'] = (acc['36-50'] || 0) + 1;
    else if (age > 50) acc['50+'] = (acc['50+'] || 0) + 1;
    return acc;
  }, {
    '18-25': 0,
    '26-35': 0,
    '36-50': 0,
    '50+': 0
  });

  // Calculate maximum values for scaling
  const maxGenderValue = Math.max(...Object.values(genderData));
  const maxAgeValue = Math.max(...Object.values(ageData));

  // Create HTML for gender chart
  let genderHTML = `
    <div class="chart-container">
      <h2>User Distribution by Gender</h2>
    <div class="chart">
  `;

  for (const [gender, count] of Object.entries(genderData)) {
    const percentage = (count / maxGenderValue) * 100;
    genderHTML += `
      <div class="bar-group">
          <div class="label">${gender}</div>
          <div class="bar-container">
              <img src="./assets/images/blue.jpeg" class="bar-image" style="width: ${percentage}%" alt="bar">
          </div>
          <span class="count">${count} users</span>
      </div>
    `;
  }

  genderHTML += `
        </div>
    </div>
  `;

  // Create HTML for age chart
  let ageHTML = `
    <div class="chart-container">
      <h2>User Distribution by Age Group</h2>
    <div class="chart">
  `;

  for (const [ageGroup, count] of Object.entries(ageData)) {
    const percentage = (count / maxAgeValue) * 100;
    ageHTML += `
      <div class="bar-group">
        <div class="label">${ageGroup}</div>
        <div class="bar-container">
          <img src="./assets/images/blue.jpeg" class="bar-image" style="width: ${percentage}%" alt="bar">
        </div>
          <span class="count">${count} users</span>
        </div>
    `;
  }

  ageHTML += `
        </div>
      </div>
  `;

  // Update the container
  document.getElementById('frequencyCharts').innerHTML = genderHTML + ageHTML;
}

// Call the function when the page loads
window.onload = ShowUserFrequency;

//function to search for user's invoice from the allInvoices array
function searchInvoices() {
    // Get the TRN value entered by the user
    const searchTrn = document.getElementById('trnInput').value.trim();
  
  
    // Clear previous results
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
  
    // Check if TRN input is not empty
    if (searchTrn) {
        // Filter for matching invoices
        const matchingInvoices = allInvoices.filter(invoice => invoice.trn === searchTrn);
  
        if (matchingInvoices.length > 0) {
            // Display each matching invoice
            matchingInvoices.forEach(invoice => {
              const invoiceDiv = document.createElement('div');
              invoiceDiv.classList.add('invoice-card');

              const productDetails = invoice.products.map(product => `
                <div class="product-item">
                    <p><strong>Product ID:</strong> ${product.product_id}</p>
                    <p><strong>Name:</strong> ${product.name}</p>
                    <p><strong>Copies:</strong> ${product.number_of_copies}</p>
                    <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
                    <p><strong>Description:</strong> ${product.description}</p>
                </div>
            `).join("");

              invoiceDiv.innerHTML = `
                  <h2>Invoice: ${invoice.invoiceNumber}</h2>
                    <p><strong>Date:</strong> ${invoice.date}</p>
                    <div class="invoice-details">
                        <h3>Invoice Details</h3>
                        ${productDetails}

                        <p><strong>Subtotal:</strong> $${invoice.subTotal}</p>
                        <p><strong>Tax:</strong> $${invoice.tax}</p>
                        <p><strong>Grand Total:</strong> $${invoice.grandTotal}</p>
                    </div>
                    <div class="shipping-details">
                        <h3>Shipping Details</h3>
                        <p><strong>Name:</strong> ${invoice.shippingDetails.name}</p>
                        <p><strong>Address:</strong> ${invoice.shippingDetails.address}</p>
                        <p><strong>Amount Paid:</strong> $${invoice.shippingDetails.amountPaid}</p>
                    </div>
              `;
                resultsDiv.appendChild(invoiceDiv);
            });
        } else {
            // Display a message if no invoice is found
            resultsDiv.innerHTML = `<p>No invoice found with TRN: ${searchTrn}</p>`;
        }
    } else {
        // If no TRN is entered, display all invoices
        allInvoices.forEach(invoice => {
            const invoiceDiv = document.createElement('div');
            invoiceDiv.classList.add('invoice-card');

              const productDetails = invoice.products.map(product => `
                <div class="product-item">
                    <p><strong>Product ID:</strong> ${product.product_id}</p>
                    <p><strong>Name:</strong> ${product.name}</p>
                    <p><strong>Copies:</strong> ${product.number_of_copies}</p>
                    <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
                    <p><strong>Description:</strong> ${product.description}</p>
                </div>
            `).join("");

              invoiceDiv.innerHTML = `
                  <h2>Invoice: ${invoice.invoiceNumber}</h2>
                    <p><strong>Date:</strong> ${invoice.date}</p>
                    <div class="invoice-details">
                        <h3>Invoice Details</h3>
                        ${productDetails}
                      
                        <p><strong>Subtotal:</strong> $${invoice.subTotal}</p>
                        <p><strong>Tax:</strong> $${invoice.tax}</p>
                        <p><strong>Grand Total:</strong> $${invoice.grandTotal}</p>
                    </div>
                    <div class="shipping-details">
                        <h3>Shipping Details</h3>
                        <p><strong>Name:</strong> ${invoice.shippingDetails.name}</p>
                        <p><strong>Address:</strong> ${invoice.shippingDetails.address}</p>
                        <p><strong>Amount Paid:</strong> $${invoice.shippingDetails.amountPaid}</p>
                    </div>
            `;
            resultsDiv.appendChild(invoiceDiv);
        });
    }
}
 
//function to search for user's invoice from the user array
function GetUserInvoices() {
  // Get the TRN value entered by the user
  const searchTrn = document.getElementById('userTrn').value.trim();

  // Clear previous results
  const resultsDiv = document.getElementById('userResults');
  resultsDiv.innerHTML = '';

  // Check if TRN input is not empty
  if (searchTrn) {
      // Filter for matching invoices

      const user = registrationData.find(user => user.trn === searchTrn);

      if (user && user.invoices && user.invoices.length > 0) {
    
          // Display each matching invoice
          user.invoices.forEach(invoice => {
            
            const invoiceDiv = document.createElement('div');
            invoiceDiv.classList.add('invoice-card');

            const productDetails = invoice.products.map(product => `
              <div class="product-item">
                  <p><strong>Product ID:</strong> ${product.product_id}</p>
                  <p><strong>Name:</strong> ${product.name}</p>
                  <p><strong>Copies:</strong> ${product.number_of_copies}</p>
                  <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
                  <p><strong>Description:</strong> ${product.description}</p>
              </div>
          `).join("");

            invoiceDiv.innerHTML = `
                <h2>Invoice: ${invoice.invoiceNumber}</h2>
                  <p><strong>Date:</strong> ${invoice.date}</p>
                  <div class="invoice-details">
                      <h3>Invoice Details</h3>
                      ${productDetails}

                      <p><strong>Subtotal:</strong> $${invoice.subTotal}</p>
                      <p><strong>Tax:</strong> $${invoice.tax}</p>
                      <p><strong>Grand Total:</strong> $${invoice.grandTotal}</p>
                  </div>
                  <div class="shipping-details">
                      <h3>Shipping Details</h3>
                      <p><strong>Name:</strong> ${invoice.shippingDetails.name}</p>
                      <p><strong>Address:</strong> ${invoice.shippingDetails.address}</p>
                      <p><strong>Amount Paid:</strong> $${invoice.shippingDetails.amountPaid}</p>
                  </div>
            `;
              resultsDiv.appendChild(invoiceDiv);
          });
      } else {
          // Display a message if no invoice is found
          resultsDiv.innerHTML = `<p>No invoice found with TRN: ${searchTrn}</p>`;
      }
  } else {

      alert("No trn entered!");
  }
}
  