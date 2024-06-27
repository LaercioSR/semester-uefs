import styled from "styled-components";

export const Main = styled("main")`
  background-color: ${(props) => props.theme.primary};
  width: 100%;
  height: 100vh;
`;

export const Content = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100% - 10rem);
`;

export const SemestersSection = styled("section")``;

export const SemestersList = styled("ul")``;

export const SemestersItem = styled("li")``;

export const DateList = styled("ul")``;

export const DateItem = styled("li")``;
