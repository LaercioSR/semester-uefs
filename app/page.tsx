"use client";
import { Content, Main, Subtitle, Title } from "./style";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { ThemeProvider } from "@contexts/ThemeContext";
import { GlobalStyle } from "./styles/global";
import React from "react";
import { semesterController } from "@ui/controller/semester";

export default function Home() {
  const [fistText, setFistText] = React.useState("");
  const [secondText, setSecondText] = React.useState("");

  React.useEffect(() => {
    semesterController.getDays().then(({ days, nextEvent }) => {
      setFistText(days);
      setSecondText(nextEvent);
    });
  }, []);

  return (
    <ThemeProvider>
      <Main>
        <Header />
        <Content>
          <Title>{fistText}</Title>
          <Subtitle>{secondText}</Subtitle>
        </Content>
        <Footer />
      </Main>
      <GlobalStyle />
    </ThemeProvider>
  );
}
