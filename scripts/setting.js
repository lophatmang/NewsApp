"use strict";

//hiện sẳn setting của usẻ hiện tại
const settingNow = function () {
  userArr.forEach((user) => {
    if (user.username == currentUser.username) {
      inputPagesize.value = user.pageSize == undefined ? 5 : user.pageSize;
      inputCategory.value =
        user.category == undefined ? "General" : user.category;
    }
  });
};

settingNow();

//kiểm tra đã đăng nhập chưa
(function () {
  if (Object.keys(currentUser).length == 0) {
    //ẩn nút Previous và next nếu chưa đăng nhập
    main.classList.add("hide");

    //hiện nút đăng nhập hoặc đăng ký nếu chưa đăng nhập
    const html = `
    <!-- Login and Register redirect button -->
    <div id="login-modal">
      <p>Please Login or Register</p>
      <div class="row">
        <div class="col-md-3">
          <a href="./login.html" class="btn btn-primary btn-block"
            >Login</a
          >
        </div>
        <div class="col-md-3">
          <a href="./register.html" class="btn btn-primary btn-block"
            >Register</a
          >
        </div>
      </div>
    </div>
    `;
    content.insertAdjacentHTML("beforeend", html);

    //thống báo phải đăng nhập
    swal({
      title: "Bạn chưa đăng nhập",
      text: "bạn phải đăng nhập mới dùng được chứng năng này",
      icon: "warning",
      buttons: {
        // cancel: "Không",

        catch: {
          text: "Register",
          value: "Register",
        },
        Login: true,
      },
    }).then((value) => {
      switch (value) {
        case "Login":
          window.location.href = "./login.html";
          break;

        case "Register":
          window.location.href = "./register.html";
          break;

        default:
          break;
      }
    });
  }
})();

//nút thay đổi setting
btnSubmit.addEventListener("click", function () {
  const data = {
    pageSize: inputPagesize.value,
    category: inputCategory.value,
  };

  function validateData(data) {
    if (!data.pageSize) {
      swal("", "Bạn chưa điền số bài viết bạn muốn trong một trang", "warning"); // có thể dùng "warning", "error", "success" and "info"
      return false;
    }

    return true;
  }

  const validate = validateData(data);

  if (validate) {
    for (let i = 0; i < userArr.length; i++) {
      if (userArr[i].username == currentUser.username) {
        const dataUser = new user(
          userArr[i].firstName,
          userArr[i].lastName,
          userArr[i].username,
          userArr[i].password,
          data.pageSize,
          data.category
        );

        userArr[i] = currentUser = dataUser;
        saveToStorage("currentUser", JSON.stringify(currentUser));
        saveToStorage("userArr", JSON.stringify(userArr));
      }
    }
  }
});
