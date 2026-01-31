# Contributing to Git-Atlas

Thanks for taking the time to contribute! Git-Atlas is a lightweight codebase visualizer that turns a repository tree into an interactive map with optional notes and documentation.

This document explains how to set up the project locally, how we work together, and what makes a good contribution.

---

## Quick start

### 1) Prerequisites
- A modern browser (Chrome, Firefox etc.)
- Optional: Python 3 (only needed for hosting / using experimental scripts)

### 2) Run locally
**Option A: Python**
In the project root execute:
```bash
python3 -m http.server 8080
```

Then open:
```
http://localhost:8080/
```

**Option B**
Any static file server works (VS Code Live Server, etc.).

---

## Project structure

We keep the repository split by responsibility:

```
ui/        → HTML Components (Widgets), CSS, graphics, UI-related JS
core/      → Pure logic that builds the underlying software, has no direct influence on the ui
helpers/   → I/O adapters (GitHub API etc.)
docs/      → Documentation
```

### Rules of thumb
- **UI** may touch the DOM
- **Core** should be DOM-free and reusable
- **Helpers** handle fetching, parsing, and data loading
---

## Development workflow

### Branching
Create branches from `main`:
```
feat/<short-description> 	→ new Features
fix/<short-description> 	→ Bugfixes
```

Examples:
- `feat/editor-panel`
- `fix/svg-export-padding`

### Commit messages
Depending on the purpose of your commit add a fitting prefex to your commit message:
- `ADD <feature_name>`
- `FIX <fixed_problem>`
- `REF <refactored_function>`

---

## Reporting bugs

Please include:
- Repository URL used (for public github repos)
- Steps to reproduce
- Browser and OS
- Screenshots or recordings for UI issues

---

## Security & privacy
While the UI is built as a Website, no local data should ever leave the PC. That means no file uploads to the server. We want this to be a product that anyone can use and that includes companies and people worried about sharing their code. This might make some features impossible to implement in the Web-Version and probably lead to some sort of local client being added soon.

---

## License

By contributing, you agree that your contributions will be licensed under the project’s license.

Thanks for contributing!
