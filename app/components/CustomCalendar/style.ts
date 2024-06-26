import styled from "styled-components";
import ReactCalendar from "react-calendar";

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

    abbr {
      color: ${(props) => props.theme.primary};
      background: ${(props) => props.theme.secondary};
      padding: 0.25rem 0.25rem;
      border-radius: 50%;
    }

    & :enabled:hover {
      background: none;
    }
  }
`;

export const HighlightList = styled("ul")`
  display: flex;
  gap: 0.25rem;
  justify-content: center;
  margin-top: 0.25rem;
  height: 0.35rem;
`;

interface HighlightItemProps {
  type: "HOLIDAY" | "ACADEMIC";
}

export const HighlightItem = styled("li")<HighlightItemProps>`
  content: "";
  display: block;
  width: 0.35rem;
  height: 0.35rem;
  background: ${(props) => (props.type === "HOLIDAY" ? "red" : "orange")};
  border-radius: 50%;
`;
