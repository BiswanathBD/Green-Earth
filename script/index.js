const getById = (id) => document.getElementById(id);
// mobile menu function
const menuBar = getById("menu-bar");
menuBar.addEventListener("click", () => {
  const mobileNav = getById("mobile-nav");
  mobileNav.classList.toggle("pointer-events-none");
  if (mobileNav.classList.contains("opacity-0")) {
    mobileNav.classList.replace("opacity-0", "opacity-100");
    mobileNav.classList.replace("left-5", "left-8");
    menuBar.classList.replace("fa-bars", "fa-bars-staggered");
  } else {
    mobileNav.classList.replace("opacity-100", "opacity-0");
    mobileNav.classList.replace("left-8", "left-5");
    menuBar.classList.replace("fa-bars-staggered", "fa-bars");
  }
});
