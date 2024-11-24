document.addEventListener("DOMContentLoaded", () => {
    console.log("ForgotPassword.js loaded");

    const forgotPasswordForm = document.querySelector("#forgotPasswordForm");
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const email = document.getElementById("forgotEmail").value.trim();

            if (!email) {
                alert("Please enter your registered email address.");
                return;
            }

            try {
                const response = await fetch("http://localhost:5000/auth/forgot-password", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email }),
                });

                if (response.ok) {
                    // Success: Display a success message to the user
                    $('#forgotPasswordModal').modal('hide');  // Hide the modal first
                    setTimeout(() => {
                        alert("A reset link has been sent to your email address. Please check your inbox.");
                    }, 500);
                    forgotPasswordForm.reset();  // Clear the form
                } else {
                    // Handle errors (e.g., invalid email or user not found)
                    const result = await response.json();
                    console.error("Forgot Password Error:", result);
                    alert(`Error: ${result.message || "Unable to process your request."}`);
                }
            } catch (error) {
                console.error("Error in POST request to /auth/forgot-password:", error);
                alert("An unexpected error occurred. Please try again later.");
            }
        });
    }
});
