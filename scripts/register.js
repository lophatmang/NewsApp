"use strict";

//hàm xóa dữ liệu đã điền
const clearInput = function () {
  inputFirstname.value = "";
  inputLastname.value = "";
  inputUsername.value = "";
  inputPassword.value = "";
  inputPasswordConfirm.value = "";
};

//event nút tạo tài khoản
btnSubmit.addEventListener("click", function () {
  const data = {
    firstName:
      inputFirstname.value.charAt(0).toUpperCase() +
      inputFirstname.value.slice(1),
    lastName:
      inputLastname.value.charAt(0).toUpperCase() +
      inputLastname.value.slice(1),
    username: inputUsername.value,
    password: inputPassword.value,
    passwordConfirm: inputPasswordConfirm.value,
  };

  //kiểm tra dữ liệu input
  function validateData(data) {
    //kiểm tra họ
    if (!data.firstName) {
      swal("Chưa nhập họ của bạn", "Vui lòng nhập họ của bạn vào", "warning"); // có thể dùng "warning", "error", "success" and "info"
      return false;
    }

    //kiểm tra tên
    if (!data.lastName) {
      swal("Chưa nhập tên của bạn", "Vui lòng nhập tên của bạn vào", "warning"); // có thể dùng "warning", "error", "success" and "info"
      return false;
    }

    //kiểm tra tên đăng nhập
    if (!data.username) {
      swal("Tên đăng nhập không thể bỏ trống", "", "warning"); // có thể dùng "warning", "error", "success" and "info"
      return false;
    } else {
      for (let i = 0; i < userArr.length; i++) {
        if (userArr[i].username == data.username) {
          swal(
            "Tên đăng nhập đã có người đăng ký",
            "Vui lòng đổi tên đăng nhập khác",
            "error"
          );
          return false;
        }
      }
    }

    //kiểm tra password
    if (!data.password) {
      swal("password không thể bỏ trống", "", "warning"); // có thể dùng "warning", "error", "success" and "info"
      return false;
    } else if (data.password < 8) {
      swal("password phải ít nhất có 8 ký tự", "", "warning"); // có thể dùng "warning", "error", "success" and "info"
      return false;
    } else if (data.password !== data.passwordConfirm) {
      //kiểm tra mật khẩu xác nhận có trùng mật khẩu không
      swal("mật khẩu xác nhận không trùng với mật khẩu", "", "error"); // có thể dùng "warning", "error", "success" and "info"
      return false;
    }

    //các điều kiện đều đúng trả về true
    return true;
  }

  // truyền dữ liệu nhập vào hàm kiểm tra
  const validate = validateData(data);

  if (validate) {
    const userData = new user(
      data.firstName,
      data.lastName,
      data.username,
      data.password
    );
    userArr.push(userData);
    saveToStorage("userArr", JSON.stringify(userArr));
    // swal("Tạo tài khoản thành công", `Chuyển đến trang đăng nhập`, "success"); // có thể dùng "warning", "error", "success" and "info"
    swal({
      title: "Tạo tài khoản thành công",
      text: "bạn muốn chuyển đến trang đăng nhập không",
      icon: "success",
      buttons: ["KHÔNG", "CÓ"],
    }).then((yes) => {
      if (yes) {
        clearInput();
        countdown(3);
        setTimeout(() => (window.location.href = "../pages/login.html"), 3500);
      } else {
        swal("Bạn có thể tiếp tục đăng ký", "", "success");
        clearInput();
      }
    });
  }
});

btnClear.addEventListener("click", clearInput);
