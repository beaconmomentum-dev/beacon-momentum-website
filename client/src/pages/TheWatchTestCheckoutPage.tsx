/**
 * Beacon Momentum — internal Stripe test-mode lifecycle verifier.
 * Design reminder: visually explicit test boundary; this route is unlinked and
 * does not represent live enrollment, access, or a production charge.
 */
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe, type StripeElementsOptions } from "@stripe/stripe-js";
import { useMemo, useState } from "react";
import { trpc } from "@/lib/trpc";

const C = {
  deep: "#071523",
  water: "#0D263B",
  amber: "#D4A94D",
  cream: "#F7F1E5",
  mist: "rgba(247,241,229,0.70)",
  line: "rgba(212,169,77,0.26)",
};

const paymentAppearance: StripeElementsOptions["appearance"] = {
  theme: "night",
  variables: {
    colorPrimary: C.amber,
    colorBackground: C.water,
    colorText: C.cream,
    colorDanger: "#F4B7A3",
    fontFamily: "ui-sans-serif, system-ui, sans-serif",
    borderRadius: "4px",
  },
};

function TestPaymentForm({ email, subscriptionId }: { email: string; subscriptionId: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!stripe || !elements || status === "submitting") return;
    setStatus("submitting");
    setError("");
    const validation = await elements.submit();
    if (validation.error) {
      setError(validation.error.message ?? "Please review the test payment details.");
      setStatus("error");
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/_ops/the-watch/test-confirmation`,
        receipt_email: email,
      },
      redirect: "if_required",
    });

    if (result.error) {
      setError(result.error.message ?? "The Stripe test payment could not be completed.");
      setStatus("error");
      return;
    }

    if (result.paymentIntent?.status === "succeeded" || result.paymentIntent?.status === "processing") {
      sessionStorage.setItem(
        "watch_test_checkout_confirmation",
        JSON.stringify({ email, subscriptionId, status: result.paymentIntent.status })
      );
      window.location.assign("/_ops/the-watch/test-confirmation");
      return;
    }

    setError("The test payment requires another step. Follow Stripe’s test instructions and retry.");
    setStatus("error");
  }

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: "1.25rem" }}>
      <PaymentElement options={{ layout: "tabs" }} />
      {error && <p role="alert" style={{ margin: 0, color: "#F4B7A3", lineHeight: 1.55 }}>{error}</p>}
      <button type="submit" disabled={!stripe || !elements || status === "submitting"} style={{ border: 0, padding: "1rem 1.25rem", background: status === "submitting" ? "rgba(212,169,77,0.55)" : C.amber, color: C.deep, cursor: status === "submitting" ? "wait" : "pointer", fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", fontSize: "0.78rem" }}>
        {status === "submitting" ? "Confirming Stripe test…" : "Run $497 test subscription"}
      </button>
    </form>
  );
}

export default function TheWatchTestCheckoutPage() {
  const config = trpc.watchTestCheckout.publicConfig.useQuery(undefined, { retry: false, refetchOnWindowFocus: false });
  const createSubscription = trpc.watchTestCheckout.createSubscription.useMutation();
  const [name, setName] = useState("Watch Lifecycle Test");
  const [email, setEmail] = useState("watch-lifecycle-test@example.test");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [checkout, setCheckout] = useState<{ clientSecret: string; subscriptionId: string } | null>(null);
  const [formError, setFormError] = useState("");
  const stripePromise = useMemo(() => (config.data?.publishableKey ? loadStripe(config.data.publishableKey) : null), [config.data?.publishableKey]);

  async function beginTest(event: React.FormEvent) {
    event.preventDefault();
    if (!termsAccepted) {
      setFormError("Confirm that this is an internal Stripe test-mode verification before continuing.");
      return;
    }
    setFormError("");
    try {
      const response = await createSubscription.mutateAsync({ name, email, termsAccepted: true, checkoutAttemptId: crypto.randomUUID() });
      setCheckout({ clientSecret: response.clientSecret, subscriptionId: response.subscriptionId });
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "The internal test subscription could not be prepared.");
    }
  }

  const checkoutOptions = checkout ? { clientSecret: checkout.clientSecret, appearance: paymentAppearance } : undefined;
  return (
    <main id="main-content" style={{ minHeight: "100vh", background: C.deep, color: C.cream, fontFamily: "ui-sans-serif, system-ui, sans-serif", padding: "clamp(2rem, 6vw, 5rem) 0" }}>
      <div className="container" style={{ maxWidth: "980px" }}>
        <p style={{ margin: 0, color: C.amber, textTransform: "uppercase", letterSpacing: "0.16em", fontWeight: 800, fontSize: "0.72rem" }}>Beacon internal operations · Stripe test mode only</p>
        <h1 style={{ margin: "1rem 0 0", fontFamily: "Georgia, serif", fontWeight: 500, fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "-0.04em", lineHeight: 1.05 }}>The Watch lifecycle verification</h1>
        <p style={{ maxWidth: "740px", margin: "1.35rem 0 0", color: C.mist, lineHeight: 1.7 }}>This unlinked operational route uses separate Stripe <strong>test-mode</strong> credentials. It creates no live charge, no member access, and no production enrollment.</p>
        <section style={{ marginTop: "2.5rem", padding: "clamp(1.25rem, 4vw, 2.5rem)", background: C.water, border: `1px solid ${C.line}`, boxShadow: "0 24px 80px rgba(0,0,0,0.28)" }}>
          <p style={{ margin: 0, color: C.amber, textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 800, fontSize: "0.7rem" }}>Test annual subscription</p>
          <p style={{ margin: "0.55rem 0 1.5rem", color: C.mist, lineHeight: 1.65 }}>Use Stripe’s standard test card <strong style={{ color: C.cream }}>4242 4242 4242 4242</strong>, any future expiry, any CVC, and any ZIP. The expected test event is an active $497/year Watch subscription.</p>
          {!checkout && <form onSubmit={beginTest} style={{ display: "grid", gap: "1rem", maxWidth: "600px" }}>
            <label style={{ display: "grid", gap: "0.45rem", color: C.mist, fontSize: "0.82rem" }}>Test name<input required value={name} onChange={(event) => setName(event.target.value)} style={{ background: C.deep, border: "1px solid rgba(247,241,229,0.22)", color: C.cream, padding: "0.85rem", fontSize: "1rem" }} /></label>
            <label style={{ display: "grid", gap: "0.45rem", color: C.mist, fontSize: "0.82rem" }}>Test email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} style={{ background: C.deep, border: "1px solid rgba(247,241,229,0.22)", color: C.cream, padding: "0.85rem", fontSize: "1rem" }} /></label>
            <label style={{ display: "flex", alignItems: "flex-start", gap: "0.7rem", color: C.mist, fontSize: "0.8rem", lineHeight: 1.55, cursor: "pointer" }}><input type="checkbox" checked={termsAccepted} onChange={(event) => setTermsAccepted(event.target.checked)} style={{ marginTop: "0.2rem", accentColor: C.amber }} /><span>I confirm this is a controlled Stripe test-mode operation and does not create a live membership or customer-facing payment.</span></label>
            {formError && <p role="alert" style={{ margin: 0, color: "#F4B7A3", lineHeight: 1.5 }}>{formError}</p>}
            <button type="submit" disabled={createSubscription.isPending || !config.data?.ready} style={{ border: 0, padding: "1rem 1.25rem", background: createSubscription.isPending || !config.data?.ready ? "rgba(212,169,77,0.55)" : C.amber, color: C.deep, cursor: createSubscription.isPending || !config.data?.ready ? "wait" : "pointer", fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", fontSize: "0.76rem" }}>{config.isLoading ? "Loading test configuration…" : createSubscription.isPending ? "Preparing test payment…" : config.data?.ready ? "Continue to Stripe test fields" : "Test configuration pending"}</button>
          </form>}
          {checkout && stripePromise && checkoutOptions && <Elements stripe={stripePromise} options={checkoutOptions}><TestPaymentForm email={email} subscriptionId={checkout.subscriptionId} /></Elements>}
        </section>
      </div>
    </main>
  );
}
