import styled from "styled-components";
import ReactCalendar from "react-calendar";
import { EventType, eventTypeColors } from "app/styles/eventTypes";

export const Container = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  justify-content: center;
  width: min(24rem, calc(100vw - 2rem));
`;

export const Calendar = styled(ReactCalendar)`
  &.react-calendar {
    width: 100%;
    background-color: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.secondary};
    border: 1px solid ${(props) => props.theme.secondary}55;
    border-radius: 0.75rem;
    padding: 0.75rem;
    font-family: inherit;
    line-height: 1.2;
  }

  .react-calendar__navigation {
    margin-bottom: 0.25rem;

    button {
      color: ${(props) => props.theme.secondary};
      font-size: 1rem;
      font-weight: bold;
      border-radius: 0.5rem;
    }

    .react-calendar__navigation__label__labelText {
      display: inline-block;

      &::first-letter {
        text-transform: uppercase;
      }
    }

    button:enabled:hover,
    button:enabled:focus {
      background: ${(props) => props.theme.secondary}22;
    }

    button:disabled {
      background: none;
      opacity: 0.4;
    }
  }

  .react-calendar__month-view__weekdays__weekday {
    font-size: 0.6875rem;
    opacity: 0.75;

    abbr[title] {
      text-decoration: none;
    }
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    opacity: 0.35;
  }

  .react-calendar__tile {
    padding: 0.375rem 0.125rem 0.25rem;
    font-weight: bold;
    font-size: 0.875rem;
    color: ${(props) => props.theme.secondary};
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.125rem;
    min-height: 2.5rem;
  }

  .react-calendar__tile:disabled {
    background: none;
    color: ${(props) => props.theme.secondary};
    opacity: 0.35;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: ${(props) => props.theme.secondary}22;
  }

  .react-calendar__tile--active,
  .react-calendar__tile--active:enabled:focus {
    background: none;
  }

  .react-calendar__tile--active:enabled:hover {
    background: ${(props) => props.theme.secondary}22;
  }

  .react-calendar__tile--now {
    background: ${(props) => props.theme.secondary};

    abbr {
      color: ${(props) => props.theme.primary};
    }

    &:enabled:hover,
    &:enabled:focus {
      background: ${(props) => props.theme.secondary}CC;
    }
  }

  .react-calendar__tile.has-events {
    cursor: pointer;
  }

  .react-calendar__year-view__months__month {
    text-transform: capitalize;
    min-height: 3rem;
    justify-content: center;
  }
`;

export const HighlightList = styled("ul")`
  list-style: none;
  display: flex;
  gap: 0.1875rem;
  justify-content: center;
  align-items: center;
  min-height: 0.4375rem;
`;

interface HighlightItemProps {
  type: EventType;
}

export const HighlightItem = styled("li")<HighlightItemProps>`
  width: 0.4375rem;
  height: 0.4375rem;
  background: ${(props) => eventTypeColors[props.type]};
  border-radius: 50%;
`;

export const MoreEventsBadge = styled("li")`
  font-size: 0.5625rem;
  font-weight: bold;
  line-height: 0.4375rem;
  opacity: 0.75;
`;

export const LegendList = styled("ul")`
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 0;
`;

interface LegendItemProps {
  type: EventType;
}

export const LegendItem = styled("li")<LegendItemProps>`
  display: flex;
  gap: 0.375rem;
  align-items: center;

  font-size: 0.75rem;

  &::before {
    content: "";
    display: block;
    width: 0.4375rem;
    height: 0.4375rem;
    background: ${(props) => eventTypeColors[props.type]};
    border-radius: 50%;
  }
`;
