import styled from "styled-components";

export const Main = styled("main")`
  background-color: ${(props) => props.theme.primary};
  width: 100vw;
  height: 100vh;
`;

export const Content = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const Title = styled("h1")`
  text-transform: uppercase;
  font-size: 16rem;
`;

export const Subtitle = styled("h2")`
  text-transform: uppercase;
  font-size: 3rem;
`;
