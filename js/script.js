"use strict";

const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");

const toDoData = localStorage.getItem("listToDo")
  ? JSON.parse(localStorage.getItem("listToDo"))
  : [];

const render = function () {
  todoList.innerHTML = "";
  todoCompleted.innerHTML = "";
  toDoData.forEach(function (item) {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.innerHTML = `<span class="text-todo">${item.text}</span>
				<div class="todo-buttons">
					<button class="todo-remove"></button>
					<button class="todo-complete"></button>
				</div>`;

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    li.querySelector(".todo-complete").addEventListener("click", function () {
      item.completed = !item.completed;
      render();
      setStorage();
    });

    li.querySelector(".todo-remove").addEventListener("click", function () {
      let textLi = li.querySelector(".text-todo").textContent;
      toDoData.forEach(function (item, index) {
        if (item.text == textLi) {
          toDoData.splice(index, 1);
        }
      });
      render();
      setStorage();
    });
  });
};

const setStorage = function () {
  localStorage.setItem("listToDo", JSON.stringify(toDoData));
};

todoControl.addEventListener("submit", function (e) {
  e.preventDefault();

  if (headerInput.value.trim() !== "") {
    const newToDo = {
      text: headerInput.value,
      completed: false,
    };
    toDoData.push(newToDo);
    headerInput.value = "";
    render();
    setStorage();
  } else {
    headerInput.value = "";
  }
});

render();
