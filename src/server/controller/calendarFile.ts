/* eslint-disable @typescript-eslint/no-unused-vars */
import { calendarFileRepository } from "@server/repository/calendarFile";
import { semesterRepository } from "@server/repository/semester";
import { CalendarFile } from "@server/schema/calendarFile";
import { difference } from "@server/utils/setOperations";

async function updateCalendar(_req: Request) {
  const calendarsSaved = await calendarFileRepository.list();
  const calendarsSite = await calendarFileRepository.listFilesInSite();

  const calendarsUnsaved = difference<CalendarFile>(
    calendarsSite,
    calendarsSaved,
    "title"
  );

  calendarsUnsaved.forEach(async (calendarFile) => {
    const calendarData = await calendarFileRepository.getCalendarDataByURL(
      calendarFile.link
    );

    await semesterRepository.deleteSemester(calendarData.semester);
    const start_at = calendarData.infos.find((info) =>
      info.title.includes("Início do semestre")
    )?.start_at;
    const end_at = calendarData.infos.find((info) =>
      info.title.includes("Encerramento das aulas")
    )?.end_at;
    await semesterRepository.createSemester({
      title: calendarData.semester,
      start_at: new Date(`${start_at} 00:00:00`),
      end_at: new Date(`${end_at} 23:59:59`),
    });
    calendarData.infos.forEach(async (info) => {
      await semesterRepository.createEventInSemester(calendarData.semester, {
        start_at: info.start_at ? new Date(`${info.start_at} 00:00:00`) : null,
        end_at: info.start_at ? new Date(`${info.end_at} 23:59:59`) : null,
        title: info.title,
        is_holiday: info.is_holiday,
        is_important: info.is_important,
      });
    });
    await calendarFileRepository.saveFile(calendarFile);
  });

  return new Response(undefined, { status: 204 });
}

export const calendarFileController = {
  updateCalendar,
};
