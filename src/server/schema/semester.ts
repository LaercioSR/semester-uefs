import { z as schema } from "zod";
import { EventSchema } from "./event";
export const SemesterSchema = schema.object({
  title: schema.string(),
  start_at: schema.date(),
  end_at: schema.date(),
  events: schema.array(EventSchema).optional(),
});

export type Semester = schema.infer<typeof SemesterSchema>;
