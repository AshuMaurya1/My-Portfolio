document.addEventListener('DOMContentLoaded', () => {
    let menu = document.querySelector('#menu-icon');
    let navbar = document.querySelector('.right');
    let contactForm = document.querySelector('#contactForm');
    let navLinks = document.querySelectorAll('nav ul li a');
    let topButton = document.querySelector('#topButton');

    if (window.Typed) {
        new Typed('#element', {
            strings: ['Web Developer', 'Software Developer', 'Web Designer', 'Java With DSA', 'Software Developer'],
            typeSpeed: 100,
            backSpeed: 55,
            backDelay: 1000,
            loop: true
        });
    }

    if (menu && navbar) {
        menu.onclick = () => {
            menu.classList.toggle('bx-x');
            navbar.classList.toggle('active');
        };
    }

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            if (menu && navbar) {
                menu.classList.remove('bx-x');
                navbar.classList.remove('active');
            }
        });
    });

    addScrollReveal();
    updatePageEffects(navLinks, topButton, menu, navbar);

    window.addEventListener('scroll', () => {
        updatePageEffects(navLinks, topButton, menu, navbar);
    });

    if (topButton) {
        topButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();

            let name = document.querySelector('#name');
            let email = document.querySelector('#email');
            let phone = document.querySelector('#phone');
            let subject = document.querySelector('#subject');
            let message = document.querySelector('#message');
            let successMessage = document.querySelector('#successMessage');
            let isValid = true;

            clearFormMessages();

            if (name.value.trim().length < 2) {
                showError(name, 'nameError', 'Please enter your full name.');
                isValid = false;
            }

            if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email.value.trim())) {
                showError(email, 'emailError', 'Please enter a valid email address.');
                isValid = false;
            }

            let cleanPhone = phone.value.trim().replace(/[\s-]/g, '');

            if (!/^(\+91)?[6-9]\d{9}$/.test(cleanPhone)) {
                showError(phone, 'phoneError', 'Please enter a valid 10 digit Indian phone number.');
                isValid = false;
            }

            if (subject.value.trim().length < 3) {
                showError(subject, 'subjectError', 'Please enter a subject.');
                isValid = false;
            }

            if (message.value.trim().length < 10) {
                showError(message, 'messageError', 'Please enter a message with at least 10 characters.');
                isValid = false;
            }

            if (isValid) {
                let mailSubject = encodeURIComponent(subject.value.trim());
                let mailBody = encodeURIComponent(
                    `Name: ${name.value.trim()}\n` +
                    `Email: ${email.value.trim()}\n` +
                    `Phone: ${phone.value.trim()}\n\n` +
                    `Message:\n${message.value.trim()}`
                );

                successMessage.textContent = 'Validation successful. Opening your email app...';
                window.location.href = `mailto:ashukumar2597@gmail.com?subject=${mailSubject}&body=${mailBody}`;
                contactForm.reset();
            }
        });
    }
});

function addScrollReveal() {
    let revealItems = document.querySelectorAll(
        '.firstsectoin, .skills_section, .services_section, .service_card, .projects_section, .project_card, .SecontSection, .contact_section'
    );

    revealItems.forEach((item) => {
        item.classList.add('reveal');
    });

    if (!('IntersectionObserver' in window)) {
        revealItems.forEach((item) => {
            item.classList.add('show');
        });
        return;
    }

    let revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealItems.forEach((item) => {
        revealObserver.observe(item);
    });
}

function updatePageEffects(navLinks, topButton, menu, navbar) {
    let sections = document.querySelectorAll('section[id]');
    let scrollPosition = window.scrollY + 140;

    sections.forEach((section) => {
        let sectionTop = section.offsetTop;
        let sectionHeight = section.offsetHeight;
        let sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach((link) => {
                link.classList.remove('active_link');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active_link');
                }
            });
        }
    });

    if (topButton) {
        topButton.classList.toggle('show', window.scrollY > 400);
    }

    if (window.scrollY > 0 && menu && navbar) {
        menu.classList.remove('bx-x');
        navbar.classList.remove('active');
    }
}

function showError(input, errorId, message) {
    let errorElement = document.querySelector(`#${errorId}`);
    input.classList.add('error');
    errorElement.textContent = message;
}

function clearFormMessages() {
    document.querySelectorAll('.error_message').forEach((errorElement) => {
        errorElement.textContent = '';
    });

    document.querySelectorAll('.contact_form input, .contact_form textarea').forEach((input) => {
        input.classList.remove('error');
    });

    let successMessage = document.querySelector('#successMessage');
    if (successMessage) {
        successMessage.textContent = '';
    }
}
