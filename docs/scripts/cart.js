const user = JSON.parse(localStorage.getItem("user_key"));
var registrationData = JSON.parse(localStorage.getItem("RegistrationData")) || [];
const userIndex = registrationData.findIndex(userFound => userFound.trn == user.trn);
const checkoutBtn = document.getElementById("checkout_btn");

// Tests if user is logged in
if(!user) {
    window.location.replace("./login.html");
}


var cart;
var subTotal = 0;
var totalDiscount = 0;
var summary_cont = document.getElementById("summary-cont");
var div_section_one_empty = document.createElement("div");
var products_section_empty = document.createElement("div");



function fetchCart(){
  var cart = registrationData[userIndex].cart.products || [];
  return cart;
}

cart = fetchCart();

var products_cont = document.getElementById("products-cont");
var cancel_cart_btn = document.getElementById("cancel_cart_btn");


function addtoCart(product , value){
    product.number_of_copies = value;
    registrationData[userIndex].cart.products = cart;
    localStorage.setItem("RegistrationData" , JSON.stringify(registrationData));
    window.location.reload();
}

function removeFromCart(product, index)
{
  var response = window.confirm("Are you sure you want to empty your cart?");
    if(response){
      cart.splice(index , 1);
      registrationData[userIndex].cart.products  = cart;
      localStorage.setItem("RegistrationData" , JSON.stringify(registrationData));
      alert("Item taken from Cart")
      window.location.reload();
    }
}

function drawReceiptProducts(product , index){
  if(cart.length){
    //Create Card
    var card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
    <div class="card-img" style="background-image: url('${product.img}');"></div>
    `;

    var flex_one = document.createElement("div");
    flex_one.classList.add("flex-1");
    flex_one.innerHTML = `

        <div class="flex-2">
          <h3 class="raleway-600">${product.name}</h3>
          <span class="mont-600">$${product.price.toFixed(2)}</span>
        </div>

        <div class="mt-1 flex-3">
          <span class="mont-400">Quantity: ${product.number_of_copies}</span>
          <span class="raleway-400" style="line-height:1.75">Description: ${product.description}</span>
        </div>
    `;


    var btn_sect = document.createElement("div");
    btn_sect.className = "mt-1 flex-4";


    var quantity_btn = document.createElement("input");
    quantity_btn.setAttribute('type', 'number');
    quantity_btn.setAttribute('id', 'quantity_btn');
    quantity_btn.setAttribute('min', '1');
    quantity_btn.className = "raleway-400 cta-btn secondary";
    quantity_btn.style.width = "70px"
    quantity_btn.value = product.number_of_copies;

    quantity_btn.addEventListener("input" ,(ev) => {
      const newQuantity = parseInt(ev.target.value);

      if(!(newQuantity >= 1)){
        if(newQuantity == 0){
          removeFromCart(product,index);
          window.location.reload();
        }
      }else{
        addtoCart(product , newQuantity);
      }
      
      
    });           

    
    //Create Cancel Button         
    var cancel_btn = document.createElement("button");
    cancel_btn.setAttribute('id', 'cancel_btn');
    cancel_btn.className = "raleway-400 cta-btn secondary";
    cancel_btn.style = "color:rgb(82, 0, 16); border-color: crimson;";
    cancel_btn.textContent = "Cancel";

    cancel_btn.addEventListener("click" ,(ev) => {
      removeFromCart(product);
    });       
    
    btn_sect.appendChild(quantity_btn);
    btn_sect.appendChild(cancel_btn);

    flex_one.append(btn_sect);
    card.appendChild(flex_one);
    products_cont.appendChild(card);
  }else{
    div_section_one_empty.innerHTML = `
    <p class="mont-400">Nothing is in your cart...</p>
  `;
  }

}

function drawInvoice(product ,index){
    var total = 0;
    var div_section_one = document.createElement("div");

       div_section_one.className = "flex-2 mt-05 px-1";
       div_section_one.innerHTML = `
        <p class="mont-400 txt-1">${product.name + " X" + product.number_of_copies + " @ $" + product.price}</p>
        <p class="mont-400 txt-1">${"$" +  (product.number_of_copies * product.price).toFixed(2)}</p>
    `;
    total += (product.number_of_copies * product.price);
    subTotal += total;
    summary_cont.append(div_section_one);
}
 

if(cart.length){
  cart.forEach( (product , index) => {
    drawReceiptProducts(product , index);
    drawInvoice(product, index);
 });

 var div_section_two = document.createElement("div");
 div_section_two.innerHTML = `
  <div class="flex-2 mt-05 px-1 bordering">
    <p class="raleway-400">Subtotal</p>
    <p class="alert mont-400 txt-1">${"$" + subTotal.toFixed(2)}</p>
  </div>

  <h3 class="raleway-400 mt-05">Taxes</h3>

  <div class="flex-2 mt-05 px-1">
    <p class="mont-400 txt-1">GCT @ 16%</p>
    <p class="mont-400 txt-1">${"$" +  (.16 * subTotal).toFixed(2)}</p>
  </div>

  <div class="flex-2 mt-05 px-1 bordering">
    <p class="raleway-600">Grand Total</p>
    <p class="alert mont-600">${"$" +  (subTotal + (.16 * subTotal)).toFixed(2)}</p>
  </div>
`;
summary_cont.append(div_section_two);

}else{
  products_section_empty.className = "card-nb";
  products_section_empty.innerHTML = `<p class="mont-400">No Products are in your cart..... :(</p>`;
  products_cont.append(products_section_empty );

  div_section_one_empty.className = "flex-2 mt-05 px-1";
  div_section_one_empty.innerHTML = `
    <p class="mont-400">Nothing is in your cart...</p>
  `;
  summary_cont.appendChild(div_section_one_empty);
}
   

//Transfers cart information 
checkout_btn.addEventListener("click", (ev) => {
  registrationData[userIndex].cart.totalDiscount = totalDiscount.toFixed(2);
  registrationData[userIndex].cart.subtotal = subTotal.toFixed(2);
  registrationData[userIndex].cart.totalTax = (.16 * subTotal).toFixed(2);
  registrationData[userIndex].cart.grandTotal = (subTotal + (.16 * subTotal)).toFixed(2);
  localStorage.setItem("RegistrationData" , JSON.stringify(registrationData));
})

//Clears Cart
cancel_cart_btn.addEventListener("click" , (e) => {
  if(cart.length){
    var response = window.confirm("Are you sure you want to empty your cart?");
    if(response){
      registrationData[userIndex].cart.products = [];
      localStorage.setItem("RegistrationData" , JSON.stringify(registrationData));
      window.location.replace("./products.html");
    }
  }else{
    alert("Your cart is already empty");
  }
   
});








