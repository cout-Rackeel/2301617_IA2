const default_password = "password";
const default_username = "user";

// 
let loginForm = document.getElementById("login-form");
let username = document.getElementById("username");
let password = document.getElementById("password");
let error = document.getElementById("error");
let count = 0;



function setError(error, message){
    console.log("Set Error");
    error.innerHTML = message;
    error.classList.add("error");
}

function setSuccess(){
    console.log("Set Success");
    error.innerHTML = "Successful";
    error.classList.remove("error");
}


loginForm.addEventListener('submit', e => {

    let username_val = username.value.trim();
    let password_val = password.value.trim();

    if(count == 2){
        console.log("Error Page");
        window.location.replace("error.html");
    }

    if(password_val.length < 8){
        e.preventDefault();
        setError(error,"Password cannot be less than 8 characters");
    }else if(password_val != default_password || username_val != default_username){
        e.preventDefault();
        count++;
        alert((3 - count) + " More Attempts");
        setError(error,"Invalid Credentials");
    }else{
        localStorage.setItem("user_key", JSON.stringify({"username": username_val , password:password_val}));
    }

});

