import { TDate } from "../../types/date";

export type WeekProps = {
  date: TDate[];
};

export type WeekdayProps = {
  date: TDate;
};

export type StyleDayProps = {
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
};
