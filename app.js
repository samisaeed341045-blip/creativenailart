// Complete Feedback Form JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Star Rating System
    let selectedRating = 0;
    
    document.querySelectorAll('.star').forEach(star => {
        star.addEventListener('click', function() {
            selectedRating = this.getAttribute('data-value');
            document.getElementById('rating').value = selectedRating;
            
            // Update star colors
            document.querySelectorAll('.star i').forEach((icon, index) => {
                if(index < selectedRating) {
                    icon.classList.remove('far'); // empty star
                    icon.classList.add('fas');     // filled star
                    icon.style.color = '#ffc107'; // yellow color
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    icon.style.color = '#ddd';    // gray color
                }
            });
        });
    });
    
    // Form Submission
    document.getElementById('feedbackForm').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent page refresh
        
        // Check if rating is given
        if(selectedRating == 0) {
            alert('Please provide a rating');
            return;
        }
        
        // Success message
        let name = document.getElementById('name').value;
        let stars = '★'.repeat(selectedRating) + '☆'.repeat(5-selectedRating);
        
        let message = `
        Thank you ${name}!
        Your Rating: ${stars}
        Your feedback has been submitted successfully.
        `;
        
        alert(message);
        
        // Reset form
        this.reset();
        selectedRating = 0;
        
        // Reset stars
        document.querySelectorAll('.star i').forEach(icon => {
            icon.classList.remove('fas');
            icon.classList.add('far');
            icon.style.color = '#ddd';
        });
    });
    
    // Radio button change effect
    document.querySelectorAll('input[name="recommend"]').forEach(radio => {
        radio.addEventListener('change', function() {
            console.log('You selected: ' + this.value);
        });
    });
    
    // Add character counter for comments
    const commentsBox = document.getElementById('comments');
    if(commentsBox) {
        const charCount = document.createElement('div');
        charCount.id = 'charCount';
        charCount.style.color = '#666';
        charCount.style.fontSize = '0.9rem';
        charCount.style.marginTop = '5px';
        commentsBox.parentNode.appendChild(charCount);
        
        commentsBox.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = `${count} characters`;
            
            if(count > 500) {
                charCount.style.color = 'red';
            } else if(count > 300) {
                charCount.style.color = 'orange';
            } else {
                charCount.style.color = '#666';
            }
        });
    }
    
    // Form validation styling
    const requiredInputs = document.querySelectorAll('#feedbackForm [required]');
    requiredInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if(this.value.trim() === '') {
                this.classList.add('is-invalid');
                this.classList.remove('is-valid');
            } else {
                this.classList.add('is-valid');
                this.classList.remove('is-invalid');
            }
        });
        
        input.addEventListener('input', function() {
            if(this.value.trim() !== '') {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            }
        });
    });
});




// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents form submission
    
    // Get form values
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    const newsletter = document.getElementById('newsletter').checked;
    
    // Simple validation
    if(!fullName || !email || !subject || !message) {
        alert("❌ Please fill all required fields!");
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) {
        alert("❌ Please enter a valid email address!");
        return;
    }
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate sending (replace with actual backend)
    setTimeout(() => {
        // Success message with details
        alert("✅ Message Sent Successfully!\n\n" +
              `Name: ${fullName}\n` +
              `Email: ${email}\n` +
              `Phone: ${phone || 'Not provided'}\n` +
              `Subject: ${subject}\n` +
              `Newsletter: ${newsletter ? 'Subscribed' : 'Not subscribed'}\n\n` +
              "Thank you! We'll contact you within 24-48 hours.");
        
        // Reset form
        this.reset();
        
        // Restore button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Optional: Show confirmation on page
        showFormConfirmation(fullName);
        
    }, 1500); // 1.5 second delay to simulate sending
});

// Show confirmation message on page (optional)
function showFormConfirmation(name) {
    const formContainer = document.querySelector('.contact-form-container');
    const confirmationHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <h4 class="alert-heading"><i class="fas fa-check-circle me-2"></i> Thank you, ${name}!</h4>
            <p>Your message has been sent successfully. We'll respond to you within 24-48 hours.</p>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    // Insert alert before the form
    const form = document.getElementById('contactForm');
    form.insertAdjacentHTML('beforebegin', confirmationHTML);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        const alert = document.querySelector('.alert');
        if(alert) {
            const bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        }
    }, 5000);
}

// Real-time validation
document.querySelectorAll('#contactForm input, #contactForm textarea, #contactForm select').forEach(element => {
    element.addEventListener('blur', function() {
        validateField(this);
    });
    
    element.addEventListener('input', function() {
        // Remove red border when user starts typing
        if(this.style.borderColor === 'red') {
            this.style.borderColor = '#ced4da';
        }
    });
});

function validateField(field) {
    if(field.hasAttribute('required') && !field.value.trim()) {
        field.style.borderColor = 'red';
        field.style.borderWidth = '2px';
        return false;
    }
    
    // Email validation on blur
    if(field.type === 'email' && field.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(field.value)) {
            field.style.borderColor = 'red';
            field.style.borderWidth = '2px';
            return false;
        }
    }
    
    field.style.borderColor = '#ced4da';
    field.style.borderWidth = '1px';
    return true;
}

// Phone number formatting (optional)
document.getElementById('phone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if(value.length > 3 && value.length <= 6) {
        value = value.replace(/(\d{3})(\d+)/, '$1-$2');
    } else if(value.length > 6) {
        value = value.replace(/(\d{3})(\d{3})(\d+)/, '$1-$2-$3');
    }
    e.target.value = value;
});
