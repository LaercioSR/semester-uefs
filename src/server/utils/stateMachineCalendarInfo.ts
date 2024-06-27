type CalendarInfo = {
  start_at: string;
  end_at: string;
  title: string;
  is_holiday: boolean;
  is_important: boolean;
};

interface MachineStateReturn {
  semester: string;
  infos: CalendarInfo[];
}

enum State {
  INITIAL,
  MONTH,
  INFO,
  END,
}

const months = {
  JANEIRO: "01",
  FEVEREIRO: "02",
  MARÇO: "03",
  ABRIL: "04",
  MAIO: "05",
  JUNHO: "06",
  JULHO: "07",
  AGOSTO: "08",
  SETEMBRO: "09",
  OUTUBRO: "10",
  NOVEMBRO: "11",
  DEZEMBRO: "12",
};

const importantDates = [
  "Matrícula Web",
  "Ajuste Web",
  "Início do semestre",
  "Ajustes de Matrícula",
  "Período de Demanda",
  "Período para trancamento",
  "Encerramento das aulas",
  "Período para realização das provas finais",
];
const importantDatesRegex = new RegExp(importantDates.join("|"));

function transformDate(date: string, month: string, year: string): string {
  if (date.match(/^\d{2}\/\d{2}$/)) {
    const [day, month] = date.split("/");
    return `${year}-${month}-${day}`;
  }
  return `${year}-${months[month as keyof typeof months]}-${date}`;
}

function handleInfo(
  info: string,
  month: string,
  year: string
): CalendarInfo | void {
  let start_at = "";
  let end_at = "";
  let date = "";
  if (!info.match(/^A definir/)) {
    const infos = info.split(" ");
    if (!infos[0].match(/^\d{2}($|\/)/) || infos.length < 3) {
      return;
    }
    date = infos[0];
    start_at = transformDate(infos[0], month, year);
    if (infos[2].match(/^\d{2}(\/[0-1]\d)?$/)) {
      end_at = transformDate(infos[2], month, year);
      date += ` ${infos[1]} ${infos[2]}`;
    } else {
      end_at = start_at;
    }
  } else {
    date = "A definir";
  }

  const is_holiday = /Feriado|Recesso/.test(info);
  const is_important = importantDatesRegex.test(info);
  let title = info.replace(date, "").trim();
  if (is_holiday) {
    title = title.replace(/Feriado - |Recesso - /, "").trim();
  }
  return { start_at, end_at, title, is_holiday, is_important };
}

export function machineState(pdfContent: string): MachineStateReturn {
  const calendarInfos: CalendarInfo[] = [];
  const monthRegex = /\*[A-Z]+\/\d{4}/;
  const ignoreRegex = /Dias letivos:|^\s+$/;
  const endRegex = /TOTAL:/;
  let currentState = State.INITIAL;
  let currentMonth = "";
  let currentYear = "";
  let currentInfo = "";
  let semester = "";

  const lines = pdfContent.split("\n");
  for (const line of lines) {
    if (line.match(ignoreRegex)) {
      continue;
    }
    switch (currentState) {
      case State.INITIAL:
        if (line.match(/\d{4}\.\d/)) {
          semester = line.match(/\d{4}\.\d/)?.toString() || "";
        } else if (line.match(monthRegex)) {
          [currentMonth, currentYear] = line.replace("*", "").trim().split("/");
          currentState = State.MONTH;
        }
        break;
      case State.MONTH:
        currentState = State.INFO;
        currentInfo = line;
        break;
      case State.INFO:
        if (line.match(/^\d|A definir/)) {
          const event = handleInfo(currentInfo, currentMonth, currentYear);
          if (event) calendarInfos.push(event);
          currentInfo = line;
        } else if (line.match(monthRegex)) {
          const event = handleInfo(currentInfo, currentMonth, currentYear);
          if (event) calendarInfos.push(event);
          currentMonth = line.split("/")[0].replace("*", "").trim();
          currentState = State.MONTH;
        } else if (line.match(endRegex)) {
          const event = handleInfo(currentInfo, currentMonth, currentYear);
          if (event) calendarInfos.push(event);
          currentState = State.END;
        } else {
          currentInfo += " " + line;
          currentState = State.INFO;
        }
        break;
    }
  }

  return { semester, infos: calendarInfos };
}
