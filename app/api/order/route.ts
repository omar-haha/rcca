import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import { supabase } from "@/lib/supabase";
import { checkLimit, limiters } from "@/lib/ratelimit";
import { products } from "@/lib/products";

const ADMIN_EMAIL  = process.env.ADMIN_EMAIL  ?? "contact@researchchemicals.ca";
const FROM_ADDRESS = process.env.RESEND_FROM  ?? "onboarding@resend.dev";
const ETRANSFER_EMAIL = "pay@researchchemicals.ca";

const CRYPTO_ADDRESSES: Record<string, string> = {
  BTC: "bc1qzk9q3737nejypfnmz425kxa2szzsgr2c954jsz",
  ETH: "0xAA7251F9DC904A399A73F85479b03F7d053a3A33",
};

// Server-side price map — never trust client-supplied prices
const SERVER_PRICES = new Map(products.map((p) => [p.id, p.price]));

function genOrderId() {
  return "W" + Math.floor(100000000 + Math.random() * 900000000);
}

function escHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
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
      <h2 style="margin:0 0 4px;font-size:22px;font-weight:700">${escHtml(orderId)}</h2>
      <p style="margin:0 0 28px;color:#6b7280;font-size:14px">Total: <strong style="color:#111;font-size:18px">$${total.toFixed(2)}</strong></p>

      <h3 style="margin:0 0 12px;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280">Customer</h3>
      <p style="margin:0 0 4px;font-size:15px;font-weight:600">${escHtml(c.firstName)} ${escHtml(c.lastName)}</p>
      <p style="margin:0 0 4px;font-size:14px;color:#374151">${escHtml(c.email)}</p>
      <p style="margin:0 0 24px;font-size:14px;color:#6b7280">${escHtml(c.industry || "—")}</p>

      <h3 style="margin:0 0 12px;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280">Ship To</h3>
      <p style="margin:0 0 24px;font-size:14px;color:#374151;line-height:1.6">${escHtml(c.street)}<br>${escHtml(c.city)}, ${escHtml(c.postal)}<br>${escHtml(c.country)}</p>

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
      <h2 style="margin:0 0 8px;font-size:22px;font-weight:700">Order received, ${escHtml(c.firstName)}.</h2>
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
  const limited = await checkLimit(limiters.order, req);
  if (limited) return limited;

  try {
    const { customer, items, payMethod, cryptoCoin } = (await req.json()) as {
      customer: Customer;
      items: Item[];
      total: number; // ignored — recalculated server-side
      payMethod: string;
      cryptoCoin: string;
    };

    // Validate required customer fields
    if (!customer?.firstName?.trim() || !customer?.email?.trim()) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Re-derive prices from server — never trust client-supplied values
    const validatedItems: Item[] = [];
    for (const item of items) {
      const serverPrice = SERVER_PRICES.get(item.id);
      if (serverPrice === undefined) {
        return NextResponse.json({ error: `Unknown product: ${item.id}` }, { status: 400 });
      }
      if (typeof item.qty !== "number" || item.qty < 1 || item.qty > 99) {
        return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });
      }
      validatedItems.push({ ...item, price: serverPrice });
    }
    const total = validatedItems.reduce((sum, i) => sum + i.price * i.qty, 0);

    const orderId = genOrderId();

    await resend.emails.send({
      from: FROM_ADDRESS,
      to: [ADMIN_EMAIL],
      subject: `New Order ${orderId} — $${total.toFixed(2)}`,
      html: adminEmailHtml(orderId, customer, validatedItems, total, payMethod, cryptoCoin),
    });

    if (customer.email) {
      await resend.emails.send({
        from: FROM_ADDRESS,
        to: [customer.email],
        subject: `Order Received — ${orderId}`,
        html: customerEmailHtml(orderId, customer, validatedItems, total, payMethod, cryptoCoin),
      });
    }

    for (const item of validatedItems) {
      const { error: stockErr } = await supabase.rpc("decrement_stock", { vid: item.id, qty: item.qty });
      if (stockErr) console.error("[api/order] decrement_stock failed", item.id, stockErr);
    }

    const { error: insertErr } = await supabase.from("orders").insert({
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
      items:       validatedItems,
      total,
    });
    if (insertErr) console.error("[api/order] orders insert failed", orderId, insertErr);

    return NextResponse.json({ orderId });
  } catch (err) {
    console.error("[api/order]", err);
    return NextResponse.json({ error: "Failed to process order" }, { status: 500 });
  }
}
