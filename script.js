/* =========================================================
   PERSONAL PORTFOLIO - JAVASCRIPT
   Beginner-friendly and framework-free.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    // ======================================================
    // 1. MOBILE HAMBURGER MENU
    // ======================================================
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    menuToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("open");

        // Update accessibility state
        menuToggle.setAttribute("aria-expanded", isOpen);

        // Change hamburger icon to X
        menuToggle.innerHTML = isOpen
            ? '<i class="fas fa-xmark"></i>'
            : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu after clicking a link
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });


    // ======================================================
    // 2. NAVBAR BACKGROUND + BACK TO TOP
    // ======================================================
    const header = document.getElementById("header");
    const backToTop = document.getElementById("back-to-top");

    function handleScroll() {
        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        if (window.scrollY > 500) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });


    // ======================================================
    // 3. ACTIVE NAVBAR LINK WHILE SCROLLING
    // ======================================================
    const sections = document.querySelectorAll("main section[id]");

    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.getAttribute("id");

                    navLinks.forEach(link => {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === `#${currentId}`
                        );
                    });
                }
            });
        },
        {
            rootMargin: "-35% 0px -55% 0px"
        }
    );

    sections.forEach(section => sectionObserver.observe(section));


    // ======================================================
    // 4. SCROLL REVEAL ANIMATIONS
    // ======================================================
    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => revealObserver.observe(element));


    // ======================================================
    // 5. TYPING ANIMATION
    // ======================================================
    const typingElement = document.querySelector(".typing-text");

    // You can edit these phrases
    const phrases = [
        "Computer Engineering Student",
        "Aspiring Software Developer",
        "AI / ML Enthusiast",
        "Web Development Learner"
    ];

    let phraseIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];

        if (!deleting) {
            typingElement.textContent = currentPhrase.substring(0, characterIndex + 1);
            characterIndex++;

            if (characterIndex === currentPhrase.length) {
                deleting = true;
                setTimeout(typeEffect, 1500);
                return;
            }
        } else {
            typingElement.textContent = currentPhrase.substring(0, characterIndex - 1);
            characterIndex--;

            if (characterIndex === 0) {
                deleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }
        }

        setTimeout(typeEffect, deleting ? 45 : 85);
    }

    typeEffect();


    // ======================================================
    // 6. CONTACT FORM VALIDATION
    // ======================================================
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Get form values
        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const subject = document.getElementById("subject");
        const message = document.getElementById("message");

        let isValid = true;

        // Clear old errors
        clearError(name, "name-error");
        clearError(email, "email-error");
        clearError(subject, "subject-error");
        clearError(message, "message-error");
        formStatus.textContent = "";

        // Name validation
        if (name.value.trim().length < 2) {
            showError(name, "name-error", "Please enter your name.");
            isValid = false;
        }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email.value.trim())) {
            showError(email, "email-error", "Please enter a valid email.");
            isValid = false;
        }

        // Subject validation
        if (subject.value.trim().length < 3) {
            showError(subject, "subject-error", "Please enter a subject.");
            isValid = false;
        }

        // Message validation
        if (message.value.trim().length < 10) {
            showError(message, "message-error", "Message should be at least 10 characters.");
            isValid = false;
        }

        if (isValid) {
            /*
                IMPORTANT:
                This is front-end validation only.
                To actually receive messages, connect this form to:
                - Formspree
                - Web3Forms
                - EmailJS
                - Your own backend/API

                For now, we show a success message.
            */
            formStatus.textContent =
                "Thanks! Your message passed validation. Connect this form to an email service to receive submissions.";
            formStatus.style.color = "var(--success)";

            contactForm.reset();
        } else {
            formStatus.textContent = "Please correct the highlighted fields.";
            formStatus.style.color = "var(--danger)";
        }
    });

    function showError(input, errorId, message) {
        input.classList.add("invalid");
        document.getElementById(errorId).textContent = message;
    }

    function clearError(input, errorId) {
        input.classList.remove("invalid");
        document.getElementById(errorId).textContent = "";
    }

});
