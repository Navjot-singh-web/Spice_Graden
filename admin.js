document.addEventListener('DOMContentLoaded', () => {
    checkAdminAuth();
    loadDashboardStats();
    renderOverviewRecent();
    renderMenuManager();
    renderOrdersList();
    renderReservationsList();

    setupTabSwitching();

    setupMenuModal();

    document.getElementById("admin-logout").addEventListener("click", handleLogout);
});

function checkAdminAuth() {
    const session = JSON.parse(localStorage.getItem("spice_current_user"));
    if (!session || session.role !== "admin") {
        alert("Access Denied: Admin authentication required.");
        window.location.href = "./login.html";
    }
}

function handleLogout() {
    localStorage.removeItem("spice_current_user");
    alert("Logged out successfully.");
    window.location.href = "./login.html";
}

function setupTabSwitching() {
    const menuItems = document.querySelectorAll(".sidebar-menu .menu-item");
    const tabContents = document.querySelectorAll(".tab-content");
    const pageTitle = document.getElementById("page-title");
    const pageSubtitle = document.getElementById("page-subtitle");

    const subtitles = {
        "overview": "Welcome back, Admin! Here is the latest stats summary.",
        "menu-manager": "Configure and publish dishes on the live landing page menu.",
        "orders": "Monitor and update delivery processing details for customer food orders.",
        "reservations": "Approve or decline customer table bookings and special requests."
    };

    menuItems.forEach(item => {
        item.addEventListener("click", () => {
            menuItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");

            const targetTab = item.getAttribute("data-target");

            tabContents.forEach(tab => {
                tab.classList.remove("active");
                if (tab.id === `tab-${targetTab}`) {
                    tab.classList.add("active");
                }
            });

            let titleText = item.textContent.trim().replace(/\s*\d+\s*$/, "");
            pageTitle.textContent = titleText;
            pageSubtitle.textContent = subtitles[targetTab] || "";
        });
    });

    document.querySelectorAll(".view-all-link").forEach(link => {
        link.addEventListener("click", () => {
            const gotoTab = link.getAttribute("data-goto");
            const matchingMenu = document.querySelector(`.sidebar-menu .menu-item[data-target="${gotoTab}"]`);
            if (matchingMenu) {
                matchingMenu.click();
            }
        });
    });
}

function loadDashboardStats() {
    const dishes = JSON.parse(localStorage.getItem("spice_menu")) || [];
    const orders = JSON.parse(localStorage.getItem("spice_orders")) || [];
    const reservations = JSON.parse(localStorage.getItem("spice_reservations")) || [];

    const revenue = orders
        .filter(o => o.status === "Completed")
        .reduce((sum, o) => sum + parseInt(o.total || 0), 0);

    document.getElementById("stat-revenue").textContent = `₹${revenue}`;
    document.getElementById("stat-orders-count").textContent = orders.length;
    document.getElementById("stat-res-count").textContent = reservations.length;
    document.getElementById("stat-dishes-count").textContent = dishes.length;

    const pendingOrders = orders.filter(o => o.status === "Pending" || o.status === "Preparing").length;
    const badgeOrders = document.getElementById("badge-orders");
    if (badgeOrders) {
        badgeOrders.textContent = pendingOrders;
        badgeOrders.style.display = pendingOrders > 0 ? "inline-block" : "none";
    }

    const pendingRes = reservations.filter(r => r.status === "Confirmed").length;
    const badgeRes = document.getElementById("badge-reservations");
    if (badgeRes) {
        badgeRes.textContent = pendingRes;
        badgeRes.style.display = pendingRes > 0 ? "inline-block" : "none";
    }
}

function renderOverviewRecent() {
    const orders = JSON.parse(localStorage.getItem("spice_orders")) || [];
    const reservations = JSON.parse(localStorage.getItem("spice_reservations")) || [];

    const ordersList = document.getElementById("recent-orders-list");
    if (ordersList) {
        ordersList.innerHTML = "";
        const recentOrders = orders.slice().reverse().slice(0, 5);

        if (recentOrders.length === 0) {
            ordersList.innerHTML = `<tr><td colspan="4" style="text-align:center;">No orders placed yet.</td></tr>`;
        } else {
            recentOrders.forEach(order => {
                ordersList.innerHTML += `
                    <tr>
                        <td><strong>${order.id}</strong></td>
                        <td>${order.name}</td>
                        <td>₹${order.total}</td>
                        <td><span class="status-pill ${order.status.toLowerCase()}">${order.status}</span></td>
                    </tr>
                `;
            });
        }
    }

    const resList = document.getElementById("recent-res-list");
    if (resList) {
        resList.innerHTML = "";
        const recentRes = reservations.slice().reverse().slice(0, 5);

        if (recentRes.length === 0) {
            resList.innerHTML = `<tr><td colspan="4" style="text-align:center;">No table bookings yet.</td></tr>`;
        } else {
            recentRes.forEach(res => {
                resList.innerHTML += `
                    <tr>
                        <td><strong>${res.name}</strong></td>
                        <td>${res.date}</td>
                        <td>${res.time}</td>
                        <td>${res.guests} Guests</td>
                    </tr>
                `;
            });
        }
    }
}

function renderMenuManager() {
    const menuList = document.getElementById("admin-menu-list");
    if (!menuList) return;

    const dishes = JSON.parse(localStorage.getItem("spice_menu")) || [];
    menuList.innerHTML = "";

    if (dishes.length === 0) {
        menuList.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 2rem;">No menu items found.</td></tr>`;
        return;
    }

    dishes.forEach((dish, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><img src="${dish.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100'}" class="admin-dish-img" alt="${dish.name}"></td>
            <td><strong>${dish.name}</strong></td>
            <td><span style="text-transform: capitalize;">${dish.category}</span></td>
            <td><span class="food-tag ${dish.type}">${dish.type === 'veg' ? 'Veg' : 'Non-Veg'}</span></td>
            <td><strong>₹${dish.price}</strong></td>
            <td style="max-width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${dish.description || 'No description'}</td>
            <td>
                <div style="display:flex; gap: 0.5rem;">
                    <button class="btn btn-edit edit-dish-btn" data-index="${index}"><i class="fas fa-edit"></i> Edit</button>
                    <button class="btn btn-delete delete-dish-btn" data-index="${index}"><i class="fas fa-trash"></i> Delete</button>
                </div>
            </td>
        `;
        menuList.appendChild(tr);
    });

    document.querySelectorAll(".edit-dish-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const index = btn.getAttribute("data-index");
            openEditDishModal(index);
        });
    });

    document.querySelectorAll(".delete-dish-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const index = btn.getAttribute("data-index");
            if (confirm("Are you sure you want to delete this dish from the menu?")) {
                deleteDish(index);
            }
        });
    });

    const searchInput = document.getElementById("menu-search-input");
    searchInput.addEventListener("input", () => {
        const val = searchInput.value.toLowerCase();
        const rows = menuList.querySelectorAll("tr");
        rows.forEach(row => {
            const nameCell = row.cells[1];
            if (nameCell) {
                const txt = nameCell.textContent.toLowerCase();
                row.style.display = txt.includes(val) ? "" : "none";
            }
        });
    });
}

function setupMenuModal() {
    const modal = document.getElementById("dish-modal");
    const openBtn = document.getElementById("btn-add-dish-modal");
    const closeBtn = document.getElementById("close-dish-modal");
    const form = document.getElementById("dish-form");

    if (!modal) return;

    openBtn.addEventListener("click", () => {
        document.getElementById("modal-title").textContent = "Add New Dish";
        document.getElementById("edit-dish-index").value = "";
        form.reset();
        modal.classList.add("active");
    });

    closeBtn.addEventListener("click", () => {
        modal.classList.remove("active");
        form.reset();
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
            form.reset();
        }
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        saveDish();
    });
}

function openEditDishModal(index) {
    const dishes = JSON.parse(localStorage.getItem("spice_menu")) || [];
    const dish = dishes[index];
    if (!dish) return;

    document.getElementById("modal-title").textContent = "Edit Dish Details";
    document.getElementById("edit-dish-index").value = index;
    document.getElementById("dish-name").value = dish.name;
    document.getElementById("dish-category").value = dish.category;
    document.getElementById("dish-type").value = dish.type;
    document.getElementById("dish-price").value = dish.price;
    document.getElementById("dish-image").value = dish.image || "";
    document.getElementById("dish-desc").value = dish.description || "";

    document.getElementById("dish-modal").classList.add("active");
}

function saveDish() {
    const indexVal = document.getElementById("edit-dish-index").value;
    const name = document.getElementById("dish-name").value.trim();
    const category = document.getElementById("dish-category").value;
    const type = document.getElementById("dish-type").value;
    const price = parseInt(document.getElementById("dish-price").value);
    let image = document.getElementById("dish-image").value.trim();
    const description = document.getElementById("dish-desc").value.trim();

    if (!image) {
        image = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400";
    }

    const dishes = JSON.parse(localStorage.getItem("spice_menu")) || [];
    const dishObj = { name, category, type, price, image, description };

    if (indexVal === "") {
        dishes.push(dishObj);
        alert(`Successfully added "${name}" to the menu!`);
    } else {
        dishes[parseInt(indexVal)] = dishObj;
        alert(`Successfully updated "${name}" details.`);
    }

    localStorage.setItem("spice_menu", JSON.stringify(dishes));
    document.getElementById("dish-modal").classList.remove("active");
    document.getElementById("dish-form").reset();

    renderMenuManager();
    loadDashboardStats();
}

function deleteDish(index) {
    const dishes = JSON.parse(localStorage.getItem("spice_menu")) || [];
    dishes.splice(index, 1);
    localStorage.setItem("spice_menu", JSON.stringify(dishes));

    renderMenuManager();
    loadDashboardStats();
}

function renderOrdersList() {
    const ordersList = document.getElementById("admin-orders-list");
    if (!ordersList) return;

    const orders = JSON.parse(localStorage.getItem("spice_orders")) || [];
    ordersList.innerHTML = "";

    if (orders.length === 0) {
        ordersList.innerHTML = `<tr><td colspan="8" style="text-align:center; padding: 2rem;">No orders placed yet.</td></tr>`;
        return;
    }

    orders.slice().reverse().forEach((order, index) => {
        const originalIndex = orders.length - 1 - index;

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>${order.id}</strong></td>
            <td>${order.date}<br><small>${order.time}</small></td>
            <td>
                <strong>${order.name}</strong><br>
                <small><i class="fas fa-phone"></i> ${order.phone}</small><br>
                <small><i class="fas fa-map-marker-alt"></i> ${order.address}</small>
            </td>
            <td style="max-width: 200px;">${order.items}</td>
            <td><strong>₹${order.total}</strong></td>
            <td><small>${order.payment}</small></td>
            <td><span class="status-pill ${order.status.toLowerCase()}">${order.status}</span></td>
            <td>
                <div style="display:flex; gap: 0.4rem; flex-wrap: wrap;">
                    ${getOrderActions(order.status, originalIndex)}
                </div>
            </td>
        `;
        ordersList.appendChild(tr);
    });

    bindOrderActionListeners();
}

function getOrderActions(status, index) {
    if (status === "Pending") {
        return `
            <button class="btn btn-warning order-status-btn" data-index="${index}" data-status="Preparing"><i class="fas fa-fire"></i> Prepare</button>
            <button class="btn btn-delete order-status-btn" data-index="${index}" data-status="Cancelled"><i class="fas fa-times"></i> Cancel</button>
        `;
    }
    if (status === "Preparing") {
        return `
            <button class="btn btn-success order-status-btn" data-index="${index}" data-status="Completed"><i class="fas fa-motorcycle"></i> Deliver</button>
        `;
    }
    return `<small style="color:var(--text-secondary);">No action</small>`;
}

function bindOrderActionListeners() {
    document.querySelectorAll(".order-status-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const index = parseInt(btn.getAttribute("data-index"));
            const newStatus = btn.getAttribute("data-status");
            updateOrderStatus(index, newStatus);
        });
    });
}

function updateOrderStatus(index, status) {
    const orders = JSON.parse(localStorage.getItem("spice_orders")) || [];
    if (orders[index]) {
        orders[index].status = status;
        localStorage.setItem("spice_orders", JSON.stringify(orders));

        renderOrdersList();
        renderOverviewRecent();
        loadDashboardStats();
    }
}

function renderReservationsList() {
    const resList = document.getElementById("admin-reservations-list");
    if (!resList) return;

    const reservations = JSON.parse(localStorage.getItem("spice_reservations")) || [];
    resList.innerHTML = "";

    if (reservations.length === 0) {
        resList.innerHTML = `<tr><td colspan="9" style="text-align:center; padding: 2rem;">No reservations registered.</td></tr>`;
        return;
    }

    reservations.slice().reverse().forEach((res, index) => {
        const originalIndex = reservations.length - 1 - index;

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>${res.id}</strong></td>
            <td><strong>${res.date}</strong></td>
            <td><strong>${res.time}</strong></td>
            <td>${res.name}</td>
            <td>
                <small><i class="fas fa-phone"></i> ${res.phone}</small><br>
                <small><i class="fas fa-envelope"></i> ${res.email}</small>
            </td>
            <td><strong>${res.guests} Guests</strong></td>
            <td style="max-width: 150px; font-size: 0.8rem; font-style: italic;">"${res.message}"</td>
            <td><span class="status-pill ${res.status.toLowerCase()}">${res.status}</span></td>
            <td>
                <div style="display:flex; gap:0.4rem;">
                    ${getResActions(res.status, originalIndex)}
                </div>
            </td>
        `;
        resList.appendChild(tr);
    });

    bindResActionListeners();
}

function getResActions(status, index) {
    if (status === "Confirmed") {
        return `
            <button class="btn btn-success res-status-btn" data-index="${index}" data-status="Completed"><i class="fas fa-check"></i> Complete</button>
            <button class="btn btn-delete res-status-btn" data-index="${index}" data-status="Cancelled"><i class="fas fa-ban"></i> Cancel</button>
        `;
    }
    return `<small style="color:var(--text-secondary);">No action</small>`;
}

function bindResActionListeners() {
    document.querySelectorAll(".res-status-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const index = parseInt(btn.getAttribute("data-index"));
            const newStatus = btn.getAttribute("data-status");
            updateResStatus(index, newStatus);
        });
    });
}

function updateResStatus(index, status) {
    const reservations = JSON.parse(localStorage.getItem("spice_reservations")) || [];
    if (reservations[index]) {
        reservations[index].status = status;
        localStorage.setItem("spice_reservations", JSON.stringify(reservations));

        renderReservationsList();
        renderOverviewRecent();
        loadDashboardStats();
    }
}
