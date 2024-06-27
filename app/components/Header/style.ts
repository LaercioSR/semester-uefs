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
