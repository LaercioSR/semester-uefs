import { z as schema } from "zod";
export const SemesterSchema = schema.object({
  title: schema.string(),
  start_date: schema.string().transform((date) => {
    return new Date(`${date}T00:00:00.000z`);
  }),
  end_date: schema.string().transform((date) => {
    return new Date(`${date}T23:59:59.000z`);
  }),
});

export type Semester = schema.infer<typeof SemesterSchema>;
