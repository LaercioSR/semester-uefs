import Link from "next/link";
import styled from "styled-components";

export const Content = styled("header")`
  padding: 1rem 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 7rem;

  @media (max-width: 768px) {
    padding: 1rem 3.5rem;
  }
  @media (max-width: 480px) {
    padding: 1rem 2rem;
  }
`;

export const LeftSide = styled("div")`
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

export const LinkHome = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
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

export const RightSide = styled("div")`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    gap: 0.75rem;
  }
`;

export const HeaderButton = styled("button")`
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

export const SocialMediaLink = styled("a")`
  cursor: pointer;

  svg {
    fill: ${(props) => props.theme["secondary"]};
    transition: fill 0.3s;

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

  &:hover {
    svg {
      fill: ${(props) => props.theme["secondary"]}B3;
    }
  }
`;

export const VerticalLine = styled("span")`
  height: 3.25rem;
  width: 0.125rem;
  background-color: ${(props) => props.theme["secondary"]};
  @media (max-width: 768px) {
    height: 2.25rem;
  }
  @media (max-width: 480px) {
    height: 1.75rem;
  }
`;

interface MenuProps {
  isOpen: boolean;
}

export const Menu = styled("nav")<MenuProps>`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 20rem;
  padding: 0;
  background-color: ${(props) => props.theme.primary};
  flex-direction: column;
  z-index: 10;
`;

export const MenuHeader = styled("div")`
  display: flex;
  justify-content: flex-end;
  height: 5rem;
  padding: 1rem 2rem;
`;

export const MenuList = styled("ul")`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  list-style: none;
  width: 100%;
`;

export const MenuItem = styled("li")`
  width: 100%;
  transition: background-color 0.3s;
  padding: 0.5rem 2rem;
  text-align: right;

  &:hover {
    background-color: ${(props) => props.theme.secondary}1A;
  }
`;

export const MenuLink = styled(Link)`
  font-weight: bold;
  font-size: 1.25rem;
  text-align: right;
  text-transform: uppercase;
  width: 100%;
`;

interface OverlayProps {
  isOpen: boolean;
}

export const Overlay = styled("div")<OverlayProps>`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #000000b3;
  z-index: 9;
`;
