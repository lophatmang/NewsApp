"use strict";

const checkUserLogin = function () {
  if (Object.keys(currentUser).length == 0) {
    mainContent.classList.add("hide");
  } else {
    loginModal.classList.add("hide");
    welcomeMessage.textContent = `Welcome ${currentUser.lastName}`;
  }
};

checkUserLogin();
