"use strict";

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// parse js object to class instance function
function parseUser(userData) {
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.username,
    userData.password,
    userData.pageSize,
    userData.category
  );
  return user;
}

// get userArr from localStorage
const users = getFromStorage("USER_ARRAY") ?? [];

// parse obj to User
const userArr = users.map((user) => parseUser(user));

// the user is currently logged in
const currentUser = getFromStorage("currentUser") ?? [];

function parseTask(taskData) {
  const task = new Task(taskData.task, taskData.owner, taskData.isDone);
  return task;
}

const tasks = getFromStorage("TODO_ARR") ?? [];

const todoArr = tasks.map((task) => parseTask(task));
