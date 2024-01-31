import styled from "styled-components";

export const Content = styled("footer")`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.5rem 0;
  gap: 0.5rem;
  height: 3rem;

  svg {
    width: 2rem;
    height: 2rem;
    @media (max-width: 768px) {
      width: 1.5rem;
      height: 1.5rem;
    }
    @media (max-width: 480px) {
      width: 1rem;
      height: 1rem;
    }
  }
`;

export const Text = styled("p")`
  font-size: 1.5rem;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;
