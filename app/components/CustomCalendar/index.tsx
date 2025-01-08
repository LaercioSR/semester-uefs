import {
  Calendar,
  Container,
  HighlightItem,
  HighlightList,
  LegendItem,
  LegendList,
} from "./style";
import "react-calendar/dist/Calendar.css";

type TypeDate = "HOLIDAY" | "ACADEMIC" | "IMPORTANT";

type SpecialDates = {
  id: string;
  date: Date;
  type: TypeDate;
};

interface MarkersSpecialDate {
  [key: string]: { [K in TypeDate]: string[] };
}

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
  const markers = specialDates.reduce((acc, { date, type, id }) => {
    const key = date.toDateString();
    if (!acc[key]) {
      acc[key] = { HOLIDAY: [], ACADEMIC: [], IMPORTANT: [] };
    }
    acc[key][type].push(id);
    return acc;
  }, {} as MarkersSpecialDate);

  function setTileContent({ date, view }: { date: Date; view: string }) {
    return (
      view === "month" && (
        <HighlightList>
          {markers[date.toDateString()] && (
            <>
              {["IMPORTANT", "HOLIDAY", "ACADEMIC"].map((type) => {
                if (markers[date.toDateString()][type as TypeDate].length > 0)
                  return (
                    <HighlightItem
                      type={type as TypeDate}
                      key={`${date.toDateString()}-${type}`}
                    >
                      {markers[date.toDateString()][type as TypeDate].length}
                    </HighlightItem>
                  );
                return null;
              })}
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
