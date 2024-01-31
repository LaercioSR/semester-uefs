import { semesterController } from "@server/controller/semester";

export async function GET(request: Request) {
  return await semesterController.getDaysToEndCurrentSemester(request);
}
