export function timeAgo(pastDate) {
  const diffInMilliseconds = new Date().getTime() - pastDate.getTime();
  const diffInSeconds = diffInMilliseconds / 1000;
  
  const diffInMinutes = diffInSeconds / 60;
  if (diffInMinutes < 60) {
    return `${Math.floor(diffInMinutes)}분`;
  }
  
  const diffInHours = diffInMinutes / 60;
  if (diffInHours < 24) {
    return `${Math.floor(diffInHours)}시간`;
  }

  const diffInDays = diffInHours / 24;
  if (diffInDays < 7) {
    return `${Math.floor(diffInDays)}일`;
  }

  const diffInWeeks = diffInDays / 7;
    return `${Math.floor(diffInWeeks)}주`;
}