document.addEventListener('DOMContentLoaded', function() {
  // Contact form handling
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const contactData = {};
      
      for (const [key, value] of formData.entries()) {
        contactData[key] = value;
      }
      
      // In a real application, you would send this data to a server
      // For this static website, we'll just show a success message
      
      // Create a success message
      const successMessage = document.createElement('div');
      successMessage.className = 'form-success-message';
      successMessage.innerHTML = `
        <h3>Thank you for your message!</h3>
        <p>Hello ${contactData.name},</p>
        <p>We have received your message regarding "${contactData.subject}".</p>
        <p>We will get back to you at ${contactData.email} as soon as possible.</p>
      `;
      
      // Replace the form with the success message
      this.parentNode.replaceChild(successMessage, this);
      
      // In a real application, you would reset the form if you're not replacing it
      // this.reset();
    });
  }
  
  // Form validation
  const validateForm = () => {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    let isValid = true;
    
    // Simple validation
    if (name && name.value.trim() === '') {
      showError(name, 'Name is required');
      isValid = false;
    } else if (name) {
      removeError(name);
    }
    
    if (email && email.value.trim() === '') {
      showError(email, 'Email is required');
      isValid = false;
    } else if (email && !isValidEmail(email.value)) {
      showError(email, 'Please enter a valid email');
      isValid = false;
    } else if (email) {
      removeError(email);
    }
    
    if (subject && subject.value.trim() === '') {
      showError(subject, 'Subject is required');
      isValid = false;
    } else if (subject) {
      removeError(subject);
    }
    
    if (message && message.value.trim() === '') {
      showError(message, 'Message is required');
      isValid = false;
    } else if (message) {
      removeError(message);
    }
    
    return isValid;
  };
  
  // Show error message
  const showError = (input, message) => {
    const formGroup = input.parentElement;
    let errorElement = formGroup.querySelector('.error-message');
    
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    formGroup.classList.add('error');
  };
  
  // Remove error message
  const removeError = (input) => {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
      formGroup.removeChild(errorElement);
    }
    
    formGroup.classList.remove('error');
  };
  
  // Validate email format
  const isValidEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  
  // Add input event listeners for real-time validation
  const inputs = contactForm ? contactForm.querySelectorAll('input, textarea') : [];
  
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      if (this.id === 'name' && this.value.trim() === '') {
        showError(this, 'Name is required');
      } else if (this.id === 'email' && this.value.trim() === '') {
        showError(this, 'Email is required');
      } else if (this.id === 'email' && !isValidEmail(this.value)) {
        showError(this, 'Please enter a valid email');
      } else if (this.id === 'subject' && this.value.trim() === '') {
        showError(this, 'Subject is required');
      } else if (this.id === 'message' && this.value.trim() === '') {
        showError(this, 'Message is required');
      } else {
        removeError(this);
      }
    });
  });
  
  // Add form submission validation
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      if (!validateForm()) {
        e.preventDefault();
      }
    });
  }
});