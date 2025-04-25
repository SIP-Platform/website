// Main JavaScript for VisionGuard Website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initializeAnimations();
    
    // Initialize scroll effects
    initializeScrollEffects();
    
    // Initialize interactive elements
    initializeInteractiveElements();
    
    // Initialize theme toggle
    initializeThemeToggle();
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Add parallax effect to hero section
    addParallaxEffect();
});

// Initialize animations for elements
function initializeAnimations() {
    // Animate hero section elements
    animateHeroElements();
    
    // Animate stat cards
    animateStatCards();
    
    // Animate feature cards
    animateFeatureCards();
    
    // Animate data cards
    animateDataCards();
    
    // Animate testimonial cards
    animateTestimonialCards();
    
    // Add hover effects to all cards
    addCardHoverEffects();
    
    // Add pulse animation to CTA buttons
    addPulseAnimation();
}

// Animate hero section elements with staggered timing
function animateHeroElements() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    const ctaButtons = document.querySelector('.cta-buttons');
    
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(20px)';
        heroTitle.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 100);
    }
    
    if (heroSubtitle) {
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transform = 'translateY(20px)';
        heroSubtitle.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        
        setTimeout(() => {
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }, 300);
    }
    
    if (heroDescription) {
        heroDescription.style.opacity = '0';
        heroDescription.style.transform = 'translateY(20px)';
        heroDescription.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        
        setTimeout(() => {
            heroDescription.style.opacity = '1';
            heroDescription.style.transform = 'translateY(0)';
        }, 500);
    }
    
    if (ctaButtons) {
        ctaButtons.style.opacity = '0';
        ctaButtons.style.transform = 'translateY(20px)';
        ctaButtons.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        
        setTimeout(() => {
            ctaButtons.style.opacity = '1';
            ctaButtons.style.transform = 'translateY(0)';
        }, 700);
    }
}

// Animate stat cards with staggered timing
function animateStatCards() {
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 800 + (index * 200));
    });
}

// Animate feature cards when they come into view
function animateFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    featureCards.forEach((card) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(card);
    });
}

// Animate data cards when they come into view
function animateDataCards() {
    const dataCards = document.querySelectorAll('.data-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    dataCards.forEach((card) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(card);
    });
}

// Animate testimonial cards when they come into view
function animateTestimonialCards() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    testimonialCards.forEach((card) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(card);
    });
}

// Add hover effects to all cards
function addCardHoverEffects() {
    const cards = document.querySelectorAll('.stat-card, .feature-card, .data-card, .testimonial-card, .dashboard-preview');
    
    cards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
            card.style.borderColor = 'rgba(0, 230, 118, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '';
            card.style.borderColor = '';
        });
    });
}

// Add pulse animation to CTA buttons
function addPulseAnimation() {
    const ctaButtons = document.querySelectorAll('.btn-primary');
    
    ctaButtons.forEach((button) => {
        button.classList.add('pulse-animation');
    });
}

// Initialize scroll effects
function initializeScrollEffects() {
    // Animate section titles on scroll
    animateSectionTitles();
    
    // Add parallax scroll effect to sections
    addParallaxScrollEffect();
    
    // Add scroll indicator
    addScrollIndicator();
    
    // Add scroll to top button
    addScrollToTopButton();
}

// Animate section titles when they come into view
function animateSectionTitles() {
    const sectionTitles = document.querySelectorAll('.section-title');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-title');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    sectionTitles.forEach((title) => {
        // Add a class for the animation
        const style = document.createElement('style');
        style.innerHTML = `
            .animate-title {
                animation: fadeInUp 0.8s ease-out forwards;
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
        
        observer.observe(title);
    });
}

// Add parallax scroll effect to sections
function addParallaxScrollEffect() {
    const sections = document.querySelectorAll('.features-section, .data-section, .testimonials-section, .cta-section');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition > sectionTop - window.innerHeight && scrollPosition < sectionTop + sectionHeight) {
                const speed = 0.1;
                const yPos = (scrollPosition - sectionTop) * speed;
                
                section.style.backgroundPosition = `center ${yPos}px`;
            }
        });
    });
}

// Add scroll indicator
function addScrollIndicator() {
    const body = document.body;
    const html = document.documentElement;
    
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    scrollIndicator.style.position = 'fixed';
    scrollIndicator.style.top = '0';
    scrollIndicator.style.left = '0';
    scrollIndicator.style.height = '4px';
    scrollIndicator.style.backgroundColor = '#00E676';
    scrollIndicator.style.zIndex = '9999';
    scrollIndicator.style.width = '0%';
    scrollIndicator.style.transition = 'width 0.2s ease-out';
    
    document.body.appendChild(scrollIndicator);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = Math.max(
            body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight
        ) - window.innerHeight;
        
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        scrollIndicator.style.width = `${scrollPercentage}%`;
    });
}

// Add scroll to top button
function addScrollToTopButton() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.style.position = 'fixed';
    scrollToTopBtn.style.bottom = '20px';
    scrollToTopBtn.style.left = '20px';
    scrollToTopBtn.style.width = '40px';
    scrollToTopBtn.style.height = '40px';
    scrollToTopBtn.style.borderRadius = '50%';
    scrollToTopBtn.style.backgroundColor = '#00E676';
    scrollToTopBtn.style.color = '#0D1117';
    scrollToTopBtn.style.border = 'none';
    scrollToTopBtn.style.display = 'flex';
    scrollToTopBtn.style.justifyContent = 'center';
    scrollToTopBtn.style.alignItems = 'center';
    scrollToTopBtn.style.cursor = 'pointer';
    scrollToTopBtn.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)';
    scrollToTopBtn.style.opacity = '0';
    scrollToTopBtn.style.transform = 'translateY(20px)';
    scrollToTopBtn.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    scrollToTopBtn.style.zIndex = '99';
    
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.transform = 'translateY(0)';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.transform = 'translateY(20px)';
        }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize interactive elements
function initializeInteractiveElements() {
    // Add hover effects to navigation items
    addNavHoverEffects();
    
    // Add hover effects to footer links
    addFooterLinkHoverEffects();
    
    // Add typing effect to hero title
    addTypingEffect();
    
    // Add counter animation to stat values
    addCounterAnimation();
    
    // Add notification system
    addNotificationSystem();
}

// Add hover effects to navigation items
function addNavHoverEffects() {
    const navItems = document.querySelectorAll('.main-nav a');
    
    navItems.forEach((item) => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(-5px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
        });
    });
}

// Add hover effects to footer links
function addFooterLinkHoverEffects() {
    const footerLinks = document.querySelectorAll('.footer-links-list a');
    
    footerLinks.forEach((link) => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateX(-5px)';
            link.style.color = '#00E676';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateX(0)';
            link.style.color = '';
        });
    });
}

// Add typing effect to hero title
function addTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const speed = 100; // typing speed in milliseconds
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }
        
        // Start typing after a delay
        setTimeout(typeWriter, 500);
    }
}

// Add counter animation to stat values
function addCounterAnimation() {
    const statValues = document.querySelectorAll('.stat-value');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const value = parseInt(target.textContent);
                let count = 0;
                
                const interval = setInterval(() => {
                    if (count >= value) {
                        clearInterval(interval);
                    } else {
                        count += Math.ceil(value / 20);
                        if (count > value) count = value;
                        
                        if (target.textContent.includes('%')) {
                            target.textContent = count + '%';
                        } else if (target.textContent.includes('ms')) {
                            target.textContent = count + 'ms';
                        } else if (target.textContent.includes('K+')) {
                            target.textContent = count + 'K+';
                        } else {
                            target.textContent = count;
                        }
                    }
                }, 50);
                
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.1 });
    
    statValues.forEach((value) => {
        observer.observe(value);
    });
}

// Add notification system
function addNotificationSystem() {
    // Create notification container
    const notificationContainer = document.createElement('div');
    notificationContainer.className = 'notification-container';
    notificationContainer.style.position = 'fixed';
    notificationContainer.style.bottom = '20px';
    notificationContainer.style.left = '20px';
    notificationContainer.style.zIndex = '9999';
    
    document.body.appendChild(notificationContainer);
    
    // Add global function to show notifications
    window.showNotification = function(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.backgroundColor = type === 'success' ? '#00E676' : '#FF5252';
        notification.style.color = '#0D1117';
        notification.style.padding = '12px 20px';
        notification.style.borderRadius = '8px';
        notification.style.marginTop = '10px';
        notification.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        notification.style.transition = 'all 0.3s ease';
        notification.style.fontFamily = 'Tajawal, sans-serif';
        notification.style.fontWeight = 'bold';
        
        notificationContainer.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);
        
        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';
            
            // Remove notification after animation
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    };
    
    // Add click event to CTA buttons to show notifications
    const ctaButtons = document.querySelectorAll('.cta-button, .dashboard-link');
    
    ctaButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            window.showNotification('تم تسجيل طلبك بنجاح، سنتواصل معك قريباً');
        });
    });
}

// Initialize theme toggle
function initializeThemeToggle() {
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.style.position = 'fixed';
    themeToggle.style.top = '20px';
    themeToggle.style.left = '20px';
    themeToggle.style.width = '40px';
    themeToggle.style.height = '40px';
    themeToggle.style.borderRadius = '50%';
    themeToggle.style.backgroundColor = '#161B22';
    themeToggle.style.color = '#00E676';
    themeToggle.style.border = '2px solid #00E676';
    themeToggle.style.display = 'flex';
    themeToggle.style.justifyContent = 'center';
    themeToggle.style.alignItems = 'center';
    themeToggle.style.cursor = 'pointer';
    themeToggle.style.zIndex = '999';
    themeToggle.style.transition = 'all 0.3s ease';
    
    document.body.appendChild(themeToggle);
    
    // Add click event to toggle theme
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        
        if (document.body.classList.contains('light-theme')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggle.style.backgroundColor = '#FFFFFF';
            themeToggle.style.color = '#00C853';
            
            // Add light theme styles
            const lightThemeStyle = document.createElement('style');
            lightThemeStyle.id = 'light-theme-style';
            lightThemeStyle.innerHTML = `
                body.light-theme {
                    --dark-bg: #F5F5F5;
                    --darker-bg: #EEEEEE;
                    --card-bg: #FFFFFF;
                    --card-hover: #F9F9F9;
                    --text-primary: #212121;
                    --text-secondary: #424242;
                    --text-muted: #757575;
                }
                
                body.light-theme .sidebar {
                    box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
                }
                
                body.light-theme .header {
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                }
                
                body.light-theme .card {
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                }
            `;
            
            document.head.appendChild(lightThemeStyle);
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            themeToggle.style.backgroundColor = '#161B22';
            themeToggle.style.color = '#00E676';
            
            // Remove light theme styles
            const lightThemeStyle = document.getElementById('light-theme-style');
            if (lightThemeStyle) {
                lightThemeStyle.remove();
            }
        }
        
        // Show notification
        if (window.showNotification) {
            if (document.body.classList.contains('light-theme')) {
                window.showNotification('تم تفعيل الوضع النهاري');
            } else {
                window.showNotification('تم تفعيل الوضع الليلي');
            }
        }
    });
}

// Initialize mobile menu
function initializeMobileMenu() {
    // Create mobile menu toggle button
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuToggle.style.position = 'fixed';
    mobileMenuToggle.style.top = '20px';
    mobileMenuToggle.style.right = '20px';
    mobileMenuToggle.style.width = '40px';
    mobileMenuToggle.style.height = '40px';
    mobileMenuToggle.style.borderRadius = '50%';
    mobileMenuToggle.style.backgroundColor = '#161B22';
    mobileMenuToggle.style.color = '#00E676';
    mobileMenuToggle.style.border = '2px solid #00E676';
    mobileMenuToggle.style.display = 'none';
    mobileMenuToggle.style.justifyContent = 'center';
    mobileMenuToggle.style.alignItems = 'center';
    mobileMenuToggle.style.cursor = 'pointer';
    mobileMenuToggle.style.zIndex = '999';
    mobileMenuToggle.style.transition = 'all 0.3s ease';
    
    document.body.appendChild(mobileMenuToggle);
    
    // Show mobile menu toggle on small screens
    const mediaQuery = window.matchMedia('(max-width: 992px)');
    
    function handleScreenChange(e) {
        if (e.matches) {
            mobileMenuToggle.style.display = 'flex';
        } else {
            mobileMenuToggle.style.display = 'none';
            
            // Reset sidebar if it was open
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) {
                sidebar.style.transform = '';
                sidebar.style.boxShadow = '';
            }
            
            // Remove overlay if it exists
            const overlay = document.querySelector('.mobile-menu-overlay');
            if (overlay) {
                overlay.remove();
            }
        }
    }
    
    mediaQuery.addListener(handleScreenChange);
    handleScreenChange(mediaQuery);
    
    // Add click event to toggle mobile menu
    mobileMenuToggle.addEventListener('click', () => {
        const sidebar = document.querySelector('.sidebar');
        
        if (sidebar) {
            // Check if sidebar is open
            const isOpen = sidebar.style.transform === 'translateX(0px)';
            
            if (isOpen) {
                // Close sidebar
                sidebar.style.transform = 'translateX(100%)';
                sidebar.style.boxShadow = 'none';
                
                // Change icon to bars
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                
                // Remove overlay
                const overlay = document.querySelector('.mobile-menu-overlay');
                if (overlay) {
                    overlay.style.opacity = '0';
                    
                    setTimeout(() => {
                        overlay.remove();
                    }, 300);
                }
            } else {
                // Open sidebar
                sidebar.style.transform = 'translateX(0)';
                sidebar.style.boxShadow = '-4px 0 10px rgba(0, 0, 0, 0.2)';
                
                // Change icon to times
                mobileMenuToggle.innerHTML = '<i class="fas fa-times"></i>';
                
                // Add overlay
                const overlay = document.createElement('div');
                overlay.className = 'mobile-menu-overlay';
                overlay.style.position = 'fixed';
                overlay.style.top = '0';
                overlay.style.left = '0';
                overlay.style.width = '100%';
                overlay.style.height = '100%';
                overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                overlay.style.zIndex = '99';
                overlay.style.opacity = '0';
                overlay.style.transition = 'opacity 0.3s ease';
                
                document.body.appendChild(overlay);
                
                // Show overlay
                setTimeout(() => {
                    overlay.style.opacity = '1';
                }, 10);
                
                // Add click event to close menu when overlay is clicked
                overlay.addEventListener('click', () => {
                    sidebar.style.transform = 'translateX(100%)';
                    sidebar.style.boxShadow = 'none';
                    
                    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    
                    overlay.style.opacity = '0';
                    
                    setTimeout(() => {
                        overlay.remove();
                    }, 300);
                });
            }
        }
    });
}

// Add parallax effect to hero section
function addParallaxEffect() {
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        window.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            heroSection.style.backgroundPosition = `${x * 10}px ${y * 10}px`;
        });
    }
}

// Initialize preview chart on homepage
document.addEventListener('DOMContentLoaded', function() {
    const previewChartCtx = document.getElementById('previewChart');
    if (previewChartCtx) {
        const ctx = previewChartCtx.getContext('2d');
        
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(0, 230, 118, 0.5)');
        gradient.addColorStop(1, 'rgba(0, 230, 118, 0)');
        
        new Chart(previewChartCtx, {
            type: 'line',
            data: {
                labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
                datasets: [{
                    label: 'مؤشر خطر الإصابة',
                    data: [35, 30, 25, 22, 20, 18],
                    borderColor: '#00E676',
                    backgroundColor: gradient,
                    borderWidth: 3,
                    pointBackgroundColor: '#00E676',
                    pointBorderColor: '#161B22',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: '#161B22',
                        titleColor: '#FFFFFF',
                        bodyColor: '#A3B3BC',
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        borderWidth: 1,
                        padding: 10,
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y + '%';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#A3B3BC',
                            font: {
                                family: 'Tajawal, sans-serif'
                            }
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#A3B3BC',
                            font: {
                                family: 'Tajawal, sans-serif'
                            },
                            callback: function(value) {
                                return value + '%';
                            }
                        },
                        beginAtZero: true
                    }
                }
            }
        });
    }
});
