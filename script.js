document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('active');
        });
    });

    // Custom Smooth Scrolling with Easing (Slider Effect)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                // Close mobile menu if open
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');

                // Custom Scroll Animation
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                const startPosition = window.pageYOffset;
                const distance = offsetPosition - startPosition;
                const duration = 1000; // 1 second duration
                let start = null;

                function step(timestamp) {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    const percentage = Math.min(progress / duration, 1);

                    // Ease In Out Cubic
                    const ease = percentage < 0.5 ?
                        4 * percentage * percentage * percentage :
                        1 - Math.pow(-2 * percentage + 2, 3) / 2;

                    window.scrollTo(0, startPosition + distance * ease);

                    if (progress < duration) {
                        window.requestAnimationFrame(step);
                    }
                }

                window.requestAnimationFrame(step);
            }
        });
    });

    // Add scroll effect to navbar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Contact Form Handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = contactForm.querySelector('input[type="email"]');
            const userEmail = emailInput.value;

            if (userEmail) {
                const recipient = 'tech@bloomarina.com';
                const subject = encodeURIComponent('New Inquiry from Bloomarina Website');
                const body = encodeURIComponent(`Hello,\n\nI am interested in your services.\n\nMy email is: ${userEmail}\n\nPlease contact me back.\n\nRegards,`);

                window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
            }
        });
    }

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => {
        observer.observe(el);
    });

    // 3D Tilt Effect
    document.querySelectorAll('.glass-card, .service-box').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10; // Max rotation deg
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // 3D Slider Logic
    const init3DSlider = () => {
        const cards = document.querySelectorAll('.tech-card-3d');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');

        if (!cards.length) return;

        let currentIndex = 0;
        const totalCards = cards.length;

        const updateSlider = () => {
            cards.forEach((card, index) => {
                // Reset Classes
                card.classList.remove('active', 'prev', 'next');
                card.style.removeProperty('opacity');
                card.style.removeProperty('z-index');

                // Handle Wrapping logic for prev/next
                // Current is active
                if (index === currentIndex) {
                    card.classList.add('active');
                }
                // Next Card logic
                else if (index === (currentIndex + 1) % totalCards) {
                    card.classList.add('next');
                }
                // Prev Card logic
                else if (index === (currentIndex - 1 + totalCards) % totalCards) {
                    card.classList.add('prev');
                }
            });
        };

        // Auto Play
        let autoPlayInterval;

        const startAutoPlay = () => {
            autoPlayInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % totalCards;
                updateSlider();
            }, 3000); // 3 seconds
        };

        const stopAutoPlay = () => {
            clearInterval(autoPlayInterval);
        };

        // Event Listeners
        nextBtn.addEventListener('click', () => {
            stopAutoPlay();
            currentIndex = (currentIndex + 1) % totalCards;
            updateSlider();
            startAutoPlay();
        });

        prevBtn.addEventListener('click', () => {
            stopAutoPlay();
            currentIndex = (currentIndex - 1 + totalCards) % totalCards;
            updateSlider();
            startAutoPlay();
        });

        // Pause on Hover
        const sliderContainer = document.querySelector('.slider-container-3d');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', stopAutoPlay);
            sliderContainer.addEventListener('mouseleave', startAutoPlay);
        }

        // Initial state
        updateSlider();
        startAutoPlay();
    };

    init3DSlider();

    console.log("Bloomarina website loaded successfully!");

    // Initialize Particles.js
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 40,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#6366f1"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#6366f1",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "window",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
});
