export function convertMinutesToDHM(minutes) {
  if (isNaN(minutes) || minutes < 0) {
    return 'Invalid input';
  }

  const days = Math.floor(minutes / 1440); // 1 day has 1440 minutes
  const remainingMinutes = minutes % 1440;
  const hours = Math.floor(remainingMinutes / 60);
  const remainingSeconds = remainingMinutes % 60;

  let result = '';

  if (days > 0) {
    result += days === 1 ? `${days} day ` : `${days} days `;
  }

  if (hours > 0) {
    result += hours === 1 ? `${hours} hour ` : `${hours} hours `;
  }

  if (remainingSeconds > 0) {
    result += remainingSeconds === 1 ?
      `${remainingSeconds} minute` :
      `${remainingSeconds} minutes`;
  }

  return result.trim(); // Trim any trailing space
}
