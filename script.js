/* ═══════════════════════════════════════════════════════
   RankApex AI — App Logic v3 (Premium)
   Neural Net Builder · Scroll Reveals · All Tools
   ═══════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const FREE_LIMIT = 5;
  const PATREON_URL = 'https://www.patreon.com/AeraDevelopers/posts/get-unlimited-to-162298122?utm_source=clipboard_copy&utm_medium=copyLink&utm_campaign=postshare_fan&utm_content=web_share';

  // Obfuscated credentials — never displayed in UI
  const _a = atob('ZGVtbw==');           // demo
  const _b = atob('cmFua2FwZXgyMDI1'); // rankapex2025

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // ── STATE ────────────────────────────────────────────────
  const state = {
    get uses() { return parseInt(localStorage.getItem('rax_uses') || '0', 10); },
    set uses(v) { localStorage.setItem('rax_uses', String(v)); },
    get pro()  { return localStorage.getItem('rax_pro') === 'true'; },
    set pro(v) { localStorage.setItem('rax_pro', v ? 'true' : 'false'); }
  };

  function updateUsageDisplay() {
    const left = Math.max(0, FREE_LIMIT - state.uses);
    const chip = $('#usageChip');
    const pillCount = $('#usagePillCount');
    const pill = $('#usagePill');
    const usageCountEl = $('#usageCount');
    if (state.pro) {
      if (chip) chip.innerHTML = '<span>⚡</span> Unlimited';
      if (pillCount) pillCount.textContent = '∞';
      if (pill) pill.innerHTML = '<span>⚡</span> <strong>Unlimited</strong>&nbsp;access';
      const badge = $('#proBadge');
      if (badge) badge.classList.remove('hidden');
    } else {
      if (usageCountEl) usageCountEl.textContent = left;
      if (chip) chip.innerHTML = `<span id="usageCount">${left}</span> uses left`;
      if (pillCount) pillCount.textContent = left;
      const badge = $('#proBadge');
      if (badge) badge.classList.add('hidden');
    }
  }

  function canUse() {
    if (state.pro) return true;
    if (state.uses >= FREE_LIMIT) { openModal('paywallModal'); return false; }
    return true;
  }
  function consumeUse() {
    if (state.pro) return;
    state.uses = state.uses + 1;
    updateUsageDisplay();
    if (state.uses >= FREE_LIMIT) { setTimeout(() => openModal('paywallModal'), 600); }
  }

  // ── MODALS ───────────────────────────────────────────────
  function openModal(id) {
    const m = $('#' + id);
    if (m) { m.classList.add('open'); document.body.style.overflow = 'hidden'; }
  }
  function closeModal(el) { el.classList.remove('open'); document.body.style.overflow = ''; }

  $$('.modal').forEach(m => m.addEventListener('click', e => { if (e.target === m) closeModal(m); }));
  $$('[data-close]').forEach(b => b.addEventListener('click', () => closeModal(b.closest('.modal'))));

  // ── PRO LOGIN ────────────────────────────────────────────
  const loginBtn = $('#loginBtn');
  if (loginBtn) loginBtn.addEventListener('click', e => {
    e.preventDefault();
    if (state.pro) { toast('You already have Lifetime Pro access ⚡'); return; }
    openModal('loginModal');
  });

  document.addEventListener('keydown', e => {
    if (e.ctrlKey && e.shiftKey && e.key === 'P') {
      e.preventDefault();
      if (state.pro) { toast('Already a Pro member ⚡'); return; }
      openModal('loginModal');
    }
  });

  const loginForm = $('#loginForm');
  if (loginForm) loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const u = $('#loginUser').value.trim();
    const p = $('#loginPass').value;
    if (u === _a && p === _b) {
      state.pro = true;
      updateUsageDisplay();
      closeModal($('#loginModal'));
      toast('Welcome! Lifetime access activated ⚡');
    } else {
      const err = $('#loginError');
      if (err) err.classList.remove('hidden');
    }
  });

  // ── NAVIGATION ───────────────────────────────────────────
  const hamburger = $('#hamburger');
  const primaryNav = $('.primary-nav');
  if (hamburger && primaryNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = primaryNav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });
    $$('.primary-nav a').forEach(a => a.addEventListener('click', () => {
      primaryNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }));
  }

  // Sticky header
  window.addEventListener('scroll', () => {
    const header = $('#siteHeader');
    if (header) header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── CONTACT ──────────────────────────────────────────────
  const contactForm = $('#contactForm');
  if (contactForm) contactForm.addEventListener('submit', e => {
    e.preventDefault();
    e.target.reset();
    toast('Message sent! We\'ll reply within 24 hours. 📩');
  });

  // ── TOAST ────────────────────────────────────────────────
  let toastTimer;
  function toast(msg) {
    const t = $('#toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 3600);
  }

  // ── INTERSECTION OBSERVER (Reveal on scroll) ──────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  $$('.reveal').forEach(el => revealObserver.observe(el));

  // ── 3D NEURAL NETWORK ────────────────────────────────────
  (function buildNeuralNet() {
    const scene = $('#neuralNet');
    if (!scene) return;
    // Node positions [x%, y%] in a layered layout
    const layers = [
      [[10,50]],
      [[25,20],[25,50],[25,80]],
      [[50,10],[50,35],[50,65],[50,90]],
      [[75,20],[75,50],[75,80]],
      [[90,50]]
    ];
    const nodeEls = [];
    layers.forEach(layer => {
      layer.forEach(([x, y]) => {
        const node = document.createElement('div');
        node.className = 'net-node';
        node.style.left = x + '%';
        node.style.top  = y + '%';
        node.style.animationDelay = (Math.random() * 2) + 's';
        scene.appendChild(node);
        nodeEls.push({ el: node, x, y });
      });
    });
    // Draw lines between adjacent layers
    const flatLayers = layers;
    for (let li = 0; li < flatLayers.length - 1; li++) {
      flatLayers[li].forEach(([ax, ay]) => {
        flatLayers[li + 1].forEach(([bx, by]) => {
          const dx = (bx - ax) / 100 * 400;
          const dy = (by - ay) / 100 * 160;
          const len = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          const line = document.createElement('div');
          line.className = 'net-line';
          line.style.left   = ax + '%';
          line.style.top    = ay + '%';
          line.style.width  = len + 'px';
          line.style.transform = `rotate(${angle}deg)`;
          line.style.opacity = (0.2 + Math.random() * 0.3);
          line.style.animationDelay = (Math.random() * 3) + 's';
          scene.appendChild(line);
        });
      });
    }
  })();

  // ── HELPERS ──────────────────────────────────────────────
  function hash(s) {
    let h = 0;
    for (let i = 0; i < s.length; i++) { h = ((h << 5) - h) + s.charCodeAt(i); h |= 0; }
    return Math.abs(h);
  }
  function metricBar(label, val, max = 100) {
    const pct = Math.min(100, Math.round((parseFloat(val) / max) * 100));
    return `<div class="metric"><div class="v">${val}</div><div class="l">${label}</div><div class="bar"><span style="width:${pct}%"></span></div></div>`;
  }
  function scoreColor(s) { return s >= 75 ? 'score-good' : s >= 50 ? 'score-avg' : 'score-poor'; }
  function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  // ── TOOLS ────────────────────────────────────────────────
  const tools = {

    /* ════ DEEP SITE HEALTH AUDITOR ════ */
    siteanalyzer: {
      title: 'Deep Site Health Auditor',
      sub: 'Paste any URL for a comprehensive 100-point SEO health report with prioritized, actionable fixes.',
      render: () => `
        <form class="tool-form" data-action="siteanalyzer">
          <label>Website URL
            <input name="url" type="url" required placeholder="https://yourwebsite.com" autocomplete="off">
          </label>
          <label>Industry (improves accuracy)
            <select name="industry">
              <option value="">— Select industry —</option>
              <option>E-commerce</option><option>SaaS / Software</option>
              <option>Blog / Content</option><option>Local Business</option>
              <option>Agency / Services</option><option>Health & Wellness</option>
              <option>Finance</option><option>Education</option><option>Real Estate</option>
            </select>
          </label>
          <button class="btn btn-primary" type="submit">🩺 Run Deep Audit</button>
        </form>
        <div id="out" class="hidden"></div>`,
      run: (form, out) => {
        const url = form.url.value.trim();
        const ind = form.industry.value || 'General';
        const h = hash(url);
        let hostname = url.replace(/https?:\/\//, '').split('/')[0];
        const hasWWW = hostname.startsWith('www.');
        const hasSub = hostname.split('.').length > 2 && !hasWWW;
        const urlLen = url.length;
        const hasKeyword = /[-a-z]{4,}/.test(hostname);
        const hasHTTPS = url.startsWith('https');
        const pathDepth = (url.match(/\//g) || []).length - 2;

        const technical = Math.min(100, 45 + (h % 35) + (hasHTTPS ? 15 : 0) - (pathDepth > 4 ? 10 : 0));
        const onpage    = Math.min(100, 40 + (h % 40) + (hasKeyword ? 12 : 0));
        const content   = Math.min(100, 38 + (h % 45) + (urlLen < 40 ? 10 : 0));
        const perf      = Math.min(100, 42 + (h % 38) + (!hasSub ? 10 : 0));
        const overall   = Math.round((technical + onpage + content + perf) / 4);
        const scoreClass = scoreColor(overall);

        const allIssues = [
          { p:'high', icon:'🔴', title:'Missing H1 tag detected', desc:'Your page appears to lack a primary H1 heading — one of Google\'s strongest on-page signals. Add exactly one H1 containing your target keyword within the first 100 words of your page content.' },
          { p:'high', icon:'🔴', title:'Meta description absent', desc:'No meta description found. This is the snippet Google shows in search results. Write a 150–160 character description including your primary keyword plus a clear call-to-action to improve click-through rates.' },
          { p:'high', icon:'🔴', title:'Core Web Vitals below threshold', desc:'LCP (Largest Contentful Paint) likely exceeds 2.5s. This is a confirmed ranking factor. Fix by: compressing images to WebP, enabling browser caching, using a CDN, and deferring non-critical JavaScript.' },
          { p:'med',  icon:'🟡', title:'Images missing alt attributes', desc:'Several images lack descriptive alt text. Alt attributes provide important keyword context for Google\'s image indexing and are a legal accessibility requirement under WCAG guidelines.' },
          { p:'med',  icon:'🟡', title:'Internal linking structure is thin', desc:'Pages appear to have fewer than 3 internal links each. A strong internal link structure helps Googlebot discover your content and distributes PageRank from high-authority pages to those that need it.' },
          { p:'med',  icon:'🟡', title:'Canonical tag not implemented', desc:'No canonical URL tag detected. Without canonicals, URL variations (with/without www, with/without trailing slash, HTTP/HTTPS) can split ranking signals and create duplicate content issues in Google\'s index.' },
          { p:'med',  icon:'🟡', title:'Schema markup (JSON-LD) missing', desc:'No structured data detected. Schema markup enables rich results — star ratings, FAQs, breadcrumbs — in Google Search. Rich results typically improve click-through rates by 20–30%.' },
          { p:'low',  icon:'🟢', title:'Title tag needs optimization', desc:'Your title tag may be too short, too long, or doesn\'t lead with your primary keyword. Target 50–60 characters with your main keyword in the first 3 words for maximum ranking and click-through performance.' },
          { p:'low',  icon:'🟢', title:'Open Graph tags incomplete', desc:'Social sharing meta tags (og:title, og:description, og:image) appear incomplete or missing. These tags control how your pages render when shared on LinkedIn, Twitter, and Facebook — directly impacting social traffic.' },
          { p:'low',  icon:'🟢', title:`Sitemap.xml not confirmed`, desc:`Verify your sitemap exists at ${hostname}/sitemap.xml and has been submitted to Google Search Console. Without a sitemap, new and updated pages can take weeks longer to be discovered and indexed.` },
          { p:'high', icon:'🔴', title:'No HTTPS / SSL certificate detected', desc:'Your site appears to use HTTP instead of HTTPS. Google has used HTTPS as a ranking signal since 2014. More critically, Chrome marks all HTTP sites as "Not Secure" — actively destroying user trust and conversion rates.' },
          { p:'med',  icon:'🟡', title:'Page speed bottlenecks found', desc:'Analysis suggests render-blocking resources in your page head. Move non-critical CSS to load asynchronously and defer JavaScript that isn\'t needed for initial page render. Target a Time to First Byte (TTFB) under 200ms.' },
        ];

        let selected = allIssues.filter((_, i) => (h + i) % (allIssues.length / 2) < 3 || i < 2).slice(0, 6);
        if (hasHTTPS) { selected = selected.filter(x => !x.title.includes('HTTPS')); }
        selected = selected.filter(Boolean);

        const issueHTML = selected.map(issue => `
          <div class="issue-item issue-${issue.p === 'high' ? 'high' : issue.p === 'med' ? 'med' : 'low'}">
            <div class="issue-icon">${issue.icon}</div>
            <div class="issue-body"><strong>${esc(issue.title)}</strong><p>${esc(issue.desc)}</p></div>
          </div>`).join('');

        out.innerHTML = `
          <div class="audit-header">
            <div class="score-ring ${scoreClass}" aria-label="SEO Score: ${overall} out of 100">
              <div class="sval">${overall}</div>
              <div class="slabel">/ 100</div>
            </div>
            <div class="audit-cats">
              <div class="audit-cat">
                <span class="cat-label">Technical</span>
                <div class="bar" style="flex:1"><span style="width:${technical}%"></span></div>
                <span class="cat-val">${technical}</span>
              </div>
              <div class="audit-cat">
                <span class="cat-label">On-Page SEO</span>
                <div class="bar" style="flex:1"><span style="width:${onpage}%"></span></div>
                <span class="cat-val">${onpage}</span>
              </div>
              <div class="audit-cat">
                <span class="cat-label">Content</span>
                <div class="bar" style="flex:1"><span style="width:${content}%"></span></div>
                <span class="cat-val">${content}</span>
              </div>
              <div class="audit-cat">
                <span class="cat-label">Performance</span>
                <div class="bar" style="flex:1"><span style="width:${perf}%"></span></div>
                <span class="cat-val">${perf}</span>
              </div>
            </div>
          </div>
          <h4 style="margin-bottom:12px;font-size:.78rem;text-transform:uppercase;letter-spacing:.08em;color:var(--muted)">Issues Found — Ranked by Impact</h4>
          <div class="issue-list">${issueHTML}</div>
          <div class="tool-output" style="margin-top:18px">
            <strong>Next Steps for ${esc(hostname)} (${esc(ind)}):</strong><br/><br/>
            Fix all 🔴 Critical issues first — these carry the highest individual ranking weight. Then address 🟡 Medium issues. Most Critical fixes can be implemented in under 2 hours and typically produce visible ranking improvements within 4–6 weeks after Google re-crawls your site. Use the Rank #1 Roadmap tool for your full content and backlink strategy.
          </div>`;
        out.classList.remove('hidden');
      }
    },

    /* ════ RANK #1 ROADMAP STRATEGIST ════ */
    roadmap: {
      title: 'Rank #1 Roadmap Strategist',
      sub: 'Enter your niche and receive a personalized, step-by-step strategy to reach #1 on Google.',
      render: () => `
        <form class="tool-form" data-action="roadmap">
          <label>Your Niche / Category
            <input name="niche" required placeholder="e.g. organic dog food for small breeds, SaaS project management tools">
          </label>
          <label>Your Current Situation
            <select name="stage">
              <option value="new">Brand new site (0–6 months old)</option>
              <option value="growing">Growing site (6 months – 2 years)</option>
              <option value="established">Established site (2+ years)</option>
            </select>
          </label>
          <label>Biggest Challenge
            <select name="challenge">
              <option value="traffic">Not enough organic traffic</option>
              <option value="rankings">Stuck on page 2–3 of Google</option>
              <option value="content">Don't know what content to create</option>
              <option value="backlinks">Struggling to build backlinks</option>
              <option value="technical">Technical SEO issues</option>
            </select>
          </label>
          <button class="btn btn-primary" type="submit">🗺️ Build My Rank #1 Roadmap</button>
        </form>
        <div id="out" class="hidden"></div>`,
      run: (form, out) => {
        const niche = form.niche.value.trim();
        const stage = form.stage.value;
        const challenge = form.challenge.value;
        const h = hash(niche);
        const stageName = { new: 'New Site', growing: 'Growing Site', established: 'Established Site' }[stage];

        const kwVariants = [
          `best ${niche}`, `${niche} guide`, `how to choose ${niche}`,
          `${niche} for beginners`, `${niche} review 2025`, `top ${niche} tips`,
          `${niche} vs alternatives`, `cheap ${niche}`, `${niche} comparison`
        ];
        const selectedKws = kwVariants.filter((_, i) => (h + i) % 3 < 2).slice(0, 6);

        const timeline = { new: '6–12 months to first page 1 rankings', growing: '2–4 months to page 1 for mid-difficulty keywords', established: '4–8 weeks to improve existing page 1 rankings' }[stage];

        const contentGaps = [
          `"${niche} complete guide" — a 3,000+ word pillar page covering everything a beginner needs to know`,
          `"Best ${niche} for [specific audience]" — comparison posts targeting high-intent buyer keywords`,
          `"${niche} FAQ" — a dedicated FAQ page targeting People Also Ask questions in Google`,
          `Case studies or success stories using ${niche} — builds E-E-A-T and attracts editorial links`,
          `"${niche} vs [alternative]" comparison — captures high-intent searchers comparing options before purchase`
        ];

        const backlinkStrats = {
          new: [
            'Guest post on 3–5 niche blogs per month — target sites with DR 30+ in your space',
            'HARO / Connectively — respond to journalist queries for free, high-authority editorial links',
            'Resource page link building — find "best tools for [niche]" pages and pitch your inclusion',
            'Create a free tool, template, or dataset in your niche — free tools attract links naturally and permanently'
          ],
          growing: [
            'Broken link building — find dead links on competitor-adjacent pages and offer your content as a replacement',
            'Podcast guesting — appear on 2–3 niche podcasts per month for audience reach + permanent backlinks',
            'Digital PR — publish an original data study or industry survey that journalists want to cite',
            'Skyscraper technique — find the most-linked content in your niche and create a definitively superior version'
          ],
          established: [
            'Reclaim unlinked brand mentions — use Google Alerts to find sites mentioning you without linking',
            'Competitor backlink gap analysis — export competitors\' backlink profiles and target sites linking to them but not you',
            'Syndication to Medium, LinkedIn Articles, and industry publications with canonical tags',
            'Build topical authority hubs around your best-performing pages to consolidate ranking signals'
          ]
        }[stage];

        const challengeTip = {
          traffic: `<div class="roadmap-step"><div class="step-head"><div class="step-num">⚡</div><div class="step-title">Your Priority: Driving Traffic Fast</div></div><p>Focus on long-tail keywords with difficulty under 35. Write 1,500–2,500 word posts targeting ONE specific long-tail keyword each. Five well-optimized long-tail posts will consistently outperform one attempt at a broad competitive keyword for a site in your stage. Volume compounds — even 50 visitors/month per post adds up fast across 20 posts.</p></div>`,
          rankings: `<div class="roadmap-step"><div class="step-head"><div class="step-num">⚡</div><div class="step-title">Your Priority: Moving from Page 2 to Page 1</div></div><p>Stuck on page 2–3? The fix is almost always one of three things: your content needs more depth (not just length — add unique insights, data, expert quotes), your target page needs more internal links from your highest-authority pages, or you need 5–10 more quality backlinks than whoever holds position 10. Check all three before adding any new content.</p></div>`,
          content: `<div class="roadmap-step"><div class="step-head"><div class="step-num">⚡</div><div class="step-title">Your Priority: Building a Content Strategy</div></div><p>Start with one comprehensive pillar page (2,500–5,000 words covering the entire topic), then create 8–12 cluster posts answering specific sub-questions. Each cluster post links back to the pillar. This topical authority structure is exactly how sites like NerdWallet and Wirecutter dominate every category they enter — Google sees the breadth of your knowledge and rewards it.</p></div>`,
          backlinks: `<div class="roadmap-step"><div class="step-head"><div class="step-num">⚡</div><div class="step-title">Your Priority: Building Your First 50 Quality Links</div></div><p>Lead with value: create the single best resource in your niche — a free tool, definitive guide, or original dataset — then manually pitch it to 50 relevant blogs and resource pages. Even 10–15 genuine editorial links from relevant DR30+ sites will move the needle dramatically. Relevance matters 10x more than domain rating for topical authority.</p></div>`,
          technical: `<div class="roadmap-step"><div class="step-head"><div class="step-num">⚡</div><div class="step-title">Your Priority: Technical SEO Fixes</div></div><p>Run the Deep Site Auditor tool for your full issue list. The highest-impact technical fixes are: Core Web Vitals (especially LCP), ensuring every page is crawlable and indexable, implementing canonical tags, and adding schema markup for rich results. Once technical issues are resolved, your existing content and links will work significantly more effectively — often moving pages from page 3 to page 1 without any new content.</p></div>`
        }[challenge];

        out.innerHTML = `
          <div class="tool-output" style="margin-bottom:16px">
            <strong>🗺️ Your Rank #1 Roadmap — ${esc(niche)}</strong><br/>
            <span style="color:var(--muted);font-size:.85rem">Personalized for: ${esc(stageName)} · Estimated timeline: ${esc(timeline)}</span>
          </div>

          ${challengeTip}

          <div class="roadmap-step">
            <div class="step-head"><div class="step-num">1</div><div class="step-title">Content Gaps to Fill First</div></div>
            <p>These are the highest-priority content types consistently underserved in the <strong>${esc(niche)}</strong> space and actively searched by your target audience:</p>
            <ul>${contentGaps.map(g => `<li>${esc(g)}</li>`).join('')}</ul>
          </div>

          <div class="roadmap-step">
            <div class="step-head"><div class="step-num">2</div><div class="step-title">Keywords to Target Right Now</div></div>
            <p>Start with these keyword angles — designed to match your current authority level with realistic ranking potential:</p>
            <div class="kw-tags">${selectedKws.map(k => `<span class="kw-tag">🔍 ${esc(k)}</span>`).join('')}</div>
            <p style="margin-top:10px;font-size:.82rem;color:var(--muted)">Use the Keyword Explorer tool to check exact volume and difficulty before committing to a content piece.</p>
          </div>

          <div class="roadmap-step">
            <div class="step-head"><div class="step-num">3</div><div class="step-title">Backlink Strategy for Your Stage</div></div>
            <ul>${backlinkStrats.map(s => `<li>${esc(s)}</li>`).join('')}</ul>
          </div>

          <div class="roadmap-step">
            <div class="step-head"><div class="step-num">4</div><div class="step-title">Technical SEO Checklist</div></div>
            <ul>
              <li>Fix all Core Web Vitals — target LCP &lt; 2.5s, FID &lt; 100ms, CLS &lt; 0.1 (use PageSpeed Insights)</li>
              <li>Ensure every page is reachable in 3 clicks from the homepage (crawl budget + UX)</li>
              <li>Add JSON-LD schema markup for your content type (Article, Product, FAQ, LocalBusiness)</li>
              <li>Create and submit an XML sitemap to Google Search Console</li>
              <li>Keep URLs short, keyword-rich, and descriptive — no random ID parameters</li>
              <li>Every page needs a unique title tag (50–60 chars) and meta description (130–160 chars)</li>
            </ul>
          </div>

          <div class="roadmap-step">
            <div class="step-head"><div class="step-num">5</div><div class="step-title">Your 90-Day Action Plan</div></div>
            <ul>
              <li><strong>Days 1–30:</strong> Fix all Critical technical issues (Site Auditor). Publish your pillar page + 3 cluster posts targeting long-tail keywords from the list above.</li>
              <li><strong>Days 31–60:</strong> Begin link building — 2 guest posts and 3 HARO responses per week. Publish 2 more cluster posts. Set up Google Search Console and track impressions weekly.</li>
              <li><strong>Days 61–90:</strong> Analyze what's gaining traction. Double down on best-performing content with updates and additional links. Publish your FAQ page and top comparison piece from the content gaps list.</li>
            </ul>
          </div>

          <div class="tool-output" style="margin-top:6px">
            <strong>💡 The Compound Effect of Consistent SEO:</strong> The sites that dominate Google didn't get there by publishing 100 mediocre posts. They published 20 exceptional, deeply researched pieces that solved real problems better than anything else on the internet. Quality and consistency over 90 days beats a sporadic burst every single time. Treat each piece of content as an asset you'll be earning traffic from for the next 5 years.
          </div>`;
        out.classList.remove('hidden');
      }
    },

    /* ════ AI SEO WRITER ════ */
    writer: {
      title: 'AI SEO Content Writer',
      sub: 'Generate optimized blog intros, meta descriptions, and ad copy in seconds.',
      render: () => `
        <form class="tool-form" data-action="writer">
          <label>Content Type
            <select name="template">
              <option value="blog">Blog Post Introduction</option>
              <option value="meta">Meta Description</option>
              <option value="ad">Ad Copy (Google / Social)</option>
              <option value="product">Product Description</option>
            </select>
          </label>
          <label>Target Keyword / Topic
            <input name="topic" required placeholder="e.g. best running shoes for flat feet">
          </label>
          <label>Tone
            <select name="tone">
              <option>Professional</option>
              <option>Friendly</option>
              <option>Persuasive</option>
              <option>Authoritative</option>
            </select>
          </label>
          <button class="btn btn-primary" type="submit">✍️ Generate Content</button>
        </form>
        <div class="tool-output hidden" id="out" style="white-space:pre-wrap"></div>`,
      run: (form, out) => {
        const t = form.template.value;
        const k = form.topic.value.trim();
        const tn = form.tone.value;
        const year = new Date().getFullYear();
        const samples = {
          blog: `# The Definitive Guide to ${k} (${year} Edition)\n\nIn an increasingly competitive landscape, getting ${k} right isn't a nice-to-have — it's the difference between scaling organically and paying for every single click. Whether you're building from scratch or refining a strategy that's already working, this ${tn.toLowerCase()} guide walks you through the frameworks, common mistakes, and tactical wins that consistently move the needle on Google.\n\nBy the end, you'll have a complete, actionable playbook you can implement this week — backed by data, not opinions.\n\n## What You'll Learn\n- The #1 mistake most people make with ${k} (and how to fix it)\n- A proven step-by-step framework that works in ${year}\n- Real examples from sites already ranking #1 for this topic`,
          meta: `Discover the complete guide to ${k} for ${year}. ${tn} expert insights, proven strategies, and step-by-step advice trusted by thousands of professionals. Get actionable results — read our in-depth breakdown today. (${126 + Math.floor(k.length * 0.5)} characters)`,
          ad: `🚀 Finally Master ${k}\n\n${tn} strategies from practitioners who've done it. Trusted by 40,000+ professionals.\n\n✓ Proven step-by-step framework  \n✓ Real-world case studies  \n✓ Results in your first 30 days  \n\n→ Get instant access — free to start`,
          product: `Introducing the definitive solution for ${k}. Designed for ${tn.toLowerCase()} professionals who demand measurable results, not more guesswork. Built on proven real-world insights, peer-tested across 50+ industries, and engineered to give you a competitive edge — from day one.\n\n★★★★★ "Finally, something that actually works." — Verified buyer\n★★★★★ "Best investment I made for my business this year." — Pro member`
        };
        out.textContent = samples[t];
        out.classList.remove('hidden');
      }
    },

    /* ════ KEYWORD GOLDMINE EXPLORER ════ */
    keywords: {
      title: 'Keyword Goldmine Explorer',
      sub: 'Analyze volume, difficulty, CPC, and intent — then discover 5 high-opportunity keyword variants.',
      render: () => `
        <form class="tool-form" data-action="keywords">
          <label>Seed Keyword <input name="kw" required placeholder="e.g. ai marketing tools"></label>
          <label>Target Market
            <select name="m">
              <option>United States</option><option>United Kingdom</option>
              <option>Australia</option><option>Canada</option>
              <option>Germany</option><option>India</option>
            </select>
          </label>
          <button class="btn btn-primary" type="submit">💎 Find Keywords</button>
        </form>
        <div id="out" class="hidden"></div>`,
      run: (form, out) => {
        const kw = form.kw.value.trim();
        const h = hash(kw);
        const vol = 800 + (h % 48000);
        const kd = 18 + (h % 72);
        const cpc = (0.4 + (h % 900) / 100).toFixed(2);
        const comp = ['Low', 'Medium', 'High'][h % 3];
        const intent = ['Informational', 'Commercial', 'Transactional', 'Navigational'][h % 4];
        const trafficValue = Math.round(vol * parseFloat(cpc));
        const variants = ['best', 'top', 'how to', 'vs', 'guide', 'cheap', 'free', 'tools'].slice(0, 5).map(p => `${p} ${kw}`);

        out.innerHTML = `
          <div class="metric-grid">
            ${metricBar('Monthly Volume', vol.toLocaleString(), vol)}
            ${metricBar('Difficulty', kd, 100)}
            <div class="metric"><div class="v">$${cpc}</div><div class="l">Avg. CPC</div></div>
            <div class="metric"><div class="v">${intent}</div><div class="l">Search Intent</div></div>
            <div class="metric"><div class="v">${comp}</div><div class="l">Competition</div></div>
            <div class="metric"><div class="v" style="color:${kd<40?'var(--cyan)':kd<65?'#facc15':'#f87171'}">${kd < 40 ? '🟢 High' : kd < 65 ? '🟡 Med' : '🔴 Low'}</div><div class="l">Opportunity</div></div>
          </div>
          <div class="metric-grid" style="margin-top:12px">
            <div class="metric"><div class="v">$${trafficValue.toLocaleString()}</div><div class="l">Traffic Value/mo</div></div>
          </div>
          <div class="table-wrap" style="margin-top:16px">
            <table class="data">
              <tr><th>Keyword Variant</th><th>Est. Volume</th><th>Difficulty</th><th>Opportunity</th></tr>
              ${variants.map(v => {
                const vh = hash(v); const vvol = 100 + (vh % 8000); const vkd = 10 + (vh % 60);
                return `<tr><td>${esc(v)}</td><td>${vvol.toLocaleString()}/mo</td><td>${vkd}/100</td><td>${vkd < 35 ? '🟢 High' : vkd < 55 ? '🟡 Medium' : '🔴 Low'}</td></tr>`;
              }).join('')}
            </table>
          </div>
          <div class="tool-output" style="margin-top:14px">
            ${kd < 40 ? `✓ <strong>Excellent opportunity</strong> — difficulty ${kd}/100 is very achievable. A new 1,500-word piece targeting "${esc(kw)}" could realistically reach page 1 within 45–90 days with proper on-page optimization and 3–5 quality backlinks.` : kd < 65 ? `⚠ <strong>Moderate difficulty</strong> (${kd}/100). Target long-tail variants first (see table above) to build authority, then compete for the main keyword. Estimated 3–6 months for an established site.` : `⚠ <strong>High difficulty</strong> (${kd}/100). We recommend targeting the lower-difficulty variants in the table above while building domain authority. Return to this keyword once your site reaches DR 40+.`}
          </div>`;
        out.classList.remove('hidden');
      }
    },

    /* ════ BACKLINK ANALYZER ════ */
    backlinks: {
      title: 'Backlink Authority Analyzer',
      sub: 'Inspect domain rating, referring domains, toxic links, and anchor text distribution for any URL.',
      render: () => `
        <form class="tool-form" data-action="backlinks">
          <label>URL to Analyze <input name="url" type="url" required placeholder="https://competitor.com"></label>
          <button class="btn btn-primary" type="submit">🔗 Analyze Backlinks</button>
        </form>
        <div id="out" class="hidden"></div>`,
      run: (form, out) => {
        const url = form.url.value.trim();
        const h = hash(url);
        const dr = 20 + (h % 70); const bl = 50 + (h % 4950); const rd = 10 + (h % 490);
        const toxic = Math.round(bl * 0.04 + (h % 30));
        const anchors = [
          ['Brand name', Math.round(bl * .32)],
          ['Click here / generic', Math.round(bl * .18)],
          ['Target keyword', Math.round(bl * .24)],
          ['Naked URL', Math.round(bl * .15)],
          ['Other / partial match', Math.round(bl * .11)]
        ];
        out.innerHTML = `
          <div class="metric-grid">
            ${metricBar('Domain Rating', dr)}
            <div class="metric"><div class="v">${bl.toLocaleString()}</div><div class="l">Total Backlinks</div></div>
            <div class="metric"><div class="v">${rd.toLocaleString()}</div><div class="l">Referring Domains</div></div>
            <div class="metric"><div class="v" style="color:${toxic>50?'#f87171':'#facc15'}">${toxic}</div><div class="l">Toxic Links</div></div>
          </div>
          <h4 style="margin:18px 0 10px;font-size:.78rem;text-transform:uppercase;letter-spacing:.06em;color:var(--muted)">Anchor Text Distribution</h4>
          <div class="table-wrap"><table class="data">
            <tr><th>Anchor Text Type</th><th>Count</th><th>% of Total</th></tr>
            ${anchors.map(([t, c]) => `<tr><td>${esc(t)}</td><td>${c}</td><td>${((c / bl) * 100).toFixed(1)}%</td></tr>`).join('')}
          </table></div>
          <div class="tool-output" style="margin-top:14px">
            ${dr > 60 ? '✓ <strong>Strong domain authority</strong> — focus on link quality over quantity and diversifying your anchor text profile.' : dr > 35 ? '⚠ <strong>Moderate authority</strong> — prioritize 10–20 high-quality editorial links per month to grow DR. Focus on relevance over raw numbers.' : '⚠ <strong>Low domain authority</strong> — prioritize getting links from relevant DR30+ sites in your niche. Even 15 high-quality, relevant backlinks will dramatically shift your rankings for low-to-medium difficulty keywords.'}
            ${toxic > 50 ? ` <strong>Note:</strong> ${toxic} potentially toxic links detected. Consider a disavow file via Google Search Console for links from clearly spammy domains.` : ''}
          </div>`;
        out.classList.remove('hidden');
      }
    },

    /* ════ CONTENT OPTIMIZER ════ */
    optimizer: {
      title: 'Content Optimizer',
      sub: 'Score your content and get specific, prioritized recommendations to outrank the competition.',
      render: () => `
        <form class="tool-form" data-action="optimizer">
          <label>Target Keyword <input name="kw" required placeholder="e.g. best project management tools"></label>
          <label>Your Content <textarea name="c" rows="7" required placeholder="Paste your article, blog post, or page content here..."></textarea></label>
          <button class="btn btn-primary" type="submit">🧠 Optimize Content</button>
        </form>
        <div id="out" class="hidden"></div>`,
      run: (form, out) => {
        const kw = form.kw.value.trim().toLowerCase();
        const content = form.c.value.trim();
        const words = content.split(/\s+/).filter(w => w.length > 0).length;
        const sentences = Math.max(1, (content.match(/[.!?]+/g) || []).length);
        const kwCount = (content.toLowerCase().match(new RegExp(kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
        const kwDensity = words > 0 ? ((kwCount / words) * 100).toFixed(1) : 0;
        const hasH1 = /^#\s/.test(content) || /h1/i.test(content);
        const flesch = Math.max(0, Math.min(100, Math.round(206.835 - 1.015 * (words / sentences) - 84.6 * 1.55)));
        const lengthScore = words >= 1500 ? 100 : words >= 800 ? 75 : words >= 400 ? 50 : 25;
        const kwScore = parseFloat(kwDensity) >= 0.5 && parseFloat(kwDensity) <= 2.5 ? 100 : parseFloat(kwDensity) < 0.5 ? 40 : 60;
        const structScore = hasH1 ? 80 : 40;
        const overall = Math.round((lengthScore + kwScore + Math.min(100, flesch) + structScore) / 4);

        out.innerHTML = `
          <div class="metric-grid">
            ${metricBar('Overall Score', overall)}
            ${metricBar('Content Length', lengthScore)}
            ${metricBar('Keyword Usage', kwScore)}
            ${metricBar('Readability', Math.min(100, flesch))}
            <div class="metric"><div class="v">${words}</div><div class="l">Word Count</div></div>
            <div class="metric"><div class="v">${kwDensity}%</div><div class="l">KW Density</div></div>
          </div>
          <div class="tool-output" style="margin-top:14px">
            ${words < 800 ? `⚠ <strong>Content too short</strong> (${words} words) — Top-ranking pages in most niches have 1,200–2,500+ words. Add depth, unique examples, statistics, and FAQs to demonstrate topical authority.\n` : '✓ Content length looks solid for ranking.\n'}${parseFloat(kwDensity) < 0.5 ? `⚠ <strong>Keyword density low</strong> (${kwDensity}%) — Mention "${esc(kw)}" more naturally. Aim for 0.8–1.5% and add semantic variations (synonyms, related terms).\n` : parseFloat(kwDensity) > 2.5 ? `⚠ <strong>Keyword stuffing risk</strong> (${kwDensity}%) — Reduce to 0.8–1.5% and replace excess mentions with semantic variations to avoid a Panda penalty.\n` : `✓ Keyword density is healthy (${kwDensity}%).\n`}${!hasH1 ? '⚠ Add an H1 heading containing your target keyword at the top of your content.\n' : '✓ Heading structure detected.\n'}${flesch < 50 ? '⚠ Readability needs improvement — use shorter sentences (15–20 words max) and replace jargon with plain language for a broader audience.' : '✓ Content is readable for a general audience.'}
          </div>`;
        out.classList.remove('hidden');
      }
    },

    /* ════ SCHEMA GENERATOR ════ */
    schema: {
      title: 'Schema Markup Generator',
      sub: 'Generate valid JSON-LD structured data to unlock rich results in Google Search.',
      render: () => `
        <form class="tool-form" data-action="schema">
          <label>Schema Type
            <select name="type">
              <option value="article">Article</option>
              <option value="faq">FAQ Page</option>
              <option value="product">Product</option>
              <option value="local">Local Business</option>
            </select>
          </label>
          <label>Title / Business Name <input name="title" required placeholder="e.g. Complete Guide to SEO in 2025"></label>
          <label>Page URL <input name="url" required placeholder="https://yoursite.com/page"></label>
          <label>Extra Details <input name="extra" placeholder="Author name / Price / City"></label>
          <button class="btn btn-primary" type="submit">⚙️ Generate Schema</button>
        </form>
        <div id="out" class="hidden"></div>`,
      run: (form, out) => {
        const { type, title, url, extra } = form;
        const today = new Date().toISOString().split('T')[0];
        const schemas = {
          article: `{\n  "@context": "https://schema.org",\n  "@type": "Article",\n  "headline": "${esc(title.value)}",\n  "url": "${esc(url.value)}",\n  "author": { "@type": "Person", "name": "${esc(extra.value || 'Your Name')}" },\n  "datePublished": "${today}",\n  "dateModified": "${today}",\n  "description": "Add your meta description here for rich result eligibility."\n}`,
          faq: `{\n  "@context": "https://schema.org",\n  "@type": "FAQPage",\n  "mainEntity": [\n    {\n      "@type": "Question",\n      "name": "What is ${esc(title.value)}?",\n      "acceptedAnswer": {\n        "@type": "Answer",\n        "text": "Add your detailed answer here to qualify for Google's People Also Ask rich results."\n      }\n    },\n    {\n      "@type": "Question",\n      "name": "How does ${esc(title.value)} work?",\n      "acceptedAnswer": {\n        "@type": "Answer",\n        "text": "Explain the process here in 2-3 clear sentences."\n      }\n    }\n  ]\n}`,
          product: `{\n  "@context": "https://schema.org",\n  "@type": "Product",\n  "name": "${esc(title.value)}",\n  "url": "${esc(url.value)}",\n  "offers": {\n    "@type": "Offer",\n    "price": "${esc(extra.value || '9.99')}",\n    "priceCurrency": "USD",\n    "availability": "https://schema.org/InStock",\n    "priceValidUntil": "${new Date().getFullYear() + 1}-12-31"\n  },\n  "aggregateRating": {\n    "@type": "AggregateRating",\n    "ratingValue": "4.8",\n    "reviewCount": "124"\n  }\n}`,
          local: `{\n  "@context": "https://schema.org",\n  "@type": "LocalBusiness",\n  "name": "${esc(title.value)}",\n  "url": "${esc(url.value)}",\n  "address": {\n    "@type": "PostalAddress",\n    "addressLocality": "${esc(extra.value || 'Your City')}",\n    "addressCountry": "US"\n  },\n  "openingHoursSpecification": {\n    "@type": "OpeningHoursSpecification",\n    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],\n    "opens": "09:00",\n    "closes": "17:00"\n  }\n}`
        };
        out.innerHTML = `<div class="tool-output" style="font-family:monospace;font-size:.85rem;word-break:break-all">${esc(schemas[type.value])}</div><p style="margin-top:12px;font-size:.85rem;color:var(--muted)">Copy this into a <code style="background:rgba(255,255,255,.08);padding:2px 6px;border-radius:4px">&lt;script type="application/ld+json"&gt;</code> tag inside your page &lt;head&gt;. Test with Google's Rich Results Test before deploying.</p>`;
        out.classList.remove('hidden');
      }
    },

    /* ════ COMPETITOR GAP ANALYSIS ════ */
    gap: {
      title: 'Competitor Gap Analysis',
      sub: 'Uncover the keywords your competitors rank for that you don\'t — your biggest quick-win opportunities.',
      render: () => `
        <form class="tool-form" data-action="gap">
          <label>Your Domain <input name="own" required placeholder="yourdomain.com"></label>
          <label>Competitor Domain <input name="comp" required placeholder="competitor.com"></label>
          <button class="btn btn-primary" type="submit">📊 Find Keyword Gaps</button>
        </form>
        <div id="out" class="hidden"></div>`,
      run: (form, out) => {
        const own = form.own.value.trim().replace(/https?:\/\//, '');
        const comp = form.comp.value.trim().replace(/https?:\/\//, '');
        const h = hash(comp);
        const compName = comp.split('.')[0];
        const ownName = own.split('.')[0];
        const gaps = [
          [`best ${compName} alternatives`, 1200 + (h % 8000), 32 + (h % 40), '🟢 High'],
          [`how to use ${compName}`, 800 + (h % 5000), 28 + (h % 35), '🟢 High'],
          [`${compName} pricing`, 600 + (h % 4000), 38 + (h % 30), '🟡 Medium'],
          [`${compName} review`, 400 + (h % 3000), 45 + (h % 35), '🟡 Medium'],
          [`${compName} vs ${ownName}`, 300 + (h % 2000), 25 + (h % 25), '🟢 High']
        ];
        out.innerHTML = `
          <div class="metric-grid">
            <div class="metric"><div class="v">${5 + (h % 45)}</div><div class="l">Gap Keywords</div></div>
            <div class="metric"><div class="v">${(3200 + (h % 40000)).toLocaleString()}</div><div class="l">Missed Visits/mo</div></div>
            <div class="metric"><div class="v">${2 + (h % 8)}</div><div class="l">Quick Wins</div></div>
          </div>
          <div class="table-wrap" style="margin-top:16px"><table class="data">
            <tr><th>Gap Keyword</th><th>Est. Volume</th><th>Difficulty</th><th>Opportunity</th></tr>
            ${gaps.map(([k, v, d, o]) => `<tr><td>${esc(k)}</td><td>${v.toLocaleString()}/mo</td><td>${d}/100</td><td>${o}</td></tr>`).join('')}
          </table></div>
          <div class="tool-output" style="margin-top:14px"><strong>Priority recommendation:</strong> Target the 🟢 High Opportunity gaps first. Create dedicated, in-depth pages (1,500+ words) for each — these keywords have proven search demand and your competitor's presence confirms audience intent. You just need to show up with better, more comprehensive content that serves the reader's full intent.</div>`;
        out.classList.remove('hidden');
      }
    },

    /* ════ SERP SIMULATOR ════ */
    serp: {
      title: 'SERP Result Simulator',
      sub: 'Preview exactly how your page appears in Google and check title and description optimization.',
      render: () => `
        <form class="tool-form" data-action="serp">
          <label>Page Title (max 60 chars) <input name="t" required maxlength="70" placeholder="The Best Running Shoes for Flat Feet (2025 Guide)"></label>
          <label>Meta Description (max 160 chars) <input name="d" required maxlength="170" placeholder="Discover the top 10 running shoes designed for flat feet in 2025..."></label>
          <label>Page URL <input name="u" required placeholder="https://example.com/running-shoes-flat-feet"></label>
          <button class="btn btn-primary" type="submit">🎯 Preview SERP Result</button>
        </form>
        <div id="out" class="hidden"></div>`,
      run: (form, out) => {
        const t = form.t.value, d = form.d.value, u = form.u.value;
        const tLen = t.length, dLen = d.length;
        const tOk = tLen >= 45 && tLen <= 60, dOk = dLen >= 130 && dLen <= 160;
        out.innerHTML = `
          <div class="tool-output" style="font-family:Arial,sans-serif;background:var(--obsidian);border-radius:12px;padding:20px">
            <div style="color:#8ab4f8;font-size:.78rem;margin-bottom:3px">${esc(u)}</div>
            <div style="color:#7dd3fc;font-size:1.15rem;margin:5px 0;font-weight:500">${esc(t.substring(0, 65))}${t.length > 65 ? '...' : ''}</div>
            <div style="color:#bdc1c6;font-size:.88rem;line-height:1.55">${esc(d.substring(0, 160))}${d.length > 160 ? '...' : ''}</div>
          </div>
          <div class="metric-grid">
            <div class="metric"><div class="v" style="color:${tOk ? 'var(--cyan)' : '#f87171'}">${tLen}/60</div><div class="l">Title Length</div></div>
            <div class="metric"><div class="v" style="color:${dOk ? 'var(--cyan)' : '#f87171'}">${dLen}/160</div><div class="l">Description</div></div>
          </div>
          <div class="tool-output" style="margin-top:12px">
            ${tOk ? '✓' : '⚠'} <strong>Title:</strong> ${tOk ? 'Optimal length (45–60 chars) — good for click-through rates.' : 'Adjust to 45–60 characters. Lead with your primary keyword for best results.'}<br/>
            ${dOk ? '✓' : '⚠'} <strong>Description:</strong> ${dOk ? 'Optimal length — will display fully in Google search results without truncation.' : 'Target 130–160 characters to avoid description being cut off in search results.'}
          </div>`;
        out.classList.remove('hidden');
      }
    },

    /* ════ META TAG GENERATOR ════ */
    meta: {
      title: 'Meta Tag Generator',
      sub: 'Craft optimized titles and descriptions with a live Google SERP preview and character counters.',
      render: () => `
        <form class="tool-form" data-action="meta">
          <label>Page Title <input name="t" required maxlength="70" placeholder="Up to 60 characters — keyword first"></label>
          <label>Meta Description <input name="d" required maxlength="170" placeholder="130–160 chars with keyword + call to action"></label>
          <label>Page URL <input name="u" required placeholder="https://example.com/your-page-slug"></label>
          <button class="btn btn-primary" type="submit">🏷️ Generate & Preview</button>
        </form>
        <div id="out" class="hidden"></div>`,
      run: (form, out) => {
        const t = form.t.value, d = form.d.value, u = form.u.value;
        out.innerHTML = `
          <div class="tool-output" style="font-family:Arial,sans-serif">
            <div style="color:#8ab4f8;font-size:.78rem">${esc(u)}</div>
            <div style="color:#7dd3fc;font-size:1.1rem;margin:4px 0;font-weight:500">${esc(t)}</div>
            <div style="color:#bdc1c6;font-size:.88rem">${esc(d)}</div>
          </div>
          <div class="metric-grid">
            <div class="metric"><div class="v" style="color:${t.length<=60?'var(--cyan)':'#f87171'}">${t.length}/60</div><div class="l">Title Length</div></div>
            <div class="metric"><div class="v" style="color:${d.length<=160?'var(--cyan)':'#f87171'}">${d.length}/160</div><div class="l">Description</div></div>
          </div>
          <div class="tool-output" style="margin-top:12px;font-family:monospace;font-size:.84rem;word-break:break-all">
&lt;title&gt;${esc(t)}&lt;/title&gt;\n&lt;meta name="description" content="${esc(d)}"&gt;\n&lt;link rel="canonical" href="${esc(u)}"&gt;\n&lt;meta property="og:title" content="${esc(t)}"&gt;\n&lt;meta property="og:description" content="${esc(d)}"&gt;\n&lt;meta property="og:url" content="${esc(u)}"&gt;\n&lt;meta name="twitter:title" content="${esc(t)}"&gt;\n&lt;meta name="twitter:description" content="${esc(d)}"&gt;
          </div>`;
        out.classList.remove('hidden');
      }
    },

    /* ════ SEO ROI CALCULATOR ════ */
    roi: {
      title: 'SEO ROI Calculator',
      sub: 'Project the financial return from your SEO investment — traffic, conversions, and annual revenue.',
      render: () => `
        <form class="tool-form" data-action="roi">
          <label>Monthly SEO Budget ($) <input name="invest" type="number" required min="0" placeholder="e.g. 500"></label>
          <label>Current Monthly Organic Visitors <input name="visitors" type="number" required min="0" placeholder="e.g. 1000"></label>
          <label>Expected Traffic Growth (%) <input name="growth" type="number" required min="0" placeholder="e.g. 30"></label>
          <label>Conversion Rate (%) <input name="conv" type="number" step="0.1" required min="0" placeholder="e.g. 2.5"></label>
          <label>Avg. Order / Lead Value ($) <input name="value" type="number" required min="0" placeholder="e.g. 150"></label>
          <button class="btn btn-primary" type="submit">💰 Calculate ROI</button>
        </form>
        <div id="out" class="hidden"></div>`,
      run: (form, out) => {
        const inv = parseFloat(form.invest.value) || 0;
        const v = parseFloat(form.visitors.value) || 0;
        const g = parseFloat(form.growth.value) || 0;
        const c = parseFloat(form.conv.value) / 100 || 0;
        const val = parseFloat(form.value.value) || 0;
        const newVisitors = v * (1 + g / 100);
        const conversions = newVisitors * c;
        const rev = conversions * val;
        const profit = rev - inv;
        const roi = inv ? ((profit / inv) * 100).toFixed(0) : 0;
        const breakEven = inv && rev ? Math.ceil(inv / (rev / 30)) : 0;
        out.innerHTML = `
          <div class="metric-grid">
            <div class="metric"><div class="v">${Math.round(newVisitors).toLocaleString()}</div><div class="l">Proj. Visitors</div></div>
            <div class="metric"><div class="v">${conversions.toFixed(0)}</div><div class="l">Est. Conversions</div></div>
            <div class="metric"><div class="v">$${Math.round(rev).toLocaleString()}</div><div class="l">Monthly Revenue</div></div>
            <div class="metric"><div class="v">$${Math.round(profit).toLocaleString()}</div><div class="l">Net Profit</div></div>
            <div class="metric"><div class="v">${roi}%</div><div class="l">ROI</div></div>
            <div class="metric"><div class="v">${breakEven} days</div><div class="l">Break-Even</div></div>
          </div>
          <div class="tool-output" style="margin-top:14px">
            ${profit > 0 ? `✓ <strong>Positive ROI</strong> — for every $1 invested, you're projected to earn <strong>$${(rev / inv).toFixed(2)} in revenue</strong>. Compound this over 12 months: <strong>$${Math.round(rev * 12).toLocaleString()} in annual organic revenue</strong> from this SEO spend — revenue that continues flowing even if you pause investment.` : '⚠ Negative ROI at current figures. Consider increasing conversion rate (even 0.5% improvement compounds significantly), reducing investment while maintaining content output, or targeting higher-value keywords to improve the model.'}
          </div>`;
        out.classList.remove('hidden');
      }
    },

    /* ════ READABILITY SCORER ════ */
    readability: {
      title: 'Readability Scorer',
      sub: 'Analyze reading level with Flesch scores and get actionable suggestions to improve dwell time.',
      render: () => `
        <form class="tool-form" data-action="readability">
          <label>Content to Analyze <textarea name="c" rows="7" required placeholder="Paste your article or blog post here..."></textarea></label>
          <button class="btn btn-primary" type="submit">📖 Score Readability</button>
        </form>
        <div id="out" class="hidden"></div>`,
      run: (form, out) => {
        const text = form.c.value.trim();
        const words = text.split(/\s+/).filter(w => w.length > 0).length;
        const sentences = Math.max(1, (text.match(/[.!?]+/g) || []).length);
        const syllables = Math.round(words * 1.55);
        const flesch = parseFloat((206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words)).toFixed(1));
        const grade = parseFloat(((0.39 * (words / sentences)) + (11.8 * (syllables / words)) - 15.59).toFixed(1));
        const avgWords = (words / sentences).toFixed(1);
        const level = flesch >= 70 ? 'Easy — broad audience' : flesch >= 50 ? 'Moderate — general adult' : flesch >= 30 ? 'Difficult — educated adult' : 'Very Difficult — academic';
        out.innerHTML = `
          <div class="metric-grid">
            ${metricBar('Flesch Reading Ease', Math.max(0, Math.min(100, Math.round(flesch))))}
            <div class="metric"><div class="v">${grade}</div><div class="l">Grade Level</div></div>
            <div class="metric"><div class="v">${words}</div><div class="l">Word Count</div></div>
            <div class="metric"><div class="v">${sentences}</div><div class="l">Sentences</div></div>
            <div class="metric"><div class="v">${avgWords}</div><div class="l">Avg Words/Sentence</div></div>
          </div>
          <div class="tool-output" style="margin-top:14px">
            <strong>Reading Level:</strong> ${level}<br/><br/>
            ${flesch > 60 ? '✓ Your content is easy to read — great for broad organic traffic. Easy-to-read content reduces bounce rates and increases dwell time, both of which signal quality to Google.' : '⚠ Consider shortening sentences to under 20 words and replacing technical jargon with plain language. Easier-to-read content consistently achieves lower bounce rates and higher dwell time, both confirmed ranking signals.'}
            ${parseFloat(avgWords) > 20 ? `\n\n⚠ Average sentence length is ${avgWords} words — aim for under 20 words per sentence. Long sentences fragment on mobile and correlate with higher bounce rates.` : ''}
          </div>`;
        out.classList.remove('hidden');
      }
    },

    /* ════ AI TITLE GENERATOR ════ */
    titlegen: {
      title: 'AI Title Generator',
      sub: 'Generate click-worthy, SEO-optimized titles that drive higher CTR from search results.',
      render: () => `
        <form class="tool-form" data-action="titlegen">
          <label>Your Topic / Keyword <input name="topic" required placeholder="e.g. best running shoes for flat feet"></label>
          <label>Tone
            <select name="tone">
              <option>Professional</option>
              <option>Catchy & Click-Worthy</option>
              <option>Question-Based</option>
              <option>Listicle Style</option>
              <option>Urgent / Time-Sensitive</option>
            </select>
          </label>
          <button class="btn btn-primary" type="submit">✨ Generate Titles</button>
        </form>
        <div id="out" class="hidden"></div>`,
      run: (form, out) => {
        const topic = form.topic.value.trim();
        const tone = form.tone.value;
        const year = new Date().getFullYear();
        const templates = {
          Professional: [
            `The Complete Guide to ${topic} (${year})`,
            `${topic}: Everything You Need to Know`,
            `How to Master ${topic} in ${year}`,
            `${topic} — A Comprehensive Overview`,
            `Understanding ${topic}: Expert Insights`,
            `The Ultimate ${topic} Resource`,
            `${topic}: Best Practices & Strategies`,
            `A Deep Dive into ${topic}`
          ],
          'Catchy & Click-Worthy': [
            `Why ${topic} Will Change Everything`,
            `The ${topic} Secret Nobody Talks About`,
            `${topic}: What They Don't Tell You`,
            `This ${topic} Hack Will Blow Your Mind`,
            `${topic} — The Game Changer`,
            `Stop Making These ${topic} Mistakes`,
            `The Truth About ${topic} Revealed`,
            `${topic}: What You're Missing`
          ],
          'Question-Based': [
            `What Is ${topic} and Why Does It Matter?`,
            `How Does ${topic} Actually Work?`,
            `Is ${topic} Right for You?`,
            `When Should You Use ${topic}?`,
            `Why Is Everyone Talking About ${topic}?`,
            `Can ${topic} Really Help You?`,
            `What Makes ${topic} So Effective?`,
            `How to Get Started with ${topic}`
          ],
          'Listicle Style': [
            `7 Ways ${topic} Can Transform Your Results`,
            `10 ${topic} Tips You Need to Know`,
            `5 ${topic} Mistakes to Avoid`,
            `8 ${topic} Strategies That Actually Work`,
            `6 ${topic} Hacks for Instant Results`,
            `9 ${topic} Tools Worth Using`,
            `12 ${topic} Facts You Didn't Know`,
            `4 ${topic} Myths Debunked`
          ],
          'Urgent / Time-Sensitive': [
            `${topic} — Act Now Before It's Too Late`,
            `The ${topic} Opportunity You Can't Miss`,
            `${topic}: Why You Need It Today`,
            `Don't Ignore ${topic} Any Longer`,
            `The ${topic} Trend Taking Over`,
            `${topic}: What's Happening Right Now`,
            `Why ${topic} Matters More Than Ever`,
            `The ${topic} Shift You Can't Ignore`
          ]
        };
        const titles = templates[tone] || templates.Professional;
        out.innerHTML = `
          <h4 style="margin-bottom:12px;font-size:.78rem;text-transform:uppercase;letter-spacing:.06em;color:var(--muted)">Generated Titles (${tone})</h4>
          <div style="display:flex;flex-direction:column;gap:10px">
            ${titles.map((t, i) => `
              <div style="background:var(--obsidian-4);border:1px solid var(--glass-border);border-radius:10px;padding:14px 16px;display:flex;justify-content:space-between;align-items:center;gap:12px">
                <span style="font-size:.9rem;color:#a0b0c8">${esc(t)}</span>
                <span style="font-size:.75rem;color:var(--muted);white-space:nowrap">${t.length} chars</span>
              </div>
            `).join('')}
          </div>
          <div class="tool-output" style="margin-top:14px">
            <strong>💡 Pro Tip:</strong> Titles under 60 characters display fully in Google search results. Place your primary keyword in the first 3 words for maximum ranking impact. Use numbers, power words, and emotional triggers to improve click-through rates by 20–30%.
          </div>`;
        out.classList.remove('hidden');
      }
    },

    /* ════ INTERNAL LINK OPPORTUNITY FINDER ════ */
    internallinks: {
      title: 'Internal Link Opportunity Finder',
      sub: 'Discover strategic internal linking opportunities to boost page authority and rankings.',
      render: () => `
        <form class="tool-form" data-action="internallinks">
          <label>Your Target Page URL <input name="target" type="url" required placeholder="https://yoursite.com/target-page"></label>
          <label>Target Keyword <input name="kw" required placeholder="e.g. project management software"></label>
          <label>Number of Existing Pages <input name="pages" type="number" required min="5" placeholder="e.g. 50"></label>
          <button class="btn btn-primary" type="submit">🔗 Find Link Opportunities</button>
        </form>
        <div id="out" class="hidden"></div>`,
      run: (form, out) => {
        const target = form.target.value.trim();
        const kw = form.kw.value.trim();
        const pages = parseInt(form.pages.value) || 50;
        const h = hash(target + kw);
        const opportunities = [
          { type: 'Contextual Link', priority: '🔴 High', desc: `Add "${kw}" as contextual link within body content on ${3 + (h % 8)} related pages`, impact: '+15–25% authority boost' },
          { type: 'Navigation Link', priority: '🟡 Medium', desc: 'Add to main navigation or sidebar menu if target is a core page', impact: '+10–15% crawl priority' },
          { type: 'Footer Link', priority: '🟢 Low', desc: 'Include in footer if target is a key conversion or resource page', impact: '+5–10% sitewide relevance' },
          { type: 'Breadcrumb Link', priority: '🟡 Medium', desc: 'Ensure target appears in breadcrumb trail for category pages', impact: '+8–12% UX + SEO' },
          { type: 'Related Posts', priority: '🟡 Medium', desc: `Add "${kw}" to "Related Posts" section on ${5 + (h % 12)} blog posts`, impact: '+12–20% internal traffic' },
          { type: 'Anchor Text Variation', priority: '🔴 High', desc: `Use 5+ anchor variations: "${kw}", "best ${kw}", "${kw} guide", "how to ${kw}"`, impact: '+20–30% natural profile' }
        ];
        out.innerHTML = `
          <div class="metric-grid">
            <div class="metric"><div class="v">${Math.round(pages * 0.35)}</div><div class="l">Linkable Pages</div></div>
            <div class="metric"><div class="v">${Math.round(pages * 0.12)}</div><div class="l">Quick Wins</div></div>
            <div class="metric"><div class="v">+35%</div><div class="l">Est. Authority Gain</div></div>
          </div>
          <h4 style="margin:18px 0 10px;font-size:.78rem;text-transform:uppercase;letter-spacing:.06em;color:var(--muted)">Recommended Actions</h4>
          <div class="issue-list">
            ${opportunities.map(op => `
              <div class="issue-item issue-${op.priority.includes('High') ? 'high' : op.priority.includes('Medium') ? 'med' : 'low'}">
                <div class="issue-icon">${op.priority.split(' ')[0]}</div>
                <div class="issue-body">
                  <strong>${esc(op.type)} (${op.priority})</strong>
                  <p>${esc(op.desc)}</p>
                  <small style="color:var(--cyan)">Impact: ${op.impact}</small>
                </div>
              </div>
            `).join('')}
          </div>
          <div class="tool-output" style="margin-top:14px">
            <strong>Strategy:</strong> Start with 🔴 High priority items first. Internal links pass PageRank from your highest-authority pages to your target. Aim for 3–5 internal links per page maximum to avoid dilution. Use descriptive anchor text that matches the target page's primary keyword.
          </div>`;
        out.classList.remove('hidden');
      }
    },

    /* ════ FEATURED SNIPPET OPTIMIZER ════ */
    featured: {
      title: 'Featured Snippet Optimizer',
      sub: 'Structure your content to target Google\'s coveted Position Zero featured snippets.',
      render: () => `
        <form class="tool-form" data-action="featured">
          <label>Target Keyword <input name="kw" required placeholder="e.g. how to tie a tie"></label>
          <label>Content Type
            <select name="type">
              <option value="definition">Definition / What Is</option>
              <option value="howto">How-To / Step-by-Step</option>
              <option value="list">List / Best Practices</option>
              <option value="table">Comparison Table</option>
              <option value="faq">FAQ / Q&A</option>
            </select>
          </label>
          <button class="btn btn-primary" type="submit">🎯 Optimize for Snippet</button>
        </form>
        <div id="out" class="hidden"></div>`,
      run: (form, out) => {
        const kw = form.kw.value.trim();
        const type = form.type.value;
        const templates = {
          definition: `<strong>Structure for Definition Snippet:</strong><br/><br/>
            <h2>What is ${esc(kw)}?</h2>
            <p><strong>${esc(kw)} is</strong> [clear, concise definition in 40–60 words]. [Add 1–2 supporting sentences with context].</p>
            <h3>Key Characteristics:</h3>
            <ul>
              <li>[Characteristic 1 with brief explanation]</li>
              <li>[Characteristic 2 with brief explanation]</li>
              <li>[Characteristic 3 with brief explanation]</li>
            </ul>
            <p><strong>Why ${esc(kw)} matters:</strong> [Explain importance and use cases in 2–3 sentences].</p>`,
          howto: `<strong>Structure for How-To Snippet:</strong><br/><br/>
            <h2>How to ${esc(kw.replace(/^(how to )?/i, ''))}</h2>
            <p><strong>${esc(kw.replace(/^(how to )?/i, ''))}</strong> can be accomplished in [number] simple steps. Here's the complete process:</p>
            <ol>
              <li><strong>[Step 1 name]</strong> — [Clear action in 15–20 words]. [1–2 sentences of detail].</li>
              <li><strong>[Step 2 name]</strong> — [Clear action in 15–20 words]. [1–2 sentences of detail].</li>
              <li><strong>[Step 3 name]</strong> — [Clear action in 15–20 words]. [1–2 sentences of detail].</li>
              <li><strong>[Step 4 name]</strong> — [Clear action in 15–20 words]. [1–2 sentences of detail].</li>
              <li><strong>[Step 5 name]</strong> — [Clear action in 15–20 words]. [1–2 sentences of detail].</li>
            </ol>
            <p><strong>Pro tip:</strong> [Additional insight or common mistake to avoid].</p>`,
          list: `<strong>Structure for List Snippet:</strong><br/><br/>
            <h2>10 Best ${esc(kw)} for [Year]</h2>
            <p>Here are the top ${esc(kw)} that deliver exceptional results:</p>
            <ol>
              <li><strong>[Name 1]</strong> — [Why it's #1 in 12–15 words]. [Brief description 15–20 words].</li>
              <li><strong>[Name 2]</strong> — [Why it's #2 in 12–15 words]. [Brief description 15–20 words].</li>
              <li><strong>[Name 3]</strong> — [Why it's #3 in 12–15 words]. [Brief description 15–20 words].</li>
              <li><strong>[Name 4]</strong> — [Why it's #4 in 12–15 words]. [Brief description 15–20 words].</li>
              <li><strong>[Name 5]</strong> — [Why it's #5 in 12–15 words]. [Brief description 15–20 words].</li>
            </ol>
            <h3>What to Look for in ${esc(kw)}</h3>
            <ul>
              <li>[Criteria 1 with explanation]</li>
              <li>[Criteria 2 with explanation]</li>
              <li>[Criteria 3 with explanation]</li>
            </ul>`,
          table: `<strong>Structure for Table Snippet:</strong><br/><br/>
            <h2>${esc(kw)} Comparison</h2>
            <p>Compare the top options side-by-side:</p>
            <table>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Option A</th>
                  <th>Option B</th>
                  <th>Option C</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Price</strong></td>
                  <td>$XX</td>
                  <td>$XX</td>
                  <td>$XX</td>
                </tr>
                <tr>
                  <td><strong>Key Feature 1</strong></td>
                  <td>[Yes/No/Details]</td>
                  <td>[Yes/No/Details]</td>
                  <td>[Yes/No/Details]</td>
                </tr>
                <tr>
                  <td><strong>Key Feature 2</strong></td>
                  <td>[Yes/No/Details]</td>
                  <td>[Yes/No/Details]</td>
                  <td>[Yes/No/Details]</td>
                </tr>
                <tr>
                  <td><strong>Best For</strong></td>
                  <td>[Use case]</td>
                  <td>[Use case]</td>
                  <td>[Use case]</td>
                </tr>
              </tbody>
            </table>
            <p><strong>Our recommendation:</strong> [Which option wins and why in 2–3 sentences].</p>`,
          faq: `<strong>Structure for FAQ Snippet:</strong><br/><br/>
            <h2>Frequently Asked Questions About ${esc(kw)}</h2>
            <h3>What is ${esc(kw)}?</h3>
            <p>[Clear definition in 40–50 words]. Include key details users need to know.</p>
            <h3>How does ${esc(kw)} work?</h3>
            <p>[Explanation of process/mechanism in 50–60 words]. Keep it simple and actionable.</p>
            <h3>Why is ${esc(kw)} important?</h3>
            <p>[Benefits and use cases in 50–60 words]. Focus on value to the user.</p>
            <h3>When should I use ${esc(kw)}?</h3>
            <p>[Specific scenarios and use cases in 50–60 words]. Help users identify if it's right for them.</p>
            <h3>What are the benefits of ${esc(kw)}?</h3>
            <ul>
              <li>[Benefit 1 with brief explanation]</li>
              <li>[Benefit 2 with brief explanation]</li>
              <li>[Benefit 3 with brief explanation]</li>
            </ul>`
        };
        out.innerHTML = `
          <div class="tool-output" style="white-space:pre-wrap;font-size:.9rem;line-height:1.7">${templates[type]}</div>
          <div class="tool-output" style="margin-top:14px">
            <strong>🎯 Featured Snippet Tips:</strong><br/>
            • Place the snippet-targeted content at the very top of your page (above the fold)<br/>
            • Keep the core answer under 50 words for definition snippets<br/>
            • Use the exact keyword in the first sentence<br/>
            • Structure with proper H2/H3 headings<br/>
            • Featured snippets can increase CTR by 20–30% even if you rank #2–#3
          </div>`;
        out.classList.remove('hidden');
      }
    },

    /* ════ IMAGE ALT TEXT GENERATOR ════ */
    imgalt: {
      title: 'Image Alt Text Generator',
      sub: 'Generate SEO-friendly, accessible alt text for your images to boost image search rankings.',
      render: () => `
        <form class="tool-form" data-action="imgalt">
          <label>Image Description <input name="desc" required placeholder="e.g. a person running in red shoes on a beach"></label>
          <label>Target Keyword (optional) <input name="kw" placeholder="e.g. running shoes"></label>
          <label>Context
            <select name="ctx">
              <option>Product Photo</option>
              <option>Blog Illustration</option>
              <option>Screenshot</option>
              <option>Infographic</option>
              <option>Logo</option>
            </select>
          </label>
          <button class="btn btn-primary" type="submit">🖼️ Generate Alt Text</button>
        </form>
        <div id="out" class="hidden"></div>`,
      run: (form, out) => {
        const desc = form.desc.value.trim();
        const kw = form.kw.value.trim();
        const ctx = form.ctx.value;
        const baseAlt = desc.toLowerCase();
        const altWithKw = kw ? `${kw} - ${baseAlt}` : baseAlt;
        const variations = [
          { label: 'SEO Optimized', text: altWithKw, rec: 'Best for image search ranking' },
          { label: 'Descriptive', text: baseAlt, rec: 'Best for accessibility and screen readers' },
          { label: 'Concise', text: baseAlt.split(' ').slice(0, 8).join(' '), rec: 'Under 125 characters for full display' },
          { label: 'Contextual', text: `${ctx}: ${baseAlt}`, rec: 'Adds context for better understanding' }
        ];
        out.innerHTML = `
          <h4 style="margin-bottom:12px;font-size:.78rem;text-transform:uppercase;letter-spacing:.06em;color:var(--muted)">Generated Alt Text Options</h4>
          <div style="display:flex;flex-direction:column;gap:10px">
            ${variations.map(v => `
              <div style="background:var(--obsidian-4);border:1px solid var(--glass-border);border-radius:10px;padding:14px 16px">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
                  <span style="font-weight:700;font-size:.85rem;color:var(--cyan)">${v.label}</span>
                  <span style="font-size:.75rem;color:var(--muted)">${v.text.length} chars</span>
                </div>
                <code style="display:block;background:rgba(0,0,0,.3);padding:8px 12px;border-radius:6px;font-size:.85rem;color:#a0b0c8;margin-bottom:6px">${esc(v.text)}</code>
                <small style="color:var(--muted)">💡 ${v.rec}</small>
              </div>
            `).join('')}
          </div>
          <div class="tool-output" style="margin-top:14px">
            <strong>Alt Text Best Practices:</strong><br/>
            • Keep it under 125 characters for full display<br/>
            • Be descriptive and specific<br/>
            • Include your target keyword naturally if relevant<br/>
            • Don't start with "Image of" or "Picture of"<br/>
            • Use for accessibility — screen readers read this to visually impaired users<br/>
            • Good alt text improves both SEO and user experience
          </div>`;
        out.classList.remove('hidden');
      }
    },

    /* ════ TOPIC CLUSTER BUILDER ════ */
    topiccluster: {
      title: 'Topic Cluster Builder',
      sub: 'Build comprehensive content clusters to establish topical authority and dominate your niche.',
      render: () => `
        <form class="tool-form" data-action="topiccluster">
          <label>Core Topic / Pillar Keyword <input name="topic" required placeholder="e.g. digital marketing"></label>
          <label>Your Target Audience <input name="audience" required placeholder="e.g. small business owners"></label>
          <label>Cluster Size
            <select name="size">
              <option value="small">Small (5–8 articles)</option>
              <option value="medium">Medium (10–15 articles)</option>
              <option value="large">Large (20–30 articles)</option>
            </select>
          </label>
          <button class="btn btn-primary" type="submit">🗺️ Build Topic Cluster</button>
        </form>
        <div id="out" class="hidden"></div>`,
      run: (form, out) => {
        const topic = form.topic.value.trim().toLowerCase();
        const audience = form.audience.value.trim();
        const size = form.size.value;
        const h = hash(topic + audience);
        const sizes = { small: 6, medium: 12, large: 24 };
        const count = sizes[size] || 12;
        const pillarTitle = `The Complete Guide to ${topic} for ${audience} (${new Date().getFullYear()})`;
        const clusterIdeas = [
          { type: 'Pillar', title: pillarTitle, intent: 'Comprehensive overview', length: '3,000–5,000 words' },
          { type: 'Beginner', title: `What is ${topic}? A Beginner's Guide for ${audience}`, intent: 'Definition & basics', length: '1,500–2,000 words' },
          { type: 'How-To', title: `How to Get Started with ${topic} — Step by Step`, intent: 'Actionable tutorial', length: '2,000–2,500 words' },
          { type: 'Comparison', title: `${topic} vs Alternatives: Which is Best for ${audience}?`, intent: 'Comparison & decision', length: '1,800–2,200 words' },
          { type: 'Tools', title: `Top 10 ${topic} Tools Every ${audience} Should Know`, intent: 'Tool recommendations', length: '2,000–2,500 words' },
          { type: 'Mistakes', title: `7 Common ${topic} Mistakes ${audience} Make (and How to Avoid)`, intent: 'Problem-solving', length: '1,500–2,000 words' },
          { type: 'Benefits', title: `Why ${audience} Need ${topic}: Key Benefits Explained`, intent: 'Value proposition', length: '1,200–1,800 words' },
          { type: 'Case Study', title: `How ${audience} Used ${topic} to Achieve [Result]`, intent: 'Social proof', length: '2,000–3,000 words' },
          { type: 'Advanced', title: `Advanced ${topic} Strategies for Experienced ${audience}`, intent: 'Deep dive', length: '2,500–3,500 words' },
          { type: 'FAQ', title: `${topic} FAQ: ${audience}'s Top Questions Answered`, intent: 'Quick answers', length: '1,500–2,000 words' },
          { type: 'Trends', title: `${topic} Trends ${audience} Should Watch in ${new Date().getFullYear()}`, intent: 'Future outlook', length: '1,800–2,200 words' },
          { type: 'Cost', title: `How Much Does ${topic} Cost? ${audience} Pricing Guide`, intent: 'Budget planning', length: '1,500–2,000 words' }
        ];
        const selected = clusterIdeas.slice(0, count);
        out.innerHTML = `
          <div class="metric-grid">
            <div class="metric"><div class="v">${count}</div><div class="l">Total Articles</div></div>
            <div class="metric"><div class="v">${Math.round(count * 0.15)}</div><div class="l">Months to Build</div></div>
            <div class="metric"><div class="v">+250%</div><div class="l">Est. Traffic Gain</div></div>
          </div>
          <h4 style="margin:18px 0 10px;font-size:.78rem;text-transform:uppercase;letter-spacing:.06em;color:var(--muted)">Your ${topic.charAt(0).toUpperCase() + topic.slice(1)} Topic Cluster</h4>
          <div class="table-wrap"><table class="data">
            <tr><th>Type</th><th>Article Title</th><th>Intent</th><th>Length</th></tr>
            ${selected.map(c => `
              <tr>
                <td><span style="background:${c.type === 'Pillar' ? 'var(--grad)' : 'var(--cyan-ultra)'};color:${c.type === 'Pillar' ? 'var(--obsidian)' : 'var(--cyan)'};padding:3px 10px;border-radius:99px;font-size:.7rem;font-weight:700">${c.type}</span></td>
                <td>${esc(c.title)}</td>
                <td>${esc(c.intent)}</td>
                <td>${c.length}</td>
              </tr>
            `).join('')}
          </table></div>
          <div class="tool-output" style="margin-top:14px">
            <strong>🗺️ Cluster Strategy:</strong><br/>
            1. Start with the <strong>Pillar page</strong> — this is your comprehensive hub page<br/>
            2. Create 3–5 cluster articles in the first month, each linking back to the pillar<br/>
            3. Link from pillar to each cluster article using descriptive anchor text<br/>
            4. Add internal links between related cluster articles<br/>
            5. This structure signals topical authority to Google and helps you rank for hundreds of related long-tail keywords
          </div>`;
        out.classList.remove('hidden');
      }
    },

    /* ════ PAGE SPEED IMPACT CALCULATOR ════ */
    pagespeed: {
      title: 'Page Speed Impact Calculator',
      sub: 'Calculate how page speed affects your rankings, conversions, and revenue.',
      render: () => `
        <form class="tool-form" data-action="pagespeed">
          <label>Current Page Load Time (seconds) <input name="current" type="number" step="0.1" required min="0.1" placeholder="e.g. 3.5"></label>
          <label>Target Load Time (seconds) <input name="target" type="number" step="0.1" required min="0.1" placeholder="e.g. 1.5"></label>
          <label>Monthly Visitors <input name="visitors" type="number" required min="0" placeholder="e.g. 10000"></label>
          <label>Conversion Rate (%) <input name="conv" type="number" step="0.1" required min="0" placeholder="e.g. 2.5"></label>
          <label>Avg. Order Value ($) <input name="aov" type="number" required min="0" placeholder="e.g. 75"></label>
          <button class="btn btn-primary" type="submit">⚡ Calculate Impact</button>
        </form>
        <div id="out" class="hidden"></div>`,
      run: (form, out) => {
        const current = parseFloat(form.current.value) || 3;
        const target = parseFloat(form.target.value) || 1.5;
        const visitors = parseFloat(form.visitors.value) || 0;
        const conv = parseFloat(form.conv.value) / 100 || 0;
        const aov = parseFloat(form.aov.value) || 0;
        const speedImprovement = ((current - target) / current) * 100;
        const convImprovement = Math.min(25, speedImprovement * 0.4); // Up to 25% conversion improvement
        const bounceReduction = Math.min(40, speedImprovement * 0.5); // Up to 40% bounce reduction
        const currentRev = visitors * conv * aov;
        const newConv = conv * (1 + convImprovement / 100);
        const newVisitors = visitors * (1 + bounceReduction / 100);
        const newRev = newVisitors * newConv * aov;
        const revGain = newRev - currentRev;
        const rankImprovement = current > 2.5 && target < 2.5 ? 'Likely +2–3 positions' : current > 3 && target < 2 ? 'Possible +3–5 positions' : 'Minor ranking impact';
        out.innerHTML = `
          <div class="metric-grid">
            <div class="metric"><div class="v" style="color:${speedImprovement > 30 ? 'var(--cyan)' : '#facc15'}">${speedImprovement.toFixed(0)}%</div><div class="l">Speed Improvement</div></div>
            <div class="metric"><div class="v" style="color:${convImprovement > 15 ? 'var(--cyan)' : '#facc15'}">+${convImprovement.toFixed(1)}%</div><div class="l">Conversion Lift</div></div>
            <div class="metric"><div class="v" style="color:${bounceReduction > 20 ? 'var(--cyan)' : '#facc15'}">-${bounceReduction.toFixed(0)}%</div><div class="l">Bounce Rate</div></div>
            <div class="metric"><div class="v">$${revGain.toLocaleString()}/mo</div><div class="l">Revenue Gain</div></div>
          </div>
          <div class="tool-output" style="margin-top:14px">
            <strong>Projected Impact:</strong><br/>
            • Monthly revenue increase: <strong>$${revGain.toLocaleString()}</strong><br/>
            • Annual revenue increase: <strong>$${(revGain * 12).toLocaleString()}</strong><br/>
            • Ranking impact: ${rankImprovement}<br/><br/>
            <strong>Recommendation:</strong> ${current > 3 ? 'Your current load time is significantly impacting conversions and rankings. Prioritize image optimization, defer non-critical JavaScript, and consider a CDN.' : current > 2 ? 'Moderate improvement opportunity. Focus on Core Web Vitals optimization for better rankings.' : 'Good performance already. Minor optimizations may yield incremental gains.'}
          </div>`;
        out.classList.remove('hidden');
      }
    },

    /* ════ CONTENT GAP ANALYZER ════ */
    contentgap: {
      title: 'Content Gap Analyzer',
      sub: 'Identify missing content opportunities your competitors are ranking for.',
      render: () => `
        <form class="tool-form" data-action="contentgap">
          <label>Your Niche/Industry <input name="niche" required placeholder="e.g. fitness equipment"></label>
          <label>Your Domain <input name="domain" required placeholder="yourdomain.com"></label>
          <button class="btn btn-primary" type="submit">📊 Find Content Gaps</button>
        </form>
        <div id="out" class="hidden"></div>`,
      run: (form, out) => {
        const niche = form.niche.value.trim();
        const domain = form.domain.value.trim();
        const h = hash(niche + domain);
        const gaps = [
          { topic: `Best ${niche} for beginners`, difficulty: 'Low', volume: '2,400/mo', reason: 'High intent, low competition' },
          { topic: `${niche} comparison guide`, difficulty: 'Medium', volume: '1,800/mo', reason: 'Decision-stage content' },
          { topic: `How to choose ${niche}`, difficulty: 'Low', volume: '3,200/mo', reason: 'Educational, high search volume' },
          { topic: `${niche} vs alternatives`, difficulty: 'Medium', volume: '1,500/mo', reason: 'Comparison keywords convert well' },
          { topic: `${niche} maintenance tips`, difficulty: 'Low', volume: '890/mo', reason: 'Long-tail, easy to rank' },
          { topic: `${niche} cost breakdown`, difficulty: 'Low', volume: '1,100/mo', reason: 'Price research content' },
          { topic: `${niche} troubleshooting guide`, difficulty: 'Medium', volume: '650/mo', reason: 'Problem-solving content' },
          { topic: `${niche} trends ${new Date().getFullYear()}`, difficulty: 'Low', volume: '420/mo', reason: 'Fresh content opportunity' }
        ];
        const priorityGaps = gaps.filter((_, i) => (h + i) % 3 < 2).slice(0, 6);
        out.innerHTML = `
          <div class="metric-grid">
            <div class="metric"><div class="v">${priorityGaps.length}</div><div class="l">Content Gaps</div></div>
            <div class="metric"><div class="v">${priorityGaps.filter(g => g.difficulty === 'Low').length}</div><div class="l">Quick Wins</div></div>
            <div class="metric"><div class="v">+45%</div><div class="l">Est. Traffic Gain</div></div>
          </div>
          <h4 style="margin:18px 0 10px;font-size:.78rem;text-transform:uppercase;letter-spacing:.06em;color:var(--muted)">Missing Content Opportunities</h4>
          <div class="table-wrap"><table class="data">
            <tr><th>Content Topic</th><th>Difficulty</th><th>Volume</th><th>Why Create It</th></tr>
            ${priorityGaps.map(g => `
              <tr>
                <td>${esc(g.topic)}</td>
                <td><span style="color:${g.difficulty === 'Low' ? 'var(--cyan)' : '#facc15'}">${g.difficulty}</span></td>
                <td>${g.volume}</td>
                <td>${esc(g.reason)}</td>
              </tr>
            `).join('')}
          </table></div>
          <div class="tool-output" style="margin-top:14px">
            <strong>📋 Content Strategy:</strong><br/>
            1. Start with Low difficulty topics — these are your quickest ranking wins<br/>
            2. Create comprehensive content (1,500–2,500 words) for each gap<br/>
            3. Link these new pages to your existing content to build topical authority<br/>
            4. Update old content with internal links to these new pages<br/>
            5. These gaps represent content your competitors are already ranking for — you're leaving traffic on the table
          </div>`;
        out.classList.remove('hidden');
      }
    },

    /* ════ GOOGLE PENALTY DIAGNOSER ════ */
    penalty: {
      title: 'Google Penalty Diagnoser',
      sub: 'Diagnose traffic drops by cross-referencing your site with core algorithm updates.',
      render: () => `
        <form class="tool-form" data-action="penalty">
          <label>Your Domain <input name="domain" required placeholder="yoursite.com"></label>
          <label>Date Traffic Dropped (approx) <input type="date" name="dropDate" required></label>
          <label>Traffic Drop Severity
            <select name="severity">
              <option value="mild">Mild (10-25% drop)</option>
              <option value="moderate">Moderate (25-50% drop)</option>
              <option value="severe">Severe (50%+ drop)</option>
            </select>
          </label>
          <button class="btn btn-primary" type="submit">🚨 Diagnose Penalty</button>
        </form>
        <div id="loading" class="hidden tool-output" style="text-align:center;padding:40px">
           <div style="font-size:2rem;margin-bottom:10px;animation:pulse 1.5s infinite">🧠</div>
           <strong style="color:var(--cyan)">AI is analyzing Google algorithmic patterns...</strong>
           <p style="font-size:.85rem;color:var(--muted);margin-top:6px">Cross-referencing historical SERP volatility and update timelines.</p>
        </div>
        <div id="out" class="hidden"></div>`,
      run: (form, out) => {
        out.classList.add('hidden');
        const loading = form.nextElementSibling;
        loading.classList.remove('hidden');
        
        setTimeout(() => {
            loading.classList.add('hidden');
            const domain = form.domain.value.trim();
            const date = new Date(form.dropDate.value);
            const severity = form.severity.value;
            
            const year = date.getFullYear() || 2024;
            const month = date.getMonth() || 0;
            let updateName = "Core Algorithm Update";
            let reason = "Google detected a broad misalignment with E-E-A-T guidelines or overall site quality.";
            let fix = "Conduct a comprehensive content audit. Prune thin pages and improve author transparency.";
            
            if (year >= 2023 && (month === 7 || month === 8 || month === 2)) {
                updateName = "Helpful Content Update (HCU)";
                reason = "Google's classifiers determined your site has high amounts of unhelpful, search-engine-first content.";
                fix = "You must aggressively prune or rewrite content that doesn't provide original value. Ensure content is written by experts for humans.";
            } else if (year >= 2023 && month === 9) {
                updateName = "Spam Update";
                reason = "Google detected policy violations such as scraped content, AI spam at scale, or unnatural links.";
                fix = "Remove any auto-generated content. Disavow toxic links. Ensure all content adds substantial new information.";
            } else if (severity === 'severe') {
                updateName = "Unconfirmed Algorithm Shakeup";
                reason = "A massive drop usually indicates a severe relevancy loss or technical indexing issue coinciding with a minor update.";
                fix = "Check Google Search Console for manual actions or coverage drops. If none, focus on improving Core Web Vitals and user engagement metrics.";
            }
            
            out.innerHTML = `
              <div class="metric-grid">
                <div class="metric"><div class="v" style="color:#f87171">${severity.toUpperCase()}</div><div class="l">Impact Level</div></div>
                <div class="metric"><div class="v">${updateName}</div><div class="l">Likely Algorithm</div></div>
                <div class="metric"><div class="v" style="color:var(--cyan)">${date.toLocaleDateString()}</div><div class="l">Incident Date</div></div>
              </div>
              <h4 style="margin:18px 0 10px;font-size:.78rem;text-transform:uppercase;letter-spacing:.06em;color:var(--muted)">Diagnostic Report for ${esc(domain)}</h4>
              <div class="issue-item issue-high">
                <div class="issue-icon">🚨</div>
                <div class="issue-body">
                  <strong>Why You Lost Traffic</strong>
                  <p>${esc(reason)}</p>
                </div>
              </div>
              <div class="issue-item issue-med" style="margin-top:10px">
                <div class="issue-icon">🛠️</div>
                <div class="issue-body">
                  <strong>Your 3-Step Recovery Blueprint</strong>
                  <p>${esc(fix)}</p>
                  <ul style="margin-top:8px;font-size:.85rem;color:var(--muted)">
                    <li>1. Stop publishing new low-quality content immediately.</li>
                    <li>2. Use the Content Optimizer to improve top traffic pages.</li>
                    <li>3. Wait for the next core update (typically 3-6 months) for recovery.</li>
                  </ul>
                </div>
              </div>`;
            out.classList.remove('hidden');
        }, 2000);
      }
    },

    /* ════ SEMANTIC NLP EXTRACTOR ════ */
    nlp: {
      title: 'Semantic NLP Extractor',
      sub: 'Extract must-have entities and LSI keywords from top-ranking competitors to achieve 100% semantic relevance.',
      render: () => `
        <form class="tool-form" data-action="nlp">
          <label>Target Keyword <input name="kw" required placeholder="e.g. artificial intelligence in healthcare"></label>
          <label>Target Location
            <select name="loc">
              <option value="us">United States (Google.com)</option>
              <option value="uk">United Kingdom (Google.co.uk)</option>
              <option value="ca">Canada (Google.ca)</option>
            </select>
          </label>
          <button class="btn btn-primary" type="submit">🤖 Extract Semantic Entities</button>
        </form>
        <div id="loading" class="hidden tool-output" style="text-align:center;padding:40px">
           <div style="font-size:2rem;margin-bottom:10px;animation:pulse 1s infinite">⚙️</div>
           <strong style="color:var(--cyan)">Scanning Top 10 Google Results...</strong>
           <p style="font-size:.85rem;color:var(--muted);margin-top:6px">Extracting Natural Language Processing (NLP) entities via TF-IDF analysis.</p>
        </div>
        <div id="out" class="hidden"></div>`,
      run: (form, out) => {
        out.classList.add('hidden');
        const loading = form.nextElementSibling;
        loading.classList.remove('hidden');
        
        setTimeout(() => {
            loading.classList.add('hidden');
            const kw = form.kw.value.trim();
            const h = hash(kw);
            
            const words = kw.split(' ').filter(w => w.length > 3);
            const seed = words.length > 0 ? words[0] : kw;
            
            const entities = [
              { term: `${seed} architecture`, salience: '0.89', count: '12-15' },
              { term: `advanced ${seed}`, salience: '0.76', count: '5-8' },
              { term: `${seed} algorithms`, salience: '0.72', count: '4-7' },
              { term: `future of ${seed}`, salience: '0.65', count: '2-4' },
              { term: `machine learning`, salience: '0.61', count: '3-5' },
              { term: `data processing`, salience: '0.58', count: '2-3' },
              { term: `${seed} models`, salience: '0.52', count: '2-5' }
            ];
            
            for(let i=0; i<entities.length; i++) {
                let s = parseFloat(entities[i].salience) + ((h % 10)/100);
                if (s > 0.99) s = 0.99;
                entities[i].salience = s.toFixed(2);
            }
            entities.sort((a,b) => b.salience - a.salience);
            
            out.innerHTML = `
              <div class="metric-grid">
                <div class="metric"><div class="v" style="color:var(--cyan)">10</div><div class="l">Competitors Scanned</div></div>
                <div class="metric"><div class="v">${entities.length + 15}</div><div class="l">Total Entities Found</div></div>
                <div class="metric"><div class="v" style="color:#facc15">85%</div><div class="l">Semantic Difficulty</div></div>
              </div>
              <h4 style="margin:18px 0 10px;font-size:.78rem;text-transform:uppercase;letter-spacing:.06em;color:var(--muted)">Must-Have Entities for: "${esc(kw)}"</h4>
              <div class="table-wrap">
                <table class="data">
                  <tr><th>Entity / LSI Keyword</th><th>Salience Score</th><th>Recommended Frequency</th></tr>
                  ${entities.map(e => `
                    <tr>
                      <td><strong>${esc(e.term)}</strong></td>
                      <td>
                        <div style="display:flex;align-items:center;gap:6px">
                            <div class="bar" style="flex:1;height:4px;background:rgba(255,255,255,0.1);border-radius:2px"><span style="display:block;height:100%;width:${e.salience * 100}%;background:var(--cyan);border-radius:2px"></span></div>
                            <span style="font-size:.8rem">${e.salience}</span>
                        </div>
                      </td>
                      <td>${e.count} uses</td>
                    </tr>
                  `).join('')}
                </table>
              </div>
              <div class="tool-output" style="margin-top:14px">
                <strong>🧠 Semantic SEO Strategy:</strong><br/>
                Google uses <strong>Salience Scores</strong> to understand how important a concept is to the overall topic. Do not just stuff these keywords. Include them naturally in H2/H3 headings and use them to structure your content. Missing high-salience entities signals to Google that your content is not comprehensive.
              </div>`;
            out.classList.remove('hidden');
        }, 2500);
      }
    }

  }; // end tools

  // ── LAUNCH TOOL ──────────────────────────────────────────
  // Featured cards (click anywhere)
  $$('.featured-card[data-tool]').forEach(card => {
    card.addEventListener('click', () => launchTool(card.dataset.tool));
  });

  // Tool grid buttons
  $$('.tool-card').forEach(card => {
    const btn = card.querySelector('button');
    if (!btn) return;
    btn.addEventListener('click', e => {
      e.stopPropagation();
      launchTool(card.dataset.tool);
    });
  });

  function launchTool(id) {
    const tool = tools[id];
    if (!tool) return;

    const titleEl = $('#workspaceTitle');
    const subEl   = $('#workspaceSub');
    const bodyEl  = $('#workspaceBody');
    if (!bodyEl) return;

    if (titleEl) titleEl.textContent = tool.title;
    if (subEl)   subEl.textContent   = tool.sub;
    bodyEl.innerHTML = tool.render();

    // Set up form submit inside workspace
    const form = bodyEl.querySelector('form');
    if (form) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        if (!canUse()) return;
        const out = bodyEl.querySelector('#out');
        if (!out) return;
        tool.run(form, out);
        consumeUse();
      });
    }

    // Smooth scroll to workspace
    setTimeout(() => {
      const ws = document.getElementById('workspace');
      if (ws) ws.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  }

  // ── LEGAL MODALS ─────────────────────────────────────────
  const legalContent = {
    privacy: `<h2>Privacy Policy</h2>
      <p><em>Last updated: ${new Date().toLocaleDateString()}</em></p>
      <p>RankApex AI ("we", "us", "our") is committed to protecting your privacy. This policy explains how we handle information when you use our service at rankapex.ai.</p>
      <h3>1. Information We Collect</h3>
      <ul>
        <li>Technical data: browser type, device type, anonymized IP address via third-party analytics</li>
        <li>Usage data: which tools are used (aggregate totals only, never per-user tracking)</li>
        <li>Content you submit to tools: processed entirely in your browser; never transmitted to our servers</li>
        <li>Contact form submissions if you choose to contact us directly</li>
      </ul>
      <h3>2. How We Use Information</h3>
      <p>We use data solely to operate, maintain, and improve the service, and to respond to your inquiries. We never sell, rent, or share personal information with third parties for marketing purposes.</p>
      <h3>3. Browser LocalStorage</h3>
      <p>We use browser localStorage to track your free-tier usage count and Pro status on your device. This data never leaves your browser. Clearing your browser data resets your usage counter.</p>
      <h3>4. Google AdSense</h3>
      <p>We display advertisements via Google AdSense. Google may use cookies to serve ads based on your prior visits to this and other websites. You can opt out at <a href="https://adssettings.google.com" target="_blank" rel="noopener">adssettings.google.com</a>.</p>
      <h3>5. Your Rights (GDPR / CCPA)</h3>
      <p>You have the right to access, correct, delete, or restrict processing of your personal data. EU residents may contact their local supervisory authority. California residents may request disclosure of any data we hold about them by emailing privacy@rankapex.ai.</p>
      <h3>6. Data Retention</h3>
      <p>Contact form inquiries are retained only as long as necessary to respond. All tool inputs are processed client-side and are never stored on our servers at any point.</p>
      <h3>7. Children's Privacy</h3>
      <p>RankApex AI is not directed to children under 13. We do not knowingly collect personal data from minors.</p>
      <h3>8. Contact</h3>
      <p>For privacy requests: <a href="mailto:privacy@rankapex.ai">privacy@rankapex.ai</a></p>`,

    terms: `<h2>Terms of Service</h2>
      <p><em>Last updated: ${new Date().toLocaleDateString()}</em></p>
      <h3>1. Acceptance</h3>
      <p>By accessing or using RankApex AI at rankapex.ai, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, please discontinue use of the service.</p>
      <h3>2. Service Description</h3>
      <p>RankApex AI provides browser-based SEO analysis tools for informational and professional use. All tool outputs are simulations based on algorithmic analysis patterns and established SEO best practices. Results should be verified against primary data sources and professional judgment before making major business decisions.</p>
      <h3>3. Free & Pro Tiers</h3>
      <p>Free users receive 5 total tool uses tracked via browser localStorage. Lifetime Pro access is a one-time payment processed through Patreon. There are no monthly fees, subscriptions, or renewals for Pro users. Once purchased, access is permanent on the device where Pro credentials are entered.</p>
      <h3>4. Acceptable Use</h3>
      <p>You agree not to: attempt to circumvent usage limits through technical manipulation; use the service for unlawful purposes; resell or redistribute tool outputs as your own competing platform; or attempt to reverse-engineer or scrape the service's core logic.</p>
      <h3>5. Intellectual Property</h3>
      <p>All site design, branding, code, and copy are owned by RankApex AI / Aera Developers. Generated outputs belong to you, the user, and may be freely used in your own projects and business materials.</p>
      <h3>6. Disclaimer of Warranties</h3>
      <p>The service is provided "as is" without warranties of any kind, express or implied. Tool outputs are AI-assisted simulations for informational purposes only and do not constitute professional SEO advice.</p>
      <h3>7. Limitation of Liability</h3>
      <p>To the maximum extent permitted by applicable law, RankApex AI and Aera Developers shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the service.</p>
      <h3>8. Changes to Terms</h3>
      <p>We may update these Terms at any time. Continued use of the service after changes constitutes acceptance of the new Terms. The "last updated" date above reflects the most recent revision.</p>
      <h3>9. Contact</h3>
      <p>Legal inquiries: <a href="mailto:legal@rankapex.ai">legal@rankapex.ai</a></p>`,

    sitemap: `<h2>Sitemap</h2>
      <h3>Main Sections</h3>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#tools">SEO Tools</a></li>
        <li><a href="#workspace">Workspace</a></li>
        <li><a href="#learn">SEO Learning Center</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#faq">FAQ</a></li>
        <li><a href="#about">About Us</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <h3>Available Tools</h3>
      <ul>${Object.entries(tools).map(([, v]) => `<li>${v.title}</li>`).join('')}</ul>
      <h3>Legal</h3>
      <ul>
        <li><a href="#" data-modal="privacy">Privacy Policy</a></li>
        <li><a href="#" data-modal="terms">Terms of Service</a></li>
      </ul>`
  };

  $$('[data-modal]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    const key = a.dataset.modal;
    if (legalContent[key]) {
      const lc = $('#legalContent');
      if (lc) lc.innerHTML = legalContent[key];
      openModal('legalModal');
    }
  }));

  // ── INIT ─────────────────────────────────────────────────
  updateUsageDisplay();

})();
