import { z as schema } from "zod";
export const SemesterSchema = schema.object({
  title: schema.string(),
  start_date: schema.date(),
  end_date: schema.date(),
});

export type Semester = schema.infer<typeof SemesterSchema>;
