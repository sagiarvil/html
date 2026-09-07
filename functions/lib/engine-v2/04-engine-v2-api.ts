/**
 * Engine V2 API Handler & NDJSON Streaming Controller
 * N8N Principles: Deterministic, Event-Driven, Tool-Enforced Output
 */

import { buildEngineV2Registry } from './03-engine-v2-engines.ts';
import type { ScanInput, StreamEvent, EngineResult } from './02-engine-v2-core.ts';

export function createNDJSONStream(
  orchestratorRunner: (emit: (event: StreamEvent) => void) => Promise<{
    scanId: string;
    overallScore: number;
    overallStatus: string;
    engines: Record<string, EngineResult>;
    dlq: any[];
  }>
): ReadableStream {
  const encoder = new TextEncoder();
  return new ReadableStream({
    async start(controller) {
      const emit = (event: StreamEvent) => {
        try {
          const chunk = JSON.stringify(event) + '\n';
          controller.enqueue(encoder.encode(chunk));
        } catch {
          // Client disconnected
        }
      };

      try {
        const finalSummary = await orchestratorRunner(emit);
        const completionEvent: StreamEvent = {
          type: 'scan_complete',
          timestamp: Date.now(),
          payload: finalSummary,
        };
        controller.enqueue(encoder.encode(JSON.stringify(completionEvent) + '\n'));
      } catch (err: any) {
        const errEvent: StreamEvent = {
          type: 'error',
          timestamp: Date.now(),
          payload: { message: err?.message || 'Stream processing error' },
        };
        controller.enqueue(encoder.encode(JSON.stringify(errEvent) + '\n'));
      } finally {
        controller.close();
      }
    },
  });
}

export async function executeV2Scan(
  input: ScanInput,
  onEvent?: (event: StreamEvent) => void
) {
  const orchestrator = buildEngineV2Registry();
  const runResult = await orchestrator.run(
    input,
    {
      planMode: false,
      maxRetries: 2,
      timeoutMs: 30000,
      enableDLQ: true,
      streaming: Boolean(onEvent),
    },
    onEvent
  );

  const enginesObj: Record<string, EngineResult> = {};
  for (const [id, res] of runResult.results) {
    enginesObj[id] = res;
  }

  const scanId =
    runResult.executionLog[0]?.scanId ||
    ((crypto as any).randomUUID ? (crypto as any).randomUUID() : `scan-${Date.now()}`);

  return {
    scanId,
    overallScore: runResult.overallScore,
    overallStatus: runResult.overallStatus,
    engines: enginesObj,
    dlq: runResult.dlq,
  };
}
