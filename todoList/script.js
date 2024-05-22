let src = "";
let level = "";
let viewState = "all";

const levelBtn = document
  .querySelectorAll(".levels button")
  .forEach((btn) => btn.addEventListener("click", changeLevel));
function changeLevel(e) {
  // 모든 형제 요소에서 selected 클래스를 제거
  const siblings = Array.from(e.currentTarget.parentNode.children);
  siblings.forEach((sibling) => {
    sibling.classList.remove("selected");
  });
  e.currentTarget.classList.toggle("selected");

  switch (e.currentTarget.children[0].textContent) {
    case "급해!":
      level = "4";
      break;
    case "중요":
      level = "3";
      break;
    case "보통":
      level = "2";
      break;
    case "별로":
      level = "1";
  }
  src = e.currentTarget.children[1].src;
}

const todoList = document.getElementById("todoUl");
const todo = document.getElementById("todo");

//id addbtn을 가진 요소를 찾아서 addBtn에 할당
const addBtn = document
  .getElementById("addBtn")
  .addEventListener("click", addTodo);

function addTodo() {
  if (todo.value === "") {
    alert("할 일을 입력해주세요");
    return;
  }
  if (src === "") {
    alert("우선순위를 선택해주세요");
    return;
  }
  todoList.appendChild(generateTodoEl());
  todo.value = "";
}

const generateTodoEl = () => {
  const newTodo = document.createElement("li");
  newTodo.setAttribute("data-class-number", level);

  const viewDiv = document.createElement("div");
  viewDiv.addEventListener("click", () => {
    const newText = prompt("수정할 내용을 입력하세요");
    todoText.textContent = newText || todoText.textContent;
  });
  const todoText = document.createElement("span");
  todoText.textContent = todo.value;
  viewDiv.appendChild(todoText);
  const img = document.createElement("img");
  img.src = src;
  viewDiv.appendChild(img);
  newTodo.appendChild(viewDiv);

  const checkBtn = document.createElement("button");
  checkBtn.classList.add("checkBtn");
  checkBtn.addEventListener("click", () => {
    newTodo.classList.toggle("done");
  });
  checkBtn.textContent = "✔︎";
  newTodo.appendChild(checkBtn);

  const delteBtn = document.createElement("button");
  delteBtn.classList.add("deleteBtn");
  delteBtn.textContent = "✗";
  delteBtn.addEventListener("click", () => {
    newTodo.remove();
  });
  newTodo.appendChild(delteBtn);

  return newTodo;
};

const filterBtn = document.querySelectorAll(".filters button");
filterBtn.forEach((btn) => btn.addEventListener("click", filterTodo));
function filterTodo(e) {
  const siblings = Array.from(e.currentTarget.parentNode.children);
  siblings.forEach((sibling) => {
    sibling.classList.remove("selected");
  });
  e.currentTarget.classList.add("selected");
  switch (e.currentTarget.textContent) {
    case "전체":
      todoList.className = "";
      break;
    case "완료":
      todoList.className = "";

      todoList.classList.add("completed");
      break;
    case "미완료":
      todoList.className = "";
      todoList.classList.add("uncompleted");
      break;
  }
}

function sortListByClassNumber(order) {
  const items = Array.from(todoList.querySelectorAll("li"));
  console.dir(items);
  // 숫자를 기준으로 정렬
  items.sort(function (a, b) {
    const numA = parseInt(a.getAttribute("data-class-number"));
    const numB = parseInt(b.getAttribute("data-class-number"));
    if (order === "ascending") {
      return numA - numB;
    } else if (order === "descending") {
      return numB - numA;
    }
  });

  // 정렬된 순서대로 ul에 추가
  items.forEach(function (item) {
    todoList.appendChild(item);
  });
}

const sortBtn = document.querySelectorAll(".sort button");
sortBtn.forEach((btn) => btn.addEventListener("click", sortTodo));
function sortTodo(e) {
  switch (e.currentTarget.textContent) {
    case "오름차순":
      sortListByClassNumber("ascending");
      break;
    case "내림차순":
      sortListByClassNumber("descending");
      break;
  }
}
