function zellerCongruence(year: number, month: number, day: number) {
  if (month < 3) {
    month += 12;
    year -= 1;
  }
  const K = year % 100;
  const J = Math.floor(year / 100);
  const h =
    (day +
      Math.floor((13 * (month + 1)) / 5) +
      K +
      Math.floor(K / 4) +
      Math.floor(J / 4) +
      5 * J) %
    7;
  return (h + 6) % 7;
}

export function getMonthDays(year: number, month: number, current?: string) {
  const selectedDay = new Date(current || Date.now());
  const selectedYear = selectedDay.getFullYear();
  const selectedMonth = selectedDay.getMonth() + 1;
  const selectedDate = selectedDay.getDate();

  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
  const todayDate = today.getDate();

  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayIndex = zellerCongruence(year, month, 1);
  const lastDayIndex = zellerCongruence(year, month, daysInMonth);

  const prevMonth = ((month - 2 + 12) % 12) + 1;
  const prevYear = month === 1 ? year - 1 : year;
  const prevMonthDays = new Date(prevYear, prevMonth, 0).getDate();

  const nextMonth = (month % 12) + 1;
  const nextYear = month === 12 ? year + 1 : year;

  const monthDays = [];

  // 前一個月的補足天數
  for (let i = firstDayIndex - 1, day = prevMonthDays; i >= 0; i--, day--) {
    monthDays.unshift({
      year: prevYear,
      month: prevMonth,
      day,
      weekday: i,
      isCurrentMonth: false,
      isToday: false,
      isSelected: false,
    });
  }

  // 當月的天數
  for (let day = 1; day <= daysInMonth; day++) {
    monthDays.push({
      year,
      month,
      day,
      weekday: zellerCongruence(year, month, day),
      isCurrentMonth: true,
      isToday: year === todayYear && month === todayMonth && day === todayDate,
      isSelected:
        year === selectedYear &&
        month === selectedMonth &&
        day === selectedDate,
    });
  }

  // 下一個月的補足天數
  for (let i = lastDayIndex + 1, day = 1; i < 7; i++, day++) {
    monthDays.push({
      year: nextYear,
      month: nextMonth,
      day,
      weekday: i,
      isCurrentMonth: false,
      isToday: false,
      isSelected: false,
    });
  }

  // **將 monthDays 陣列拆分成 6 個為一組**
  const groupedMonthDays = [];
  for (let i = 0; i < monthDays.length; i += 7) {
    groupedMonthDays.push(monthDays.slice(i, i + 7));
  }

  return groupedMonthDays;
}
