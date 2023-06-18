export function totalNumber (comments) {
  let number = 0;
  for(let i = 0; i < comments.length; i++){
    number += comments[i].subComments.length
  };
  const commentAmount = comments.length;
  return commentAmount + number;
}