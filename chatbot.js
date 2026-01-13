// Garage Service Chatbot
class GarageChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.init();
    }

    init() {
        this.createChatInterface();
        this.addEventListeners();
        this.addBotMessage("Hello 👋 Welcome to Raj Alignment Service!<br>How can I help you today — servicing, repair, or booking an appointment?");
    }

    createChatInterface() {
        // Create chat container
        const chatContainer = document.createElement('div');
        chatContainer.className = 'garage-chatbot';
        chatContainer.innerHTML = `
            <div class="chat-header">
                <div class="chat-title">
                    <span class="chat-icon">🔧</span>
                    <span>Raj Alignment Service</span>
                </div>
                <button class="chat-toggle" onclick="garageChatbot.toggleChat()">×</button>
            </div>
            <div class="chat-body">
                <div class="chat-messages" id="chatMessages"></div>
                <div class="chat-input-container">
                    <input type="text" id="chatInput" placeholder="Type your message..." />
                    <button onclick="garageChatbot.sendMessage()">➤</button>
                </div>
            </div>
        `;
        document.body.appendChild(chatContainer);

        // Create floating button
        const floatingButton = document.createElement('div');
        floatingButton.className = 'chat-floating-button';
        floatingButton.innerHTML = `
            <span class="chat-icon">💬</span>
            <span>Chat with us</span>
        `;
        floatingButton.onclick = () => this.openChat();
        document.body.appendChild(floatingButton);
    }

    addEventListeners() {
        const input = document.getElementById('chatInput');
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }
    }

    toggleChat() {
        const chatContainer = document.querySelector('.garage-chatbot');
        if (chatContainer) {
            chatContainer.classList.toggle('chat-open');
            this.isOpen = !this.isOpen;
        }
    }

    openChat() {
        const chatContainer = document.querySelector('.garage-chatbot');
        const floatingButton = document.querySelector('.chat-floating-button');
        if (chatContainer && floatingButton) {
            chatContainer.classList.add('chat-open');
            floatingButton.style.display = 'none';
            this.isOpen = true;
        }
    }

    closeChat() {
        const chatContainer = document.querySelector('.garage-chatbot');
        const floatingButton = document.querySelector('.chat-floating-button');
        if (chatContainer && floatingButton) {
            chatContainer.classList.remove('chat-open');
            floatingButton.style.display = 'flex';
            this.isOpen = false;
        }
    }

    sendMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (!message) return;

        this.addUserMessage(message);
        input.value = '';

        // Process message and generate response
        setTimeout(() => {
            const response = this.generateResponse(message);
            this.addBotMessage(response);
        }, 1000);
    }

    addUserMessage(message) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageElement = document.createElement('div');
        messageElement.className = 'message user-message';
        messageElement.innerHTML = `
            <div class="message-content">${message}</div>
            <div class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
        `;
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    addBotMessage(message) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageElement = document.createElement('div');
        messageElement.className = 'message bot-message';
        messageElement.innerHTML = `
            <div class="message-content">${message}</div>
            <div class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
        `;
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    generateResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Service related queries
        if (message.includes('service') || message.includes('servicing')) {
            return this.handleServiceQuery(message);
        }
        
        // Booking related queries
        if (message.includes('book') || message.includes('appointment') || message.includes('schedule')) {
            return this.handleBookingQuery();
        }
        
        // Cost related queries
        if (message.includes('cost') || message.includes('price') || message.includes('rate')) {
            return this.handleCostQuery();
        }
        
        // Time related queries
        if (message.includes('time') || message.includes('duration') || message.includes('how long')) {
            return this.handleTimeQuery();
        }
        
        // Location/Contact queries
        if (message.includes('location') || message.includes('address') || message.includes('contact')) {
            return this.handleLocationQuery();
        }
        
        // Emergency queries
        if (message.includes('emergency') || message.includes('urgent') || message.includes('breakdown')) {
            return this.handleEmergencyQuery();
        }
        
        // Default response
        return this.handleDefaultQuery();
    }

    handleServiceQuery(message) {
        if (message.includes('bike')) {
            return `🏍️ **Bike Servicing Available:**
<br>• Fork alignment
<br>• Chassis alignment  
<br>• Mac wheel repair
<br>• Expert repairs
<br>• Performance-focused maintenance

<br>What type of bike service do you need?`;
        }
        
        if (message.includes('car')) {
            return `🚗 **Car Servicing Available:**
<br>• General servicing & maintenance
<br>• Engine repair & diagnostics
<br>• Wheel alignment & balancing
<br>• Brake service & repair
<br>• Oil change & filter replacement
<br>• Pickup & drop service available

<br>What type of car service do you need?`;
        }
        
        return `🔧 **Our Services:**
<br>🏍️ **Bike Servicing:** Fork alignment, Chassis alignment, Mac wheel repair
<br>🚗 **Car Servicing:** Full service & diagnostics
<br>⚙️ **Engine Repair:** Expert engine solutions
<br>🎯 **Wheel Alignment:** Precision alignment service
<br>🛢️ **Oil Change:** Quick oil & filter service
<br>🛑 **Brake Service:** Complete brake solutions
<br>🚚 **Pickup & Drop:** Convenient service

<br>Which service would you like to know more about?`;
    }

    handleBookingQuery() {
        return `📅 **Book Your Service:**
<br>To book your appointment, I need some details:

<br>1. Vehicle type (Bike/Car)
<br>2. Brand & model
<br>3. Service needed
<br>4. Preferred date & time

<br>Or call us directly at: **9762046636**
<br>WhatsApp: **9762046636**

<br>Would you like to book now?`;
    }

    handleCostQuery() {
        return `💰 **Service Cost Estimates:**
<br>🏍️ **Bike Service:** ₹500 - ₹2000
<br>🚗 **Car Service:** ₹1000 - ₹5000
<br>⚙️ **Engine Repair:** ₹1500 - ₹8000
<br>🎯 **Wheel Alignment:** ₹300 - ₹800
<br>🛢️ **Oil Change:** ₹200 - ₹600
<br>🛑 **Brake Service:** ₹400 - ₹1500

<br>*Final cost depends on vehicle condition and parts needed.*

<br>For exact pricing, our technician will confirm after inspection.`;
    }

    handleTimeQuery() {
        return `⏰ **Service Duration:**
<br>🏍️ **Bike Service:** 2-4 hours
<br>🚗 **Car Service:** 3-6 hours
<br>⚙️ **Engine Repair:** 4-8 hours
<br>🎯 **Wheel Alignment:** 30-60 minutes
<br>🛢️ **Oil Change:** 30-45 minutes
<br>🛑 **Brake Service:** 1-3 hours

<br>*Time may vary based on vehicle condition.*

<br>**Working Hours:**
<br>Tuesday - Saturday: 10AM - 7PM
<br>Monday & Sunday: Closed`;
    }

    handleLocationQuery() {
        return `📍 **Our Location & Contact:**
<br>🏢 **Raj Alignment**
<br>Medi Point, Opp. Chandnagar
<br>Kharadi, Pune

<br>📞 **Call:** 9762046636
<br>💬 **WhatsApp:** 9762046636
<br>🕐 **Hours:** Tue-Sat 10AM-7PM

<br>🚚 **Pickup & Drop:** Available within city limits

<br>Would you like directions or want to book a pickup?`;
    }

    handleEmergencyQuery() {
        return `🚨 **For urgent service needs:**

<br>📞 **Call:** 9762046636
<br>💬 **WhatsApp:** 9762046636

<br>We provide:
<br>⚡ Quick response time
<br>🚚 Pickup service
<br>🔧 Expert repairs
<br>🏠 Safe drop-off

<br>**Available:** Tuesday - Saturday 10AM-7PM
<br>**Closed:** Monday & Sunday

<br>Please describe your urgent service need when calling!`;
    }

    handleDefaultQuery() {
        return `👋 **I'm here to help!**

<br>I can assist with:
<br>🔧 Service information
<br>📅 Booking appointments
<br>💰 Cost estimates
<br>⏰ Service duration
<br>📍 Location & contact
<br>🚨 Urgent service

<br>What would you like to know about our garage services?

<br>Or call us directly: **9762046636**`;
    }
}

// Initialize chatbot when page loads
let garageChatbot;
document.addEventListener('DOMContentLoaded', () => {
    garageChatbot = new GarageChatbot();
});
