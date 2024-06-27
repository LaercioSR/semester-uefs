import { z as schema } from "zod";
export const CalendarFileSchema = schema.object({
  title: schema.string(),
  link: schema.string().url(),
});

export type CalendarFile = schema.infer<typeof CalendarFileSchema>;
