const card_cont = document.getElementById("card-cont");
const user_key = localStorage.getItem("user_key");

if(!user_key) {
    window.location.replace("../pages/login.html");
}


//Products Array List
var products = [
    { id:"pd001", name:"Beeveil One", price:23.50, img:"../assets/images/beehive-veil-1.webp", description:"Lorem ipsum dolor sit amet consectetur adipisicing elit."},
    { id:"pd002", name:"Beeveil Two", price:33.50, img:"../assets/images/beehive-veil-2.webp", description:"Lorem ipsum dolor sit amet consectetur adipisicing elit."},
    { id:"pd003", name:"Beeveil Three", price:43.50, img:"../assets/images/beehive-veil-3.webp", description:"Lorem ipsum dolor sit amet consectetur adipisicing elit."},
    { id:"pd004", name:"Beehive", price:50.50, img:"../assets/images/beehive.jpg", description:"Lorem ipsum dolor sit amet consectetur adipisicing elit."},
    { id:"pd005", name:"Hive tool V1", price:20.50, img:"../assets/images/hive-tool.jpg", description:"Lorem ipsum dolor sit amet consectetur adipisicing elit."},
    { id:"pd006", name:"Hive tool V2", price:30.50, img:"../assets/images/hive-tool-2.jpg", description:"Lorem ipsum dolor sit amet consectetur adipisicing elit."},
    { id:"pd007", name:"Horizontal Top Beehive", price:120.50, img:"../assets/images/horizontal-top-beehive.jpg", description:"Lorem ipsum dolor sit amet consectetur adipisicing elit."},
    { id:"pd008", name:"Langstroth Beehive", price:150.70, img:"../assets/images/langstroth-beehive.webp", description:"Lorem ipsum dolor sit amet consectetur adipisicing elit."},
    { id:"pd009", name:"Warre Beehive", price:110.70, img:"../assets/images/warre-hive.jpg", description:"Lorem ipsum dolor sit amet consectetur adipisicing elit."},

];

var copies = [];

function addtoCart(product){
    var cart = localStorage.getItem("cart") === null ?  [] : JSON.parse(localStorage.getItem("cart")) ;
    var cart_product = {product_id: product.id , name:product.name, number_of_copies:1, price:product.price, img:product.img, description:product.description};


    
    if(cart.length == 0){
        cart.push(cart_product);
    }else{
        var productFound = cart.findIndex(productFound => productFound.product_id === cart_product.product_id);
        console.log(productFound)
        if(productFound == -1){
            cart.push(cart_product);
        }else{
            cart[productFound].number_of_copies++;
        }
    }
    localStorage.setItem("cart" , JSON.stringify(cart));
    alert("Item Addded to Cart")
}

function removeFromCart(product)
{
    var cart = localStorage.getItem("cart") === null ?  [] : JSON.parse(localStorage.getItem("cart")) ;
    var cart_product = {product_id: product.id , name:product.name, number_of_copies:1, price:product.price, img:product.img, description:product.description};

    
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
    localStorage.setItem("cart" , JSON.stringify(cart));


}

function drawProductCards(product){
        //Draw Each Product to the Screen

    //Create Card
    var card = document.createElement("div");
    card.className = "card mt-1";

    //Create Card Image
    var open_bracket = "('";
    var close_bracket ="')";
    var card_img = document.createElement("div");
    card_img.classList.add("card-img");
    card_img.style.backgroundImage = "url" + open_bracket + product.img + close_bracket;

    //Create Card Title
    var card_title = document.createElement("div");
    card_title.className = "card-flex";

    var title = document.createElement("h3");
    var price = document.createElement("span");

    title.className = "card-title";
    title.textContent = product.name;

    price.className = "card-title";
    price.textContent = "$" + product.price;

    card_title.appendChild(title);
    card_title.appendChild(price);


    //Create Card Description
    var card_description = document.createElement("p");
    card_description.className = "card-desc";
    card_description.textContent = product.description;
    

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
    card.appendChild(card_img);
    card.appendChild(card_title); 
    card.appendChild(card_description); 
    card.appendChild(card_btn); 
    card.appendChild(cancel_btn); 
    card_cont.appendChild(card);  
}

products.forEach( (product, index) => {
    //Assigns Each Product a number of copies
    var copy_numbers = [500,230,300,130.240,500,400,400,400]
    copies.push({product_id: product.id , copies: copy_numbers[index]});
    localStorage.setItem("product_copies", JSON.stringify(copies));
    drawProductCards(product);
});




