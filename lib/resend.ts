import { Resend } from "resend";

let client: Resend | null = null;

function getClient(): Resend {
  if (!client) {
    client = new Resend(process.env.RESEND_API_KEY);
  }
  return client;
}

// Lazy for the same reason as lib/supabase.ts — the Resend constructor
// throws immediately if RESEND_API_KEY is missing, which it is during
// `next build` (env vars are only mounted at container runtime).
export const resend = new Proxy({} as Resend, {
  get(_target, prop) {
    const real = getClient();
    const value = Reflect.get(real, prop, real);
    return typeof value === "function" ? value.bind(real) : value;
  },
});
