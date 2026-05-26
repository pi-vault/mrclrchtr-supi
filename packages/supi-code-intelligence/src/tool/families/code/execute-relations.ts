/**
 * code_relations tool edge — validate → build context → call service → render.
 *
 * Follows the standard tool-edge flow for the modularized stack.
 */

import { getCodeProviderState } from "../../../analysis/context/request-context.ts";
import type { RelationsServiceInput } from "../../../analysis/relations/types.ts";
import type { CodeIntelResult } from "../../../types.ts";

/**
 * Execute a code_relations tool call.
 *
 * Validates params, builds request context from the shared broker,
 * calls the relations analysis service, and returns rendered content.
 */
export async function executeCodeRelationsTool(
  params: {
    kind: "callers" | "callees" | "implementations";
    path?: string;
    file?: string;
    line?: number;
    character?: number;
    symbol?: string;
    maxResults?: number;
  },
  ctx: { cwd: string },
): Promise<CodeIntelResult> {
  // Validate: callees and implementations require anchored coordinates or symbol
  if (params.kind !== "callers") {
    if (!params.file && !params.symbol) {
      return {
        content: `**Error:** ${params.kind === "callees" ? "Callee" : "Implementation"} discovery requires anchored coordinates (\`file\`, \`line\`, \`character\`) or a \`symbol\` for discovery.`,
        details: {
          type: "search",
          data: {
            confidence: "unavailable",
            scope: null,
            candidateCount: 0,
            omittedCount: 0,
            nextQueries: [
              "Provide `file`, `line`, `character` or a `symbol` to resolve the target",
            ],
          },
        },
      };
    }
  }

  const providerState = getCodeProviderState(ctx.cwd);
  if (providerState.kind === "unavailable") {
    return {
      content: `**Error:** No code provider initialized for this workspace.`,
      details: {
        type: "search",
        data: {
          confidence: "unavailable",
          scope: null,
          candidateCount: 0,
          omittedCount: 0,
          nextQueries: ["Enable LSP or tree-sitter and retry"],
        },
      },
    };
  }

  const input: RelationsServiceInput = {
    kind: params.kind,
    file: params.file,
    line: params.line,
    character: params.character,
    symbol: params.symbol,
    path: params.path,
    maxResults: params.maxResults,
    cwd: ctx.cwd,
  };

  // TODO: Full integration with relations service once target resolution is migrated
  return {
    content: `Relations ${input.kind} analysis for ${ctx.cwd}`,
    details: {
      type: "search",
      data: {
        confidence: "unavailable",
        scope: params.path ?? null,
        candidateCount: 0,
        omittedCount: 0,
        nextQueries: [],
      },
    },
  };
}
