"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PageShell } from "@/components/PageShell";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";

const FAQS_EN = [
  { q: "What makes LOAM different?", a: "Every piece in our collection comes from a vetted maker with documented materials and sourcing. We publish that documentation on our Materials & Care page and provide it with every order." },
  { q: "How do I place an order?", a: "Browse the store, select your product and quantity, add it to your bag, and proceed to checkout. At checkout you'll provide your contact and shipping details, then complete payment via Interac e-Transfer or cryptocurrency. Orders are processed within 1–2 business days after payment is confirmed." },
  { q: "What payment methods do you accept?", a: "We accept Interac e-Transfer (Canadian banks) and cryptocurrency (BTC, ETH). Payment instructions are shown at checkout and on your order confirmation. All prices are in CAD unless otherwise noted." },
  { q: "How long does shipping take?", a: "Orders ship within 1–2 business days after payment is confirmed. Standard delivery within Canada is typically 2–5 business days. Expedited options may be available — contact us at support@loamgoods.example to inquire." },
  { q: "Do you ship internationally?", a: "We currently ship within Canada and to select international destinations. You are solely responsible for ensuring compliance with all import regulations in your jurisdiction. LOAM reserves the right to refuse shipment to any location." },
  { q: "How should I care for my pieces?", a: "Care varies by material — check the product page for specific guidance (e.g. linen prefers a cold, gentle cycle; solid wood and brass just need an occasional dry wipe). A general care note ships with every order, and our full Materials & Care page covers sourcing and finishing in more detail." },
  { q: "Can I get material or sourcing details for my order?", a: "Yes. Every batch ships with a maker-issued materials note, and it's available on request even after delivery. Email support@loamgoods.example with your order number and the specific product, and we'll provide it within 1 business day." },
  { q: "What is your refund policy?", a: "Unused items in original packaging can be returned within 30 days. If you receive a damaged or incorrect order, contact us within 48 hours of delivery with photos and your order number. We will review and, at our discretion, offer a replacement, refund, or store credit. See our full Refund Policy for details." },
  { q: "Do you offer trade or bulk pricing?", a: "Yes, we work with interior designers, hospitality, and retail buyers on volume orders. Contact us at support@loamgoods.example with what you need and we will provide a custom quote." },
  { q: "How is my order packaged?", a: "Orders ship in protective, unbranded outer packaging suited to each product. Shipping labels contain only the sender and recipient addresses, as with any commercial shipment." },
];

const FAQS_FR = [
  { q: "Qu'est-ce qui distingue LOAM ?", a: "Chaque pièce de notre collection provient d'un artisan évalué, avec des matériaux et un approvisionnement documentés. Nous publions cette documentation sur notre page Matériaux et entretien et la fournissons avec chaque commande." },
  { q: "Comment passer une commande ?", a: "Parcourez la boutique, sélectionnez votre produit et la quantité, ajoutez-le à votre panier et passez à la caisse. Lors du paiement, vous fournirez vos coordonnées et vos informations d'expédition, puis compléterez le paiement par virement Interac ou cryptomonnaie. Les commandes sont traitées dans les 1 à 2 jours ouvrables après confirmation du paiement." },
  { q: "Quels modes de paiement acceptez-vous ?", a: "Nous acceptons le virement Interac (banques canadiennes) et les cryptomonnaies (BTC, ETH). Les instructions de paiement sont affichées à la caisse et sur la confirmation de commande. Tous les prix sont en CAD, sauf indication contraire." },
  { q: "Quel est le délai de livraison ?", a: "Les commandes sont expédiées dans les 1 à 2 jours ouvrables après confirmation du paiement. La livraison standard au Canada prend généralement 2 à 5 jours ouvrables. Des options accélérées peuvent être disponibles — contactez-nous à support@loamgoods.example pour vous renseigner." },
  { q: "Livrez-vous à l'international ?", a: "Nous livrons actuellement au Canada et dans certaines destinations internationales. Vous êtes seul responsable du respect de toutes les réglementations d'importation applicables dans votre juridiction. LOAM se réserve le droit de refuser toute expédition vers n'importe quel endroit." },
  { q: "Comment entretenir mes pièces ?", a: "L'entretien varie selon le matériau — consultez la fiche produit pour des conseils précis (p. ex. le lin préfère un cycle froid et délicat ; le bois massif et le laiton n'ont besoin que d'un essuyage sec occasionnel). Une note d'entretien accompagne chaque commande, et notre page Matériaux et entretien détaille davantage l'approvisionnement et la finition." },
  { q: "Puis-je obtenir les détails de matériaux pour ma commande ?", a: "Oui. Chaque lot est accompagné d'une fiche matériaux émise par l'artisan, disponible sur demande même après la livraison. Écrivez à support@loamgoods.example avec votre numéro de commande et le produit concerné, et nous vous la fournirons dans un délai d'un jour ouvrable." },
  { q: "Quelle est votre politique de remboursement ?", a: "Les articles non utilisés dans leur emballage d'origine peuvent être retournés dans les 30 jours. Si vous recevez une commande endommagée ou incorrecte, contactez-nous dans les 48 heures suivant la livraison avec des photos et votre numéro de commande. Nous examinerons la situation et, à notre discrétion, offrirons un remplacement, un remboursement ou un crédit en boutique." },
  { q: "Offrez-vous des tarifs professionnels ou en gros ?", a: "Oui, nous travaillons avec des designers d'intérieur, des acheteurs en hôtellerie et au détail pour les commandes en volume. Contactez-nous à support@loamgoods.example avec vos besoins et nous vous fournirons un devis personnalisé." },
  { q: "Comment ma commande est-elle emballée ?", a: "Les commandes sont expédiées dans un emballage extérieur protecteur et sans marque, adapté à chaque produit. Les étiquettes d'expédition contiennent uniquement les adresses de l'expéditeur et du destinataire, comme pour tout envoi commercial." },
];

function FaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="rounded-[16px] overflow-hidden" style={{ border: "1px solid var(--border)" }}>
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer border-none bg-transparent"
        style={{ backgroundColor: open ? "var(--surface)" : "var(--bg)" }}
      >
        <span className="text-[15px] font-medium text-primary leading-snug">{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0" style={{ color: "var(--text-muted)" }}>
          <ChevronDown size={16} strokeWidth={2} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="body" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22, ease: "easeInOut" }} style={{ overflow: "hidden" }}>
            <p className="px-6 pb-5 text-[14px] text-secondary leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(null);
  const { lang, t } = useLanguage();
  const faqs = lang === "fr" ? FAQS_FR : FAQS_EN;

  return (
    <PageShell>
      <div className="max-w-[720px] mx-auto px-4 md:px-6 py-[80px] md:py-[100px]">
        <div className="mb-12">
          <p className="text-[12px] font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--text-muted)" }}>
            {t("page_support")}
          </p>
          <h1 className="text-[34px] md:text-[44px] font-semibold tracking-tight text-primary mb-4">
            {t("page_faq_title")}
          </h1>
          <p className="text-[16px] text-secondary leading-relaxed">
            {t("page_faq_sub")}{" "}
            <a href="mailto:support@loamgoods.example" className="text-[color:var(--accent)] no-underline hover:underline">
              support@loamgoods.example
            </a>
          </p>
        </div>
        <div className="flex flex-col gap-2">
          {faqs.map((item, i) => (
            <FaqItem key={i} q={item.q} a={item.a} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          ))}
        </div>
      </div>
    </PageShell>
  );
}
