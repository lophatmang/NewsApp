"use strict";

//kiểm tra đã đăng nhập chưa
(function () {
  if (Object.keys(currentUser).length == 0) {
    //ẩn nút Previous và next nếu chưa đăng nhập
    todoContainer.classList.add("hide");

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

//xóa task khỏi list
const deleteTask = function (owner, task) {
  for (let i = 0; i < todoArr.length; i++) {
    if (todoArr[i].owner == owner && todoArr[i].task == task) {
      swal({
        title: "",
        text: `Bạn có chắc muốn xóa công việc ${task} không?`,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((Delete) => {
        if (Delete) {
          swal({
            title: `Đã xóa việc ${task}`,
            text: "",
            icon: "success",
          });
          todoArr.splice(i, 1);
          renderTask();
          saveToStorage("todoArr", JSON.stringify(todoArr));
        } else {
          swal(`Đã hủy xóa việc ${task}`, "", "success");
        }
      });

      if (todoArr[i].isDone == true) {
        todoArr[i].isDone = false;
      } else {
        todoArr[i].isDone = true;
      }
      break;
    }
  }

  //
};

//hàm tích công việc đã hoàn thành
const doneTask = function (e, owner, task) {
  e.classList.toggle("checked");
  for (let i = 0; i < todoArr.length; i++) {
    if (todoArr[i].owner == owner && todoArr[i].task == task) {
      if (todoArr[i].isDone == true) {
        e.classList.remove("checked");
        todoArr[i].isDone = false;
      } else {
        e.classList.add("checked");
        todoArr[i].isDone = true;
      }
      saveToStorage("todoArr", JSON.stringify(todoArr));
      break;
    }
  }
};

//render list task
const renderTask = function () {
  const UserTodoArr = todoArr.filter(
    (todo) => todo.owner == currentUser.username
  );

  todoList.innerHTML = "";
  for (let i = 0; i < UserTodoArr.length; i++) {
    const html = `
    <li onclick="doneTask(this,'${UserTodoArr[i].owner}', '${
      UserTodoArr[i].task
    }')" class="${UserTodoArr[i].isDone == true ? "checked" : ""}">${
      UserTodoArr[i].task
    }<span onclick="deleteTask( '${UserTodoArr[i].owner}', '${
      UserTodoArr[i].task
    }')" class="close">×</span></li>
    `;
    todoList.insertAdjacentHTML("beforeend", html);
  }
};
renderTask();

//nút add thêm task vào
btnAdd.addEventListener("click", function () {
  const data = {
    task: inputTask.value.charAt(0).toUpperCase() + inputTask.value.slice(1),
    owner: currentUser.username,
    isDone: false,
  };

  //kiểm tra đã nhập task chưa
  function validateData(data) {
    //kiểm tra họ
    if (!data.task) {
      swal(
        "Chưa nhập công việc",
        "Vui lòng điền công việc bạn muốn vào",
        "error"
      ); // có thể dùng "warning", "error", "success" and "info"
      return false;
    }
    for (let i = 0; i < todoArr.length; i++) {
      if (data.task == todoArr[i].task && data.owner == todoArr[i].owner) {
        swal("Đã có công việc này trong danh sách ", "", "warning"); // có thể dùng "warning", "error", "success" and "info"
        return false;
      }
    }
    return true;
  }

  // truyền dữ liệu nhập vào hàm kiểm tra
  const validate = validateData(data);

  if (validate) {
    const dataTask = new toDoCl(data.task, data.owner, data.isDone);
    todoArr.push(dataTask);
    saveToStorage("todoArr", JSON.stringify(todoArr));
    renderTask();
    inputTask.value = "";
    swal("Đã thêm công việc vào danh sách bạn muốn làm ", "", "success"); // có thể dùng "warning", "error", "success" and "info"
  }
});
