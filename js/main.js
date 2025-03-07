// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
  }

  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    if (navLinks && navLinks.classList.contains('active') && !event.target.closest('.main-nav')) {
      navLinks.classList.remove('active');
    }
  });

  // Horizontal Scrolling for Business Section
  setupHorizontalScroll('businessScroll', 'businessScrollLeft', 'businessScrollRight');
  
  // Horizontal Scrolling for Shop Section
  setupHorizontalScroll('shopScroll', 'shopScrollLeft', 'shopScrollRight');
});

/**
 * Setup horizontal scrolling functionality for a container
 * @param {string} scrollContainerId - The ID of the scroll container
 * @param {string} leftBtnId - The ID of the left scroll button
 * @param {string} rightBtnId - The ID of the right scroll button
 */
function setupHorizontalScroll(scrollContainerId, leftBtnId, rightBtnId) {
  const scrollContainer = document.getElementById(scrollContainerId);
  const leftBtn = document.getElementById(leftBtnId);
  const rightBtn = document.getElementById(rightBtnId);

  if (!scrollContainer || !leftBtn || !rightBtn) return;

  // Scroll left button
  leftBtn.addEventListener('click', function() {
    scrollContainer.scrollBy({
      left: -300,
      behavior: 'smooth'
    });
  });

  // Scroll right button
  rightBtn.addEventListener('click', function() {
    scrollContainer.scrollBy({
      left: 300,
      behavior: 'smooth'
    });
  });

  // Show/hide scroll buttons based on scroll position
  scrollContainer.addEventListener('scroll', function() {
    updateScrollButtonsVisibility(scrollContainer, leftBtn, rightBtn);
  });

  // Initial check for button visibility
  updateScrollButtonsVisibility(scrollContainer, leftBtn, rightBtn);
}

/**
 * Update the visibility of scroll buttons based on scroll position
 * @param {HTMLElement} container - The scroll container
 * @param {HTMLElement} leftBtn - The left scroll button
 * @param {HTMLElement} rightBtn - The right scroll button
 */
function updateScrollButtonsVisibility(container, leftBtn, rightBtn) {
  // Check if scrolled to the start
  if (container.scrollLeft <= 10) {
    leftBtn.style.opacity = '0.5';
    leftBtn.style.pointerEvents = 'none';
  } else {
    leftBtn.style.opacity = '1';
    leftBtn.style.pointerEvents = 'auto';
  }

  // Check if scrolled to the end
  if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
    rightBtn.style.opacity = '0.5';
    rightBtn.style.pointerEvents = 'none';
  } else {
    rightBtn.style.opacity = '1';
    rightBtn.style.pointerEvents = 'auto';
  }
}

// Create placeholder images for development
function createPlaceholderImages() {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    if (!img.src || (img.src.includes('images/') && !img.classList.contains('hero-img'))) {
      const width = img.width || 300;
      const height = img.height || 200;
      const text = img.alt || 'Placeholder Image';
      
      // Create a placeholder image URL
      const placeholderUrl = `https://via.placeholder.com/${width}x${height}?text=${encodeURIComponent(text)}`;
      
      // Set the placeholder as the image source
      img.src = placeholderUrl;
    }
  });
}


// Call the function to create placeholder images
document.addEventListener('DOMContentLoaded', createPlaceholderImages);