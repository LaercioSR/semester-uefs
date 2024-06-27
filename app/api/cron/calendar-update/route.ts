import { calendarFileController } from "@server/controller/calendarFile";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }
  return await calendarFileController.updateCalendar(request);
}
