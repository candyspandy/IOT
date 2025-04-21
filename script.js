// Frontend script to capture gyroscopic data, display it, and send it to the backend
(async () => {
    const backendUrl = "https://spandanbackend.onrender.com/gyro-data"; // Replace with your Render backend URL

    // DOM elements for displaying gyroscopic data
    const alphaElement = document.getElementById("alpha");
    const betaElement = document.getElementById("beta");
    const gammaElement = document.getElementById("gamma");

    // Check if DeviceOrientationEvent is supported
    if (window.DeviceOrientationEvent) {
        // Add a listener for device orientation events
        window.addEventListener("deviceorientation", async (event) => {
            // Ensure we have valid gyroscopic data
            if (event.alpha !== null && event.beta !== null && event.gamma !== null) {
                const gyroData = {
                    alpha: event.alpha.toFixed(2), // Rotation around Z-axis
                    beta: event.beta.toFixed(2),   // Rotation around X-axis
                    gamma: event.gamma.toFixed(2)  // Rotation around Y-axis
                };

                // Display gyroscopic values on the website
                alphaElement.textContent = gyroData.alpha;
                betaElement.textContent = gyroData.beta;
                gammaElement.textContent = gyroData.gamma;

                try {
                    // Send gyroscopic data to the backend
                    await fetch(backendUrl, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(gyroData)
                    });
                } catch (error) {
                    console.error("Error sending gyroscopic data:", error);
                }
            }
        });
    } else {
        // If DeviceOrientationEvent is not supported
        alert("Device Orientation is not supported on this device.");
        console.error("Device Orientation is not supported by the browser.");
    }
})();