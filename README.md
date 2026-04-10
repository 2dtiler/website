# 2D Tiler Website

Astro marketing site and release archive for 2D Tiler.

## Release note sync

`bun run dev` and `bun run build` both run a sync step before Astro starts. That step uses GitHub CLI to fetch releases from `2dtiler/app` and writes static markdown files into `src/content/releases/`. Astro content collections then turn those markdown files into paginated archive pages under `/blog` and detail pages under `/blog/[slug]`.

Requirements:

- Bun
- Node.js >= 22.12
- GitHub CLI (`gh`)

Optional local auth:

- `GH_TOKEN` or `GITHUB_TOKEN`
- Or logged-in GitHub CLI session via `gh auth login`
- CI should always provide token

## Commands

| Command                      | Action                                                |
| :--------------------------- | :---------------------------------------------------- |
| `bun run sync-release-notes` | Fetch GitHub releases and regenerate markdown content |
| `bun run dev`                | Sync release notes, then start Astro dev server       |
| `bun run build`              | Sync release notes, then build static site            |
| `bun run preview`            | Preview built site                                    |
| `bun run deploy`             | Build and deploy site with Wrangler                   |

## CI token

Recommended GitHub Actions secret name: `APP_RELEASES_TOKEN`.

Recommended token type: fine-grained personal access token scoped only to repository `2dtiler/app`.

Required repository permission:

- `Contents: Read`

Deploy workflows pass that secret into build as `GH_TOKEN`. If secret is absent, workflows fall back to `github.token`, which is still enough for public release reads.

Local dev note: if `gh` is installed but not authenticated, run `gh auth login` once or export `GH_TOKEN` before starting dev/build.
