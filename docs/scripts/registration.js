// QUESTION iv: Visitor must be over 18 years old to register. Calculate using JavaScript.

function isOver18(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear(); 
  const monthDiff = today.getMonth() - birthDate.getMonth(); 
  const dayDiff = today.getDate() - birthDate.getDate();
  return age > 18 || (age === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0))); // Returns age if it greater than 18 by years or by months or by days
}

function isOver18test(){
  const age = 18; 
  const monthDiff = 0; 
  const dayDiff = 0;
  return age > 18 || (age === 18 && ((monthDiff > 0) || (dayDiff > 0))); // Returns age if it greater than 18 by years or by months or by days
}
console.log("test " + isOver18test());



// QUESTION v: trn is unique; must be of length and in the format (000-000-000). **trn is used instead of a username with login.

function isUniqueTRN(trn) {
  const data = JSON.parse(localStorage.getItem("RegistrationData")) || [];
  return !data.some((user) => user.trn === trn);
}

// QUESTION iii & viii: Main function to validate form data and store it in localStorage
document.getElementById("registrationForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission
  const form = document.getElementById("registrationForm");
  // QUESTION ii: all fields are filled (HTML validation). 

  if (!form.checkValidity()) {
    alert("Please fill out all required fields correctly.");
    return;
  } //This function is blocking the validation below

  // Collect user inputs
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const dob = document.getElementById("dob").value;
  const gender = document.getElementById("gender").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const trn = document.getElementById("trn").value;
  const password = document.getElementById("password").value;

  // QUESTION iv: Validate that the user is over 18
  if (!isOver18(dob)) {
    alert("You must be over 18 years old to register.");
    return;
  }

  // QUESTION v: Validate TRN format and uniqueness
  const trnPattern = /^\d{3}-\d{3}-\d{3}$/;
  if (!trnPattern.test(trn)) {
    alert("TRN must be in the format 000-000-000.");
    return;
  }
  if (!isUniqueTRN(trn)) {
    alert("This TRN is already registered. Please use a different TRN.");
    return;
  }

  // QUESTION iii: passwords should be at least 8 characters long.

  if (password.length < 8) {
    alert("Password must be at least 8 characters long.");
    return;
  }

  // QUESTION vi: Create user object and include cart and invoices properties
  const user = {
    firstName,
    lastName,
    dob,
    gender,
    phone,
    email,
    trn,
    password,
    dateOfRegistration: new Date().toISOString(),
    cart: {},
    invoices: []
  };

  // QUESTION vi: Retrieve existing registration data from localStorage, add new user, and save
  let registrationData = JSON.parse(localStorage.getItem("RegistrationData")) || [];
  registrationData.push(user);
  localStorage.setItem("RegistrationData", JSON.stringify(registrationData));

  alert("Registration successful!");
  form.reset(); // Clear form after successful registration
  window.location.replace("login.html");
});

// QUESTION viii: Event listener for cancel button to clear form data
document.querySelector("button[type='reset']").addEventListener("click", function () {
  document.getElementById("registrationForm").reset();
});
  
  // QUESTION viii: Event listener for cancel button to clear form data
  document.querySelector("button[type='reset']").addEventListener("click", function () {
    document.getElementById("registrationForm").reset();
  });
