import { getCollection, type CollectionEntry } from "astro:content";

export const releaseNotesPageSize = 10;

export type ReleaseNoteEntry = CollectionEntry<"releases">;

export interface ReleaseNote {
  slug: string;
  version: string;
  title: string;
  summary: string;
  publishedAt: Date;
  status: string;
  readTime: string;
  sourceUrl: string;
  isPrerelease: boolean;
}

const generatedReleaseModules = import.meta.glob("../content/releases/**/*.md");

function sortEntries(left: ReleaseNoteEntry, right: ReleaseNoteEntry) {
  return right.data.publishedAt.getTime() - left.data.publishedAt.getTime();
}

async function getReleaseCollection() {
  if (Object.keys(generatedReleaseModules).length === 0) {
    return [];
  }

  try {
    return await getCollection("releases");
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes(
        'The collection "releases" does not exist or is empty',
      )
    ) {
      return [];
    }

    throw error;
  }
}

export function mapReleaseNote(entry: ReleaseNoteEntry): ReleaseNote {
  return {
    slug: entry.id,
    version: entry.data.version,
    title: entry.data.title,
    summary: entry.data.summary,
    publishedAt: entry.data.publishedAt,
    status: entry.data.status,
    readTime: entry.data.readTime,
    sourceUrl: entry.data.sourceUrl,
    isPrerelease: entry.data.isPrerelease,
  };
}

export async function getAllReleaseNoteEntries() {
  return (await getReleaseCollection()).sort(sortEntries);
}

export async function getAllReleaseNotes() {
  return (await getAllReleaseNoteEntries()).map(mapReleaseNote);
}

export async function getReleaseNotesPageCount() {
  const notes = await getAllReleaseNotes();
  return Math.max(1, Math.ceil(notes.length / releaseNotesPageSize));
}

export async function getReleaseNotesPage(pageNumber: number) {
  const notes = await getAllReleaseNotes();
  const totalPages = Math.max(
    1,
    Math.ceil(notes.length / releaseNotesPageSize),
  );
  const safePage = Math.min(Math.max(1, pageNumber), totalPages);
  const start = (safePage - 1) * releaseNotesPageSize;

  return notes.slice(start, start + releaseNotesPageSize);
}

export function formatReleaseDate(date: Date | string) {
  const normalizedDate = date instanceof Date ? date : new Date(date);

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(normalizedDate);
}
