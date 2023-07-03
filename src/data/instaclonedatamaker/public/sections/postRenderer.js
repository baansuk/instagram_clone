const fs = require('fs');
const path = require('path');
const userDrop = require('../utils/userDrop');

function postRender() {

  const inputPart = document.getElementById('inputs');
  fs.readFile('../post.json', 'utf-8', function(err, data) {
    if (err) {
      window.alert('Error reading file:', err);
      return;
    }

    let posts;
    try {
      posts = JSON.parse(data);
    } catch (e) {
      window.alert('Error parsing JSON:', e);
      return;
    }

    const postList = document.getElementById('content-list');

    postList.innerHTML = ``;
    inputPart.innerHTML = ``;

    for (const post of posts) {
      const list = `<div class="name-list">${post.id}(${post.user})</div>`;
      postList.innerHTML += list;
    }
    postList.innerHTML += `<div id="new-user">NEW POST</div>`;

    const postlist = document.getElementsByClassName('name-list');
    const newPost = document.getElementById('new-user');

    Array.from(postlist).map((post)=> {
      post.addEventListener('click', async ()=> {
        Array.from(postlist).map((n)=> n.classList.remove('selected'))
        post.classList.add('selected');
        const thisPostId = post.innerText.split("(")[0];
        const thisPostData = posts.find((thisPost)=> thisPost.id === thisPostId)
        const userdrop = await userDrop(thisPostData.user);
        let dateObject = new Date(thisPostData.date);
        let year = dateObject.getFullYear();  // 연도
        let month = dateObject.getMonth() + 1;  // 월 (0부터 시작하므로 1을 더해줍니다)
        let day = dateObject.getDate(); 
        if(month < 10) month = '0' + month;
        if(day < 10) day = '0' + day;
        let formattedDate = `${year}-${month}-${day}`
        inputPart.innerHTML = `
        <form id="post-form">
        <div class="input-part">
          <label class="input-label" for="id">ID</label>
          <input class="input-input" type="text" id="id" name="id" value="${thisPostData.id}">
        </div>
        <div class="input-part">
          <label class="input-label" for="user">USER</label>
          <select name="user" id="user">
          ${userdrop}
          </select>
        </div>
        <div class="input-part">
          <label class="input-label" for="date">DATE</label>
          <input class="input-input" type="date" id="date" name="date" value="${formattedDate}">
        </div>
        <div class="input-part">
          <label class="input-label" for="location">LOCATION</label>
          <input class="input-input" type="text" id="location" name="location" value="${thisPostData.location}">
        </div>
        <div class="input-part">
          <label class="input-label" for="content">CONTENT</label>
          <textarea class="input-input" type="text" id="content" name="content">${thisPostData.content}</textarea>
        </div>
        <div class="input-part">
          <label class="input-label" for="tags">TAGS</label>
          <textarea class="input-input" type="text" id="tags" name="tags">${thisPostData.tags.length > 0 ? thisPostData.tags.toString() : ''}</textarea>
        </div>
        <div class="input-part">
          <label class="input-label" for="likes">LIKES</label>
          <textarea class="input-input" type="text" id="likes" name="likes">${thisPostData.likes.length > 0 ? thisPostData.likes.toString() : ''}</textarea>
        </div>
        <div class="input-part">
          <label class="input-label" for="userTags">USERTAGS</label>
          <input class="input-input" type="text" id="userTags" name="userTags" value="${thisPostData.userTags.length > 0 ? thisPostData.userTags.toString() : ''}">
        </div>
        <input type="submit" value="Submit">
      </form>`

      const form = document.getElementById('post-form');
      form.addEventListener('submit', function(e) {
        e.preventDefault();
      
        const id = document.getElementById('id').value;
        const user = document.getElementById('user').value;
        const date = document.getElementById('date').value;
        const location = document.getElementById('location').value;
        const content = document.getElementById('content').value;
        const tags = document.getElementById('tags').value.split(',');
        const likes = document.getElementById('likes').value.split(',');
        const userTags = document.getElementById('userTags').value.split(',');
      
        // 해당 유저를 찾아서 정보를 업데이트
        const postIndex = posts.findIndex((post) => post.id === thisPostId);
        posts[postIndex].id = id;
        posts[postIndex].user = user;
        posts[postIndex].date = new Date(date);
        posts[postIndex].location = location === '' ? null : location;
        posts[postIndex].content = content; 
        posts[postIndex].tags = tags; 
        posts[postIndex].likes = likes; 
        posts[postIndex].userTags = userTags; 
      
        // 유저 정보를 다시 문자열로 변환
        const updatedPostsStr = JSON.stringify(posts, null, 2);
      
        // 유저 정보를 파일에 쓴다.
        fs.writeFile('../post.json', updatedPostsStr, function(err) {
          if (err) {
            window.alert(err);
            return;
          }
          inputPart.reload();
        });
      });
    })
  })
    newPost.addEventListener('click', ()=> {

      inputPart.innerHTML = `
        <form id="post-form">
        <div class="input-part">
          <label class="input-label" for="id">ID</label>
          <input class="input-input" type="text" id="id" name="id">
        </div>
        <div class="input-part">
          <label class="input-label" for="user">USER</label>
          <input class="input-input" type="text" id="user" name="user">
        </div>
        <div class="input-part">
          <label class="input-label" for="date">DATE</label>
          <input class="input-input" type="date" id="date" name="date">
        </div>
        <div class="input-part">
          <label class="input-label" for="location">LOCATION</label>
          <input class="input-input" type="text" id="location" name="location">
        </div>
        <div class="input-part">
          <label class="input-label" for="content">CONTENT</label>
          <textarea class="input-input" type="text" id="content" name="content"></textarea>
        </div>
        <div class="input-part">
          <label class="input-label" for="tags">TAGS</label>
          <textarea class="input-input" type="text" id="tags" name="tags"></textarea>
        </div>
        <div class="input-part">
          <label class="input-label" for="likes">LIKES</label>
          <textarea class="input-input" type="text" id="likes" name="likes"></textarea>
        </div>
        <div class="input-part">
          <label class="input-label" for="userTags">USERTAGS</label>
          <input class="input-input" type="text" id="userTags" name="userTags">
        </div>
        <input type="submit" value="Submit">
      </form>`

      const form = document.getElementById('post-form');
      form.addEventListener('submit', function(e) {
        e.preventDefault();

        const id = document.getElementById('id').value;
        const user = document.getElementById('user').value;
        const date = document.getElementById('date').value;
        const location = document.getElementById('location').value;
        const content = document.getElementById('content').value;
        const tags = document.getElementById('tags').value.split(',');
        const likes = document.getElementById('likes').value.split(',');
        const userTags = document.getElementById('userTags').value.split(',');
      
        // 해당 유저를 찾아서 정보를 업데이트
        posts.push({
          date: new Date(date),
          user,
          id,
          likes,
          imgPath: [],
          content,
          location,
          tags,
          userTags,
          comments: []
        });
      
        // 유저 정보를 다시 문자열로 변환
        const newPostsStr = JSON.stringify(posts, null, 2);

        // 유저 정보를 파일에 쓴다.
        fs.writeFile('../post.json', newPostsStr, function(err) {
          if (err) {
            window.alert(err);
            return;
          }
          inputPart.reload();
        })
      })
    })
  })
}

module.exports = postRender;