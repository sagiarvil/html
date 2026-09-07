const fs = require('fs');

const erFile = 'assets/js/enterprise-runtime.js?v=3';
let er = fs.readFileSync(erFile, 'utf8');
er = er.replace(
  "mandateCopy:'Ne yanlış olduğunu saklamıyoruz. $99 katmanında kök neden, P0–P3 uygulama sırası, kabul/regresyon testleri, rollback ve yazılımcınıza teslim edilecek ZIP mühendislik paketi açılır.',",
  "mandateCopy:'Bu sorun arama motorlarının sitenizi atlamasına yol açıyor. Kilidi açanlar kalıcı çözüm + rollback güvencesi alır. 5 kritik kontrol noktası ████████ ile güvence altına alınır.',"
);
er = er.replace(
  "mandateCopy:'We do not hide the diagnosis. The $99 layer unlocks root causes, P0–P3 execution order, acceptance/regression tests, rollback safeguards and the ZIP engineering package for your developer.',",
  "mandateCopy:'This issue causes search engines to skip your site. Unlocking provides a permanent solution + rollback guarantee. 5 critical checkpoints are secured via ████████.',"
);
er = er.replace(
  "decisionCopy:'7 hazırlık lensi ve 13 istihbarat bulgusu %100 ÜCRETSİZ ($0) teşhis edilir. Teşhis edilen açıkların hazır düzeltme kodları ve 22 dosyalık ZIP paketi $99 Yol Haritası katmanındadır.',",
  "decisionCopy:'7 hazırlık lensi ve 13 istihbarat bulgusu %100 ÜCRETSİZ ($0) teşhis edilir. Teknik çözüm ████████ paketinde. Kaybı önlemek için kilidi açın.',"
);
er = er.replace(
  "decisionCopy:'Seven readiness lenses and 13 intelligence findings are diagnosed 100% FREE ($0). Turn-key code templates and the 22-file ZIP package are unlocked in the $99 Roadmap.',",
  "decisionCopy:'Seven readiness lenses and 13 intelligence findings are diagnosed 100% FREE ($0). The technical solution is in the ████████ package. Unlock to prevent visibility loss.',"
);
fs.writeFileSync(erFile, er);

const atFile = 'assets/js/authority-tool.js?v=4';
let at = fs.readFileSync(atFile, 'utf8');
at = at.replace(
  "intelligenceNote:'Bu bölüm %100 ÜCRETSİZDİR ($0). Sitenizin arama ve yapay zeka eksikliklerini ve kanıtlarını şeffafça belgeler. Hazır düzeltme kodları ve 22 dosyalık ZIP paketi $99 Yol Haritası katmanındadır.',",
  "intelligenceNote:'Bu bölüm %100 ÜCRETSİZDİR ($0). Sitenizin arama ve yapay zeka eksikliklerini ve kanıtlarını şeffafça belgeler. Bu sorun arama motorlarının sitenizi atlamasına yol açıyor. Kilidi açanlar kalıcı çözüm + rollback güvencesi alır.',"
);
at = at.replace(
  "intelligenceNote:'This section is 100% FREE ($0). It transparently documents your search and AI visibility gaps with evidence. Turn-key code and the 22-file ZIP package are unlocked in the $99 Roadmap.',",
  "intelligenceNote:'This section is 100% FREE ($0). It transparently documents your search and AI visibility gaps with evidence. This issue causes search engines to skip your site. Unlocking provides a permanent solution + rollback guarantee.',"
);
at = at.replace(
  "t99Desc:'Nasıl düzeltilecek? Bu ekranda listelenen 13 sorunun kök nedeni, hazır kod blokları, P0–P3 sırası ve yazılımcınıza teslim edilecek 22 dosyalık ZIP paketi.',",
  "t99Desc:'Nasıl düzeltilecek? Bu ekranda listelenen 13 sorunun kök nedeni ve 5 kritik kontrol noktası ████████ ile güvence altına alınır. Kaybı önlemek için kilidi açın.',"
);
at = at.replace(
  "t99Desc:'How to fix it? The root causes for the 13 issues listed here, ready-to-use code blocks, P0–P3 order, and the 22-file ZIP package for your developer.',",
  "t99Desc:'How to fix it? The root causes for the 13 issues listed here and 5 critical checkpoints are secured via ████████. Unlock to prevent loss.',"
);
at = at.replace(
  "bridgeDesc:'Ücretsiz raporda eksikleri ve kanıtları gördünüz. Yazılımcınızın hemen devreye alabileceği hazır kod blokları, P0–P3 öncelik sırası ve 22 dosyalık mühendislik ZIP paketi için Yol Haritasını açın.',",
  "bridgeDesc:'Ücretsiz raporda eksikleri ve kanıtları gördünüz. Teknik çözüm ████████ paketinde. Kaybı önlemek için kilidi açın.',"
);
at = at.replace(
  "bridgeDesc:'You have seen the gaps and evidence in the free report. Unlock the Roadmap for ready-to-use code blocks, P0–P3 priority order, and the 22-file engineering ZIP package.',",
  "bridgeDesc:'You have seen the gaps and evidence in the free report. The technical solution is in the ████████ package. Unlock to prevent loss.',"
);
at = at.replace(
  "capstoneCta:'Hazır Kodları İndir →',",
  "capstoneCta:'Kaybı Önle →',"
);
at = at.replace(
  "capstoneCta:'Download Code Blocks →',",
  "capstoneCta:'Prevent Loss →',"
);
fs.writeFileSync(atFile, at);

const irFile = 'assets/js/intelligence-root.js?v=4';
let ir = fs.readFileSync(irFile, 'utf8');
ir = ir.replace(
  "note:'Bu bölüm %100 ÜCRETSİZDİR ($0). Sitenizin arama motorları ve yapay zeka modelleri (ChatGPT, Claude, Perplexity, Gemini) nezdindeki 13 teknik açığını ve 7 hazırlık boyutunu canlı kanıtlarla şeffafça belgeler. Sorunların nasıl düzeltileceği, hazır kod blokları ve 22 dosyalık ZIP paketi $99 Yol Haritası katmanında sunulur.',",
  "note:'Bu bölüm %100 ÜCRETSİZDİR ($0). Sitenizin arama motorları ve yapay zeka modelleri (ChatGPT, Claude, Perplexity, Gemini) nezdindeki 13 teknik açığını ve 7 hazırlık boyutunu canlı kanıtlarla şeffafça belgeler. Bu sorun arama motorlarının sitenizi atlamasına yol açıyor. Kilidi açanlar kalıcı çözüm + rollback güvencesi alır.',"
);
ir = ir.replace(
  "note:'This section is 100% FREE ($0). It transparently documents your site’s 13 technical gaps and 7 readiness lenses across search engines and AI models (ChatGPT, Claude, Perplexity, Gemini) using live evidence. How to fix these issues, ready-to-use code blocks, and the 22-file ZIP package are provided in the $99 Roadmap tier.',",
  "note:'This section is 100% FREE ($0). It transparently documents your site’s 13 technical gaps and 7 readiness lenses across search engines and AI models with live evidence. This issue causes AI agents to skip your site. Unlocking provides a permanent solution + rollback guarantee.',"
);
ir = ir.replace(
  "t99Desc:'Nasıl düzeltilecek? Bu ekranda listelenen 13 sorunun kök nedeni, hazır kod blokları, P0–P3 sırası ve yazılımcınıza teslim edilecek 22 dosyalık ZIP paketi.',",
  "t99Desc:'Nasıl düzeltilecek? Bu ekranda listelenen 13 sorunun kök nedeni ve 5 kritik kontrol noktası ████████ ile güvence altına alınır. Kaybı önlemek için kilidi açın.',"
);
ir = ir.replace(
  "t99Desc:'How to fix it? The root causes for the 13 issues listed here, ready-to-use code blocks, P0–P3 order, and the 22-file ZIP package for your developer.',",
  "t99Desc:'How to fix it? The root causes for the 13 issues listed here and 5 critical checkpoints are secured via ████████. Unlock to prevent loss.',"
);
ir = ir.replace(
  "bridgeDesc:'Ücretsiz raporda eksikleri ve kanıtları gördünüz. Yazılımcınızın hemen devreye alabileceği hazır kod blokları, P0–P3 öncelik sırası ve 22 dosyalık mühendislik ZIP paketi için Yol Haritasını açın.',",
  "bridgeDesc:'Ücretsiz raporda eksikleri ve kanıtları gördünüz. Teknik çözüm ████████ paketinde. Kaybı önlemek için kilidi açın.',"
);
ir = ir.replace(
  "bridgeDesc:'You have seen the gaps and evidence in the free report. Unlock the Roadmap for ready-to-use code blocks, P0–P3 priority order, and the 22-file engineering ZIP package.',",
  "bridgeDesc:'You have seen the gaps and evidence in the free report. The technical solution is in the ████████ package. Unlock to prevent loss.',"
);
ir = ir.replace(
  "capstoneCta:'Hazır Kodları İndir →',",
  "capstoneCta:'Kaybı Önle →',"
);
ir = ir.replace(
  "capstoneCta:'Download Code Blocks →',",
  "capstoneCta:'Prevent Loss →',"
);
fs.writeFileSync(irFile, ir);

const ciFile = 'assets/js/commercial-intent.js';
let ci = fs.readFileSync(ciFile, 'utf8');
ci = ci.replace(
  "if(p)p.textContent=lang()==='tr'?'Bulgu listesini; kök neden, uygulama sırası, kabul testi, regresyon testi ve rollback içeren $99 otomatik yazılım paketine dönüştürür.':'Convert findings into a $99 automated code bundle with root cause, implementation order, acceptance tests, regression tests, and rollback.';",
  "if(p)p.textContent=lang()==='tr'?'Bulgu listesi için teknik çözüm ████████ paketinde. Kaybı önlemek için kilidi açın.':'The technical solution is in the ████████ package. Unlock to prevent loss.';"
);
fs.writeFileSync(ciFile, ci);

