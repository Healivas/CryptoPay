const animationContainers = document.querySelectorAll(".animation");

function animateElements(elements, duration) {
  let currentIndex = 0;

  function animateNextElement() {
    if (currentIndex < elements.length) {
      const element = elements[currentIndex];
      const nextIndex = currentIndex + 1;

      element.classList.add("animated");
      setTimeout(() => {
        element.classList.remove("animated");

        if (nextIndex < elements.length) {
          animateNextElement();
        }
      }, duration * 1000);

      currentIndex++;
    }
  }

  animateNextElement();
}

animationContainers.forEach((container) => {
  container.addEventListener("mouseenter", () => {
    if (!container.classList.contains("animating")) {
      container.classList.add("animating");
      const animationItems = container.querySelectorAll(".animation__item");
      const duration = parseFloat(animationItems[0].getAttribute("data-anim-duration"));
      animateElements(animationItems, duration);

      setTimeout(() => {
        container.classList.remove("animating");
      }, duration * animationItems.length * 1000);
    }
  });
});

const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "light-icon";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () => (document.body.classList.contains(darkTheme) ? "dark" : "light");
const getCurrentIcon = () => (themeButton.classList.contains(iconTheme) ? "dark-icon" : "light-icon");

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](darkTheme);
  themeButton.classList[selectedIcon === "dark-icon" ? "add" : "remove"](iconTheme);
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("body").classList.add("loaded");
});

const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
  smoothLink.addEventListener("click", function (e) {
    e.preventDefault();
    const id = smoothLink.getAttribute("href");

    document.querySelector(id).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}
