// Function to count down and display remaining time in console every five seconds
function countdownReload() {
    let remainingTime = 100000; // 100000 milliseconds = 100 seconds
    const interval = 15000; // 5000 milliseconds = 5 seconds

    const countdownInterval = setInterval(function() {
        console.clear(); // Clear previous console messages
        remainingTime -= interval;
        if (remainingTime > 0) {
            console.log("⏰ - " + remainingTime / 1000 + " Sekunttia sivun uudelleen lataamiseen.");
        } else {
            clearInterval(countdownInterval); // Stop the countdown when it reaches 0
            console.log("Reloading the page now...");
            location.reload(true); // Reload the page
        }
    }, interval);
}

// Call the function initially to start the countdown
countdownReload();
