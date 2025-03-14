// ETMUN Website JavaScript

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });
    }
    
    // Set active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop();
    const navButtons = document.querySelectorAll('.nav-button');
    
    navButtons.forEach(button => {
        const buttonHref = button.getAttribute('href');
        if (buttonHref === currentPage || 
            (currentPage === '' && buttonHref === 'index.html')) {
            button.classList.add('active');
        }
    });
    
    // Initialize accordions if they exist
    initAccordions();
    
    // Initialize form validation if forms exist
    initFormValidation();
});

// Accordion Functionality
function initAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            content.classList.toggle('active');
            
            // Update the icon
            const icon = this.querySelector('.accordion-icon');
            if (icon) {
                icon.textContent = content.classList.contains('active') ? '−' : '+';
            }
        });
    });
}

// Form Validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            let isValid = true;
            
            // Validate required fields
            const requiredFields = form.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    showError(field, 'This field is required');
                } else {
                    clearError(field);
                    
                    // Validate email fields
                    if (field.type === 'email' && !isValidEmail(field.value)) {
                        isValid = false;
                        showError(field, 'Please enter a valid email address');
                    }
                }
            });
            
            if (!isValid) {
                event.preventDefault();
            } else {
                // For the contact form, show a success message
                if (form.id === 'contactForm') {
                    event.preventDefault();
                    showSuccessMessage(form);
                }
            }
        });
    });
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(field, message) {
    // Clear any existing error
    clearError(field);
    
    // Add error class to the field
    field.classList.add('error');
    
    // Create and append error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

function clearError(field) {
    field.classList.remove('error');
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function showSuccessMessage(form) {
    // Hide the form
    form.style.display = 'none';
    
    // Show success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <h3>Thank you for your message!</h3>
        <p>We have received your inquiry and will get back to you soon.</p>
        <button class="btn mt-3" id="resetForm">Send another message</button>
    `;
    
    form.parentNode.appendChild(successDiv);
    
    // Add event listener to reset button
    document.getElementById('resetForm').addEventListener('click', function() {
        form.reset();
        form.style.display = 'block';
        successDiv.remove();
    });
}

// Countdown Timer
function initCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    
    // Set the date we're counting down to (example: next year's conference)
    const currentYear = new Date().getFullYear();
    const countDownDate = new Date(`October 15, ${currentYear} 00:00:00`).getTime();
    
    // Update the countdown every 1 second
    const x = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        
        // If the countdown is over, show expired message
        if (distance < 0) {
            clearInterval(x);
            countdownElement.innerHTML = "ETMUN Conference is here!";
            return;
        }
        
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the result
        countdownElement.innerHTML = `
            <div class="countdown-item">
                <span class="countdown-number">${days}</span>
                <span class="countdown-label">Days</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${hours}</span>
                <span class="countdown-label">Hours</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${minutes}</span>
                <span class="countdown-label">Minutes</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${seconds}</span>
                <span class="countdown-label">Seconds</span>
            </div>
        `;
    }, 1000);
}

// Call countdown initialization if the element exists
document.addEventListener('DOMContentLoaded', function() {
    initCountdown();
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
