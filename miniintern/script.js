window.onload = function () {
  gsap.utils.toArray(".ulAni li").forEach((el) => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: el,
          start: "0% 100%",
          end: "0% 100%",
          scrub: 1,
        },
      })
      .fromTo(
        el,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, ease: "none", duration: 1 },
        0
      );
  });
};
