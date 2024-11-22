let allInvoices = JSON.parse(localStorage.getItem("AllInvoices")) || [];
let registrationData = JSON.parse(localStorage.getItem("RegistrationData")) || {};  
let tbody = document.getElementById("tbody");




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
      <h2 class="raleway-900">Gender Distribution Chart</h2>
    <div class="chart">
  `;

  for (const [gender, count] of Object.entries(genderData)) {
    const percentage = (count / maxGenderValue) * 100;
    const maleImg = "./assets/images/blue.jpeg";
    const femaleImg = "./assets/images/pink.jpg";
    genderHTML += `
      <div class="bar-group">
          <div class="label mont-400">${gender}</div>
          <div class="bar-container">
              <img src=${ gender == "Male" ? maleImg : femaleImg} class="bar-image" style="width: ${percentage}%" alt="bar">
          </div>
          <span class="count ${ gender == "Male" ? "male" : "female"} mont-400">${count}</span>
      </div>
    `;

    console.log(count);
    console.log(percentage);
  }

  genderHTML += `
        </div>
    </div>
  `;

  // Create HTML for age chart
  let ageHTML = `
    <div class="chart-container">
      <h2 class="raleway-900">Age Distribution Chart</h2>
    <div class="chart">
  `;

  for (const [ageGroup, count] of Object.entries(ageData)) {
    const percentage = (count / maxAgeValue) * 100;
    ageHTML += `
      <div class="bar-group">
        <div class="label mont-400">${ageGroup}</div>
        <div class="bar-container">
          <img src="./assets/images/blue.jpeg" class="bar-image" style="width: ${percentage}%" alt="bar">
        </div>
          <span class="count mont-400">${count}</span>
        </div>
    `;
  }

  ageHTML += `
        </div>
      </div>
  `;

  // Update the container
  document.getElementById('genderChart').innerHTML = genderHTML;
  document.getElementById("ageChart").innerHTML = ageHTML;
}

function loadMobileInvoices(invoices){
  // Clear previous results
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';
                          // Display each  invoice
                          invoices.forEach(invoice => {
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
                            `
                            resultsDiv.appendChild(invoiceDiv);
                          });     
  
}

// Call the function when the page loads
// window.onload = ShowUserFrequency;

//function to search for user's invoice from the allInvoices array
function searchInvoices(trn=-1) {

  let searchTrn;
  if(trn == -1){
    // Get the TRN value entered by the user
     searchTrn = document.getElementById('trnInput').value.trim();
  }else{
    searchTrn = trn
  }
    // Clear previous results
    const resultsDiv = document.getElementById('results');
    const tbody = document.getElementById("tbody");
    resultsDiv.innerHTML = '';
    tbody.innerHTML = '';
  
    // Check if TRN input is not empty
    if (searchTrn) {
        // Filter for matching invoices
        const matchingInvoices = allInvoices.filter(invoice => invoice.trn === searchTrn);
  
        if (matchingInvoices.length > 0) {
            loadMobileInvoices(matchingInvoices);
            loadTable(matchingInvoices);
        } else {
            // Display a message if no invoice is found
            resultsDiv.innerHTML = `<p>No invoice found with TRN: ${searchTrn}</p>`;
            tbody.innerHTML = `<tr><td colspan="11" style="color:crimson">No invoice found with TRN: ${searchTrn}</td></tr>`;
        }
    } else {
        // If no TRN is entered, display all invoices
        loadMobileInvoices(allInvoices);
        loadTable(allInvoices);
    }
}
 
//function to search for user's invoice from the user array
function GetUserInvoices(trn=-1) {
  if(trn == -1){
    // Get the TRN value entered by the user
     searchTrn = document.getElementById('userTrn').value.trim();
  }else{
    searchTrn = trn
  }

  // Clear previous results
  const resultsDiv = document.getElementById('results');
  const tbody = document.getElementById("tbody");
  resultsDiv.innerHTML = '';
  tbody.innerHTML = '';

  // Check if TRN input is not empty
  if (searchTrn) {
      // Filter for matching invoices
      const user = registrationData.find(user => user.trn === searchTrn);

      if (user && user.invoices && user.invoices.length > 0) {
        // Display each matching invoice
        loadMobileInvoices(user.invoices);
        loadTable(user.invoices);
      } else {
          // Display a message if no invoice is found
          resultsDiv.innerHTML = `<p>No invoice found with TRN: ${searchTrn}</p>`;
          tbody.innerHTML = `<tr><td colspan="11" style="color:crimson">No invoice found with TRN: ${searchTrn}</td></tr>`;
      }
  } else {
      alert("No trn entered!");
      loadTable(allInvoices);
  }
}

function calculateSummary() {
  const registrationData = JSON.parse(localStorage.getItem("RegistrationData") || "[]");
  const allInvoices = JSON.parse(localStorage.getItem("AllInvoices") || "[]");

  // Total number of users
  const totalUsers = parseInt(registrationData.length);

  // Total money generated and total products ordered
  let  totalMoneyGenerated = parseFloat(0);
  let  totalProductsOrdered = parseInt(0);

  allInvoices.forEach(invoice => {
      totalMoneyGenerated += parseFloat(invoice.grandTotal); // Add the grand total of the invoice
      console.log(totalMoneyGenerated);
      invoice.products.forEach(product => {
          totalProductsOrdered += parseInt(product.number_of_copies); // Count the total number of copies of products
      });
  });

  document.getElementById('totUsers').innerHTML = totalUsers;
  document.getElementById('totEarnt').innerHTML = `$${totalMoneyGenerated.toFixed(2)}`;
  document.getElementById('totOrders').innerHTML = totalProductsOrdered;

  // Display the summary in the specified container
  
}

function loadTable(invoices){
  invoices.forEach(invoice => {
    let table_row = document.createElement("tr");
    let prodsLength = invoice.products.length;
    const productDetails = invoice.products.map((product , index) => ` ${product.name}(${product.product_id}) ${index !== (prodsLength - 1) ? ',' : ''} `).join("");
  
      table_row.innerHTML = `
        <td>${invoice.invoiceNumber}</td>
        <td>${invoice.trn}</td>
        <td>${invoice.date}</td>
        <td>${productDetails}</td>
        <td>${invoice.shippingDetails.name}</td>
        <td>${invoice.shippingDetails.address}</td>
        <td>$0.00</td>
        <td>$${invoice.tax}</td>
        <td>$${invoice.subTotal}</td>
        <td>$${invoice.grandTotal}</td>
        <td>$${invoice.shippingDetails.amountPaid}</td>
      `;
      tbody.appendChild(table_row);
      console.log(invoice.invoiceNumber);
  });

 
}


  let tableForm = document.getElementById("table_form");

  tableForm.addEventListener("submit" , (ev) => {
    ev.preventDefault();

    let searchCriteria = document.getElementById("search_options");
    let searchVal = document.getElementById("search_value");
    let trn = searchVal.value.trim()

    if(searchCriteria.value == "allInvoices"){
      searchInvoices(trn)
    }else if(searchCriteria.value == "userInvoices"){
      GetUserInvoices(trn);
    }

  })




// Call when page loads
window.onload = () => {
  ShowUserFrequency();
  calculateSummary();
  loadTable(allInvoices);
};


