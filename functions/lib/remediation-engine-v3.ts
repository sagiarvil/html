import type { ScanResult } from './scan-engine';
import { generateFullSiteFixMandate as generateV2, FULL_SITE_FIX_MANDATE_PRICE_USD, FULL_SITE_FIX_MANDATE_MAX_PAGES, type FullSiteFixMandateReport as V2Report } from './remediation-engine-v2';
import { generateOpportunityReport, generateOpportunityActions, type OpportunityReport, type OpportunityAction } from './opportunity-engine';

export { FULL_SITE_FIX_MANDATE_PRICE_USD, FULL_SITE_FIX_MANDATE_MAX_PAGES };
export const ENTERPRISE_ROADMAP_VERSION='1.2' as const;

export interface FullSiteFixMandateReport extends V2Report {
  roadmap_version:typeof ENTERPRISE_ROADMAP_VERSION;
  opportunity:OpportunityReport;
  opportunity_actions:OpportunityAction[];
}

function appendOpportunityMarkdown(md:string,actions:OpportunityAction[]):string{
  let out=`${md}\n\n---\n\n## ENTERPRISE OPPORTUNITY EXECUTION MAP\n\n`;
  for(const a of actions){
    out+=`### ${a.implementationOrder}. ${a.key}\n`;
    out+=`- **State:** ${a.implementationState}\n`;
    out+=`- **Owner:** ${a.owner.join(' + ')}\n`;
    out+=`- **Dependencies:** ${a.dependencies.length?a.dependencies.join(', '):'none'}\n`;
    out+=`- **Blast radius:** ${a.blastRadius}\n`;
    out+=`- **Change class:** ${a.changeClass}\n`;
    out+=`- **Implementation:** ${a.plan.join(' ')}\n`;
    out+=`- **Acceptance:** ${a.acceptanceTests.join(' ')}\n`;
    out+=`- **Regression:** ${a.regressionTests.join(' ')}\n`;
    out+=`- **Rollback:** ${a.rollback.join(' ')}\n`;
    out+=`- **Stop conditions:** ${a.stopConditions.join(' ')}\n\n`;
  }
  return out;
}

export function generateFullSiteFixMandate(scan:ScanResult,baselineScan?:ScanResult):FullSiteFixMandateReport{
  const base=generateV2(scan,baselineScan);
  const opportunity=generateOpportunityReport(scan);
  const opportunity_actions=generateOpportunityActions(scan);
  base.markdown=appendOpportunityMarkdown(String(base.markdown||''),opportunity_actions);
  return Object.assign(base,{roadmap_version:ENTERPRISE_ROADMAP_VERSION,opportunity,opportunity_actions});
}
