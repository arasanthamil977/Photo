/* =====================================================
   PRELOADER
===================================================== */

window.addEventListener("load", function () {

    setTimeout(function () {

        document
            .getElementById("preloader")
            .classList.add("hide");

    }, 700);

});


/* =====================================================
   NAVBAR SCROLL
===================================================== */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {

    if (window.scrollY > 60) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


/* =====================================================
   MOBILE MENU
===================================================== */

const menuBtn = document.getElementById("menuBtn");

const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function () {

    menuBtn.classList.toggle("open");

    navLinks.classList.toggle("open");

    document.body.classList.toggle("no-scroll");

});


/* CLOSE MOBILE MENU AFTER CLICK */

document.querySelectorAll(".nav-links a").forEach(function (link) {

    link.addEventListener("click", function () {

        menuBtn.classList.remove("open");

        navLinks.classList.remove("open");

        document.body.classList.remove("no-scroll");

    });

});


/* =====================================================
   PORTFOLIO FILTER
===================================================== */

const filters =
    document.querySelectorAll(".filter");

const galleryItems =
    document.querySelectorAll(".gallery-item");

filters.forEach(function (filterButton) {

    filterButton.addEventListener("click", function () {

        filters.forEach(function (button) {

            button.classList.remove("active");

        });

        filterButton.classList.add("active");

        const category =
            filterButton.dataset.filter;


        galleryItems.forEach(function (item) {

            if (
                category === "all" ||
                item.classList.contains(category)
            ) {

                item.classList.remove("hidden");

            } else {

                item.classList.add("hidden");

            }

        });

    });

});


/* =====================================================
   LIGHTBOX
===================================================== */

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxClose =
    document.getElementById("lightboxClose");

const lightboxPrev =
    document.getElementById("lightboxPrev");

const lightboxNext =
    document.getElementById("lightboxNext");

const lightboxCounter =
    document.getElementById("lightboxCounter");


let currentImage = 0;

const images =
    Array.from(
        document.querySelectorAll(".gallery-item img")
    );


function showImage(index) {

    if (index < 0) {

        index = images.length - 1;

    }

    if (index >= images.length) {

        index = 0;

    }

    currentImage = index;

    lightboxImage.src =
        images[currentImage].src;

    lightboxImage.alt =
        images[currentImage].alt;

    lightboxCounter.textContent =
        String(currentImage + 1).padStart(2, "0")
        + " / "
        + String(images.length).padStart(2, "0");

}


galleryItems.forEach(function (item, index) {

    item.addEventListener("click", function () {

        showImage(index);

        lightbox.classList.add("open");

        document.body.classList.add("no-scroll");

    });

});


function closeLightbox() {

    lightbox.classList.remove("open");

    document.body.classList.remove("no-scroll");

}


lightboxClose.addEventListener(
    "click",
    closeLightbox
);


lightboxPrev.addEventListener(
    "click",
    function () {

        showImage(currentImage - 1);

    }
);


lightboxNext.addEventListener(
    "click",
    function () {

        showImage(currentImage + 1);

    }
);


/* CLICK BACKGROUND TO CLOSE */

lightbox.addEventListener("click", function (event) {

    if (event.target === lightbox) {

        closeLightbox();

    }

});


/* KEYBOARD CONTROLS */

document.addEventListener("keydown", function (event) {

    if (!lightbox.classList.contains("open")) {
        return;
    }

    if (event.key === "Escape") {

        closeLightbox();

    }

    if (event.key === "ArrowLeft") {

        showImage(currentImage - 1);

    }

    if (event.key === "ArrowRight") {

        showImage(currentImage + 1);

    }

});


/* =====================================================
   TESTIMONIAL SLIDER
===================================================== */

const testimonials =
    document.querySelectorAll(".testimonial");

const prevTestimonial =
    document.getElementById("prevTestimonial");

const nextTestimonial =
    document.getElementById("nextTestimonial");

const slideNumber =
    document.getElementById("slideNumber");


let testimonialIndex = 0;


function showTestimonial(index) {

    if (index < 0) {

        index = testimonials.length - 1;

    }

    if (index >= testimonials.length) {

        index = 0;

    }

    testimonials.forEach(function (item) {

        item.classList.remove("active");

    });

    testimonials[index].classList.add("active");

    testimonialIndex = index;

    slideNumber.textContent =
        String(index + 1).padStart(2, "0")
        + " / "
        + String(testimonials.length).padStart(2, "0");

}


prevTestimonial.addEventListener(
    "click",
    function () {

        showTestimonial(testimonialIndex - 1);

    }
);


nextTestimonial.addEventListener(
    "click",
    function () {

        showTestimonial(testimonialIndex + 1);

    }
);


/* AUTO SLIDER */

setInterval(function () {

    showTestimonial(testimonialIndex + 1);

}, 6000);


/* =====================================================
   CONTACT FORM
===================================================== */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


contactForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();


        if (!name || !email) {

            formMessage.textContent =
                "Please fill in your name and email.";

            return;

        }


        formMessage.textContent =
            "Thank you, " +
            name +
            ". Your enquiry has been received.";


        contactForm.reset();

    }
);


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(".reveal");


const observer =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                }

            });

        },
        {
            threshold: .12
        }
    );


revealElements.forEach(function (element) {

    observer.observe(element);

});


/* =====================================================
   TOUCH SWIPE FOR LIGHTBOX
===================================================== */

let touchStartX = 0;

let touchEndX = 0;


lightbox.addEventListener(
    "touchstart",
    function (event) {

        touchStartX =
            event.changedTouches[0].screenX;

    }
);


lightbox.addEventListener(
    "touchend",
    function (event) {

        touchEndX =
            event.changedTouches[0].screenX;

        const distance =
            touchEndX - touchStartX;


        if (Math.abs(distance) < 50) {
            return;
        }


        if (distance > 0) {

            showImage(currentImage - 1);

        } else {

            showImage(currentImage + 1);

        }

    }
);