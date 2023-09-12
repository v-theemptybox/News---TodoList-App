"use strict";

const loginModal = document.getElementById("login-modal");
const welcomeMsg = document.getElementById("welcome-message");
const mainContent = document.getElementById("main-content");
const logoutBtn = document.getElementById("btn-logout");
const curUser = getFromStorage("currentUser");

if (curUser) {
  loginModal.style.display = "none";
  welcomeMsg.textContent = `Welcome ${curUser.firstName}`;
} else {
  mainContent.style.display = "none";
}

logoutBtn.addEventListener("click", function () {
  localStorage.removeItem("currentUser");
  window.location.href = "../pages/login.html";
});
