import {
  Calendar,
  Container,
  HighlightItem,
  HighlightList,
  LegendItem,
  LegendList,
} from "./style";
import "react-calendar/dist/Calendar.css";

type SpecialDates = {
  id: string;
  date: Date;
  type: "HOLIDAY" | "ACADEMIC" | "IMPORTANT";
};

interface CustomCalendarProps {
  specialDates: SpecialDates[];
  minDate?: Date;
  maxDate?: Date;
}

export default function CustomCalendar({
  specialDates,
  minDate,
  maxDate,
}: CustomCalendarProps) {
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
    <Container>
      <Calendar
        locale="pt-BR"
        minDetail="year"
        tileContent={setTileContent}
        onClickDay={() => {
          return;
        }}
        minDate={minDate}
        maxDate={maxDate}
        prev2Label={null}
        next2Label={null}
      />
      <LegendList>
        <LegendItem type="HOLIDAY">Feriado ou recesso</LegendItem>
        <LegendItem type="IMPORTANT">Data importante</LegendItem>
        <LegendItem type="ACADEMIC">Data acadêmica</LegendItem>
      </LegendList>
    </Container>
  );
}
