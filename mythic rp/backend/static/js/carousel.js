
const galleryData = [
  { 
    name: "Epic Gaming", 
    role: "Server Experience",
    image: "static/main_bg/epicgamers.webp"
  },
  { 
    name: "Free Roam", 
    role: "Open World Adventure",
    image: "static/main_bg/freeroam-5.webp"
  },
  { 
    name: "Beach Paradise", 
    role: "Relaxation Zone",
    image: "static/img/beach.jpg"
  },
  { 
    name: "Gang Life", 
    role: "Criminal Empire",
    image: "static/img/gang.jpg"
  },
  { 
    name: "Police Force", 
    role: "Law Enforcement",
    image: "static/img/policeman-dog_845437-3429.jpg"
  },
  { 
    name: "Car Culture", 
    role: "Street Racing",
    image: "static/img/car.png"
  },
  { 
    name: "Hawaii Vibes", 
    role: "Tropical Adventures",
    image: "static/img/hawaii-illustration-retro-comic-style_23-2151771098.jpg"
  },
  { 
    name: "City Life", 
    role: "Urban Experience",
    image: "static/img/tab-content-1.jpg"
  },
  { 
    name: "Action Scenes", 
    role: "Thrilling Moments",
    image: "static/img/tab-content-2.jpg"
  },
  { 
    name: "Server Events", 
    role: "Community Activities",
    image: "static/img/tab-content-4.jpg"
  }
];

document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll(".carousel-main-section .card");
  const dots = document.querySelectorAll(".carousel-main-section .dot");
  const memberName = document.querySelector(".member-name");
  const memberRole = document.querySelector(".member-role");
  const upArrows = document.querySelectorAll(".carousel-main-section .nav-arrow.up");
  const downArrows = document.querySelectorAll(".carousel-main-section .nav-arrow.down");
  
  let currentIndex = 0;
  let isAnimating = false;
  let autoRotateInterval = null;

  // Initialize carousel with dynamic images
  function initializeCarousel() {
    cards.forEach((card, index) => {
      if (galleryData[index]) {
        const img = card.querySelector('img');
        if (img) {
          img.src = galleryData[index].image;
          img.alt = galleryData[index].name;
          
          // Add loading effect
          img.style.opacity = '0';
          img.style.transform = 'scale(1.1)';
          
          img.addEventListener('load', function() {
            this.style.transition = 'all 0.5s ease';
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
          });
          
          // Add error handling
          img.addEventListener('error', function() {
            this.src = 'static/img/beach.jpg'; // Fallback image
          });
        }
      }
    });
    updateCarousel(0);
  }

  // Enhanced carousel update with smooth animations
  function updateCarousel(newIndex) {
    if (isAnimating || !cards.length) return;
    isAnimating = true;

    currentIndex = (newIndex + cards.length) % cards.length;

    // Add pulse effect to current card
    cards.forEach((card, i) => {
      const offset = (i - currentIndex + cards.length) % cards.length;

      card.classList.remove(
        "center",
        "up-1", 
        "up-2",
        "down-1",
        "down-2",
        "hidden",
        "pulse-effect"
      );

      if (offset === 0) {
        card.classList.add("center", "pulse-effect");
      } else if (offset === 1) {
        card.classList.add("down-1");
      } else if (offset === 2) {
        card.classList.add("down-2");
      } else if (offset === cards.length - 1) {
        card.classList.add("up-1");
      } else if (offset === cards.length - 2) {
        card.classList.add("up-2");
      } else {
        card.classList.add("hidden");
      }
    });

    // Update text with typing effect
    if (galleryData[currentIndex]) {
      updateTextWithTypingEffect(galleryData[currentIndex].name, galleryData[currentIndex].role);
    }

    // Update dots indicator
    if (dots.length) {
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
      });
    }

    // Reset animation lock after transition
    setTimeout(() => {
      isAnimating = false;
    }, 800);
  }

  // Typing effect for text updates
  function updateTextWithTypingEffect(name, role) {
    if (!memberName || !memberRole) return;

    // Clear current text with fade out
    memberName.style.opacity = '0';
    memberRole.style.opacity = '0';

    setTimeout(() => {
      let nameIndex = 0;
      let roleIndex = 0;
      
      memberName.textContent = '';
      memberRole.textContent = '';
      memberName.style.opacity = '1';
      memberRole.style.opacity = '1';

      // Type name first, then role
      const typeInterval = setInterval(() => {
        if (nameIndex < name.length) {
          memberName.textContent += name[nameIndex];
          nameIndex++;
        } else if (roleIndex < role.length) {
          memberRole.textContent += role[roleIndex];
          roleIndex++;
        } else {
          clearInterval(typeInterval);
        }
      }, 50);
    }, 200);
  }

  // Auto-rotation functionality
  function startAutoRotate() {
    autoRotateInterval = setInterval(() => {
      if (!isAnimating) {
        updateCarousel(currentIndex + 1);
      }
    }, 8000); // Rotate every 8 seconds (slower)
  }

  function stopAutoRotate() {
    if (autoRotateInterval) {
      clearInterval(autoRotateInterval);
      autoRotateInterval = null;
    }
  }

  // Navigation event handlers with enhanced feedback
  function handleNavigation(direction) {
    if (isAnimating) return;
    
    stopAutoRotate();
    
    // Add click feedback animation
    const activeArrows = direction === 'up' ? upArrows : downArrows;
    activeArrows.forEach(arrow => {
      arrow.style.transform = 'scale(0.9)';
      setTimeout(() => {
        arrow.style.transform = 'scale(1)';
      }, 150);
    });
    
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    updateCarousel(newIndex);
    
    // Restart auto-rotation after 2 seconds
    setTimeout(startAutoRotate, 2000);
  }

  // Enhanced event listeners
  upArrows.forEach(arrow => {
    arrow.addEventListener("click", () => handleNavigation('up'));
    arrow.addEventListener("mouseenter", () => {
      arrow.style.boxShadow = '0 0 20px rgba(255, 107, 53, 0.6)';
      arrow.style.transform = 'scale(1.1)';
    });
    arrow.addEventListener("mouseleave", () => {
      arrow.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
      arrow.style.transform = 'scale(1)';
    });
  });

  downArrows.forEach(arrow => {
    arrow.addEventListener("click", () => handleNavigation('down'));
    arrow.addEventListener("mouseenter", () => {
      arrow.style.boxShadow = '0 0 20px rgba(255, 107, 53, 0.6)';
      arrow.style.transform = 'scale(1.1)';
    });
    arrow.addEventListener("mouseleave", () => {
      arrow.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
      arrow.style.transform = 'scale(1)';
    });
  });

  // Dot navigation
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      stopAutoRotate();
      updateCarousel(i);
      setTimeout(startAutoRotate, 2000);
    });
  });

  // Card click navigation
  cards.forEach((card, i) => {
    card.addEventListener("click", () => {
      stopAutoRotate();
      updateCarousel(i);
      setTimeout(startAutoRotate, 2000);
    });
  });

  // Touch and swipe support
  let touchStartY = 0;
  let touchEndY = 0;

  document.addEventListener('touchstart', function(e) {
    touchStartY = e.changedTouches[0].screenY;
  });

  document.addEventListener('touchend', function(e) {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        handleNavigation('down');
      } else {
        handleNavigation('up');
      }
    }
  }

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
      e.preventDefault();
      handleNavigation('up');
    } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
      e.preventDefault();
      handleNavigation('down');
    }
  });

  // Pause auto-rotation on hover
  const carouselSection = document.querySelector('.carousel-main-section');
  if (carouselSection) {
    carouselSection.addEventListener('mouseenter', stopAutoRotate);
    carouselSection.addEventListener('mouseleave', startAutoRotate);
  }

  // Initialize carousel and start auto-rotation
  initializeCarousel();
  startAutoRotate();

  // Add resize handler for responsive behavior
  window.addEventListener('resize', function() {
    setTimeout(() => {
      updateCarousel(currentIndex);
    }, 100);
  });
});