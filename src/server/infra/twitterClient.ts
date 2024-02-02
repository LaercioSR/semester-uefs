import { TwitterApi } from "twitter-api-v2";

const appKey = process.env.API_KEY || "";
const appSecret = process.env.API_KEY_SECRET || "";
const accessToken = process.env.ACCESS_TOKEN_KEY || "";
const accessSecret = process.env.ACCESS_TOKEN_KEY_SECRET || "";

export function twitterClient() {
  return new TwitterApi({
    appKey,
    appSecret,
    accessToken,
    accessSecret,
  });
}
