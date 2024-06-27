"use client";
import { ThemeProvider } from "@contexts/ThemeContext";
import { GlobalStyle } from "app/styles/global";
import {
  Content,
  DateItem,
  DateList,
  Main,
  SemestersItem,
  SemestersList,
  SemestersSection,
} from "./style";
import Header from "@components/Header";
import Footer from "@components/Footer";
import CustomCalendar from "@components/CustomCalendar";
import { semesterController } from "@ui/controller/semester";
import React, { useEffect } from "react";
import { Event } from "@ui/schema/event";

interface Semester {
  title: string;
  start_at: Date;
  end_at: Date;
  event_groups: { [key: string]: Event[] };
}

interface SpecialDates {
  id: string;
  date: Date;
  type: "HOLIDAY" | "ACADEMIC" | "IMPORTANT";
}

export default function Calendar() {
  const [semesters, setSemesters] = React.useState<Semester[]>([]);
  const [specialDates, setSpecialDates] = React.useState<SpecialDates[]>([]);
  const monthList = {
    "0": "Janeiro",
    "1": "Fevereiro",
    "2": "Março",
    "3": "Abril",
    "4": "Maio",
    "5": "Junho",
    "6": "Julho",
    "7": "Agosto",
    "8": "Setembro",
    "9": "Outubro",
    "10": "Novembro",
    "11": "Dezembro",
    without_date: "Sem data",
  };

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

      const specialDates = events.reduce<SpecialDates[]>((acc, semester) => {
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
                id: event.title,
              }));
              return [...acc, ...specialDates];
            }, []),
          ];
        }, []);
        return [...acc, ...semesterSpecialDates];
      }, []);
      setSpecialDates(specialDates);
    });
  }, []);

  return (
    <ThemeProvider>
      <Main>
        <Header />
        <Content>
          <CustomCalendar specialDates={specialDates} />
          <SemestersSection>
            <SemestersList>
              {semesters.map((semester) => (
                <SemestersItem key={semester.title}>
                  <h2>{semester.title}</h2>
                  <DateList>
                    {Object.entries(semester.event_groups).map(
                      ([group, events]) => (
                        <DateItem key={group}>
                          <h3>{monthList[group as keyof typeof monthList]}</h3>
                          {events.map((event) => (
                            <li key={event.title}>{event.title}</li>
                          ))}
                        </DateItem>
                      )
                    )}
                  </DateList>
                </SemestersItem>
              ))}
            </SemestersList>
          </SemestersSection>
        </Content>
        <Footer />
      </Main>
      <GlobalStyle />
    </ThemeProvider>
  );
}
