// Simple Garage Chatbot - Standalone Version
(function() {
    let chatbot = {
        isOpen: false,
        
        init: function() {
            this.createChatInterface();
            this.addEventListeners();
            this.addBotMessage("Hello 👋 Welcome to Raj Alignment Service!<br>How can I help you today — servicing, repair, or booking an appointment?");
        },
        
        createChatInterface: function() {
            // Remove existing chat if any
            const existingChat = document.querySelector('.garage-chatbot');
            const existingButton = document.querySelector('.chat-floating-button');
            if (existingChat) existingChat.remove();
            if (existingButton) existingButton.remove();
            
            // Create chat container
            const chatContainer = document.createElement('div');
            chatContainer.className = 'garage-chatbot';
            chatContainer.innerHTML = `
                <div class="chat-header">
                    <div class="chat-title">
                        <span class="chat-icon">🔧</span>
                        <span>Raj Alignment Service</span>
                    </div>
                    <button class="chat-toggle" onclick="chatbot.toggleChat()">×</button>
                </div>
                <div class="chat-body">
                    <div class="chat-messages" id="chatMessages"></div>
                    <div class="chat-input-container">
                        <input type="text" id="chatInput" placeholder="Type your message..." />
                        <button onclick="chatbot.sendMessage()">➤</button>
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
        },
        
        addEventListeners: function() {
            const input = document.getElementById('chatInput');
            if (input) {
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        this.sendMessage();
                    }
                });
            }
        },
        
        toggleChat: function() {
            const chatContainer = document.querySelector('.garage-chatbot');
            const floatingButton = document.querySelector('.chat-floating-button');
            if (chatContainer && floatingButton) {
                chatContainer.classList.toggle('chat-open');
                this.isOpen = !this.isOpen;
                if (this.isOpen) {
                    floatingButton.style.display = 'none';
                } else {
                    floatingButton.style.display = 'flex';
                }
            }
        },
        
        openChat: function() {
            const chatContainer = document.querySelector('.garage-chatbot');
            const floatingButton = document.querySelector('.chat-floating-button');
            if (chatContainer && floatingButton) {
                chatContainer.classList.add('chat-open');
                floatingButton.style.display = 'none';
                this.isOpen = true;
            }
        },
        
        closeChat: function() {
            const chatContainer = document.querySelector('.garage-chatbot');
            const floatingButton = document.querySelector('.chat-floating-button');
            if (chatContainer && floatingButton) {
                chatContainer.classList.remove('chat-open');
                floatingButton.style.display = 'flex';
                this.isOpen = false;
            }
        },
        
        sendMessage: function() {
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
        },
        
        addUserMessage: function(message) {
            const messagesContainer = document.getElementById('chatMessages');
            const messageElement = document.createElement('div');
            messageElement.className = 'message user-message';
            messageElement.innerHTML = `
                <div class="message-content">${message}</div>
                <div class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
            `;
            messagesContainer.appendChild(messageElement);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        },
        
        addBotMessage: function(message) {
            const messagesContainer = document.getElementById('chatMessages');
            const messageElement = document.createElement('div');
            messageElement.className = 'message bot-message';
            messageElement.innerHTML = `
                <div class="message-content">${message}</div>
                <div class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
            `;
            messagesContainer.appendChild(messageElement);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        },
        
        generateResponse: function(userMessage) {
            const message = userMessage.toLowerCase();
            
            // Service related queries
            if (message.includes('service') || message.includes('servicing')) {
                return `🏍️ **Bike Servicing Available:**
<br>• Fork alignment
<br>• Chassis alignment  
<br>• Mac wheel repair
<br>• Expert repairs
<br>• Performance-focused maintenance

<br>What type of bike service do you need?`;
            }
            
            // Booking related queries
            if (message.includes('book') || message.includes('appointment') || message.includes('schedule')) {
                return `📅 **Book Your Service:**
<br>To book your appointment, I need some details:

<br>1. Bike brand & model
<br>2. Service needed
<br>3. Preferred date & time

<br>Or call us directly at: **9762046636**
<br>WhatsApp: **9762046636**

<br>Would you like to book now?`;
            }
            
            // Cost related queries
            if (message.includes('cost') || message.includes('price') || message.includes('rate')) {
                return `💰 **Bike Service Cost Estimates:**
<br>🏍️ **Fork Alignment:** ₹500 - ₹1500
<br>🏍️ **Chassis Alignment:** ₹800 - ₹2000
<br>🏍️ **Mac Wheel Repair:** ₹400 - ₹1200
<br>🏍️ **Expert Repairs:** ₹600 - ₹3000
<br>🏍️ **Performance Maintenance:** ₹1000 - ₹2500

<br>*Final cost depends on bike condition and parts needed.*

<br>For exact pricing, our technician will confirm after inspection.`;
            }
            
            // Time related queries
            if (message.includes('time') || message.includes('duration') || message.includes('how long') || message.includes('hours')) {
                return `⏰ **Bike Service Duration:**
<br>🏍️ **Fork Alignment:** 1-2 hours
<br>🏍️ **Chassis Alignment:** 2-3 hours
<br>🏍️ **Mac Wheel Repair:** 1-2 hours
<br>🏍️ **Expert Repairs:** 2-4 hours
<br>🏍️ **Performance Maintenance:** 3-5 hours

<br>*Time may vary based on bike condition.*

<br>**Working Hours:**
<br>Tuesday - Sunday: 10AM - 7PM
<br>Monday: Closed`;
            }
            
            // Location/Contact queries
            if (message.includes('location') || message.includes('address') || message.includes('contact') || message.includes('where')) {
                return `📍 **Our Location & Contact:**
<br>🏢 **Raj Alignment**
<br>Medi Point, Opp. Chandnagar
<br>Kharadi, Pune

<br>📞 **Call:** 9762046636
<br>💬 **WhatsApp:** 9762046636
<br>🕐 **Hours:** Tue-Sun 10AM-7PM

<br>🚚 **Pickup & Drop:** Available within city limits

<br>Would you like directions or want to book a pickup?`;
            }
            
            // Emergency queries
            if (message.includes('emergency') || message.includes('urgent') || message.includes('breakdown')) {
                return `🚨 **For urgent service needs:**

<br>📞 **Call:** 9762046636
<br>💬 **WhatsApp:** 9762046636

<br>We provide:
<br>⚡ Quick response time
<br>🚚 Pickup service
<br>🔧 Expert repairs
<br>🏠 Safe drop-off

<br>**Available:** Tuesday - Sunday 10AM-7PM
<br>**Closed:** Monday

<br>Please describe your urgent service need when calling!`;
            }
            
            // Default response
            return `👋 **I'm here to help!**

<br>I can assist with:
<br>🏍️ Bike service information
<br>📍 Location & contact

<br>What would you like to know about our bike services?

<br>Or call us directly: **9762046636**`;
        }
    };
    
    // Initialize chatbot when page loads
    function initChatbot() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => chatbot.init());
        } else {
            chatbot.init();
        }
    }
    
    // Make chatbot globally accessible
    window.chatbot = chatbot;
    
    // Initialize
    initChatbot();
})();
