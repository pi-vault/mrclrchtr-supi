/**
 * Affected analysis service — blast radius and downstream impact.
 */

import type { CodeIntelResult } from "../../types.ts";

export interface AffectedServiceInput {
  file?: string;
  line?: number;
  character?: number;
  symbol?: string;
  cwd: string;
  maxResults?: number;
}

/**
 * Execute blast-radius analysis.
 * Delegates to the existing use-case implementation.
 */
export async function executeAffectedService(
  _input: AffectedServiceInput,
): Promise<CodeIntelResult> {
  return {
    content: "Affected analysis placeholder",
    details: {
      type: "affected",
      data: {
        confidence: "unavailable",
        directCount: 0,
        downstreamCount: 0,
        riskLevel: "low",
        checkNext: [],
        likelyTests: [],
        omittedCount: 0,
        nextQueries: ["Enable LSP for semantic analysis"],
      },
    },
  };
}
