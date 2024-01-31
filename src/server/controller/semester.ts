/* eslint-disable @typescript-eslint/no-unused-vars */
import { semesterRepository } from "../repository/semester";

async function getDaysToEndCurrentSemester(_req: Request) {
  const days = await semesterRepository.getDaysToEndCurrentSemester();
  return new Response(JSON.stringify({ days }), {
    status: 200,
  });
}

async function getDaysToStartNextSemester(_req: Request) {
  const days = await semesterRepository.getDaysToStartNextSemester();
  return new Response(JSON.stringify({ days }), {
    status: 200,
  });
}

export const semesterController = {
  getDaysToEndCurrentSemester,
  getDaysToStartNextSemester,
};
