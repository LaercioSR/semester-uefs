import { calendarFileRepository } from "@server/repository/calendarFile";
import { semesterRepository } from "@server/repository/semester";
import { CalendarFile } from "@server/schema/calendarFile";
import { difference } from "@server/utils/setOperations";

interface ProcessResult {
  title: string;
  status: "updated" | "skipped" | "error";
  semester?: string;
  events?: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function postUpdateCalendar(_req: Request) {
  const calendarsSaved = await calendarFileRepository.list();
  const calendarsSite = await calendarFileRepository.listFilesInSite();

  const calendarsFilter = calendarsSite.filter(
    ({ title }) => !title.includes("Extraordinário")
  );

  const calendarsUnsaved = difference<CalendarFile>(
    calendarsFilter,
    calendarsSaved,
    "title"
  );

  const results: ProcessResult[] = [];

  for (const calendarFile of calendarsUnsaved) {
    try {
      const calendarData = await calendarFileRepository.getCalendarDataByURL(
        calendarFile.link
      );

      const start_at = calendarData.infos.find((info) =>
        info.title.includes("Início do semestre")
      )?.start_at;
      const end_at = calendarData.infos.find((info) =>
        info.title.includes("Encerramento das aulas")
      )?.end_at;

      // Partial amendment resolutions (e.g. "Calendário 2025.2 - Alterado")
      // don't carry the full calendar; replacing the semester with them
      // would wipe the events already saved.
      if (!calendarData.semester || !start_at || !end_at) {
        console.warn(
          `[calendar-update] "${calendarFile.title}" ignorado: calendário incompleto (${calendarData.infos.length} eventos)`
        );
        await calendarFileRepository.saveFile(calendarFile);
        results.push({ title: calendarFile.title, status: "skipped" });
        continue;
      }

      await semesterRepository.deleteEventsInSemester(calendarData.semester);
      await semesterRepository.deleteSemester(calendarData.semester);
      await semesterRepository.createSemester({
        title: calendarData.semester,
        start_at,
        end_at,
      });
      await Promise.all(
        calendarData.infos.map((info) =>
          semesterRepository.createEventInSemester(calendarData.semester, {
            start_at: info.start_at ? info.start_at : null,
            end_at: info.start_at ? info.end_at : null,
            title: info.title,
            is_holiday: info.is_holiday,
            is_important: info.is_important,
          })
        )
      );
      await calendarFileRepository.saveFile(calendarFile);

      console.warn(
        `[calendar-update] "${calendarFile.title}" atualizado: semestre ${calendarData.semester} com ${calendarData.infos.length} eventos`
      );
      results.push({
        title: calendarFile.title,
        status: "updated",
        semester: calendarData.semester,
        events: calendarData.infos.length,
      });
    } catch (error) {
      console.error(
        `[calendar-update] Falha ao processar "${calendarFile.title}"`,
        error
      );
      results.push({ title: calendarFile.title, status: "error" });
    }
  }

  return Response.json({ processed: results });
}

export const calendarFileController = {
  postUpdateCalendar,
};
