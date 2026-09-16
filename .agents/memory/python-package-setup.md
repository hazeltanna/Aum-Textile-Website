---
name: Python package setup
description: Workspace-specific guidance for adding Python tools used during asset inspection.
---

When a PDF or image workflow needs Python dependencies, use the workspace package-management callbacks rather than relying on shell `pip`.

**Why:** The base shell Python may not include pip and can reject installs under NixOS's externally managed environment.

**How to apply:** Check the available Python module, install the runtime if needed, then install packages through the managed language-package flow before running scripts.