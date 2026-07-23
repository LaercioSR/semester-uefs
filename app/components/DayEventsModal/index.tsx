import React from "react";
import Overlay from "@components/Overlay";
import CloseIcon from "@assets/icons/close.svg";
import { EventType, eventTypePriority } from "app/styles/eventTypes";
import {
  CloseButton,
  Container,
  EmptyMessage,
  EventItem,
  EventList,
  EventPeriod,
  EventTitle,
  EventTypeDot,
  Header,
  Title,
} from "./style";

export interface DayEvent {
  title: string;
  type: EventType;
  startAt: Date;
  endAt: Date;
}

interface DayEventsModalProps {
  date: Date;
  events: DayEvent[];
  onClose: () => void;
}

function formatShortDate(date: Date) {
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
}

function formatPeriod(event: DayEvent) {
  const start = formatShortDate(event.startAt);
  const end = formatShortDate(event.endAt);
  return start === end ? start : `${start} até ${end}`;
}

export default function DayEventsModal({
  date,
  events,
  onClose,
}: DayEventsModalProps) {
  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const sortedEvents = [...events].sort(
    (a, b) =>
      eventTypePriority.indexOf(a.type) - eventTypePriority.indexOf(b.type)
  );

  const formattedDate = date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <Overlay onClick={onClose} />
      <Container role="dialog" aria-modal="true" aria-label={formattedDate}>
        <Header>
          <Title>{formattedDate}</Title>
          <CloseButton onClick={onClose} aria-label="Fechar">
            <CloseIcon />
          </CloseButton>
        </Header>
        {sortedEvents.length > 0 ? (
          <EventList>
            {sortedEvents.map((event, index) => (
              <EventItem key={`${event.title}-${index}`}>
                <EventTypeDot type={event.type} />
                <div>
                  <EventTitle>{event.title}</EventTitle>
                  <EventPeriod>{formatPeriod(event)}</EventPeriod>
                </div>
              </EventItem>
            ))}
          </EventList>
        ) : (
          <EmptyMessage>Nenhum evento neste dia.</EmptyMessage>
        )}
      </Container>
    </>
  );
}
