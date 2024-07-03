import styled from "styled-components";
import ReactCalendar from "react-calendar";

const highlightColors = {
  HOLIDAY: "deepskyblue",
  ACADEMIC: "gray",
  IMPORTANT: "red",
};

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
  display: flex;
  gap: 0.25rem;
  justify-content: center;
  align-items: center;
  margin-top: 0.25rem;
  height: 0.4rem;
`;

interface HighlightItemProps {
  type: "HOLIDAY" | "ACADEMIC" | "IMPORTANT";
}

export const HighlightItem = styled("li")<HighlightItemProps>`
  content: "";
  display: block;
  width: 0.3rem;
  height: 0.3rem;
  background: ${(props) => highlightColors[props.type]};
  border-radius: 50%;
`;
