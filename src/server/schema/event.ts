import { z as schema } from "zod";
export const EventSchema = schema.object({
  id: schema.string().optional(),
  title: schema.string(),
  start_at: schema.date().nullable().optional(),
  end_at: schema.date().nullable().optional(),
  is_holiday: schema.boolean(),
  is_important: schema.boolean(),
});

export type Event = schema.infer<typeof EventSchema>;
