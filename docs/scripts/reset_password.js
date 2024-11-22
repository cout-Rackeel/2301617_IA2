const resetForm = document.getElementById("reset-password-form");
const passwordSection = document.getElementById("password-section");
const trnSectElement = document.getElementById("trn_sect");
const resetBtn = document.getElementById("reset_btn");
var registrationData = JSON.parse(localStorage.getItem("RegistrationData")) || [];
var count = 0;


var new_password = document.createElement("div");

new_password.innerHTML = `
    <div class="form-ctrl">
         <label class="raleway-400" for="npassword"> New Password</label>
         <input id="npassword" type="password" name="npassword" required>
    </div>

     <div class="form-ctrl">
         <label class="raleway-400" for="cpassword"> Confirm Password</label>
         <input id="cpassword" type="password" name="cpassword" required>
    </div>

`;


function findUserIndex(trn){
    const userIndex = registrationData.findIndex(userFound => userFound.trn == trn);
    if(userIndex != -1 ){
        passwordSection.appendChild(new_password);
        resetBtn.textContent = "Reset";
        trnSectElement.className = "hide";
        return userIndex;
    }else{
        alert("User Not Found");
    }
}

function validatePassword(password, confirmPassword , userIndex){

    var user = registrationData[userIndex];

     if(password.length < 8 && password.length > 0){
        alert("Password length must be greater than 8 characters");
        return;
    }else{
        if(password == user.password && password.length > 0){
            alert("Password cannot be the same as previous password");
            return;
        }
        if(password != confirmPassword && password.length > 0){
            alert("Password and confirmation must be the same");
            return;
        }
    }

    if(password == confirmPassword && password.length > 0){
        registrationData[userIndex].password = password;
        localStorage.setItem('RegistrationData' , JSON.stringify(registrationData));
        alert("Password Reset Successfully!");
        window.location.replace("login.html");
    }
 
        

}

resetForm.addEventListener("submit", (ev) => {
    // Stops Form from Submitting
    ev.preventDefault();

    //Finds User based on login within local stroage
    var userIndex = findUserIndex(ev.target[0].value);

    //Tests if User found
    if(userIndex != -1 && count < 1){
        alert("User Found");
        count++;
    }

    //Checks to see if both passwords are the same
    validatePassword(ev.target[1].value.trim() , ev.target[2].value.trim() , userIndex);
})

//Resets Form
function clearForm(){
    loginForm.reset();
}



