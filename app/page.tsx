"use client";
import { Content, Main, Subtitle, Title } from "./style";
import { semesters } from "@core/db.json";
import Header from "@components/Header";
import Footer from "@components/Footer";
import Head from "next/head";
import { ThemeProvider } from "@contexts/ThemeContext";
import { GlobalStyle } from "./styles/global";

export default function Home() {
  const today = new Date();
  const daysToEnd = semesters
    .map((semester) =>
      Math.ceil(
        (new Date(semester.endDate).getTime() - today.getTime()) /
          (1000 * 60 * 60 * 24)
      )
    )
    .reduce((min, cur) => {
      if (cur > 0 && cur < min) {
        return cur;
      }
      return min;
    }, 999);

  return (
    <ThemeProvider>
      <Main>
        <Head>
          <title>My page title</title>
        </Head>
        <Header />
        <Content>
          <Title>{daysToEnd} dias</Title>
          <Subtitle>para o fim do semestre da UEFS</Subtitle>
        </Content>
        <Footer />
      </Main>
      <GlobalStyle />
    </ThemeProvider>
  );
}
