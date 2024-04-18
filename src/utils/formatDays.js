export function formateDays(days) {
  let remainingDays = days;
  let result = "";

  // Годы
  if (remainingDays >= 365) {
    const years = Math.floor(remainingDays / 365);
    result += `${years} ${years === 1 ? "год" : years < 5 ? "года" : "лет"} `;
    remainingDays %= 365;
  }

  // Месяцы
  if (remainingDays >= 30) {
    const months = Math.floor(remainingDays / 30);
    result += `${months} ${
      months === 1 ? "месяц" : months < 5 ? "месяца" : "месяцев"
    } `;
    remainingDays %= 30;
  }

  // Недели
  if (remainingDays >= 7) {
    const weeks = Math.floor(remainingDays / 7);
    result += `${weeks} ${
      weeks === 1 ? "неделя" : weeks < 5 ? "недели" : "недель"
    } `;
    remainingDays %= 7;
  }

  // Оставшиеся дни
  if (remainingDays > 0) {
    result += `${remainingDays} ${
      remainingDays === 1 ? "день" : remainingDays < 5 ? "дня" : "дней"
    }`;
  }

  return result.trim();
}
