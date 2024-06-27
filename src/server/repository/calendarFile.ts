import { collection, doc, getDocs, setDoc } from "firebase/firestore/lite";
import { firebase } from "@server/infra/db/firebase";
import { CalendarFile, CalendarFileSchema } from "@server/schema/calendarFile";
import axios from "axios";
import * as cheerio from "cheerio";
import { machineState } from "@server/utils/stateMachineCalendarInfo";
import PdfParse from "pdf-parse";

async function list(): Promise<CalendarFile[]> {
  const query = await getDocs(collection(firebase(), "calendar_files"));
  const calendarFiles = query.docs.map((doc) => {
    const data = doc.data();

    return {
      title: doc.id,
      link: data.link,
    };
  });

  const parsedCalendarFiles = CalendarFileSchema.array().parse(calendarFiles);

  return parsedCalendarFiles;
}

async function listFilesInSite(): Promise<CalendarFile[]> {
  const URL =
    "http://www.prograd.uefs.br/modules/conteudo/conteudo.php?conteudo=6";
  const response = await axios.get(URL);
  const content = response.data;

  const $ = cheerio.load(content);
  const h2Elements = $("div#page h2");
  const calendarFiles: { link?: string; title: string }[] = [];

  h2Elements.each((index, element) => {
    const h2 = $(element);
    const a = h2.find("a");
    const link = a.attr("href");
    const title = a.text();
    if (!title.toLowerCase().includes("medicina"))
      calendarFiles.push({ link, title });
  });

  const parsedCalendarFiles = CalendarFileSchema.array().parse(calendarFiles);

  return parsedCalendarFiles;
}

async function saveFile(calendarFile: CalendarFile): Promise<void> {
  try {
    await setDoc(doc(firebase(), "calendar_files", calendarFile.title), {
      link: calendarFile.link,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function getCalendarDataByURL(url: string) {
  const response = await axios.get(url, { responseType: "arraybuffer" });
  const contentBuffer = Buffer.from(response.data, "binary");
  const data = await PdfParse(contentBuffer);
  const text = data.text;
  const infos = machineState(text);

  return infos;
}

export const calendarFileRepository = {
  list,
  listFilesInSite,
  saveFile,
  getCalendarDataByURL,
};
