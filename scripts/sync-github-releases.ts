import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

interface GitHubRelease {
  id: number;
  html_url: string;
  tag_name: string;
  name: string | null;
  body: string | null;
  draft: boolean;
  prerelease: boolean;
  published_at: string | null;
  created_at: string;
}

interface NormalizedRelease {
  fileName: string;
  title: string;
  summary: string;
  version: string;
  publishedAt: string;
  status: string;
  readTime: string;
  sourceUrl: string;
  isPrerelease: boolean;
  markdownBody: string;
}

const OWNER = "2dtiler";
const REPO = "app";
const GENERATED_DIR = fileURLToPath(
  new URL("../src/content/releases", import.meta.url),
);

function getCommandEnv() {
  const env = { ...process.env };

  if (env.CI) {
    env.GH_PROMPT_DISABLED = "1";
  }

  if (!env.GH_TOKEN) {
    delete env.GH_TOKEN;
  }

  if (!env.GITHUB_TOKEN) {
    delete env.GITHUB_TOKEN;
  }

  return env;
}

function runCommand(command: string, args: string[]) {
  return new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
    const child = spawn(command, args, {
      env: getCommandEnv(),
      stdio: ["ignore", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk: Buffer | string) => {
      stdout += chunk.toString();
    });

    child.stderr.on("data", (chunk: Buffer | string) => {
      stderr += chunk.toString();
    });

    child.on("error", (error) => {
      reject(error);
    });

    child.on("close", (code) => {
      if (code === 0) {
        resolve({ stdout, stderr });
        return;
      }

      reject(
        new Error(
          stderr.trim() ||
            `${command} ${args.join(" ")} exited with code ${code}`,
        ),
      );
    });
  });
}

async function ensureGhAvailable() {
  try {
    await runCommand("gh", ["--version"]);
  } catch {
    throw new Error(
      "GitHub CLI `gh` not found. Install it and rerun `bun run dev` or `bun run build`.",
    );
  }
}

async function fetchReleases() {
  let stdout: string;

  try {
    ({ stdout } = await runCommand("gh", [
      "api",
      `repos/${OWNER}/${REPO}/releases?per_page=100`,
      "--paginate",
      "--slurp",
      "--header",
      "Accept: application/vnd.github+json",
    ]));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    if (
      message.includes("GH_TOKEN environment variable") ||
      message.includes("gh auth login")
    ) {
      throw new Error(
        "GitHub CLI is not authenticated. Run `gh auth login` locally or set `GH_TOKEN`/`GITHUB_TOKEN` before `bun run dev` or `bun run build`.",
      );
    }

    throw error;
  }

  const pages = JSON.parse(stdout) as GitHubRelease[][];

  return pages
    .flat()
    .filter((release) => !release.draft)
    .sort(
      (left, right) =>
        new Date(right.published_at ?? right.created_at).getTime() -
        new Date(left.published_at ?? left.created_at).getTime(),
    );
}

function slugify(input: string) {
  return (
    input
      .normalize("NFKD")
      .replace(/[^\w\s.-]/g, "")
      .trim()
      .toLowerCase()
      .replace(/[._\s]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "release"
  );
}

function stripMarkdown(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^>\s?/gm, "")
    .replace(/^[-*+]\s+/gm, "")
    .replace(/^\d+\.\s+/gm, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/[\*_~]/g, "")
    .replace(/\r/g, "")
    .replace(/\n{2,}/g, "\n\n")
    .trim();
}

function collapseWhitespace(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function getSummary(markdown: string, title: string, version: string) {
  const paragraphs = markdown
    .split(/\n\s*\n/g)
    .map((section) => collapseWhitespace(stripMarkdown(section)))
    .filter(Boolean);

  const summary = paragraphs.find(
    (paragraph) => paragraph !== title && paragraph !== version,
  );

  if (summary) {
    return summary.length > 220
      ? `${summary.slice(0, 217).trimEnd()}...`
      : summary;
  }

  return `Release ${version} for 2D Tiler.`;
}

function getReadTime(markdown: string) {
  const words = collapseWhitespace(stripMarkdown(markdown))
    .split(" ")
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));

  return `${String(minutes).padStart(2, "0")} MIN`;
}

function quoteYamlString(value: string) {
  return JSON.stringify(value);
}

function getMarkdownBody(body: string | null) {
  const normalizedBody = body?.trim();

  return normalizedBody && normalizedBody.length > 0
    ? normalizedBody
    : "No release notes were published for this release.";
}

function normalizeRelease(
  release: GitHubRelease,
  usedSlugs: Set<string>,
): NormalizedRelease {
  const version = release.tag_name.trim();
  const title = release.name?.trim() || version;
  const markdownBody = getMarkdownBody(release.body);
  const publishedAt = release.published_at ?? release.created_at;
  const baseSlug = slugify(version);
  const fileName = usedSlugs.has(baseSlug)
    ? `${baseSlug}-${release.id}`
    : baseSlug;

  usedSlugs.add(fileName);

  return {
    fileName,
    title,
    summary: getSummary(markdownBody, title, version),
    version,
    publishedAt,
    status: release.prerelease ? "[PRERELEASE]" : "[SHIPPED]",
    readTime: getReadTime(markdownBody),
    sourceUrl: release.html_url,
    isPrerelease: release.prerelease,
    markdownBody,
  };
}

function getFileContent(release: NormalizedRelease) {
  return `---\n${[
    `title: ${quoteYamlString(release.title)}`,
    `summary: ${quoteYamlString(release.summary)}`,
    `version: ${quoteYamlString(release.version)}`,
    `publishedAt: ${quoteYamlString(release.publishedAt)}`,
    `status: ${quoteYamlString(release.status)}`,
    `readTime: ${quoteYamlString(release.readTime)}`,
    `sourceUrl: ${quoteYamlString(release.sourceUrl)}`,
    `isPrerelease: ${release.isPrerelease}`,
  ].join("\n")}\n---\n\n${release.markdownBody.trim()}\n`;
}

async function writeGeneratedFiles(releases: NormalizedRelease[]) {
  await mkdir(GENERATED_DIR, { recursive: true });

  const expectedFiles = new Set<string>();

  for (const release of releases) {
    const filePath = path.join(GENERATED_DIR, `${release.fileName}.md`);
    const content = getFileContent(release);
    expectedFiles.add(`${release.fileName}.md`);

    let currentContent: string | undefined;

    try {
      currentContent = await readFile(filePath, "utf8");
    } catch {
      currentContent = undefined;
    }

    if (currentContent !== content) {
      await writeFile(filePath, content, "utf8");
    }
  }

  const existingFiles = await readdir(GENERATED_DIR, { withFileTypes: true });

  await Promise.all(
    existingFiles
      .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
      .filter((entry) => !expectedFiles.has(entry.name))
      .map((entry) => rm(path.join(GENERATED_DIR, entry.name))),
  );
}

async function main() {
  await ensureGhAvailable();

  const releases = await fetchReleases();

  if (releases.length === 0) {
    throw new Error(`No published releases found for ${OWNER}/${REPO}.`);
  }

  const usedSlugs = new Set<string>();
  const normalizedReleases = releases.map((release) =>
    normalizeRelease(release, usedSlugs),
  );

  await writeGeneratedFiles(normalizedReleases);

  console.log(
    `Synced ${normalizedReleases.length} release notes from ${OWNER}/${REPO} into src/content/releases.`,
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
