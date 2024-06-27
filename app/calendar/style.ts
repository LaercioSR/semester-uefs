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
  justify-content: center;
  min-height: calc(100% - 10rem);
  margin-top: 5rem;
`;

export const SemestersSection = styled("section")`
  max-width: 50rem;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SemestersList = styled("ul")`
  list-style-type: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

export const SemestersItem = styled("li")`
  width: 100%;
  text-align: center;
`;

export const DateList = styled("ul")`
  list-style-type: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const DateItem = styled("li")`
  width: 100%;
  text-align: center;
  border-bottom: 0.075rem solid ${(props) => props.theme.secondary};
`;
