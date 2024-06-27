import { Calendar, HighlightItem, HighlightList } from "./style";
import "react-calendar/dist/Calendar.css";

type SpecialDates = {
  id: string;
  date: Date;
  type: "HOLIDAY" | "ACADEMIC" | "IMPORTANT";
};

interface CustomCalendarProps {
  specialDates: SpecialDates[];
}

export default function CustomCalendar({ specialDates }: CustomCalendarProps) {
  const specialDatesMap = specialDates.reduce((acc, { date, type, id }) => {
    if (!acc[date.toDateString()]) {
      acc[date.toDateString()] = [];
    }
    acc[date.toDateString()].push({ type, id });
    return acc;
  }, {} as { [key: string]: { type: "HOLIDAY" | "ACADEMIC" | "IMPORTANT"; id: string }[] });

  function setTileContent({ date, view }: { date: Date; view: string }) {
    return (
      view === "month" && (
        <HighlightList>
          {specialDatesMap[date.toDateString()] && (
            <>
              {specialDatesMap[date.toDateString()].map((specialDate) => (
                <HighlightItem type={specialDate.type} key={specialDate.id} />
              ))}
            </>
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
