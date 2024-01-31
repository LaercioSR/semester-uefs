import styled from "styled-components";

export const Content = styled("header")`
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const NavLogo = styled("div")`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Title = styled("p")`
  font-size: 2rem;
  font-weight: 700;
  text-transform: uppercase;
`;

export const Button = styled("button")`
  svg {
    fill: ${(props) => props.theme["secondary"]};
    transition: fill 0.3s;
  }

  &:hover {
    svg {
      fill: ${(props) => props.theme["secondary"]}B3;
    }
  }
`;
