import { z as schema } from "zod";
export const SemesterSchema = schema.object({
  title: schema.string(),
  startDate: schema.string().transform((date) => {
    return new Date(date);
  }),
  endDate: schema.string().transform((date) => {
    return new Date(date);
  }),
});

export type Semester = schema.infer<typeof SemesterSchema>;
