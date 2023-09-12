"use strict";

const usernameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const loginBtn = document.getElementById("btn-submit");

loginBtn.addEventListener("click", function () {
  const validAccount = userArr.find(function (account) {
    return (
      account.username === usernameInput.value &&
      account.password === passwordInput.value
    );
  });

  if (validAccount) {
    alert("Login success!");
    saveToStorage("currentUser", validAccount);
    window.location.href = "../index.html";
  } else {
    alert("Please check your password and username and try again!");
  }
});
