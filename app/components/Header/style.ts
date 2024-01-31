import styled from "styled-components";

export const Content = styled("header")`
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 7rem;
`;

export const NavLogo = styled("div")`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    gap: 0.3rem;
    img {
      width: 1.5rem;
      height: 2.5rem;
    }
  }
`;

export const Title = styled("p")`
  font-size: 2rem;
  font-weight: 700;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;

export const Button = styled("button")`
  svg {
    fill: ${(props) => props.theme["secondary"]};
    transition: fill 0.3s;

    width: 3rem;
    height: 3rem;
    @media (max-width: 768px) {
      width: 2rem;
      height: 2rem;
    }
    @media (max-width: 480px) {
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  &:hover {
    svg {
      fill: ${(props) => props.theme["secondary"]}B3;
    }
  }
`;
