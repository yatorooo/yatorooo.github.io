const header = document.querySelector(".site-header");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const updateActiveLink = () => {
  let current = null;

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 140) {
      current = section;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle(
      "is-active",
      current && link.getAttribute("href") === `#${current.id}`
    );
  });
};

window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
  updateActiveLink();
});

window.addEventListener("load", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  updateActiveLink();
});
