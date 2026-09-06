import type { ScanResult } from './scan-engine';
import { generateRemediationReport, type RemediationReport } from './remediation-engine';
import { generateIntelligenceReport, type IntelligenceReport } from './intelligence-engine';

export const FULL_SITE_FIX_MANDATE_PRICE_USD=149 as const;
export const FULL_SITE_FIX_MANDATE_MAX_PAGES=50 as const;

export interface FullSiteFixMandateReport extends RemediationReport {
  commercial_contract:'FULL_SITE_FIX_MANDATE';
  price_usd:typeof FULL_SITE_FIX_MANDATE_PRICE_USD;
  intelligence:IntelligenceReport;
}

/**
 * Commercial boundary wrapper for the legacy Cursor remediation engine.
 * The canonical public scanner remains 50 pages for every product surface.
 * This function is only called after the API entitlement gate has passed.
 */
export function generateFullSiteFixMandate(scan:ScanResult,baselineScan?:ScanResult):FullSiteFixMandateReport{
  const legacy=generateRemediationReport(scan,'PRO',baselineScan);
  const intelligence=generateIntelligenceReport(scan);
  legacy.coverage.max_deep_analyzed_pages=FULL_SITE_FIX_MANDATE_MAX_PAGES;
  legacy.coverage.analyzed_urls=Math.min(Number(legacy.coverage.analyzed_urls||0),FULL_SITE_FIX_MANDATE_MAX_PAGES);
  legacy.plan_type='PRO';
  legacy.markdown=String(legacy.markdown||'')
    .replace(/\$99/g,'$149')
    .replace(/100-page/gi,'50-page')
    .replace(/100 page/gi,'50 page')
    .replace(/25 analyzed pages/gi,'50 analyzed pages');
  return Object.assign(legacy,{
    commercial_contract:'FULL_SITE_FIX_MANDATE' as const,
    price_usd:FULL_SITE_FIX_MANDATE_PRICE_USD,
    intelligence
  });
}
