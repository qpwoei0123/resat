window.onload = function () {
  gsap.utils.toArray(".ulAni li").forEach((el) => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: el,
          start: "0% 100%",
          end: "0% 100%",
          scrub: 2,
        },
      })
      .fromTo(
        el,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, ease: "none", duration: 1 },
        0
      );
  });

  gsap.utils.toArray("h2").forEach((el) => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: el,
          start: "0% 100%",
          end: "0% 100%",
          scrub: 2,
        },
      })
      .fromTo(
        el,
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, ease: "none", duration: 1 },
        0
      );
  });
  gsap.utils.toArray("h4").forEach((el) => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: el,
          start: "0% 100%",
          end: "0% 100%",
          scrub: 2,
        },
      })
      .fromTo(
        el,
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, ease: "none", duration: 1 },
        0
      );
  });

  gsap.registerPlugin(ScrollTrigger);

  gsap
    .timeline({
      scrollTrigger: {
        trigger: "#section-one",
        start: "100% 70%",
        end: "100% 0%",
        scrub: 2,
      },
    })
    .to(
      ".main-img-2",
      { x: 50, y: -250, rotate: -30, ease: "none", duration: 5 },
      0
    );
};
