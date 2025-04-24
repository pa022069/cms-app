export function isValidDate(string: string) {
  if (!/^\d{4}\/\d{2}\/\d{2}$/.test(string)) return false;

  const [year, month, day] = string.split("/").map(Number);
  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}
