(async () => {
    const backendUrl = "https://spandanbackend.onrender.com"; // Your Render backend URL1

    // DOM elements for displaying gyroscopic data
    const alphaElement = document.getElementById("alpha");
    const betaElement = document.getElementById("beta");
    const gammaElement = document.getElementById("gamma");

    // Function to send gyroscopic data to the backend
    const sendGyroData = async (gyroData) => {
        try {
            const response = await fetch(`${backendUrl}/gyro-data`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(gyroData)
            });
            console.log("Response from Backend:", await response.text());
        } catch (error) {
            console.error("Error sending gyroscopic data:", error);
        }
    };

    // Capture gyroscopic data
    if (window.DeviceOrientationEvent) {
        window.addEventListener("deviceorientation", async (event) => {
            if (event.alpha !== null && event.beta !== null && event.gamma !== null) {
                const gyroData = {
                    alpha: event.alpha.toFixed(2),
                    beta: event.beta.toFixed(2),
                    gamma: event.gamma.toFixed(2)
                };

                // Display gyroscopic values on the website
                alphaElement.textContent = gyroData.alpha;
                betaElement.textContent = gyroData.beta;
                gammaElement.textContent = gyroData.gamma;

                // Send gyroscopic data to the backend
                await sendGyroData(gyroData);
            }
        });
    } else {
        alert("Device Orientation is not supported on this device.");
        console.error("Device Orientation is not supported by the browser.");
    }

    // Poll the backend every 1 second to fetch the latest data
    const fetchGyroData = async () => {
        try {
            const response = await fetch(`${backendUrl}/gyro-data`);
            if (response.ok) {
                const data = await response.json();
                console.log("Gyro Data Fetched from Backend:", data);

                // Update UI with fetched data
                alphaElement.textContent = data.alpha;
                betaElement.textContent = data.beta;
                gammaElement.textContent = data.gamma;
            } else {
                console.error("Failed to fetch gyro data:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching gyro data:", error);
        }
    };

    setInterval(fetchGyroData, 5); // Poll every 1 second
})();
