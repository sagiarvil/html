/**
 * Engine V2 Core Architecture
 * Deterministic Orchestrator, DLQ, Lifecycle & Stream Types
 */

export interface PageData {
  url: string;
  title: string;
  metaDescription?: string;
  h1: string[];
  h2: string[];
  html: string;
  schema: string[];
  lastmod?: string;
  canonical?: string;
  bytes?: number;
  headers?: Record<string, string> | Headers;
  links?: string[];
  [key: string]: any;
}

export interface ScanInput {
  domain: string;
  html: string;
  headers: Record<string, string>;
  robotsTxt: string;
  sitemapXml: string;
  llmsTxt: string;
  pages: PageData[];
  links: string[];
}

export interface ExecutionConfig {
  planMode?: boolean;
  maxRetries?: number;
  timeoutMs?: number;
  enableDLQ?: boolean;
  streaming?: boolean;
}

export interface ExecutionContext {
  scanId: string;
  config: ExecutionConfig;
  sharedState: Map<string, any>;
  pendingApproval?: string;
}

export type EngineSeverity = 'critical' | 'high' | 'medium' | 'low' | 'info';
export type FindingStatus = 'confirmed' | 'probable' | 'suspected';

export interface Finding {
  id: string;
  category: string;
  severity: EngineSeverity;
  status: FindingStatus;
  standard: string;
  sourceClass?: 'OFFICIAL_STANDARD' | 'OFFICIAL_VENDOR' | 'PROPOSAL' | 'MEASURED' | 'INTERNAL_HEURISTIC' | 'EXPERIMENTAL';
  sourceIds?: string[];
  measurementState?: 'MEASURED' | 'NOT_MEASURED' | 'REQUIRES_CONTEXT';
  titleTR: string;
  titleEN: string;
  descriptionTR: string;
  descriptionEN: string;
  evidence: string;
  url?: string;
  penaltyWeight: number;
}

export type EngineStatus = 'PASS' | 'WARN' | 'FAIL' | 'NOT_MEASURED';

export interface EvidenceLog {
  rawData: any;
  ruleChain: string[];
  computationSteps: string[];
  measurementStates?: Record<string, 'MEASURED' | 'NOT_MEASURED' | 'REQUIRES_CONTEXT'>;
}

export interface EngineResult {
  engineId: string;
  engineName: string;
  version: string;
  score: number;
  status: EngineStatus;
  confidence: number;
  impact: 'HIGH' | 'MEDIUM' | 'LOW';
  effort: 'EASY' | 'MEDIUM' | 'HARD';
  findings: Finding[];
  evidence: EvidenceLog;
  checksum: string;
  executionMs: number;
}

export interface DeadLetterEntry {
  scanId: string;
  engineId: string;
  error: {
    code: string;
    message: string;
    stack?: string;
  };
  inputSnapshot: any;
  retryCount: number;
  timestamp: number;
}

export interface StreamEvent {
  type: 'engine.start' | 'engine.progress' | 'engine.complete' | 'aggregate.complete' | 'error';
  scanId?: string;
  engineId?: string;
  percent?: number;
  score?: number;
  status?: EngineStatus;
  overallScore?: number;
  timestamp: number;
}

export abstract class EngineTool {
  abstract id: string;
  abstract name: string;
  abstract version: string;
  abstract weight: number;
  abstract impact: 'HIGH' | 'MEDIUM' | 'LOW';
  abstract effort: 'EASY' | 'MEDIUM' | 'HARD';
  abstract requiresApproval: boolean;
  abstract execute(input: ScanInput, context: ExecutionContext): Promise<EngineResult>;
  onError?(error: Error, context: ExecutionContext, input: ScanInput): { status: EngineStatus; score: number; findings: Finding[]; reason: string };
}

export class EngineOrchestrator {
  private engines: Map<string, EngineTool> = new Map();
  private retryPolicy = {
    maxRetries: 2,
    backoffMs: [100, 300],
  };

  register(engine: EngineTool): this {
    this.engines.set(engine.id, engine);
    return this;
  }

  getEngine(id: string): EngineTool | undefined {
    return this.engines.get(id);
  }

  getAllEngines(): EngineTool[] {
    return Array.from(this.engines.values());
  }

  async run(
    input: ScanInput,
    config: ExecutionConfig = {},
    onEvent?: (event: StreamEvent) => void
  ): Promise<{
    results: Map<string, EngineResult>;
    overallScore: number;
    overallStatus: EngineStatus;
    dlq: DeadLetterEntry[];
    executionLog: any[];
  }> {
    const scanId = (crypto as any).randomUUID ? (crypto as any).randomUUID() : `scan-${Date.now()}`;
    const context: ExecutionContext = {
      scanId,
      config: {
        planMode: false,
        maxRetries: 2,
        timeoutMs: 30000,
        enableDLQ: true,
        streaming: false,
        ...config,
      },
      sharedState: new Map(),
    };

    const results = new Map<string, EngineResult>();
    const dlq: DeadLetterEntry[] = [];
    const executionLog: any[] = [];
    const totalEngines = this.engines.size;
    let completed = 0;

    for (const [id, engine] of this.engines) {
      if (onEvent) {
        onEvent({
          type: 'engine.start',
          scanId,
          engineId: id,
          percent: Math.round((completed / totalEngines) * 100),
          timestamp: Date.now(),
        });
      }

      const execOutcome = await this.executeWithRetry(engine, input, context);
      if (execOutcome.success) {
        results.set(id, execOutcome.result);
        executionLog.push({ scanId, engineId: id, status: 'SUCCESS', executionMs: execOutcome.result.executionMs });
        if (onEvent) {
          onEvent({
            type: 'engine.complete',
            scanId,
            engineId: id,
            score: execOutcome.result.score,
            status: execOutcome.result.status,
            percent: Math.round(((completed + 1) / totalEngines) * 100),
            timestamp: Date.now(),
          });
        }
      } else {
        dlq.push(execOutcome.dlqEntry);
        const fallback = this.fallbackToResult(execOutcome.dlqEntry);
        results.set(id, fallback);
        executionLog.push({ scanId, engineId: id, status: 'DLQ_FALLBACK', error: execOutcome.dlqEntry.error.message });
        if (onEvent) {
          onEvent({
            type: 'error',
            scanId,
            engineId: id,
            status: 'NOT_MEASURED',
            percent: Math.round(((completed + 1) / totalEngines) * 100),
            timestamp: Date.now(),
          });
        }
      }
      completed++;
    }

    const { overallScore, overallStatus } = this.calculateOverall(results);

    if (onEvent) {
      onEvent({
        type: 'aggregate.complete',
        scanId,
        overallScore,
        status: overallStatus,
        percent: 100,
        timestamp: Date.now(),
      });
    }

    return { results, overallScore, overallStatus, dlq, executionLog };
  }

  private async executeWithRetry(
    engine: EngineTool,
    input: ScanInput,
    context: ExecutionContext
  ): Promise<{ success: true; result: EngineResult } | { success: false; dlqEntry: DeadLetterEntry }> {
    let lastError: Error | undefined;
    for (let attempt = 0; attempt <= this.retryPolicy.maxRetries; attempt++) {
      try {
        if (engine.requiresApproval && context.config.planMode && !context.pendingApproval) {
          context.pendingApproval = engine.id;
          context.pendingApproval = undefined; // Auto-approve for now
        }
        const result = await engine.execute(input, context);
        return { success: true as const, result };
      } catch (err) {
        lastError = err as Error;
        if (attempt < this.retryPolicy.maxRetries) {
          await new Promise((r) => setTimeout(r, this.retryPolicy.backoffMs[attempt]));
        }
      }
    }
    const dlqEntry: DeadLetterEntry = {
      scanId: context.scanId,
      engineId: engine.id,
      error: { code: 'ERR_ENGINE_FAILED', message: lastError?.message || 'Unknown error', stack: lastError?.stack },
      inputSnapshot: input,
      retryCount: this.retryPolicy.maxRetries,
      timestamp: Date.now(),
    };
    return { success: false as const, dlqEntry };
  }

  private fallbackToResult(dlq: DeadLetterEntry): EngineResult {
    return {
      engineId: dlq.engineId,
      engineName: 'Unknown',
      version: '0.0.0',
      score: 0,
      status: 'NOT_MEASURED',
      confidence: 0,
      impact: 'HIGH',
      effort: 'HARD',
      findings: [
        {
          id: 'DLQ-001',
          category: 'system',
          severity: 'critical',
          status: 'confirmed',
          standard: 'SYSTEM_INTEGRITY',
          titleTR: 'Motor yürütme başarısız',
          titleEN: 'Engine execution failed',
          descriptionTR: "Bu motor DLQ'ya düştü.",
          descriptionEN: 'This engine fell into DLQ.',
          evidence: dlq.error.message,
          penaltyWeight: 0,
        },
      ],
      evidence: { rawData: dlq, ruleChain: [], computationSteps: ['DLQ_FALLBACK'] },
      checksum: 'DLQ-' + dlq.scanId.slice(0, 8),
      executionMs: 0,
    };
  }

  private calculateOverall(results: Map<string, EngineResult>): { overallScore: number; overallStatus: EngineStatus } {
    let totalWeightedScore = 0;
    let totalWeight = 0;
    for (const [id, result] of results) {
      const engine = this.engines.get(id);
      if (!engine) continue;
      totalWeightedScore += result.score * engine.weight;
      totalWeight += engine.weight;
    }
    const overallScore = totalWeight > 0 ? Math.round(totalWeightedScore / totalWeight) : 0;
    const overallStatus: EngineStatus = overallScore >= 80 ? 'PASS' : overallScore >= 55 ? 'WARN' : 'FAIL';
    return { overallScore, overallStatus };
  }
}
