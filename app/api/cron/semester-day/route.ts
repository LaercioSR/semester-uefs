export const maxDuration = 60;
export const dynamic = "force-dynamic";
import { tweetController } from "@server/controller/tweet";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }
  return await tweetController.postTweetSemesterDay(request);
}
