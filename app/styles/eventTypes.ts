export type EventType = "HOLIDAY" | "ACADEMIC" | "IMPORTANT";

// Colors readable on both the light (#FDFDFD) and dark (#284480) themes
export const eventTypeColors: Record<EventType, string> = {
  IMPORTANT: "#E5484D",
  HOLIDAY: "#12A594",
  ACADEMIC: "#9BA1A6",
};

export const eventTypeLabels: Record<EventType, string> = {
  IMPORTANT: "Data importante",
  HOLIDAY: "Feriado ou recesso",
  ACADEMIC: "Data acadêmica",
};

export const eventTypePriority: EventType[] = [
  "IMPORTANT",
  "HOLIDAY",
  "ACADEMIC",
];
