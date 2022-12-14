export const getDaysBetweenDates = (end, start) => {
  return (new Date(end).getTime() - new Date(start).getTime()) / 86400000;
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
};