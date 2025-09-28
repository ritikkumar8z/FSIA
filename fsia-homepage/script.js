// Modern 6-Image Slider with Professional Effects
let currentModernSlide = 0;
const slides = document.querySelectorAll('.slide-item');
const totalSlides = slides.length;
const indicators = document.querySelectorAll('.indicator');

// Auto-slide functionality
let autoSlideInterval;

function updateSlidePositions() {
    slides.forEach((slide, index) => {
        slide.classList.remove('active', 'prev', 'next');
        
        if (index === currentModernSlide) {
            slide.classList.add('active');
        } else if (index === (currentModernSlide - 1 + totalSlides) % totalSlides) {
            slide.classList.add('prev');
        } else if (index === (currentModernSlide + 1) % totalSlides) {
            slide.classList.add('next');
        }
    });
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentModernSlide);
    });
}

function nextModernSlide() {
    currentModernSlide = (currentModernSlide + 1) % totalSlides;
    updateSlidePositions();
}

function prevModernSlide() {
    currentModernSlide = (currentModernSlide - 1 + totalSlides) % totalSlides;
    updateSlidePositions();
}

function changeModernSlide(direction) {
    if (direction > 0) {
        nextModernSlide();
    } else {
        prevModernSlide();
    }
    resetAutoSlide();
}

function goToModernSlide(index) {
    currentModernSlide = index;
    updateSlidePositions();
    resetAutoSlide();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextModernSlide, 3000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// 404 Page Handler for Suggestions
function handleSuggestionClick(event) {
    event.preventDefault();
    const clickedItem = event.currentTarget;
    const itemText = clickedItem.textContent.trim();
    
    // Create and show 404 modal
    showNotFoundModal(itemText);
}

function showNotFoundModal(itemName) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.modal-404');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal-404';
    modal.innerHTML = `
        <div class="modal-content-404">
            <div class="modal-header-404">
                <i class="fas fa-exclamation-triangle"></i>
                <h2>Page Not Found</h2>
            </div>
            <div class="modal-body-404">
                <p>Sorry, the <strong>${itemName}</strong> page is currently under construction.</p>
                <p>We're working hard to bring you this content soon!</p>
            </div>
            <div class="modal-footer-404">
                <button onclick="closeNotFoundModal()" class="btn-home">
                    <i class="fas fa-home"></i> Back to Home
                </button>
                <button onclick="closeNotFoundModal()" class="btn-close">
                    <i class="fas fa-times"></i> Close
                </button>
            </div>
        </div>
    `;
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .modal-404 {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        .modal-content-404 {
            background: white;
            border-radius: 20px;
            padding: 0;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            animation: slideIn 0.3s ease;
            overflow: hidden;
        }
        .modal-header-404 {
            background: linear-gradient(135deg, #FF1493, #8A2BE2);
            color: white;
            padding: 25px;
            text-align: center;
        }
        .modal-header-404 i {
            font-size: 3rem;
            margin-bottom: 10px;
            display: block;
        }
        .modal-header-404 h2 {
            margin: 0;
            font-family: 'Playfair Display', serif;
            font-size: 1.8rem;
        }
        .modal-body-404 {
            padding: 30px;
            text-align: center;
            line-height: 1.6;
        }
        .modal-body-404 p {
            margin-bottom: 15px;
            color: #555;
        }
        .modal-footer-404 {
            padding: 20px 30px 30px;
            display: flex;
            gap: 15px;
            justify-content: center;
        }
        .btn-home, .btn-close {
            padding: 12px 25px;
            border: none;
            border-radius: 25px;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s ease;
            font-size: 14px;
        }
        .btn-home {
            background: linear-gradient(135deg, #FFD700, #FF1493);
            color: white;
        }
        .btn-close {
            background: #f8f9fa;
            color: #666;
            border: 2px solid #ddd;
        }
        .btn-home:hover, .btn-close:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        @media (max-width: 480px) {
            .modal-content-404 {
                width: 95%;
            }
            .modal-header-404 {
                padding: 20px;
            }
            .modal-body-404 {
                padding: 20px;
            }
            .modal-footer-404 {
                flex-direction: column;
                gap: 10px;
            }
            .btn-home, .btn-close {
                width: 100%;
                justify-content: center;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

function closeNotFoundModal() {
    const modal = document.querySelector('.modal-404');
    if (modal) {
        modal.style.animation = 'fadeIn 0.3s ease reverse';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Announcement Text Animation - Smooth Sequential Display
function initAnnouncementAnimation() {
    const announcementTexts = document.querySelectorAll('.announcement-text');
    let currentIndex = 0;
    
    if (announcementTexts.length === 0) return;
    
    function showNextAnnouncement() {
        // Hide all texts with smooth fade out
        announcementTexts.forEach((text, index) => {
            text.classList.remove('active');
            // Add slight delay for smoother transition
            if (index !== currentIndex) {
                text.style.transition = 'all 0.4s ease';
            }
        });
        
        // Small delay before showing next text to avoid overlap
        setTimeout(() => {
            // Show current text with smooth fade in
            if (announcementTexts[currentIndex]) {
                announcementTexts[currentIndex].style.transition = 'all 0.6s ease';
                announcementTexts[currentIndex].classList.add('active');
            }
            
            // Move to next text
            currentIndex = (currentIndex + 1) % announcementTexts.length;
        }, 200);
    }
    
    // Show first text immediately
    if (announcementTexts[0]) {
        announcementTexts[0].classList.add('active');
        currentIndex = 1;
    }
    
    // Set interval for 3 seconds for better readability
    setInterval(showNextAnnouncement, 3000);
}
let lastScrollTop = 0;
const header = document.querySelector('.header');
const headerTop = document.querySelector('.header-top');
const suggestionsBar = document.querySelector('.suggestions-bar');

function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Header top hide/show logic
    if (scrollTop > 100) {
        headerTop.classList.add('hidden');
        if (suggestionsBar) suggestionsBar.classList.add('hidden');
    } else {
        headerTop.classList.remove('hidden');
        if (suggestionsBar) suggestionsBar.classList.remove('hidden');
    }
    
    // Header background change
    if (scrollTop > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
}

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const dropdowns = document.querySelectorAll('.dropdown');

function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
}

function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
    
    // Close all dropdowns
    dropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
    });
}

// Mobile Dropdown Toggle
function toggleMobileDropdown(dropdown) {
    if (window.innerWidth <= 768) {
        dropdown.classList.toggle('active');
    }
}

// Counter Animation for Stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const increment = target / speed;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    });
}

// Intersection Observer for Stats Animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const header = document.querySelector('.header');
                const suggestionsBar = document.querySelector('.suggestions-bar');
                const headerHeight = header ? header.offsetHeight : 0;
                const suggestionsHeight = suggestionsBar ? suggestionsBar.offsetHeight : 0;
                const totalOffset = headerHeight + suggestionsHeight;
                const targetPosition = target.offsetTop - totalOffset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

// Touch/Swipe Support for Mobile
function initTouchSupport() {
    const sliderContainer = document.querySelector('.modern-slider-container');
    if (!sliderContainer) return;
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    sliderContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextModernSlide();
            } else {
                prevModernSlide();
            }
            resetAutoSlide();
        }
    }
}

// Keyboard Navigation
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            changeModernSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeModernSlide(1);
        } else if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
}

// Click outside to close mobile menu
function initClickOutside() {
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar') && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

// Gallery Tab Functionality
function initGalleryTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            
            // Update active tab
            tabBtns.forEach(tab => tab.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize announcement animation
    initAnnouncementAnimation();
    
    // Initialize modern slider
    updateSlidePositions();
    startAutoSlide();
    
    // Add click event listeners to indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToModernSlide(index));
    });
    
    // Add click event listeners to suggestion items
    document.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', handleSuggestionClick);
    });
    
    // Hamburger menu event listener
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Mobile dropdown event listeners
    dropdowns.forEach(dropdown => {
        const navLink = dropdown.querySelector('.nav-link');
        if (navLink) {
            navLink.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    toggleMobileDropdown(dropdown);
                }
            });
        }
    });
    
    // Close menu when clicking on nav links (mobile)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768 && !link.closest('.dropdown')) {
                closeMobileMenu();
            }
        });
    });
    
    // Initialize other functionalities
    initSmoothScrolling();
    initTouchSupport();
    initKeyboardNavigation();
    initClickOutside();
    initGalleryTabs();
    
    // Observe stats section for animation
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    // Pause auto-slide on hover
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        heroSlider.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Make suggestions container draggable on desktop
    const suggestionsContainer = document.querySelector('.suggestions-container');
    if (suggestionsContainer) {
        let isDragging = false;
        let startX = 0;
        let scrollLeft = 0;
        
        suggestionsContainer.addEventListener('mousedown', (e) => {
            if (window.innerWidth > 768) {
                isDragging = true;
                startX = e.pageX - suggestionsContainer.offsetLeft;
                scrollLeft = suggestionsContainer.scrollLeft;
                suggestionsContainer.style.cursor = 'grabbing';
                suggestionsContainer.style.animationPlayState = 'paused';
            }
        });
        
        suggestionsContainer.addEventListener('mouseleave', () => {
            if (isDragging) {
                isDragging = false;
                suggestionsContainer.style.cursor = 'grab';
                suggestionsContainer.style.animationPlayState = 'running';
            }
        });
        
        suggestionsContainer.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                suggestionsContainer.style.cursor = 'grab';
                suggestionsContainer.style.animationPlayState = 'running';
            }
        });
        
        suggestionsContainer.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - suggestionsContainer.offsetLeft;
            const walk = (x - startX) * 2;
            suggestionsContainer.scrollLeft = scrollLeft - walk;
        });
        
        // Set initial cursor
        if (window.innerWidth > 768) {
            suggestionsContainer.style.cursor = 'grab';
        }
    }
});

// Handle scroll events
window.addEventListener('scroll', handleScroll);

// Handle resize events
window.addEventListener('resize', () => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        closeMobileMenu();
        
        // Remove active class from dropdowns on resize
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});

// Page load optimization
window.addEventListener('load', () => {
    // Add loaded class to body for any load-specific animations
    document.body.classList.add('loaded');
    
    // Ensure proper positioning after all resources load
    setTimeout(() => {
        updateSlidePositions();
    }, 100);
});
