const init = () => {
  const navSlide = () => {
    const burger = document.querySelector(".burger");
    const slideNav = document.querySelector(".slide-nav");

    burger.addEventListener("click", () => {
      burger.classList.toggle("toggle");
      slideNav.classList.toggle("toggle");
    });
  };
  navSlide();
};

document.addEventListener("DOMContentLoaded", init);
