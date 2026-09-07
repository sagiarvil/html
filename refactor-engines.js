const fs = require('fs');
const path = require('path');

const walks = ['assets/js', 'scripts', 'tests/integrity'];
const exts = ['.js', '.py', '.mjs'];

function processFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processFiles(fullPath);
    } else if (exts.includes(path.extname(fullPath))) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const original = content;

      // 12 -> 18
      content = content.replace(/12 motor/gi, match => match.startsWith('12 M') ? '18 Motor' : '18 motor');
      content = content.replace(/12 engine/gi, match => match.startsWith('12 E') ? '18 Engine' : '18 engine');
      content = content.replace(/12-engine/gi, '18-engine');
      content = content.replace(/12 skor/gi, '18 skor');
      content = content.replace(/12 scores/gi, '18 scores');

      // 7 lenses -> 6 layers
      content = content.replace(/7 Hazırlık Lensi/g, '6 Katmanlı Mimari');
      content = content.replace(/7 hazırlık lensi/g, '6 katmanlı derin mimari');
      content = content.replace(/7 readiness lenses/gi, '6 conceptual layers');
      content = content.replace(/7 lens/gi, '6 layer');
      
      // 9 readiness lenses breakdown
      content = content.replace(/9 hazırlık lensi: SEO · GEO · AEO · LLMO · AAO · RAG · E-E-A-T · Sitemaps · Schema/g, 
        '6 Mimari Katman: L0 (Altyapı) · L1 (Keşif) · L2 (Zeka) · L3 (Dönüşüm) · L4 (Koruma) · L5 (Sentez)');
      content = content.replace(/9 readiness lenses: SEO · GEO · AEO · LLMO · AAO · RAG · E-E-A-T · Sitemaps · Schema/g, 
        '6 Architectural Layers: L0 (Infrastructure) · L1 (Discovery) · L2 (Intelligence) · L3 (Conversion) · L4 (Defense) · L5 (Synthesis)');
      
      // 13 audits context
      content = content.replace(/13 Intelligence Audit \+ 7 lens/g, '13 AI Intelligence Output + 6 layer');
      content = content.replace(/13 Intelligence Audits \+ 7 lenses/g, '13 AI Intelligence Outputs + 6 layers');

      // authority-tool and intelligence-root string updates
      content = content.replace(/lenses:'7 Boyutlu Hazırlık Lensleri'/g, "lenses:'6 Katmanlı Derin Mimari'");
      content = content.replace(/lenses:'7-Dimensional Readiness Lenses'/g, "lenses:'6-Layer Deep Architecture'");
      content = content.replace(/navEngines:'12 Engines'/g, "navEngines:'18 Engines'");
      
      // 12 Motor Karar Zinciri
      content = content.replace(/12 motor karar zinciri/g, "18 motor karar zinciri");
      
      // tests
      content = content.replace(/canonical 12-engine diagnosis/g, 'canonical 18-engine diagnosis');
      
      // Some other edge cases from the grep
      content = content.replace(/12 bağımsız/g, '18 bağımsız');
      content = content.replace(/12 independent/gi, match => match.startsWith('12 I') ? '18 Independent' : '18 independent');
      content = content.replace(/12 deterministik motor, 13 Intelligence Audit ve 7 hazırlık lensi/g, '18 deterministik motor, 6 katmanlı derin mimari ve bunların 13 çıktı/bulgusu');
      content = content.replace(/all 12 deterministic engines, 13 Intelligence Audits and seven readiness lenses/g, 'all 18 deterministic engines, 6 conceptual layers and their 13 output findings');

      if (content !== original) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

walks.forEach(processFiles);
