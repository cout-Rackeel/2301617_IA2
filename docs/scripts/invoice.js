var cart;
var sub_total = 0;
var summary_cont = document.getElementById("summary-cont");




function fetchCart(){
    var cart = localStorage.getItem("cart") === null ?  [] : JSON.parse(localStorage.getItem("cart")) ;
    return cart;
}

cart = fetchCart();

var invoice_cont = document.getElementById("invoice_cont");
var cancel_cart_btn = document.getElementById("cancel_cart_btn");


function addtoCart(product){
    product.number_of_copies++;
    localStorage.setItem("cart" , JSON.stringify(cart));
    alert("Item Addded to Cart")
    window.location.reload();
}

function removeFromCart(product, index)
{
    if(product.number_of_copies > 1){
        product.number_of_copies--;
        localStorage.setItem("cart" , JSON.stringify(cart));
        alert("Item taken from Cart")
        window.location.reload();
    }else{
        cart.splice(index , 1);
        localStorage.setItem("cart" , JSON.stringify(cart));
        alert("Item taken from Cart")
        window.location.reload();
    }


}

function drawReceiptProducts(product , index){
       //Create Card
       var card = document.createElement("div");
       card.className = "card";
   
       //Create Card Image
       var open_bracket = "('";
       var close_bracket ="')";
       var card_img = document.createElement("div");
       card_img.classList.add("card-img");
       card_img.style.backgroundImage = "url" + open_bracket + product.img + close_bracket;
       //Create Flex-1
       var flex_one = document.createElement("div");
       flex_one.classList.add("flex-1");
   
       //Create Flex-2
         var flex_two = document.createElement("div");
         flex_two.classList.add("flex-2");
       
       //Create titles
       var product_name = document.createElement("h3");
       product_name.classList.add("raleway-600");
       product_name.textContent = product.name;
   
       //Create Span
       var product_price = document.createElement("span");
       product_price.classList.add("raleway-600");
       product_price.textContent = "Price:$ " + product.price;
   
       flex_two.appendChild(product_name);
       flex_two.appendChild(product_price);
   
       //Create Flex-3
       var flex_three = document.createElement("div");
         flex_three.className = "mt-1 flex-3";
         
       //Create Span
       var quantity = document.createElement("span");
       quantity.classList.add("raleway-400");
       quantity.textContent = "Quantity: " + product.number_of_copies;
   
       var description = document.createElement("span");
       description.classList.add("raleway-400");
       description.textContent = "Description: " + product.description;
   
       flex_three.appendChild(quantity);
       flex_three.appendChild(description);
   
        //Create Flex-4        
        var flex_four = document.createElement("div");
         flex_four.className = "mt-1 flex-4";
   
       //Create Add Button         
       var add_btn = document.createElement("button");
       add_btn.setAttribute('id', 'add_btn');
       add_btn.className = "raleway-400 cta-btn";
       add_btn.textContent = "Add";
   
       add_btn.addEventListener("click" ,(ev) => {
          addtoCart(product);
       });           
       
       //Create Cancel Button         
       var cancel_btn = document.createElement("button");
       cancel_btn.setAttribute('id', 'cancel_btn');
       cancel_btn.className = "raleway-400 cta-btn";
       cancel_btn.textContent = "Cancel";
   
       cancel_btn.addEventListener("click" ,(ev) => {
          removeFromCart(product);
       });       
       
       flex_four.appendChild(add_btn);
       flex_four.appendChild(cancel_btn);
                                                          
         flex_one.appendChild(flex_two);
         flex_one.appendChild(flex_three);
         flex_one.appendChild(flex_four);
   
   
       card.appendChild(card_img);
       card.appendChild(flex_one);
       invoice_cont.appendChild(card);
       console.log("done")
}

function drawInvoice(product , index , summary_cont){
    var total = 0;

    var div_section_one = document.createElement("div");
    div_section_one.className = "flex-2 mt-05 px-1";

    var para_section_one = document.createElement("p");
    para_section_one.textContent = product.name + "X" + product.number_of_copies + "@ $" + product.price;

    var  para_section_dol_one = document.createElement("p");
    para_section_dol_one.textContent = "$" +  (product.number_of_copies * product.price).toFixed(2);
    total += (product.number_of_copies * product.price);
    sub_total += total;

    div_section_one.appendChild(para_section_one);
    div_section_one.appendChild(para_section_dol_one);

    //---------------------------------------------------
    var heading = document.createElement("h3");
    heading.className = "raleway-400 mt-05";
    heading.innerText = "Taxes";

    //---------------------------------------------------

    summary_cont.append(div_section_one);
}
   
cart.forEach( (product , index) => {
   drawReceiptProducts(product , index);
   drawInvoice(product, index , summary_cont);
});

//Rest of Invoice form
var div_section_two = document.createElement("div");
div_section_two.className = "flex-2 mt-05 px-1 bordering" ;

var para_section_two = document.createElement("p");
para_section_two.className = "raleway-400" ;
para_section_two.textContent = "Subtotal";

var  para_section_dol_two = document.createElement("p");
para_section_dol_two.className = "alert" ;
para_section_dol_two.textContent = "$" +  sub_total.toFixed(2);

div_section_two.appendChild(para_section_two);
div_section_two.appendChild(para_section_dol_two);

summary_cont.append(div_section_two);

var heading = document.createElement("h3");
heading.className = "raleway-400 mt-05";
heading.innerText = "Taxes";

summary_cont.append(heading);

var div_section_three = document.createElement("div");
div_section_three.className = "flex-2 mt-05 px-1";

var para_section_three = document.createElement("p");
para_section_three.textContent = "GCT @ 16%"

var  para_section_dol_three = document.createElement("p");
para_section_dol_three.textContent = "$" +  (.16 * sub_total).toFixed(2);

div_section_three.appendChild(para_section_three);
div_section_three.appendChild(para_section_dol_three);

summary_cont.append(div_section_three);

var grand_total = document.createElement("h3");
grand_total.className = "raleway-400 mt-05";
grand_total.innerText = "Grand Total";

var div_section_four = document.createElement("div");
div_section_four.className = "flex-2 mt-05 px-1 bordering";

var para_section_four = document.createElement("p");
para_section_four.textContent = "Total"

var  para_section_dol_four = document.createElement("p");
para_section_dol_four.textContent = "$" +  (sub_total - (.16 * sub_total)).toFixed(2);

div_section_four.appendChild(para_section_four);
div_section_four.appendChild(para_section_dol_four);

grand_total.appendChild(div_section_four);

summary_cont.append(grand_total);


cancel_cart_btn.addEventListener("click" , (e) => {
   var response = window.confirm("Are you sure you want to empty your cart?");
   if(response){
    localStorage.removeItem("cart");
    window.location.replace("/docs/products.html");
   }
})







