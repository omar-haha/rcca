import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

const ADMIN_EMAIL  = process.env.ADMIN_EMAIL  ?? "contact@researchchemicals.ca";
const FROM_ADDRESS = process.env.RESEND_FROM  ?? "onboarding@resend.dev";
const ETRANSFER_EMAIL = "pay@researchchemicals.ca";

const CRYPTO_ADDRESSES: Record<string, string> = {
  BTC:  "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  ETH:  "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  USDT: "TRx7NaFCGZXv6pHerB2vB3PsVKuGxjCqGZ",
};

function genOrderId() {
  return "W" + Math.floor(100000000 + Math.random() * 900000000);
}

type Item = { id: string; name: string; unit: string; price: number; qty: number };
type Customer = { firstName: string; lastName: string; email: string; industry: string; street: string; city: string; postal: string; country: string };

function itemsTableHtml(items: Item[]) {
  const rows = items.map(
    (i) =>
      `<tr>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb">${i.name}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280">${i.unit}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:center">${i.qty}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:right;font-weight:600">$${(i.price * i.qty).toFixed(2)}</td>
      </tr>`
  );
  return `
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      <thead>
        <tr style="background:#f9fafb">
          <th style="padding:8px 12px;text-align:left;color:#6b7280;font-weight:600;font-size:11px;text-transform:uppercase;letter-spacing:.05em">Product</th>
          <th style="padding:8px 12px;text-align:left;color:#6b7280;font-weight:600;font-size:11px;text-transform:uppercase;letter-spacing:.05em">Size</th>
          <th style="padding:8px 12px;text-align:center;color:#6b7280;font-weight:600;font-size:11px;text-transform:uppercase;letter-spacing:.05em">Qty</th>
          <th style="padding:8px 12px;text-align:right;color:#6b7280;font-weight:600;font-size:11px;text-transform:uppercase;letter-spacing:.05em">Price</th>
        </tr>
      </thead>
      <tbody>${rows.join("")}</tbody>
    </table>`;
}

function paymentBlock(payMethod: string, cryptoCoin: string, total: number, orderId: string) {
  if (payMethod === "etransfer") {
    return `
      <p style="margin:0 0 8px;font-size:13px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:.05em">E-Transfer Details</p>
      <p style="margin:0 0 4px;font-size:15px;font-weight:600;font-family:monospace">${ETRANSFER_EMAIL}</p>
      <p style="margin:0;font-size:13px;color:#6b7280">Memo / message: <strong style="color:#111">${orderId}</strong></p>`;
  }
  const addr = CRYPTO_ADDRESSES[cryptoCoin] ?? "";
  return `
    <p style="margin:0 0 8px;font-size:13px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:.05em">Send ${cryptoCoin}</p>
    <p style="margin:0 0 4px;font-size:13px;font-family:monospace;word-break:break-all">${addr}</p>
    <p style="margin:0;font-size:13px;color:#6b7280">Amount: <strong style="color:#111">$${total.toFixed(2)} USD</strong> equivalent</p>`;
}

function adminEmailHtml(orderId: string, c: Customer, items: Item[], total: number, payMethod: string, cryptoCoin: string) {
  return `<!DOCTYPE html><html><body style="margin:0;padding:24px;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.1)">
    <div style="background:#000;padding:24px 32px;display:flex;align-items:center;justify-content:space-between">
      <span style="color:#fff;font-size:18px;font-weight:700;letter-spacing:-.02em">RCCA</span>
      <span style="color:#9ca3af;font-size:13px">New Order</span>
    </div>
    <div style="padding:32px">
      <h2 style="margin:0 0 4px;font-size:22px;font-weight:700">${orderId}</h2>
      <p style="margin:0 0 28px;color:#6b7280;font-size:14px">Total: <strong style="color:#111;font-size:18px">$${total.toFixed(2)}</strong></p>

      <h3 style="margin:0 0 12px;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280">Customer</h3>
      <p style="margin:0 0 4px;font-size:15px;font-weight:600">${c.firstName} ${c.lastName}</p>
      <p style="margin:0 0 4px;font-size:14px;color:#374151">${c.email}</p>
      <p style="margin:0 0 24px;font-size:14px;color:#6b7280">${c.industry || "—"}</p>

      <h3 style="margin:0 0 12px;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280">Ship To</h3>
      <p style="margin:0 0 24px;font-size:14px;color:#374151;line-height:1.6">${c.street}<br>${c.city}, ${c.postal}<br>${c.country}</p>

      <h3 style="margin:0 0 12px;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280">Items</h3>
      <div style="margin-bottom:24px;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden">${itemsTableHtml(items)}</div>

      <h3 style="margin:0 0 12px;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280">Payment</h3>
      <div style="background:#f9fafb;border-radius:10px;padding:16px">${paymentBlock(payMethod, cryptoCoin, total, orderId)}</div>
    </div>
  </div>
</body></html>`;
}

function customerEmailHtml(orderId: string, c: Customer, items: Item[], total: number, payMethod: string, cryptoCoin: string) {
  return `<!DOCTYPE html><html><body style="margin:0;padding:24px;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.1)">
    <div style="background:#000;padding:24px 32px">
      <span style="color:#fff;font-size:18px;font-weight:700;letter-spacing:-.02em">RCCA</span>
    </div>
    <div style="padding:32px">
      <h2 style="margin:0 0 8px;font-size:22px;font-weight:700">Order received, ${c.firstName}.</h2>
      <p style="margin:0 0 28px;font-size:15px;color:#6b7280;line-height:1.6">
        We have your order and will process it shortly. Complete your payment using the details below.
      </p>

      <div style="background:#f9fafb;border-radius:12px;padding:20px;margin-bottom:24px">
        <p style="margin:0 0 4px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#9ca3af">Order number</p>
        <p style="margin:0;font-size:20px;font-weight:700;font-family:monospace">${orderId}</p>
      </div>

      <h3 style="margin:0 0 12px;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280">Your Items</h3>
      <div style="margin-bottom:24px;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden">${itemsTableHtml(items)}</div>
      <p style="margin:-12px 0 24px;text-align:right;font-size:16px;font-weight:700;padding-right:12px">Total: $${total.toFixed(2)}</p>

      <h3 style="margin:0 0 12px;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280">Complete Your Payment</h3>
      <div style="background:#f9fafb;border-radius:10px;padding:16px;margin-bottom:28px">${paymentBlock(payMethod, cryptoCoin, total, orderId)}</div>

      <p style="margin:0;font-size:13px;color:#9ca3af;line-height:1.6">
        Questions? Reply to this email or reach us at <a href="mailto:support@researchchemicals.ca" style="color:#000">support@researchchemicals.ca</a>.
        <br>For research use only.
      </p>
    </div>
  </div>
</body></html>`;
}

export async function POST(req: NextRequest) {
  try {
    const { customer, items, total, payMethod, cryptoCoin } = (await req.json()) as {
      customer: Customer;
      items: Item[];
      total: number;
      payMethod: string;
      cryptoCoin: string;
    };

    const orderId = genOrderId();

    await resend.emails.send({
      from: FROM_ADDRESS,
      to: [ADMIN_EMAIL],
      subject: `New Order ${orderId} — $${total.toFixed(2)}`,
      html: adminEmailHtml(orderId, customer, items, total, payMethod, cryptoCoin),
    });

    if (customer.email) {
      await resend.emails.send({
        from: FROM_ADDRESS,
        to: [customer.email],
        subject: `Order Received — ${orderId}`,
        html: customerEmailHtml(orderId, customer, items, total, payMethod, cryptoCoin),
      });
    }

    for (const item of items) {
      await supabase.rpc("decrement_stock", { vid: item.id, qty: item.qty });
    }

    await supabase.from("orders").insert({
      id: orderId,
      first_name:  customer.firstName,
      last_name:   customer.lastName,
      email:       customer.email,
      industry:    customer.industry,
      street:      customer.street,
      city:        customer.city,
      postal:      customer.postal,
      country:     customer.country,
      pay_method:  payMethod,
      crypto_coin: payMethod === "crypto" ? cryptoCoin : null,
      items,
      total,
    });

    return NextResponse.json({ orderId });
  } catch (err) {
    console.error("[api/order]", err);
    return NextResponse.json({ error: "Failed to process order" }, { status: 500 });
  }
}
