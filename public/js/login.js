document.addEventListener("DOMContentLoaded", () => {
    console.log("Login.js loaded");

    const loginForm = document.querySelector("#loginForm");
    const userDisplay = document.querySelector("#userDisplay");

    // Check if the user is already logged in (from localStorage)
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
        const user = JSON.parse(storedUser);
        updateUserDisplay(user.full_name);
    }

    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const email = document.getElementById("loginEmail").value.trim();
            const password = document.getElementById("loginPassword").value.trim();

            // Basic validation
            if (!email || !password) {
                alert("Both email and password are required.");
                return;
            }

            try {
                const response = await fetch("http://localhost:5000/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                });

                if (response.ok) {
                    const result = await response.json();
                    localStorage.setItem("loggedInUser", JSON.stringify(result));
                    updateUserDisplay(result.full_name);

                    // Hide the login modal after login
                    $('#loginModal').modal('hide');
                } else {
                    const error = await response.json();
                    console.error("Login Error:", error);
                    alert(`Error: ${error.message || "Unable to login."}`);
                }
            } catch (error) {
                console.error("Error in POST request to /auth/login:", error);
                alert("An unexpected error occurred. Please try again later.");
            }
        });
    }

    // Function to update the user display in the navbar
    function updateUserDisplay(fullName) {
        if (userDisplay) {
            userDisplay.innerHTML = `
                <span>Welcome, ${fullName}</span>
                <a href="#" id="logoutLink" class="ml-3">(Logout)</a>
            `;
            addLogoutListener();
        }
    }

    // Function to add logout event listener
    function addLogoutListener() {
        const logoutLink = document.getElementById("logoutLink");
        if (logoutLink) {
            logoutLink.addEventListener("click", (event) => {
                event.preventDefault();
                localStorage.removeItem("loggedInUser");
                location.reload(); // Reload the page to show login link again
            });
        }
    }
});
