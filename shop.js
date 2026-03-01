// ─── Product Catalogue ───────────────────────────────────────────────────────

const PRODUCTS = [
    {
        id: 1,
        name: "Birthday Cake",
        variant: "Custom design · serves 8–10",
        price: 850,
        category: "birthday",
        image: "Images/web-compressed/Cakes/Birthday Cakes/IMG-20250907-WA0013.jpg",
        description: "Celebrate in style with a fully customised birthday cake. Choose your flavour, colour, and message."
    },
    {
        id: 2,
        name: "Birthday Cake – Tiered",
        variant: "2-tier custom · serves 20–25",
        price: 1800,
        category: "birthday",
        image: "Images/web-compressed/Cakes/Birthday Cakes/IMG-20250822-WA0000.jpg",
        description: "A show-stopping two-tier cake perfect for big birthdays and milestone celebrations."
    },
    {
        id: 3,
        name: "Wedding Cake",
        variant: "Elegant multi-tier · serves 30+",
        price: 3500,
        category: "wedding",
        image: "Images/web-compressed/Cakes/Wedding Cakes/DSC06209.JPG",
        description: "A beautiful wedding centrepiece crafted to match your theme. Fully customisable flavours and décor."
    },
    {
        id: 4,
        name: "Wedding Cake – Floral",
        variant: "Floral décor · serves 30+",
        price: 4200,
        category: "wedding",
        image: "Images/web-compressed/Cakes/Wedding Cakes/IMG_20241226_195154.jpg",
        description: "Adorned with handcrafted sugar flowers, this elegant cake is the perfect wedding centrepiece."
    },
    {
        id: 5,
        name: "Custom Photo / Print Cake",
        variant: "Edible print · serves 8–10",
        price: 950,
        category: "custom",
        image: "Images/web-compressed/Cakes/Custom Prints on Cake/IMG-20240310-WA0012.jpg",
        description: "Upload any photo or design and have it printed in edible ink directly on your cake."
    },
    {
        id: 6,
        name: "Custom Print Cake – Large",
        variant: "Edible print · serves 15–20",
        price: 1400,
        category: "custom",
        image: "Images/web-compressed/Cakes/Custom Prints on Cake/IMG_20240309_203419.jpg",
        description: "Larger size for bigger gatherings. Your chosen photo or artwork reproduced beautifully on cake."
    },
    {
        id: 7,
        name: "Chocolate Fudge Pastry",
        variant: "Per piece",
        price: 120,
        category: "pastry",
        image: "Images/web-compressed/Cakes/Pastry Cakes/IMG-20240517-WA0002.jpg",
        description: "Rich, indulgent chocolate fudge layered with a velvety ganache — a chocoholic's dream."
    },
    {
        id: 8,
        name: "Baked Cheesecake",
        variant: "Whole (serves 8)",
        price: 750,
        category: "pastry",
        image: "Images/web-compressed/Cakes/Pastry Cakes/IMG-20250829-WA0002.jpg",
        description: "Creamy New York-style baked cheesecake with a buttery biscuit base. Available in seasonal flavours."
    },
    {
        id: 9,
        name: "Christmas Special Cake",
        variant: "Festive · serves 8–10",
        price: 1100,
        category: "festival",
        image: "Images/web-compressed/Seasonal/IMG-20231225-WA0003.jpg",
        description: "Seasonal fruit cake or themed sponge, beautifully decorated to spread Christmas cheer."
    },
    {
        id: 10,
        name: "Fudge Brownies",
        variant: "Box of 6",
        price: 350,
        category: "festival",
        image: "Images/web-compressed/Seasonal/IMG-20231217-WA0011.jpg",
        description: "Dense, gooey fudge brownies — perfect as gifts or party treats. Add nuts or caramel drizzle on request."
    },
    {
        id: 11,
        name: "Festive Cookies",
        variant: "Box of 12",
        price: 280,
        category: "festival",
        image: "Images/web-compressed/Seasonal/IMG-20231225-WA0007.jpg",
        description: "Hand-decorated festive cookies ideal for gifting. Custom shapes and icing colours available."
    }
];

// ─── Cart State ───────────────────────────────────────────────────────────────

let cart = [];

function cartTotal() {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function cartCount() {
    return cart.reduce((sum, item) => sum + item.qty, 0);
}

// ─── Render Products ──────────────────────────────────────────────────────────

function renderProducts(filter = 'all') {
    const grid = document.getElementById('productGrid');
    const filtered = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

    grid.innerHTML = filtered.map(product => `
        <div class="product-card" data-category="${product.category}">
            <img src="${product.image}" alt="${product.name}" loading="lazy"
                 onclick="openLightbox('${product.image}', '${product.name.replace(/'/g, "\\'")}')">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-variant">${product.variant}</p>
                <p class="product-price">₹${product.price.toLocaleString('en-IN')}</p>
                <p class="product-description">${product.description}</p>
                <div class="product-actions">
                    <div class="qty-control">
                        <button class="qty-btn" onclick="changeQty(${product.id}, -1)">−</button>
                        <span class="qty-value" id="qty-${product.id}">1</span>
                        <button class="qty-btn" onclick="changeQty(${product.id}, 1)">+</button>
                    </div>
                    <button class="add-to-cart-btn" id="atc-${product.id}" onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// ─── Qty Controls on Product Cards ───────────────────────────────────────────

const productQty = {};

function changeQty(id, delta) {
    productQty[id] = Math.max(1, (productQty[id] || 1) + delta);
    const el = document.getElementById(`qty-${id}`);
    if (el) el.textContent = productQty[id];
}

// ─── Add to Cart ──────────────────────────────────────────────────────────────

function addToCart(id) {
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return;

    const qty = productQty[id] || 1;
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ ...product, qty });
    }

    // Visual feedback
    const btn = document.getElementById(`atc-${id}`);
    if (btn) {
        btn.textContent = 'Added!';
        btn.classList.add('added');
        setTimeout(() => {
            btn.textContent = 'Add to Cart';
            btn.classList.remove('added');
        }, 1500);
    }

    // Reset qty selector back to 1
    productQty[id] = 1;
    const qtyEl = document.getElementById(`qty-${id}`);
    if (qtyEl) qtyEl.textContent = '1';

    updateCartUI();
}

// ─── Cart UI ──────────────────────────────────────────────────────────────────

function updateCartUI() {
    const count = cartCount();
    renderCartItems();
    updateCartTotal();

    const footer = document.getElementById('cartFooter');
    footer.style.display = cart.length > 0 ? 'block' : 'none';

    const empty = document.getElementById('cartEmpty');
    empty.style.display = cart.length === 0 ? 'block' : 'none';

    // Bottom bar
    const bottomBar = document.getElementById('cartBottomBar');
    if (bottomBar) {
        document.getElementById('cartBottomCount').textContent =
            `${count} item${count !== 1 ? 's' : ''}`;
        document.getElementById('cartBottomTotal').textContent =
            `₹${cartTotal().toLocaleString('en-IN')}`;
        bottomBar.classList.toggle('visible', cart.length > 0);
    }
}

function renderCartItems() {
    const container = document.getElementById('cartItems');
    const empty = document.getElementById('cartEmpty');

    if (cart.length === 0) {
        // Keep only the empty placeholder
        const existingItems = container.querySelectorAll('.cart-item');
        existingItems.forEach(el => el.remove());
        empty.style.display = 'block';
        return;
    }

    empty.style.display = 'none';

    // Remove old items
    container.querySelectorAll('.cart-item').forEach(el => el.remove());

    // Insert items before empty message
    cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.dataset.id = item.id;
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-variant">${item.variant}</div>
                <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')} × ${item.qty}</div>
            </div>
            <div style="display:flex; flex-direction:column; align-items:center; gap:0.4rem; flex-shrink:0;">
                <div class="qty-control" style="border-color:#eee;">
                    <button class="qty-btn" onclick="updateCartQty(${item.id}, -1)">−</button>
                    <span class="qty-value">${item.qty}</span>
                    <button class="qty-btn" onclick="updateCartQty(${item.id}, 1)">+</button>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Remove">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
        container.insertBefore(div, empty);
    });
}

function updateCartTotal() {
    const el = document.getElementById('cartTotal');
    el.textContent = `₹${cartTotal().toLocaleString('en-IN')}`;
}

function updateCartQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.qty = Math.max(1, item.qty + delta);
    updateCartUI();
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    updateCartUI();
}

// ─── Cart Drawer ──────────────────────────────────────────────────────────────

function openCart() {
    document.getElementById('cartDrawer').classList.add('open');
    document.getElementById('cartOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    document.getElementById('cartDrawer').classList.remove('open');
    document.getElementById('cartOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

// ─── Checkout Modal ───────────────────────────────────────────────────────────

function openCheckout() {
    closeCart();
    document.getElementById('checkoutModal').classList.add('active');
    // Set min date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('deliveryDate').min = today;
}

function closeCheckout() {
    document.getElementById('checkoutModal').classList.remove('active');
}

function sendToWhatsApp() {
    const name = document.getElementById('customerName').value.trim();
    const date = document.getElementById('deliveryDate').value;
    const notes = document.getElementById('specialInstructions').value.trim();

    if (!name) {
        document.getElementById('customerName').focus();
        return;
    }
    if (!date) {
        document.getElementById('deliveryDate').focus();
        return;
    }

    const itemLines = cart.map(item =>
        `• ${item.name} (${item.variant}) × ${item.qty} = ₹${(item.price * item.qty).toLocaleString('en-IN')}`
    ).join('\n');

    const total = `₹${cartTotal().toLocaleString('en-IN')}`;

    const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('en-IN', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });

    let message =
        `Hi Maya! I would like to enquire about the following from Sweet Delights.\n\n` +
        `*Name:* ${name}\n` +
        `*Preferred Date:* ${formattedDate}\n\n` +
        `*Order Summary:*\n${itemLines}\n\n` +
        `*Order Total:* ${total}`;

    if (notes) {
        message += `\n\n*Special Instructions:*\n${notes}`;
    }

    const url = `https://wa.me/919226263898?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    closeCheckout();
    cart = [];
    updateCartUI();
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function openLightbox(src, alt) {
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    img.src = src;
    img.alt = alt;
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

// ─── Event Listeners ──────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartUI();

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProducts(btn.dataset.filter);
        });
    });

    // Cart open/close
    document.getElementById('cartCloseBtn').addEventListener('click', closeCart);
    document.getElementById('cartOverlay').addEventListener('click', closeCart);

    // Checkout
    document.getElementById('checkoutBtn').addEventListener('click', openCheckout);
    document.getElementById('cancelCheckout').addEventListener('click', closeCheckout);
    document.getElementById('sendWhatsappBtn').addEventListener('click', sendToWhatsApp);

    // Bottom bar checkout button
    const cartBottomBtn = document.getElementById('cartBottomBtn');
    if (cartBottomBtn) cartBottomBtn.addEventListener('click', openCart);

    // Lightbox
    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
    document.getElementById('lightbox').addEventListener('click', (e) => {
        if (e.target === document.getElementById('lightbox')) closeLightbox();
    });

    // Keyboard
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
            closeCheckout();
            closeCart();
        }
    });

    // Mobile nav
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
});
