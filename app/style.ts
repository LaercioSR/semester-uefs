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
  height: calc(100% - 10rem);
`;

export const Title = styled("h2")`
  text-transform: uppercase;
  font-size: 16rem;
`;

export const Subtitle = styled("h3")`
  text-transform: uppercase;
  font-size: 3rem;
`;
