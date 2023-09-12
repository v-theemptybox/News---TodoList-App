"use strict";

const firstNameInput = document.getElementById("input-firstname");
const lastNameInput = document.getElementById("input-lastname");
const usernameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const passwordConfirmInput = document.getElementById("input-password-confirm");
const submitBtn = document.getElementById("btn-submit");

const KEY = "USER_ARRAY";
console.log(userArr);

function validateFnc(data) {
  if (
    data.firstName == "" ||
    data.lastName == "" ||
    data.username == "" ||
    data.password == "" ||
    passwordConfirmInput.value == ""
  ) {
    alert("Please fill in all fields!");
    return false;
  } else if (data.password.length < 8) {
    alert("Password must be at least 8 characters!");
    return false;
  } else if (data.password !== passwordConfirmInput.value) {
    alert('The "Confirm Password" field is incorrect!');
    return false;
  }

  for (let i = 0; i < userArr.length; i++) {
    if (data.username === userArr[i].username) {
      alert("Username must be unique!");
      return false;
    }
  }

  return true;
}

submitBtn.addEventListener("click", function () {
  const userObj = new User(
    firstNameInput.value,
    lastNameInput.value,
    usernameInput.value,
    passwordInput.value,
    5,
    "general"
  );
  if (validateFnc(userObj)) {
    userArr.push(userObj);
    saveToStorage(KEY, userArr);
    window.location.href = "../pages/login.html";
  }
});
