import { z as schema } from "zod";
import { EventSchema } from "./event";
export const SemesterSchema = schema.object({
  title: schema.string(),
  start_at: schema.string().transform((value) => {
    return new Date(`${value} 00:00:00`);
  }),
  end_at: schema.string().transform((value) => {
    return new Date(`${value} 23:59:59`);
  }),
  events: schema.array(EventSchema).optional(),
});

export type Semester = schema.infer<typeof SemesterSchema>;
