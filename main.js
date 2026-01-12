// Main JavaScript for Premium Motorcycle Service Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading screen
    initializeLoadingScreen();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize interactive elements
    initializeInteractiveElements();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize contact forms
    initializeContactForms();
    
    // Initialize performance optimizations
    initializePerformanceOptimizations();
});

// Loading Screen
function initializeLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading';
    loadingScreen.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loadingScreen);

    // Hide loading screen when everything is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 1500);
    });
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll-based navigation highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    function updateActiveNav() {
        const scrollY = window.pageYOffset;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLinks[index]) {
                    navLinks[index].classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
}

// Interactive Elements
function initializeInteractiveElements() {
    // CTA Button interactions
    const ctaButtons = document.querySelectorAll('.cta-primary, .cta-secondary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            this.appendChild(ripple);

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            setTimeout(() => ripple.remove(), 600);

            // Handle button actions
            if (this.classList.contains('cta-primary')) {
                console.log('Booking button clicked');
                handleBookingClick();
            } else if (this.classList.contains('cta-secondary')) {
                console.log('Contact button clicked');
                handleContactClick();
            } else if (this.id === 'talk-to-technician') {
                console.log('Talk to Technician button clicked by ID');
                handleContactClick();
            }
        });
    });

    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-category');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Trust item animations
    const trustItems = document.querySelectorAll('.trust-item');
    
    trustItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.addEventListener('mouseenter', function() {
            this.querySelector('.trust-icon').style.transform = 'scale(1.2) rotate(5deg)';
        });

        item.addEventListener('mouseleave', function() {
            this.querySelector('.trust-icon').style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special animations for different sections
                if (entry.target.classList.contains('differentiator')) {
                    animateFeatures();
                } else if (entry.target.classList.contains('services')) {
                    animateServices();
                } else if (entry.target.classList.contains('trust-builder')) {
                    animateTrustItems();
                }
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Animate features list
    function animateFeatures() {
        const features = document.querySelectorAll('.feature-item');
        features.forEach((feature, index) => {
            setTimeout(() => {
                feature.style.opacity = '1';
                feature.style.transform = 'translateX(0)';
            }, index * 100);
        });
    }

    // Animate services
    function animateServices() {
        const services = document.querySelectorAll('.service-category');
        services.forEach((service, index) => {
            setTimeout(() => {
                service.style.opacity = '1';
                service.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }

    // Animate trust items
    function animateTrustItems() {
        const trustItems = document.querySelectorAll('.trust-item');
        trustItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
}

// Contact Forms - Global functions
function createBookingModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Book Professional Inspection</h3>
                <button class="modal-close">&times;</button>
            </div>
            <form class="booking-form" action="https://formspree.io/f/mnjjqqgk" method="POST">
                <div class="form-group">
                    <label for="name">Full Name</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" required>
                </div>
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="bike">Bike Model</label>
                    <input type="text" id="bike" name="bike" placeholder="e.g., Honda CBR650R">
                </div>
                <div class="form-group">
                    <label for="service">Service Type</label>
                    <div class="service-options">
                        <div class="service-option">
                            <input type="checkbox" id="professional-fork" name="services" value="professional-fork">
                            <label for="professional-fork">
                                <span class="service-number">1️⃣</span>
                                Professional Fork Alignment Service
                            </label>
                        </div>
                        <div class="service-option">
                            <input type="checkbox" id="chassis-alignment" name="services" value="chassis-alignment">
                            <label for="chassis-alignment">
                                <span class="service-number">2️⃣</span>
                                Chassis Alignment & Frame Inspection
                            </label>
                        </div>
                        <div class="service-option">
                            <input type="checkbox" id="wheel-alignment" name="services" value="wheel-alignment">
                            <label for="wheel-alignment">
                                <span class="service-number">3️⃣</span>
                                Wheel Alignment & Truing
                            </label>
                        </div>
                        <div class="service-option">
                            <input type="checkbox" id="wheel-balancing" name="services" value="wheel-balancing">
                            <label for="wheel-balancing">
                                <span class="service-number">4️⃣</span>
                                Advanced Wheel Balancing
                            </label>
                        </div>
                        <div class="service-option">
                            <input type="checkbox" id="other-service" name="services" value="other-service">
                            <label for="other-service">
                                <span class="service-number">5️⃣</span>
                                Other Service (Please specify below)
                            </label>
                        </div>
                    </div>
                </div>
                <div class="form-group" id="other-service-details" style="display: none;">
                    <label for="other-service-text">What service do you need?</label>
                    <textarea id="other-service-text" name="other-service-text" rows="3" placeholder="Please describe the specific service you need..."></textarea>
                </div>
                <div class="form-group">
                    <label for="message">Additional Details</label>
                    <textarea id="message" name="message" rows="4"></textarea>
                </div>
                <!-- Hidden field for selected services -->
                <input type="hidden" name="selected_services" id="selected-services">
                <button type="submit" class="cta-primary">Book Appointment</button>
            </form>
        </div>
    `;
    return modal;
}

function createContactModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Talk to a Technician</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="contact-info">
                <div class="contact-item clickable-box" data-action="call">
                    <div class="contact-icon">📞</div>
                    <div class="contact-details">
                        <h4>Call Us</h4>
                        <p><a href="tel:+919762046636" style="color: #00ff88; text-decoration: none;">+91 9762046636</a></p>
                        <p>10.00 AM - 7.00 PM</p>
                        <p>Monday Holiday | Tue-Sunday Open</p>
                    </div>
                </div>
                <div class="contact-item clickable-box" data-action="whatsapp">
                    <div class="contact-icon">📱</div>
                    <div class="contact-details">
                        <h4>WhatsApp</h4>
                        <p><a href="https://wa.me/919762046636" style="color: #00ff88; text-decoration: none;" target="_blank">+91 9762046636</a></p>
                        <p>Quick responses</p>
                    </div>
                </div>
                <div class="contact-item clickable-box" data-action="location">
                    <div class="contact-icon">📍</div>
                    <div class="contact-details">
                        <h4>Visit Us</h4>
                        <p><a href="https://maps.google.com/?q=18.562509,73.934005" style="color: #00ff88; text-decoration: none;" target="_blank">Get Directions</a></p>
                        <p>18.562509, 73.934005</p>
                    </div>
                </div>
            </div>
            <form class="quick-contact-form">
                <div class="form-group">
                    <label for="quick-name">Your Name</label>
                    <input type="text" id="quick-name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="quick-message">Message</label>
                    <textarea id="quick-message" name="message" rows="3" required></textarea>
                </div>
                <button type="submit" class="cta-secondary">Send Message</button>
            </form>
        </div>
    `;
    return modal;
}

function handleBookingClick() {
    const modal = createBookingModal();
    document.body.appendChild(modal);
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            opacity: 0;
            animation: fadeIn 0.3s forwards;
        }
        
        .modal-content {
            background: #1a1a1a;
            border: 1px solid rgba(255, 68, 68, 0.3);
            border-radius: 12px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            transform: scale(0.9);
            animation: scaleIn 0.3s forwards;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
        }
        
        .modal-header h3 {
            color: #ffffff;
            font-size: 1.5rem;
            margin: 0;
        }
        
        .modal-close {
            background: none;
            border: none;
            color: #ff4444;
            font-size: 2rem;
            cursor: pointer;
            padding: 0;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .form-group {
            margin-bottom: 1.5rem;
        }
        
        .form-group label {
            display: block;
            color: #e0e0e0;
            margin-bottom: 0.5rem;
            font-weight: 500;
        }
        
        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 0.8rem;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 6px;
            color: #ffffff;
            font-size: 1rem;
        }
        
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: #ff4444;
            background: rgba(255, 255, 255, 0.08);
        }
        
        /* Service Options Styling */
        .service-options {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        .service-option {
            display: flex;
            align-items: center;
            padding: 1rem;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .service-option:hover {
            background: rgba(255, 68, 68, 0.1);
            border-color: rgba(255, 68, 68, 0.3);
        }
        
        .service-option input[type="checkbox"] {
            width: auto;
            margin-right: 1rem;
            margin-left: 0;
            padding: 0;
            background: transparent;
            border: 2px solid #ff4444;
            border-radius: 4px;
            cursor: pointer;
        }
        
        .service-option input[type="checkbox"]:checked {
            background: #ff4444;
        }
        
        .service-option label {
            margin: 0;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: #ffffff;
            font-weight: 500;
        }
        
        .service-number {
            font-size: 1.2rem;
            font-weight: bold;
        }
        
        /* Clickable Box Styling */
        .clickable-box {
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
        }
        
        .clickable-box:hover {
            background: rgba(255, 68, 68, 0.15) !important;
            border-color: rgba(255, 68, 68, 0.5) !important;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(255, 68, 68, 0.2);
        }
        
        .clickable-box:active {
            transform: translateY(0px) scale(0.98);
            background: rgba(255, 68, 68, 0.25) !important;
            box-shadow: 0 2px 8px rgba(255, 68, 68, 0.3);
        }
        
        .clickable-box.clicked {
            animation: clickPulse 0.6s ease-out;
        }
        
        @keyframes clickPulse {
            0% {
                transform: scale(1);
                background: rgba(255, 68, 68, 0.15);
            }
            50% {
                transform: scale(1.05);
                background: rgba(255, 68, 68, 0.3);
                box-shadow: 0 0 20px rgba(255, 68, 68, 0.4);
            }
            100% {
                transform: scale(1);
                background: rgba(255, 68, 68, 0.15);
                box-shadow: 0 5px 15px rgba(255, 68, 68, 0.2);
            }
        }
        
        .clickable-box::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: transparent;
            z-index: 1;
        }
        
        @keyframes fadeIn {
            to { opacity: 1; }
        }
        
        @keyframes scaleIn {
            to { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);

    // Handle modal close
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.remove();
        style.remove();
    });

    // Handle "Other Service" checkbox
    const otherServiceCheckbox = modal.querySelector('#other-service');
    const otherServiceDetails = modal.querySelector('#other-service-details');
    
    otherServiceCheckbox.addEventListener('change', () => {
        if (otherServiceCheckbox.checked) {
            otherServiceDetails.style.display = 'block';
        } else {
            otherServiceDetails.style.display = 'none';
        }
    });

    // Handle form submission
    const form = modal.querySelector('.booking-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Collect selected services
        const selectedServices = [];
        const checkboxes = modal.querySelectorAll('input[name="services"]:checked');
        checkboxes.forEach(checkbox => {
            if (checkbox.value === 'other-service') {
                const otherServiceText = modal.querySelector('#other-service-text').value;
                selectedServices.push(`Other: ${otherServiceText}`);
            } else {
                selectedServices.push(checkbox.nextElementSibling.textContent.trim());
            }
        });
        
        // Set the hidden field value
        const selectedServicesField = modal.querySelector('#selected-services');
        selectedServicesField.value = selectedServices.join(', ');
        
        console.log('Selected services:', selectedServices);
        console.log('Submitting booking form to Formspree...');
        
        // Submit to Formspree
        form.submit();
    });

    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            style.remove();
        }
    });
}

function handleContactClick() {
    console.log('Creating contact modal...');
    const modal = createContactModal();
    document.body.appendChild(modal);
    console.log('Contact modal added to body');
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            opacity: 0;
            animation: fadeIn 0.3s forwards;
        }
        
        .modal-content {
            background: #1a1a1a;
            border: 1px solid rgba(255, 68, 68, 0.3);
            border-radius: 12px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            transform: scale(0.9);
            animation: scaleIn 0.3s forwards;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
        }
        
        .modal-header h3 {
            color: #ffffff;
            font-size: 1.5rem;
            margin: 0;
        }
        
        .modal-close {
            background: none;
            border: none;
            color: #ff4444;
            font-size: 2rem;
            cursor: pointer;
            padding: 0;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .contact-info {
            margin-bottom: 2rem;
        }
        
        .contact-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1.5rem;
            padding: 1rem;
            background: rgba(255, 255, 255, 0.03);
            border-radius: 8px;
        }
        
        .contact-icon {
            font-size: 2rem;
            width: 50px;
            text-align: center;
        }
        
        .contact-details h4 {
            color: #ff4444;
            margin: 0 0 0.5rem 0;
            font-size: 1.1rem;
        }
        
        .contact-details p {
            color: #b0b0b0;
            margin: 0.2rem 0;
            font-size: 0.9rem;
        }
        
        .form-group {
            margin-bottom: 1.5rem;
        }
        
        .form-group label {
            display: block;
            color: #e0e0e0;
            margin-bottom: 0.5rem;
            font-weight: 500;
        }
        
        .form-group input,
        .form-group textarea {
            width: 100%;
            padding: 0.8rem;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 6px;
            color: #ffffff;
            font-size: 1rem;
        }
        
        .form-group input:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: #ff4444;
            background: rgba(255, 255, 255, 0.08);
        }
        
        @keyframes fadeIn {
            to { opacity: 1; }
        }
        
        @keyframes scaleIn {
            to { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);

    // Handle modal close
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.remove();
        style.remove();
    });

    // Handle clickable box clicks
    const clickableBoxes = modal.querySelectorAll('.clickable-box');
    clickableBoxes.forEach(box => {
        box.addEventListener('click', (e) => {
            // Add click animation
            box.classList.add('clicked');
            
            // Remove animation class after animation completes
            setTimeout(() => {
                box.classList.remove('clicked');
            }, 600);
            
            const action = box.getAttribute('data-action');
            
            // Small delay before action to let animation show
            setTimeout(() => {
                switch(action) {
                    case 'call':
                        window.location.href = 'tel:+919762046636';
                        break;
                    case 'whatsapp':
                        window.open('https://wa.me/919762046636', '_blank');
                        break;
                    case 'location':
                        window.open('https://maps.google.com/?q=18.562509,73.934005', '_blank');
                        break;
                }
            }, 200);
        });
    });

    // Handle form submission
    const form = modal.querySelector('.quick-contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Contact form submitted');
        modal.remove();
        style.remove();
    });

    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            style.remove();
        }
    });
}

function initializeContactForms() {
    // Contact forms are now handled by global functions
}

// Performance Optimizations
function initializePerformanceOptimizations() {
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Throttle scroll events
    let ticking = false;
    function updateScrollAnimations() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                // Update scroll-based animations
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', updateScrollAnimations);

    // Optimize Three.js rendering
    if (window.motorcycleScene) {
        // Reduce rendering quality on mobile
        if (window.innerWidth < 768) {
            window.motorcycleScene.renderer.setPixelRatio(1);
        }

        // Pause animation when not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // Pause animations
            } else {
                // Resume animations
            }
        });
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add CSS for animations
const animationCSS = `
    .animate-in {
        animation: slideInUp 0.6s ease forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .feature-item {
        opacity: 0;
        transform: translateX(-20px);
        transition: all 0.5s ease;
    }
    
    .service-category {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.5s ease;
    }
    
    .trust-item {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.5s ease;
    }
    
    .trust-icon {
        transition: transform 0.3s ease;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = animationCSS;
document.head.appendChild(styleSheet);
