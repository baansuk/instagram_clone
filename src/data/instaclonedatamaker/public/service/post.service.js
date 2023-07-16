const commentRender = require("../sections/commentRender");
const { removePost } = require("./user.service");

const fs = require("fs").promises;

async function getPosts() {
  try {
    const data = await fs.readFile("../post.json", "utf-8");
    const posts = JSON.parse(data);
    return posts;
  } catch (err) {
    window.alert("Error:", err);
  }
}

async function getPost(id) {
  try {
    const data = await fs.readFile("../post.json", "utf-8");
    const posts = JSON.parse(data);
    const post = posts.find((post) => post.id === id);
    return post;
  } catch (err) {
    window.alert("Error:", err);
  }
}

async function deletePost(userId, id) {
  try {
    const data = await fs.readFile("../post.json", "utf-8");
    const posts = JSON.parse(data);

    const updatedPosts = posts.filter((post) => post.id !== id);
    await fs.writeFile("../post.json", JSON.stringify(updatedPosts, null, 2));
    await removePost(userId, id);

    return true;
  } catch (err) {
    window.alert("Error:", err);
    return false;
  }
}

async function patchUser(id, updatedData) {
  try {
    const data = await fs.readFile("../user.json", "utf-8");
    const users = JSON.parse(data);

    const updatedUsers = users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedData };
      }
      return user;
    });

    await fs.writeFile("../user.json", JSON.stringify(updatedUsers, null, 2));

    return true;
  } catch (err) {
    window.alert("Error:", err);
    return false;
  }
}

async function addPost(id, post) {
  try {
    const data = await fs.readFile("../user.json", "utf-8");
    const users = JSON.parse(data);

    const updatedUsers = users.map((user) => {
      if (user.id === id) {
        const posts = user.posts;
        posts.push(post);
        return { ...user, posts };
      }
      return user;
    });

    await fs.writeFile("../user.json", JSON.stringify(updatedUsers, null, 2));

    return true;
  } catch (err) {
    window.alert("Error:", err);
    return false;
  }
}

async function removeComment(id, commentId) {
  try {
    const data = await fs.readFile("../post.json", "utf-8");
    const posts = JSON.parse(data);

    const updatedPosts = posts.map((post) => {
      if (post.id === id) {
        const comments = post.comments.filter(
          (comment) => comment.id !== commentId
        );
        return { ...post, comments };
      }
      return post;
    });

    await fs.writeFile("../post.json", JSON.stringify(updatedPosts, null, 2));

    const thisPostForComment = updatedPosts.find((post) => post.id === id);
    commentRender(
      thisPostForComment.comments,
      updatedPosts,
      thisPostForComment.id
    );

    return true;
  } catch (err) {
    window.alert("Error:", err);
    return false;
  }
}

module.exports = {
  getPost,
  getPosts,
  deletePost,
  removeComment,
};
