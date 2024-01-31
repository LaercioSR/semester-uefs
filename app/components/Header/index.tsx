import { Button, Content, NavLogo, Title } from "./style";
import Image from "next/image";
import DarkModeIcon from "../../assets/icons/dark-mode.svg";
import LightModeIcon from "../../assets/icons/light-mode.svg";
import { useTheme } from "../../hooks/useTheme";

export default function Header() {
  const { isDarkMode, toggleTheme } = useTheme();

  function handleToggleTheme(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    toggleTheme();
  }

  return (
    <Content>
      <NavLogo>
        <Image src="/logo-uefs.png" alt="UEFS Logo" width={48} height={80} />
        <Title>Semestre UEFS</Title>
      </NavLogo>
      <Button onClick={handleToggleTheme}>
        {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
      </Button>
    </Content>
  );
}
