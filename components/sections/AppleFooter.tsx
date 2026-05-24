export function AppleFooter() {
  return (
    <footer className="bg-secondary pt-6 pb-12 px-4 border-t border-primary text-[12px] text-tertiary font-normal">
      <div className="max-w-[1024px] mx-auto">
        {/* Top Footnotes */}
        <div className="border-b border-primary pb-4 mb-5">
          <p className="mb-2 leading-relaxed">
            1. All compounds provided by RCCA are strictly for in vitro scientific research purposes only. Not intended, authorized, or permitted for use in humans or animals under any circumstances.
          </p>
          <p className="mb-2 leading-relaxed">
            2. Purchasers acknowledge these compounds have not been evaluated by the FDA, Health Canada, or equivalent regulatory bodies for safety or efficacy, and must be handled only by trained scientific professionals.
          </p>
          <p className="mb-2 leading-relaxed">
            3. Misuse of research chemicals may violate federal, provincial, state, or local law and may result in serious injury or criminal prosecution.
          </p>
          <p className="mb-0 leading-relaxed">
            4. By placing an order, you represent and warrant that you are at least 18 years of age and a licensed researcher or authorized representative of a registered research institution.
          </p>
        </div>

        {/* Directory Grid */}
        <div className="flex flex-wrap justify-between pt-2 pb-6">
          <div className="w-1/2 md:w-auto mb-6 md:mb-0">
            <h3 className="text-primary font-semibold mb-2 text-[12px]">Shop and Learn</h3>
            <ul className="list-none p-0 m-0 flex flex-col gap-1.5">
              <li><a href="#" className="text-tertiary hover:text-primary transition-colors no-underline">All Peptides</a></li>
              <li><a href="#" className="text-tertiary hover:text-primary transition-colors no-underline">BPC-157</a></li>
              <li><a href="#" className="text-tertiary hover:text-primary transition-colors no-underline">Retatrutide</a></li>
              <li><a href="#" className="text-tertiary hover:text-primary transition-colors no-underline">Lab Equipment</a></li>
            </ul>
          </div>
          <div className="w-1/2 md:w-auto mb-6 md:mb-0">
            <h3 className="text-primary font-semibold mb-2 text-[12px]">Quality</h3>
            <ul className="list-none p-0 m-0 flex flex-col gap-1.5">
              <li><a href="#" className="text-tertiary hover:text-primary transition-colors no-underline">HPLC-MS Verification</a></li>
              <li><a href="#" className="text-tertiary hover:text-primary transition-colors no-underline">Third-Party COAs</a></li>
              <li><a href="#" className="text-tertiary hover:text-primary transition-colors no-underline">GMP Synthesis</a></li>
              <li><a href="#" className="text-tertiary hover:text-primary transition-colors no-underline">Cold-Chain Protocol</a></li>
            </ul>
          </div>
          <div className="w-1/2 md:w-auto mb-6 md:mb-0">
            <h3 className="text-primary font-semibold mb-2 text-[12px]">Compliance</h3>
            <ul className="list-none p-0 m-0 flex flex-col gap-1.5">
              <li><a href="#" className="text-tertiary hover:text-primary transition-colors no-underline">Research Use Only</a></li>
              <li><a href="#" className="text-tertiary hover:text-primary transition-colors no-underline">Age Verification</a></li>
              <li><a href="#" className="text-tertiary hover:text-primary transition-colors no-underline">Export Controls</a></li>
              <li><a href="#" className="text-tertiary hover:text-primary transition-colors no-underline">Controlled Substances</a></li>
            </ul>
          </div>
          <div className="w-1/2 md:w-auto mb-6 md:mb-0">
            <h3 className="text-primary font-semibold mb-2 text-[12px]">About RCCA</h3>
            <ul className="list-none p-0 m-0 flex flex-col gap-1.5">
              <li><a href="#" className="text-tertiary hover:text-primary transition-colors no-underline">Our Mission</a></li>
              <li><a href="#" className="text-tertiary hover:text-primary transition-colors no-underline">Laboratories</a></li>
              <li><a href="#" className="text-tertiary hover:text-primary transition-colors no-underline">Contact Us</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Row */}
        <div className="pt-4 border-t border-primary flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="text-tertiary">
            Copyright © 2026 RCCA Inc. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <a href="#" className="text-tertiary hover:text-primary transition-colors no-underline border-r border-primary pr-4">Privacy Policy</a>
            <a href="#" className="text-tertiary hover:text-primary transition-colors no-underline border-r border-primary pr-4">Terms of Use</a>
            <a href="#" className="text-tertiary hover:text-primary transition-colors no-underline border-r border-primary pr-4">Sales and Refunds</a>
            <a href="#" className="text-tertiary hover:text-primary transition-colors no-underline">Legal</a>
          </div>
          <div className="text-tertiary hover:text-primary transition-colors cursor-pointer">
            Canada
          </div>
        </div>
      </div>
    </footer>
  );
}
