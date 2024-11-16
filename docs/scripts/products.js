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
            { id:"pd001", name:"Baby Halter Crop Top and Shorts", price:5550.00, img:"./assets/jev/croptopshorts.jpg", description:"Dress your little one in our adorable hand-crafted baby crochet crop top and shorts set, made from soft, breathable cotton yarn. The set features a cozy halter-neck top and shorts. Perfect for summer outings.", copies:100, discount:0},
            { id:"pd002", name:"Sofa Handle Cover", price:3000.00, img:"./assets/jev/chaircover.jpg", description:"Protect your sofas in style with our hand-crafted crochet chair handle covers, made from durable, soft yarn. These covers provide a comfortable grip while preventing wear and tear on chair handles. They’re the perfect blend of function and charm for any home.", copies:100, discount:0},
            { id:"pd003", name:"Baby Halter Crop Top and Skirt Set", price:5000.00, img:"./assets/jev/skirttop.jpg", description:"Dress your little one in our charming hand-crafted crochet baby crop top and skirt set, made from soft, breathable cotton yarn. The crop top features a sweet design with adjustable straps for a comfortable fit, while the matching skirt has an elastic waistband for easy dressing and playful movement. Perfect for summer outings, special occasions or the beach, this delightful set ensures your baby looks adorable while staying comfortable.", copies:100, discount:0},
            { id:"pd004", name:"Breast Cancer Pins", price:600.00, img:"./assets/jev/breastcancerpins.jpg", description:"Show your support for breast cancer awareness with our hand-crafted crochet breast cancer pins. Each pin features a delicate pink ribbon design, symbolizing hope and strength, and is made from high-quality, durable yarn. Perfect for attaching to clothing, bags, or hats, these beautiful pins make a meaningful statement and can be worn year-round to promote awareness and solidarity in the fight against breast cancer.", copies:100, discount:0},
            { id:"pd005", name:"Heart Shaped Tassel Earrings", price:2500.00, img:"./assets/jev/heartearrings.jpg", description:"Add a touch of whimsy to your look with our hand-crafted crochet heart-shaped tassel earrings. These lightweight earrings feature intricate crochet work in vibrant colors, beautifully complemented by soft tassels that sway with every movement. Perfect for adding a playful flair to any outfit, they’re a delightful accessory for both casual and special occasions.", copies:100, discount:0},
            { id:"pd006", name:"Watermemlon Earrings", price:2500.00, img:"./assets/jev/melonearrings.jpg", description:"Brighten up your accessory collection with our adorable hand-crafted crochet watermelon earrings. These whimsical earrings feature vibrant green, red and white crochet detailing, designed to resemble juicy watermelon slices, complete with tiny seed accents. Lightweight and fun, they add a playful touch to any outfit and are perfect for summer gatherings or casual outings.", copies:100, discount:0},
            { id:"pd007", name:"Pineapple Earrings", price:2500.00, img:"./assets/jev/pineappleearrings.jpg", description:"Add a tropical flair to your style with our hand-crafted crochet pineapple earrings. These vibrant earrings showcase intricate crochet work, capturing the essence of a juicy pineapple with bright yellow and green colors. Lightweight and eye-catching, they’re the perfect accessory for summer parties, beach outings, or anytime you want to bring a little sunshine to your look.", copies:100, discount:0},
            { id:"pd008", name:"Diamond Earrings", price:2500.00, img:"./assets/jev/diamondearrings.jpg", description:"Elevate your accessory game with our stunning hand-crafted crochet diamond earrings. These elegant earrings feature a delicate diamond shape, beautifully crafted from high-quality yarn in a nice sophisticated purple colour. Lightweight and versatile, they add a touch of sparkle and charm to any outfit, making them perfect for both casual wear and special occasions..", copies:100, discount:0},
            { id:"pd009", name:"Granny Square Teddy", price:3000.00, img:"./assets/jev/mainteddy.jpg", description:"Introduce a touch of nostalgia with our charming hand-crafted crochet granny square teddy accessory. This adorable teddy features a classic granny square design, showcasing vibrant colors and intricate stitches that evoke a warm, handmade feel. Perfect for adding a playful accent to your bags, or as a decorative piece, this delightful accessory brings joy and whimsy wherever it goes.", copies:100, discount:0},
            { id:"pd0010", name:"Bikini Swimwear", price:7500.00, img:"./assets/jev/mainswimsuit.jpg", description:"Make a splash this summer with our hand-crafted crochet bikini, designed for style and comfort. This stunning bikini features intricate crochet patterns and adjustable ties, allowing for a customizable fit that flatters all body types. Made from soft, durable cotton yarn, it’s perfect for beach days, pool parties, or sunbathing, ensuring you stand out with a unique and fashionable look. Only available in small at this time", copies:100, discount:0},
            { id:"pd0011", name:"V-Shaped Scarf", price:6000.00, img:"./assets/jev/scarf2.jpg", description:"Stay stylish and cozy with our hand-crafted crochet V-shaped scarf, perfect for adding a touch of elegance to any outfit. Featuring intricate crochet patterns, this lightweight scarf drapes beautifully and provides warmth without bulk. This multi-coloured scarf is versatile enough to wear on chilly days or as a fashionable accessory for any season, making it an essential addition to your wardrobe.", copies:100, discount:0},
            { id:"pd0012", name:"Lion Keychain", price:2000.00, img:"./assets/jev/mainlion.jpg", description:"Show off your wild side with our adorable hand-crafted crochet lion keychain! This charming accessory features a detailed crochet lion design, complete with a fluffy mane and expressive features, making it a delightful companion for your keys, bags, backpacks or even your car!. Lightweight and durable, it adds a playful touch to your everyday essentials while showcasing your love for unique, handmade items. Perfect for animal lovers of all ages, this keychain makes a great gift or a fun treat for yourself!", copies:100, discount:0},
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




