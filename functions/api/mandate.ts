import { runScan } from '../lib/scan-engine';
import { generateRemediationReport, type PlanType } from '../lib/remediation-engine';

/**
 * Autonomous Website Remediation Intelligence Mandate API
 * Enforces constitutional contracts:
 * - ROOT FIX: Minimum structural correction removing defect
 * - RECOVERY: Safe restoration of affected references/routes
 * - PREVENTION: CI/build gate regression controls
 * - ROLLBACK: Preserves prior state and isolation
 */

interface Env {
  MANDATE_ACCESS_TOKEN?: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const expected = env.MANDATE_ACCESS_TOKEN;
    const body: any = await request.json().catch(() => ({}));
    const target = body?.target_url || body?.url || body?.domain;
    if (!target || typeof target !== 'string' || !target.trim()) {
      return Response.json({ error: 'target_url or domain required' }, { status: 400 });
    }

    const planType: PlanType = String(body?.plan_type || '').toUpperCase() === 'PRO' ? 'PRO' : 'FREE';

    // If PRO plan requested, enforce paid entitlement
    if (planType === 'PRO') {
      if (!expected) {
        return Response.json(
          { error: 'Paid mandate service is not activated: entitlement secret is missing.' },
          { status:503 }
        );
      }
      const auth = request.headers.get('authorization') || '';
      if (auth !== `Bearer ${expected}`) {
        return Response.json({ error: 'Valid paid entitlement required' }, { status:402 });
      }
    }

    const scan = await runScan(target.trim());
    const report = generateRemediationReport(scan, planType, body?.baseline_scan);

    return Response.json(
      {
        product: 'Autonomous Website Remediation Intelligence Mandate',
        version: '1.0',
        plan: planType,
        priceUsd: planType === 'PRO' ? 99 : 0,
        domain: scan.domain,
        scanId: scan.scanId,
        report,
        markdown: report.markdown,
        scan
      },
      { headers: { 'cache-control': 'no-store' } }
    );
  } catch (e: any) {
    const message = e?.message || 'Mandate generation failed';
    const status = /not allowed|private|reserved|credentials|port/i.test(message) ? 403 : 400;
    return Response.json({ error: message }, { status });
  }
};

export const onRequestGet: PagesFunction = () => Response.json({ error: 'POST only' }, { status: 405 });
