/**
 * Beacon Momentum — The Watch test-mode confirmation.
 * Design reminder: explicit operational result; never claim live membership access.
 */
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useMemo, useState } from "react";
import { trpc } from "@/lib/trpc";

const C = { deep: "#071523", water: "#0D263B", amber: "#D4A94D", cream: "#F7F1E5", mist: "rgba(247,241,229,0.70)", line: "rgba(212,169,77,0.26)" };
type ConfirmationState = "loading" | "succeeded" | "processing" | "unavailable" | "failed";

export default function TheWatchTestConfirmationPage() {
  const config = trpc.watchTestCheckout.publicConfig.useQuery(undefined, { retry: false, refetchOnWindowFocus: false });
  const [state, setState] = useState<ConfirmationState>("loading");
  const stripePromise = useMemo(() => (config.data?.publishableKey ? loadStripe(config.data.publishableKey) : null), [config.data?.publishableKey]);

  useEffect(() => {
    async function verify() {
      const params = new URLSearchParams(window.location.search);
      const returnSecret = params.get("payment_intent_client_secret");
      const stored = sessionStorage.getItem("watch_test_checkout_confirmation");
      if (!returnSecret && !stored) {
        setState("unavailable");
        return;
      }
      if (!returnSecret) {
        const parsed = stored ? (JSON.parse(stored) as { status?: string }) : null;
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
    ? { title: "Stripe test payment confirmed.", body: "The browser-side confirmation has completed. Next, validate the separately signed webhook and the test-mode Watch enrollment record in the database. No live member access was created." }
    : state === "processing"
      ? { title: "Stripe test payment is processing.", body: "Wait for Stripe test-mode event delivery before checking the database state. Do not use this page to represent a completed live enrollment." }
      : state === "failed"
        ? { title: "The Stripe test payment was not confirmed.", body: "No test enrollment should be treated as active until a successful payment event has reached the webhook." }
        : { title: "Confirm the Stripe test status.", body: "This browser session does not contain a test payment confirmation. Return to the internal test checkout and complete a Stripe test transaction." };

  return <main id="main-content" style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "2rem", background: "radial-gradient(circle at 78% 15%, rgba(212,169,77,0.14), transparent 25%), #071523", color: C.cream, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}><section style={{ maxWidth: "720px", width: "100%", background: C.water, border: `1px solid ${C.line}`, padding: "clamp(1.75rem, 5vw, 4rem)", boxShadow: "0 28px 100px rgba(0,0,0,0.35)" }}><p style={{ margin: 0, color: C.amber, textTransform: "uppercase", letterSpacing: "0.16em", fontWeight: 800, fontSize: "0.72rem" }}>Internal operations · Stripe test mode</p><h1 style={{ margin: "1rem 0 0", fontFamily: "Georgia, serif", fontWeight: 500, fontSize: "clamp(2.25rem, 5vw, 4rem)", letterSpacing: "-0.04em", lineHeight: 1.04 }}>{copy.title}</h1><p style={{ margin: "1.5rem 0 0", color: C.mist, lineHeight: 1.8, fontSize: "1.02rem" }}>{copy.body}</p></section></main>;
}
