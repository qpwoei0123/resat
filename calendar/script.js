// script.js
document.addEventListener("DOMContentLoaded", function () {
  const body = document.querySelector("body");
  const monthElement = document.getElementById("month-year");
  const calendarBody = document.getElementById("calendar-body");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");
  const memoContainer = document.getElementById("memo-container");
  const memoTitle = document.getElementById("memo-title");
  const memoContents = document.getElementById("memo-contents");
  const memoInput = document.getElementById("memo-input");
  const editBtn = document.getElementById("edit-btn");

  // 메모 닫기
  document.addEventListener("click", function (e) {
    console.dir(e.target);
    if (e.target === body) {
      memoContainer.classList.remove("show");
    }
  });

  // 메모 저장
  editBtn.addEventListener("click", function () {
    if (memoInput.value === "") {
      alert("내용을 입력해주세요.");
      return;
    }
    memo[memoContainer.dataset.date] = { content: memoInput.value };
    memoContents.textContent = memoInput.value;
    memoInput.value = "";
    renderCalendar(currentDate);
  });

  // 메모를 저장할 객체
  // {date: {content: "내용"}}
  const memo = {};

  function renderCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    monthElement.innerText =
      date.toLocaleString("default", { month: "long" }) + " " + year;

    calendarBody.innerHTML = "";

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let row = document.createElement("tr");
    for (let i = 0; i < firstDayOfMonth; i++) {
      const cell = document.createElement("td");
      cell.classList.add("empty");
      row.appendChild(cell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      // 일주일이 끝나면 할당 후 다음 줄 생성
      if ((firstDayOfMonth + day - 1) % 7 === 0) {
        calendarBody.appendChild(row);
        row = document.createElement("tr");
      }
      const cell = document.createElement("td");

      const cellDate = `${year}-${month + 1}-${day}`;
      // 메모가 있으면 memo 클래스 추가
      if (memo[cellDate]) {
        cell.classList.add("memo");
      }

      cell.addEventListener("click", function () {
        memoContainer.dataset.date = cellDate;
        memoContainer.classList.add("show");
        memoContents.textContent = memo[cellDate] ? memo[cellDate].content : "";
        memoTitle.innerText = `${day}일`;
      });
      if (((firstDayOfMonth + day) % 7) - 1 === 0) cell.style.color = "red";
      cell.innerText = day;
      row.appendChild(cell);
    }

    calendarBody.appendChild(row);
  }

  let currentDate = new Date();

  prevButton.addEventListener("click", function () {
    currentDate.setMonth(currentDate.getMonth() - 1);
    memoContainer.classList.remove("show");
    renderCalendar(currentDate);
  });

  nextButton.addEventListener("click", function () {
    currentDate.setMonth(currentDate.getMonth() + 1);
    memoContainer.classList.remove("show");
    renderCalendar(currentDate);
  });

  renderCalendar(currentDate);
});
