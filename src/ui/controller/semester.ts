import { semesterRepository } from "@ui/repository/semester";

function dateMessage(days: number): string[] {
  if (days === 0) {
    return ["hoje", "acaba o"];
  }
  if (days === 1) {
    return ["amanhã", "acaba o"];
  }
  return [`${days} dias`, "para o fim do"];
}

interface SemesterControllerGetDaysOutput {
  days: string;
  nextEvent: string;
}
async function getDays(): Promise<SemesterControllerGetDaysOutput> {
  try {
    const days = await semesterRepository.getDaysEndCurrent();
    const messages = dateMessage(days);
    return {
      days: messages[0],
      nextEvent: `${messages[1]} semestre da uefs`,
    };
  } catch {
    const days = await semesterRepository.getDaysStartNext();
    const messages = dateMessage(days);
    return {
      days: messages[0],
      nextEvent: `${messages[1]} semestre da uefs`,
    };
  }
}

export const semesterController = {
  getDays,
};
