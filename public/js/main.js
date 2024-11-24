document.addEventListener("DOMContentLoaded", () => {
    console.log("Main.js loaded");

    async function postData(url = "", data = {}) {
        try {
            const response = await fetch(`http://localhost:5000${url}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "An error occurred.");
            }
            return result;
        } catch (error) {
            console.error(`Error in POST request to ${url}:`, error);
            throw error;
        }
    }

    const reservationForm = document.querySelector("form.my-5");
    if (reservationForm) {
        reservationForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const user_id = localStorage.getItem("user_id");
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const adults = document.getElementById("adults").value.trim();
            const children = document.getElementById("children").value.trim();
            const guests = parseInt(adults, 10) + (children ? parseInt(children, 10) : 0); // Calculate total guests
            const date = document.getElementById("date").value;
            const time = document.getElementById("time").value;
            const comments = document.getElementById("comments").value.trim();

            if ((!user_id && (!name || !email)) || !adults || !date || !time) {
                alert("All required fields must be provided.");
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
                guests,
            };

            console.log("Reservation Data Sent:", reservationData);

            try {
                await postData("/reservation", reservationData);
                alert("Reservation successful!");
                reservationForm.reset();
            } catch (error) {
                alert(`Reservation failed: ${error.message}`);
            }
        });
    }

    console.log("All listeners initialized");
});
