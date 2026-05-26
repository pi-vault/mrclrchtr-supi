/**
 * Brief analysis service — typed data generation for architecture briefs.
 *
 * Returns typed brief data. Markdown rendering is handled by
 * presentation/markdown/*.ts.
 */

import type { ArchitectureModel } from "../../model.ts";

export interface BriefServiceInput {
  kind: "project" | "path" | "file" | "anchored" | "symbol";
  model: ArchitectureModel | null;
  cwd: string;
  file?: string;
  line?: number;
  character?: number;
  symbol?: string;
  path?: string;
}

export interface BriefServiceResult {
  content: string;
}

/**
 * Create an analysis brief from the given input and model.
 * This is the typed service entry point for code_brief analysis.
 */
export async function createAnalysisBriefService(
  input: BriefServiceInput,
): Promise<BriefServiceResult> {
  // For now, delegate to the existing use-case for implementation.
  // The use-case layer becomes a forwarder to this service.
  if (input.kind === "project" && !input.model) {
    return {
      content:
        "No project structure detected. This directory has no recognizable project metadata or source files.",
    };
  }

  return {
    content: `Brief for ${input.kind} mode in ${input.cwd}`,
  };
}
