import styled from "styled-components";
import { EventType, eventTypeColors } from "app/styles/eventTypes";

export const Container = styled("div")`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;

  width: min(28rem, calc(100vw - 2rem));
  max-height: 70vh;
  overflow-y: auto;

  background: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.secondary};
  border: 1px solid ${(props) => props.theme.secondary}55;
  border-radius: 0.75rem;
  box-shadow: 0 1rem 3rem #00000059;
  padding: 1.25rem;
`;

export const Header = styled("div")`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const Title = styled("h2")`
  font-size: 1.125rem;

  &::first-letter {
    text-transform: uppercase;
  }
`;

export const CloseButton = styled("button")`
  display: flex;
  padding: 0.25rem;
  border-radius: 50%;
  transition: background-color 0.2s ease-in-out;

  svg {
    fill: ${(props) => props.theme.secondary};
    width: 1.25rem;
    height: 1.25rem;
  }

  &:hover {
    background-color: ${(props) => props.theme.secondary}33;
  }
`;

export const EventList = styled("ul")`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const EventItem = styled("li")`
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;

  padding: 0.625rem 0.75rem;
  border: 1px solid ${(props) => props.theme.secondary}22;
  border-radius: 0.5rem;
  background: ${(props) => props.theme.secondary}0D;
`;

interface EventTypeDotProps {
  type: EventType;
}

export const EventTypeDot = styled("span")<EventTypeDotProps>`
  flex-shrink: 0;
  width: 0.625rem;
  height: 0.625rem;
  margin-top: 0.375rem;
  border-radius: 50%;
  background: ${(props) => eventTypeColors[props.type]};
`;

export const EventTitle = styled("p")`
  font-weight: 500;
  line-height: 1.4;
`;

export const EventPeriod = styled("p")`
  font-size: 0.8125rem;
  opacity: 0.75;
  margin-top: 0.125rem;
`;

export const EmptyMessage = styled("p")`
  text-align: center;
  opacity: 0.75;
  padding: 1rem 0;
`;
