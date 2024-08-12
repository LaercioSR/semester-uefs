import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore/lite";
import { Semester, SemesterSchema } from "../schema/semester";
import { Event } from "../schema/event";
import { firebase } from "@server/infra/db/firebase";

async function list(): Promise<Semester[]> {
  const query = await getDocs(collection(firebase(), "semesters"));
  const semesters = await Promise.all(
    query.docs.map(async (doc) => {
      const data = doc.data();

      return {
        title: doc.id,
        start_at: data.start_at,
        end_at: data.end_at,
      };
    })
  );

  const parsedSemesters = SemesterSchema.array().parse(semesters);

  return parsedSemesters;
}

async function listWithEvents(): Promise<Semester[]> {
  const query = await getDocs(collection(firebase(), "semesters"));
  const semesters = await Promise.all(
    query.docs
      .filter((doc) => {
        const data = doc.data();
        const lastDay = new Date(data.last_day);

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        return lastDay >= tomorrow;
      })
      .map(async (doc) => {
        const data = doc.data();

        const queryEvents = await getDocs(
          collection(firebase(), `semesters/${doc.id}/events`)
        );
        const events = queryEvents.docs
          .map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              title: data.title,
              start_at: data.start_at ? data.start_at : null,
              end_at: data.end_at ? data.end_at : null,
              is_holiday: data.is_holiday,
              is_important: data.is_important,
            };
          })
          .sort((a, b) => {
            const startAtA = a.start_at
              ? new Date(a.start_at).getTime()
              : Infinity;
            const startAtB = b.start_at
              ? new Date(b.start_at).getTime()
              : Infinity;
            return startAtA - startAtB;
          });

        return {
          title: doc.id,
          start_at: data.start_at,
          end_at: data.end_at,
          events,
        };
      })
  );

  const parsedSemesters = SemesterSchema.array().parse(semesters);

  return parsedSemesters;
}

async function getCurrentSemester(): Promise<Semester> {
  const dateNow = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Bahia" })
  );
  const semesters = await list();

  const semester = semesters.find((semester) => {
    const startAt = new Date(`${semester.start_at} 00:00:00`);
    const endAt = new Date(`${semester.end_at} 23:59:59`);
    return startAt <= dateNow && endAt >= dateNow;
  });

  if (!semester) {
    throw new Error("Current semester not found");
  }

  return semester;
}

interface GetDaysToEndCurrentResponse {
  days: number;
  semester: Semester;
  currentDate: string;
}
async function getDaysToEndCurrentSemester(): Promise<GetDaysToEndCurrentResponse> {
  const today = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Bahia" })
  );
  const currentSemester = await getCurrentSemester();
  const endAt = new Date(`${currentSemester.end_at} 23:59:59`);
  const timeToEnd = endAt.getTime() - today.getTime();
  const daysToEnd = Math.floor(timeToEnd / (1000 * 60 * 60 * 24));
  return {
    days: daysToEnd,
    semester: currentSemester,
    currentDate: today.toISOString(),
  };
}

async function getNextSemester(): Promise<Semester> {
  const dateNow = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Bahia" })
  );
  const semesters = await list();

  const semester = semesters.find((semester) => {
    const startAt = new Date(`${semester.start_at} 00:00:00`);
    return startAt > dateNow;
  });

  if (!semester) {
    throw new Error("Next semester not found");
  }

  return semester;
}

interface GetDaysToStartNextResponse {
  days: number;
  semester: Semester;
  currentDate: string;
}
async function getDaysToStartNextSemester(): Promise<GetDaysToStartNextResponse> {
  const today = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Bahia" })
  );
  const nextSemester = await getNextSemester();
  const startAt = new Date(`${nextSemester.start_at} 00:00:00`);
  const timeToStart = startAt.getTime() - today.getTime();
  const daysToStart = Math.round(timeToStart / (1000 * 60 * 60 * 24));

  return {
    days: daysToStart,
    semester: nextSemester,
    currentDate: today.toISOString(),
  };
}

async function getSemesterByTitle(title: string): Promise<Semester> {
  const query = await getDoc(doc(firebase(), "semesters", title));
  const data = query.data();
  if (!data) {
    throw new Error("Semester not found");
  }

  const queryEvents = await getDocs(
    collection(firebase(), `semesters/${title}/events`)
  );
  const events = queryEvents.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  const semester = {
    title,
    start_at: data.start_at,
    end_at: data.end_at,
    events: events,
  };

  const parsedSemester = SemesterSchema.parse(semester);

  return parsedSemester;
}

async function createSemester(semester: Semester): Promise<void> {
  await setDoc(doc(firebase(), "semesters", semester.title), {
    start_at: semester.start_at,
    end_at: semester.end_at,
    created_at: new Date(),
    status: "NEXT",
  });
}

async function deleteSemester(title: string): Promise<void> {
  await deleteDoc(doc(firebase(), "semesters", title));
}

async function createEventInSemester(
  title: string,
  event: Event
): Promise<void> {
  await addDoc(collection(firebase(), `semesters/${title}/events`), event);
}

async function deleteEventsInSemester(title: string): Promise<void> {
  try {
    const semester = await getSemesterByTitle(title);
    const events = semester.events || [];

    events.forEach(async (event) => {
      if (event.id)
        await deleteDoc(doc(firebase(), `semesters/${title}/events`, event.id));
    });
  } catch (error) {
    return;
  }
}

async function getAllEvents(): Promise<Event[]> {
  const semesters = await listWithEvents();
  const events = semesters.flatMap((semester) => semester.events ?? []);
  return events;
}

export const semesterRepository = {
  list,
  getCurrentSemester,
  getDaysToEndCurrentSemester,
  getNextSemester,
  getDaysToStartNextSemester,
  getSemesterByTitle,
  deleteEventsInSemester,
  createEventInSemester,
  createSemester,
  deleteSemester,
  listWithEvents,
  getAllEvents,
};
