import {
  HeaderButton,
  Content,
  LeftSide,
  RightSide,
  SocialMediaLink,
  Title,
  VerticalLine,
  LinkHome,
  Menu,
  MenuHeader,
  MenuList,
  MenuItem,
  MenuLink,
} from "./style";
import Image from "next/image";
import CloseIcon from "@assets/icons/close.svg";
import DarkModeIcon from "@assets/icons/dark-mode.svg";
import LightModeIcon from "@assets/icons/light-mode.svg";
import MenuIcon from "@assets/icons/menu.svg";
import XIcon from "@assets/icons/x.svg";
import { useTheme } from "@hooks/useTheme";
import React from "react";
import Overlay from "@components/Overlay";

export default function Header() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isOpenMenu, setIsOpenMenu] = React.useState(false);

  function handleToggleTheme(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    toggleTheme();
  }

  function handleToggleMenu(
    event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) {
    event.preventDefault();
    setIsOpenMenu(!isOpenMenu);
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
        <HeaderButton onClick={handleToggleMenu}>
          <MenuIcon />
        </HeaderButton>
      </RightSide>
      {isOpenMenu && (
        <>
          <Overlay onClick={handleToggleMenu} />
          <Menu isOpen={isOpenMenu}>
            <MenuHeader>
              <HeaderButton onClick={handleToggleMenu}>
                <CloseIcon />
              </HeaderButton>
            </MenuHeader>
            <MenuList>
              <MenuItem>
                <MenuLink href="/">Início</MenuLink>
              </MenuItem>
              <MenuItem>
                <MenuLink href="/calendario">Calendário</MenuLink>
              </MenuItem>
            </MenuList>
          </Menu>
        </>
      )}
    </Content>
  );
}
