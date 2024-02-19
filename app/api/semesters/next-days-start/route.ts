export const dynamic = "force-dynamic";
import { semesterController } from "@server/controller/semester";

export async function GET(request: Request) {
  return await semesterController.getDaysToStartNextSemester(request);
}
