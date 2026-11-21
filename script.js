(function () {
    // Typed text effect
    const phrases = [
        "Full-Stack Software Engineer & UI/UX Designer",
        "Crafting clean, performant digital experiences.",
        "Turning ideas into production-ready code."
    ];
    const typedEl = document.getElementById("typedText");
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {
        const current = phrases[phraseIndex];
        if (!deleting) {
            typedEl.textContent = current.slice(0, charIndex + 1);
            charIndex++;
            if (charIndex === current.length) {
                deleting = true;
                setTimeout(type, 2000);
                return;
            }
            setTimeout(type, 45);
        } else {
            typedEl.textContent = current.slice(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                deleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }
            setTimeout(type, 25);
        }
    }
    type();

    // Scroll reveal
    const reveals = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    reveals.forEach(function (el) { revealObserver.observe(el); });

    // Counter animation
    const counters = document.querySelectorAll(".counter");
    const counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var el = entry.target;
                var target = parseInt(el.dataset.target, 10);
                var step = Math.max(1, Math.floor(target / 30));
                var current = 0;
                var interval = setInterval(function () {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(interval);
                    }
                    el.textContent = current;
                }, 40);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(function (el) { counterObserver.observe(el); });

    // Dark mode toggle
    var themeToggle = document.getElementById("themeToggle");
    var savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.setAttribute("data-theme", "dark");
    }

    themeToggle.addEventListener("click", function () {
        var isDark = document.documentElement.getAttribute("data-theme") === "dark";
        var next = isDark ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
    });

    // Mobile menu
    var hamburger = document.getElementById("hamburger");
    var navLinks = document.getElementById("navLinks");

    hamburger.addEventListener("click", function () {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("open");
        document.body.style.overflow = navLinks.classList.contains("open") ? "hidden" : "";
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            hamburger.classList.remove("active");
            navLinks.classList.remove("open");
            document.body.style.overflow = "";
        });
    });

    // Back to top
    var backToTop = document.getElementById("backToTop");
    window.addEventListener("scroll", function () {
        if (window.scrollY > 500) {
            backToTop.classList.add("visible");
        } else {
            backToTop.classList.remove("visible");
        }
    });

    // Contact form
    var form = document.getElementById("contactForm");
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        var btn = form.querySelector("button[type='submit']");
        var btnText = btn.querySelector(".btn-text");
        var btnSuccess = btn.querySelector(".btn-success");
        btnText.hidden = true;
        btnSuccess.hidden = false;
        btn.disabled = true;
        btn.style.background = "#10b981";
        setTimeout(function () {
            btnText.hidden = false;
            btnSuccess.hidden = true;
            btn.disabled = false;
            btn.style.background = "";
            form.reset();
        }, 3000);
    });

    // Header shadow on scroll
    var header = document.querySelector(".header");
    window.addEventListener("scroll", function () {
        if (window.scrollY > 10) {
            header.style.boxShadow = "0 1px 8px rgba(0,0,0,0.08)";
        } else {
            header.style.boxShadow = "none";
        }
    });
})();
