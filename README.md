# test-skills

Repository that groups multiple AI skill modules plus a complete web project (`professor-portal`).

## Projects

| Folder | Description |
|---|---|
| `cortex` | Perception-related skill definitions. |
| `reasoning` | Reasoning engine skill definitions. |
| `execution` | Execution engine skill definitions. |
| `memory` | Memory/storage skill definitions. |
| `evolution` | Evolution engine skill definitions. |
| `hassou-civilization` | Multi-agent civilization architecture skills. |
| `hassou-empire` | Empire-level autonomous architecture skills. |
| `professor-portal` | Frontend portal project (Vite + React). |

## Quick Start (professor-portal)

```bash
cd professor-portal
npm install
npm run dev
```

## Notes

- This repository is intentionally monorepo-style (multiple projects in one repo).
- Large/generated folders are ignored via `.gitignore` (`node_modules`, `dist`, logs, cache).
