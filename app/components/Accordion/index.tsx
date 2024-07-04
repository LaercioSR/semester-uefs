import { Container, Content, Header, Title } from "./styles";
import ExpandLess from "@assets/icons/expand-less.svg";
import ExpandMore from "@assets/icons/expand-more.svg";
import React from "react";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

export default function Accordion({ title, children }: AccordionProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  function handleToggle() {
    setIsOpen(!isOpen);
  }

  return (
    <Container>
      <Header onClick={handleToggle}>
        <Title>{title}</Title>
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </Header>
      <Content $isOpen={isOpen}>{children}</Content>
    </Container>
  );
}
