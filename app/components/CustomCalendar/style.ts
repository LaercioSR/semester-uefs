import styled from "styled-components";
import ReactCalendar from "react-calendar";

const highlightColors = {
  HOLIDAY: "deepskyblue",
  ACADEMIC: "gray",
  IMPORTANT: "red",
};

export const Container = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
`;

export const Calendar = styled(ReactCalendar)`
  background-color: ${(props) => props.theme.primary};
  border: 1px solid ${(props) => props.theme.secondary};

  .react-calendar__month-view__weekdays__weekday abbr[title] {
    text-decoration: none;
  }

  * button:enabled:hover,
  * button:disabled {
    background: ${(props) => props.theme.secondary}33;
  }

  .react-calendar__tile {
    padding: 0.5rem 0.375rem;
    font-weight: bold;
    font-size: 1rem;
  }

  .react-calendar__tile--active,
  .react-calendar__tile--active:enabled:focus {
    background: none;
  }

  .react-calendar__tile--now {
    background: none;
    background: ${(props) => props.theme.secondary};

    abbr {
      color: ${(props) => props.theme.primary};
      font-weight: bold;
    }
  }
`;

export const HighlightList = styled("ul")`
  list-style: none;
  display: flex;
  gap: 0.125rem;
  justify-content: center;
  align-items: center;
`;

interface HighlightItemProps {
  type: keyof typeof highlightColors;
}

export const HighlightItem = styled("li")<HighlightItemProps>`
  width: 0.625rem;
  height: 0.625rem;
  background: ${(props) => highlightColors[props.type]};
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 0.55rem;
  color: white;
`;

export const LegendList = styled("ul")`
  list-style: none;
  display: flex;
  justify-content: space-between;
  padding: 0;
`;

interface LegendItemProps {
  type: keyof typeof highlightColors;
}

export const LegendItem = styled("li")<LegendItemProps>`
  display: flex;
  gap: 0.25rem;
  align-items: center;

  font-size: 0.75rem;

  &::before {
    content: "";
    display: block;
    width: 0.35rem;
    height: 0.35rem;
    background: ${(props) => highlightColors[props.type]};
    border-radius: 50%;
  }
`;
