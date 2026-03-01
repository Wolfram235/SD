// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
    
    // Smooth Scrolling for Navigation Links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Gallery Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                    item.classList.remove('hidden');
                } else {
                    const itemCategory = item.getAttribute('data-category');
                    if (itemCategory === filterValue) {
                        item.style.display = 'block';
                        item.classList.remove('hidden');
                    } else {
                        item.style.display = 'none';
                        item.classList.add('hidden');
                    }
                }
            });
        });
    });
    
    // Contact Form Handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const orderType = this.querySelector('select').value;
            const requirements = this.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !phone || !orderType || !requirements) {
                alert('Please fill in all fields before submitting your order request.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Success message (In a real application, this would send data to a server)
            alert(`Thank you, ${name}! Your ${orderType} order request has been received. We'll contact you within 24 hours at ${email} to discuss your requirements.`);
            
            // Reset form
            this.reset();
        });
    }
    
    // Header Background on Scroll
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.backgroundColor = 'rgba(254, 252, 252, 0.98)';
            } else {
                header.style.backgroundColor = 'rgba(254, 252, 252, 0.95)';
            }
        });
    }
    
    // Intersection Observer for Animation on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.product-card, .gallery-item, .highlight, .contact-item');
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // Add loading animation for gallery items
    const galleryImages = document.querySelectorAll('.gallery-placeholder');
    galleryImages.forEach((placeholder, index) => {
        setTimeout(() => {
            placeholder.style.opacity = '1';
            placeholder.style.transform = 'scale(1)';
        }, index * 100);
        
        placeholder.style.opacity = '0';
        placeholder.style.transform = 'scale(0.9)';
        placeholder.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Add hover effects for product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function highlightActiveSection() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveSection);
    
    // Initialize gallery (show all items by default)
    galleryItems.forEach(item => {
        item.style.display = 'block';
    });
    
    // Add typing animation to hero text
    const heroTitle = document.querySelector('.hero-text h2');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid #7b423d';
        
        let i = 0;
        const typeSpeed = 50;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, typeSpeed);
            } else {
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        // Start typing animation after a delay
        setTimeout(typeWriter, 500);
    }
    
    // Add form input focus effects
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
    
    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');

    let lightboxImages = [];
    let lightboxIndex = 0;

    function openLightbox(images, index) {
        lightboxImages = images;
        lightboxIndex = index;
        lightboxImg.src = lightboxImages[lightboxIndex];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        lightboxImg.src = '';
    }

    function lightboxStep(dir) {
        lightboxIndex = (lightboxIndex + dir + lightboxImages.length) % lightboxImages.length;
        lightboxImg.src = lightboxImages[lightboxIndex];
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => lightboxStep(-1));
    lightboxNext.addEventListener('click', () => lightboxStep(1));
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') lightboxStep(-1);
        if (e.key === 'ArrowRight') lightboxStep(1);
    });

    // Attach lightbox to gallery items
    const galleryImgs = document.querySelectorAll('.gallery-item .gallery-img');
    const galleryUrls = Array.from(galleryImgs).map(img => img.src);
    galleryImgs.forEach((img, i) => {
        img.closest('.gallery-item').addEventListener('click', () => openLightbox(galleryUrls, i));
    });

    // Attach lightbox to carousel slides
    const carouselImgs = document.querySelectorAll('.carousel-slide img');
    const carouselUrls = Array.from(carouselImgs).map(img => img.src);
    carouselImgs.forEach((img, i) => {
        img.closest('.carousel-slide').addEventListener('click', () => openLightbox(carouselUrls, i));
    });

    // Carousel
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (track && slides.length) {
        let currentIndex = 0;
        let autoplayTimer;

        function getSlideWidth() {
            return slides[0].offsetWidth + 16; // 16px = gap
        }

        function slidesPerView() {
            if (window.innerWidth <= 480) return 1;
            if (window.innerWidth <= 768) return 2;
            return 3;
        }

        function maxIndex() {
            return slides.length - slidesPerView();
        }

        function goTo(index) {
            currentIndex = Math.max(0, Math.min(index, maxIndex()));
            track.style.transform = `translateX(-${currentIndex * getSlideWidth()}px)`;
        }

        function next() { goTo(currentIndex >= maxIndex() ? 0 : currentIndex + 1); }
        function prev() { goTo(currentIndex <= 0 ? maxIndex() : currentIndex - 1); }

        nextBtn.addEventListener('click', () => { next(); resetAutoplay(); });
        prevBtn.addEventListener('click', () => { prev(); resetAutoplay(); });

        function startAutoplay() {
            autoplayTimer = setInterval(next, 4000);
        }
        function resetAutoplay() {
            clearInterval(autoplayTimer);
            startAutoplay();
        }

        track.parentElement.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
        track.parentElement.addEventListener('mouseleave', startAutoplay);

        window.addEventListener('resize', () => goTo(currentIndex));

        startAutoplay();
    }

    console.log('Sweet Delights website loaded successfully! 🍰');
});