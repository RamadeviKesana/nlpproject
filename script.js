// Load Particles.js configuration
particlesJS.load('particles-js', '/static/particles.json', function () {
    console.log('Particles.js loaded successfully.');
});

// Add default bot greeting on page load
document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chat-box");

    // Create the initial bot message
    const botGreeting = document.createElement("div");
    botGreeting.className = "message bot-message";
    botGreeting.textContent = "Hello! I'm here to help you analyze tourism-related reviews. Just type a review to get started!";

    // Append the greeting to the chat box
    chatBox.appendChild(botGreeting);
});

// Function to handle sending a message
async function sendMessage() {
    const userInput = document.getElementById("user-input").value.trim();

    if (!userInput) {
        alert("Please enter a message.");
        return;
    }

    // Display user's message
    const chatBox = document.getElementById("chat-box");
    const userMessage = document.createElement("div");
    userMessage.className = "message user-message";
    userMessage.textContent = userInput;
    chatBox.appendChild(userMessage);

    // Clear input field
    document.getElementById("user-input").value = "";

    // Add bot typing indicator
    const botTyping = document.createElement("div");
    botTyping.className = "message bot-message";
    botTyping.textContent = "...";
    chatBox.appendChild(botTyping);

    // Scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        // Send message to backend
        const response = await fetch("/send_message", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userInput }),
        });

        const data = await response.json();

        // Remove bot typing indicator
        botTyping.remove();

        // Display bot response
        const botMessage = document.createElement("div");
        botMessage.className = "message bot-message";
        botMessage.textContent = data.response;
        chatBox.appendChild(botMessage);

        // Scroll to bottom
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        console.error("Error:", error);
        botTyping.remove();

        // Display error message
        const errorMessage = document.createElement("div");
        errorMessage.className = "message bot-message";
        errorMessage.textContent = "An error occurred. Please try again later.";
        chatBox.appendChild(errorMessage);
    }
}

// Event listener for the send button
document.getElementById("send-button").addEventListener("click", sendMessage);

// Event listener for the Enter key
document.getElementById("user-input").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent default form submission
        sendMessage(); // Call sendMessage function
    }
});
