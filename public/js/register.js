document.addEventListener("DOMContentLoaded", () => {
    console.log("Register.js loaded");

    const registerForm = document.querySelector("#registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            // Retrieve form data
            const fullName = document.getElementById("name").value.trim();
            const dob = document.getElementById("dob").value;
            const contact = document.getElementById("contact").value.trim();
            const address = document.getElementById("address").value.trim();
            const email = document.getElementById("emailRegister").value.trim();
            const password = document.getElementById("passwordRegister").value.trim();
            const confirmPassword = document.getElementById("confirmPassword").value.trim();

            // Basic validation
            if (password !== confirmPassword) {
                alert("Passwords do not match. Please try again.");
                return;
            }

            const registrationData = {
                full_name: fullName,
                date_of_birth: dob,
                contact_number: parseInt(contact, 10),
                address,
                email,
                password,
            };

            try {
                // Make a request to register the user
                const response = await fetch("http://localhost:5000/auth/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(registrationData),
                });

                if (response.ok) {
                    // Hide the registration modal and show success modal
                    $('#registerModal').modal('hide');  // Hide the registration modal first
                    setTimeout(() => {
                        $('#registerSuccessModal').modal('show'); // Show the success modal
                    }, 500);  // Add a slight delay to ensure smooth transition
                    
                    // Reset the form after a successful registration
                    registerForm.reset();
                } else {
                    // Handle errors
                    const result = await response.json();
                    console.error("Registration Error:", result);
                    alert(`Error: ${result.message || "Unable to register."}`);
                }
            } catch (error) {
                console.error("Error in POST request to /auth/register:", error);
                alert("An unexpected error occurred. Please try again later.");
            }
        });
    }
});
