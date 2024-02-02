import { semesterRepository } from "@ui/repository/semester";
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

async function postTweetSemesterDay(request: Request) {
  if (
    request.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return new Response("Unauthorized", { status: 401 });
  }

  let message = "";
  try {
    const daysToEnd = await semesterRepository.getDaysEndCurrent();
    const [daysToEndMessage, eventEndMessage] = dateMessage(daysToEnd, "fim");
    message = `${daysToEndMessage} ${eventEndMessage} semestre da UEFS`;
  } catch {
    const daysToStart = await semesterRepository.getDaysStartNext();
    const [daysToStartMessage, eventStartMessage] = dateMessage(
      daysToStart,
      "início"
    );
    message = `${daysToStartMessage} ${eventStartMessage} semestrexw da UEFS`;
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
