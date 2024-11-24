document.addEventListener("DOMContentLoaded", () => {
    console.log("Reservation.js loaded");

    // Track if a request is in process to avoid multiple submissions
    let isSubmitting = false;

    const reservationForm = document.querySelector("form.my-5");
    if (reservationForm) {
        // Use a named function instead of inline to remove ambiguity
        const handleSubmit = async (event) => {
            event.preventDefault();

            // Prevent multiple submissions
            if (isSubmitting) {
                return;
            }

            // Set submitting flag to true to prevent multiple submissions
            isSubmitting = true;

            // Disable the submit button to prevent double submission
            const submitButton = reservationForm.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
            }

            const user_id = localStorage.getItem("user_id");
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const adults = document.getElementById("adults").value.trim();
            const children = document.getElementById("children").value.trim();
            const date = document.getElementById("date").value;
            const time = document.getElementById("time").value;
            const comments = document.getElementById("comments").value.trim();

            if ((!user_id && (!name || !email)) || !adults || !date || !time) {
                alert("All required fields must be provided.");
                isSubmitting = false;
                if (submitButton) {
                    submitButton.disabled = false;
                }
                return;
            }

            const reservationData = {
                user_id: user_id ? parseInt(user_id, 10) : null,
                name,
                email,
                adults: parseInt(adults, 10),
                children: children ? parseInt(children, 10) : 0,
                reservation_date: date,
                reservation_time: time,
                special_request: comments || "",
            };

            console.log("Reservation Data Sent:", reservationData);

            try {
                const response = await fetch("http://localhost:5000/reservation", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(reservationData),
                });

                if (response.ok) {
                    alert("Reservation successful!");
                    reservationForm.reset();
                } else {
                    const result = await response.json();
                    console.error("Reservation Error:", result);
                    alert(`Error: ${result.message || "Unable to process your reservation."}`);
                }
            } catch (error) {
                console.error("Error in POST request to /reservation:", error);
                alert("An unexpected error occurred. Please try again later.");
            }

            // Add a short delay before allowing resubmission
            setTimeout(() => {
                isSubmitting = false;
                if (submitButton) {
                    submitButton.disabled = false;
                }
            }, 100); // Small delay to prevent race conditions
        };

        // Ensure only one event listener is added
        reservationForm.addEventListener("submit", handleSubmit);
    }
});
