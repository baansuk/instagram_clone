const fs = require("fs");
const path = require("path");
const userDrop = require("../utils/userDrop");

function userRender() {
  const inputPart = document.getElementById("inputs");
  fs.readFile("../user.json", "utf-8", function (err, data) {
    if (err) {
      window.alert("Error reading file:", err);
      return;
    }

    let users;
    try {
      users = JSON.parse(data);
    } catch (e) {
      window.alert("Error parsing JSON:", e);
      return;
    }

    const userList = document.getElementById("content-list");

    userList.innerHTML = ``;
    inputPart.innerHTML = ``;

    for (const user of users) {
      const list = `<div class="name-list">${user.name}(${user.id})</div>`;
      userList.innerHTML += list;
    }
    userList.innerHTML += `<div id="new-user">NEW USER</div>`;

    const namelist = document.getElementsByClassName("name-list");
    const newUser = document.getElementById("new-user");

    Array.from(namelist).map((user) => {
      user.addEventListener("click", async () => {
        Array.from(namelist).map((n) => n.classList.remove("selected"));
        user.classList.add("selected");
        const thisUserName = user.innerText.match(/\(([^)]+)\)/)[1];
        const thisUserData = users.find(
          (thisUser) => thisUser.id === thisUserName
        );
        const userdrop = await userDrop();
        inputPart.innerHTML = `
        <form id="user-form">
        <div class="input-part">
        <label class="input-label" for="profile-pic">PROFILE PICTURE</label>
          <div>
            <input class="input-input" type="file" id="profile-pic-upload" name="profile-pic-upload">
            <img src="../../../../public/${thisUserData.id}.jpg">
            
          </div>
        </div>
        <div class="input-part">
          <label class="input-label" for="name">NAME</label>
          <input class="input-input" type="text" id="name" name="name" value="${
            thisUserData.name
          }">
        </div>
        <div class="input-part">
          <label class="input-label" for="id">ID</label>
          <input class="input-input" type="text" id="id" name="id" value="${
            thisUserData.id
          }">
        </div>
        <div class="input-part">
          <label class="input-label" for="intro">INTRO</label>
          <textarea class="input-input" type="text" id="intro" name="intro">${
            thisUserData.intro
          }</textarea>
        </div>
        <div class="input-part">
        <label class="input-label" for="id">FOLLOWING</label>
        <div class="input-adding-area">
          <div>
            <select name="userFollow" id="userFollow">
            ${userdrop}
            </select>
            <button id="add-follow">ADD
            </button>
          </div>
          <textarea class="input-input" type="text" id="follow" name="follow">${
            thisUserData.following.length > 0
              ? thisUserData.following.toString()
              : ""
          }</textarea>
        </div>
        </div>
        <input class="section-button" type="submit" value="SUBMIT">
      </form>`;

        const form = document.getElementById("user-form");
        const addFollow = document.getElementById("add-follow");

        addFollow.addEventListener("click", function (e) {
          e.preventDefault();
          const followArea = document.getElementById("follow");
          const followUser = document.getElementById("userFollow");
          followArea.value += `${followUser.value},`;
        });

        form.addEventListener("submit", function (e) {
          e.preventDefault();

          const name = document.getElementById("name").value;
          const id = document.getElementById("id").value;
          const intro = document.getElementById("intro").value;
          const follow = document.getElementById("follow").value.split(",");
          const profilePicUpload =
            document.getElementById("profile-pic-upload");

          if (profilePicUpload.value) {
            const file = profilePicUpload.files[0];
            const data = fs.readFileSync(file.path);
            const uploadDir = "../../../public/";
            if (!fs.existsSync(uploadDir)) {
              fs.mkdirSync(uploadDir);
            }
            fs.writeFileSync(`${uploadDir}/${id}.jpg`, data);
          }

          // 해당 유저를 찾아서 정보를 업데이트
          const userIndex = users.findIndex((user) => user.id === thisUserName);
          users[userIndex].name = name;
          users[userIndex].id = id;
          users[userIndex].intro = intro;
          users[userIndex].following = follow;

          // 유저 정보를 다시 문자열로 변환
          const updatedUsersStr = JSON.stringify(users, null, 2);

          // 유저 정보를 파일에 쓴다.
          fs.writeFile("../user.json", updatedUsersStr, function (err) {
            if (err) {
              window.alert(err);
              return;
            }
            location.reload();
          });
        });
      });
    });
    newUser.addEventListener("click", async () => {
      const userdrop = await userDrop();
      inputPart.innerHTML = `
        <form id="user-form">
        <div class="input-part">
          <label class="input-label" for="name">NAME</label><br>
          <input class="input-input" type="text" id="name" name="name">
        </div>
        <div class="input-part">
          <label class="input-label" for="id">ID</label><br>
          <input class="input-input" type="text" id="id" name="id">
        </div>
        <div class="input-part">
          <label class="input-label" for="intro">INTRO</label><br>
          <textarea class="input-input" type="text" id="intro" name="intro"></textarea>
        </div>
        <div class="input-part">
          <label class="input-label" for="id">FOLLOWING</label>
          <div class="input-adding-area">
            <div>
              <select name="userFollow" id="userFollow">
              ${userdrop}
              </select>
              <button id="add-follow">ADD
              </button>
            </div>
            <textarea class="input-input" type="text" id="follow" name="follow"></textarea>
          </div>
          </div>
        <div class="input-part">
        <label class="input-label" for="profile-pic">PROFILE PICTURE</label>
          <div>
            <input class="input-input" type="file" id="profile-pic-upload" name="profile-pic-upload">
          </div>
        </div>
        <input class="section-button" type="submit" value="SUBMIT">
      </form>`;

      const form = document.getElementById("user-form");
      const addFollow = document.getElementById("add-follow");

      addFollow.addEventListener("click", function (e) {
        e.preventDefault();
        const followArea = document.getElementById("follow");
        const followUser = document.getElementById("userFollow");
        followArea.value += `${followUser.value},`;
      });

      form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const id = document.getElementById("id").value;
        const intro = document.getElementById("intro").value;
        const follow = document.getElementById("follow").value.split(",");
        const profilePicUpload = document.getElementById("profile-pic-upload");

        if (profilePicUpload.value) {
          const file = profilePicUpload.files[0];
          const data = fs.readFileSync(file.path);
          const uploadDir = "../../../public/";
          if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
          }
          fs.writeFileSync(`${uploadDir}/${id}.jpg`, data);
        } else {
          const uploadDir = "../../../public/";
          fs.writeFileSync(
            `${uploadDir}/${id}.jpg`,
            "../../../public/anon.jpg"
          );
        

        // 해당 유저를 찾아서 정보를 업데이트
        users.push({
          name,
          id,
          following: follow,
          posts: [],
          intro,
          stories: [],
          tagged: [],
        });

        // 유저 정보를 다시 문자열로 변환
        const newUsersStr = JSON.stringify(users, null, 2);

        // 유저 정보를 파일에 쓴다.
        fs.writeFile("../user.json", newUsersStr, function (err) {
          if (err) {
            window.alert(err);
            return;
          }
          location.reload();
        });
      });
    });
  });
}

module.exports = userRender;
