import { semesterRepository } from "@ui/repository/semester";
import { Event } from "@ui/schema/event";

function dateMessage(days: number, event: "início" | "fim" = "fim"): string[] {
  const secondMessage = event === "início" ? "começa o" : "acaba o";
  if (days === 0) {
    return ["hoje", secondMessage];
  }
  if (days === 1) {
    return ["amanhã", secondMessage];
  }
  return [`${days} dias`, `para o ${event} do`];
}

interface SemesterControllerGetDaysOutput {
  days: string;
  nextEvent: string;
}
async function getDays(): Promise<SemesterControllerGetDaysOutput> {
  try {
    const days = await semesterRepository.getDaysEndCurrent();
    const messages = dateMessage(days);
    return {
      days: messages[0],
      nextEvent: `${messages[1]} semestre da uefs`,
    };
  } catch {
    const days = await semesterRepository.getDaysStartNext();
    const messages = dateMessage(days, "início");
    return {
      days: messages[0],
      nextEvent: `${messages[1]} semestre da uefs`,
    };
  }
}

interface SemesterControllerGetEventsOutput {
  events: {
    title: string;
    start_at: Date;
    end_at: Date;
    event_groups: { [key: string]: Event[] };
  }[];
}
async function getEvents(): Promise<SemesterControllerGetEventsOutput> {
  const { semesters } = await semesterRepository.getWithEvents();

  const events = semesters.map((semester) => {
    const { title, start_at, end_at, events } = semester;
    const event_groups = events
      ? events.reduce((acc, event) => {
          const group = event.start_at
            ? new Date(event.start_at).getMonth().toString()
            : "without_date";
          if (!acc[group]) {
            acc[group] = [];
          }
          acc[group].push(event);
          return acc;
        }, {} as { [key: string]: Event[] })
      : {};

    return {
      title,
      start_at,
      end_at,
      event_groups,
    };
  });

  return { events };
}

export const semesterController = {
  getDays,
  getEvents,
};
