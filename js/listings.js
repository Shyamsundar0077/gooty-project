document.addEventListener('DOMContentLoaded', function() {
  // Search functionality for listings
  const searchInput = document.getElementById('listingSearch');
  const listingsContainer = document.getElementById('businessListings') || document.getElementById('serviceListings');
  
  if (searchInput && listingsContainer) {
    const listingCards = listingsContainer.querySelectorAll('.listing-card');
    
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase().trim();
      
      listingCards.forEach(card => {
        const listingName = card.querySelector('h3').textContent.toLowerCase();
        const listingDescription = card.querySelector('.listing-description').textContent.toLowerCase();
        
        // Also search in address if it exists
        const addressElement = card.querySelector('.listing-address');
        const addressText = addressElement ? addressElement.textContent.toLowerCase() : '';
        
        if (listingName.includes(searchTerm) || 
            listingDescription.includes(searchTerm) || 
            addressText.includes(searchTerm)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
      
      // Check if no results found
      const visibleCards = [...listingCards].filter(card => card.style.display !== 'none');
      
      // If no results found, show a message
      let noResultsMessage = document.getElementById('noResultsMessage');
      
      if (visibleCards.length === 0 && searchTerm !== '') {
        if (!noResultsMessage) {
          noResultsMessage = document.createElement('div');
          noResultsMessage.id = 'noResultsMessage';
          noResultsMessage.className = 'no-results-message';
          noResultsMessage.innerHTML = `
            <p>No listings found matching "${searchTerm}".</p>
            <button class="btn btn-small" id="clearSearch">Clear Search</button>
          `;
          listingsContainer.appendChild(noResultsMessage);
          
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
});

/**
 * Add a new business listing
 * This function can be used to dynamically add new business listings
 * @param {string} name - The name of the business
 * @param {string} address - The address of the business
 * @param {string} phone - The phone number of the business
 * @param {string} description - A description of the business
 * @param {string} imageUrl - The URL of the business image
 * @param {string} mapUrl - The Google Maps URL for the business
 */
function addBusinessListing(name, address, phone, description, imageUrl, mapUrl) {
  const listingsContainer = document.getElementById('businessListings');
  
  if (!listingsContainer) return;
  
  // Create a new listing card
  const listingCard = document.createElement('div');
  listingCard.className = 'listing-card';
  
  // Create the HTML content for the card
  listingCard.innerHTML = `
    <div class="listing-image">
      <img src="${imageUrl}" alt="${name}">
    </div>
    <div class="listing-content">
      <h3>${name}</h3>
      <p class="listing-address"><i class="fas fa-map-marker-alt"></i> ${address}</p>
      <p class="listing-phone"><i class="fas fa-phone"></i> ${phone}</p>
      <p class="listing-description">${description}</p>
      <div class="listing-actions">
        <a href="${mapUrl}" target="_blank" class="btn btn-small"><i class="fas fa-map-marked-alt"></i> View on Map</a>
        <a href="tel:${phone.replace(/\s+/g, '')}" class="btn btn-small"><i class="fas fa-phone"></i> Call Now</a>
      </div>
    </div>
  `;
  
  // Add the card to the grid
  listingsContainer.appendChild(listingCard);
}

/**
 * Add a new service provider listing
 * This function can be used to dynamically add new service provider listings
 * @param {string} name - The name of the service provider
 * @param {string} phone - The phone number of the service provider
 * @param {string} description - A description of the service provider
 * @param {string} services - The services offered
 * @param {string} experience - The experience of the service provider
 * @param {string} availability - The availability of the service provider
 * @param {string} imageUrl - The URL of the service provider image
 */
function addServiceProviderListing(name, phone, description, services, experience, availability, imageUrl) {
  const listingsContainer = document.getElementById('serviceListings');
  
  if (!listingsContainer) return;
  
  // Create a new listing card
  const listingCard = document.createElement('div');
  listingCard.className = 'listing-card';
  
  // Create the HTML content for the card
  listingCard.innerHTML = `
    <div class="listing-image">
      <img src="${imageUrl}" alt="${name}">
    </div>
    <div class="listing-content">
      <h3>${name}</h3>
      <p class="listing-phone"><i class="fas fa-phone"></i> ${phone}</p>
      <p class="listing-description">${description}</p>
      <div class="listing-details">
        <p><strong>Services:</strong> ${services}</p>
        <p><strong>Experience:</strong> ${experience}</p>
        <p><strong>Available:</strong> ${availability}</p>
      </div>
      <div class="listing-actions">
        <a href="tel:${phone.replace(/\s+/g, '')}" class="btn btn-small"><i class="fas fa-phone"></i> Call Now</a>
      </div>
    </div>
  `;
  
  // Add the card to the grid
  listingsContainer.appendChild(listingCard);
}

// Example usage:
// addBusinessListing(
//   'New Electronics Shop', 
//   '123 Main St, Gooty', 
//   '+91 9876543213', 
//   'Latest gadgets and electronics', 
//   'images/electronics-shop4.jpg', 
//   'https://maps.google.com/?q=New+Electronics+Shop+Gooty'
// );

// addServiceProviderListing(
//   'New Electrician', 
//   '+91 9876543223', 
//   'Professional electrical services', 
//   'Wiring, Installations, Repairs', 
//   '5+ years', 
//   '9:00 AM - 6:00 PM (Mon-Sat)', 
//   'images/electrician4.jpg'
// );