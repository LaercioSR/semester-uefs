import styled from "styled-components";
import { EventType, eventTypeColors } from "app/styles/eventTypes";

export const Main = styled("main")`
  background-color: ${(props) => props.theme.primary};
  width: 100%;
  height: 100vh;
`;

export const Content = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 5rem;
  align-items: center;
  min-height: calc(100% - 10rem);
  padding: 5rem 0;
`;

export const SemestersSection = styled("section")`
  max-width: 50rem;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MonthList = styled("ul")`
  list-style-type: none;
  width: 100%;
`;

export const MonthItem = styled("li")`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  justify-content: center;
`;

export const MonthTitle = styled("h3")`
  text-align: center;
  margin-top: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 1rem;
  opacity: 0.9;
`;

export const EventLabel = styled("span")`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
`;

interface EventDotProps {
  type: EventType;
}

export const EventDot = styled("span")<EventDotProps>`
  flex-shrink: 0;
  width: 0.4375rem;
  height: 0.4375rem;
  border-radius: 50%;
  background: ${(props) => eventTypeColors[props.type]};
`;

export const LoadingMessage = styled("p")`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => props.theme.secondary};
  text-align: center;
`;
