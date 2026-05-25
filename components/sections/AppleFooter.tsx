export function AppleFooter() {
  return (
    <footer id="contact" className="bg-secondary pt-6 pb-12 px-4 border-t border-primary text-[12px] text-tertiary font-normal">
      <div className="max-w-[1024px] mx-auto">

        {/* Disclaimer */}
        <div className="border-b border-primary pb-5 mb-5 leading-relaxed space-y-1.5">
          <p>All products are for in vitro research purposes only. Not intended for human or animal use. Not evaluated by FDA, Health Canada, or equivalent regulatory bodies.</p>
          <p>Purchasers must be of legal age in their province or territory and are solely responsible for compliance with all applicable local regulations. RCCA Inc. reserves the right to refuse or cancel any order.</p>
        </div>

        {/* Directory */}
        <div className="flex flex-wrap gap-x-12 gap-y-6 pt-2 pb-6">
          <div>
            <h3 className="text-primary font-semibold mb-2 text-[12px]">Explore</h3>
            <ul className="list-none p-0 m-0 flex flex-col gap-1.5">
              <li><a href="#store" className="text-tertiary hover:text-primary transition-colors no-underline">Shop</a></li>
              <li><a href="#quality" className="text-tertiary hover:text-primary transition-colors no-underline">Quality &amp; Testing</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-primary font-semibold mb-2 text-[12px]">Contact</h3>
            <ul className="list-none p-0 m-0 flex flex-col gap-1.5">
              <li><a href="mailto:support@researchchemicals.ca" className="text-tertiary hover:text-primary transition-colors no-underline">support@researchchemicals.ca</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-primary font-semibold mb-2 text-[12px]">Legal</h3>
            <ul className="list-none p-0 m-0 flex flex-col gap-1.5">
              <li><a href="#" className="text-tertiary hover:text-primary transition-colors no-underline">Privacy Policy</a></li>
              <li><a href="#" className="text-tertiary hover:text-primary transition-colors no-underline">Terms of Use</a></li>
              <li><a href="#" className="text-tertiary hover:text-primary transition-colors no-underline">Refund Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-4 border-t border-primary flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <span>Copyright © 2026 RCCA Inc. All rights reserved.</span>
          <div className="flex gap-x-4 flex-wrap gap-y-1">
            <a href="#" className="text-tertiary hover:text-primary transition-colors no-underline">Privacy Policy</a>
            <a href="#" className="text-tertiary hover:text-primary transition-colors no-underline">Terms of Use</a>
            <a href="#" className="text-tertiary hover:text-primary transition-colors no-underline">Refund Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
