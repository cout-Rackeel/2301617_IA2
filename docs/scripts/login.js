
var loginForm = document.getElementById("login-form");
var trnInput = document.getElementById("trn");
var passwordInput = document.getElementById("password");
var error = document.getElementById("error");
var login_btn = document.getElementById('login_btn');
var logout_btn = document.getElementById('logout_btn');
var count = 0;

// Retrieve Registration Info
const registrationData = JSON.parse(localStorage.getItem("RegistrationData")) || [];

// Function to display error message
function setError(message) {
    console.log("Set Error");
    error.innerHTML = message;
    error.classList.add("error");
}

// Function to display success message
function setSuccess() {
    console.log("Set Success");
    error.innerHTML = "Login Successful!";
    error.classList.remove("error");
}

// Event listener for form submission
loginForm.addEventListener('submit', e => {
    e.preventDefault(); // Prevent form submission to allow validation

    var trnVal = trnInput.value.trim();
    var passwordVal = passwordInput.value.trim();
    var registeredUser = registrationData.find(user => user.trn == trnVal)

    // Check if the user has exceeded max attempts
    if (count === 2) {
        console.log("Error Page");
        window.location.replace("error.html");
        return;
    }

    // Check if password is at least 8 characters
    if (passwordVal.length < 8) {
        setError("Password cannot be less than 8 characters");
        return;
    }

    // Validate credentials
    if (registeredUser.trn != trnVal || registeredUser.password != passwordVal) {
        count++;
        alert((3 - count) + " Attempt(s) Remaining");
        console.log(registeredUser.trn);
        console.log(registeredUser.password)
        console.log(trnVal);    
        setError("Invalid Credentials");
    } 
    // Successful login
    else {
        setSuccess();
        localStorage.setItem("user_key", JSON.stringify({"trn": trnVal, "password": passwordVal}));
        // Redirect to a new page after successful login
        window.location.replace("products.html");
    }
});
