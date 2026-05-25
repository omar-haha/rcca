"use client";

import { useState } from "react";
import { PageShell } from "@/components/PageShell";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";

const CONTENT_EN = {
  disclaimers: [
    { heading: "Research Use Only", body: "All products are intended exclusively for in vitro laboratory research. Not for human or veterinary use, diagnostic purposes, or any therapeutic application. Must not be ingested, injected, inhaled, or applied to skin." },
    { heading: "Not Regulatory Approved", body: "These products have not been evaluated or authorized by the FDA, Health Canada, EMA, or any equivalent regulatory body for safety, efficacy, or quality." },
    { heading: "Purchaser Eligibility", body: "By ordering, purchasers confirm they are of legal age, qualified to handle research chemicals, and solely responsible for compliance with all applicable local, provincial, and federal laws." },
    { heading: "Export & Import Controls", body: "Purchasers are responsible for compliance with all import and export regulations in their jurisdiction. RCCA reserves the right to refuse or cancel any order at its sole discretion." },
    { heading: "Limitation of Liability", body: "RCCA Inc. is not liable for any damages arising from the purchase or use of any product. Purchasers agree to indemnify RCCA Inc. from any claims resulting from misuse of products." },
    { heading: "Universal Disclaimer", body: "RCCA Inc. makes no representations or warranties, expressed or implied, regarding the fitness of any product for a particular purpose. Purity and quality data are sourced from our suppliers and have not been independently verified by RCCA. All products are sold subject to RCCA's Terms and Conditions of Sale. These terms are subject to change without notice. By completing a purchase, you acknowledge that you have read, understood, and agreed to all terms, conditions, and disclosures stated herein and on the RCCA website." },
  ],
  privacy: [
    { heading: "Information We Collect", body: "We collect information you provide directly when placing an order: name, email address, shipping address, phone number, and industry. We do not store payment credentials — all payment is completed externally via Interac e-Transfer or cryptocurrency." },
    { heading: "How We Use Your Information", body: "Your information is used solely to process and fulfill your order, communicate order status, and comply with applicable legal obligations. We do not sell, rent, or share your personal information with third parties for marketing purposes." },
    { heading: "Data Retention", body: "Order records are retained for a minimum of seven years as required by Canadian tax and business regulations. You may request deletion of your personal data at any time, subject to legal retention requirements." },
    { heading: "Cookies", body: "We use only essential cookies required for site functionality (session state, age verification). No tracking or advertising cookies are used." },
    { heading: "Security", body: "We implement reasonable technical and organizational measures to protect your personal information. No method of transmission over the internet is 100% secure, and we cannot guarantee absolute security." },
    { heading: "Your Rights (PIPEDA)", body: "Under PIPEDA (Canada) you have the right to access, correct, or request deletion of your personal information held by RCCA Inc. Contact us at support@researchchemicals.ca to exercise these rights." },
    { heading: "Contact", body: "Questions regarding this policy may be directed to support@researchchemicals.ca. This policy was last updated May 2026 and is subject to change without notice." },
  ],
  terms: [
    { heading: "Acceptance", body: "By accessing this website or placing an order, you agree to be bound by these Terms of Use and all applicable laws. If you do not agree, do not use this site." },
    { heading: "Research Use Only", body: "All products offered by RCCA Inc. are strictly for in vitro laboratory research. They are not for human or veterinary consumption, diagnostic use, or any therapeutic application. You represent that you are a qualified researcher or authorized representative of a registered research institution." },
    { heading: "Eligibility", body: "You must be of legal age in your province or territory and legally permitted to purchase research chemicals. RCCA reserves the right to refuse service to any person or entity at its sole discretion." },
    { heading: "Orders & Payment", body: "All prices are in Canadian dollars unless stated otherwise. Orders are accepted subject to product availability. Payment must be received before shipment. RCCA reserves the right to cancel any order prior to fulfillment." },
    { heading: "Regulatory Compliance", body: "You are solely responsible for ensuring that the purchase, import, possession, and use of any product complies with all applicable laws in your jurisdiction. RCCA makes no representation that any product is legal in your jurisdiction." },
    { heading: "Intellectual Property", body: "All content on this site — including text, graphics, logos, and design — is the property of RCCA Inc. and may not be reproduced or used without prior written permission." },
    { heading: "Limitation of Liability", body: "RCCA Inc. shall not be liable for any indirect, incidental, special, or consequential damages arising from use of this site or any product purchased. Your sole remedy for dissatisfaction is to stop using the site and products." },
    { heading: "Governing Law", body: "These terms are governed by the laws of the Province of Québec and the federal laws of Canada applicable therein, without regard to conflict of law principles." },
  ],
  refund: [
    { heading: "All Sales Final", body: "Due to the nature of research chemicals and strict handling requirements, all sales are final. We do not accept returns or exchanges once an order has shipped." },
    { heading: "Damaged or Incorrect Orders", body: "If you receive a product that is damaged in transit or materially different from what was ordered, contact us at support@researchchemicals.ca within 48 hours of delivery with photos and your order number. We will assess and, at our discretion, offer a replacement or store credit." },
    { heading: "Lost Shipments", body: "If tracking confirms a shipment is lost in transit, contact us and we will investigate with the carrier. Replacement or credit is issued at RCCA's sole discretion after investigation is complete." },
    { heading: "Order Cancellation", body: "Orders may be cancelled within 2 hours of placement if they have not yet been processed. Contact us immediately at support@researchchemicals.ca. Once an order is in fulfillment it cannot be cancelled." },
  ],
};

const CONTENT_FR = {
  disclaimers: [
    { heading: "Usage de recherche uniquement", body: "Tous les produits sont destinés exclusivement à la recherche en laboratoire in vitro. Ils ne sont pas destinés à un usage humain ou vétérinaire, à des fins diagnostiques ou à toute application thérapeutique. Ils ne doivent pas être ingérés, injectés, inhalés ou appliqués sur la peau." },
    { heading: "Non approuvé par les autorités réglementaires", body: "Ces produits n'ont pas été évalués ni autorisés par la FDA, Santé Canada, l'EMA ou tout organisme réglementaire équivalent en matière d'innocuité, d'efficacité ou de qualité." },
    { heading: "Admissibilité de l'acheteur", body: "En passant une commande, les acheteurs confirment qu'ils sont majeurs, qualifiés pour manipuler des produits chimiques de recherche et entièrement responsables du respect de toutes les lois locales, provinciales et fédérales applicables." },
    { heading: "Contrôles à l'exportation et à l'importation", body: "Les acheteurs sont responsables du respect de toutes les réglementations d'importation et d'exportation dans leur juridiction. RCCA se réserve le droit de refuser ou d'annuler toute commande à sa seule discrétion." },
    { heading: "Limitation de responsabilité", body: "RCCA Inc. n'est pas responsable des dommages résultant de l'achat ou de l'utilisation d'un produit. Les acheteurs acceptent d'indemniser RCCA Inc. contre toute réclamation résultant d'une mauvaise utilisation des produits." },
    { heading: "Avertissement universel", body: "RCCA Inc. ne fait aucune représentation ni garantie, expresse ou implicite, concernant l'adéquation d'un produit à un usage particulier. Les données de pureté et de qualité proviennent de nos fournisseurs et n'ont pas été vérifiées indépendamment par RCCA. Tous les produits sont vendus selon les conditions générales de vente de RCCA, susceptibles d'être modifiées sans préavis. En effectuant un achat, vous reconnaissez avoir lu, compris et accepté toutes les conditions et mentions légales figurant sur le site RCCA." },
  ],
  privacy: [
    { heading: "Informations collectées", body: "Nous collectons les informations que vous fournissez directement lors d'une commande : nom, adresse courriel, adresse de livraison, numéro de téléphone et secteur d'activité. Nous ne stockons pas vos données de paiement — tout paiement est effectué en dehors de notre plateforme via virement Interac ou cryptomonnaie." },
    { heading: "Utilisation de vos informations", body: "Vos informations sont utilisées uniquement pour traiter et expédier votre commande, communiquer son statut et respecter les obligations légales applicables. Nous ne vendons, ne louons ni ne partageons vos informations personnelles à des tiers à des fins de marketing." },
    { heading: "Conservation des données", body: "Les dossiers de commandes sont conservés pendant au moins sept ans, conformément aux réglementations fiscales et commerciales canadiennes. Vous pouvez demander la suppression de vos données personnelles à tout moment, sous réserve des exigences légales de conservation." },
    { heading: "Témoins (cookies)", body: "Nous n'utilisons que les témoins essentiels au fonctionnement du site (état de session, vérification de l'âge). Aucun témoin de suivi ou de publicité n'est utilisé." },
    { heading: "Sécurité", body: "Nous mettons en œuvre des mesures techniques et organisationnelles raisonnables pour protéger vos informations personnelles. Aucun mode de transmission sur Internet n'est sécurisé à 100 % et nous ne pouvons garantir une sécurité absolue." },
    { heading: "Vos droits (LPRPDE)", body: "En vertu de la LPRPDE (Canada), vous avez le droit d'accéder à vos informations personnelles, de les corriger ou d'en demander la suppression. Contactez-nous à support@researchchemicals.ca pour exercer ces droits." },
    { heading: "Contact", body: "Les questions relatives à cette politique peuvent être adressées à support@researchchemicals.ca. Cette politique a été mise à jour en mai 2026 et peut être modifiée sans préavis." },
  ],
  terms: [
    { heading: "Acceptation", body: "En accédant à ce site ou en passant une commande, vous acceptez d'être lié par ces conditions d'utilisation et toutes les lois applicables. Si vous n'acceptez pas, veuillez ne pas utiliser ce site." },
    { heading: "Usage de recherche uniquement", body: "Tous les produits offerts par RCCA Inc. sont strictement destinés à la recherche en laboratoire in vitro. Ils ne sont pas destinés à la consommation humaine ou vétérinaire, à un usage diagnostique ou à toute application thérapeutique. Vous déclarez être un chercheur qualifié ou un représentant autorisé d'une institution de recherche enregistrée." },
    { heading: "Admissibilité", body: "Vous devez être majeur dans votre province ou territoire et légalement autorisé à acheter des produits chimiques de recherche. RCCA se réserve le droit de refuser le service à toute personne ou entité à sa seule discrétion." },
    { heading: "Commandes et paiement", body: "Tous les prix sont en dollars canadiens, sauf indication contraire. Les commandes sont acceptées sous réserve de disponibilité des produits. Le paiement doit être reçu avant l'expédition. RCCA se réserve le droit d'annuler toute commande avant son exécution." },
    { heading: "Conformité réglementaire", body: "Vous êtes seul responsable de vous assurer que l'achat, l'importation, la possession et l'utilisation de tout produit sont conformes à toutes les lois applicables dans votre juridiction. RCCA ne garantit pas qu'un produit est légal dans votre juridiction." },
    { heading: "Propriété intellectuelle", body: "Tout le contenu de ce site — textes, graphiques, logos et design — est la propriété de RCCA Inc. et ne peut être reproduit ou utilisé sans autorisation écrite préalable." },
    { heading: "Limitation de responsabilité", body: "RCCA Inc. ne sera pas responsable des dommages indirects, accessoires, spéciaux ou consécutifs découlant de l'utilisation de ce site ou de tout produit acheté. Votre seul recours en cas d'insatisfaction est de cesser d'utiliser le site et les produits." },
    { heading: "Droit applicable", body: "Ces conditions sont régies par les lois de la province de Québec et les lois fédérales du Canada applicables, sans égard aux principes de conflits de lois." },
  ],
  refund: [
    { heading: "Toutes les ventes sont définitives", body: "En raison de la nature des produits chimiques de recherche et des exigences strictes de manipulation, toutes les ventes sont définitives. Nous n'acceptons pas les retours ni les échanges une fois la commande expédiée." },
    { heading: "Commandes endommagées ou incorrectes", body: "Si vous recevez un produit endommagé lors du transport ou sensiblement différent de ce qui a été commandé, contactez-nous à support@researchchemicals.ca dans les 48 heures suivant la livraison avec des photos et votre numéro de commande. Nous évaluerons la situation et, à notre discrétion, offrirons un remplacement ou un crédit en boutique." },
    { heading: "Colis perdus", body: "Si le suivi confirme qu'un colis a été perdu en transit, contactez-nous et nous mènerons une enquête auprès du transporteur. Un remplacement ou un crédit est accordé à la seule discrétion de RCCA après la fin de l'enquête." },
    { heading: "Annulation de commande", body: "Les commandes peuvent être annulées dans les 2 heures suivant leur passage si elles n'ont pas encore été traitées. Contactez-nous immédiatement à support@researchchemicals.ca. Une fois une commande en cours de traitement, elle ne peut être annulée." },
  ],
};

type TabId = "disclaimers" | "privacy" | "terms" | "refund";

export default function LegalPage() {
  const [tab, setTab] = useState<TabId>("disclaimers");
  const { t } = useLanguage();

  const TABS: { id: TabId; label: string }[] = [
    { id: "disclaimers", label: t("page_legal_tab_disc") },
    { id: "privacy",     label: t("page_legal_tab_priv") },
    { id: "terms",       label: t("page_legal_tab_terms") },
    { id: "refund",      label: t("page_legal_tab_ref") },
  ];

  const { lang } = useLanguage();
  const content = lang === "fr" ? CONTENT_FR[tab] : CONTENT_EN[tab];

  return (
    <PageShell>
      <div className="max-w-[800px] mx-auto px-4 md:px-6 py-[80px] md:py-[100px]">
        <div className="mb-10">
          <p className="text-[12px] font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--text-muted)" }}>
            {t("page_legal_eyebrow")}
          </p>
          <h1 className="text-[34px] md:text-[44px] font-semibold tracking-tight text-primary">
            {t("page_legal_title")}
          </h1>
        </div>

        <div className="flex flex-wrap gap-1.5 p-1.5 rounded-[14px] mb-10 w-fit" style={{ backgroundColor: "var(--surface)" }}>
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={cn(
                "rounded-[10px] px-4 py-2 text-[13px] font-medium cursor-pointer border-none transition-all duration-200",
                tab === id ? "text-primary shadow-sm" : "text-secondary hover:text-primary"
              )}
              style={tab === id ? { backgroundColor: "var(--bg)" } : { backgroundColor: "transparent" }}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-8">
          {content.map((s) => (
            <div key={s.heading}>
              <h2 className="text-[16px] font-semibold text-primary mb-2">{s.heading}</h2>
              <p className="text-[14px] text-secondary leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-[16px] p-6 text-[12px] text-secondary leading-relaxed" style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}>
          {t("page_legal_footer")}{" "}
          <a href="mailto:support@researchchemicals.ca" className="text-[color:var(--accent)] no-underline hover:underline">
            support@researchchemicals.ca
          </a>
        </div>
      </div>
    </PageShell>
  );
}
