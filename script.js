// ===== DARK MODE TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
  body.classList.add('dark-mode');
  themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  
  if (body.classList.contains('dark-mode')) {
    themeToggle.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  } else {
    themeToggle.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  }
});

// ===== MOBILE MENU =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

if (mobileMenuBtn && mobileMenu && closeMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
  });

  closeMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
  });

  // Close menu when clicking on a link
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      mobileMenu.classList.remove('active');
    }
  });
}

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  // Add shadow on scroll
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// ===== TYPING EFFECT (Home Page Only) =====
const typingText = document.getElementById('typingText');

if (typingText) {
  const phrases = [
    'Computer Science Engineer',
    'Problem Solver',
    'Creative Coder',
    'Tech Enthusiast',
    'Lifelong Learner'];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      typingText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingText.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at end
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500;
    }
    
    setTimeout(type, typingSpeed);
  }

  // Start typing effect
  setTimeout(type, 500);
}

// ===== PROFILE PICTURE POPUP (Home Page Only) =====
const profilePic = document.getElementById('profilePic');

if (profilePic) {
  profilePic.addEventListener('click', () => {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      cursor: pointer;
      animation: fadeIn 0.3s ease;
    `;
    
    // Create enlarged image
    const img = document.createElement('img');
    img.src = profilePic.src;
    img.alt = 'Ankita Debnath';
    img.style.cssText = `
      max-width: 90%;
      max-height: 90%;
      border-radius: 20px;
      box-shadow: 0 10px 50px rgba(59, 130, 246, 0.5);
      animation: zoomIn 0.3s ease;
    `;
    
    // Add styles for animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes zoomIn {
        from { transform: scale(0.5); }
        to { transform: scale(1); }
      }
      @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
      }
    `;
    document.head.appendChild(style);
    
    modal.appendChild(img);
    document.body.appendChild(modal);
    
    // Close on click
    modal.addEventListener('click', () => {
      modal.style.animation = 'fadeOut 0.3s ease';
      setTimeout(() => {
        document.body.removeChild(modal);
        document.head.removeChild(style);
      }, 300);
    });
  });
}

// ===== SCROLL REVEAL ANIMATIONS =====
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  const revealPoint = 100;
  
  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    
    if (elementTop < windowHeight - revealPoint) {
      element.classList.add('active');
    }
  });
};

// Initial check
window.addEventListener('DOMContentLoaded', revealOnScroll);

// Check on scroll
window.addEventListener('scroll', revealOnScroll);

// ===== SKILL TAG INTERACTIONS (Skills Page Only) =====
const skillTags = document.querySelectorAll('.skill-tag');

if (skillTags.length > 0) {
  skillTags.forEach(tag => {
    tag.addEventListener('click', () => {
      // Create a professional particle effect
      const rect = tag.getBoundingClientRect();
      const particles = ['•', '+', '×', '·'];
      
      for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];
        particle.style.cssText = `
          position: fixed;
          left: ${rect.left + rect.width / 2}px;
          top: ${rect.top + rect.height / 2}px;
          pointer-events: none;
          font-size: 1.5rem;
          color: var(--accent-primary);
          animation: particleBurst 1s ease-out forwards;
          z-index: 9999;
        `;
        
        const angle = (Math.PI * 2 * i) / 5;
        const distance = 50 + Math.random() * 50;
        particle.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
        particle.style.setProperty('--ty', `${Math.sin(angle) * distance}px`);
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
          document.body.removeChild(particle);
        }, 1000);
      }
    });
  });

  // Add particle burst animation
  const particleStyle = document.createElement('style');
  particleStyle.textContent = `
    @keyframes particleBurst {
      0% {
        opacity: 1;
        transform: translate(0, 0) scale(1);
      }
      100% {
        opacity: 0;
        transform: translate(var(--tx), var(--ty)) scale(0);
      }
    }
  `;
  document.head.appendChild(particleStyle);
}

// ===== PROJECT CARD INTERACTIONS (Projects Page Only) =====
const projectCards = document.querySelectorAll('.project-card');

if (projectCards.length > 0) {
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const icon = card.querySelector('.project-icon');
      if (icon) {
        icon.style.animation = 'bounce 0.6s ease';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      const icon = card.querySelector('.project-icon');
      if (icon) {
        icon.style.animation = '';
      }
    });
  });

  // Add bounce animation
  const bounceStyle = document.createElement('style');
  bounceStyle.textContent = `
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
  `;
  document.head.appendChild(bounceStyle);
}

// ===== CONTACT BUTTONS RIPPLE EFFECT (Contact Page Only) =====
const contactItems = document.querySelectorAll('.contact-item');

if (contactItems.length > 0) {
  contactItems.forEach(item => {
    item.addEventListener('click', (e) => {
      // Create ripple effect
      const ripple = document.createElement('span');
      const rect = item.getBoundingClientRect();
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(59, 130, 246, 0.5);
        width: 100px;
        height: 100px;
        left: ${e.clientX - rect.left - 50}px;
        top: ${e.clientY - rect.top - 50}px;
        animation: ripple 0.6s ease-out;
        pointer-events: none;
      `;
      
      item.style.position = 'relative';
      item.appendChild(ripple);
      
      setTimeout(() => {
        if (item.contains(ripple)) {
          item.removeChild(ripple);
        }
      }, 600);
    });
  });

  // Add ripple animation
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `
    @keyframes ripple {
      0% {
        transform: scale(0);
        opacity: 1;
      }
      100% {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(rippleStyle);
}



// ===== TAG HOVER EFFECT (Home Page Only) =====
const tags = document.querySelectorAll('.tag');

if (tags.length > 0) {
  tags.forEach(tag => {
    tag.addEventListener('mouseenter', () => {
      tag.style.transform = 'translateY(-3px)';
      tag.style.boxShadow = '0 0 20px var(--glow-lavender)';
    });
    
    tag.addEventListener('mouseleave', () => {
      tag.style.transform = '';
      tag.style.boxShadow = '';
    });
  });
}

// ===== TIMELINE ANIMATIONS (Education Page Only) =====
const timelineItems = document.querySelectorAll('.timeline-item');

if (timelineItems.length > 0) {
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
  };

  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  timelineItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `all 0.6s ease ${index * 0.2}s`;
    timelineObserver.observe(item);
  });
}

// ===== PROFESSIONAL INTERACTION (Easter Egg) =====
let clickCount = 0;
const logo = document.querySelector('.logo');

if (logo) {
  logo.addEventListener('click', () => {
    clickCount++;
    
    if (clickCount === 5) {
      // Trigger professional effect
      professionalEffect();
      clickCount = 0;
    }
  });
}

function professionalEffect() {
  const symbols = ['•', '+', '×', '·', '◆', '▪', '▫'];
  const duration = 4000;
  const interval = 100;
  
  const effectInterval = setInterval(() => {
    const symbol = document.createElement('div');
    symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    symbol.style.cssText = `
      position: fixed;
      left: ${Math.random() * 100}vw;
      top: -50px;
      font-size: 2rem;
      color: var(--accent-primary);
      pointer-events: none;
      z-index: 9999;
      animation: fall 2s linear forwards;
    `;
    
    document.body.appendChild(symbol);
    
    setTimeout(() => {
      if (document.body.contains(symbol)) {
        document.body.removeChild(symbol);
      }
    }, 2000);
  }, interval);
  
  setTimeout(() => {
    clearInterval(effectInterval);
  }, duration);
}

// Add fall animation
const fallStyle = document.createElement('style');
fallStyle.textContent = `
  @keyframes fall {
    to {
      transform: translateY(100vh) rotate(360deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(fallStyle);

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
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

// Apply debounce to scroll-heavy functions
window.addEventListener('scroll', debounce(revealOnScroll, 10));

// ===== CONSOLE EASTER EGG =====
console.log('%c✨ Professional Developer Portfolio', 'color: #3B82F6; font-size: 20px; font-weight: bold;');
console.log('%cInterested in connecting? Let\'s talk!', 'color: #2563EB; font-size: 16px;');
console.log('%cEmail: debnath2004ankita@gmail.com', 'color: #0EA5E9; font-size: 14px;');

// ===== ACCESSIBILITY ENHANCEMENTS =====
// Keyboard navigation support
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu) {
    mobileMenu.classList.remove('active');
  }
});

// Focus trap for mobile menu
if (mobileMenu) {
  const focusableElements = mobileMenu.querySelectorAll('button, a');
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  mobileMenu.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
  });
}

// ===== SMOOTH PAGE TRANSITIONS =====
// Add fade-in effect when page loads
window.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

// ===== PREVENT FLASH ON PAGE LOAD =====
// Apply saved theme before page renders
(function() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }
})();

// ===== ANIMATED COUNTERS (If needed for future stats) =====
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
}

// ===== INTERSECTION OBSERVER FOR PERFORMANCE =====
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imageObserver.unobserve(img);
      }
    });
  });

  // Observe all images with data-src attribute
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ===== PRELOAD CRITICAL RESOURCES =====
window.addEventListener('DOMContentLoaded', () => {
  // Preload profile image if on home page
  if (profilePic) {
    const img = new Image();
    img.src = profilePic.src;
  }
});

// ===== DYNAMIC YEAR UPDATE IN FOOTER =====
const footerYear = document.querySelector('.footer-tagline strong');
if (footerYear && footerYear.textContent.includes('2026')) {
  const currentYear = new Date().getFullYear();
  footerYear.textContent = footerYear.textContent.replace('2026', currentYear);
}