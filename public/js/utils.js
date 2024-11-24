window.postData = async function (url = "", data = {}) {
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
};
