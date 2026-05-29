"use client";

import { PageShell } from "@/components/PageShell";
import { useLanguage } from "@/components/providers/LanguageProvider";

const CONTENT_EN = [
  {
    heading: "Order Processing",
    body: "Orders are processed within 1–2 business days after payment is confirmed. You will receive an email confirmation once your order has shipped, including your tracking number.",
  },
  {
    heading: "Domestic Shipping (Canada)",
    body: "Standard shipping within Canada typically takes 2–5 business days after dispatch. We ship via Canada Post Xpresspost or equivalent tracked carrier. Expedited and overnight options may be available — contact us at support@researchchemicals.ca to request.",
  },
  {
    heading: "International Shipping",
    body: "We ship to select international destinations. Delivery times vary by country, typically 7–14 business days. You are solely responsible for ensuring that importing these products complies with all regulations in your jurisdiction. RCCA reserves the right to refuse any international shipment.",
  },
  {
    heading: "Discreet Packaging",
    body: "All orders are shipped in plain, unmarked packaging. Shipping labels contain only the sender and recipient addresses — no branding, product names, or content descriptions appear on the outside of the parcel.",
  },
  {
    heading: "Order Tracking",
    body: "Every order ships with a tracking number sent to your email. You can track your shipment directly on the carrier's website. If you haven't received tracking within 2 business days of payment confirmation, contact us and we will investigate.",
  },
  {
    heading: "Payment & Dispatch",
    body: "Orders are dispatched only after payment is confirmed. For Interac e-Transfer, this typically takes 1–4 hours on business days. For cryptocurrency, confirmation requires the standard number of network confirmations (usually 1–3 for BTC, a few minutes for ETH/USDT).",
  },
  {
    heading: "Lost or Delayed Shipments",
    body: "If your tracking shows no movement for 5+ business days or the carrier confirms the parcel is lost, contact us at support@researchchemicals.ca with your order number. We will open an investigation with the carrier and, at our discretion, dispatch a replacement or issue store credit.",
  },
];

const CONTENT_FR = [
  {
    heading: "Traitement des commandes",
    body: "Les commandes sont traitées dans les 1 à 2 jours ouvrables après confirmation du paiement. Vous recevrez un courriel de confirmation une fois votre commande expédiée, incluant votre numéro de suivi.",
  },
  {
    heading: "Livraison nationale (Canada)",
    body: "La livraison standard au Canada prend généralement 2 à 5 jours ouvrables après l'expédition. Nous expédions via Xpresspost de Postes Canada ou un transporteur équivalent avec suivi. Des options expéditées peuvent être disponibles — contactez-nous à support@researchchemicals.ca pour en faire la demande.",
  },
  {
    heading: "Livraison internationale",
    body: "Nous expédions vers certaines destinations internationales. Les délais varient selon le pays, généralement 7 à 14 jours ouvrables. Vous êtes entièrement responsable de vous assurer que l'importation de ces produits est conforme à toutes les réglementations applicables dans votre juridiction. RCCA se réserve le droit de refuser tout envoi international.",
  },
  {
    heading: "Emballage discret",
    body: "Toutes les commandes sont expédiées dans un emballage neutre et non marqué. Les étiquettes d'expédition contiennent uniquement les adresses de l'expéditeur et du destinataire — aucune marque, nom de produit ou description du contenu n'apparaît à l'extérieur du colis.",
  },
  {
    heading: "Suivi de commande",
    body: "Chaque commande est expédiée avec un numéro de suivi envoyé à votre adresse courriel. Vous pouvez suivre votre envoi directement sur le site du transporteur. Si vous n'avez pas reçu de numéro de suivi dans les 2 jours ouvrables suivant la confirmation du paiement, contactez-nous et nous ferons une vérification.",
  },
  {
    heading: "Paiement et expédition",
    body: "Les commandes sont expédiées uniquement après confirmation du paiement. Pour le virement Interac, cela prend généralement 1 à 4 heures les jours ouvrables. Pour les cryptomonnaies, la confirmation requiert le nombre standard de confirmations réseau.",
  },
  {
    heading: "Colis perdus ou retardés",
    body: "Si votre suivi ne montre aucun mouvement pendant 5 jours ouvrables ou plus, ou si le transporteur confirme la perte du colis, contactez-nous à support@researchchemicals.ca avec votre numéro de commande. Nous ouvrirons une enquête et, à notre discrétion, enverrons un remplacement ou accorderons un crédit en boutique.",
  },
];

export default function ShippingPage() {
  const { lang } = useLanguage();
  const content = lang === "fr" ? CONTENT_FR : CONTENT_EN;

  return (
    <PageShell>
      <div className="max-w-[720px] mx-auto px-4 py-12 md:py-20">
        <p className="text-[11px] font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--text-muted)" }}>
          {lang === "fr" ? "Expédition" : "Shipping"}
        </p>
        <h1 className="text-[32px] md:text-[42px] font-semibold tracking-tight text-primary mb-3 leading-tight">
          {lang === "fr" ? "Politique d'expédition" : "Shipping Policy"}
        </h1>
        <p className="text-[16px] text-secondary mb-12">
          {lang === "fr"
            ? "Tout ce que vous devez savoir sur les délais et la livraison."
            : "Everything you need to know about timelines and delivery."}
        </p>

        <div className="flex flex-col gap-8">
          {content.map((item) => (
            <div key={item.heading} className="rounded-[16px] p-6" style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}>
              <h2 className="text-[16px] font-semibold text-primary mb-2">{item.heading}</h2>
              <p className="text-[14px] text-secondary leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>

        <p className="text-[13px] text-tertiary text-center mt-12">
          {lang === "fr"
            ? "Des questions ? Écrivez-nous à "
            : "Questions? Email us at "}
          <a href="mailto:support@researchchemicals.ca" className="text-primary hover:underline">
            support@researchchemicals.ca
          </a>
        </p>
      </div>
    </PageShell>
  );
}
