# Archive

## Final Verification Results (2026-05-26)

### Cross-package tests
- **768 passed**, 4 skipped across 90 test files (supi-code-intelligence + supi-tree-sitter + supi-lsp)
- All 7 code-review findings fixed: renamed types, forwarders, circular dep fix, substrate imports, CLAUDE.md updates
- New refactor-safety.test.ts adds 6 validation tests

### Cross-package typecheck
- Clean build: `tsc -b --force` across all 4 packages and their test configs
- No type errors introduced

### Biome lint/docs check
- Clean: all lint, formatting, and import organization passes

### Whole-workspace gate
- **1627 passed**, 4 skipped across full test suite
- All 18 packages verified: WASM checks, typecheck, biome, tests, pack verification

### Code review findings resolved
1. **supi-tree-sitter/CLAUDE.md**: Removed references to deleted files, updated source layout
2. **Refactor forwarders**: `refactor/safety.ts` and `refactor/apply-workspace-edit.ts` now forward to `analysis/refactor/`
3. **Circular dependency**: Moved tool type constants to `intent/types.ts` — shared by both analysis and tool layers
4. **Duplicate validateEdit**: Single implementation in `analysis/refactor/safety.ts`, forwarded from old path
5. **Substrate imports**: `workspace-session.ts` imports from `substrate/` layer
6. **Test coverage**: Added `analysis/refactor-safety.test.ts`

### Summary of changes
1. **App/session layer**: Created `src/app/` with workspace-manager, session state, and composition root. Extension delegates session lifecycle to app modules.
2. **Analysis services**: Created `src/analysis/` with explicit request context, architecture model service/cache, planner, targeting, and typed domain services for brief/map/relations/affected/pattern/refactor.
3. **Relations split**: Created `src/analysis/relations/` with types/service/callers/implementations/callees separation. Caller results carry explicit evidence metadata.
4. **Tool reorganization**: Created `src/tool/common/` (register-family, validation) and `src/tool/families/code/execute-relations.ts`. Substrate wiring moved to `src/substrate/semantic/*` and `src/structural/*`. UI surfaces moved to `src/ui/`.
5. **Tree-sitter library cleanup**: Removed handler/formatting string APIs from `@mrclrchtr/supi-tree-sitter`. All formatting lives in code-intelligence's `tool/families/tree-sitter/`. Public API now exports only structured runtime/service types.
6. **Documentation update**: Updated `docs/package-layout.md`, `docs/tool-architecture.md`, and all 4 package README/CLAUDE.md files to reflect the new ownership model and internal layer structure.
