import {
  HeaderButton,
  Content,
  LeftSide,
  RightSide,
  SocialMediaLink,
  Title,
  VerticalLine,
  LinkHome,
} from "./style";
import Image from "next/image";
import DarkModeIcon from "@assets/icons/dark-mode.svg";
import LightModeIcon from "@assets/icons/light-mode.svg";
import XIcon from "@assets/icons/x.svg";
import { useTheme } from "@hooks/useTheme";

export default function Header() {
  const { isDarkMode, toggleTheme } = useTheme();

  function handleToggleTheme(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    toggleTheme();
  }

  return (
    <Content>
      <LeftSide>
        <LinkHome href="/">
          <Image
            src="/logo.svg"
            alt="Semestre UEFS Logo"
            width={48}
            height={80}
          />
          <Title>Semestre UEFS</Title>
        </LinkHome>
      </LeftSide>
      <RightSide>
        <SocialMediaLink href="https://x.com/uefssemestre" target="_blank">
          <XIcon />
        </SocialMediaLink>
        <VerticalLine />
        <HeaderButton onClick={handleToggleTheme}>
          {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </HeaderButton>
      </RightSide>
    </Content>
  );
}
