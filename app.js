
const sampleProducts = [
    { id: 1, name: "Autonomous AI Agent Suite", category: "Software", price: 199.99, description: "Full-stack AI developer workforce agent." },
    { id: 2, name: "Neural Analytics Engine", category: "Analytics", price: 89.99, description: "Real-time SaaS metrics and predictive reporting." },
    { id: 3, name: "Enterprise API Gateway", category: "Infrastructure", price: 149.99, description: "Low-latency microservice router and rate limiter." },
    { id: 4, name: "Vector Database Cluster", category: "Database", price: 249.99, description: "High-density similarity search vector store." }
];

let cart = [];

function renderProducts() {
    const grid = document.getElementById("product-grid");
    grid.innerHTML = sampleProducts.map(p => `
        <div class="product-card">
            <h3 class="product-title">${p.name}</h3>
            <p style="color: #94a3b8; font-size: 14px; min-height: 40px;">${p.description}</p>
            <div class="product-price">$${p.price.toFixed(2)}</div>
            <button class="btn primary" style="width: 100%;" onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
    `).join('');
}

function addToCart(productId) {
    const product = sampleProducts.find(p => p.id === productId);
    cart.push(product);
    updateCartUI();
}

function updateCartUI() {
    document.getElementById("cart-count").innerText = cart.length;
    const cartItemsDiv = document.getElementById("cart-items");
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p class="empty-msg">Your cart is empty.</p>';
        document.getElementById("cart-total").innerText = "0.00";
        return;
    }
    
    let total = 0;
    cartItemsDiv.innerHTML = cart.map(item => {
        total += item.price;
        return `<div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 14px;">
            <span>${item.name}</span>
            <span style="font-weight: 700;">$${item.price.toFixed(2)}</span>
        </div>`;
    }).join('');
    
    document.getElementById("cart-total").innerText = total.toFixed(2);
}

document.getElementById("cart-btn").addEventListener("click", () => {
    document.getElementById("cart-modal").style.display = "flex";
});

document.getElementById("close-cart").addEventListener("click", () => {
    document.getElementById("cart-modal").style.display = "none";
});

document.getElementById("checkout-btn").addEventListener("click", () => {
    if (cart.length === 0) return alert("Cart is empty!");
    alert("Order submitted successfully to FastAPI backend!");
    cart = [];
    updateCartUI();
    document.getElementById("cart-modal").style.display = "none";
});

renderProducts();
