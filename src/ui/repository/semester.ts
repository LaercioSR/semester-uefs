import { z as schema } from "zod";

async function getDaysEndCurrent(): Promise<number> {
  return fetch(`/api/semesters/current-days-end`).then(async (response) => {
    const data = await response.json();
    const dataSchema = schema.object({
      days: schema.number(),
    });
    const responseParsed = dataSchema.safeParse(data);

    if (!responseParsed.success) {
      throw new Error("Error fetching days end current semester");
    }

    return responseParsed.data.days;
  });
}

async function getDaysStartNext(): Promise<number> {
  return fetch(`/api/semesters/next-days-start`).then(async (response) => {
    const data = await response.json();
    const dataSchema = schema.object({
      days: schema.number(),
    });
    const responseParsed = dataSchema.safeParse(data);

    if (!responseParsed.success) {
      throw new Error("Error fetching days start next semester");
    }

    return responseParsed.data.days;
  });
}

export const semesterRepository = {
  getDaysEndCurrent,
  getDaysStartNext,
};
