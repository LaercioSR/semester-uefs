import { read } from "@core/data";
import { Semester, SemesterSchema } from "../schema/semester";

async function list(): Promise<Semester[]> {
  const semesters = read();
  const parsedSemesters = SemesterSchema.array().parse(semesters);

  return parsedSemesters;
}

async function getCurrentSemester(): Promise<Semester> {
  const dateNow = new Date();
  const semesters = await list();

  const semester = semesters.find((semester) => {
    return semester.startDate <= dateNow && semester.endDate >= dateNow;
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
  const today = new Date();
  const currentSemester = await getCurrentSemester();
  const timeToEnd = currentSemester.endDate.getTime() - today.getTime();
  const daysToEnd = Math.floor(timeToEnd / (1000 * 60 * 60 * 24));
  return {
    days: daysToEnd,
    semester: currentSemester,
    currentDate: today.toISOString(),
  };
}

async function getNextSemester(): Promise<Semester> {
  const dateNow = new Date();
  const semesters = await list();

  const semester = semesters.find((semester) => {
    return semester.startDate > dateNow;
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
  const today = new Date();
  const nextSemester = await getNextSemester();
  const timeToStart = nextSemester.startDate.getTime() - today.getTime();
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
