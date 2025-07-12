// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
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
document.getElementById('send-button').addEventListener('click', function () {
    const input = document.getElementById('user-input');
    const message = input.value.trim();

    if (message !== '') {
        // Add user's message to the chatbot window
        const userMsg = document.createElement('div');
        userMsg.className = 'bot-message';
        userMsg.style.alignSelf = 'flex-end';
        userMsg.style.backgroundColor = '#dcf8c6'; // WhatsApp green
        userMsg.innerText = message;
        document.getElementById('chatbot-messages').appendChild(userMsg);

        // Open WhatsApp link
        const whatsappURL = `https://wa.me/919321609760?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');

        input.value = '';
    }
});


// Simple chatbot responses
const botResponses = {
    "hello": "Hello there! How can I help you today?",
    "hi": "Hi! What can I do for you?",
    "how are you": "I'm just a bot, but I'm functioning well! How about you?",
    "students": "You can find all our batchmates on the Students page. Click the link in the navigation!",
    "projects": "Many students are working on interesting projects. Check their individual pages for details.",
    "college": "Datta Meghe College of Engineering is our alma mater. What would you like to know about it?",
    "help": "I can provide information about our batch, students, and college. Just ask me anything!",
    "default": "I'm not sure I understand. Could you rephrase that?"
};

function addUserMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('user-message');
    messageDiv.textContent = message;
    chatbotMessages.appendChild(messageDiv);
    userInput.value = '';
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function addBotMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('bot-message');
    messageDiv.textContent = message;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function processUserInput() {
    const message = userInput.value.trim().toLowerCase();
    if (message === '') return;
    
    addUserMessage(message);
    
    // Simple response logic
    let response = botResponses.default;
    for (const key in botResponses) {
        if (message.includes(key)) {
            response = botResponses[key];
            break;
        }
    }
    
    // Simulate typing delay
    setTimeout(() => {
        addBotMessage(response);
    }, 800);
}

sendButton.addEventListener('click', processUserInput);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        processUserInput();
    }
});

// Add some initial bot messages to guide users
setTimeout(() => {
    addBotMessage("You can ask me about our batch, students, or college.");
}, 2000);