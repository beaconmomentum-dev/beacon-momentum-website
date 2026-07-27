/**
 * Beacon Momentum — The Watch payment confirmation
 * Design reminder: calm operational confirmation, not a simulated member-access claim.
 */
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

const C = { deep: "#071523", water: "#0D263B", amber: "#D4A94D", cream: "#F7F1E5", mist: "rgba(247,241,229,0.70)", line: "rgba(212,169,77,0.26)" };

type ConfirmationState = "loading" | "succeeded" | "processing" | "unavailable" | "failed";

export default function TheWatchConfirmationPage() {
  const config = trpc.watchCheckout.publicConfig.useQuery(undefined, { retry: false, refetchOnWindowFocus: false });
  const [state, setState] = useState<ConfirmationState>("loading");
  const stripePromise = useMemo(() => (config.data?.publishableKey ? loadStripe(config.data.publishableKey) : null), [config.data?.publishableKey]);

  useEffect(() => {
    async function verify() {
      const params = new URLSearchParams(window.location.search);
      const returnSecret = params.get("payment_intent_client_secret");
      if (!returnSecret && !sessionStorage.getItem("watch_checkout_confirmation")) {
        setState("unavailable");
        return;
      }
      if (!returnSecret) {
        const stored = sessionStorage.getItem("watch_checkout_confirmation");
        const parsed = stored ? JSON.parse(stored) as { status?: string } : null;
        setState(parsed?.status === "succeeded" ? "succeeded" : parsed?.status === "processing" ? "processing" : "unavailable");
        return;
      }
      if (!stripePromise) return;
      const stripe = await stripePromise;
      if (!stripe) {
        setState("unavailable");
        return;
      }
      const result = await stripe.retrievePaymentIntent(returnSecret);
      if (result.error) {
        setState("failed");
        return;
      }
      setState(result.paymentIntent?.status === "succeeded" ? "succeeded" : result.paymentIntent?.status === "processing" ? "processing" : "failed");
    }
    if (config.isLoading) return;
    if (!config.data?.ready) {
      setState("unavailable");
      return;
    }
    void verify();
  }, [config.data?.ready, config.isLoading, stripePromise]);

  const copy = state === "succeeded"
    ? { title: "Your payment is confirmed.", body: "Beacon Momentum LLC has received your annual The Watch enrollment. Keep the receipt email for your records. Enrollment and access instructions will be sent to the email used at checkout after the Beacon Community provisioning workflow completes." }
    : state === "processing"
      ? { title: "Your payment is processing.", body: "We are waiting for the payment processor’s final confirmation. Do not submit another payment. Check your email shortly, or contact support if you do not receive a confirmation." }
      : state === "failed"
        ? { title: "We could not confirm the payment.", body: "No access is being represented as active from this screen. Return to secure enrollment to review the payment details, or contact support for help." }
        : { title: "Confirm your enrollment status.", body: "We cannot verify a payment from this browser session. Please check the email used at checkout or contact Beacon support with your receipt details." };

  return (
    <main id="main-content" style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "2rem", background: "radial-gradient(circle at 78% 15%, rgba(212,169,77,0.14), transparent 25%), #071523", color: C.cream, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
      <section style={{ maxWidth: "720px", width: "100%", background: C.water, border: `1px solid ${C.line}`, padding: "clamp(1.75rem, 5vw, 4rem)", boxShadow: "0 28px 100px rgba(0,0,0,0.35)" }}>
        <p style={{ margin: 0, color: C.amber, textTransform: "uppercase", letterSpacing: "0.16em", fontWeight: 800, fontSize: "0.72rem" }}>The Watch · Enrollment status</p>
        <h1 style={{ margin: "1rem 0 0", fontFamily: "Georgia, serif", fontWeight: 500, fontSize: "clamp(2.25rem, 5vw, 4rem)", letterSpacing: "-0.04em", lineHeight: 1.04 }}>{copy.title}</h1>
        <p style={{ margin: "1.5rem 0 0", color: C.mist, lineHeight: 1.8, fontSize: "1.02rem" }}>{copy.body}</p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "2rem" }}>
          {(state === "failed" || state === "unavailable") && <Link href="/the-watch/checkout" style={{ background: C.amber, color: C.deep, padding: "0.9rem 1.15rem", textDecoration: "none", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", fontSize: "0.76rem" }}>Return to secure enrollment</Link>}
          <Link href="/the-watch" style={{ border: `1px solid ${C.line}`, color: C.cream, padding: "0.9rem 1.15rem", textDecoration: "none", fontWeight: 700, fontSize: "0.8rem" }}>Review The Watch</Link>
          <a href="mailto:support@beaconmomentum.com" style={{ border: `1px solid ${C.line}`, color: C.cream, padding: "0.9rem 1.15rem", textDecoration: "none", fontWeight: 700, fontSize: "0.8rem" }}>Contact support</a>
        </div>
      </section>
    </main>
  );
}
