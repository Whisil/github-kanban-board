const periods = {
  year: 365 * 24 * 60 * 60 * 1000,
  week: 7 * 24 * 60 * 60 * 1000,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
};

export function formatTime(timestamp: string) {
  const diff = Date.now() - Date.parse(timestamp);

  if (diff > periods.year) {
    return new Date(timestamp).toLocaleDateString(`default`, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } else if (diff > periods.week) {
    return new Date(timestamp).toLocaleString(`default`, {
      month: "long",
      day: "numeric",
    });
  } else if (diff > periods.day) {
    if (Math.floor(diff / periods.day) === 1) {
      return Math.floor(diff / periods.day) + ` day ago`;
    } else {
      return Math.floor(diff / periods.day) + ` days ago`;
    }
  } else if (diff > periods.hour) {
    return Math.floor(diff / periods.hour) + ` hours ago`;
  } else if (diff > periods.minute) {
    return Math.floor(diff / periods.minute) + ` minutes ago`;
  } else {
    return `Just now`;
  }
}
