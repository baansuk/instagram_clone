const fs = require('fs');
const path = require('path');

function userRender() {

  const inputPart = document.getElementById('inputs');
  fs.readFile('../user.json', 'utf-8', function(err, data) {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    let users;
    try {
      users = JSON.parse(data);
    } catch (e) {
      console.error('Error parsing JSON:', e);
      return;
    }

    const userList = document.getElementById('content-list');

    userList.innerHTML = ``;
    inputPart.innerHTML = ``;

    for (const user of users) {
      const list = `<div class="name-list">${user.name}</div>`;
      userList.innerHTML += list;
    }
    userList.innerHTML += `<div id="new-user">NEW USER</div>`;

    const namelist = document.getElementsByClassName('name-list');
    const newUser = document.getElementById('new-user');

    Array.from(namelist).map((user)=> {
      user.addEventListener('click', ()=> {
        Array.from(namelist).map((n)=> n.classList.remove('selected'))
        user.classList.add('selected');
        const thisUserName = user.innerText;
        const thisUserData = users.find((thisUser)=> thisUser.name === thisUserName)
        inputPart.innerHTML = `
        <form id="user-form">
        <div class="input-part">
          <label class="input-label" for="name">NAME</label><br>
          <input class="input-input" type="text" id="name" name="name" value="${thisUserData.name}">
        </div>
        <div class="input-part">
          <label class="input-label" for="id">ID</label><br>
          <input class="input-input" type="text" id="id" name="id" value="${thisUserData.id}">
        </div>
        <div class="input-part">
          <label class="input-label" for="intro">INTRO</label><br>
          <textarea class="input-input" type="text" id="intro" name="intro">${thisUserData.intro}</textarea>
        </div>
        <input type="submit" value="Submit">
      </form>`

      const form = document.getElementById('user-form');
      form.addEventListener('submit', function(e) {
        e.preventDefault();
      
        const name = document.getElementById('name').value;
        const id = document.getElementById('id').value;
        const intro = document.getElementById('intro').value;
      
        // 해당 유저를 찾아서 정보를 업데이트
        const userIndex = users.findIndex((user) => user.name === thisUserName);
        users[userIndex].name = name;
        users[userIndex].id = id;
        users[userIndex].intro = intro;
      
        // 유저 정보를 다시 문자열로 변환
        const updatedUsersStr = JSON.stringify(users, null, 2);
      
        // 유저 정보를 파일에 쓴다.
        fs.writeFile('../user.json', updatedUsersStr, function(err) {
          if (err) {
            window.alert(err);
            return;
          }
          window.alert('User data was updated successfully!');
          location.reload();
        });
      });
    })
  })
    newUser.addEventListener('click', ()=> {

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
        <input type="submit" value="Submit">
      </form>`

      const form = document.getElementById('user-form');
      form.addEventListener('submit', function(e) {
        
        e.preventDefault();

      
        const name = document.getElementById('name').value;
        const id = document.getElementById('id').value;
        const intro = document.getElementById('intro').value;
      
        // 해당 유저를 찾아서 정보를 업데이트
        users.push({
          name,
          id,
          following: [],
          posts: [],
          intro,
          stories: [],
          tagged: []
        });
      
        // 유저 정보를 다시 문자열로 변환
        const newUsersStr = JSON.stringify(users, null, 2);

        // 유저 정보를 파일에 쓴다.
        fs.writeFile('../user.json', newUsersStr, function(err) {
          if (err) {
            window.alert(err);
            return;
          }
          window.alert('Data was appended to file!');
          location.reload();
        })
      })
    })
  })
}

module.exports = userRender;