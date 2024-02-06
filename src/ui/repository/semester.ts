import { z as schema } from "zod";

async function getDaysEndCurrent(): Promise<number> {
  const { signal } = new AbortController();
  return fetch(`/api/semesters/current-days-end`, {
    signal,
    cache: "no-store",
  }).then(async (response) => {
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
  const { signal } = new AbortController();
  return fetch(`/api/semesters/next-days-start`, {
    signal,
    cache: "no-store",
  }).then(async (response) => {
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
