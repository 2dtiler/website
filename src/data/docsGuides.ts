export interface DocsGuideSection {
  heading: string;
  body: string;
  steps?: string[];
  notes?: string[];
  placeholderLabel?: string;
}

export interface DocsGuide {
  slug: string;
  category: string;
  icon: string;
  title: string;
  summary: string;
  description: string;
  placeholderLabel: string;
  quickFacts: string[];
  sections: DocsGuideSection[];
  relatedSlugs: string[];
}

export const docsGuides: DocsGuide[] = [
  {
    slug: "getting-started",
    category: "Getting Started",
    icon: "flag",
    title: "Create your first project",
    summary:
      "Start a local browser project, set up a map, choose a tileset, and save a native project backup.",
    description:
      "Use this guide to get from a blank workspace to a saved 2D Tiler project with a map, tileset, and repeatable editing flow.",
    placeholderLabel:
      "Placeholder image for the project start screen and first map workspace.",
    quickFacts: [
      "Native project files use the .2dp format.",
      "Manual save uses Ctrl+S on Windows/Linux or Cmd+S on macOS.",
      "Project data is designed for local browser-based editing.",
    ],
    sections: [
      {
        heading: "Start from the editor",
        body: "Open the web editor when you want to create a new project or continue a local browser workflow. A project can contain maps, tilesets, image assets, object data, and export-ready metadata.",
        steps: [
          "Open the editor from the website header or call-to-action button.",
          "Create a new project or import a native .2dp project backup.",
          "Save early with Ctrl+S or Cmd+S once the first map and tileset are in place.",
        ],
        placeholderLabel:
          "Placeholder image for opening the editor and creating a new project.",
      },
      {
        heading: "Set up the first map",
        body: "Create a map with the tile size your game uses, then keep the grid consistent while you add layers and tilesets. Consistent tile size makes painting, autotile rules, object placement, and engine export easier to reason about.",
        steps: [
          "Choose the map dimensions and tile size for the scene you are building.",
          "Add a tile layer for the main ground or structure pass.",
          "Import or select a tileset before you begin painting tiles.",
        ],
      },
      {
        heading: "Use native files for backups",
        body: "2D Tiler supports native files for full projects, individual maps, and individual tilesets. Use these files when you need to move work between browsers, share work with another machine, or keep a versioned backup outside browser storage.",
        notes: [
          ".2dp stores a full project.",
          ".2dm stores a single map.",
          ".2dt stores a single tileset, including native tileset metadata such as autotile setup.",
        ],
      },
    ],
    relatedSlugs: ["map-editor", "import-export", "shortcuts"],
  },
  {
    slug: "map-editor",
    category: "Map Editing",
    icon: "grid_view",
    title: "Paint maps with layers and objects",
    summary:
      "Use paint, erase, fill, select, autotile, layers, object shapes, and fast shortcuts to build editable levels.",
    description:
      "The map editor is the main workspace for building tile maps, arranging layer data, placing object metadata, and preparing engine-ready layouts.",
    placeholderLabel:
      "Placeholder image for the map canvas, toolbar, layers panel, and tileset panel.",
    quickFacts: [
      "Tools: Select, Paint, Autotile, Erase, and Fill.",
      "Brush sizes run from 1x1 through 5x5.",
      "Object layers support rectangle, point, ellipse, polygon, and text objects.",
    ],
    sections: [
      {
        heading: "Choose the right tool",
        body: "The toolbar keeps the core map tools close to the canvas. Use paint for normal tile placement, erase for cleanup, fill for broad regions, select for editing regions, and autotile when a configured terrain rule should choose tile variants for you.",
        notes: [
          "S selects the Select tool.",
          "B selects the Paint tool.",
          "A selects the Autotile tool.",
          "E selects the Erase tool.",
          "G selects the Fill tool.",
          "Number keys 1 through 5 set brush size.",
        ],
        placeholderLabel:
          "Placeholder image for the map toolbar with paint, autotile, erase, fill, and select tools.",
      },
      {
        heading: "Build with layer intent",
        body: "Keep visual art, background images, gameplay objects, and organizational groups separated. Tile layers are best for grid painting, image layers are useful for backgrounds or parallax-like art, object layers hold gameplay markers, and layer groups help keep larger maps readable.",
        steps: [
          "Create a tile layer for each major visual or gameplay tile pass.",
          "Use image layers for larger non-grid artwork such as backgrounds.",
          "Use object layers for spawn points, collision zones, triggers, and text markers.",
          "Group related layers when a map becomes large enough to need structure.",
        ],
      },
      {
        heading: "Move quickly while editing",
        body: "The editor includes shortcuts for iteration-heavy work: undo and redo, tile copy and paste, deletion, tile orientation, map zoom, find and replace, and quick export. These are useful when you are trying variations rather than placing every tile one at a time.",
        notes: [
          "Ctrl+Z or Cmd+Z undoes; Ctrl+Shift+Z, Cmd+Shift+Z, or Ctrl+Y redoes.",
          "Ctrl+C, Ctrl+X, and Ctrl+V copy, cut, and paste tile selections.",
          "H and V flip a hovered tile horizontally or vertically.",
          "+ and - zoom the map canvas.",
          "Ctrl+H or Cmd+H opens find and replace.",
        ],
      },
    ],
    relatedSlugs: ["tilesets-terrain", "shortcuts", "import-export"],
  },
  {
    slug: "tilesets-terrain",
    category: "Tilesets",
    icon: "auto_awesome",
    title: "Import tilesets and paint terrain",
    summary:
      "Prepare grid-aligned tilesets, assign terrain rules, use autotile painting, and fill regions with weighted tile sets.",
    description:
      "Tilesets are reusable source assets for maps. Terrain and autotile setup adds rules that help the editor choose the correct tile variant while you paint.",
    placeholderLabel:
      "Placeholder image for a tileset grid and terrain rule editor.",
    quickFacts: [
      "Native tilesets use the .2dt format.",
      "Autotile setup supports standard, diagonal, and sparse presets.",
      "The current workflow expects clean, grid-aligned tilesets.",
    ],
    sections: [
      {
        heading: "Prepare the source art",
        body: "Use a tileset image whose cells line up to the tile size you plan to use in the map. A dense, zero-margin grid is the easiest path for native editing and for engine exports that reconstruct tile coordinates from the grid.",
        steps: [
          "Choose a tile size before importing the tileset.",
          "Use source art with consistent rows and columns.",
          "Import the image as a tileset or import a native .2dt tileset file.",
        ],
        placeholderLabel:
          "Placeholder image for importing a grid-aligned tileset image.",
      },
      {
        heading: "Configure terrain rules",
        body: "Open the autotile or terrain editor for the active tileset when you want rule-driven painting. Assign the tiles that represent corners, edges, fills, diagonals, or sparse variants, then choose the terrain rule from the Autotile tool menu.",
        notes: [
          "Use the Standard preset for common edge and corner terrain.",
          "Use the Diagonal preset when diagonal transitions matter.",
          "Use the Sparse preset for lighter rule sets or partial terrain coverage.",
        ],
      },
      {
        heading: "Paint and fill terrain",
        body: "Autotile painting updates neighboring cells according to the chosen rule. Terrain fill is useful when you want a larger region to use a weighted set of tile variants rather than a single repeated tile.",
        steps: [
          "Select the active tileset and configured terrain rule.",
          "Press A or use the toolbar to select the Autotile tool.",
          "Choose a brush size from 1x1 through 5x5.",
          "Use Fill Terrain when a region should be filled from a reusable weighted set.",
        ],
      },
    ],
    relatedSlugs: ["map-editor", "import-export", "getting-started"],
  },
  {
    slug: "image-editor",
    category: "Image Editor",
    icon: "image",
    title: "Edit pixel assets and palettes",
    summary:
      "Use the built-in image editor for pixel drawing, shape tools, selections, crop work, blur, and palette import.",
    description:
      "The image editor keeps lightweight pixel and tileset asset work near the map workflow, so you can adjust art without jumping into a separate utility for every small change.",
    placeholderLabel:
      "Placeholder image for the image editor canvas, tool sidebar, and palette controls.",
    quickFacts: [
      "Tools include pencil, eraser, bucket, line, rectangle, contour, selection, crop, move, and blur.",
      "Brush sizes run from 1 through 16 pixels for drawing tools.",
      "Palette imports include GIMP GPL, Adobe ASE, Aseprite, JASC PAL, Paint.NET TXT, and HEX lists.",
    ],
    sections: [
      {
        heading: "Draw and revise assets",
        body: "Use the pencil for direct pixel work, the eraser for transparent cleanup, the paint bucket for flat color regions, and shape tools for lines, rectangles, and contours. Brush-size menus let drawing tools work at small pixel scale or larger cleanup scale.",
        notes: [
          "B selects Pencil in the image editor.",
          "E selects Eraser.",
          "G selects Paint Bucket.",
          "L selects Line, R selects Rectangle, and U selects Contour.",
        ],
        placeholderLabel:
          "Placeholder image for image editor drawing tools and brush size menu.",
      },
      {
        heading: "Select, move, crop, and soften",
        body: "Use selection and move tools when you need to reposition part of an asset. Use crop when you need to focus the working area, and blur when an asset needs a softer edge or quick paint-over treatment.",
        steps: [
          "Select an area of the canvas before moving or copying pixels.",
          "Use crop controls for framing work in progress.",
          "Use the blur size menu for controlled softening.",
        ],
      },
      {
        heading: "Bring palettes into the workflow",
        body: "Palette import helps keep asset colors consistent across tools. Use common palette formats when you are moving between pixel art utilities or sharing a color ramp with collaborators.",
        notes: [
          "GIMP .gpl palettes are supported.",
          "Adobe ASE and Aseprite palette data are supported.",
          "JASC .pal, Paint.NET .txt, and plain .hex lists are supported.",
        ],
      },
    ],
    relatedSlugs: ["ai-assets", "getting-started", "import-export"],
  },
  {
    slug: "import-export",
    category: "Import / Export",
    icon: "output",
    title: "Move projects into game engines",
    summary:
      "Import and export native files, raster images, Phaser bundles, Tiled maps, Godot scenes, Unity bundles, GameMaker rooms, Defold resources, tIDE maps, and Mappy FMP maps.",
    description:
      "The import/export dialog is where you move data between 2D Tiler, raster asset workflows, and engine-specific project formats.",
    placeholderLabel:
      "Placeholder image for the import/export dialog and supported format list.",
    quickFacts: [
      "Projects, maps, and tilesets each have native 2D Tiler formats.",
      "Maps support several engine-oriented import/export paths.",
      "Tiled project containers are planned, while Tiled map and tileset files are supported.",
    ],
    sections: [
      {
        heading: "Use native files for round trips",
        body: "Use native formats when you want the highest-fidelity 2D Tiler backup or transfer. Native project and map files preserve editor data, while native tileset files are the safest way to keep tileset metadata such as autotile configuration.",
        notes: [
          "Export or import full projects as .2dp files.",
          "Export or import individual maps as .2dm files.",
          "Export or import individual tilesets as .2dt files.",
        ],
        placeholderLabel:
          "Placeholder image for native project, map, and tileset export choices.",
      },
      {
        heading: "Export maps for engines and tools",
        body: "Map export supports common 2D engine and editor targets. Choose the format that matches the next tool in your pipeline, then review format-specific settings before saving the file or bundle.",
        notes: [
          "Tiled map export: XML, JSON, JavaScript, Lua, or CSV.",
          "Godot 4 map import/export: .tscn scene files.",
          "Unity map import/export: Tilemap prefab bundles.",
          "GameMaker map import/export: legacy GMX rooms and GameMaker Studio 2 YY rooms.",
          "Defold map import/export: tilemap or collection resources.",
          "Phaser map import/export: Tiled JSON-style bundles with linked tileset images.",
          "tIDE and Mappy FMP map import/export are supported.",
        ],
      },
      {
        heading: "Move tilesets and images",
        body: "Tilesets can move through native, raster, and engine-specific paths. Raster import and export covers common web image formats, while Tiled, Defold, Godot, and Unity options help prepare tileset resources for engine workflows.",
        notes: [
          "Raster image import/export supports PNG, JPG, WebP, BMP, and GIF.",
          "Tiled tileset import/export supports XML, JSON, and Lua-style tileset files.",
          "Defold tile source import/export is supported.",
          "Unity sprite sheet bundles can be imported and exported.",
          "Godot 4 tileset bundles can be exported.",
        ],
      },
    ],
    relatedSlugs: ["getting-started", "tilesets-terrain", "troubleshooting"],
  },
  {
    slug: "ai-assets",
    category: "AI Assets",
    icon: "smart_toy",
    title: "Generate art direction drafts",
    summary:
      "Use provider-backed image generation for tilesets, sprite sheets, backgrounds, icons, UI elements, and VFX concepts.",
    description:
      "The AI asset generator helps produce starting points for game art, reference images, and exploration passes while keeping the generated files close to the editor workflow.",
    placeholderLabel:
      "Placeholder image for the AI asset generator with model, style, and asset type controls.",
    quickFacts: [
      "Supported provider families include OpenAI, Google Gemini, xAI, and Together AI.",
      "Asset types include tilesets, sprite sheets, backgrounds, item icons, UI elements, and VFX.",
      "Some models support reference-image editing, while others are text-to-image only.",
    ],
    sections: [
      {
        heading: "Choose a provider and model",
        body: "Start by selecting the provider model you want to use and adding the matching API key. Provider availability, billing, content rules, and image privacy are controlled by the provider you choose.",
        steps: [
          "Open the AI assets workspace.",
          "Choose a model from OpenAI, Gemini, xAI, or Together AI.",
          "Add the API key for the selected provider before generating.",
        ],
        placeholderLabel:
          "Placeholder image for AI provider and API key controls.",
      },
      {
        heading: "Configure the asset",
        body: "Asset type controls help the prompt builder include details that matter for the selected target. A tileset prompt can include terrain and transition settings, while a sprite sheet prompt can include role, animation state, direction, frame count, and proportions.",
        notes: [
          "Tilesets can target terrain, mask mode, transitions, and perspective.",
          "Sprites can target role, animation state, direction, frame count, and size.",
          "Backgrounds can target environment, mood, layer, and aspect ratio.",
          "Icons, UI assets, and VFX each expose controls suited to that asset type.",
        ],
      },
      {
        heading: "Iterate with style controls",
        body: "Use style, color palette, image count, and aspect ratio controls to keep experiments comparable. When a selected model supports image-to-image input, upload a reference image to guide the next generation pass.",
        steps: [
          "Pick an art style such as pixel art, vector, hand-painted, cel-shaded, or watercolor.",
          "Choose a palette direction and aspect ratio.",
          "Generate one or two options, then revise the prompt with what you learned.",
        ],
      },
    ],
    relatedSlugs: ["image-editor", "getting-started", "troubleshooting"],
  },
  {
    slug: "shortcuts",
    category: "Reference",
    icon: "keyboard",
    title: "Keyboard shortcuts",
    summary:
      "Keep editing fast with tool, brush, save, export, zoom, orientation, clipboard, and find-and-replace shortcuts.",
    description:
      "2D Tiler includes shortcuts for the repetitive actions that happen during map editing and project iteration.",
    placeholderLabel:
      "Placeholder image for a keyboard shortcut reference beside the map editor.",
    quickFacts: [
      "Tool shortcuts are ignored while typing in form fields.",
      "Cmd works in place of Ctrl on macOS for editor commands.",
      "Quick export shortcuts target the active map or active tileset.",
    ],
    sections: [
      {
        heading: "Map tools and brush sizes",
        body: "Use single-key shortcuts for the tools you switch between most often. Brush-size keys apply to map painting, erasing, and autotile workflows.",
        notes: [
          "S: Select tool.",
          "B: Paint tool.",
          "A: Autotile tool.",
          "E: Erase tool.",
          "G: Fill tool.",
          "1 through 5: Brush sizes 1x1 through 5x5.",
        ],
        placeholderLabel: "Placeholder image for map tool shortcuts.",
      },
      {
        heading: "Editing commands",
        body: "Use the standard editing shortcuts when changing tile selections, reversing actions, or removing selected content from the map.",
        notes: [
          "Ctrl+Z or Cmd+Z: Undo.",
          "Ctrl+Shift+Z, Cmd+Shift+Z, or Ctrl+Y: Redo.",
          "Ctrl+C or Cmd+C: Copy tiles.",
          "Ctrl+X or Cmd+X: Cut tiles.",
          "Ctrl+V or Cmd+V: Paste tiles.",
          "Delete or Backspace: Delete the current selection.",
        ],
      },
      {
        heading: "Navigation, orientation, and export",
        body: "Canvas zoom and quick export shortcuts help with review and handoff. Tile orientation shortcuts are useful when reusing symmetrical tile art.",
        notes: [
          "+ or =: Zoom in on the map canvas.",
          "-: Zoom out on the map canvas.",
          "H: Flip the hovered tile horizontally.",
          "V: Flip the hovered tile vertically.",
          "Ctrl+S or Cmd+S: Save the current project.",
          "Ctrl+Shift+E or Cmd+Shift+E: Quick export the active map.",
          "Ctrl+Shift+B or Cmd+Shift+B: Quick export the active tileset.",
          "Ctrl+H or Cmd+H: Open find and replace.",
        ],
      },
    ],
    relatedSlugs: ["map-editor", "getting-started", "import-export"],
  },
  {
    slug: "troubleshooting",
    category: "Reference",
    icon: "help",
    title: "Troubleshooting and workflow notes",
    summary:
      "Handle browser storage, linked resources, tileset grid assumptions, provider keys, and engine export expectations.",
    description:
      "Use these notes when a workflow needs a little more context than the happy path: storage, file bundles, linked images, export limitations, and provider setup.",
    placeholderLabel:
      "Placeholder image for a checklist of common workflow fixes.",
    quickFacts: [
      "Use native project backups before major changes.",
      "Keep linked tileset images with imported or exported bundles.",
      "Review engine exports in the target engine before committing to a pipeline.",
    ],
    sections: [
      {
        heading: "Keep a backup outside the browser",
        body: "2D Tiler is designed to run locally in the browser, which is convenient for fast editing. For long-running projects, export native .2dp backups so your work is also stored outside browser-managed data.",
        steps: [
          "Save normally while editing.",
          "Export a .2dp backup at milestones.",
          "Keep backup files in the same versioned project folder as your game assets.",
        ],
        placeholderLabel:
          "Placeholder image for exporting a native project backup.",
      },
      {
        heading: "Keep linked resources together",
        body: "Several external formats use linked image resources or sidecar files. When importing or exporting a bundle, keep the map, tileset, image, manifest, and metadata files together until the target engine has accepted them.",
        notes: [
          "Phaser bundles use linked tileset images.",
          "Unity bundles can include prefab, Tile assets, manifests, texture images, and .meta files.",
          "Defold and Tiled workflows can reference external tileset image resources.",
        ],
      },
      {
        heading: "Check tileset spacing before import",
        body: "The current core tileset model works best with dense grid-aligned source art. If an external tileset uses margins or spacing, normalize the source image before relying on grid coordinate round trips.",
        notes: [
          "Use a consistent tile size across map and tileset.",
          "Avoid hidden margins between tiles when possible.",
          "Review imported tile placement before making broad map edits.",
        ],
      },
      {
        heading: "Review provider setup for AI generation",
        body: "AI image generation depends on the selected provider. If generation fails, check the API key, provider quota, model availability, prompt requirements, and whether the selected model supports reference-image input.",
      },
    ],
    relatedSlugs: ["import-export", "ai-assets", "getting-started"],
  },
];

export function getDocsGuidePath(slug: string) {
  return `/docs/${slug}`;
}

export function getDocsGuideBySlug(slug: string) {
  return docsGuides.find((guide) => guide.slug === slug);
}
