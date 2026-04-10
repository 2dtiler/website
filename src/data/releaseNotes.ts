export interface ReleaseNoteSection {
  title: string;
  body: string;
  bullets?: string[];
}

export interface ReleaseNote {
  slug: string;
  version: string;
  title: string;
  summary: string;
  publishedAt: string;
  status: string;
  readTime: string;
  intro: string;
  highlights: string[];
  sections: ReleaseNoteSection[];
}

export const releaseNotesPageSize = 3;

const rawReleaseNotes: ReleaseNote[] = [
  {
    slug: "v0-8-0-canvas-throughput",
    version: "v0.8.0",
    title: "Canvas throughput pass and tighter map editing feedback.",
    summary:
      "This release tightens brush responsiveness, clarifies active layer state, and reduces the amount of UI noise around repeated editing actions.",
    publishedAt: "2026-04-08",
    status: "[SHIPPED]",
    readTime: "04 MIN",
    intro:
      "The goal of this pass was simple: make repeated map editing feel immediate. The editor now surfaces the active working state faster and trims down secondary chrome so the canvas stays visually dominant.",
    highlights: [
      "Brush interactions feel more immediate during sustained paint passes.",
      "Layer selection and active-state feedback are easier to read at a glance.",
      "UI cleanup reduces friction around repetitive, low-value clicks.",
    ],
    sections: [
      {
        title: "Brush feedback is now easier to trust.",
        body: "The editing loop now favors immediate visual confirmation over ornamental animation. Cursor response and active tool state stay visible without competing with the content underneath.",
        bullets: [
          "Cleaner active tool visibility while painting.",
          "Less visual drift between cursor state and committed edits.",
        ],
      },
      {
        title: "Layer context stays readable during dense work.",
        body: "Layer controls are still compact, but the important distinction is stronger: what is selected, what is visible, and what is locked can be scanned without pausing the editing flow.",
        bullets: [
          "Stronger selected-state emphasis.",
          "Cleaner hidden and locked metadata treatment.",
        ],
      },
    ],
  },
  {
    slug: "v0-7-2-project-exports",
    version: "v0.7.2",
    title: "Project export cleanup and more predictable file handoff.",
    summary:
      "Exported project bundles are more consistent, easier to hand off, and less likely to surprise teams moving assets between tools.",
    publishedAt: "2026-03-24",
    status: "[SHIPPED]",
    readTime: "03 MIN",
    intro:
      "This release focused on output discipline. Teams building maps in the browser still need predictable handoff into their game pipeline, so the work here was about making exports smaller, clearer, and less fragile.",
    highlights: [
      "Compact export output is easier to move between collaborators.",
      "File naming and packaging are more consistent across projects.",
      "Less ambiguity around what belongs to the map versus the source tileset.",
    ],
    sections: [
      {
        title: "Export output is structured for reuse.",
        body: "The editor now produces project output with less ambiguity around reusable data versus authored map state. That makes inspection, transport, and integration simpler.",
      },
      {
        title: "Smaller files, clearer handoff.",
        body: "The output format keeps the same browser-first workflow but puts more emphasis on predictable packaging for downstream tools and teammates.",
        bullets: [
          "Tighter project bundles.",
          "Fewer manual cleanup steps after export.",
        ],
      },
    ],
  },
  {
    slug: "v0-7-0-object-authoring",
    version: "v0.7.0",
    title: "Object authoring improvements for trigger and gameplay markup.",
    summary:
      "Object layers are now more useful for real project work, with clearer shape intent and a better path for attaching gameplay metadata.",
    publishedAt: "2026-03-06",
    status: "[SHIPPED]",
    readTime: "05 MIN",
    intro:
      "Maps are not only tile arrangements. This update improves how teams describe gameplay space directly inside the editor, which makes the project file more valuable than a static art pass alone.",
    highlights: [
      "Better support for authoring gameplay markers directly in the editor.",
      "Typed properties are easier to attach and review.",
      "Object layers feel closer to production tooling instead of placeholders.",
    ],
    sections: [
      {
        title: "Shapes are more usable as authored game data.",
        body: "Points, rectangles, ellipses, and polygons are treated as meaningful authoring tools, not decorative overlays. The result is a clearer path from map editing to gameplay markup.",
      },
      {
        title: "Properties stay attached to the work that needs them.",
        body: "Typed metadata can live next to the object it describes, which reduces spreadsheet drift and keeps level design context in the project itself.",
        bullets: [
          "Better fit for spawn points and trigger zones.",
          "Less out-of-band bookkeeping.",
        ],
      },
    ],
  },
  {
    slug: "v0-6-4-search-replace",
    version: "v0.6.4",
    title: "Pattern search and replace is now practical on larger maps.",
    summary:
      "Repeated tile cleanup is faster thanks to broader search windows, better wildcard behavior, and a clearer view of replacement intent.",
    publishedAt: "2026-02-14",
    status: "[SHIPPED]",
    readTime: "04 MIN",
    intro:
      "Large maps make repetition expensive. This release improves the pattern-search workflow so broad cleanup passes can happen inside the editor instead of forcing one-off manual fixes.",
    highlights: [
      "Wildcard replacement is easier to reason about.",
      "Larger search windows reduce repetitive cleanup work.",
      "Editors can make structural map changes faster.",
    ],
    sections: [
      {
        title: "Search windows scale up without becoming unreadable.",
        body: "The find-and-replace workflow is better suited to multi-layer cleanup passes. It focuses on pattern intent rather than making the user simulate the same operation tile by tile.",
      },
      {
        title: "Replacement rules are clearer before commit.",
        body: "Wildcard handling and replacement structure are easier to inspect, which lowers the risk of broad edits that need immediate rollback.",
      },
    ],
  },
  {
    slug: "v0-6-0-layer-groups",
    version: "v0.6.0",
    title: "Layer grouping and project organization improvements.",
    summary:
      "Projects with many layers are easier to navigate thanks to grouped structure, cleaner hierarchy handling, and less visual clutter in the stack.",
    publishedAt: "2026-01-20",
    status: "[SHIPPED]",
    readTime: "03 MIN",
    intro:
      "As maps get more complex, the stack becomes as important as the canvas. This release gives projects a cleaner structural frame so dense scenes remain workable over time.",
    highlights: [
      "Grouped layer structure makes larger scenes easier to manage.",
      "Hierarchy is more legible in day-to-day editing.",
      "Project navigation scales better as scope grows.",
    ],
    sections: [
      {
        title: "Hierarchy is part of the workflow, not an afterthought.",
        body: "Grouping and ordering controls now support denser scenes without flattening everything into one long stack. The editor reflects structure instead of hiding it.",
      },
      {
        title: "Map organization holds up under growth.",
        body: "Projects with multiple maps and deeper stacks are easier to revisit later because the working structure is clearer from the start.",
      },
    ],
  },
];

export const releaseNotes = [...rawReleaseNotes].sort(
  (left, right) =>
    new Date(right.publishedAt).getTime() -
    new Date(left.publishedAt).getTime(),
);

export function getReleaseNotesPageCount() {
  return Math.max(1, Math.ceil(releaseNotes.length / releaseNotesPageSize));
}

export function getReleaseNotesPage(pageNumber: number) {
  const totalPages = getReleaseNotesPageCount();
  const safePage = Math.min(Math.max(1, pageNumber), totalPages);
  const start = (safePage - 1) * releaseNotesPageSize;
  return releaseNotes.slice(start, start + releaseNotesPageSize);
}

export function formatReleaseDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}
