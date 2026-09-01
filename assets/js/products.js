const HTMLHTML_ONE_PAGE = (product, options = {}) => ({
  ...product,
  summary: options.summary || '1 real responsive HTML page · CSS design layer · no build step',
  pages: [{ label: options.pageLabel || 'Main page', file: product.demo, includedAs: 'index.html' }],
  included: options.included || [
    '1 responsive HTML page layout',
    'Semantic HTML5 structure',
    'Responsive CSS styling',
    'Desktop, tablet and mobile behavior',
    'No framework required to render the canonical page'
  ],
  files: options.files || [
    'HTML page source',
    'CSS design layer used by the template'
  ],
  notIncluded: options.notIncluded || [
    'Backend, database or API implementation',
    'CMS or framework conversion',
    'Form delivery / CRM integration',
    'Production copy, data and licensed photography'
  ],
  previewNote: options.previewNote || 'The live preview renders the actual HTML layout represented by this product. Integration services and production content are not implied.'
});

window.HTMLHTML_PRODUCTS = {
  "launchpad": HTMLHTML_ONE_PAGE({"title":"Launchpad","category":"SaaS & Tech","price":19,"complexity":"Standard","description":"Product-led SaaS landing system for feature proof, pricing, comparison and trial conversion.","demo":"demos/launchpad.html","fit":"SaaS, startup, software, AI products and app landing pages."},{
    summary:'1 SaaS landing page · product UI mockup · feature/proof sections · CTA flow · no build step',
    included:['Responsive SaaS landing page','Product hero and workflow UI presentation','Feature / proof content blocks','Primary conversion CTA patterns','Semantic HTML5 + responsive CSS'],
    notIncluded:['User authentication or application backend','Subscription billing or payment processing','Database / API connections','Working SaaS product functionality','Production brand assets and copy']
  }),
  "storefront": HTMLHTML_ONE_PAGE({"title":"Storefront","category":"E-commerce & Retail","price":29,"complexity":"Advanced","description":"Conversion-first retail storefront concept with collection discovery, product focus and purchase-intent UI patterns.","demo":"demos/storefront.html","fit":"Boutiques, DTC brands, product catalogs and retail launches."},{
    summary:'1 premium storefront homepage · collection/product presentation · commerce-intent UI · no build step',
    included:['Responsive retail homepage','Collection and product discovery presentation','Commerce CTA and reassurance patterns','Responsive product-focused layout','Semantic HTML5 + responsive CSS'],
    notIncluded:['Shopping cart engine or checkout backend','Payment gateway integration','Inventory / product database','Customer accounts or order management','Preview photography as packaged licensed assets']
  }),
  "table": HTMLHTML_ONE_PAGE({"title":"Table","category":"Restaurant & Food","price":14,"complexity":"Essential","description":"Editorial hospitality layout for menu discovery, story, opening hours and reservation intent.","demo":"demos/table.html","fit":"Restaurants, cafés, chef concepts, bars and reservation-led hospitality."},{
    summary:'1 restaurant homepage · menu/story presentation · reservation-intent CTA · no build step',
    included:['Responsive restaurant homepage','Menu / signature item presentation','Brand story and hospitality content blocks','Reservation-intent CTA patterns','Semantic HTML5 + responsive CSS'],
    notIncluded:['Reservation booking backend','Online ordering or payment processing','Live menu CMS','Delivery integration','Production food photography and copy']
  }),
  "habitat": {
    "title":"Habitat",
    "category":"Real Estate",
    "price":24,
    "complexity":"Advanced",
    "description":"A five-page editorial real-estate HTML system for property discovery, individual listings, neighborhood storytelling and qualified viewing inquiries.",
    "demo":"demos/habitat.html",
    "fit":"Agents, boutique brokerages, property developers and premium residential firms.",
    "summary":"5 real HTML pages · responsive CSS system · Vanilla JS filters, favorites and demo form states · no build step",
    "pages":[
      {"label":"Home","file":"demos/habitat.html","includedAs":"index.html"},
      {"label":"Listings","file":"demos/habitat-listings.html","includedAs":"listings.html"},
      {"label":"Property detail","file":"demos/habitat-property.html","includedAs":"property.html"},
      {"label":"Neighborhoods","file":"demos/habitat-neighborhoods.html","includedAs":"neighborhoods.html"},
      {"label":"Contact / advisors","file":"demos/habitat-contact.html","includedAs":"contact.html"}
    ],
    "included":["5 responsive HTML page layouts","Shared premium real-estate CSS design system","Vanilla JavaScript listing filters","Saved-property / favorite UI state","Inquiry form interaction and integration-ready states","Responsive desktop, tablet and mobile behavior","Semantic navigation, headings, forms and accessible controls"],
    "files":["index.html","listings.html","property.html","neighborhoods.html","contact.html","assets/css/habitat-premium.css","assets/js/habitat-premium.js"],
    "notIncluded":["Property database or live MLS/listing feed","CMS, WordPress or Shopify theme integration","CRM, email delivery or appointment backend","Real customer/property data","Preview photography as packaged licensed production assets"],
    "previewNote":"Every page shown in the Habitat live preview corresponds to an included HTML layout. Preview photography is remote demo content and must be replaced with properly licensed production media."
  },
  "clinic": HTMLHTML_ONE_PAGE({"title":"Clinic","category":"Medical & Wellness","price":19,"complexity":"Standard","description":"Patient-friendly service discovery, clinician proof and appointment-focused conversion.","demo":"demos/clinic.html","fit":"Clinics, dentists, wellness practices and appointment-led services."},{
    summary:'1 medical practice homepage · clinician/service presentation · appointment-intent UI · no build step',
    included:['Responsive medical practice homepage','Clinician / care presentation','Service discovery cards','Appointment-intent CTA patterns','Semantic HTML5 + responsive CSS'],
    notIncluded:['Appointment scheduling backend','Patient portal or health-record system','Medical data storage','Telehealth functionality','Production clinical content / photography']
  }),
  "academy": HTMLHTML_ONE_PAGE({"title":"Academy","category":"Education & Courses","price":19,"complexity":"Standard","description":"Course discovery and enrollment layout for educators, academies, cohorts and digital learning brands.","demo":"demos/academy.html","fit":"Course creators, academies, bootcamps and cohort-based programs."},{
    summary:'1 education landing page · course/progress presentation · enrollment-intent UI · no build step',
    included:['Responsive education homepage','Course and lesson presentation','Progress / curriculum visual patterns','Enrollment CTA patterns','Semantic HTML5 + responsive CSS'],
    notIncluded:['Learning management system (LMS)','Student login / progress database','Video hosting or streaming','Course payment processing','Production course content']
  }),
  "counsel": HTMLHTML_ONE_PAGE({"title":"Counsel","category":"Corporate & Legal","price":19,"complexity":"Standard","description":"Restrained professional-services system built around expertise, credibility and qualified inquiry.","demo":"demos/counsel.html","fit":"Law firms, consultancies, accountants and professional service providers."},{
    summary:'1 professional-services homepage · expertise/proof presentation · inquiry CTA · no build step',
    included:['Responsive professional-services homepage','Practice / expertise blocks','Trust and credential presentation','Qualified inquiry CTA patterns','Semantic HTML5 + responsive CSS'],
    notIncluded:['Case-management software','Client portal or document exchange','Contact-form delivery backend','Legal content or jurisdiction-specific compliance review','Production team photography']
  }),
  "ledger": HTMLHTML_ONE_PAGE({"title":"Ledger","category":"Finance & Advisory","price":24,"complexity":"Advanced","description":"Trust-led advisory system with services, proof, process, insights and consultation conversion.","demo":"demos/ledger.html","fit":"Financial advisers, valuation firms, accountants and B2B finance services."},{
    summary:'1 finance/advisory homepage · data presentation · trust/conversion UI · no build step',
    included:['Responsive finance/advisory homepage','Financial metric / chart-style presentation','Service and trust sections','Consultation CTA flow','Semantic HTML5 + responsive CSS'],
    notIncluded:['Financial calculation engine','Live market or banking data feeds','Client portal / authentication','Regulated financial advice content','CRM or consultation-booking backend']
  }),
  "studio": HTMLHTML_ONE_PAGE({"title":"Studio","category":"Portfolio & Personal","price":9,"complexity":"Essential","description":"Minimal portfolio for freelancers and creators who need fast proof, selected work and contact conversion.","demo":"demos/studio.html","fit":"Freelancers, designers, photographers, developers and personal brands."},{
    summary:'1 portfolio homepage · selected-work presentation · contact CTA · no build step',
    included:['Responsive portfolio homepage','Selected-work / project presentation','Personal positioning section','Contact CTA pattern','Semantic HTML5 + responsive CSS'],
    notIncluded:['Portfolio CMS','Contact-form delivery backend','Project database','Image optimization service','Production portfolio imagery and copy']
  }),
  "summit": HTMLHTML_ONE_PAGE({"title":"Summit","category":"Events & Webinar","price":14,"complexity":"Essential+","description":"Event launch system for agenda, speakers, sponsors, venue and registration intent.","demo":"demos/summit.html","fit":"Conferences, webinars, workshops, launches and professional events."},{
    summary:'1 event landing page · agenda/speaker presentation · registration-intent CTA · no build step',
    included:['Responsive event homepage','Agenda and speaker presentation','Event proof / sponsor patterns','Registration-intent CTA flow','Semantic HTML5 + responsive CSS'],
    notIncluded:['Ticketing or payment backend','Attendee registration database','Livestream / webinar platform','Calendar / email automation','Production speaker photography and event content']
  }),
  "cockpit": HTMLHTML_ONE_PAGE({"title":"Cockpit","category":"Dashboard & Admin","price":29,"complexity":"Advanced","description":"Dense admin UI starter for SaaS operations, analytics, tables, forms and account management.","demo":"demos/cockpit.html","fit":"SaaS admin panels, CRM back offices, analytics and internal operations."},{
    summary:'1 responsive admin/dashboard screen · analytics/table UI patterns · no build step',
    included:['Responsive admin dashboard screen','Metric and analytics presentation','Table / operational UI patterns','Navigation and dense information hierarchy','Semantic HTML5 + responsive CSS'],
    notIncluded:['Authentication / role permissions','Database or API integration','Real analytics calculations','CRUD backend or account management logic','Production application data']
  })
};
