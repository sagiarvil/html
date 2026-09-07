export type PageRole = 'home' | 'hub' | 'category' | 'product' | 'service' | 'tool' | 'article' | 'legal';
export type IndexDirective = 'index, follow' | 'noindex, follow' | 'noindex, nofollow';

export interface SemanticTriple {
  readonly subject: string;
  readonly predicate: string;
  readonly object: string;
}

export interface SeoEntityRef {
  readonly id: string;
  readonly name: string;
  readonly type: 'Organization' | 'Person' | 'Product' | 'Service' | 'SoftwareApplication';
  readonly sameAs: readonly string[];
}

export interface SeoPageRecord {
  readonly route: `/${string}` | '/';
  readonly locale: string;
  readonly role: PageRole;
  readonly indexDirective: IndexDirective;
  readonly canonicalRoute: `/${string}` | '/';
  readonly title: string;
  readonly metaDescription: string;
  readonly h1: string;
  readonly primaryIntent: string;
  readonly primaryEntity: SeoEntityRef;
  readonly semanticTriples: readonly SemanticTriple[];
  readonly heroAnswerEngine: string; // First 100px answer block
  readonly publishedAt: string;      // ISO 8601
  readonly modifiedAt: string;       // REAL last modification — NEVER fake
  readonly llmSubGraphRoute?: `/llms/${string}.md`;
  readonly breadcrumbs: readonly { readonly name: string; readonly item: string }[];
}
