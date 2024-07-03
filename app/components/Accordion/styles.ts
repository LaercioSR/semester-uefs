import styled from "styled-components";

export const Container = styled("div")`
  border-top: 0.025rem solid ${(props) => props.theme.secondary};
  border-bottom: 0.025rem solid ${(props) => props.theme.secondary};
  width: 100%;
`;

export const Header = styled("div")`
  padding: 0.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  svg {
    fill: ${(props) => props.theme.text};
  }

  &:hover {
    background-color: ${(props) => props.theme.secondary}1A;
  }
`;

export const Title = styled("h2")``;

interface ContentProps {
  isOpen: boolean;
}

export const Content = styled("div")<ContentProps>`
  padding: 1rem 3rem;
  border-top: 0.025rem solid ${(props) => props.theme.secondary};
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;
