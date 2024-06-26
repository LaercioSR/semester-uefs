import { Calendar, HighlightItem, HighlightList } from "./style";
import "react-calendar/dist/Calendar.css";

type SpecialDates = {
  date: Date;
  type: "HOLIDAY" | "ACADEMIC";
};

interface CustomCalendarProps {
  specialDates: SpecialDates[];
}

export default function CustomCalendar({ specialDates }: CustomCalendarProps) {
  const specialDatesMap = specialDates.reduce((acc, { date, type }) => {
    acc[date.toDateString()] = type;
    return acc;
  }, {} as { [key: string]: "HOLIDAY" | "ACADEMIC" });

  function setTileContent({ date, view }: { date: Date; view: string }) {
    return (
      view === "month" && (
        <HighlightList>
          {specialDatesMap[date.toDateString()] && (
            <HighlightItem type={specialDatesMap[date.toDateString()]} />
          )}
        </HighlightList>
      )
    );
  }

  return (
    <Calendar
      locale="pt-BR"
      minDetail="year"
      tileContent={setTileContent}
      onClickDay={() => {
        return;
      }}
    />
  );
}
