const card_cont = document.getElementById("card-cont");
const user = JSON.parse(localStorage.getItem("user_key"));
var registrationData = JSON.parse(localStorage.getItem("RegistrationData")) || [];

if(!user) {
    window.location.replace("./login.html");
}

function fetchProducts(){
    //Products Array List
    var allProducts = localStorage.getItem("AllProducts") === null ?  [] : JSON.parse(localStorage.getItem("AllProducts"));
    if(allProducts.length){
        console.log("Products Retrieved");
        return allProducts
    }else{
        var productsArray = [
            { id:"pd001", name:"Baby Halter Crop Top and Shorts", price:7150.00, img:"./assets/jev/croptopshorts.jpg", description:"7 ipsum dolor sit amet consectetur adipisicing elit.", copies:100, discount:0},
            { id:"pd002", name:"Beeveil Two", price:33.50, img:"./assets/images/beehive-veil-2.webp", description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.", copies:100, discount:0},
            { id:"pd003", name:"Beeveil Three", price:43.50, img:"./assets/images/beehive-veil-3.webp", description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.", copies:100, discount:0},
            { id:"pd004", name:"Beehive", price:50.50, img:"./assets/images/beehive.jpg", description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.", copies:100, discount:0},
            { id:"pd005", name:"Hive tool V1", price:20.50, img:"./assets/images/hive-tool.jpg", description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.", copies:100, discount:0},
            { id:"pd006", name:"Hive tool V2", price:30.50, img:"./assets/images/hive-tool-2.jpg", description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.", copies:100, discount:0},
            { id:"pd007", name:"Horizontal Top Beehive", price:120.50, img:"./assets/images/horizontal-top-beehive.jpg", description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.", copies:100, discount:0},
            { id:"pd008", name:"Langstroth Beehive", price:150.70, img:"./assets/images/langstroth-beehive.webp", description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.", copies:100, discount:0},
            { id:"pd009", name:"Warre Beehive", price:110.70, img:"./assets/images/warre-hive.jpg", description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.", copies:100, discount:0},
        ];
        localStorage.setItem("AllProducts" ,  JSON.stringify(productsArray));
        allProducts = localStorage.getItem("AllProducts");
        console.log("Products Set");
        return allProducts;
    }
}


var allProducts = fetchProducts();


function addtoCart(product){
    const userIndex = registrationData.findIndex(userFound => userFound.trn == user.trn);
    var cart = registrationData[userIndex].cart.products || [];
    var cart_product = {product_id: product.id , name:product.name, number_of_copies:1, price:product.price, img:product.img, description:product.description , discount:0};


    
    if(cart.length == 0){
        cart.push(cart_product);
    }else{
        var productFound = cart.findIndex(productFound => productFound.product_id === cart_product.product_id);
        //console.log(productFound)
        if(productFound == -1){
            cart.push(cart_product);
        }else{
            cart[productFound].number_of_copies++;
        }
    }
    registrationData[userIndex].cart.products  = cart;
    localStorage.setItem("RegistrationData" , JSON.stringify(registrationData));
    alert("Item Addded to Cart")
}

function removeFromCart(product)
{
    const userIndex = registrationData.findIndex(userFound => userFound.trn == user.trn);
    var cart = registrationData[userIndex].cart.products || [];
    var cart_product = {product_id: product.id , name:product.name, number_of_copies:1, price:product.price, img:product.img, description:product.description , discount:0};

    
    if(cart.length == 0){
        alert("Nothing is in cart to remove");
    }else{
        var productFound = cart.findIndex(productFound => productFound.product_id === cart_product.product_id);
        console.log(productFound)
        if(productFound == -1){
            alert("Nothing is in cart to remove");
        }else if(productFound != -1 &&  cart[productFound].number_of_copies > 1){
            cart[productFound].number_of_copies -= 1;
            alert("Cart Update");
        }else if(productFound != -1 &&  cart[productFound].number_of_copies == 1){
            cart.splice(productFound,1);
            alert("Cart Updated");
        }
    }
    registrationData[userIndex].cart.products  = cart;
    localStorage.setItem("RegistrationData" , JSON.stringify(registrationData));
}

function drawProductCards(product){
        //Draw Each Product to the Screen

    //Create Card
    var card = document.createElement("div");
    card.className = "card mt-1";
    card.innerHTML = `
        <div class="card-img" style="background-image: url('${product.img}');"></div>
         <div class="card-flex mt-1">
            <h3 class="card-title">${product.name}</h3>
            <span class="mont-600">$${product.price.toFixed(2)}</span>
         </div>
         <p class="card-desc">${product.description}</p>
    `;
    
    //Create Add to Cart Button
    var card_btn = document.createElement("button");
    card_btn.setAttribute('id', 'add_product_btn');
    card_btn.textContent = "Add to Cart";

    card_btn.addEventListener("click" ,(ev) => {
       addtoCart(product);
    });

      //Create Cancel Button
      var cancel_btn = document.createElement("button");
      cancel_btn.setAttribute('id', 'cancel_product_btn');
      cancel_btn.textContent = "Cancel";
  
      cancel_btn.addEventListener("click" ,(ev) => {
         removeFromCart(product);
      });


    //Create Product Card
    card.appendChild(card_btn); 
    card.appendChild(cancel_btn); 
    card_cont.appendChild(card);  
}

allProducts.forEach( (product, index) => {   
    drawProductCards(product);
});




