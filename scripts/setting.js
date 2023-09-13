"use strict";

const pageSizeInput = document.getElementById("input-page-size");
const categoryInput = document.getElementById("input-category");
const submitBtn = document.getElementById("btn-submit");

if (currentUser.length === 0) {
  submitBtn.addEventListener("click", function () {
    if (isNaN(Number(pageSizeInput.value)) || pageSizeInput.value === "") {
      alert("Please enter a number");
    } else {
      currentUser.pageSize = Number(pageSizeInput.value);
      currentUser.category = categoryInput.value;
      saveToStorage("currentUser", currentUser);

      const userIndex = userArr.findIndex(
        (item) => item.username === currentUser.username
      );

      userArr[userIndex] = currentUser;
      saveToStorage("USER_ARRAY", userArr);
      window.location.href = "./news.html";
    }
  });
} else {
  alert("Please login to use this function!");
  window.location.href = "../index.html";
}
