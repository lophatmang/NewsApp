"use strict";

//api key
// const apiKey = "ff713cbd3b7c4d4a824e2e1166b6ce3b";
const apiKey = "68c5d18c67b0474e9210cd84e50726af";

const getJSON = function (url, errorMsg = "Lỗi không lấy được dữ liệu") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

///tạo class user
class user {
  constructor(firstName, lastName, username, password, pageSize, category) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.pageSize = pageSize;
    this.category = category;
  }

  async news(page, pageSize, category) {
    try {
      const data = await getJSON(
        `https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`
      );

      if (data.articles.length == 0) {
        content.querySelector("nav").classList.add("hide");
        newsContainer.innerHTML = "";
        const html = `
          <div id="login-modal">
            <p>Không có tin tức</p>
          </div>
    `;
        newsContainer.insertAdjacentHTML("beforeend", html);
      }

      //trả về promis chứa array
      return data;
    } catch (err) {
      content.querySelector("nav").classList.add("hide");
      newsContainer.innerHTML = "";
      const html = `
          <div id="login-modal">
            <p>${err}</p>
          </div>
    `;
      newsContainer.insertAdjacentHTML("beforeend", html);
    }
  }

  async search(page, pageSize, keySearch) {
    try {
      const data = await getJSON(
        `https://newsapi.org/v2/everything?q=${keySearch}&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`
      );

      if (data.articles.length == 0) {
        content.querySelector("nav").classList.add("hide");
        newsContainer.innerHTML = "";
        const html = `
          <div id="login-modal">
            <p>Không có tin tức</p>
          </div>
    `;

        newsContainer.innerHTML = "";
        newsContainer.insertAdjacentHTML("beforeend", html);
      }

      //trả về promis chứa array
      return data;
    } catch (err) {
      content.querySelector("nav").classList.add("hide");
      newsContainer.innerHTML = "";
      const html = `
          <div id="login-modal">
            <p>${err}</p>
          </div>
    `;
      newsContainer.insertAdjacentHTML("beforeend", html);
    }
  }
}

//tạo class to do
class toDoCl {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
