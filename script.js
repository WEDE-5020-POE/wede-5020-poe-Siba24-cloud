// ============================================
// KOLISI FOUNDATION - MAIN JAVASCRIPT FILE
// Handles all interactive functionality across all pages
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ============================================
    // 1. MOBILE NAVIGATION TOGGLE
    // ============================================
    const navToggle = document.getElementById('nav-toggle');
    const navbar = document.querySelector('.navbar');
    
    if (navToggle && navbar) {
        // Close mobile menu when clicking a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navToggle.checked = false;
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (window.innerWidth <= 768) {
                const isClickInside = navbar.contains(event.target) || navToggle.contains(event.target);
                if (!isClickInside && navToggle.checked) {
                    navToggle.checked = false;
                }
            }
        });
    }

    // ============================================
    // 2. ACTIVE NAVIGATION HIGHLIGHTING
    // ============================================
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage) {
                link.classList.add('active');
            } else if (currentPage === '' && linkHref === 'index.html') {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    setActiveNavLink();

    // ============================================
    // 3. ENQUIRY FORM VALIDATION & HANDLING
    // ============================================
    const enquiryForm = document.querySelector('#enquiryForm, form[action="#"]');
    
    function validateEmail(email) {
        const re = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
        return re.test(email);
    }
    
    function validatePhone(phone) {
        const re = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{3,4}[-\s\.]?[0-9]{3,4}$/;
        return re.test(phone) || phone.length >= 10;
    }
    
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Full name validation
            const fullname = document.getElementById('fullname');
            const nameError = document.getElementById('nameError');
            if (fullname && nameError) {
                if (fullname.value.trim().length < 2) {
                    nameError.textContent = 'Please enter your full name (at least 2 characters)';
                    isValid = false;
                } else {
                    nameError.textContent = '';
                }
            }
            
            // Phone validation
            const phone = document.getElementById('phone');
            const phoneError = document.getElementById('phoneError');
            if (phone && phoneError) {
                if (!validatePhone(phone.value.trim())) {
                    phoneError.textContent = 'Please enter a valid phone number';
                    isValid = false;
                } else {
                    phoneError.textContent = '';
                }
            }
            
            // Email validation
            const email = document.getElementById('email');
            const emailError = document.getElementById('emailError');
            if (email && emailError) {
                if (!validateEmail(email.value.trim())) {
                    emailError.textContent = 'Please enter a valid email address';
                    isValid = false;
                } else {
                    emailError.textContent = '';
                }
            }
            
            // Interest validation
            const interest = document.getElementById('interest');
            const interestError = document.getElementById('interestError');
            if (interest && interestError) {
                if (!interest.value) {
                    interestError.textContent = 'Please select an option';
                    isValid = false;
                } else {
                    interestError.textContent = '';
                }
            }
            
            // Message validation (for contact form)
            const contactMsg = document.getElementById('contactMsg');
            const msgError = document.getElementById('msgError');
            if (contactMsg && msgError) {
                if (contactMsg.value.trim().length < 10) {
                    msgError.textContent = 'Please enter a message (at least 10 characters)';
                    isValid = false;
                } else {
                    msgError.textContent = '';
                }
            }
            
            if (isValid) {
                // Show success message
                const responseDiv = document.getElementById('enqResponse') || document.getElementById('formResponse');
                if (responseDiv) {
                    responseDiv.innerHTML = '<div class="alert-success">Thank you! Your enquiry has been sent successfully. We will contact you soon.</div>';
                    responseDiv.style.color = '#155724';
                    enquiryForm.reset();
                    
                    // Clear success message after 5 seconds
                    setTimeout(() => {
                        responseDiv.innerHTML = '';
                    }, 5000);
                } else {
                    alert('Thank you! Your enquiry has been sent successfully.');
                    enquiryForm.reset();
                }
                
                // Update progress indicator if exists
                updateProgressIndicator(3);
            }
        });
        
        // Clear form button
        const resetBtn = enquiryForm.querySelector('button[type="reset"]');
        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                setTimeout(() => {
                    const errorMessages = document.querySelectorAll('.error-message');
                    errorMessages.forEach(msg => msg.textContent = '');
                    const responseDiv = document.getElementById('enqResponse') || document.getElementById('formResponse');
                    if (responseDiv) responseDiv.innerHTML = '';
                }, 100);
            });
        }
    }
    
    // Progress indicator update function
    function updateProgressIndicator(step) {
        const progressSteps = document.querySelectorAll('.progress-step');
        if (progressSteps.length > 0) {
            progressSteps.forEach((stepEl, index) => {
                if (index < step) {
                    stepEl.classList.add('active');
                } else {
                    stepEl.classList.remove('active');
                }
            });
        }
    }
    
    // Real-time validation for enquiry form
    const fullnameInput = document.getElementById('fullname');
    if (fullnameInput) {
        fullnameInput.addEventListener('input', function() {
            const nameError = document.getElementById('nameError');
            if (this.value.trim().length >= 2) {
                nameError.textContent = '';
            }
        });
    }
    
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            const emailError = document.getElementById('emailError');
            if (validateEmail(this.value.trim())) {
                emailError.textContent = '';
            }
        });
    }
    
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            const phoneError = document.getElementById('phoneError');
            if (validatePhone(this.value.trim())) {
                phoneError.textContent = '';
            }
        });
    }
    
    // Character counter for message field
    const contactMsg = document.getElementById('contactMsg');
    if (contactMsg) {
        const charCounter = document.querySelector('.char-counter');
        if (charCounter) {
            contactMsg.addEventListener('input', function() {
                const count = this.value.length;
                const counterSpan = charCounter.querySelector('span');
                if (counterSpan) {
                    counterSpan.textContent = count;
                }
                if (count > 500) {
                    this.value = this.value.substring(0, 500);
                    if (counterSpan) counterSpan.textContent = 500;
                }
            });
        }
    }

    // ============================================
    // 4. COPY ADDRESS FUNCTIONALITY
    // ============================================
    const copyAddressBtn = document.getElementById('copyAddressBtn');
    if (copyAddressBtn) {
        copyAddressBtn.addEventListener('click', function() {
            const addressBlock = document.querySelector('.address-block p');
            if (addressBlock) {
                const addressText = addressBlock.innerText;
                navigator.clipboard.writeText(addressText).then(() => {
                    showToast('Address copied to clipboard!');
                }).catch(() => {
                    alert('Address: ' + addressText);
                });
            }
        });
    }

    // ============================================
    // 5. TOAST NOTIFICATION SYSTEM
    // ============================================
    function showToast(message, duration = 3000) {
        let toast = document.querySelector('.toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    }

    // ============================================
    // 6. VOLUNTEER MODAL FUNCTIONALITY (About Page)
    // ============================================
    const modal = document.getElementById('teamModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const closeModal = document.querySelector('.close-modal, .close');
    
    // Volunteer testimonial click handlers
    const volunteerMembers = document.querySelectorAll('.volunteer-member, .testimonial-card');
    volunteerMembers.forEach(member => {
        member.addEventListener('click', function(e) {
            const nameEl = this.querySelector('.volunteer-name, .testimonial-name');
            const testimonialEl = this.querySelector('.volunteer-testimonial, .testimonial-text');
            if (nameEl && testimonialEl && modal && modalTitle && modalBody) {
                const name = nameEl.textContent.replace('strong', '').trim();
                const testimonial = testimonialEl.textContent;
                modalTitle.textContent = name;
                modalBody.textContent = testimonial;
                modal.style.display = 'flex';
            }
        });
    });
    
    // Founder click handlers
    const founderMembers = document.querySelectorAll('.founder-member, .founder-card');
    founderMembers.forEach(founder => {
        founder.addEventListener('click', function(e) {
            const nameEl = this.querySelector('.founder-name');
            const bioEl = this.querySelector('.founder-bio');
            if (nameEl && bioEl && modal && modalTitle && modalBody) {
                const name = nameEl.textContent.replace('strong', '').trim();
                const bio = bioEl.textContent;
                modalTitle.textContent = name;
                modalBody.textContent = bio;
                modal.style.display = 'flex';
            }
        });
    });
    
    // Close modal when clicking X
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            if (modal) modal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside
    if (modal) {
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // ============================================
    // 7. SERVICE MODAL FUNCTIONALITY (Services Page)
    // ============================================
    const serviceModal = document.getElementById('serviceModal');
    const modalServiceName = document.getElementById('modalServiceName');
    const modalServiceDetails = document.getElementById('modalServiceDetails');
    const modalApplyBtn = document.getElementById('modalApplyBtn');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    
    // Service row click handlers
    const serviceRows = document.querySelectorAll('.services-table tr, .service-table tbody tr');
    serviceRows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length >= 3) {
            row.style.cursor = 'pointer';
            row.addEventListener('click', function(e) {
                if (e.target.tagName === 'A') return;
                
                const serviceName = cells[0] ? cells[0].textContent.trim() : 'Service';
                const serviceDesc = cells[1] ? cells[1].textContent.trim() : '';
                const serviceLocation = cells[2] ? cells[2].textContent.trim() : '';
                
                if (serviceModal && modalServiceName && modalServiceDetails) {
                    modalServiceName.textContent = serviceName;
                    modalServiceDetails.innerHTML = `
                        <p><strong>Description:</strong> ${serviceDesc}</p>
                        <p><strong>Location:</strong> ${serviceLocation}</p>
                        <p><strong>How to help:</strong> Contact us to volunteer or donate to this program.</p>
                    `;
                    serviceModal.style.display = 'flex';
                }
            });
        }
    });
    
    // Modal close handlers for service modal
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', function() {
            if (serviceModal) serviceModal.style.display = 'none';
        });
    }
    
    if (modalApplyBtn) {
        modalApplyBtn.addEventListener('click', function() {
            window.location.href = 'enquiry.html';
        });
    }
    
    // Close service modal on outside click
    if (serviceModal) {
        window.addEventListener('click', function(event) {
            if (event.target === serviceModal) {
                serviceModal.style.display = 'none';
            }
        });
    }

    // ============================================
    // 8. ACCORDION FUNCTIONALITY
    // ============================================
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            if (content && content.classList.contains('accordion-content')) {
                content.classList.toggle('active');
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            }
        });
    });

    // ============================================
    // 9. STATS COUNTER ANIMATION (Home Page)
    // ============================================
    function animateNumbers() {
        const statNumbers = document.querySelectorAll('.stat-number');
        if (statNumbers.length === 0) return;
        
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const targetNumber = parseInt(element.getAttribute('data-target') || element.textContent.replace(/\D/g, '')) || 0;
                    if (targetNumber > 0 && !element.hasAttribute('data-animated')) {
                        element.setAttribute('data-animated', 'true');
                        let current = 0;
                        const increment = targetNumber / 50;
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= targetNumber) {
                                element.textContent = targetNumber.toLocaleString();
                                clearInterval(timer);
                            } else {
                                element.textContent = Math.floor(current).toLocaleString();
                            }
                        }, 30);
                    }
                }
            });
        }, observerOptions);
        
        statNumbers.forEach(num => observer.observe(num));
    }
    
    // Set data-target attributes for stat numbers
    const statItems = document.querySelectorAll('.stat-item');
    if (statItems.length > 0) {
        const statNumbers = document.querySelectorAll('.stat-number');
        const values = [120, 4000, 8];
        statNumbers.forEach((num, index) => {
            if (values[index]) {
                num.setAttribute('data-target', values[index]);
            }
        });
    }
    animateNumbers();

    // ============================================
    // 10. NEWSLETTER SUBSCRIPTION
    // ============================================
    const subscribeForms = document.querySelectorAll('.newsletter-form, form[action*="subscribe"]');
    subscribeForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && validateEmail(emailInput.value)) {
                showToast('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            } else if (emailInput) {
                showToast('Please enter a valid email address.');
            }
        });
    });

    // ============================================
    // 11. SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#' && targetId !== '#!') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ============================================
    // 12. FORM PROGRESS TRACKING (Multi-step forms)
    // ============================================
    const formInputs = document.querySelectorAll('form input, form select, form textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            const formSection = this.closest('fieldset');
            if (formSection) {
                const progressSteps = document.querySelectorAll('.progress-step');
                if (progressSteps.length > 0) {
                    progressSteps.forEach((step, idx) => {
                        if (idx === 0) step.classList.add('active');
                    });
                }
            }
        });
    });

    // ============================================
    // 13. DONATION MODAL (Home Page)
    // ============================================
    const donationModal = document.getElementById('donationModalContent');
    const donationModalClose = donationModal ? donationModal.querySelector('.close-modal') : null;
    
    // Show donation modal after 5 seconds (optional)
    setTimeout(() => {
        if (donationModal && donationModal.style.display !== 'block') {
            const hasShownModal = sessionStorage.getItem('donationModalShown');
            if (!hasShownModal) {
                donationModal.style.display = 'block';
                sessionStorage.setItem('donationModalShown', 'true');
            }
        }
    }, 5000);
    
    if (donationModalClose) {
        donationModalClose.addEventListener('click', function() {
            if (donationModal) donationModal.style.display = 'none';
        });
    }
    
    if (donationModal) {
        window.addEventListener('click', function(event) {
            if (event.target === donationModal) {
                donationModal.style.display = 'none';
            }
        });
    }

    // ============================================
    // 14. GET INVOLVED BUTTON TRACKING
    // ============================================
    const getInvolvedBtns = document.querySelectorAll('.donate-btn, .btn-primary, .btn-small');
    getInvolvedBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.includes('enquiry.html')) {
                console.log('Get Involved button clicked - redirecting to enquiry page');
            }
        });
    });

    // ============================================
    // 15. RESPONSIVE TABLE WRAPPER
    // ============================================
    const tables = document.querySelectorAll('.services-table, .service-table, .table');
    tables.forEach(table => {
        if (table.parentElement && !table.parentElement.classList.contains('table-container')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'table-container';
            wrapper.style.overflowX = 'auto';
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
        }
    });

    // ============================================
    // 16. GOOGLE MAPS INTERACTION (Optional enhancement)
    // ============================================
    const mapIframe = document.querySelector('.google-map, .map-container iframe');
    if (mapIframe && mapIframe.tagName === 'IFRAME') {
        mapIframe.setAttribute('title', 'Kolisi Foundation Office Location Map');
    }

    // ============================================
    // 17. SOCIAL MEDIA SHARE FUNCTIONALITY
    // ============================================
    window.shareOnFacebook = function(url) {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank', 'width=600,height=400');
    };
    
    window.shareOnTwitter = function(url, text) {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank', 'width=600,height=400');
    };

    // ============================================
    // 18. LAZY LOADING FOR IMAGES
    // ============================================
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
        if (img.getAttribute('src') && !img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
    });

    // ============================================
    // 19. BACK TO TOP BUTTON (Dynamic creation)
    // ============================================
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #e67e22;
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        z-index: 1000;
        font-size: 24px;
        transition: opacity 0.3s;
    `;
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ============================================
    // 20. CONSOLE LOG FOR DEV (Remove in production)
    // ============================================
    console.log('Kolisi Foundation website initialized successfully!');
});