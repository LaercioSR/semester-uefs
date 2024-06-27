/* eslint-disable @typescript-eslint/no-unused-vars */
import { semesterRepository } from "../repository/semester";

async function getDaysToEndCurrentSemester(_req: Request) {
  const response = await semesterRepository.getDaysToEndCurrentSemester();
  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      "Cache-Control": "no-store, must-revalidate",
    },
  });
}

async function getDaysToStartNextSemester(_req: Request) {
  const response = await semesterRepository.getDaysToStartNextSemester();
  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      "Cache-Control": "no-store, must-revalidate",
    },
  });
}

async function getSemestersWithEvents(_req: Request) {
  const semesters = await semesterRepository.listWithEvents();
  const response = {
    semesters,
  };
  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      "Cache-Control": "no-store, must-revalidate",
    },
  });
}

export const semesterController = {
  getDaysToEndCurrentSemester,
  getDaysToStartNextSemester,
  getSemestersWithEvents,
};
