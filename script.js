const [startBtn, stopBtn, resetBtn] =
  document.querySelectorAll(".buttons button");
const [hour, minute, second] = document.querySelectorAll(".display input");
const circle = document.querySelector("#circle");
let isStart = false;
let state = null;

startBtn.addEventListener("click", startCount);
stopBtn.addEventListener("click", stopCount);
resetBtn.addEventListener("click", resetCount);

hour.addEventListener("input", () => {
  if (hour.value > 99) hour.value = 99;
  hour.placeholder = hour.value;
});
minute.addEventListener("input", () => {
  if (minute.value > 59) minute.value = 59;
  minute.placeholder = minute.value;
});
second.addEventListener("input", () => {
  if (second.value > 59) second.value = 59;
  second.placeholder = second.value;
});

function startCount() {
  if (state === "start") return;
  let h = null;
  let m = null;
  let s = null;
  inputDisable(true);
  // 직전에 stop이였고, 입력값이 없을 때 placeholder값으로 초기화
  if (state === "stop") {
    h = Number(hour.value) || Number(hour.placeholder);
    m = Number(minute.value) || Number(minute.placeholder);
    s = Number(second.value) || Number(second.placeholder);
    updateTimer(h, m, s);
  } else {
    h = Number(hour.value);
    m = Number(minute.value);
    s = Number(second.value);
    updateTimer(h, m, s);
  }

  state = "start";
  //circle에 on 클래스 추가
  circle.className = "";
  circle.classList.add(state);

  intervalId = setInterval(() => {
    s--;
    if (s < 0) {
      s = 59;
      m--;
    }
    if (m < 0) {
      m = 59;
      h--;
    }
    if (h < 0) {
      clearInterval(intervalId);
      return;
    }
    updateTimer(h, m, s);
  }, 1000);
}

function stopCount() {
  if (state === "stop" || state === "reset") return;
  state = "stop";
  inputDisable(false);
  circle.className = "";
  circle.classList.add(state);
  clearInterval(intervalId);
  updatePlaceholder(hour.value, minute.value, second.value);
  updateTimer(null, null, null);
}

function resetCount() {
  if (state === "reset") return;
  state = "reset";
  inputDisable(false);
  circle.className = "";
  circle.classList.add(state);
  clearInterval(intervalId);
  updatePlaceholder(0, 0, 0);
  updateTimer(null, null, null);
}

function updateTimer(h, m, s) {
  hour.value = String(h).padStart(2, "0");
  minute.value = String(m).padStart(2, "0");
  second.value = String(s).padStart(2, "0");
}

function updatePlaceholder(h, m, s) {
  hour.placeholder = String(h).padStart(2, "0");
  minute.placeholder = String(m).padStart(2, "0");
  second.placeholder = String(s).padStart(2, "0");
}

function inputDisable(bool) {
  hour.disabled = bool;
  minute.disabled = bool;
  second.disabled = bool;
}
