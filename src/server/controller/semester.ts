import { semesterRepository } from "../repository/semester";

async function getDaysToEndCurrentSemester(_req: Request) {
  const daysToEnd = await semesterRepository.getDaysToEndCurrentSemester();
  return new Response(JSON.stringify({ daysToEnd }), {
    status: 200,
  });
}

async function getDaysToStartNextSemester(_req: Request) {
  const daysToStart = await semesterRepository.getDaysToStartNextSemester();
  return new Response(JSON.stringify({ daysToStart }), {
    status: 200,
  });
}

export const semesterController = {
  getDaysToEndCurrentSemester,
  getDaysToStartNextSemester,
};
