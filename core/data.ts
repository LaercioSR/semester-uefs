import db from "./db.json";

interface Semester {
  title: string;
  startDate: string;
  endDate: string;
}

export function read(): Array<Semester> {
  if (!db.semesters) {
    return [];
  }
  return db.semesters;
}
