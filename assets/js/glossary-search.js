/**
 * HTML&HTML - Dev & Premium Sözlük Arama Motoru
 * Real-time Instant Search + Typo Tolerance (Fuzzy Damerau-Levenshtein) + Turkish Normalization
 */
(function() {
  'use strict';

  // 11 Ana Referans Terim Verisi & Akıllı Eş Anlamlı / Hata Sözlüğü
  const TERMS = [
    {
      id: 'ai-search-visibility',
      title: 'Yapay Zeka Arama Görünürlüğü',
      badge: 'SEKTÖR TERİMİ',
      def: 'Bir web sitesinin üretken yapay zeka arama deneyimlerinde bulunabilir, anlaşılabilir, kaynak olmaya elverişli ve tıklanabilir olma düzeyi.',
      keywords: ['yapay', 'zeka', 'arama', 'gorunurlugu', 'ai', 'search', 'visibility', 'tavsiye', 'onerilme', 'chatgpt', 'gemini', 'claude', 'perpleksiti', 'kaynak', 'bulunabilirlik', 'tiklanabilirlik', 'ai overviews', 'ai mode'],
      synonyms: ['yapayzeka', 'ai arama', 'arama gorunurluk', 'yapay zeka arama', 'tavsiye edilme', 'perplexiy', 'gemini', 'ai search']
    },
    {
      id: 'geo',
      title: 'GEO — Generative Engine Optimization',
      badge: 'SEKTÖR TERİMİ',
      def: 'Üretken yapay zeka arama deneyimlerinde görünürlüğü ve kaynak olma uygunluğunu geliştirmeyi amaçlayan çalışmalar için kullanılan sektör terimi.',
      keywords: ['geo', 'generative', 'engine', 'optimization', 'uretken', 'motor', 'optimizasyonu', 'uretken arama', 'genai', 'retrieval', 'kaynak olma', 'alaka'],
      synonyms: ['geoo', 'generativ', 'genrative', 'uretken motor', 'generative engine', 'geo optimizasyon', 'geo seo']
    },
    {
      id: 'aeo',
      title: 'AEO — Answer Engine Optimization',
      badge: 'SEKTÖR TERİMİ',
      def: 'Cevap odaklı sistemlerin net ve faydalı yanıtları daha kolay belirleyebilmesi için içeriği yapılandırmaya verilen sektör adı.',
      keywords: ['aeo', 'answer', 'engine', 'optimization', 'yanit', 'cevap', 'motoru', 'optimizasyonu', 'cikarilabilirlik', 'soru', 'cevap', 'answer-first', 'paragraf'],
      synonyms: ['aeoo', 'yanit motoru', 'cevap motoru', 'answer first', 'cevap optimizasyonu', 'yanit optimizasyonu', 'aeo optimizasyon']
    },
    {
      id: 'llmo',
      title: 'LLMO — Large Language Model Optimization',
      badge: 'SEKTÖR TERİMİ',
      def: 'Web bilgisini büyük dil modelleri ve retrieval sistemlerinin doğru çözmesi, anlaması ve kullanması için daha açık hale getirmeyi anlatan sektör terimi.',
      keywords: ['llmo', 'large', 'language', 'model', 'optimization', 'buyuk', 'dil', 'modeli', 'optimizasyonu', 'llm', 'retrieval', 'vektor', 'semantik html', 'varlik', 'canonical'],
      synonyms: ['llm', 'dil modelleri', 'buyuk dil modeli', 'llmoo', 'gpt', 'claude', 'gemini', 'llama', 'llm optimizasyon']
    },
    {
      id: 'aao',
      title: 'AAO — AI Agent Optimization',
      badge: 'GELİŞEN TERİM',
      def: 'Web sitelerini yapay zeka ajanlarının güvenli biçimde anlaması ve etkileşim kurması için hazırlamayı anlatan gelişen terim.',
      keywords: ['aao', 'ai', 'agent', 'optimization', 'ajan', 'yapay zeka', 'optimizasyonu', 'otonom', 'tarayici ajani', 'openapi', 'semantik kontroller', 'erisebilirlik', 'eylem'],
      synonyms: ['aaoo', 'ajanlar', 'ajent', 'agentic', 'otonom ajan', 'ai ajan', 'tarayici ajanlari']
    },
    {
      id: 'rag',
      title: 'RAG — Retrieval-Augmented Generation',
      badge: 'AI TEKNİĞİ',
      def: 'İlgili dış bilgiyi getirip üretilen yanıtı bu bilgiyle temellendiren retrieval tekniği.',
      keywords: ['rag', 'retrieval', 'augmented', 'generation', 'getirimle', 'artirilmis', 'uretim', 'grounding', 'temellendirme', 'dis bilgi', 'kaynak', 'vektor', 'baglam', 'arama dizini'],
      synonyms: ['retriv', 'retrive', 'retrivel', 'retreival', 'ragged', 'grounding', 'temellendirme', 'bilgi getirme', 'retrieval-augmented', 'rag optimizasyon']
    },
    {
      id: 'eeat',
      title: 'E-E-A-T — Deneyim, Uzmanlık, Otorite, Güven',
      badge: 'GOOGLE KALİTE KAVRAMI',
      def: 'Experience, Expertise, Authoritativeness ve Trustworthiness: Google\'ın içerik kalite rehberinde ve kalite değerlendirici çerçevesinde kullandığı değerlendirme kavramı.',
      keywords: ['eeat', 'e-e-a-t', 'eat', 'experience', 'expertise', 'authoritativeness', 'trustworthiness', 'deneyim', 'uzmanlik', 'otorite', 'guven', 'kalite', 'degerlendirici', 'yazarlik', 'guvenilirlik'],
      synonyms: ['eet', 'eeatt', 'uzmanlk', 'guven', 'guvenilirlik', 'deneyim', 'otorite', 'kalite rehberi', 'eeat guven']
    },
    {
      id: 'llms-txt',
      title: 'llms.txt',
      badge: 'ÖNERİ',
      def: 'Dil modeli araçlarını ve ajanları sitenin önemli kaynaklarına yönlendiren kısa, makine okunabilir bir dizin yayımlamaya yönelik topluluk önerisi.',
      keywords: ['llms.txt', 'llms-txt', 'llmstxt', 'llms', 'txt', 'makine', 'dizin', 'describedby', 'markdown', 'alternate', 'proposal', 'oneri', 'ajan'],
      synonyms: ['llmstxt', 'llms txt', 'llm.txt', 'llmstx', 'makine dosyasi', 'ai text', 'llms file']
    },
    {
      id: 'sitemap',
      title: 'XML Sitemap / Site Haritası',
      badge: 'RESMİ PROTOKOL',
      def: 'Arama motorlarının sitenin taranmasını ve değerlendirilmesini istediği kanonik URL\'leri keşfetmesine yardımcı olan makine okunabilir URL listesi.',
      keywords: ['sitemap', 'site', 'haritasi', 'xml', 'url', 'kanonik', 'tarama', 'kesif', 'protokol', 'search console', 'indeks', '50000'],
      synonyms: ['sitmap', 'sitemp', 'siteharitasi', 'site haritasi', 'xml sitemap', 'sitemaps', 'tarama haritasi']
    },
    {
      id: 'query-fan-out',
      title: 'Query fan-out',
      badge: 'GOOGLE TEKNİĞİ',
      def: 'Modelin karmaşık bir soruya yeterli bağlam toplamak için birden fazla ilişkili arama çalıştırdığı teknik.',
      keywords: ['query', 'fan', 'out', 'fan-out', 'fanout', 'sorgu', 'dallanmasi', 'coklu arama', 'iliskili sorgu', 'baglam', 'alt soru', 'arastirma'],
      synonyms: ['fanout', 'fan out', 'query fanout', 'sorgu dallanma', 'alt sorgular', 'sorgu dallanmasi']
    },
    {
      id: 'source-eligibility',
      title: 'Kaynak olma uygunluğu',
      badge: 'HTML&HTML KARAR TERİMİ',
      def: 'Bir sayfanın kaynak olarak bulunması, değerlendirilmesi ve bağlantılanması önündeki gözlemlenebilir site kaynaklı engelleri aşıp aşmadığını anlatan HTML&HTML karar terimi.',
      keywords: ['kaynak', 'olma', 'uygunlugu', 'source', 'eligibility', 'atif', 'citation', 'baglanti', 'arama', 'snippet', 'on kosul', 'engel', 'degerlendirme'],
      synonyms: ['kaynak uygunlugu', 'kaynak olma', 'source eligibility', 'atif uygunlugu', 'citation eligibility']
    }
  ];

  // Türkçe & İngilizce Gelişmiş Normalizasyon
  function trNormalize(str) {
    if (!str) return '';
    return String(str)
      .replace(/İ/g, 'i')
      .replace(/I/g, 'ı')
      .toLowerCase()
      .replace(/ç/g, 'c')
      .replace(/ğ/g, 'g')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ş/g, 's')
      .replace(/ü/g, 'u')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Damerau-Levenshtein Mesafesi (Ekleme, Silme, Değiştirme ve Yer Değiştirme)
  function damerauLevenshtein(a, b) {
    const al = a.length;
    const bl = b.length;
    if (al === 0) return bl;
    if (bl === 0) return al;

    const matrix = [];
    for (let i = 0; i <= al; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= bl; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= al; i++) {
      for (let j = 1; j <= bl; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,       // Silme
          matrix[i][j - 1] + 1,       // Ekleme
          matrix[i - 1][j - 1] + cost // Değiştirme
        );

        // Transposition (Harf yer değiştirme)
        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
          matrix[i][j] = Math.min(matrix[i][j], matrix[i - 2][j - 2] + cost);
        }
      }
    }
    return matrix[al][bl];
  }

  // Benzerlik Oranı (0.0 - 1.0)
  function similarityRatio(s1, s2) {
    const maxLen = Math.max(s1.length, s2.length);
    if (maxLen === 0) return 1.0;
    const dist = damerauLevenshtein(s1, s2);
    return Math.max(0, 1.0 - (dist / maxLen));
  }

  // Çok Katmanlı Arama ve Skorlama Fonksiyonu
  function scoreTerm(term, rawQuery) {
    const q = trNormalize(rawQuery);
    if (!q) return { score: 100, exact: true, fuzzy: false, confidence: 1, matchedWord: '' };

    const qTokens = q.split(' ').filter(t => t.length > 0);
    const titleNorm = trNormalize(term.title);
    const defNorm = trNormalize(term.def);

    let totalScore = 0;
    let isExact = false;
    let isFuzzy = false;
    let matchedWord = '';
    let bestFuzzyRatio = 0;

    // 1. Tam Başlık Eşleşmesi (En yüksek öncelik)
    if (titleNorm.includes(q)) {
      totalScore += 120;
      isExact = true;
      matchedWord = term.title;
    }

    // 2. Kısaltma ve ID Eşleşmesi
    if (term.id.toLowerCase() === q || trNormalize(term.id).includes(q)) {
      totalScore += 100;
      isExact = true;
      matchedWord = term.title;
    }

    // 3. Tanım İçi Tam Kelime Eşleşmesi
    if (defNorm.includes(q)) {
      totalScore += 60;
      isExact = true;
      matchedWord = term.title;
    }

    // 4. Token Bazlı Eşleşme & Eş Anlamlılar
    const allHaystack = [
      ...term.keywords,
      ...term.synonyms,
      ...titleNorm.split(' ')
    ].map(trNormalize);

    for (const qTok of qTokens) {
      let tokenMatched = false;

      // Tam veya Prefix Eşleşmesi
      for (const hay of allHaystack) {
        if (hay === qTok) {
          totalScore += 50;
          tokenMatched = true;
          isExact = true;
          matchedWord = hay;
          break;
        } else if (hay.startsWith(qTok) && qTok.length >= 2) {
          totalScore += 35;
          tokenMatched = true;
          isExact = true;
          matchedWord = hay;
          break;
        }
      }

      // Eğer doğrudan eşleşmediyse: AKILLI YAZIM HATASI (FUZZY) KONTROLÜ
      if (!tokenMatched && qTok.length >= 3) {
        let maxSim = 0;
        let bestHay = '';

        for (const hay of allHaystack) {
          if (hay.length < 3) continue;
          const sim = similarityRatio(qTok, hay);
          if (sim > maxSim) {
            maxSim = sim;
            bestHay = hay;
          }
        }

        // Eşik: Benzerlik >= 0.65 veya mesafe <= 2
        if (maxSim >= 0.65) {
          let fuzzyScore = Math.round(maxSim * 45);
          // Eğer eşleşen kelime doğrudan BAŞLIKTA yer alıyorsa ek bonus ver (+35 puan)
          if (titleNorm.includes(bestHay)) {
            fuzzyScore += 35;
          }
          totalScore += fuzzyScore;
          isFuzzy = true;
          matchedWord = bestHay;
          if (maxSim > bestFuzzyRatio) {
            bestFuzzyRatio = maxSim;
          }
        }
      }
    }

    return {
      score: totalScore,
      exact: isExact,
      fuzzy: isFuzzy && !isExact,
      confidence: bestFuzzyRatio || (isExact ? 1 : 0),
      matchedWord: matchedWord || term.title
    };
  }

  // DOM Elemanlarını Seç ve Olayları Başlat
  function initGlossarySearch() {
    const searchInput = document.getElementById('glossarySearchInput');
    const searchBtn = document.getElementById('glossarySearchBtn');
    const searchClear = document.getElementById('glossarySearchClear');
    const feedbackBanner = document.getElementById('glossaryFeedbackBanner');
    const feedbackBadge = document.getElementById('glossaryFeedbackBadge');
    const feedbackText = document.getElementById('glossaryFeedbackText');
    const feedbackReset = document.getElementById('glossaryFeedbackReset');
    const dropdownResults = document.getElementById('glossaryDropdownResults');
    const resultsCountEl = document.getElementById('glossaryResultsCount');
    const quickPills = document.querySelectorAll('.quick-pill');
    const emptyState = document.getElementById('glossaryEmptyState');
    const cards = document.querySelectorAll('.glossary-card');

    if (!searchInput || !cards.length) return;

    // Kartların orijinal HTML'lerini önbellekle (highlight temizleme için)
    const cardOriginalContent = new Map();
    cards.forEach(card => {
      const h2 = card.querySelector('.term-head h2');
      const def = card.querySelector('.term-def');
      cardOriginalContent.set(card.id, {
        h2: h2 ? h2.innerHTML : '',
        def: def ? def.innerHTML : ''
      });
    });

    let dropdownSelectedIndex = -1;

    // Metin Vurgulama
    function highlightText(element, word) {
      if (!element || !word || word.length < 2) return;
      const cleanWord = trNormalize(word);
      const text = element.textContent;
      const regex = new RegExp(`(${word}|${cleanWord})`, 'gi');
      
      try {
        const parts = text.split(regex);
        element.innerHTML = parts.map(part => {
          if (trNormalize(part) === cleanWord || part.toLowerCase() === word.toLowerCase()) {
            return `<mark class="sozluk-highlight">${part}</mark>`;
          }
          return part;
        }).join('');
      } catch (e) {
        // Hata durumunda sessizce geç
      }
    }

    // Vurguları Temizle
    function clearHighlights() {
      cards.forEach(card => {
        const orig = cardOriginalContent.get(card.id);
        if (orig) {
          const h2 = card.querySelector('.term-head h2');
          const def = card.querySelector('.term-def');
          if (h2) h2.innerHTML = orig.h2;
          if (def) def.innerHTML = orig.def;
        }
      });
    }

    // Karta Yumuşak Kaydırma & Glow Animasyonu
    function scrollToCard(cardId) {
      const card = document.getElementById(cardId);
      if (!card) return;

      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card.classList.remove('pulse-focus');
      void card.offsetWidth;
      card.classList.add('pulse-focus');

      setTimeout(() => {
        card.classList.remove('pulse-focus');
      }, 2000);
    }

    // Dropdown Güncelleme
    function updateDropdown(results, q) {
      if (!dropdownResults) return;
      if (!q || results.length === 0) {
        dropdownResults.style.display = 'none';
        return;
      }

      dropdownResults.innerHTML = '';
      dropdownSelectedIndex = -1;

      results.slice(0, 4).forEach((r) => {
        const item = document.createElement('div');
        item.className = 'dropdown-item';
        item.setAttribute('role', 'option');
        item.setAttribute('data-target-id', r.term.id);

        const reasonHtml = r.fuzzy
          ? `<span class="dropdown-match-reason">⚡ En yakın eşleşme: ${r.matchedWord}</span>`
          : '';

        item.innerHTML = `
          <div class="dropdown-item-head">
            <span class="dropdown-item-title">${r.term.title}</span>
            <span class="dropdown-item-badge">${r.term.badge}</span>
          </div>
          <div class="dropdown-item-snippet">${r.term.def}</div>
          ${reasonHtml}
        `;

        item.addEventListener('click', () => {
          scrollToCard(r.term.id);
          dropdownResults.style.display = 'none';
        });

        dropdownResults.appendChild(item);
      });

      dropdownResults.style.display = 'block';
    }

    // Ana Arama ve Filtreleme Motoru
    function executeSearch(query, isManualTrigger) {
      const q = (query !== undefined ? query : searchInput.value).trim();
      
      // Temizle butonunu göster/gizle
      if (searchClear) {
        searchClear.style.display = q ? 'flex' : 'none';
      }

      clearHighlights();

      // Boş sorgu durumunda tüm kartları göster
      if (!q) {
        cards.forEach(card => {
          card.style.display = '';
          card.classList.remove('pulse-focus');
        });
        if (feedbackBanner) feedbackBanner.style.display = 'none';
        if (dropdownResults) dropdownResults.style.display = 'none';
        if (emptyState) emptyState.style.display = 'none';
        if (resultsCountEl) {
          resultsCountEl.innerHTML = `<span class="dot"></span> <b>11</b> terim listeleniyor`;
          resultsCountEl.classList.remove('empty');
        }
        return;
      }

      // Terimleri skorla
      const results = TERMS.map(term => {
        const res = scoreTerm(term, q);
        return {
          term: term,
          card: document.getElementById(term.id),
          score: res.score,
          exact: res.exact,
          fuzzy: res.fuzzy,
          confidence: res.confidence,
          matchedWord: res.matchedWord
        };
      }).filter(r => r.score > 0);

      // Skora göre sırala
      results.sort((a, b) => b.score - a.score);

      const visibleIds = new Set(results.map(r => r.term.id));
      let visibleCount = 0;

      cards.forEach(card => {
        const isMatch = visibleIds.has(card.id);
        card.style.display = isMatch ? '' : 'none';
        if (isMatch) visibleCount++;
      });

      // Vurgulama Yap
      if (visibleCount > 0) {
        const topResult = results[0];
        const highlightToken = topResult.exact ? q : topResult.matchedWord;
        results.slice(0, 3).forEach(r => {
          if (r.card) {
            const h2 = r.card.querySelector('.term-head h2');
            const def = r.card.querySelector('.term-def');
            highlightText(h2, highlightToken);
            highlightText(def, highlightToken);
          }
        });
      }

      // Sonuç Sayacı Güncellemesi
      if (resultsCountEl) {
        if (visibleCount > 0) {
          resultsCountEl.innerHTML = `<span class="dot"></span> <b>${visibleCount}</b> / 11 terim bulundu`;
          resultsCountEl.classList.remove('empty');
        } else {
          resultsCountEl.innerHTML = `<span class="dot"></span> <b>0</b> sonuç`;
          resultsCountEl.classList.add('empty');
        }
      }

      // Boş Durum (Empty State) Yönetimi
      if (visibleCount === 0) {
        if (emptyState) {
          emptyState.style.display = 'flex';
          const queryHolder = document.getElementById('glossaryEmptyQuery');
          if (queryHolder) queryHolder.textContent = q;
        }
        if (feedbackBanner) feedbackBanner.style.display = 'none';
        if (dropdownResults) dropdownResults.style.display = 'none';
        return;
      } else {
        if (emptyState) emptyState.style.display = 'none';
      }

      // Akıllı Yazım Hatası / Yakın Eşleşme Bildirim Şeridi (Fuzzy Feedback)
      const hasFuzzyOnly = results.some(r => r.fuzzy) && !results.some(r => r.exact);
      const topMatch = results[0];

      if (hasFuzzyOnly && topMatch && topMatch.confidence >= 0.65) {
        if (feedbackBanner && feedbackBadge && feedbackText) {
          feedbackBanner.style.display = 'flex';
          feedbackBadge.className = 'feedback-badge';
          feedbackBadge.innerHTML = `⚡ Yazım Düzeltmesi`;
          feedbackText.innerHTML = `‘<strong>${q}</strong>’ için en yakın sonuç <strong>${topMatch.term.title}</strong> (${Math.round(topMatch.confidence * 100)}% eşleşme) otomatik getirildi.`;
        }
      } else if (feedbackBanner) {
        if (topMatch && topMatch.exact) {
          feedbackBanner.style.display = 'flex';
          feedbackBadge.className = 'feedback-badge exact';
          feedbackBadge.innerHTML = `✓ Tam Eşleşme`;
          feedbackText.innerHTML = `‘<strong>${q}</strong>’ ile ilgili terimler listeleniyor.`;
        } else {
          feedbackBanner.style.display = 'none';
        }
      }

      // Canlı Öneri Açılır Listesi (Dropdown Autocomplete)
      updateDropdown(results, q);

      // Manuel tetiklendiyse (Enter veya Ara butonu) ilk sonuca kaydır
      if (isManualTrigger && results.length > 0) {
        scrollToCard(results[0].term.id);
        if (dropdownResults) dropdownResults.style.display = 'none';
      }
    }

    // Olay Dinleyicileri (Event Listeners)

    // 1. Canlı Arama Girişi (Real-time Input)
    let debounceTimer = null;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        executeSearch(e.target.value, false);
      }, 40); // 40ms ultra-hızlı canlı yanıt
    });

    // 2. Form ve Buton Gönderimi
    if (searchBtn) {
      searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        executeSearch(searchInput.value, true);
      });
    }

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (dropdownResults && dropdownResults.style.display === 'block' && dropdownSelectedIndex >= 0) {
          const items = dropdownResults.querySelectorAll('.dropdown-item');
          if (items[dropdownSelectedIndex]) {
            items[dropdownSelectedIndex].click();
            return;
          }
        }
        executeSearch(searchInput.value, true);
        if (dropdownResults) dropdownResults.style.display = 'none';
      }

      if (dropdownResults && dropdownResults.style.display === 'block') {
        const items = dropdownResults.querySelectorAll('.dropdown-item');
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          dropdownSelectedIndex = Math.min(dropdownSelectedIndex + 1, items.length - 1);
          highlightDropdownItem(items);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          dropdownSelectedIndex = Math.max(dropdownSelectedIndex - 1, 0);
          highlightDropdownItem(items);
        } else if (e.key === 'Escape') {
          dropdownResults.style.display = 'none';
        }
      } else if (e.key === 'Escape') {
        searchInput.value = '';
        executeSearch('', false);
      }
    });

    function highlightDropdownItem(items) {
      items.forEach((item, idx) => {
        item.classList.toggle('is-selected', idx === dropdownSelectedIndex);
      });
    }

    // 3. Temizle Butonu
    if (searchClear) {
      searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchInput.focus();
        executeSearch('', false);
      });
    }

    // 4. Feedback Sıfırlama Butonu
    if (feedbackReset) {
      feedbackReset.addEventListener('click', () => {
        searchInput.value = '';
        executeSearch('', false);
        searchInput.focus();
      });
    }

    // 5. Sayfa Dışına Tıklanınca Dropdown'ı Kapat
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.sozluk-search-shell')) {
        if (dropdownResults) dropdownResults.style.display = 'none';
      }
    });

    // 6. Global Klavye Kısayolları (Cmd+K / Ctrl+K / "/")
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
      } else if (e.key === '/' && document.activeElement !== searchInput && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
      }
    });

    // 7. Hızlı Konu Hapları (Quick Filter Pills)
    quickPills.forEach(pill => {
      pill.addEventListener('click', () => {
        quickPills.forEach(p => p.classList.remove('is-active'));
        pill.classList.add('is-active');

        const filter = pill.getAttribute('data-filter');
        if (filter === 'all') {
          searchInput.value = '';
          executeSearch('', false);
        } else {
          searchInput.value = filter;
          executeSearch(filter, true);
        }
      });
    });

    // 8. Boş Durum Öneri Butonları
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.suggestion-btn');
      if (btn) {
        const query = btn.getAttribute('data-suggest');
        if (query) {
          searchInput.value = query;
          executeSearch(query, true);
        }
      }
    });

    // URL Parametresi Kontrolü
    const urlParams = new URLSearchParams(window.location.search);
    const initialQuery = urlParams.get('q');
    if (initialQuery) {
      searchInput.value = initialQuery;
      executeSearch(initialQuery, true);
    }
  }

  // Global Nesne Export (Test ve Harici Entegrasyon için)
  if (typeof window !== 'undefined') {
    window.HTML_GLOSSARY_SEARCH = {
      TERMS,
      trNormalize,
      damerauLevenshtein,
      similarityRatio,
      scoreTerm,
      init: initGlossarySearch
    };
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initGlossarySearch);
    } else {
      initGlossarySearch();
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      TERMS,
      trNormalize,
      damerauLevenshtein,
      similarityRatio,
      scoreTerm
    };
  }
})();
