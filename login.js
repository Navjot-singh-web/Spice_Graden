const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

loginBtn.addEventListener("click", () => {
    loginForm.classList.add("active");
    registerForm.classList.remove("active");

    loginBtn.classList.add("active");
    registerBtn.classList.remove("active");
});

registerBtn.addEventListener("click", () => {
    registerForm.classList.add("active");
    loginForm.classList.remove("active");

    registerBtn.classList.add("active");
    loginBtn.classList.remove("active");
});

function getUsers() {
    const users = localStorage.getItem("spice_users");
    return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
    localStorage.setItem("spice_users", JSON.stringify(users));
}

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const userID = document.getElementById("loginUserID").value.trim().toLowerCase();
    const pass = document.getElementById("loginPassword").value.trim();
    const error = document.getElementById("loginError");

    if (userID === "admin@example.com" && pass === "1234") {
        alert("Admin Login Successful! Redirecting to Dashboard...");

        const adminSession = {
            email: "admin@example.com",
            name: "Admin Dashboard",
            role: "admin"
        };
        localStorage.setItem("spice_current_user", JSON.stringify(adminSession));

        error.textContent = "";
        window.location.href = "./admin.html";
        return;
    }

    if (userID === "user@example.com" && pass === "12345678") {
        alert("Login Successful! Redirecting to Spice Garden...");

        const userSession = {
            email: "user@example.com",
            name: "User Dashboard ",
            role: "user"
        };
        localStorage.setItem("spice_current_user", JSON.stringify(userSession));

        error.textContent = "";
        window.location.href = "./index.html";
        return;
    }

    const users = getUsers();
    const matchedUser = users.find(u => u.email.toLowerCase() === userID && u.password === pass);

    if (matchedUser) {
        alert(`Welcome back, ${matchedUser.name}! Login Successful!`);

        const userSession = {
            email: matchedUser.email,
            name: matchedUser.name,
            role: "user"
        };
        localStorage.setItem("spice_current_user", JSON.stringify(userSession));

        error.textContent = "";
        window.location.href = "./index.html";
    } else {
        error.textContent = "Invalid User ID or Password.";
    }
});

registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const userName = document.getElementById("regUserName").value.trim();
    const email = document.getElementById("regUserEmail").value.trim();
    const mobile = document.getElementById("regMobileNo").value.trim();
    const countryCode = document.getElementById("countryCode").value.trim();
    const pass = document.getElementById("regPassword").value.trim();
    const error = document.getElementById("registerError");

    if (userName && email && mobile && pass) {
        const users = getUsers();
        const emailExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
        if (emailExists) {
            error.textContent = "Email is already registered. Please login.";
            return;
        }

        const newUser = {
            name: userName,
            email: email,
            phone: `${countryCode} ${mobile}`,
            password: pass
        };

        users.push(newUser);
        saveUsers(users);

        alert(`Registration Successful!\nWelcome ${userName}. You can now login.`);
        error.textContent = "";

        registerForm.reset();
        loginBtn.click();
    } else {
        error.textContent = "Please fill all fields.";
    }
});
