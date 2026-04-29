import type { APIRoute } from "astro";
import {
  getAllReleaseNotes,
  getReleaseNotesPageCount,
} from "../data/releaseNotes";
import { docsGuides, getDocsGuidePath } from "../data/docsGuides";

export const prerender = true;

const staticRoutes = [
  "/",
  "/docs",
  ...docsGuides.map((guide) => getDocsGuidePath(guide.slug)),
  "/blog",
];

function getAbsoluteUrl(pathname: string) {
  return new URL(pathname, "https://2dtiler.com").toString();
}

function createUrlEntry(location: string, lastModified?: Date) {
  const lastmod = lastModified
    ? `<lastmod>${lastModified.toISOString()}</lastmod>`
    : "";

  return `<url><loc>${location}</loc>${lastmod}</url>`;
}

export const GET: APIRoute = async () => {
  const notes = await getAllReleaseNotes();
  const totalPages = await getReleaseNotesPageCount();
  const archiveUrls = Array.from(
    { length: Math.max(0, totalPages - 1) },
    (_, index) => createUrlEntry(getAbsoluteUrl(`/blog/page/${index + 2}`)),
  );
  const releaseUrls = notes.map((note) =>
    createUrlEntry(getAbsoluteUrl(`/blog/${note.slug}`), note.publishedAt),
  );
  const urls = [
    ...staticRoutes.map((route) => createUrlEntry(getAbsoluteUrl(route))),
    ...archiveUrls,
    ...releaseUrls,
  ].join("");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
      },
    },
  );
};
