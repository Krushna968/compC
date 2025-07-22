// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Chatbot functionality
const sendButton = document.getElementById("send-button");
const userInput = document.getElementById("user-input");
const chatbotMessages = document.getElementById("chatbot-messages");

function addUserMessage(message) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("user-message");
    messageDiv.textContent = message;
    chatbotMessages.appendChild(messageDiv);
    scrollToBottom();
}

function addBotMessage(message) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("bot-message");
    messageDiv.textContent = message;
    chatbotMessages.appendChild(messageDiv);
    scrollToBottom();
}

function scrollToBottom() {
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function sendMessage() {
    const message = userInput.value.trim();
    if (message === "") return;

    addUserMessage(message);
    userInput.value = "";

    fetch("https://compc-4.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
    })
    .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
    })
    .then(data => {
        addBotMessage(data.reply);
    })
    .catch(err => {
        addBotMessage("Oops! Something went wrong. Please try again.");
        console.error("Chatbot error:", err);
    });
}

// ========== ENHANCED JAVA COMPILER FUNCTIONALITY ==========
async function runJavaCode(code, className = null) {
    try {
        // Auto-detect class name if not provided
        if (!className) {
            const classMatch = code.match(/public\s+class\s+(\w+)/);
            if (classMatch) className = classMatch[1];
        }

        if (!className) {
            return { 
                success: false,
                output: "Error: Could not determine class name. Please ensure your code has a public class."
            };
        }

        const response = await fetch("https://compc-4.onrender.com/run", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code, className })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        return {
            success: true,
            output: result.output || result.compile_output || result.stderr || "No output generated",
            className: className
        };
    } catch (err) {
        console.error("Java compilation error:", err);
        return {
            success: false,
            output: `Error: ${err.message}`
        };
    }
}

// Example usage (you would call this from your compiler UI):
// runJavaCode(javaCodeString).then(result => {
//     if (result.success) {
//         console.log("Output:", result.output);
//     } else {
//         console.error("Error:", result.output);
//     }
// });

// Event listeners
sendButton.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});


function validateClassName(filename, content) {
    const className = filename.replace('.java', '');
    if (!content.includes(`class ${className}`)) {
        return false;
    }
    return true;
}