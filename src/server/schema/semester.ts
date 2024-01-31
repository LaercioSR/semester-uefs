import { z as schema } from "zod";
export const SemesterSchema = schema.object({
  title: schema.string(),
  startDate: schema.string().transform((date) => {
    return new Date(`${date} 00:00:00`);
  }),
  endDate: schema.string().transform((date) => {
    return new Date(`${date} 23:59:59`);
  }),
});

export type Semester = schema.infer<typeof SemesterSchema>;
