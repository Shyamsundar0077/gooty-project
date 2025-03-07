document.addEventListener('DOMContentLoaded', function() {
  // Search functionality for business categories
  const searchInput = document.getElementById('businessSearch');
  const businessCategories = document.getElementById('businessCategories');
  
  if (searchInput && businessCategories) {
    const categoryCards = businessCategories.querySelectorAll('.category-card');
    
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase().trim();
      
      categoryCards.forEach(card => {
        const categoryName = card.querySelector('h3').textContent.toLowerCase();
        const categoryDescription = card.querySelector('p').textContent.toLowerCase();
        
        if (categoryName.includes(searchTerm) || categoryDescription.includes(searchTerm)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
      
      // Check if no results found
      const visibleCards = [...categoryCards].filter(card => card.style.display !== 'none');
      
      // If no results found, show a message
      let noResultsMessage = document.getElementById('noResultsMessage');
      
      if (visibleCards.length === 0 && searchTerm !== '') {
        if (!noResultsMessage) {
          noResultsMessage = document.createElement('div');
          noResultsMessage.id = 'noResultsMessage';
          noResultsMessage.className = 'no-results-message';
          noResultsMessage.innerHTML = `
            <p>No business categories found matching "${searchTerm}".</p>
            <button class="btn btn-small" id="clearSearch">Clear Search</button>
          `;
          businessCategories.appendChild(noResultsMessage);
          
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
 * Add a new business category
 * This function can be used to dynamically add new business categories
 * @param {string} name - The name of the category
 * @param {string} description - A short description of the category
 * @param {string} icon - The Font Awesome icon class (e.g., 'fas fa-store')
 * @param {string} link - The link to the category page
 */
function addBusinessCategory(name, description, icon, link) {
  const businessCategories = document.getElementById('businessCategories');
  
  if (!businessCategories) return;
  
  // Create a new category card
  const categoryCard = document.createElement('div');
  categoryCard.className = 'category-card';
  categoryCard.dataset.category = name.toLowerCase().replace(/\s+/g, '');
  
  // Create the HTML content for the card
  categoryCard.innerHTML = `
    <div class="category-icon">
      <i class="${icon}"></i>
    </div>
    <h3>${name}</h3>
    <p>${description}</p>
    <a href="${link}" class="btn btn-small">View All</a>
  `;
  
  // Add the card to the grid
  businessCategories.appendChild(categoryCard);
}

// Example usage:
// addBusinessCategory('Restaurants', 'Local dining options', 'fas fa-utensils', 'restaurants.html');