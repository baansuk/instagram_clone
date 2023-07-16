const fs = require("fs");
const path = require("path");
const userDrop = require("../utils/userDrop");
const { addPost } = require("../service/user.service");
const { deletePost, removeComment } = require("../service/post.service");
const postRender = require("./postRenderer");

function commentRender(comments, commentPosts, postIdForComment) {
  const commentList = document.getElementById("comment-list");
  const commentInput = document.getElementById("comment-input-part");
  const commentposts = commentPosts;

  commentList.innerHTML = ``;
  commentInput.innerHTML = ``;

  for (const comment of comments) {
    const list = `<div class="comment-content-list">${comment.id}(${comment.user})</div>`;
    commentList.innerHTML += list;
  }
  commentList.innerHTML += `<div id="new-comment">NEW COMMENT</div>`;

  const commentlist = document.getElementsByClassName("comment-content-list");
  const newComment = document.getElementById("new-comment");

  Array.from(commentlist).map((comment) => {
    comment.addEventListener("click", async () => {
      Array.from(commentlist).map((n) => n.classList.remove("selected"));
      comment.classList.add("selected");
      const thisCommentId = comment.innerText.split("(")[0];
      const thisCommentData = comments.find(
        (thisComment) => thisComment.id === thisCommentId
      );
      const userdrop = await userDrop(thisCommentData.user);
      let dateObject = new Date(thisCommentData.date);
      let year = dateObject.getFullYear(); // 연도
      let month = dateObject.getMonth() + 1; // 월 (0부터 시작하므로 1을 더해줍니다)
      let day = dateObject.getDate();
      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;
      let formattedDate = `${year}-${month}-${day}`;
      commentInput.innerHTML = `
        <form id="comment-form">
        <div class="input-part">
          <label class="input-label" for="comment-user">USER</label>
          <select name="comment-user" id="comment-user">
          ${userdrop}
          </select>
        </div>
        <div class="input-part">
          <label class="input-label" for="date">DATE</label>
          <input class="comment-input" type="date" id="comment-date" name="date" value="${formattedDate}">
        </div>
        <div class="input-part">
          <label class="input-label" for="content">CONTENT</label>
          <textarea class="comment-input" type="text" id="comment-content" name="comment-content">${
            thisCommentData.content
          }</textarea>
        </div>
        <div class="input-part">
          <label class="input-label" for="likes">LIKES</label>
          <textarea class="input-input" type="text" id="comment-likes" name="likes">${
            thisCommentData.likes.length > 0
              ? thisCommentData.likes.toString()
              : ""
          }</textarea>
        </div>
        <div class="input-part">
          <label class="input-label" for="userTags">USERTAGS</label>
          <input class="input-input" type="text" id="comment-userTags" name="comment-userTags" value="${
            thisCommentData.userTags.length > 0
              ? thisCommentData.userTags.toString()
              : ""
          }">
        </div>
        <div class="button-area">
        <input class="section-button" type="submit" value="SUBMIT">
        <button class="section-button" id="comment-remove">DELETE</button>
        </div>
      </form>`;

      const commentRemoveBtn = document.getElementById("comment-remove");
      const commentForm = document.getElementById("comment-form");

      commentForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const comment_id = thisCommentData.id;
        const comment_user = document.getElementById("comment-user").value;
        const comment_date = document.getElementById("comment-date").value;
        const comment_content =
          document.getElementById("comment-content").value;
        const comment_likes = document
          .getElementById("comment-likes")
          .value.split(",");
        const comment_userTags = document
          .getElementById("comment-userTags")
          .value.split(",");

        // 해당 유저를 찾아서 정보를 업데이트
        const commentIndex = comments.findIndex(
          (comment) => comment.id === thisCommentId
        );

        const postIndex = commentposts.findIndex(
          (post) => post.id === postIdForComment
        );

        commentposts[postIndex].comments[commentIndex].id = comment_id;
        commentposts[postIndex].comments[commentIndex].user = comment_user;
        commentposts[postIndex].comments[commentIndex].content =
          comment_content;
        commentposts[postIndex].comments[commentIndex].date = new Date(
          comment_date
        );
        commentposts[postIndex].comments[commentIndex].likes = comment_likes;
        commentposts[postIndex].comments[commentIndex].userTags =
          comment_userTags;

        // 유저 정보를 다시 문자열로 변환
        const updatedCommentsStr = JSON.stringify(commentposts, null, 2);

        // 유저 정보를 파일에 쓴다.
        fs.writeFile("../post.json", updatedCommentsStr, function (err) {
          if (err) {
            window.alert(err);
            return;
          }
          commentRender(
            commentPosts[postIndex].comments,
            commentPosts,
            commentPosts[postIndex].id
          );
        });
      });
      commentRemoveBtn.addEventListener("click", async function (e) {
        e.preventDefault();
        const thisCommentPost = commentposts.find(
          (post) => post.id === postIdForComment
        );
        await removeComment(thisCommentPost.id, thisCommentData.id);
      });
    });
  });

  newComment.addEventListener("click", async () => {
    const userdrop = await userDrop();
    commentInput.innerHTML = `
      <form id="comment-form">
      <div class="input-part">
        <label class="input-label" for="comment-user">USER</label>
        <select name="comment-user" id="comment-user">
        ${userdrop}
        </select>
      </div>
      <div class="input-part">
        <label class="input-label" for="date">DATE</label>
        <input class="comment-input" type="date" id="comment-date" name="date">
      </div>
      <div class="input-part">
        <label class="input-label" for="content">CONTENT</label>
        <textarea class="comment-input" type="text" id="comment-content" name="comment-content"></textarea>
      </div>
      <div class="input-part">
        <label class="input-label" for="likes">LIKES</label>
        <div class="input-adding-area">
          <div>
            <select name="userLike" id="comment-user-like">
            ${userdrop}
            </select>
            <button id="comment-add-like">ADD
            </button>
          </div>
          <textarea class="input-input add-area" type="text" id="comment-likes" name="likes"></textarea>
        </div>
      </div>
      <div class="input-part">
        <label class="input-label" for="userTags">USERTAGS</label>
        <input class="input-input" type="text" id="comment-userTags" name="userTags">
      </div>
      <div class="button-area">
      <input class="section-button" type="submit" value="SUBMIT">
      </div>
    </form>`;

    const commentForm = document.getElementById("comment-form");
    const addLikeComment = document.getElementById("comment-add-like");

    addLikeComment.addEventListener("click", function (e) {
      e.preventDefault();
      const likeAreaComment = document.getElementById("comment-likes");
      const likeUserComment = document.getElementById("comment-user-like");
      likeAreaComment.value += `${likeUserComment.value},`;
    });

    commentForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const commentIndexNo =
        Math.ceil(Math.random() * 100000) +
        "__" +
        Math.ceil(Math.random() * 100000);

      const comment_user = document.getElementById("comment-user").value;
      const comment_date = document.getElementById("comment-date").value;
      const comment_content = document.getElementById("comment-content").value;
      const comment_likes = document.getElementById("comment-likes").value
        ? document.getElementById("comment-likes").value.split(",")
        : [];
      const comment_userTags = document.getElementById("comment-userTags").value
        ? document.getElementById("comment-userTags").value.split(",")
        : [];

      // 해당 유저를 찾아서 정보를 업데이트

      const postIndex = commentposts.findIndex(
        (post) => post.id === postIdForComment
      );

      commentposts[postIndex].comments.push({
        id: `${commentIndexNo}`,
        user: comment_user,
        date: new Date(comment_date),
        content: comment_content,
        likes: comment_likes,
        userTags: comment_userTags,
        subComments: [],
      });

      // 유저 정보를 다시 문자열로 변환
      const updatedCommentsStr = JSON.stringify(commentposts, null, 2);

      // 유저 정보를 파일에 쓴다.
      fs.writeFile("../post.json", updatedCommentsStr, function (err) {
        if (err) {
          window.alert(err);
          return;
        }
        commentRender(
          commentPosts[postIndex].comments,
          commentPosts,
          commentPosts[postIndex].id
        );
      });
    });
  });
}

module.exports = commentRender;
