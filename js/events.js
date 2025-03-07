document.addEventListener('DOMContentLoaded', function() {
  // Search functionality for events
  const searchInput = document.getElementById('eventSearch');
  const eventsGrid = document.getElementById('eventsGrid');
  
  if (searchInput && eventsGrid) {
    const eventCards = eventsGrid.querySelectorAll('.event-card');
    
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase().trim();
      
      eventCards.forEach(card => {
        const eventName = card.querySelector('h3').textContent.toLowerCase();
        const eventDescription = card.querySelector('.event-description').textContent.toLowerCase();
        const eventLocation = card.querySelector('.event-location').textContent.toLowerCase();
        
        if (eventName.includes(searchTerm) || 
            eventDescription.includes(searchTerm) || 
            eventLocation.includes(searchTerm)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
      
      // Check if no results found
      const visibleCards = [...eventCards].filter(card => card.style.display !== 'none');
      
      // If no results found, show a message
      let noResultsMessage = document.getElementById('noResultsMessage');
      
      if (visibleCards.length === 0 && searchTerm !== '') {
        if (!noResultsMessage) {
          noResultsMessage = document.createElement('div');
          noResultsMessage.id = 'noResultsMessage';
          noResultsMessage.className = 'no-results-message';
          noResultsMessage.innerHTML = `
            <p>No events found matching "${searchTerm}".</p>
            <button class="btn btn-small" id="clearSearch">Clear Search</button>
          `;
          eventsGrid.appendChild(noResultsMessage);
          
          // Add event listener to clear search button
          document.getElementById('clearSearch').addEventListener('click', function() {
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input'));
          });
        }
      } else if (noResultsMessage) {
        noResultsMessage.remove();
      }
    });
  }
  
  // Event category filtering
  const categoryButtons = document.querySelectorAll('.event-category-btn');
  
  if (categoryButtons.length > 0 && eventsGrid) {
    categoryButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const category = this.dataset.category;
        
        // Filter events based on category
        const eventCards = eventsGrid.querySelectorAll('.event-card');
        
        eventCards.forEach(card => {
          if (category === 'all' || card.dataset.eventType === category) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
  
  // Event submission form handling
  const eventSubmissionForm = document.getElementById('eventSubmissionForm');
  
  if (eventSubmissionForm) {
    eventSubmissionForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const eventData = {};
      
      for (const [key, value] of formData.entries()) {
        eventData[key] = value;
      }
      
      // In a real application, you would send this data to a server
      // For this static website, we'll just show a success message
      
      // Create a success message
      const successMessage = document.createElement('div');
      successMessage.className = 'form-success-message';
      successMessage.innerHTML = `
        <h3>Thank you for submitting your event!</h3>
        <p>Your event "${eventData.eventName}" has been submitted for review.</p>
        <p>We will contact you at ${eventData.contactEmail} once your event is approved.</p>
      `;
      
      // Replace the form with the success message
      this.parentNode.replaceChild(successMessage, this);
      
      // In a real application, you would reset the form if you're not replacing it
      // this.reset();
    });
  }
});

/**
 * Add a new event
 * This function can be used to dynamically add new events
 * @param {string} title - The title of the event
 * @param {number} day - The day of the event
 * @param {string} month - The month of the event (3-letter abbreviation)
 * @param {string} location - The location of the event
 * @param {string} time - The time of the event
 * @param {string} description - A description of the event
 * @param {string} category - The category of the event
 */
function addEvent(title, day, month, location, time, description, category) {
  const eventsGrid = document.getElementById('eventsGrid');
  
  if (!eventsGrid) return;
  
  // Create a new event card
  const eventCard = document.createElement('div');
  eventCard.className = 'event-card';
  eventCard.dataset.eventType = category;
  
  // Create the HTML content for the card
  eventCard.innerHTML = `
    <div class="event-date">
      <span class="day">${day}</span>
      <span class="month">${month}</span>
    </div>
    <div class="event-details">
      <h3>${title}</h3>
      <p class="event-location"><i class="fas fa-map-marker-alt"></i> ${location}</p>
      <p class="event-time"><i class="fas fa-clock"></i> ${time}</p>
      <p class="event-description">${description}</p>
    </div>
  `;
  
  // Add the card to the grid
  eventsGrid.appendChild(eventCard);
}

// Example usage:
// addEvent(
//   'Community Clean-up Drive', 
//   '20', 
//   'Sep', 
//   'Town Park', 
//   '8:00 AM - 12:00 PM', 
//   'Join us for a community clean-up event to keep our town beautiful.', 
//   'community'
// );