import { z as schema } from "zod";
export const EventSchema = schema.object({
  id: schema.string(),
  title: schema.string(),
  start_at: schema
    .string()
    .transform((value) => {
      return new Date(`${value} 00:00:00`);
    })
    .nullable()
    .optional(),
  end_at: schema
    .string()
    .transform((value) => {
      return new Date(`${value} 23:59:59`);
    })
    .nullable()
    .optional(),
  is_holiday: schema.boolean(),
  is_important: schema.boolean(),
});

export type Event = schema.infer<typeof EventSchema>;
