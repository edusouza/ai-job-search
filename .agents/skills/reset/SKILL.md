---
name: reset
description: Reset candidate profile data back to a blank state so the user can start fresh with /setup. Destructive — nothing is deleted until the user explicitly confirms. Use only when the user explicitly asks to reset or wipe profile data.
type: prompt
whenToUse: When the user explicitly asks to reset or clear their candidate profile data
---

Thin pointer — the canonical specification is the source of truth. Do not restate it here.

1. Read and follow `.claude/commands/reset.md` exactly, in order — it is destructive and requires explicit user confirmation before deleting anything. Where the spec references `$ARGUMENTS`, substitute: $ARGUMENTS
