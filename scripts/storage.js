"use strict";

const inputFirstname = document.getElementById("input-firstname");
const inputLastname = document.getElementById("input-lastname");
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const inputPasswordConfirm = document.getElementById("input-password-confirm");
const btnSubmit = document.getElementById("btn-submit");
const countdownLabel = document.querySelector(".countdown-label");
const btnClear = document.getElementById("btn-clear");
const formControl = document.querySelectorAll(".form-control");
const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const welcomeMessage = document.getElementById("welcome-message");
const btnLogout = document.getElementById("btn-logout");
const newsletter = document.querySelectorAll(".no-gutters");
const newsContainer = document.getElementById("news-container");
const content = document.getElementById("content");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const pageNum = document.getElementById("page-num");
const inputTask = document.getElementById("input-task");
const btnAdd = document.getElementById("btn-add");
const todoList = document.getElementById("todo-list");
const todoContainer = document.getElementById("todo-container");
const inputPagesize = document.getElementById("input-page-size");
const inputCategory = document.getElementById("input-category");
const main = document.getElementById("main");
const container = document.querySelector(".container");
const inputQuery = document.getElementById("input-query");

//lưu giữ liệu vào strorage

function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

function getFromStorage(key, defaultVal) {
  return localStorage.getItem(key) ?? defaultVal;
}

const userArr = JSON.parse(getFromStorage("userArr", "[]")) || [];

let currentUser = JSON.parse(getFromStorage("currentUser", "{}")) || {};

const todoArr = JSON.parse(getFromStorage("todoArr", "[]")) || [];

const countdown = function (time) {
  setInterval(function () {
    if (time >= 0) {
      countdownLabel.classList.remove("hide");
      countdownLabel.innerHTML = `chuyển hướng sau....${time}`;
      time--;
    }
  }, 1000);
};

btnLogout.addEventListener("click", function () {
  localStorage.removeItem("currentUser");
  swal({
    title: "Bạn đã đăng xuất",
    text: "",
    icon: "success",
    buttons: "OK",
  }).then((yes) => {
    if (yes) {
      window.location.href = "../pages/login.html";
    } else {
      window.location.href = "../pages/login.html";
    }
  });
});

(function () {
  if (Object.keys(currentUser).length !== 0) {
    btnLogout.classList.remove("hide");
  }
})();
