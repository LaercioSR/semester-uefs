import { semesterRepository } from "@server/repository/semester";
import { tweetRepository } from "@server/repository/tweet";
import type { Event } from "@server/schema/event";
import { ApiResponseError } from "twitter-api-v2";

function dateMessage(days: number, event: "início" | "fim" = "fim"): string[] {
  if (days === 0) {
    return ["Hoje", "acaba o"];
  }
  if (days === 1) {
    return ["Amanhã", "acaba o"];
  }
  return [`Faltam ${days} dias`, `para o ${event} do`];
}

function getMessageToEvent(event: Event): string {
  const today = new Date();
  const startAt = new Date(event.start_at as string);
  const endAt = event.end_at ? new Date(event.end_at) : startAt;
  const isStartToday = startAt.getTime() === today.getTime();
  const isEndToday = endAt.getTime() === today.getTime();

  return `\n\nCorre!!\n${event.title} está ${
    isStartToday ? "começando" : isEndToday ? "acabando" : "acontecendo"
  } hoje!!!\n`;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function postTweetSemesterDay(request: Request) {
  let message = "";
  let semesterTitle = "";
  try {
    const { days: daysToEnd, semester: currentSemester } =
      await semesterRepository.getDaysToEndCurrentSemester();
    const [daysToEndMessage, eventEndMessage] = dateMessage(daysToEnd, "fim");
    message = `${daysToEndMessage} ${eventEndMessage} semestre ${currentSemester.title} da UEFS`;
    semesterTitle = currentSemester.title;
  } catch {
    const { days: daysToStart, semester: nextSemester } =
      await semesterRepository.getDaysToStartNextSemester();
    const [daysToStartMessage, eventStartMessage] = dateMessage(
      daysToStart,
      "início"
    );
    message = `${daysToStartMessage} ${eventStartMessage} semestre ${nextSemester.title} da UEFS`;
    semesterTitle = nextSemester.title;
  }

  const semester = await semesterRepository.getSemesterByTitle(semesterTitle);
  const events = semester.events || [];

  const eventsToday = events.filter((event) => {
    if (!event.start_at || !event.is_important) return false;
    const startAt = new Date(event.start_at);
    const endAt = event.end_at ? new Date(event.end_at) : startAt;
    const today = new Date();
    return startAt <= today && endAt >= today;
  });

  const eventMessages =
    eventsToday.length > 0 ? getMessageToEvent(eventsToday[0]) : "";

  message += `${eventMessages}\n\nVeja mais em: https://semestreuefs.laerciorios.com/`;

  try {
    await tweetRepository.create(message);
  } catch (error) {
    if (error instanceof ApiResponseError) {
      return new Response(
        JSON.stringify({
          error: {
            message: "Failed to post tweet",
          },
        }),
        { status: error.code }
      );
    }
  }

  return new Response(undefined, { status: 204 });
}

export const tweetController = {
  postTweetSemesterDay,
};
