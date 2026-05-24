export function DisclaimerSection() {
  const sections = [
    { id: "d1", title: "Research Use Only" },
    { id: "d2", title: "Age & Eligibility" },
    { id: "d3", title: "Regulatory Compliance" },
    { id: "d4", title: "Liability Limitation" },
    { id: "d5", title: "Controlled Substances" },
    { id: "d6", title: "Export Controls" },
    { id: "d7", title: "No Medical Claims" },
    { id: "d8", title: "Warranty Disclaimer" },
    { id: "d9", title: "Jurisdiction" },
  ];

  return (
    <>
      <section id="disclaimer" className="py-[100px] bg-primary">
        <div className="max-w-[1080px] mx-auto px-6">
          <p className="text-[12px] font-medium tracking-[0.18em] uppercase text-blue-500 mb-5">
            Legal Disclosures
          </p>
          <h2 className="text-[clamp(36px,5vw,52px)] font-light tracking-[-0.03em] leading-[1.1] mb-4 text-primary">
            Regulatory &<br />compliance framework.
          </h2>
          <p className="text-[17px] text-secondary max-w-[540px] leading-[1.58] font-light mb-20">
            All activities conducted through RCCA are governed by the following legally binding
            terms and disclosures. Please read carefully before placing an order.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-20 items-start">
            <div className="md:sticky md:top-24">
              <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-tertiary mb-5">
                Sections
              </div>
              <div className="flex flex-col">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block text-[14px] text-tertiary no-underline py-2 border-b border-secondary transition-colors hover:text-primary tracking-[-0.01em]"
                  >
                    {s.title}
                  </a>
                ))}
              </div>
            </div>

            <div>
              {/* 01 */}
              <div className="mb-14" id="d1">
                <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-tertiary mb-3">01</div>
                <h3 className="text-[22px] font-normal tracking-[-0.02em] mb-4 text-primary">Research Use Only</h3>
                <p className="text-[15px] text-secondary leading-[1.7] mb-2.5">
                  All products sold by RCCA are strictly for <em>in vitro</em> (outside of living organism) scientific research purposes only. They are not intended, authorized, or permitted for use in humans or animals under any circumstances, including but not limited to self-administration, clinical treatment, veterinary treatment, or diagnostic purposes.
                </p>
                <p className="text-[15px] text-secondary leading-[1.7] mb-2.5">
                  Purchasers acknowledge that these compounds are experimental in nature, have not been evaluated by the FDA, Health Canada, EMA, or equivalent regulatory bodies for safety or efficacy, and must be handled only by trained scientific professionals in compliant laboratory environments.
                </p>
                <div className="bg-red-500/10 border-l-4 border-red-500 p-4 rounded-r-lg mt-4">
                  <p className="text-secondary text-sm m-0 flex items-center gap-2">
                    <span className="text-red-500 font-bold">⚠</span> Misuse of research chemicals may violate federal, provincial, state, or local law and may result in serious injury, death, or criminal prosecution.
                  </p>
                </div>
              </div>

              {/* 02 */}
              <div className="mb-14" id="d2">
                <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-tertiary mb-3">02</div>
                <h3 className="text-[22px] font-normal tracking-[-0.02em] mb-4 text-primary">Age & Eligibility Requirements</h3>
                <p className="text-[15px] text-secondary leading-[1.7] mb-2.5">
                  All purchasers must be a minimum of 18 years of age. By placing an order, you represent and warrant that:
                </p>
                <ul className="list-disc pl-5 text-[15px] text-secondary leading-[1.7]">
                  <li className="mb-1.5">You are at least 18 years of age;</li>
                  <li className="mb-1.5">You are a licensed researcher, scientist, or authorized representative of a registered research institution;</li>
                  <li className="mb-1.5">You possess all necessary permits, licenses, and authorizations required by your jurisdiction;</li>
                  <li className="mb-1.5">You will not resell, redistribute, or supply these compounds to any unauthorized individual.</li>
                </ul>
              </div>

              {/* 03 */}
              <div className="mb-14" id="d3">
                <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-tertiary mb-3">03</div>
                <h3 className="text-[22px] font-normal tracking-[-0.02em] mb-4 text-primary">Regulatory Compliance</h3>
                <p className="text-[15px] text-secondary leading-[1.7] mb-2.5">
                  RCCA operates in accordance with applicable federal and provincial regulations in Canada, including but not limited to the <em>Controlled Drugs and Substances Act (CDSA)</em>, the <em>Food and Drugs Act</em>, and relevant provincial health regulations. International orders are subject to the import regulations of the destination country.
                </p>
                <p className="text-[15px] text-secondary leading-[1.7] mb-2.5">
                  It is the sole responsibility of the purchaser to determine the legal status of each compound in their jurisdiction prior to ordering.
                </p>
              </div>

              {/* 04 */}
              <div className="mb-14" id="d4">
                <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-tertiary mb-3">04</div>
                <h3 className="text-[22px] font-normal tracking-[-0.02em] mb-4 text-primary">Limitation of Liability</h3>
                <p className="text-[15px] text-secondary leading-[1.7] mb-2.5">
                  To the fullest extent permitted by applicable law, RCCA, its directors, officers, employees, agents, and suppliers shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages; personal injury, death, or property damage arising from the use or misuse of any product; or loss of research data, business revenue, or scientific results.
                </p>
                <p className="text-[15px] text-secondary leading-[1.7] mb-2.5">
                  Total aggregate liability of RCCA to any purchaser shall not exceed the amount paid for the specific order giving rise to the claim.
                </p>
              </div>

              {/* 05 */}
              <div className="mb-14" id="d5">
                <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-tertiary mb-3">05</div>
                <h3 className="text-[22px] font-normal tracking-[-0.02em] mb-4 text-primary">Controlled Substances Notice</h3>
                <p className="text-[15px] text-secondary leading-[1.7] mb-2.5">
                  Certain compounds in our catalog may be regulated or scheduled substances in some jurisdictions. RCCA does not knowingly sell scheduled substances to jurisdictions where such compounds are controlled without appropriate licensing.
                </p>
                <div className="bg-red-500/10 border-l-4 border-red-500 p-4 rounded-r-lg mt-4">
                  <p className="text-secondary text-sm m-0 flex items-center gap-2">
                    <span className="text-red-500 font-bold">⚠</span> Importing controlled substances without proper authorization constitutes a criminal offence in most jurisdictions and may result in seizure of goods, fines, and imprisonment.
                  </p>
                </div>
              </div>

              {/* 06 */}
              <div className="mb-14" id="d6">
                <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-tertiary mb-3">06</div>
                <h3 className="text-[22px] font-normal tracking-[-0.02em] mb-4 text-primary">Export Controls</h3>
                <p className="text-[15px] text-secondary leading-[1.7] mb-2.5">
                  Some compounds may be subject to export control regulations under Canadian, US, or international law, including the <em>Export and Import Permits Act</em> and regulations administered by Global Affairs Canada. RCCA complies with all applicable export control requirements.
                </p>
              </div>

              {/* 07 */}
              <div className="mb-14" id="d7">
                <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-tertiary mb-3">07</div>
                <h3 className="text-[22px] font-normal tracking-[-0.02em] mb-4 text-primary">No Medical or Therapeutic Claims</h3>
                <p className="text-[15px] text-secondary leading-[1.7] mb-2.5">
                  Nothing on this website constitutes medical advice, a therapeutic claim, a diagnostic recommendation, or a solicitation to use any compound for treatment purposes. RCCA does not make any claims regarding the safety, efficacy, or suitability of any compound for human or animal use.
                </p>
              </div>

              {/* 08 */}
              <div className="mb-14" id="d8">
                <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-tertiary mb-3">08</div>
                <h3 className="text-[22px] font-normal tracking-[-0.02em] mb-4 text-primary">Warranty Disclaimer</h3>
                <p className="text-[15px] text-secondary leading-[1.7] mb-2.5">
                  Products are sold &ldquo;as is&rdquo; for research purposes only. RCCA warrants that products conform to stated purity specifications at time of dispatch as evidenced by the Certificate of Analysis. All other warranties, express or implied, are expressly disclaimed to the fullest extent permitted by law.
                </p>
              </div>

              {/* 09 */}
              <div className="mb-0" id="d9">
                <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-tertiary mb-3">09</div>
                <h3 className="text-[22px] font-normal tracking-[-0.02em] mb-4 text-primary">Governing Law & Jurisdiction</h3>
                <p className="text-[15px] text-secondary leading-[1.7] mb-2.5">
                  These terms and all transactions through RCCA are governed exclusively by the laws of the Province of Quebec, Canada, and the federal laws of Canada applicable therein. Any disputes shall be resolved exclusively in the courts of Montreal, Quebec.
                </p>
                <p className="mt-5 text-[13px] text-tertiary">
                  Last updated: May 2026 · RCCA Inc. · Montréal, QC, Canada
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-secondary bg-primary">
        <div className="max-w-[1080px] mx-auto flex items-center justify-between flex-wrap gap-5">
          <div className="text-[13px] font-semibold tracking-[0.06em] text-primary">RCCA</div>
          <div className="flex gap-6">
            <a href="#disclaimer" className="text-[12px] text-tertiary no-underline transition-colors hover:text-secondary">Legal</a>
            <a href="#disclaimer" className="text-[12px] text-tertiary no-underline transition-colors hover:text-secondary">Privacy</a>
            <a href="#catalog" className="text-[12px] text-tertiary no-underline transition-colors hover:text-secondary">Catalog</a>
            <a href="#purity" className="text-[12px] text-tertiary no-underline transition-colors hover:text-secondary">COA Policy</a>
          </div>
          <div className="text-[12px] text-tertiary">© 2026 RCCA Inc. Research use only.</div>
        </div>
      </footer>
    </>
  );
}
