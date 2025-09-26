# Konexi Next App

Job boards explorer

## Live Demo

[konexi-app.digachandra.com](https://konexi-app.digachandra.com/)

## Getting Started

### Local Development

```bash
npm install
npm run dev
# Open your browser at http://localhost:3000
```

### Running Tests

```bash
npm run test:e2e:ui
```

## Features

| Feature                 | Status | Test |
| ----------------------- | ------ | ---- |
| Authentication          |        |      |
| -- Sign Up / Register   | ✅     | ✅   |
| -- Sign In              | ✅     | ✅   |
| -- Forget Password      | ✅     | ✅   |
| Job                     | ✅     | ✅   |
| -- Public Access        |        |      |
| -- -- See Jobs Board    | ✅     | ✅   |
| -- -- Filter Jobs Board | ✅     | ✅   |
| -- -- See Job Detail    | ✅     | ✅   |
| -- Authenticated Access |        |      |
| -- -- See Jobs Board    | ✅     | ✅   |
| -- -- Filter Jobs Board | ✅     | ✅   |
| -- -- See Job Detail    | ✅     | ✅   |
| -- -- Post New Job      | ✅     | ✅   |
| -- -- See Job Detail    | ✅     | ✅   |
| -- -- Edit Job Detail   | ✅     | ✅   |
| -- -- Delete Job        | ✅     | ✅   |

### Architecture Overview

- **actions**: Server and client actions that handle data mutations and interactions with Supabase.
- **app**: Next.js App Router structure with pages, layouts, and UI components.
- **contexts**: React context providers for sharing state across components.
- **lib**: Utility functions and Supabase client setup.
- **schemas**: Zod schemas for validating and typing application data.

## Future Roadmap

### What would you improve if given more time?

- [ ] Theming (Logo, favicon, color theme)
- [ ] Error flow testing
- [ ] PWA

## Author

Built by [digachandra](https://www.digachandra.com/).
