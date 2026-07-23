import styled from "styled-components";

export const Container = styled("div")`
  border: 1px solid ${(props) => props.theme.secondary}55;
  border-radius: 0.75rem;
  overflow: hidden;
  width: 100%;

  & + & {
    margin-top: 1rem;
  }
`;

export const Header = styled("div")`
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  svg {
    fill: ${(props) => props.theme.secondary};
  }

  &:hover {
    background-color: ${(props) => props.theme.secondary}22;
  }
`;

export const Title = styled("h2")`
  font-size: 1.25rem;
`;

interface ContentProps {
  $isOpen: boolean;
}

export const Content = styled("div")<ContentProps>`
  padding: 1rem 1.5rem 1.5rem;
  border-top: 1px solid ${(props) => props.theme.secondary}55;
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};

  @media (max-width: 40rem) {
    padding: 0.75rem;
  }
`;
