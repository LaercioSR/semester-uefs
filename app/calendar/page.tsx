"use client";
import { ThemeProvider } from "@contexts/ThemeContext";
import { GlobalStyle } from "app/styles/global";
import { Content, Main } from "./style";
import Header from "@components/Header";
import Footer from "@components/Footer";
import CustomCalendar from "@components/CustomCalendar";
import { semesterController } from "@ui/controller/semester";
import React, { useEffect } from "react";
import { Event } from "@ui/schema/event";

interface Semester {
  title: string;
  start_at: string;
  end_at: string;
  event_groups: { [key: string]: Event[] };
}

interface SpecialDates {
  date: Date;
  type: "HOLIDAY" | "ACADEMIC" | "IMPORTANT";
}

export default function Calendar() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [semesters, setSemesters] = React.useState<Semester[]>([]);
  const [specialDates, setSpecialDates] = React.useState<SpecialDates[]>([]);

  function getDates(startDate: Date, stopDate: Date) {
    const dateArray = [];
    const currentDate = startDate;
    while (currentDate <= stopDate) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
  }

  useEffect(() => {
    semesterController.getEvents().then(({ events }) => {
      setSemesters(events);

      setSpecialDates(
        events.reduce<SpecialDates[]>((acc, semester) => {
          const semesterSpecialDates = Object.entries(
            semester.event_groups
          ).reduce<SpecialDates[]>((acc, [, events]) => {
            return [
              ...acc,
              ...events.reduce<SpecialDates[]>((acc, event) => {
                if (!event.start_at || !event.end_at) {
                  return acc;
                }
                const type = event.is_important
                  ? "IMPORTANT"
                  : event.is_holiday
                  ? "HOLIDAY"
                  : "ACADEMIC";
                const startDate = new Date(event.start_at);
                const endDate = new Date(event.end_at);
                const dates = getDates(startDate, endDate);
                const specialDates = dates.map<SpecialDates>((date) => ({
                  date,
                  type,
                }));
                return [...acc, ...specialDates];
              }, []),
            ];
          }, []);
          return [...acc, ...semesterSpecialDates];
        }, [])
      );
    });
  }, []);

  return (
    <ThemeProvider>
      <Main>
        <Header />
        <Content>
          <CustomCalendar specialDates={specialDates} />
        </Content>
        <Footer />
      </Main>
      <GlobalStyle />
    </ThemeProvider>
  );
}
