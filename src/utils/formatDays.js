export function formateDays(days) {
  let remainingDays = days;
  let result = "";

  if (remainingDays >= 365) {
    const years = Math.floor(remainingDays / 365);
    result += `${years} ${
      years === 1 ? "year" : years < 5 ? "years" : "years"
    } `;
    remainingDays %= 365;
  }

  if (remainingDays >= 30) {
    const months = Math.floor(remainingDays / 30);
    result += `${months} ${
      months === 1 ? "month" : months < 5 ? "months" : "months"
    } `;
    remainingDays %= 30;
  }

  if (remainingDays >= 7) {
    const weeks = Math.floor(remainingDays / 7);
    result += `${weeks} ${
      weeks === 1 ? "week" : weeks < 5 ? "weeks" : "weeks"
    } `;
    remainingDays %= 7;
  }

  if (remainingDays > 0) {
    result += `${remainingDays} ${
      remainingDays === 1 ? "day" : remainingDays < 5 ? "day" : "days"
    }`;
  }

  return result.trim();
}
