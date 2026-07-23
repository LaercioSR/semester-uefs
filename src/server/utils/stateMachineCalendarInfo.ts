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
  COLLECT,
  END,
}

const months: { [key: string]: string } = {
  JANEIRO: "01",
  FEVEREIRO: "02",
  MARCO: "03",
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
const importantDatesRegex = new RegExp(importantDates.join("|"), "i");

// SEI header/footer lines that show up in the middle of the extracted text
const ignoreRegexes = [
  /^\s*$/,
  /Dias letivos\s*:/i,
  /^Resolução \d+\s+SEI .*pg\. \d+$/i,
  /^Documento assinado eletronicamente/i,
  /^conforme horário oficial/i,
  /^\d{2} de [a-zà-ÿ]+ de \d{4}\.?$/i,
  /^A autenticidade deste documento/i,
  /^https?:\/\//i,
  /^acao=documento_conferir/i,
  /informando o código verificador/i,
  /código CRC/i,
  /^Referência: Processo/i,
];

function normalizeMonthName(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
}

function matchMonthHeader(
  line: string
): { month: string; year?: string } | null {
  const match = line.match(/^\*\s*([A-Za-zÀ-ÿ]+)\s*(?:\/\s*(\d{4}))?\s*$/);
  if (!match) return null;
  const month = normalizeMonthName(match[1]);
  if (!months[month]) return null;
  return { month, year: match[2] };
}

function isEventStart(line: string): boolean {
  if (/^A definir\b/i.test(line)) return true;
  if (/^até\s+\d{1,2}(\/\d{1,2})?\b/i.test(line)) return true;
  const day = line.match(/^(\d{2})(?:\/\d{1,2})?(?=[\s,]|$)/);
  return day !== null && Number(day[1]) <= 31;
}

function buildDate(
  day: string,
  month: string,
  year: string
): { date: string; monthNumber: number } {
  return {
    date: `${year}-${month}-${day.padStart(2, "0")}`,
    monthNumber: Number(month),
  };
}

// Parses "DD" or "DD/MM" using the current month/year as reference
function parseDayToken(
  token: string,
  currentMonth: string,
  currentYear: string
): { date: string; monthNumber: number } {
  const [day, month] = token.split("/");
  const monthNumber = month ?? months[currentMonth];
  return buildDate(day, monthNumber.padStart(2, "0"), currentYear);
}

const dayToken = String.raw`\d{1,2}(?:\/\d{1,2})?`;
// "05 a 10", "09 e 10", "25/02 a 03/03", "06, 07, 08 [de outubro [de] 2025]"
const dateListRegex = new RegExp(
  String.raw`^(?<first>${dayToken})(?:\s*(?:a|e|,|até)\s+(?:${dayToken}\s*(?:,|e)\s+)*(?<last>${dayToken}))?` +
    String.raw`(?:\s+de\s+(?<monthName>[A-Za-zÀ-ÿ]+))?(?:\s+de\s+|\s*)?(?<year>\d{4})?`,
  "i"
);

function cleanTitle(rawTitle: string): {
  title: string;
  is_holiday: boolean;
  is_important: boolean;
} {
  let title = rawTitle
    .replace(/\s+/g, " ")
    .replace(/^[\s\-–—,.]+/, "")
    .trim();

  const is_holiday = /feriado|recesso/i.test(title);
  if (is_holiday) {
    title = title.replace(/^(feriado|recesso)\s*[-–—:]?\s*/i, "").trim();
  }
  const is_important = importantDatesRegex.test(title);

  return { title, is_holiday, is_important };
}

function handleInfo(
  info: string,
  month: string,
  year: string
): CalendarInfo | void {
  let start_at = "";
  let end_at = "";
  let rest = info;

  if (/^A definir\b/i.test(info)) {
    rest = info.replace(/^A definir\b/i, "");
  } else if (/^até\s+/i.test(info)) {
    const match = info.match(new RegExp(String.raw`^até\s+(${dayToken})`, "i"));
    if (!match) return;
    const parsed = parseDayToken(match[1], month, year);
    start_at = parsed.date;
    end_at = parsed.date;
    rest = info.slice(match[0].length);
  } else {
    const match = info.match(dateListRegex);
    if (!match || !match.groups) return;
    const { first, last, monthName, year: explicitYear } = match.groups;

    let referenceMonth = month;
    if (monthName && months[normalizeMonthName(monthName)]) {
      referenceMonth = normalizeMonthName(monthName);
    }
    const referenceYear = explicitYear ?? year;

    const start = parseDayToken(first, referenceMonth, referenceYear);
    start_at = start.date;
    if (last) {
      const end = parseDayToken(last, referenceMonth, referenceYear);
      // Ranges like "15/12 a 20/01" roll the end date over to the next year
      if (end.monthNumber < start.monthNumber) {
        end_at = buildDate(
          last.split("/")[0],
          String(end.monthNumber).padStart(2, "0"),
          String(Number(referenceYear) + 1)
        ).date;
      } else {
        end_at = end.date;
      }
    } else {
      end_at = start_at;
    }
    rest = info.slice(match[0].length);
  }

  const { title, is_holiday, is_important } = cleanTitle(rest);
  if (!title) return;

  return { start_at, end_at, title, is_holiday, is_important };
}

export function machineState(pdfContent: string): MachineStateReturn {
  const calendarInfos: CalendarInfo[] = [];
  const endRegex = /TOTAL\s*:\s*\d+/;
  let currentState = State.INITIAL;
  let currentMonth = "";
  let currentYear = "";
  let currentInfo = "";
  let semester = "";

  function flushInfo() {
    if (!currentInfo) return;
    const event = handleInfo(currentInfo, currentMonth, currentYear);
    if (event) calendarInfos.push(event);
    currentInfo = "";
  }

  const lines = pdfContent.split("\n");
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (ignoreRegexes.some((regex) => regex.test(line))) {
      continue;
    }

    if (currentState === State.INITIAL) {
      const semesterMatch = line.match(/\d{4}\.\d/);
      const monthHeader = matchMonthHeader(line);
      if (monthHeader) {
        currentMonth = monthHeader.month;
        // "*OUTUBRO" without a year: fall back to the semester year (e.g. "2025.2")
        currentYear = monthHeader.year ?? semester.split(".")[0] ?? "";
        currentState = State.COLLECT;
      } else if (semesterMatch) {
        semester = semesterMatch[0];
      }
      continue;
    }

    if (currentState === State.COLLECT) {
      const monthHeader = matchMonthHeader(line);
      if (monthHeader) {
        flushInfo();
        const previousMonthNumber = Number(months[currentMonth]);
        currentMonth = monthHeader.month;
        if (monthHeader.year) {
          currentYear = monthHeader.year;
        } else if (Number(months[currentMonth]) < previousMonthNumber) {
          // Year rollover without an explicit year in the header (DEZEMBRO -> JANEIRO)
          currentYear = String(Number(currentYear) + 1);
        }
      } else if (line.match(endRegex)) {
        flushInfo();
        currentState = State.END;
        break;
      } else if (isEventStart(line)) {
        flushInfo();
        currentInfo = line;
      } else if (currentInfo) {
        currentInfo += " " + line;
      }
    }
  }
  flushInfo();

  return { semester, infos: calendarInfos };
}
