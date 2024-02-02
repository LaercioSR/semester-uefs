import { tweetController } from "@server/controller/tweet";

export async function GET(request: Request) {
  return await tweetController.postTweetSemesterDay(request);
}
