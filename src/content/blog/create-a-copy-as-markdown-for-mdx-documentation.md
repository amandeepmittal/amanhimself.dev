---
title: Create a copy as markdown button for LLMs in an MDX documentation site
author: Aman Mittal
pubDatetime: 2025-12-03T00:00:01Z
slug: create-a-copy-as-markdown-for-mdx-documentation
featured: false
draft: false
tags:
  - tech-writing
  - ai
  - llms
description: ''
---

Using MDX for writing and managing content for a documentation site provides flexibility if you are deep into the "docs-as-code" workflow. This flexibility allows you to mix Markdown with React components, use dynamic data and stitch them together at runtime.

However, this flexibility also comes with challenges. MDX files often contain components that render content at runtime and these components are not included in the raw Markdown output:

- Scene/custom components that load _wizard_ steps or reusable content from separate files
- Schema-driven tables that read JSON configurations
- API documentation generated from TypeDoc/JSDoc output
- Embedded code blocks and media content components

Using raw `.mdx` files on their own to add a feature such as a "copy as markdown" button on each page of your documentation site won't include the dynamic content stitched at runtime.

> **Note:** This article is not a comprehensive guide to implementing the "copy as markdown" button. It is a high-level overview of the solution and implementation details for a Next.js based documentation site that I work on.

## Solution overview

One way to solve this problem and implement the "copy as markdown" button is to identify the key tasks. In a typical MDX documentation site, the key tasks are:

- Locate the source MDX file for the current page
- Fetch the raw MDX and run it through a conversion pipeline
- Expand every dynamic component (scene, JSON-driven tables, TypeDoc/JSDoc output) into Markdown
- Copy the result to the clipboard or allow opening it in an AI tool

At a high level, the flow looks like this:

```
┌───────────────┐     fetch raw .mdx     ┌──────────────────────┐
│ Copy Button   │ ─────────────────────▶ │ prepareMarkdown…     │
└─────┬─────────┘                        │ 1. strip imports     │
      │                                  │ 2. expand scenes     │
      │ write Markdown                   │ 3. render schemas    │
      ▼                                  │ 4. render API JSON   │
┌───────────────┐                        │ 5. final assembly    │
│ Clipboard /   │ ◀───────────────────── │ returns Markdown     │
│ AI tools      │                        └──────────────────────┘
└───────────────┘
```

Everything happens on the client-side using static resources shipped with the site. Implementing this flow requires using regular expressions to strip out the React imports and expand the dynamic components into Markdown.

The solution will be custom to each documentation site and the data sources it uses. However, the core idea of solving this problem is to identify the key tasks. From the next section onwards, I will share my implementation of the solution for a Next.js based documentation site.

## Implementation overview

Here is an overview of how I implemented the above solution for a Next.js based documentation site.

### Create a React component

Initially, your page will require a button to trigger the "copy as markdown" action. This button can be in a dropdown that renders other available actions such as "open in X AI tool".

The component needs to know which MDX file corresponds to the current page. In a documentation site powered by Next.js, you can fetch the MDX file from the `router`:

```ts
export function MarkdownActionsDropdown() {
  const router = useRouter();
  const pathname = router?.pathname;
  const asPath = router?.asPath;

  // Build the raw GitHub URL for the current page's MDX file
  const rawMarkdownUrl = useMemo(() => {
    if (!pathname) {
      return null;
    }
    // Convert route pathname to file path (e.g., /sdk/abc → pages/sdk/abc.mdx)
    const filePath = getPageMdxFilePath(pathname);
    // Generate raw GitHub content URL
    return filePath ? githubRawUrl(pathname) : null;
  }, [pathname]);

  const handleCopyMarkdown = useCallback(async () => {
    if (!rawMarkdownUrl) return;

    // Fetch the raw MDX file from GitHub or your CDN
    const response = await fetch(rawMarkdownUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch markdown: ${response.status}`);
    }

    const mdx = await response.text();

    // Convert MDX to Markdown, passing the current path for context
    // This helps resolve versioned URLs (if any) like /versions/v1.0.0/sdk/abc
    const markdown = await prepareMarkdownForCopyAsync(mdx, {
      path: asPath ?? pathname ?? ''
    });

    await navigator.clipboard.writeText(markdown);
  }, [rawMarkdownUrl, asPath, pathname]);

  // Render dropdown items (Copy as Markdown, Open in ChatGPT, Open in Claude, etc.)
}
```

Some documentation sites might have versioned content such as `/versions/v1.0.0/sdk/abc`. In such cases, you can use the `path` parameter to resolve the versioned URL to the raw MDX file. Furthermore, these versioned URLs might also contain the TypeDoc/JSDoc output for API documentation. It is important to know which version to fetch for which page. The `path` parameter allows our converter to extract the version number and load the correct data files.

Another important function from the above code snippet is `prepareMarkdownForCopyAsync()`. It is the heart of the pipeline and orchestrates all the conversions.

### Parsing frontmatter and normalizing Markdown

The `prepareMarkdownForCopyAsync()` function begins by processing the raw MDX files in stages. In each stage, it handles a specific type of content transformation:

````ts
export async function prepareMarkdownForCopyAsync(
  rawContent: string,
  context: { path?: string } = {}
) {
  if (!rawContent) return '';

  // Step 1: Extract YAML front matter (title, description, etc.)
  // This separates metadata from content so you can use it as headings
  let { content, title, description } = extractFrontMatter(rawContent);

  // Step 2: Find all schema imports before you remove them
  // Example: import abcSchema from '~/public/static/schemas/abc.ts'
  // You need to track these because schema components reference them by name
  const schemaImports = extractSchemaImports(content);

  // Step 3: Remove all import statements
  // MDX imports React components, but you're converting to plain Markdown
  content = content.replace(IMPORT_STATEMENT_PATTERN, '');

  // Step 4: Convert custom React components to Markdown equivalents
  // Each function handles a specific component type
  content = convertBoxLinksToMarkdown(content); // <BoxLink title="Guides" href="/guides" /> → [Guides](/guides)
  content = convertContentSpotlight(content); // <ContentSpotlight file="screenshot.png" /> → ![Screenshot](https://example.com/static/images/screenshot.png)
  content = convertTerminalsToCodeBlocks(content); // <Terminal cmd={['$ npm install']} /> → ```bash\n$ npm install\n```

  // Step 5: Expand dynamic components that load external content
  // These are async because they need to fetch additional files
  content = await replaceSceneComponentsAsync(content, schemaImports);
  content = await replaceSchemaComponentsAsync(content, schemaImports, context);
  content = await replaceApiSectionsAsync(content, context);

  // Step 6: Reassemble the complete document with front matter as headings
  return assembleDocument({ title, description, content });
}
````

Processing easier components like the frontmatter of the page, code blocks, links, embedded images, and so on, before processing complex ones takes care of most of the edge cases. This prevents intermediate transformations from interfering with pattern matching in later stages.

Let's look at one of the simpler conversions to understand the pattern:

````ts
function convertTerminalsToCodeBlocks(content: string): string {
  // Match: <Terminal cmd={['$ npm install', '$ npm start']} />
  const terminalPattern = /<Terminal\s+cmd=\{(\[[^\]]+\])\}\s*\/>/g;

  return content.replace(terminalPattern, (match, cmdArray) => {
    // Parse the JavaScript array of commands
    // cmdArray is a string like "['$ npm install', '$ npm start']"
    const commands = JSON.parse(cmdArray.replace(/'/g, '"'));

    // Convert to a bash code block
    return '```bash\n' + commands.join('\n') + '\n```';
  });
}
````

This pattern repeats throughout the converter: find a component pattern with regex, extract its props, and return the Markdown equivalent.

### Expanding scene and reusable components

A _scene_ component lives inside a separate file. Its purpose is to provide consistency when creating documentation pages that follow a specific UI/content pattern. They can be either custom to a page or reused across multiple pages with different input values. MDX files often render entire wizards or multi-step flows through these custom components. Here's an example:

```md
<!-- Page: Integration guide -->
<Prerequisites />
<Configuration />
<Steps />
```

When rendered live, these custom components inject the content of the separate files into the current page. The raw MDX only contains the component tag, not the actual instructions. You need to load all the scene variations and include them in the output.

```ts
export async function generateEnvironmentInstructionsMarkdownAsync() {
  // List all the different instruction variants
  const sectionPaths = [
    'scenes/prerequisites.mdx',
    'scenes/configuration.mdx',
    'scenes/steps.mdx'
    // ... other combinations
  ];

  const sections = [];

  for (const relativePath of sectionPaths) {
    // Fetch the scene's MDX content from your static assets
    const raw = await fetchSceneMdx(relativePath);

    // Transform the scene MDX just like we transform the main page:
    // - Remove imports
    // - Convert <Prerequisites>, <Configuration>, <Steps> components to Markdown
    const markdown = transformSceneMdx(raw);

    // Create a descriptive heading from the file path
    // 'scenes/prerequisites.mdx' → 'Prerequisites'
    const heading = headingFor(relativePath);

    sections.push(`## ${heading}\n\n${markdown}`);
  }

  // Join all sections with blank lines
  return sections.join('\n\n');
}
```

The transformation function (`transformSceneMdx()`) for scene MDX reuses the existing patterns:

```ts
function transformSceneMdx(raw: string): string {
  let content = raw;

  // Remove imports and front matter from the scene file
  content = content.replace(IMPORT_STATEMENT_PATTERN, '');
  content = extractFrontMatter(content).content;

  // Convert scene-specific components
  // <Prerequisites /> becomes "## Prerequisites"
  content = convertPrerequisitesToMarkdown(content);

  // <Step> becomes numbered headings: "### Step 1: Install dependencies"
  content = convertStepComponents(content);

  // <Terminal> and other standard components use the same converters
  content = convertTerminalsToCodeBlocks(content);

  return content;
}
```

Now when `prepareMarkdownForCopyAsync()` encounters `<Steps />`, it replaces it with this pre-rendered Markdown. You can apply this same pattern to other scene/custom components—the key is identifying what external content they load and fetching it during conversion.

## Converting TypeDoc/JSDoc API sections

API documentation is often the most complex content to convert. A documentation site can use TypeDoc/JSDoc to generate JSON from TypeScript/JavaScript source code, then render that JSON. Your MDX might include a component that renders the API classes, methods, types, and properties:

```ts
<APISection packageName="api-name" />
```

This tells the site to load TypeDoc JSON (like `/public/static/data/v1.0.0/api-name.json`) and render all its classes, methods, types, and properties. The core challenge is to convert the JSON into Markdown since TypeDoc generates deeply nested JSON structures with classes, interfaces, methods, and other element types. Each element needs to be formatted appropriately for Markdown while preserving all the documentation details developers expect.

The conversion process involves identifying the key rendering patterns. For each TypeDoc element type, you can extract structured information and format it consistently. Here are the key rendering patterns:

- **Classes**: Render as H3 heading with properties (as bulleted lists) and methods (with signatures and descriptions)
- **Methods**: Show signature with parameters and return type, followed by indented description, parameter docs, return value description, and examples
- **Properties**: Display as inline code with type annotation, followed by description
- **Types**: Convert TypeDoc's nested type structures to readable strings (handling unions, arrays, objects, and more)
- **Comments**: Extract JSDoc tags like `@param`, `@returns`, `@example`, `@platform` and format appropriately

This conversion approach looks like:

```ts
export async function generateApiSectionMarkdownAsync(
  options: {
    packageName?: string | string[];
    apiName?: string;
    forceVersion?: string;
  },
  context: { path?: string }
) {
  // 1. Resolve the correct version from the URL path
  const version = resolveVersion(options.forceVersion, context.path);

  // 2. Normalize package names to an array
  const packages = Array.isArray(options.packageName)
    ? options.packageName
    : options.packageName
      ? [options.packageName]
      : [];

  // 3. Fetch TypeDoc JSON for the specified packages
  const dataFiles = await Promise.all(
    packages.map(pkg => fetchPackageDataAsync(version, pkg))
  );

  // 4. Extract all exported items (classes, interfaces, functions, etc.)
  const entries = dataFiles.flatMap(file => file?.children ?? []);

  // 5. Convert each entry to Markdown based on its type
  const sections = entries.map(entry => renderEntryMarkdown(entry, version));

  const displayName = Array.isArray(options.packageName)
    ? options.packageName.join(', ')
    : options.packageName || 'API';

  return `## API: ${displayName}\n\n${sections.join('\n\n')}`;
}
```

Example output structure:

````md
## API: api-name

### API Name

A class representing an API in your app.

#### Properties

- `uri?: string`
  The URI of the image.

- `width?: number`
  Width of the image in pixels.

#### Methods

- `loadAsync(): Promise<Image>`
  Loads the image asynchronously
  **Returns:** A promise that resolves to the loaded image
  **Example:**
  ```typescript
  const image = await Image.loadAsync(require('./image.png'));
  ```
````

The TypeDoc conversion follows the same pattern as other components: detect the component tag, fetch the necessary data (TypeDoc JSON), transform it systematically (classes → Markdown, methods → Markdown, types → strings), and replace the original tag with the generated content.

TypeDoc's JSON is structured and predictable. Once you understand the schema (classes have children, methods have signatures, types have type fields), you can write straightforward transformation functions that handle each case.

## The Pattern in practice

At this point, you've seen concrete examples of the conversion pipeline in action:

- Scene/Custom components: Load external MDX files and transform their custom components
- API Documentation: Transform TypeDoc JSON into formatted API references

The beauty of this approach is its extensibility. Every new component type you need to handle follows the same pattern:

```ts
async function replaceCustomComponentAsync(content: string, context: any) {
  // 1. Pattern matching - Find the component tags
  const componentPattern = /<CustomComponent\s+prop="([^"]+)"\s*\/>/g;

  // 2. Data fetching - Load any external data the component needs
  const data = await fetchComponentData(componentPattern);

  // 3. Transformation - Convert the data to Markdown
  const markdown = transformDataToMarkdown(data);

  // 4. Replacement - Swap the component tag with Markdown
  return content.replace(componentPattern, markdown);
}
```

This pipeline architecture means you're not locked into handling only the components we've discussed. As your documentation evolves and you add new interactive elements, you can extend the converter by adding new transformation functions.

## Wrap up

Implementing a "copy as markdown" button for MDX documentation involves identifying the key tasks and writing helper functions to transform the dynamic parts of the page into raw Markdown. This approach should allow you to handle new components and data sources as they are added to the documentation site. Treat MDX components as structured data sources rather than opaque black boxes.
