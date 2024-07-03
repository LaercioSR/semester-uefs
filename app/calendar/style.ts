import styled from "styled-components";

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
  margin-top: 1rem;
`;

export const LoadingMessage = styled("p")`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => props.theme.secondary};
  text-align: center;
`;
