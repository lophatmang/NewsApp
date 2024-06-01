"use strict";

btnSubmit.addEventListener("click", function () {
  const data = {
    username: inputUsername.value,
    password: inputPassword.value,
  };

  function validateData(data) {
    //kiểm tra tên đăng nhập
    if (!data.username) {
      swal("Tên đăng nhập không thể bỏ trống", "", "warning"); // có thể dùng "warning", "error", "success" and "info"
      return false;
    } else if (!data.password) {
      //kiểm tra password
      swal("password không thể bỏ trống", "", "warning"); // có thể dùng "warning", "error", "success" and "info"
      return false;
    }

    ////////////// kiểm tra cả mật khẩu và tài khoản chung nếu nhập sai 1 trong 2 cái đều trả về 1 thông báo
    // for (let i = 0; i < userArr.length; i++) {
    //   if (
    //     userArr[i].username == data.username &&
    //     userArr[i].password == data.password
    //   ) {
    //     swal("Đăng nhập thành công", "", "success");
    //     return true;
    //   }
    // }
    // swal("Sai tài khoản hoặc mật khẩu", "", "error");
    // return false;

    ////////////////kiểm tra username vs password riêng trả về thông báo người người dùng nếu tài khoản sai hoặc mật khẩu sai
    for (let i = 0; i < userArr.length; i++) {
      if (userArr[i].username == data.username) {
        if (userArr[i].password == data.password) {
          swal("Đăng nhập thành công", "", "success");
          currentUser = userArr[i];
          return true;
        } else {
          swal("Sai mật khẩu", "", "error");
          return false;
        }
      }
    }
    swal({
      title: "Tài khoản không tồn tại",
      text: "Bạn có muốn tạo tài khoản không",
      icon: "error",
      buttons: ["Không", "Có"],
    }).then((yes) => {
      if (yes) {
        window.location.href = "./register.html";
      }
    });
    return false;
  }

  // truyền dữ liệu nhập vào hàm kiểm tra
  const validate = validateData(data);

  if (validate) {
    saveToStorage("currentUser", JSON.stringify(currentUser));
    // swal("Tạo tài khoản thành công", `Chuyển đến trang đăng nhập`, "success"); // có thể dùng "warning", "error", "success" and "info"
    swal({
      title: "Đăng nhập thành công",
      text: "Về trang chủ",
      icon: "success",
      buttons: "OK",
    }).then((yes) => {
      if (yes) {
        disabledInput();
        countdown(3);
        setTimeout(() => (window.location.href = "../index.html"), 3500);
      } else {
        disabledInput();
        countdown(3);
        setTimeout(() => (window.location.href = "../index.html"), 3500);
      }
    });
  }
});

//vô hiệu hóa ô input
const disabledInput = function () {
  inputUsername.disabled = true;
  inputPassword.disabled = true;
};

//nút chuyển sang trang đăng ký nếu chưa có tk
btnAdd.addEventListener("click", function () {
  window.location.href = "./register.html";
});
