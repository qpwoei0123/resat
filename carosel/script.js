(function () {
  "use strict";

  // querySelectorAll 메서드를 사용하여 단일 / 복수 요소를 선택하는 유틸 함수
  const get = (target) => {
    const els = document.querySelectorAll(target);
    return els.length > 1 ? els : els[0];
  };

  const $slideContainer = get(".slider__wrapper");
  const $slider = get(".slider");

  const $totalSlides = get(".all-slide");
  const $currentSlide = get(".current-slide");
  const $prevBtn = get(".control__button.prev");
  const $nextBtn = get(".control__button.next");
  const $slide = get(".slide");

  const slideWidth = $slide[0].clientWidth;
  const slideAmount = $slide.length;
  const sliderWidth = slideWidth * slideAmount;
  const slideSpeed = 1000;

  let currentIndex = 1;
  let moveOffset = 0;

  let interval;

  // setInterval을 사용, 3초마다 handleSwipe를 트리거하는 자동 재생 함수
  const slideAutoPlay = () => {
    interval = setInterval(() => {
      handleSwipe(1);
      if (currentIndex === $slider.children.length - 1) {
        setTimeout(() => {
          $slider.style.transition = "none";
          currentIndex = 1;
          moveOffset = (100 / slideAmount) * currentIndex;
          $slider.style.transform = `translateX(-${moveOffset}%)`;
        }, slideSpeed);
      }
    }, 2000);
  };

  const handleSwipe = (direction) => {
    currentIndex = currentIndex + direction;

    if (currentIndex >= slideAmount + 2) {
      currentIndex = 4;
    } else if (currentIndex <= 0) {
      currentIndex = 0;
    }

    moveOffset = (100 / slideAmount) * currentIndex;

    if (currentIndex <= 0) {
      $currentSlide.textContent =
        $slider.children[$slider.children.length - 2].dataset.index;
    } else if (currentIndex >= $slider.children.length - 1) {
      $currentSlide.textContent = $slider.children[1].dataset.index;
    } else {
      $currentSlide.textContent = $slider.children[currentIndex].dataset.index;
    }

    $slider.style.transform = `translateX(-${moveOffset}%)`;
    $slider.style.transition = `all ${slideSpeed}ms ease`;
  };

  // 이전, 다음 버튼 클릭 이벤트 핸들러
  // handleSwipe 함수를 호출하면서 슬라이드의 진행 방향을 인자로 넘겨주는 함수
  const handleMoveBtn = (event) => {
    event.preventDefault();
    const $target = event.currentTarget;

    if ($target.id === "nextBtn") {
      handleSwipe(1);

      if (currentIndex === $slider.children.length - 1) {
        setTimeout(() => {
          $slider.style.transition = "none";
          currentIndex = 1;
          moveOffset = (100 / slideAmount) * currentIndex;
          $slider.style.transform = `translateX(-${moveOffset}%)`;
        }, slideSpeed);
      }
    } else {
      handleSwipe(-1);

      if (currentIndex === 0) {
        setTimeout(() => {
          $slider.style.transition = "none";
          currentIndex = $slider.children.length - 2;
          moveOffset = (100 / slideAmount) * currentIndex;
          $slider.style.transform = `translateX(-${moveOffset}%)`;
        }, slideSpeed);
      }
    }
  };

  // 슬라이드의 초기 레이아웃 SetUp
  const setSlideLayout = () => {
    // 무한 슬라이드를 위해 첫번째 슬라이드와 마지막 슬라이드를 복제
    const $firstSlideClone = $slider.firstElementChild.cloneNode(true);
    const $lastSlideClone = $slider.lastElementChild.cloneNode(true);

    $slider.insertBefore($lastSlideClone, $slider.firstElementChild);
    $slider.appendChild($firstSlideClone);

    // 슬라이드의 너비를 설정하고, 1번째 슬라이드로 위치 초기화 (translateX)
    $slider.style.width = `${sliderWidth}px`;
    $slider.style.transform = `translateX(-${slideWidth}px)`;
  };

  const handleMouseEnter = (event) => {
    event.preventDefault();
    event.stopPropagation();
    clearInterval(interval);
  };

  const handleMouseLeave = (e) => {
    slideAutoPlay();
  };

  // 사용자가 이전, 다음 버튼을 클릭할 때, throttle 함수를 사용하여
  // 짧은 시간 내 과도한 이벤트가 일어나지 않도록 방지
  const throttle = (fn, delay) => {
    let lastCall = 0;
    return function (...args) {
      const now = new Date().getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      fn(...args);
    };
  };

  const handleMoveBtnThrottled = throttle(handleMoveBtn, 1000);

  const init = () => {
    setSlideLayout();
    slideAutoPlay();

    $totalSlides.textContent = slideAmount;
    $currentSlide.textContent = currentIndex;

    $prevBtn.addEventListener("click", handleMoveBtnThrottled);
    $nextBtn.addEventListener("click", handleMoveBtnThrottled);

    $slideContainer.addEventListener("mouseenter", handleMouseEnter);
    $slideContainer.addEventListener("mouseleave", handleMouseLeave);
  };

  window.addEventListener("DOMContentLoaded", init);
})();
