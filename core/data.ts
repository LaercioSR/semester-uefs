import fs from "fs";
const DB_FILE_PATH = "./core/db.json";

interface Semester {
  title: string;
  start_at: string;
  end_at: string;
}

export function read(): Array<Semester> {
  // eslint-disable-next-line no-console
  throw new Error(process.cwd());
  const dbString = fs.readFileSync(DB_FILE_PATH, "utf-8");
  const db = JSON.parse(dbString || "{}");
  if (!db.semesters) {
    return [];
  }
  return db.semesters;
}
