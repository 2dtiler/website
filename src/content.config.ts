import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const releases = defineCollection({
  loader: glob({
    base: "./src/content/releases",
    pattern: "**/*.md",
  }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    version: z.string(),
    publishedAt: z.coerce.date(),
    status: z.string(),
    readTime: z.string(),
    sourceUrl: z.string().url(),
    isPrerelease: z.boolean(),
  }),
});

export const collections = {
  releases,
};
