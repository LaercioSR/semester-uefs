import { Semester, SemesterSchema } from "../schema/semester";
import { supabase } from "@server/infra/db/supabase";

async function list(): Promise<Semester[]> {
  const { data: semesters, error } = await supabase()
    .from("semesters")
    .select("*", {
      count: "exact",
    });
  if (error) throw new Error("Failed to fetch data");

  const parsedSemesters = SemesterSchema.array().parse(semesters);

  return parsedSemesters;
}

async function getCurrentSemester(): Promise<Semester> {
  const dateNow = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Bahia" })
  );
  const semesters = await list();

  const semester = semesters.find((semester) => {
    return semester.start_date <= dateNow && semester.end_date >= dateNow;
  });

  if (!semester) {
    throw new Error("Current semester not found");
  }

  return semester;
}

interface GetDaysToEndCurrentResponse {
  days: number;
  semester: Semester;
  currentDate: string;
}
async function getDaysToEndCurrentSemester(): Promise<GetDaysToEndCurrentResponse> {
  const today = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Bahia" })
  );
  const currentSemester = await getCurrentSemester();
  const timeToEnd = currentSemester.end_date.getTime() - today.getTime();
  const daysToEnd = Math.floor(timeToEnd / (1000 * 60 * 60 * 24));
  return {
    days: daysToEnd,
    semester: currentSemester,
    currentDate: today.toISOString(),
  };
}

async function getNextSemester(): Promise<Semester> {
  const dateNow = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Bahia" })
  );
  const semesters = await list();

  const semester = semesters.find((semester) => {
    return semester.start_date > dateNow;
  });

  if (!semester) {
    throw new Error("Next semester not found");
  }

  return semester;
}

interface GetDaysToStartNextResponse {
  days: number;
  semester: Semester;
  currentDate: string;
}
async function getDaysToStartNextSemester(): Promise<GetDaysToStartNextResponse> {
  const today = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Bahia" })
  );
  const nextSemester = await getNextSemester();
  const timeToStart = nextSemester.start_date.getTime() - today.getTime();
  const daysToStart = Math.round(timeToStart / (1000 * 60 * 60 * 24));

  return {
    days: daysToStart,
    semester: nextSemester,
    currentDate: today.toISOString(),
  };
}

export const semesterRepository = {
  list,
  getCurrentSemester,
  getDaysToEndCurrentSemester,
  getNextSemester,
  getDaysToStartNextSemester,
};
