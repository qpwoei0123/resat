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
  const slideSpeed = 1 * 1000;

  let currentIndex = 1;
  let moveOffset = 0;

  // autoPlay 관련
  let interval;
  const intervalSecond = 2 * 1000;

  // setInterval을 사용, 3초마다 handleSwipe를 트리거하는 자동 재생 함수
  const slideAutoPlay = () => {
    interval = setInterval(() => {
      handleSwipe(1);
    }, intervalSecond);
  };

  // direction이 양수이면 다음 슬라이드로, 음수이면 이전 슬라이드로 이동
  const handleSwipe = (direction) => {
    direction > 0 ? currentIndex++ : currentIndex--;

    // 슬라이드 이동 효과
    moveOffset = (100 / slideAmount) * currentIndex;
    $slider.style.transform = `translateX(-${moveOffset}%)`;
    $slider.style.transition = `transform ${slideSpeed}ms ease`;

    // currentSlide.textContent를 미리 갱신
    if (currentIndex <= 0) {
      $currentSlide.textContent =
        $slider.children[$slider.children.length - 2].dataset.index;
    } else if (currentIndex >= $slider.children.length - 1) {
      $currentSlide.textContent = $slider.children[1].dataset.index;
    } else {
      $currentSlide.textContent = $slider.children[currentIndex].dataset.index;
    }

    // 슬라이드의 인덱스가 0이거나 마지막 슬라이드의 인덱스일 때 (클론 슬라이드일 때)
    // transition이 끝나면, transition을 제거하고, currentIndex를 조정하여 무한 슬라이드 효과를 준다.
    // 이때, transition을 제거하지 않으면, 슬라이드의 이동과정이 보이기 떄문에 무한 슬라이드 느낌이 사라진다.
    if (currentIndex === $slider.children.length - 1 || currentIndex === 0) {
      setTimeout(() => {
        $slider.style.transition = "none";
        currentIndex = currentIndex === 0 ? $slider.children.length - 2 : 1;
        moveOffset = (100 / slideAmount) * currentIndex;
        $slider.style.transform = `translateX(-${moveOffset}%)`;
      }, slideSpeed);
    }
  };

  // 이전, 다음 버튼 클릭 이벤트 핸들러
  const handleMoveBtn = (event) => {
    const $target = event.currentTarget;
    const direction = $target.classList.contains("next") ? 1 : -1;
    handleSwipe(direction);
  };

  const handleMouseEnter = () => {
    clearInterval(interval);
  };
  const handleMouseLeave = () => {
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

  const init = () => {
    // 무한 슬라이드를 위해 첫번째 슬라이드와 마지막 슬라이드를 복제
    const $firstSlideClone = $slider.firstElementChild.cloneNode(true);
    const $lastSlideClone = $slider.lastElementChild.cloneNode(true);

    $slider.insertBefore($lastSlideClone, $slider.firstElementChild);
    $slider.appendChild($firstSlideClone);

    // 슬라이드 추가로 인해 슬라이더의 너비가 변경되었으므로 다시 계산
    $slider.style.width = `${sliderWidth}px`;
    $slider.style.transform = `translateX(-${slideWidth}px)`;

    slideAutoPlay();

    $totalSlides.textContent = slideAmount;
    $currentSlide.textContent = currentIndex;

    $prevBtn.addEventListener("click", throttle(handleMoveBtn, slideSpeed));
    $nextBtn.addEventListener("click", throttle(handleMoveBtn, slideSpeed));

    $slideContainer.addEventListener("mouseenter", handleMouseEnter);
    $slideContainer.addEventListener("mouseleave", handleMouseLeave);
  };

  window.addEventListener("DOMContentLoaded", init);
})();
