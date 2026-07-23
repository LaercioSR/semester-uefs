import React from "react";
import {
  Calendar,
  Container,
  HighlightItem,
  HighlightList,
  LegendItem,
  LegendList,
  MoreEventsBadge,
} from "./style";
import "react-calendar/dist/Calendar.css";
import DayEventsModal, { DayEvent } from "@components/DayEventsModal";
import {
  EventType,
  eventTypeLabels,
  eventTypePriority,
} from "app/styles/eventTypes";

export type SpecialDate = {
  id: string;
  date: Date;
  type: EventType;
  startAt: Date;
  endAt: Date;
};

interface MarkersSpecialDate {
  [key: string]: DayEvent[];
}

interface CustomCalendarProps {
  specialDates: SpecialDate[];
  minDate?: Date;
  maxDate?: Date;
}

export default function CustomCalendar({
  specialDates,
  minDate,
  maxDate,
}: CustomCalendarProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

  const markers = React.useMemo(
    () =>
      specialDates.reduce((acc, { date, type, id, startAt, endAt }) => {
        const key = date.toDateString();
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push({ title: id, type, startAt, endAt });
        return acc;
      }, {} as MarkersSpecialDate),
    [specialDates]
  );

  function getTypesOfDay(date: Date): EventType[] {
    const events = markers[date.toDateString()];
    if (!events) return [];
    return eventTypePriority.filter((type) =>
      events.some((event) => event.type === type)
    );
  }

  function setTileContent({ date, view }: { date: Date; view: string }) {
    if (view !== "month") return null;
    const events = markers[date.toDateString()];
    if (!events) return null;
    const types = getTypesOfDay(date);

    return (
      <HighlightList>
        {types.map((type) => (
          <HighlightItem type={type} key={`${date.toDateString()}-${type}`} />
        ))}
        {events.length > 3 && <MoreEventsBadge>+</MoreEventsBadge>}
      </HighlightList>
    );
  }

  function setTileClassName({ date, view }: { date: Date; view: string }) {
    if (view === "month" && markers[date.toDateString()]) {
      return "has-events";
    }
    return null;
  }

  function handleClickDay(date: Date) {
    if (markers[date.toDateString()]) {
      setSelectedDate(date);
    }
  }

  return (
    <Container>
      <Calendar
        locale="pt-BR"
        minDetail="year"
        tileContent={setTileContent}
        tileClassName={setTileClassName}
        onClickDay={handleClickDay}
        minDate={minDate}
        maxDate={maxDate}
        prev2Label={null}
        next2Label={null}
      />
      <LegendList>
        {eventTypePriority.map((type) => (
          <LegendItem key={type} type={type}>
            {eventTypeLabels[type]}
          </LegendItem>
        ))}
      </LegendList>
      {selectedDate && (
        <DayEventsModal
          date={selectedDate}
          events={markers[selectedDate.toDateString()] ?? []}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </Container>
  );
}
