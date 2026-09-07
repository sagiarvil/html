/**
 * Feature Flags Configuration (Engine V2.1.0)
 * N8N Event-Driven Rollout & A/B Testing Matrix
 */

export const FEATURES = {
  engineV2: true,          // 18-Engine V2 Deterministic Orchestrator Active
  oldEngineFallback: true, // Graceful fallback to baseline scan engine
  zipPriorityRoadmap: true,// 03_PRIORITY_ROADMAP.md + .ics included in ZIP
  zipScoreProjection: true,// 11_SCORE_PROJECTION.md included in ZIP
  zipLLMS30x: true,        // 30x LLMS per-page knowledge directory included in ZIP
};

if (typeof window !== 'undefined') {
  window.__HH_FEATURES__ = FEATURES;
}

