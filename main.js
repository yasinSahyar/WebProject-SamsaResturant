document.addEventListener("DOMContentLoaded", function () {
    // Utility function for API calls
    const apiRequest = async (url, method, body) => {
        try {
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const result = await response.json();
            return { response, result };
        } catch (error) {
            console.error(`Error with ${url}:`, error);
            alert("An error occurred. Please try again.");
            return { response: null, result: null };
        }
    };

    // Login Form Submission
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;

            const { response, result } = await apiRequest("http://localhost:5000/login", "POST", { email, password });
            if (response && response.ok) {
                alert(result.message);
                localStorage.setItem("token", result.token); // Store token locally
                $("#loginModal").modal("hide");
                loginForm.reset(); // Clear form fields
            } else {
                alert(result.message || "Login failed.");
            }
        });
    }

    // Registration Form Submission
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const full_name = document.getElementById("registerName").value;
            const date_of_birth = document.getElementById("registerDOB").value;
            const contact_number = document.getElementById("registerContact").value;
            const address = document.getElementById("registerAddress").value;
            const email = document.getElementById("registerEmail").value;
            const password = document.getElementById("registerPassword").value;
            const confirmPassword = document.getElementById("confirmPassword").value;

            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            const { response, result } = await apiRequest("http://localhost:5000/register", "POST", {
                full_name,
                date_of_birth,
                contact_number,
                address,
                email,
                password,
            });
            if (response && response.ok) {
                alert(result.message);
                $("#registerModal").modal("hide");
                registerForm.reset();
            } else {
                alert(result.message || "Registration failed.");
            }
        });
    }

    // Forgot Password Form Submission
    const forgotPasswordForm = document.getElementById("forgotPasswordForm");
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const email = document.getElementById("forgotEmail").value;

            const { response, result } = await apiRequest("http://localhost:5000/forgot-password", "POST", { email });
            if (response && response.ok) {
                alert(result.message);
                $("#forgotPasswordModal").modal("hide");
                forgotPasswordForm.reset();
            } else {
                alert(result.message || "Failed to reset password.");
            }
        });
    }

    // Reservation Form Submission
    const reservationForm = document.getElementById("reservationForm");
    if (reservationForm) {
        reservationForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const name = document.getElementById("reservationName").value;
            const email = document.getElementById("reservationEmail").value;
            const date = document.getElementById("reservationDate").value;
            const time = document.getElementById("reservationTime").value;
            const guests = document.getElementById("reservationGuests").value;
            const message = document.getElementById("reservationMessage").value;

            const { response, result } = await apiRequest("http://localhost:5000/reservation", "POST", {
                name,
                email,
                date,
                time,
                guests,
                message,
            });
            if (response && response.ok) {
                alert(result.message);
                reservationForm.reset();
            } else {
                alert(result.message || "Reservation failed.");
            }
        });
    }
});
