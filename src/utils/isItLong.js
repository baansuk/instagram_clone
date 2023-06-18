export function isItLong () {
  const textElement = document.querySelector('.line-clamp-2');
  if (textElement){
    if (textElement.scrollHeight > textElement.clientHeight) {
    return true
    } else {
    return false
    }
  } else return true
}