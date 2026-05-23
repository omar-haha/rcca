'use client'
import { useState, useEffect, useRef } from 'react'
import { PRODUCTS, type Product } from '@/lib/products'

type CartItem = { id: string; name: string; price: number; unit: string; qty: number }

const PURITY_STAGES = [
  {
    icon: '⚗', label: 'Stage 01 — Synthesis', title: 'GMP-Compliant Synthesis',
    desc: 'All peptides are synthesized using solid-phase Fmoc chemistry under ISO-controlled conditions, minimizing impurities at source.',
    barLabel: 'Synthesis purity', barRange: '97–99%', barValue: 98, barColor: 'var(--green)',
  },
  {
    icon: '🔬', label: 'Stage 02 — Analysis', title: 'HPLC-MS Verification',
    desc: 'High-performance liquid chromatography coupled with mass spectrometry confirms identity and purity to ≥98% threshold on every batch.',
    barLabel: 'HPLC purity threshold', barRange: '≥98%', barValue: 99, barColor: 'var(--green)',
  },
  {
    icon: '📋', label: 'Stage 03 — Certification', title: 'Independent COA Issuance',
    desc: 'Certificates of Analysis are issued by accredited third-party laboratories — not internal teams — ensuring objectivity and legal compliance.',
    barLabel: 'Third-party verified batches', barRange: '100%', barValue: 100, barColor: 'var(--accent)',
  },
  {
    icon: '❄', label: 'Stage 04 — Storage & Dispatch', title: 'Cold-Chain Integrity',
    desc: 'All peptide vials are lyophilized and stored at −20°C. Shipments are dispatched with validated cold-chain packaging rated for 72-hour transit.',
    barLabel: 'Cold-chain compliance', barRange: '100%', barValue: 100, barColor: '#30a0ff',
  },
]

export default function Home() {
  const [siteVisible, setSiteVisible] = useState(false)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [cart, setCart] = useState<Record<string, CartItem>>({})
  const [qtys, setQtys] = useState<Record<string, number>>(
    Object.fromEntries(PRODUCTS.map(p => [p.id, 1]))
  )
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const [toastVisible, setToastVisible] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')
  const [orderId, setOrderId] = useState('')
  const [barsAnimated, setBarsAnimated] = useState(false)

  const purityGridRef = useRef<HTMLDivElement>(null)
  const vialsRef = useRef<HTMLDivElement>(null)
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Restore session from localStorage
  useEffect(() => {
    try {
      if (localStorage.getItem('rc_age_ok')) setSiteVisible(true)
      const t = localStorage.getItem('rc_theme') as 'dark' | 'light' | null
      if (t) setTheme(t)
    } catch { /* private mode */ }
  }, [])

  // Sync theme to html element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // Purity bars: animate when scrolled into view
  useEffect(() => {
    if (!siteVisible || barsAnimated) return
    const grid = purityGridRef.current
    if (!grid) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setBarsAnimated(true); obs.disconnect() }
    }, { threshold: 0.3 })
    obs.observe(grid)
    return () => obs.disconnect()
  }, [siteVisible, barsAnimated])

  // Floating vials: inject once into the container div
  useEffect(() => {
    if (!siteVisible) return
    const container = vialsRef.current
    if (!container || container.childElementCount > 0) return
    const palettes: [string, string][] = [
      ['#2997ff','#00c6ff'], ['#30d158','#34eba8'], ['#a855f7','#6366f1'],
      ['#f59e0b','#f97316'], ['#06b6d4','#3b82f6'], ['#ec4899','#a855f7'],
    ]
    for (let i = 0; i < 14; i++) {
      const [c1, c2] = palettes[i % palettes.length]
      const fromTop = i % 2 === 0
      const size = 24 + Math.random() * 20
      const opacity = 0.12 + Math.random() * 0.22
      const left = 3 + Math.random() * 94
      const dur = 8 + Math.random() * 14
      const delay = -(Math.random() * dur)
      const rot = -20 + Math.random() * 40
      const sc = 0.7 + Math.random() * 0.6
      const gId = Math.random().toString(36).slice(2)
      const w = size, h = size * 3.2
      const svg = `<svg width="${w}" height="${h}" viewBox="0 0 40 128" xmlns="http://www.w3.org/2000/svg" style="opacity:${opacity}">
        <defs><linearGradient id="g${gId}" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="${c1}" stop-opacity=".9"/>
          <stop offset="100%" stop-color="${c2}" stop-opacity=".5"/>
        </linearGradient></defs>
        <rect x="13" y="0" width="14" height="8" rx="3" fill="${c1}" opacity=".85"/>
        <rect x="15" y="7" width="10" height="6" rx="1" fill="${c1}" opacity=".7"/>
        <rect x="6" y="12" width="28" height="90" rx="6" fill="url(#g${gId})" opacity=".6"/>
        <rect x="8" y="60" width="24" height="40" rx="4" fill="${c2}" opacity=".45"/>
        <rect x="9" y="14" width="6" height="50" rx="3" fill="rgba(255,255,255,.18)"/>
        <ellipse cx="20" cy="102" rx="14" ry="6" fill="${c1}" opacity=".3"/>
        <rect x="10" y="38" width="20" height="1.5" rx="1" fill="rgba(255,255,255,.2)"/>
        <rect x="10" y="43" width="14" height="1.5" rx="1" fill="rgba(255,255,255,.15)"/>
        <rect x="10" y="48" width="17" height="1.5" rx="1" fill="rgba(255,255,255,.15)"/>
      </svg>`
      const div = document.createElement('div')
      div.className = 'vial-float'
      div.innerHTML = svg
      div.style.cssText = `left:${left}%;--rot:${rot}deg;--sc:${sc};--vy-start:${fromTop ? '-160px' : 'calc(100% + 160px)'};--vy-end:${fromTop ? 'calc(100% + 160px)' : '-160px'};animation-duration:${dur}s;animation-delay:${delay}s;`
      container.appendChild(div)
    }
  }, [siteVisible])

  function enterSite() {
    setSiteVisible(true)
    try { localStorage.setItem('rc_age_ok', '1') } catch { /* private mode */ }
  }

  function exitSite() {
    document.body.innerHTML =
      '<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:Inter,sans-serif;color:#6e6e73;font-size:14px">Access denied. Please close this tab.</div>'
  }

  function toggleTheme() {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark'
      try { localStorage.setItem('rc_theme', next) } catch { /* private mode */ }
      return next
    })
  }

  function showToast(msg: string) {
    setToastMsg(msg)
    setToastVisible(true)
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    toastTimerRef.current = setTimeout(() => setToastVisible(false), 2400)
  }

  function addToCart(p: Product) {
    const q = qtys[p.id] ?? 1
    setCart(prev => ({
      ...prev,
      [p.id]: prev[p.id]
        ? { ...prev[p.id], qty: prev[p.id].qty + q }
        : { id: p.id, name: p.name, price: p.price, unit: p.unit, qty: q },
    }))
    showToast(`${p.name} added`)
  }

  function removeFromCart(id: string) {
    setCart(prev => { const next = { ...prev }; delete next[id]; return next })
  }

  function changeQty(id: string, delta: number) {
    setQtys(prev => ({ ...prev, [id]: Math.max(1, (prev[id] ?? 1) + delta) }))
  }

  const cartItems = Object.values(cart)
  const cartTotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0)
  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0)

  function placeOrder() {
    const c1 = (document.getElementById('c1') as HTMLInputElement)?.checked
    const c2 = (document.getElementById('c2') as HTMLInputElement)?.checked
    const c3 = (document.getElementById('c3') as HTMLInputElement)?.checked
    if (!c1 || !c2 || !c3) { showToast('Please complete all compliance attestations'); return }
    setOrderId('RC-' + Date.now().toString(36).toUpperCase())
    setCheckoutOpen(false)
    setSuccessOpen(true)
    setCart({})
  }

  const filteredProducts =
    activeFilter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === activeFilter)

  // ── AGE GATE ──
  if (!siteVisible) {
    return (
      <div id="age-gate">
        <div className="age-box">
          <div className="age-logo">rcca</div>
          <h2>Confirm Your Age &amp;<br />Professional Status</h2>
          <p>
            This site provides access to research-grade chemical compounds intended exclusively for
            licensed scientific researchers. You must be 18 years or older and a qualified research
            professional to enter.
          </p>
          <div className="age-actions">
            <button className="btn-primary" onClick={enterSite}>
              I am 18+ and a Licensed Researcher
            </button>
            <button className="btn-secondary" onClick={exitSite}>
              I do not meet these requirements
            </button>
          </div>
          <p className="age-legal">
            By entering, you confirm you are at least 18 years of age, hold appropriate research
            credentials, and agree to use all products strictly for in vitro scientific research in
            compliance with all applicable laws and regulations in your jurisdiction.
            Misrepresentation of age or professional status may constitute fraud.
          </p>
        </div>
      </div>
    )
  }

  // ── MAIN SITE ──
  return (
    <div style={{ paddingTop: 52 }}>

      {/* NAV */}
      <nav id="main-nav">
        <div className="nav-brand">rcca</div>
        <div className="nav-links">
          <a href="#stats">Overview</a>
          <a href="#purity">Verification</a>
          <a href="#catalog">Catalog</a>
          <a href="#disclaimer">Legal</a>
        </div>
        <div className="nav-right">
          <button className="theme-btn" onClick={toggleTheme} title="Toggle theme">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button className="cart-pill" onClick={() => setCartOpen(true)}>
            Cart
            <div className="cart-dot">{cartCount}</div>
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="hero">
        <p className="hero-eyebrow">Research Grade · HPLC Verified · ISO Compliant</p>
        <h1>The standard for<br /><strong>peptide research.</strong></h1>
        <p className="hero-sub">
          Every compound we supply undergoes rigorous third-party verification. Precision-synthesized.
          Independently certified. Delivered to research facilities worldwide.
        </p>
        <div className="hero-ctas">
          <button
            className="btn-primary"
            onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Browse Catalog
          </button>
          <button
            className="cta-ghost"
            onClick={() => document.getElementById('purity')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Verification Process →
          </button>
        </div>
        <div className="hero-badges">
          {[
            '≥98% Average Purity',
            'Third-Party COA',
            'Lyophilized & Sealed',
            'Cold-Chain Shipping',
          ].map(label => (
            <div className="hero-badge" key={label}>
              <div className="badge-dot" />
              {label}
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <div className="stats-strip" id="stats">
        <div className="stats-grid">
          {[
            { num: '99.2', unit: '%', label: 'Average HPLC purity' },
            { num: '48', unit: 'hr', label: 'Average dispatch time' },
            { num: '12', unit: '+', label: 'Active compound lines' },
            { num: '100', unit: '%', label: 'Third-party verified' },
          ].map(s => (
            <div className="stat-cell" key={s.label}>
              <div className="stat-num">
                {s.num}<span style={{ fontSize: 22 }}>{s.unit}</span>
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PURITY */}
      <section id="purity">
        <div className="vials-bg" ref={vialsRef} />
        <div className="purity-inner">
          <div className="section-wrap">
            <p className="section-label">Verification &amp; Purity</p>
            <h2 className="section-title">Uncompromising<br />quality assurance.</h2>
            <p className="section-sub">
              Every batch is independently verified before it reaches your lab. Our multi-stage
              quality protocol ensures research-grade precision every time.
            </p>
            <div className="purity-grid" ref={purityGridRef}>
              {PURITY_STAGES.map(s => (
                <div className="purity-card" key={s.label}>
                  <div className="purity-icon">{s.icon}</div>
                  <div className="purity-card-label">{s.label}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <div className="purity-bar-wrap">
                    <div className="purity-bar-label">
                      <span>{s.barLabel}</span><span>{s.barRange}</span>
                    </div>
                    <div className="purity-bar-track">
                      <div
                        className="purity-bar-fill"
                        style={{
                          width: barsAnimated ? `${s.barValue}%` : '0%',
                          background: s.barColor,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog">
        <div className="section-wrap">
          <p className="section-label">Compound Catalog</p>
          <h2 className="section-title">Research-grade<br />compounds.</h2>
          <p className="section-sub">
            A curated selection of peptides, SARMs, and nootropics — each independently verified
            and shipped with full documentation.
          </p>
          <div className="filter-row">
            {['all', 'peptide', 'sarm', 'nootropic', 'misc'].map(cat => (
              <button
                key={cat}
                className={`filter-chip${activeFilter === cat ? ' active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1) + (cat === 'misc' ? 'ellaneous' : 's')}
              </button>
            ))}
          </div>
          <div className="product-grid">
            {filteredProducts.map(p => {
              const oos = p.stock === 'out'
              return (
                <div key={p.id} className={`product-tile${oos ? ' oos' : ''}`}>
                  {oos && <div className="oos-stamp">Out of stock</div>}
                  <div className="tile-category">{p.cat}</div>
                  <div className="tile-name">{p.name}</div>
                  <div className="tile-cas">CAS {p.cas}</div>
                  <div className="tile-specs">
                    <div className="tile-spec"><strong>{p.unit}</strong> per vial</div>
                    <div className="tile-spec"><strong>{p.purity}</strong> purity</div>
                    <div className="tile-spec"><strong>Lyophilized</strong></div>
                  </div>
                  <div className="tile-footer">
                    <div>
                      <div className="tile-price"><sup>$</sup>{p.price.toFixed(2)}</div>
                      {oos ? (
                        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text3)', border: '1px solid var(--border)', padding: '3px 9px', borderRadius: 4 }}>
                          Out of stock
                        </span>
                      ) : (
                        <span className={`stock-pill ${p.stock === 'in' ? 'sp-in' : 'sp-low'}`}>
                          {p.stock === 'in' ? 'In stock' : 'Low stock'}
                        </span>
                      )}
                    </div>
                    {oos ? (
                      <span style={{ fontSize: 13, color: 'var(--text3)', letterSpacing: '-.01em' }}>
                        Unavailable
                      </span>
                    ) : (
                      <div className="tile-qty">
                        <button className="qty-btn" onClick={() => changeQty(p.id, -1)}>−</button>
                        <span className="qty-val">{qtys[p.id] ?? 1}</span>
                        <button className="qty-btn" onClick={() => changeQty(p.id, 1)}>+</button>
                        <button className="tile-add" onClick={() => addToCart(p)}>Add</button>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section id="disclaimer">
        <div className="section-wrap">
          <p className="section-label">Legal Disclosures</p>
          <h2 className="section-title">Regulatory &amp;<br />compliance framework.</h2>
          <p className="section-sub" style={{ marginBottom: 80 }}>
            All activities conducted through rcca are governed by the following legally binding
            terms and disclosures. Please read carefully before placing an order.
          </p>
          <div className="disclaimer-grid">
            <div className="disclaimer-toc">
              <div className="toc-title">Sections</div>
              {[
                ['#d1','Research Use Only'], ['#d2','Age & Eligibility'],
                ['#d3','Regulatory Compliance'], ['#d4','Liability Limitation'],
                ['#d5','Controlled Substances'], ['#d6','Export Controls'],
                ['#d7','No Medical Claims'], ['#d8','Warranty Disclaimer'],
                ['#d9','Jurisdiction'],
              ].map(([href, label]) => (
                <a key={href} href={href} className="toc-link">{label}</a>
              ))}
            </div>
            <div>
              <div className="disc-section" id="d1">
                <div className="disc-num">01</div>
                <h3>Research Use Only</h3>
                <p>All products sold by rcca are strictly for <em>in vitro</em> (outside of living organism) scientific research purposes only. They are not intended, authorized, or permitted for use in humans or animals under any circumstances, including but not limited to self-administration, clinical treatment, veterinary treatment, or diagnostic purposes.</p>
                <p>Purchasers acknowledge that these compounds are experimental in nature, have not been evaluated by the FDA, Health Canada, EMA, or equivalent regulatory bodies for safety or efficacy, and must be handled only by trained scientific professionals in compliant laboratory environments.</p>
                <div className="disc-warning"><p>⚠ Misuse of research chemicals may violate federal, provincial, state, or local law and may result in serious injury, death, or criminal prosecution.</p></div>
              </div>
              <div className="disc-section" id="d2">
                <div className="disc-num">02</div>
                <h3>Age &amp; Eligibility Requirements</h3>
                <p>All purchasers must be a minimum of 18 years of age. By placing an order, you represent and warrant that:</p>
                <ul>
                  <li>You are at least 18 years of age;</li>
                  <li>You are a licensed researcher, scientist, or authorized representative of a registered research institution;</li>
                  <li>You possess all necessary permits, licenses, and authorizations required by your jurisdiction;</li>
                  <li>You will not resell, redistribute, or supply these compounds to any unauthorized individual.</li>
                </ul>
              </div>
              <div className="disc-section" id="d3">
                <div className="disc-num">03</div>
                <h3>Regulatory Compliance</h3>
                <p>rcca operates in accordance with applicable federal and provincial regulations in Canada, including but not limited to the <em>Controlled Drugs and Substances Act (CDSA)</em>, the <em>Food and Drugs Act</em>, and relevant provincial health regulations. International orders are subject to the import regulations of the destination country.</p>
                <p>It is the sole responsibility of the purchaser to determine the legal status of each compound in their jurisdiction prior to ordering.</p>
              </div>
              <div className="disc-section" id="d4">
                <div className="disc-num">04</div>
                <h3>Limitation of Liability</h3>
                <p>To the fullest extent permitted by applicable law, rcca, its directors, officers, employees, agents, and suppliers shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages; personal injury, death, or property damage arising from the use or misuse of any product; or loss of research data, business revenue, or scientific results.</p>
                <p>Total aggregate liability of rcca to any purchaser shall not exceed the amount paid for the specific order giving rise to the claim.</p>
              </div>
              <div className="disc-section" id="d5">
                <div className="disc-num">05</div>
                <h3>Controlled Substances Notice</h3>
                <p>Certain compounds in our catalog may be regulated or scheduled substances in some jurisdictions. rcca does not knowingly sell scheduled substances to jurisdictions where such compounds are controlled without appropriate licensing.</p>
                <div className="disc-warning"><p>⚠ Importing controlled substances without proper authorization constitutes a criminal offence in most jurisdictions and may result in seizure of goods, fines, and imprisonment.</p></div>
              </div>
              <div className="disc-section" id="d6">
                <div className="disc-num">06</div>
                <h3>Export Controls</h3>
                <p>Some compounds may be subject to export control regulations under Canadian, US, or international law, including the <em>Export and Import Permits Act</em> and regulations administered by Global Affairs Canada. rcca complies with all applicable export control requirements.</p>
              </div>
              <div className="disc-section" id="d7">
                <div className="disc-num">07</div>
                <h3>No Medical or Therapeutic Claims</h3>
                <p>Nothing on this website constitutes medical advice, a therapeutic claim, a diagnostic recommendation, or a solicitation to use any compound for treatment purposes. rcca does not make any claims regarding the safety, efficacy, or suitability of any compound for human or animal use.</p>
              </div>
              <div className="disc-section" id="d8">
                <div className="disc-num">08</div>
                <h3>Warranty Disclaimer</h3>
                <p>Products are sold &ldquo;as is&rdquo; for research purposes only. rcca warrants that products conform to stated purity specifications at time of dispatch as evidenced by the Certificate of Analysis. All other warranties, express or implied, are expressly disclaimed to the fullest extent permitted by law.</p>
              </div>
              <div className="disc-section" id="d9">
                <div className="disc-num">09</div>
                <h3>Governing Law &amp; Jurisdiction</h3>
                <p>These terms and all transactions through rcca are governed exclusively by the laws of the Province of Quebec, Canada, and the federal laws of Canada applicable therein. Any disputes shall be resolved exclusively in the courts of Montreal, Quebec.</p>
                <p style={{ marginTop: 20, fontSize: 13, color: 'var(--text3)' }}>
                  Last updated: May 2026 · rcca Inc. · Montréal, QC, Canada
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-brand">rcca</div>
          <div className="footer-links">
            <a href="#disclaimer">Legal</a>
            <a href="#disclaimer">Privacy</a>
            <a href="#catalog">Catalog</a>
            <a href="#purity">COA Policy</a>
          </div>
          <div className="footer-copy">© 2026 rcca Inc. Research use only.</div>
        </div>
      </footer>

      {/* CART DRAWER */}
      <div id="cart-wrap" className={cartOpen ? 'open' : ''}>
        <div id="cart-scrim" onClick={() => setCartOpen(false)} />
        <div id="cart-drawer">
          <div className="drawer-head">
            <h3>Cart</h3>
            <button className="close-btn" onClick={() => setCartOpen(false)}>×</button>
          </div>
          <div className="drawer-items">
            {cartItems.length === 0 ? (
              <div className="cart-empty-msg">
                <div className="cart-empty-icon">🧪</div>
                Your cart is empty
              </div>
            ) : (
              cartItems.map(i => (
                <div className="cart-row" key={i.id}>
                  <div className="cart-info">
                    <div className="cart-name">{i.name}</div>
                    <div className="cart-detail">{i.unit} · ×{i.qty}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div className="cart-price">${(i.price * i.qty).toFixed(2)}</div>
                    <button className="rm-btn" onClick={() => removeFromCart(i.id)}>×</button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="drawer-foot">
            <div className="total-row">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <button
              className="checkout-cta"
              disabled={cartItems.length === 0}
              onClick={() => { setCartOpen(false); setCheckoutOpen(true) }}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

      {/* CHECKOUT MODAL */}
      <div id="checkout-modal" className={checkoutOpen ? 'open' : ''}>
        <div className="co-box">
          <div className="co-head">
            <h3>Complete your order</h3>
            <button className="close-btn" onClick={() => setCheckoutOpen(false)}>×</button>
          </div>
          <div className="co-body">
            <div className="co-section">
              <div className="co-section-title">Researcher details</div>
              <div className="form-row form-row-2">
                <div><label className="field-label">First name</label><input type="text" id="fname" placeholder="Dr. Jane" /></div>
                <div><label className="field-label">Last name</label><input type="text" id="lname" placeholder="Smith" /></div>
              </div>
              <div className="form-row">
                <div><label className="field-label">Institutional email</label><input type="email" id="email" placeholder="j.smith@university.edu" /></div>
              </div>
              <div className="form-row">
                <div><label className="field-label">Institution</label><input type="text" id="inst" placeholder="University Research Lab" /></div>
              </div>
            </div>
            <div className="co-section">
              <div className="co-section-title">Shipping address</div>
              <div className="form-row">
                <div><label className="field-label">Street address</label><input type="text" id="addr" placeholder="123 Research Ave, Lab 4B" /></div>
              </div>
              <div className="form-row form-row-2">
                <div><label className="field-label">City</label><input type="text" id="city" placeholder="Montréal" /></div>
                <div><label className="field-label">Postal code</label><input type="text" id="postal" placeholder="H3A 0G4" /></div>
              </div>
              <div className="form-row">
                <label className="field-label">Country</label>
                <select id="country">
                  <option>Canada</option><option>United States</option><option>United Kingdom</option>
                  <option>Germany</option><option>Australia</option><option>Netherlands</option><option>Sweden</option>
                </select>
              </div>
            </div>
            <div className="co-section">
              <div className="co-section-title">Compliance attestations</div>
              <div className="agree-row">
                <input type="checkbox" id="c1" />
                <label htmlFor="c1">I confirm all compounds are for <strong>in vitro research only</strong> and will not be used on or in any human or animal.</label>
              </div>
              <div className="agree-row">
                <input type="checkbox" id="c2" />
                <label htmlFor="c2">I am a licensed researcher or authorized representative of a registered research institution.</label>
              </div>
              <div className="agree-row">
                <input type="checkbox" id="c3" />
                <label htmlFor="c3">I have read and agree to the <a href="#disclaimer" onClick={() => setCheckoutOpen(false)}>Legal Disclosures</a> and Research Use Policy.</label>
              </div>
            </div>
            <div className="order-sum">
              <div className="os-title">Order summary</div>
              {cartItems.map(i => (
                <div className="os-row" key={i.id}>
                  <span>{i.name} ×{i.qty}</span>
                  <span>${(i.price * i.qty).toFixed(2)}</span>
                </div>
              ))}
              <div className="os-total">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            <button className="place-btn" onClick={placeOrder}>Place order</button>
          </div>
        </div>
      </div>

      {/* SUCCESS MODAL */}
      <div id="success-modal" className={successOpen ? 'open' : ''}>
        <div className="suc-box">
          <div className="suc-check">✓</div>
          <h3>Order confirmed</h3>
          <p>Your research order has been received and is being processed. A confirmation and COA documentation will be dispatched to your institutional email.</p>
          <p>Estimated dispatch: <strong>1–2 business days</strong></p>
          <div className="suc-id">{orderId && `Order reference: ${orderId}`}</div>
          <button className="suc-btn" onClick={() => setSuccessOpen(false)}>Continue</button>
        </div>
      </div>

      {/* TOAST */}
      <div id="toast" className={toastVisible ? 'show' : ''}>{toastMsg}</div>

    </div>
  )
}
