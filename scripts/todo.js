"use strict";

const taskInput = document.getElementById("input-task");
const addBtn = document.getElementById("btn-add");
const todoList = document.getElementById("todo-list");

// add li to ul
addBtn.addEventListener("click", function () {
  if (!taskInput.value) {
    alert("Please enter the task!");
  } else {
    const todoObj = new Task(taskInput.value, currentUser.username, false);
    todoArr.push(todoObj);

    saveToStorage("TODO_ARR", todoArr);
    showTodoLi();
    taskInput.value = "";
  }
});

// show todo list
function showTodoLi() {
  let html = "";
  const privateTodo = todoArr.filter(
    (item) => item.owner === currentUser.username
  );

  privateTodo.forEach((element) => {
    html += `<li class="${element.isDone ? "checked" : ""}">${
      element.task
    }<span class="close">×</span></li>`;
  });
  todoList.innerHTML = html;
}
showTodoLi();

// delete task
function deleteTask() {
  document.querySelectorAll("#todo-list .close").forEach((element) => {
    element.addEventListener("click", function () {
      const delWarn = confirm("Do you want to delete this task?");

      if (delWarn) {
        let listItem = this.parentElement;
        listItem.style.display = "none";

        // can use findIndex (find + indexOf)
        let removeItem = todoArr.find(
          (item) =>
            item.owner === currentUser.username &&
            item.task === listItem.textContent.slice(0, -1) // use slice to remove last letter (<span>×</span>)
        );
        todoArr.splice(todoArr.indexOf(removeItem), 1);
        saveToStorage("TODO_ARR", todoArr);
      }
    });
  });
}

deleteTask();

function toggleTask() {
  document.querySelectorAll("#todo-list li").forEach((element) => {
    element.addEventListener("click", function (event) {
      if (event.target.tagName !== "SPAN") {
        this.classList.toggle("checked");
        let chosenItem = todoArr.find(
          (item) =>
            item.owner === currentUser.username &&
            item.task === this.textContent.slice(0, -1)
        );
        chosenItem.isDone = this.classList.contains("checked") ? true : false;
        saveToStorage("TODO_ARR", todoArr);
      }
    });
  });
}

toggleTask();
