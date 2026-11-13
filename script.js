// FATTIE script.js

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
    const cartElement = document.getElementById("cart");
    if (!cartElement) return;

    let total = 0;
    for (let item of cart) total += item.price;

    cartElement.innerHTML =
        "🛒 Cart (" + cart.length + " items): ₹" + total;
}

function addToCart(price, name) {
    cart.push({
        name: name,
        price: price
    });

    saveCart();
    updateCartCount();
}

function buyBeer() {
    let age = prompt("Enter your age:");
    if (age >= 21) {
        addToCart(249, "Beer");
    } else {
        alert("Sorry! You must be 21+ to buy Beer.");
    }
}

function buyWine() {
    let age = prompt("Enter your age:");
    if (age >= 21) {
        addToCart(699, "Red Wine");
    } else {
        alert("Sorry! You must be 21+ to buy Wine.");
    }
}
function searchFood(){

    let input=document.getElementById("searchBox").value.toLowerCase();

    let cards=document.getElementsByClassName("card");

    for(let i=0;i<cards.length;i++){

        let food=cards[i]
        .getElementsByTagName("h3")[0]
        .innerText
        .toLowerCase();

        if(food.includes(input)){
            cards[i].style.display="block";
        }else{
            cards[i].style.display="none";
        }

    }

}

function loadCart(){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let cartItems = document.getElementById("cartItems");
    let total = 0;

    cartItems.innerHTML = "";

    cart.forEach(item => {

        cartItems.innerHTML += `
        <p>${item.name} - ₹${item.price}</p>
        `;

        total += item.price;
    });


    // Apply discount
    let discount = localStorage.getItem("discount");

    if(discount){

        let discountAmount = (total * discount) / 100;

        let finalTotal = total - discountAmount;


        document.getElementById("total").innerHTML =
        `
        Total: ₹${finalTotal.toFixed(2)}
        <br>
        <small style="color:green">
        🎉 ${discount}% discount applied (Saved ₹${discountAmount.toFixed(2)})
        </small>
        `;

    }
    else{

        document.getElementById("total").innerHTML =
        "Total: ₹" + total;

    }

}

function removeItem(index) {

    cart.splice(index,1);

    saveCart();

    loadCart();

}

function clearCart() {

    cart = [];

    saveCart();

    loadCart();

}

function checkout() {

    if(cart.length == 0){
        alert("🛒 Your cart is empty!");
        return;
    }

    let cardName = prompt("💳 Enter the name on your card:");

    if(cardName == null || cardName == ""){
        alert("Checkout cancelled.");
        return;
    }



    let cvv = prompt("🔒 Enter your 3-digit CVV:");

    if(cvv == null || cvv.length != 3 || isNaN(cvv)){
        alert("❌ Invalid CVV.");
        return;
    }


    let expiry = prompt("📅 Enter expiry date (MM/YY):");

    if(expiry == null || expiry == ""){
        alert("❌ Invalid expiry date.");
        return;
    }


    // Calculate total bill
    let total = cart.reduce((sum, item) => sum + item.price, 0);


    // Apply discount if available
    let discount = localStorage.getItem("discount");

    let finalTotal = total;

    if(discount){

        let discountAmount = (total * discount) / 100;

        finalTotal = total - discountAmount;

    }



    document.body.innerHTML = `

    <div style="
        display:flex;
        justify-content:center;
        align-items:center;
        height:100vh;
        background:#fff8f2;
        font-family:Arial;
        flex-direction:column;
        animation:fade 1s;
        text-align:center;
    ">


        <div style="
            font-size:90px;
            animation:pop 0.6s;
        ">
        ✅
        </div>


        <h1 style="color:#ff6b35;">
        Order Placed Successfully!
        </h1>


        <p style="font-size:22px;">
        Thank you for ordering from <b>FATTIE</b>.
        </p>


        <p style="font-size:22px;">
        💰 Amount Paid:
        <b>₹${finalTotal.toFixed(2)}</b>
        </p>


        ${
            discount 
            ?
            `<p style="font-size:18px;color:green;">
            🎉 ${discount}% discount applied!
            </p>`
            :
            ""
        }


        <p style="font-size:20px;">
        🚴 Your food is being prepared.
        </p>


        <p style="font-size:20px;">
        ⏱ Estimated Delivery:
        <b>25-35 minutes</b>
        </p>



        <button onclick="location.href='page1.html'"
        style="
        margin-top:30px;
        padding:15px 35px;
        background:#ff6b35;
        color:white;
        border:none;
        border-radius:10px;
        font-size:18px;
        cursor:pointer;
        ">
        Continue Shopping
        </button>


    </div>



    <style>

    @keyframes pop{
        0%{
            transform:scale(0);
        }

        80%{
            transform:scale(1.2);
        }

        100%{
            transform:scale(1);
        }
    }


    @keyframes fade{
        from{
            opacity:0;
        }

        to{
            opacity:1;
        }
    }

    </style>

    `;


    // Empty cart and remove used discount
    cart = [];

    saveCart();

    localStorage.removeItem("discount");

}
function chooseDiscountGame(){
    document.getElementById("gameChoice").style.display="block";
}


// 🎡 SPIN WHEEL ANIMATION

function spinWheel(){

let discounts=[5,10,15,20,25,50];
let result=discounts[Math.floor(Math.random()*discounts.length)];


document.getElementById("gameArea").innerHTML=`

<div class="wheel-box">

<div class="arrow">🔻</div>

<div id="wheel"></div>

</div>

<h2 id="spinResult">Spinning...</h2>

`;


let wheel=document.getElementById("wheel");

let randomSpin=1800 + Math.floor(Math.random()*360);

wheel.style.transform=`rotate(${randomSpin}deg)`;


setTimeout(()=>{

document.getElementById("spinResult").innerHTML=
"🎉 You won "+result+"% OFF!";

localStorage.setItem("discount",result);

},5000);

}


// 🎫 SCRATCH CARD ANIMATION

function scratchCard(){

let discount=Math.floor(Math.random()*25)+5;


document.getElementById("gameArea").innerHTML=`

<div class="scratch-container">

<div class="prize">
🎉 ${discount}% OFF!
</div>

<canvas id="scratchCanvas" width="300" height="150"></canvas>

</div>

<h3>Scratch the card!</h3>

`;


let canvas=document.getElementById("scratchCanvas");
let ctx=canvas.getContext("2d");


ctx.fillStyle="#bfbfbf";
ctx.fillRect(0,0,300,150);


ctx.fillStyle="white";
ctx.font="25px Arial";
ctx.fillText("SCRATCH HERE",70,85);


let scratching=false;


function scratch(e){

if(!scratching)return;


let rect=canvas.getBoundingClientRect();

let x=e.clientX-rect.left;
let y=e.clientY-rect.top;


ctx.globalCompositeOperation="destination-out";

ctx.beginPath();
ctx.arc(x,y,20,0,Math.PI*2);
ctx.fill();

}


canvas.addEventListener("mousedown",()=>{
scratching=true;
});


canvas.addEventListener("mouseup",()=>{
scratching=false;

});


canvas.addEventListener("mousemove",scratch);


// mobile support

canvas.addEventListener("touchmove",(e)=>{

let touch=e.touches[0];

let rect=canvas.getBoundingClientRect();

let x=touch.clientX-rect.left;
let y=touch.clientY-rect.top;


ctx.globalCompositeOperation="destination-out";

ctx.beginPath();
ctx.arc(x,y,20,0,Math.PI*2);
ctx.fill();

});

}
// 🧠 QUIZ
function quizGame() {

    document.getElementById("gameArea").innerHTML =
    `
    <h3>Answer correctly to win 20% OFF!</h3>

    <p>Which ingredient is commonly used in pizza?</p>

    <button onclick="checkAnswer(true)">Cheese</button>
    <button onclick="checkAnswer(false)">Chocolate</button>
    `;
}


function checkAnswer(correct){

    if(correct){

        document.getElementById("gameArea").innerHTML =
        "<h2>🎉 Correct! You got 20% OFF!</h2>";

        localStorage.setItem("discount",20);

    }else{

        document.getElementById("gameArea").innerHTML =
        "<h2>😢 Wrong answer! Try again later.</h2>";
    }
}
