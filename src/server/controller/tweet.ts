import { semesterRepository } from "@server/repository/semester";
import { tweetRepository } from "@server/repository/tweet";
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function postTweetSemesterDay(request: Request) {
  let message = "";
  try {
    const { days: daysToEnd, semester: currentSemester } =
      await semesterRepository.getDaysToEndCurrentSemester();
    const [daysToEndMessage, eventEndMessage] = dateMessage(daysToEnd, "fim");
    message = `${daysToEndMessage} ${eventEndMessage} semestre ${currentSemester.title} da UEFS`;
  } catch {
    const { days: daysToStart, semester: nextSemester } =
      await semesterRepository.getDaysToStartNextSemester();
    const [daysToStartMessage, eventStartMessage] = dateMessage(
      daysToStart,
      "início"
    );
    message = `${daysToStartMessage} ${eventStartMessage} semestre ${nextSemester.title} da UEFS`;
  }

  message += "\n\nVeja mais em: https://semestreuefs.laerciorios.com/";

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
