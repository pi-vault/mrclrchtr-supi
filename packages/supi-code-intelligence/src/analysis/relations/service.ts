/**
 * Relations service — dispatches code_relations by kind.
 *
 * This is a thin dispatcher that routes to the appropriate
 * callers/implementations/callees module based on the kind.
 * It does NOT perform target resolution — callers must
 * resolve the target first and pass the coordinates.
 */

import type { RelationsResult, RelationsServiceDeps, RelationsServiceInput } from "./types.ts";

/**
 * Execute a relations analysis.
 *
 * @param input The relations request with kind, coordinates, and options.
 * @param deps Provider and workspace dependencies.
 * @returns A typed RelationsResult for the renderer.
 */
export async function executeRelationsService(
  input: RelationsServiceInput,
  deps: RelationsServiceDeps,
): Promise<RelationsResult> {
  if (!deps.provider) {
    return {
      kind: "unavailable",
      reason: "No code provider initialized for this workspace.",
    };
  }

  // For now, this returns a placeholder result.
  // Full target resolution and provider dispatch will be integrated
  // when the tool executors are updated.
  return {
    kind: input.kind === "callees" ? "callees" : "callers",
    targetName: "symbol",
    ...(input.kind === "callees"
      ? { callees: [], confidence: "unavailable" as const }
      : {
          references: [],
          externalCount: 0,
          evidence: "semantic-references" as const,
          confidence: "unavailable" as const,
        }),
  } as RelationsResult;
}
