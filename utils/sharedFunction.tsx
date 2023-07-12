export function calculation(props: any): string {
  const newProps = new Date(props);
  const currentDateTime = new Date();
  const timeDifference = currentDateTime.getTime() - newProps.getTime();
  const minutesAgo = Math.floor(timeDifference / (1000 * 60));
  const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const weeksAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));
  const monthsAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));
  const yearsAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));

  if (minutesAgo < 60) {
    return `${minutesAgo} minute${minutesAgo !== 1 ? "s" : ""} ago`;
  } else if (hoursAgo < 24) {
    return `${hoursAgo} hour${hoursAgo !== 1 ? "s" : ""} ago`;
  } else if (daysAgo < 7) {
    return `${daysAgo} day${daysAgo !== 1 ? "s" : ""} ago`;
  } else if (weeksAgo < 4) {
    return `${weeksAgo} week${weeksAgo !== 1 ? "s" : ""} ago`;
  } else if (monthsAgo < 12) {
    return `${monthsAgo} month${monthsAgo !== 1 ? "s" : ""} ago`;
  } else {
    return `${yearsAgo} year${yearsAgo !== 1 ? "s" : ""} ago`;
  }
}
export function sort(props: string): string {
  let array = props.split("");

  for (let i = 0; i < 19; i++) {
    array.pop();
  }

  return array.join(""); // Convert the array back to a string
}
