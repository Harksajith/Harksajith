let cart = [];
let total = 0;

function addToCart(productId, price) {
    cart.push({ productId, price });
    total += price;
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');
    
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        cartItems.innerHTML += `<li>Product ${item.productId} - $${item.price}</li>`;
    });

    totalElement.textContent = total.toFixed(2);
}
