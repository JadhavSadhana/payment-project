const products = [
    { name: "Cricket Bat", category: "Cricket", price: 1500, image: "images/bat.jpg" },
    { name: "Cricket Ball", category: "Cricket", price: 300, image: "images/ball.jpg" },
    { name: "Football", category: "Football", price: 800, image: "images/fotballl.jpg" },
    { name: "Football Shoes", category: "Football", price: 2000, image: "images/shoes.jpg" },
    { name: "Dumbbells", category: "Gym", price: 1200, image: "images/dumbells.jpg" },
    { name: "Treadmill", category: "Gym", price: 15000, image: "images/treadmill.jpg" },
    { name: "Tennis Racket", category: "Tennis", price: 2000, image: "images/tennis.jpg" },
    { name: "Shuttlecock", category: "Badminton", price: 300, image: "images/shuttlecock.jpg" },
    { name: "Basketball", category: "Basketball", price: 900, image: "images/basketball.jpg" }

];

function filterCategory(category) {
    const filtered = products.filter(p => p.category === category);
    displayProducts(filtered);

    window.scrollTo({
        top: document.querySelector(".products").offsetTop,
        behavior: "smooth"
    });
}
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// DISPLAY ALL PRODUCTS
function displayProducts(list) {
    const container = document.getElementById("productContainer");
    container.innerHTML = "";

    list.forEach(p => {
        container.innerHTML += `
        <div class="product">
          <h3>${p.name}</h3>
          <p>${p.category}</p>
          <p>₹${p.price}</p>
          <button onclick="addToCart('${p.name}', ${p.price})">Add to Cart</button>
        </div>
      `;
    });
}

// INITIAL LOAD
displayProducts(products);

function displayProducts(list) {
    const container = document.getElementById("productContainer");
    container.innerHTML = "";

    list.forEach(p => {
        container.innerHTML += `
        <div class="product">
          <img src="${p.image}" class="product-img">
          <h3>${p.name}</h3>
          <p>${p.category}</p>
          <p>₹${p.price}</p>
          <button onclick="addToCart('${p.name}', ${p.price})">Add to Cart</button>
        </div>
      `;
    });
}

// SEARCH
document.getElementById("search").addEventListener("input", function() {
    const value = this.value.toLowerCase();
    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(value)
    );
    displayProducts(filtered);
});

// ADD TO CART
function addToCart(name, price, image) {
    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}
// UPDATE CART
function updateCart() {
    const cartItems = document.getElementById("cartItems");
    let total = 0;
    cartItems.innerHTML = "";

    cart.forEach((item, i) => {
        total += item.price;
        cartItems.innerHTML += `
        <p>${item.name} - ₹${item.price}
        <button onclick="removeItem(${i})">X</button></p>
      `;
    });

    document.getElementById("total").innerText = "Total: ₹" + total;
}

// REMOVE ITEM
function removeItem(i) {
    cart.splice(i, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

// CART TOGGLE
function toggleCart() {
    document.getElementById("cartSidebar").classList.toggle("active");
    updateCart();
}

// CHECKOUT
function openCheckout() {
    document.getElementById("checkoutModal").style.display = "block";
}

// PLACE ORDER
function placeOrder() {
    alert("Order Placed Successfully 🎉");
    localStorage.removeItem("cart");
    cart = [];
    updateCart();
    document.getElementById("checkoutModal").style.display = "none";
}



function goToPayment() {
    const total = document.getElementById("totalPrice").innerText;

    document.getElementById("payAmount").innerText = total;
    document.getElementById("checkoutModal").style.display = "none";
    document.getElementById("paymentModal").style.display = "block";
}
document.getElementById("paymentMethod").addEventListener("change", function() {
    const method = this.value;
    const container = document.getElementById("paymentDetails");

    if (method === "upi") {
        container.innerHTML = `<input type="text" placeholder="Enter UPI ID">`;
    } else if (method === "card") {
        container.innerHTML = `
        <input type="text" placeholder="Card Number"><br>
        <input type="text" placeholder="Expiry"><br>
        <input type="text" placeholder="CVV">
      `;
    } else {
        container.innerHTML = `<p>Pay when order arrives</p>`;
    }
});

function completePayment() {
    alert("Payment Successful 🎉 (Dummy)");

    localStorage.removeItem("cart");

    document.getElementById("paymentModal").style.display = "none";

    updateCart(); // refresh cart UI
}

function closePayment() {
    document.getElementById("paymentModal").style.display = "none";
}