"use client";
import { ThemeProvider } from "@contexts/ThemeContext";
import { GlobalStyle } from "app/styles/global";
import { Content, Main } from "./style";
import Header from "@components/Header";
import Footer from "@components/Footer";
import CustomCalendar from "@components/CustomCalendar";

export default function Calendar() {
  return (
    <ThemeProvider>
      <Main>
        <Header />
        <Content>
          <CustomCalendar
            specialDates={[
              {
                date: new Date("2024-06-01 00:00:00"),
                type: "HOLIDAY",
              },
              {
                date: new Date("2024-06-02 00:00:00"),
                type: "ACADEMIC",
              },
            ]}
          />
        </Content>
        <Footer />
      </Main>
      <GlobalStyle />
    </ThemeProvider>
  );
}
