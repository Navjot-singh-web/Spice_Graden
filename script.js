const defaultMenu = [
    { name: "Samosa Platter", category: "starters", type: "veg", description: "Crispy, golden samosas filled with spiced potatoes and peas, served hot with mint and tamarind chutneys.", price: 180, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400" },
    { name: "Chicken Tikka", category: "starters", type: "nonveg", description: "Tender boneless chicken pieces marinated in yogurt and aromatic spices, then grilled to smoky perfection.", price: 320, image: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Panjabi Prawn", category: "starters", type: "nonveg", description: "Succulent prawns cooked in a rich, spiced Punjabi-style gravy with onions, tomatoes, ginger, garlic, and robust spices", price: 450, image: "https://www.flavorsofmumbai.com/wp-content/uploads/2016/01/Punjabi-Prawn-Curry-Recipe-36.jpg" },
    { name: "Butter Chicken", category: "main", type: "nonveg", description: "Tender chicken pieces in a rich, creamy tomato gravy with butter, aromatic spices, and a hint of sweetness.", price: 380, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400" },
    { name: "Lamb Rogan Josh", category: "main", type: "nonveg", description: "Tender lamb pieces slow-cooked in a rich, aromatic Kashmiri-style gravy with yogurt, fennel, and warm spices.", price: 520, image: "https://images.unsplash.com/photo-1759392773285-0f86affdf1df?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Paneer Tikka Masala", category: "main", type: "veg", description: "Grilled, spiced paneer cubes simmered in a creamy, aromatic tomato-onion gravy with butter and a hint of fenugreek.", price: 340, image: "https://images.unsplash.com/photo-1690401767645-595de0e0e5f8?q=80&w=1013&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Biryani Special", category: "main", type: "nonveg", description: "Fragrant basmati rice layered with spiced meat or vegetables, slow-cooked to perfection with saffron, caramelized onions, and whole spices.", price: 420, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400" },
    { name: "Garlic Naan", category: "breads", type: "veg", description: "Soft, pillowy Indian flatbread brushed with garlic butter and topped with fresh coriander.", price: 80, image: "https://media.istockphoto.com/id/1443601584/photo/tandoori-green-garlic-naan-or-bread-served-in-basket-isolated-on-table-top-view-of-asian-and.webp?a=1&b=1&s=612x612&w=0&k=20&c=KuQUeAEbfhtNfK5Kk-Pg299bHDTHAJ-_IstHDyxS7cc=" },
    { name: "Butter Roti", category: "breads", type: "veg", description: "Warm, soft whole-wheat flatbread lightly brushed with butter, perfect for scooping up curries and gravies.", price: 50, image: "https://tandoorijunctionindianrestaurant.com.au/wp-content/uploads/2024/06/butter-roti.jpg" },
    { name: "Gulab Jamun", category: "desserts", type: "veg", description: "Soft, deep-fried milk dumplings soaked in warm, rose-scented sugar syrup flavored with cardamom and saffron.", price: 120, image: "https://5.imimg.com/data5/SELLER/Default/2022/5/XP/GP/LU/9408862/gulab-jamun-500x500.jpeg" },
    { name: "Rasmalai", category: "desserts", type: "veg", description: "Soft, spongy cottage cheese patties soaked in chilled, sweetened milk flavored with saffron, cardamom, and garnished with chopped nuts.", price: 140, image: "https://i.pinimg.com/originals/d8/db/d5/d8dbd50f5e90bcb398c932723d259388.jpg" },
    { name: "Mango Kulfi", category: "desserts", type: "veg", description: "Creamy, dense Indian-style ice cream made with ripe mango pulp, reduced milk, cardamom, and a hint of nuts, slow-churned for a rich, velvety texture.", price: 100, image: "https://i.pinimg.com/originals/32/aa/14/32aa14ec2083ef1aad3722dc44fcd81a.jpg" }
];

document.addEventListener('DOMContentLoaded', () => {
    initMenuData();
    renderMenu();
    initSession();

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    document.getElementById("searchBtn").addEventListener("click", function () {
        const value = document.getElementById("foodSearch").value.toLowerCase();
        const items = document.querySelectorAll(".menu-item");

        items.forEach(item => {
            const text = item.innerText.toLowerCase();
            item.style.display = text.includes(value) ? "block" : "none";
        });

        document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
    });
});

function initMenuData() {
    if (!localStorage.getItem("spice_menu")) {
        localStorage.setItem("spice_menu", JSON.stringify(defaultMenu));
    }
    if (!localStorage.getItem("spice_orders")) {
        localStorage.setItem("spice_orders", JSON.stringify([]));
    }
    if (!localStorage.getItem("spice_reservations")) {
        localStorage.setItem("spice_reservations", JSON.stringify([]));
    }
}

let menuItems = [];
let currentTypeFilter = 'all';
let currentCategoryFilter = 'all';

function renderMenu() {
    const menuGrid = document.getElementById("menu-grid-container");
    if (!menuGrid) return;

    const savedMenu = JSON.parse(localStorage.getItem("spice_menu")) || defaultMenu;
    menuGrid.innerHTML = "";

    savedMenu.forEach(item => {
        const div = document.createElement("div");
        div.className = `menu-item ${item.type}`;
        div.setAttribute("data-category", item.category);
        div.setAttribute("data-type", item.type);

        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="food-type ${item.type}-type">${item.type === 'veg' ? 'Veg' : 'Non-Veg'}</div>
            <div class="menu-info">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <span class="price">₹${item.price}</span>
                <button class="add-to-cart" data-name="${item.name}" data-price="${item.price}">Add to Cart</button>
            </div>
        `;
        menuGrid.appendChild(div);
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const name = this.getAttribute('data-name');
            const price = parseInt(this.getAttribute('data-price'));
            addToCart(name, price);
        });
    });

    menuItems = document.querySelectorAll('.menu-item');
    setupFilters();
    filterMenuItems();

    applyScrollObserver();
}

function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const categoryBtns = document.querySelectorAll('.category-btn');

    filterBtns.forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
    });
    categoryBtns.forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
    });

    const cleanFilterBtns = document.querySelectorAll('.filter-btn');
    const cleanCategoryBtns = document.querySelectorAll('.category-btn');

    cleanFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            cleanFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentTypeFilter = btn.getAttribute('data-type');
            filterMenuItems();
        });
    });

    cleanCategoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            cleanCategoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategoryFilter = btn.getAttribute('data-category');
            filterMenuItems();
        });
    });
}

function filterMenuItems() {
    if (!menuItems || menuItems.length === 0) return;
    menuItems.forEach(item => {
        const itemType = item.getAttribute('data-type');
        const itemCategory = item.getAttribute('data-category');

        const typeMatch = currentTypeFilter === 'all' || itemType === currentTypeFilter;
        const categoryMatch = currentCategoryFilter === 'all' || itemCategory === currentCategoryFilter;

        if (typeMatch && categoryMatch) {
            item.classList.remove('hidden');
            item.classList.add('show');
            item.style.display = "block";
        } else {
            item.classList.remove('show');
            item.classList.add('hidden');
            item.style.display = "none";
        }
    });
}

let cart = [];
const cartModal = document.getElementById('cart-modal');
const checkoutModal = document.getElementById('checkout-modal');
const cartCount = document.querySelector('.cart-count');

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    updateCart();
    showNotification('Added to cart!');
}

function updateCart() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    const cartItemsContainer = document.querySelector('.cart-items');
    if (!cartItemsContainer) return;
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align:center;padding:2rem;">Your cart is empty</p>';
    } else {
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>₹${item.price} × ${item.quantity}</p>
                </div>
                <div class="cart-item-controls">
                    <button class="qty-btn minus" data-index="${index}">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn plus" data-index="${index}">+</button>
                    <i class="fas fa-trash remove-item" data-index="${index}"></i>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        document.querySelectorAll('.minus').forEach(btn => {
            btn.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                } else {
                    cart.splice(index, 1);
                }
                updateCart();
            });
        });

        document.querySelectorAll('.plus').forEach(btn => {
            btn.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                cart[index].quantity++;
                updateCart();
            });
        });

        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                cart.splice(index, 1);
                updateCart();
            });
        });
    }

    updateCartTotal();
}

function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalAmt = document.querySelector('.total-amount');
    const finalTot = document.querySelector('.final-total');
    if (totalAmt) totalAmt.textContent = '₹' + total;
    if (finalTot) finalTot.textContent = '₹' + total;
}

const cartLink = document.querySelector('.cart-icon a');
if (cartLink) {
    cartLink.addEventListener('click', function (e) {
        e.preventDefault();
        cartModal.style.display = 'flex';
        updateCart();
    });
}

const closeCartBtn = document.querySelector('.close-cart');
if (closeCartBtn) {
    closeCartBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });
}

const closeCheckoutBtn = document.querySelector('.close-checkout');
if (closeCheckoutBtn) {
    closeCheckoutBtn.addEventListener('click', () => {
        checkoutModal.style.display = 'none';
    });
}

window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
    if (e.target === checkoutModal) {
        checkoutModal.style.display = 'none';
    }
});

const checkBtn = document.querySelector('.checkout-btn');
if (checkBtn) {
    checkBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            showNotification('Your cart is empty! 🛒');
            return;
        }

        cartModal.style.display = 'none';
        checkoutModal.style.display = 'flex';

        const summaryItems = document.querySelector('.summary-items');
        summaryItems.innerHTML = cart.map(item =>
            `<p>${item.name} × ${item.quantity} = ₹${item.price * item.quantity}</p>`
        ).join('');

        updateCartTotal();
    });
}

const checkForm = document.getElementById('checkout-form');
if (checkForm) {
    checkForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('checkout-name').value;
        const phone = document.getElementById('checkout-phone').value;
        const address = document.getElementById('checkout-address').value;
        const payment = document.getElementById('checkout-payment').value;
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        const savedOrders = JSON.parse(localStorage.getItem("spice_orders")) || [];
        const newOrder = {
            id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
            name: name,
            phone: phone,
            address: address,
            payment: payment === 'cod' ? 'Cash on Delivery' : 'Online UPI',
            items: cart.map(item => `${item.name} (${item.quantity}x)`).join(", "),
            total: total,
            date: new Date().toLocaleDateString('en-IN'),
            time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
            status: "Pending"
        };
        savedOrders.push(newOrder);
        localStorage.setItem("spice_orders", JSON.stringify(savedOrders));


        alert(`Thank you, ${name}! \n\nYour order has been placed successfully!\n\nTotal: ₹${total}\nPayment: ${newOrder.payment}\nDelivery to: ${address}\n\nWe'll contact you at ${phone} shortly.`);

        cart = [];
        updateCart();
        checkoutModal.style.display = 'none';
        this.reset();
    });
}

const reservationForm = document.getElementById('reservationForm');
if (reservationForm) {
    reservationForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const guests = document.getElementById('guests').value;
        const message = document.getElementById('message').value;

        if (name && phone && email && date && time && guests) {
            const savedRes = JSON.parse(localStorage.getItem("spice_reservations")) || [];
            const newRes = {
                id: 'RES-' + Math.floor(1000 + Math.random() * 9000),
                name: name,
                phone: phone,
                email: email,
                date: date,
                time: time,
                guests: guests,
                message: message || "None",
                status: "Confirmed"
            };
            savedRes.push(newRes);
            localStorage.setItem("spice_reservations", JSON.stringify(savedRes));

            alert(`Thank you, ${name}! \n\nYour table reservation for ${guests} on ${date} at ${time} has been confirmed.\n\nWe'll contact you at ${phone} or ${email} if needed.\n\nSee you soon! `);
            reservationForm.reset();
        }
    });
}

const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 110px;
        right: 20px;
        background: var(--success-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function applyScrollObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.menu-item, .feature, .testimonial-card, .contact-card, .step').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
}


function initSession() {
    const authItem = document.getElementById("nav-auth-item");
    if (!authItem) return;

    const currentUser = JSON.parse(localStorage.getItem("spice_current_user"));

    if (currentUser) {

        authItem.className = "user-dropdown";
        authItem.innerHTML = `
            <a href="javascript:void(0)" class="user-dropdown-toggle" id="nav-username">
                <i class="fas fa-user-circle" style="font-size: 1.2rem; color: var(--primary-color);"></i>
                ${currentUser.name}
            </a>
            <ul class="dropdown-menu">
                <li><button id="nav-change-pass-btn"><i class="fas fa-key"></i> Change Password</button></li>
                <li><button id="nav-logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</button></li>
            </ul>
        `;

        const dropToggle = authItem.querySelector(".user-dropdown-toggle");
        dropToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            authItem.classList.toggle("active");
        });

        window.addEventListener("click", () => {
            authItem.classList.remove("active");
        });

        document.getElementById("nav-logout-btn").addEventListener("click", () => {
            localStorage.removeItem("spice_current_user");
            alert("Logged out successfully.");
            window.location.reload();
        });

        document.getElementById("nav-change-pass-btn").addEventListener("click", () => {
            const modal = document.getElementById("change-password-modal");
            if (modal) modal.classList.add("active");
        });
    }

    setupPasswordChange();
}
function setupPasswordChange() {
    const modal = document.getElementById("change-password-modal");
    const closeBtn = document.getElementById("close-password-modal");
    const form = document.getElementById("change-password-form");
    const errorMsg = document.getElementById("password-change-error");

    if (!modal) return;

    closeBtn.addEventListener("click", () => {
        modal.classList.remove("active");
        form.reset();
        errorMsg.textContent = "";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
            form.reset();
            errorMsg.textContent = "";
        }
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const oldPass = document.getElementById("old-password").value.trim();
        const newPass = document.getElementById("new-password").value.trim();
        const confirmPass = document.getElementById("confirm-new-password").value.trim();

        const currentUser = JSON.parse(localStorage.getItem("spice_current_user"));
        if (!currentUser) return;

        if (newPass.length < 8) {
            errorMsg.textContent = "New password must be at least 8 characters.";
            return;
        }

        if (newPass !== confirmPass) {
            errorMsg.textContent = "New passwords do not match.";
            return;
        }

        if (currentUser.email === "user@example.com") {

            let currentSecret = localStorage.getItem("default_user_secret") || "12345678";
            if (oldPass !== currentSecret) {
                errorMsg.textContent = "Incorrect old password.";
                return;
            }
            localStorage.setItem("default_user_secret", newPass);
            alert("Password updated successfully! Please log in again.");
            localStorage.removeItem("spice_current_user");
            window.location.href = "./login.html";
            return;
        }

        const users = JSON.parse(localStorage.getItem("spice_users")) || [];
        const userIndex = users.findIndex(u => u.email.toLowerCase() === currentUser.email.toLowerCase());

        if (userIndex !== -1) {
            if (users[userIndex].password !== oldPass) {
                errorMsg.textContent = "Incorrect old password.";
                return;
            }

            users[userIndex].password = newPass;
            localStorage.setItem("spice_users", JSON.stringify(users));

            alert("Password updated successfully! Please log in again.");
            localStorage.removeItem("spice_current_user");
            window.location.href = "./login.html";
        } else {
            errorMsg.textContent = "User session mismatch. Please log in again.";
        }
    });
}
