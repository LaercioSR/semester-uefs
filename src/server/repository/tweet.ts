import { twitterClient } from "@server/infra/twitterClient";

async function create(content: string) {
  const { errors } = await twitterClient().v2.tweet(content);

  if (errors) throw new Error("Failed to create tweet");
}

export const tweetRepository = {
  create,
};
