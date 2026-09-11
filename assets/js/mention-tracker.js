(()=>{
  const root=document.querySelector('[data-mention-tracker]');
  if(!root)return;
  const lang=(document.documentElement.lang||'en').toLowerCase().startsWith('tr')?'tr':'en';
  const $=id=>document.getElementById(id);
  const form=$('mentionForm'),status=$('mentionStatus'),result=$('mentionResult'),providers=$('mentionProviders'),summary=$('mentionSummary'),rows=$('mentionRows'),btn=form?.querySelector('button[type="submit"]');
  const copy={
    tr:{
      checking:'AI yüzeyleri kontrol ediliyor…',
      failed:'Kontrol tamamlanamadı.',
      ready:'Hazır sağlayıcılar',
      access:'Ücretli erişim etkin değil.',
      neutral:'Sorgular marka veya domain adını içermemeli.',
      mention:'ATIF/MENTION',
      no:'YOK',
      na:'ÖLÇÜLMEDİ',
      rate:'Mention oranı',
      citation:'Alan adı kaynak gösterim oranı',
      simulatedCitation:'Simüle Edilmiş Alıntı (Sentetik)',
      observedCitation:'Gözlemlenen Alıntı (Telemetri)',
      providerScoped:'Sağlayıcıya Özgü Telemetri',
      run:'Çalıştırma',
      prompt:'Sorgu',
      brand:'Marka',
      domain:'Alan adı',
      citationCount:'Kaynak gösterim',
      configured:'hazır',
      off:'bağlı değil',
      fallbackNotice:'(Opsiyonel telemetri bağlı değilse sentetik model fallback olarak çalışır)'
    },
    en:{
      checking:'Checking AI surfaces…',
      failed:'Check could not be completed.',
      ready:'Configured providers',
      access:'Paid access is not enabled.',
      neutral:'Queries must not include the tracked brand or domain.',
      mention:'MENTION',
      no:'NO',
      na:'NOT MEASURED',
      rate:'Mention rate',
      citation:'Domain citation rate',
      simulatedCitation:'Simulated Citation (Synthetic)',
      observedCitation:'Observed Citation (Telemetry)',
      providerScoped:'Provider-Scoped Telemetry',
      run:'Run',
      prompt:'Prompt',
      brand:'Brand',
      domain:'Domain',
      citationCount:'Citation',
      configured:'configured',
      off:'not connected',
      fallbackNotice:'(Synthetic model operates as fallback when optional telemetry is not connected)'
    }
  }[lang];
  const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  async function loadStatus(){
    try{
      const r=await fetch('/api/mentions',{headers:{accept:'application/json'}});
      const d=await r.json();
      providers.innerHTML=Object.entries(d.providers||{}).map(([k,v])=>`<div class="mention-provider"><strong>${esc(k.toUpperCase())}</strong><small>${v?copy.configured:copy.off}</small></div>`).join('');
      if(!d.accessConfigured){
        status.hidden=false;
        status.classList.add('error');
        status.textContent=copy.access;
      }
    }catch{}
  }
  function render(d){
    const scopeBadge=d.telemetryScope?.includes('clarity')
      ? `<span class="mention-telemetry-badge" style="background:#f0fdf4; color:#166534; border:1px solid #bbf7d0; padding:2px 6px; border-radius:4px; font-size:11px; font-weight:700;">[${copy.providerScoped}: Microsoft Clarity]</span>`
      : `<span class="mention-telemetry-badge" style="background:#f1f5f9; color:#475569; border:1px solid #cbd5e1; padding:2px 6px; border-radius:4px; font-size:11px; font-weight:700;">[${copy.simulatedCitation}]</span>`;
    summary.innerHTML=`<strong>${d.summary?.mentionRate??'—'}%</strong> ${copy.rate} · <strong>${d.summary?.citationRate??'—'}%</strong> ${copy.citation} · ${scopeBadge} · ${copy.run} ${esc(d.runId)}`;
    rows.innerHTML=(d.observations||[]).map(o=>{
      const cls=o.status!=='ok'?'na':o.mentioned?'yes':'no';
      const label=o.status!=='ok'?copy.na:o.mentioned?copy.mention:copy.no;
      const isObserved=o.citationType==='observed';
      const typeBadge=isObserved
        ? `<span class="citation-type-badge observed" style="font-size:10px; padding:1px 5px; background:#dcfce7; color:#15803d; border-radius:3px; font-weight:700; margin-left:6px;">${copy.observedCitation}</span>`
        : `<span class="citation-type-badge simulated" style="font-size:10px; padding:1px 5px; background:#e0f2fe; color:#0369a1; border-radius:3px; font-weight:700; margin-left:6px;">${copy.simulatedCitation}</span>`;
      const cites=(o.citations||[]).slice(0,6).map(u=>`<a href="${esc(u)}" target="_blank" rel="noopener noreferrer">${esc(u)}</a>`).join('<br>');
      return `<article class="mention-row"><header><div><b>${esc(o.provider.toUpperCase())}</b>${typeBadge}<small style="display:block;">${esc(o.model)} · ${esc(o.surface)}</small></div><span class="mention-badge ${cls}">${label}</span></header><p><b>${copy.prompt}:</b> ${esc(o.query)}</p>${o.excerpt?`<p>${esc(o.excerpt)}</p>`:''}<small>${copy.brand}: ${o.brandMentions||0} · ${copy.domain}: ${o.domainMentions||0} · ${copy.citationCount}: ${o.citationMatches||0}</small>${cites?`<p>${cites}</p>`:''}${o.error?`<p>${esc(o.error)}</p>`:''}</article>`;
    }).join('');
    result.hidden=false;
    result.scrollIntoView({behavior:'smooth',block:'start'});
  }
  form?.addEventListener('submit',async e=>{
    e.preventDefault();
    const brand=$('mentionBrand').value.trim(),domain=$('mentionDomain').value.trim(),token=$('mentionAccess').value.trim(),queries=[$('mentionQ1').value,$('mentionQ2').value,$('mentionQ3').value].map(x=>x.trim()).filter(Boolean);
    if(!brand||!queries.length)return;
    btn.disabled=true;
    status.hidden=false;
    status.classList.remove('error');
    status.innerHTML='<span class="status-spinner" aria-hidden="true"></span><span>'+esc(copy.checking)+'</span>';
    result.hidden=true;
    try{
      const r=await fetch('/api/mentions',{method:'POST',headers:{'content-type':'application/json','x-ai-mention-token':token},body:JSON.stringify({brand,domain,queries,providers:['openai','perplexity','gemini']})});
      const d=await r.json();
      if(!r.ok){
        if(lang==='tr'){console.warn('Mention API:',d.error);throw new Error(copy.failed)}
        throw new Error(d.error||copy.failed);
      }
      render(d);
      status.hidden=true;
    }catch(err){
      status.hidden=false;
      status.classList.add('error');
      status.innerHTML='<span>'+esc(err?.message||copy.failed)+'</span>';
    }finally{
      btn.disabled=false;
    }
  });
  loadStatus();
})();
