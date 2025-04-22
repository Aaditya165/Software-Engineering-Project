document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const contactMessage = document.getElementById('contact-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // In a real application, you would send this data to a server
            // For now, we'll just show a success message
            
            // Simulate sending (would be an API call in production)
            contactMessage.textContent = "Sending message...";
            contactMessage.style.color = "#666";
            
            // Simulate a network delay
            setTimeout(() => {
                console.log('Contact form submitted:', { name, email, message });
                
                // Show success message
                contactMessage.textContent = "Thank you for your message! We'll get back to you soon.";
                contactMessage.style.color = "green";
                
                // Reset form
                contactForm.reset();
            }, 1000);
        });
    }
    
    // Update the login status on this page too
    updateLoginButton();
});