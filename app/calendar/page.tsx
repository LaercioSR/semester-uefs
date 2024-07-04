"use client";
import { ThemeProvider } from "@contexts/ThemeContext";
import { GlobalStyle } from "app/styles/global";
import {
  Content,
  LoadingMessage,
  Main,
  MonthItem,
  MonthList,
  MonthTitle,
  SemestersSection,
} from "./style";
import Header from "@components/Header";
import Footer from "@components/Footer";
import CustomCalendar from "@components/CustomCalendar";
import { semesterController } from "@ui/controller/semester";
import React from "react";
import { Event } from "@ui/schema/event";
import Accordion from "@components/Accordion";
import Table from "@components/Table";

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
  const tableHeaders = [{ title: "Data" }, { title: "Evento", width: "100%" }];
  const tableAligns = ["center", "left"];

  function getDates(startDate: Date, stopDate: Date) {
    const dateArray = [];
    const currentDate = startDate;
    while (currentDate <= stopDate) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
  }

  // Function to format date to string, with the format "dd/MM"
  function formatDate(date: Date) {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    return `${day}/${month}`;
  }

  React.useEffect(() => {
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

  const minDate = React.useMemo(() => {
    return semesters[0]?.event_groups[0][0].start_at;
  }, [semesters]);

  const maxDate = React.useMemo(() => {
    if (semesters.length === 0) return;
    const lastSemester = semesters[semesters.length - 1];
    const lastMonth = Object.keys(lastSemester.event_groups)
      .filter((month) => month !== "without_date")
      .pop();
    if (!lastMonth) return;
    const lastEvent =
      lastSemester.event_groups[lastMonth][
        lastSemester.event_groups[lastMonth].length - 1
      ];
    return lastEvent.end_at;
  }, [semesters]);

  return (
    <ThemeProvider>
      <Main>
        <Header />
        <Content>
          <CustomCalendar
            specialDates={specialDates}
            minDate={minDate ?? undefined}
            maxDate={maxDate ?? undefined}
          />
          {semesters.length > 0 ? (
            <SemestersSection>
              {semesters.map((semester) => (
                <Accordion key={semester.title} title={semester.title}>
                  <MonthList>
                    {Object.entries(semester.event_groups).map(
                      ([group, events]) => (
                        <MonthItem key={group}>
                          <MonthTitle>
                            {monthList[group as keyof typeof monthList]}
                          </MonthTitle>
                          <Table
                            headers={tableHeaders}
                            rows={events.map((event) => {
                              let date = event.start_at
                                ? `${formatDate(event.start_at)}`
                                : "Sem data";
                              if (event.end_at) {
                                const endDate = formatDate(event.end_at);
                                if (endDate !== date) date += ` - ${endDate}`;
                              }
                              return [date, event.title];
                            })}
                            aligns={tableAligns}
                          />
                        </MonthItem>
                      )
                    )}
                  </MonthList>
                </Accordion>
              ))}
            </SemestersSection>
          ) : (
            <LoadingMessage>Carregando Calendário...</LoadingMessage>
          )}
        </Content>
        <Footer />
      </Main>
      <GlobalStyle />
    </ThemeProvider>
  );
}
