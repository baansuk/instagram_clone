import users from "../data/user.json";

export function whoFollows(userId) {
  const followers = [];
  users.map((user)=> {
    user.following.find((follow)=> follow === userId) && followers.push(user.id)
  })
  return followers;
}