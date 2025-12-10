// scripts/chatbot.js
document.addEventListener("DOMContentLoaded", function() {
    const sendButton = document.getElementById("send-button");
    const userInput = document.getElementById("user-input");
    const chatOutput = document.getElementById("chat-output");

//IT IS FOR TESTING PURPOSE, DO NOT DO IT LIKE THAT!!!  
const apiKey = ""; // Replace with your actual OpenAI API key

    sendButton.addEventListener("click", () => sendMessage());
    userInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = userInput.value.trim();
        if (message === "") return;

        // Display the user's message
        appendMessage("You", message);

        // Clear input
        userInput.value = "";

        // Send the message to OpenAI API
        fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo", // or "gpt-4" if you have access
                messages: [
                    { role: "user", content: message }
                ],
                max_tokens: 150,
                temperature: 0.7
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const botMessage = data.choices[0].message.content.trim();
            appendMessage("Bot", botMessage);
        })
        .catch(error => {
            alert(error)
            appendMessage("Bot", "Sorry, something went wrong.");
        });
    }

    function appendMessage(sender, message) {
        const messageElement = document.createElement("div");
        messageElement.textContent = `${sender}: ${message}`;
        chatOutput.appendChild(messageElement);
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }
});

