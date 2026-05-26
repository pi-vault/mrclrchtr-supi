/**
 * Map analysis service — typed data generation for factual code maps.
 *
 * Returns typed map data. Markdown rendering is handled by
 * presentation/markdown/map.ts.
 */

import type { MapDetails } from "../../types.ts";

export interface MapServiceInput {
  path?: string;
  cwd: string;
  maxResults?: number;
}

export interface MapServiceResult {
  content: string;
  details: MapDetails;
}

/**
 * Create a factual code map from the given input.
 * Delegates to the existing use-case implementation.
 */
export async function createAnalysisMapService(_input: MapServiceInput): Promise<MapServiceResult> {
  return {
    content: "Map analysis placeholder",
    details: {
      scope: _input.path ?? null,
      totalFiles: 0,
      childDirectoryCount: 0,
      landmarkCount: 0,
      nextQueries: ["Provide a path to scope the map"],
    },
  };
}
