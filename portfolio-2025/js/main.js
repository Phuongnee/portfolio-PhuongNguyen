let progress = 0;
const loadingText = document.getElementById("loading-text");
const loadingContainer = document.getElementById("loading-container");
const title = document.getElementById("title");
const menu = document.getElementById("menu");
const menuToggle = document.getElementById("menu-toggle");
const menuMobile = document.getElementById("menu-mobile");
const navMenu = document.getElementById("nav-menu");
const logoContainer = document.getElementById("logo-container");
// Fonction de mise à jour du pourcentage de chargement
function updateLoading() {
    if (progress < 100) {
        progress += 1;
        loadingText.innerText = `${progress}%`;
        requestAnimationFrame(updateLoading);
    } else {
        setTimeout(() => {
            loadingContainer.classList.add("fade-out");
            loadingContainer.style.display = "none"; // Masquer l'écran de chargement
            showTitle(); // Afficher le titre et le menu
        }, 500);
    }
}

updateLoading();

// Fonction pour afficher le titre et le menu après le chargement
function showTitle() {
    title.style.display = "block";
    navMenu.style.display = "flex";
    const description = document.querySelector(".title-description");
    description.style.display = "block";

    if (window.innerWidth > 768) {  
        menu.style.display = "block";
    } else {
        menuToggle.classList.add("show");
    }

    gsap.fromTo(
        [title, description], 
        { opacity: 0, y: -50 }, 
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", stagger: 0.2 }
    );

    if (window.innerWidth > 768) {
        gsap.fromTo(menu, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" });
    }
}


// Système de menu mobile
function openMenu() {
    menuMobile.style.display = "flex";
    menuToggle.style.display = "none";
    logoContainer.style.display = "none";
}

function closeMenu() {
    menuMobile.style.display = "none";
    menuToggle.style.display = "block";
    logoContainer.style.display = "block";
}

gsap.registerPlugin(ScrollTrigger);

// Gestion de l'affichage dynamique du portfolio lors du scroll
const portfolioSection = document.getElementById("portfolio-section");
const portfolioItems = document.querySelectorAll(".portfolio-grid");

window.addEventListener("scroll", function() {
    const sectionTop = portfolioSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop <= windowHeight / 2) {
        portfolioItems.forEach(item => {
            item.style.visibility = "visible";
        });
    }
});

// Rendre la section du portfolio visible lorsqu'on fait défiler
window.addEventListener("scroll", function() {
    if (portfolioSection.getBoundingClientRect().top <= window.innerHeight / 2) {
        document.querySelector(".header-portfolio").classList.add("visible");
    }
});
document.querySelector(".back-to-top a").addEventListener("click", function (e) {
    e.preventDefault(); // Prevent default link behavior
    window.scrollTo({
        top: 0, // Scroll to the top of the page
        behavior: "smooth" // Smooth scrolling effect
    });
});
