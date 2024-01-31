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

  @media (max-width: 1024px) {
    font-size: 12rem;
  }
  @media (max-width: 768px) {
    font-size: 7rem;
  }
  @media (max-width: 480px) {
    font-size: 4rem;
  }
`;

export const Subtitle = styled("h3")`
  text-transform: uppercase;
  font-size: 3rem;

  @media (max-width: 1024px) {
    font-size: 2.5rem;
  }
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;
