"use strict";

//tạo người đăng nhập hiện tại
const userLogin = new user();
// tạo biến page number hiện tại và số bài biết trong 1 trang
let numberPage = 1;
let maxPage = 0;

pageNum.textContent = numberPage;

const renderNews = async function (page, pageSize, category) {
  // newsContainer.innerHTML = "";

  try {
    //hiệu ứng loading khi chờ dữ liệu api
    const loading = `
    <div class="circle">
    <div class="circle1 circle_sub"></div>
    <div class="circle2 circle_sub"></div>
    <div class="circle3 circle_sub"></div>
    <div class="circle4 circle_sub"></div>
    <div class="circle5 circle_sub"></div>
    <div class="circle6 circle_sub"></div>
    <div class="circle7 circle_sub"></div>
    <div class="circle8 circle_sub"></div>
    <div class="circle9 circle_sub"></div>
    <div class="circle10 circle_sub"></div>
    <div class="circle11 circle_sub"></div>
    <div class="circle12 circle_sub"></div>
</div>
    `;
    newsContainer.insertAdjacentHTML("beforeend", loading);

    //lấy dữ liệu
    const data = await userLogin.news(page, pageSize, category);
    const news = data.articles;

    newsContainer.innerHTML = "";
    //xóa tin tức đã xóa
    for (let i = 0; i < news.length; i++) {
      if (news[i].title == "[Removed]") {
        news.splice(i, 1);
      }
    }

    //in tin tức
    for (let i = 0; i < pageSize; i++) {
      const html = `
          <div class="card flex-row flex-wrap">
            <div class="card mb-3" style="">
              <div class="row no-gutters">
                <div class="col-md-4">
                  <img
                    src="${
                      news[i].urlToImage == null
                        ? "../img/nophoto.jpg"
                        : news[i].urlToImage
                    }"
                    class="card-img"
                    alt="${news[i].title == null ? "" : news[i].title}"
                  />
                </div>
                <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">
                      ${news[i].title == null ? "" : news[i].title}
                    </h5>
                    <p class="card-text">
                    ${
                      news[i].description == null
                        ? "No description"
                        : news[i].description
                    }
                    </p>
                    <a
                      href="${news[i].url == null ? "#" : news[i].url}"
                      class="btn btn-primary"
                      target="_blank"
                      >View More</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
    `;
      newsContainer.insertAdjacentHTML("beforeend", html);
    }
  } catch (err) {
    // const html = `
    //       <div id="login-modal">
    //         <h4>Có lỗi xảy ra </h4>
    //       </div>
    // `;
    // newsContainer.insertAdjacentHTML("beforeend", html);
  }
};

const changePage = function () {
  if (numberPage == 1) {
    btnPrev.classList.add("hide");
  } else if (numberPage == maxPage) {
    btnNext.classList.add("hide");
  } else {
    btnPrev.classList.remove("hide");
    btnNext.classList.remove("hide");
  }
};

btnPrev.addEventListener("click", function () {
  --numberPage;
  pageNum.textContent = numberPage;
  changePage();
  newsContainer.innerHTML = "";
  renderNews(numberPage, currentUser.pageSize, currentUser.category);
});

btnNext.addEventListener("click", function () {
  ++numberPage;
  pageNum.textContent = numberPage;
  changePage();
  newsContainer.innerHTML = "";
  renderNews(numberPage, currentUser.pageSize, currentUser.category);
});

//kiểm tra đã đăng nhập chưa
(function () {
  if (Object.keys(currentUser).length == 0) {
    //ẩn nút Previous và next nếu chưa đăng nhập
    content.querySelector("nav").classList.add("hide");

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

    newsContainer.innerHTML = "";
    newsContainer.insertAdjacentHTML("beforeend", html);

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
  } else {
    //lấy số trang giới hạn
    (async function (page, pageSize, category) {
      const data = await userLogin.news(page, pageSize, category);
      maxPage = Math.floor(data.totalResults / pageSize) + 1;

      changePage();
    })(numberPage, currentUser.pageSize, currentUser.category);
    renderNews(numberPage, currentUser.pageSize, currentUser.category);
  }
})();
