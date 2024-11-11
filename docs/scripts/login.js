
let loginForm = document.getElementById("login-form");
let trnInput = document.getElementById("trn");
let passwordInput = document.getElementById("password");
let error = document.getElementById("error");
let count = 0;

// Retrieve Registration Info
const registrationData = JSON.parse(localStorage.getItem("RegistrationData")) || [];
let registeredUser = registrationData.find(user => user.trn && user.password);

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

    let trnVal = trnInput.value.trim();
    let passwordVal = passwordInput.value.trim();

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
    if (!registeredUser || registeredUser.trn !== trnVal || registeredUser.password !== passwordVal) {
        count++;
        alert((3 - count) + " Attempt(s) Remaining");
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
