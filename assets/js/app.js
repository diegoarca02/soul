gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, DrawSVGPlugin);
let isMenuOpen = false;
const tlHmrb = gsap.timeline({ defaults: { ease: "power2.inOut" } });
const menuTl = gsap.timeline({ paused: true, reversed: true });
menuTl.to(".navbar-menu", {
    height: "100svh",
    duration: 1.2,
    ease: "power2.inOut",
});

gsap.set("#theBurger", { autoAlpha: 1 });
gsap.set(".buns", { drawSVG: "0% 30%" });
gsap.set(".letters", { drawSVG: "53.5% 100%", x: -155 });

tlHmrb.to(".patty", { duration: 0.35, drawSVG: "50% 50%" }, 0)
     .to(".patty", { duration: 0.1, opacity: 0, ease: "none" }, 0.25)
     .to(".buns", { duration: 0.85, drawSVG: "69% 96.5%" }, 0)
     .to(".letters", { duration: 0.85, drawSVG: "0% 53%", x: 0 }, 0)
     .reversed(true);

let isAnimating_ = false;

function animateTheBurger() {
    if (isAnimating_) return; // Evitar doble ejecución
    isAnimating_ = true;

    console.log(isMenuOpen);
    console.log('aca');

    isMenuOpen = !isMenuOpen;
    tlHmrb.reversed(!tlHmrb.reversed());

    if (isMenuOpen) {
        /* smoother.scrollTop(0, true);
        smoother.paused(true); */
        menuTl.play();
        /* borderTl.play(0); */
        gsap.to("#burger", { duration: 0.3, stroke: "#000000" });
    } else {
        /* smoother.paused(false); */
        menuTl.reverse();
      /*   borderCloseTl.play(0); */
        gsap.to("#burger", { duration: 0.3, stroke: "#ffffff", delay: 0.5 });
    }

    setTimeout(() => {
        isAnimating_ = false; // Habilitar nuevamente después de 300ms
    }, 300);
}

// Agregar el evento una sola vez
const burgerContainer = document.querySelector("#theBurger").parentElement;
burgerContainer.addEventListener("click", animateTheBurger);