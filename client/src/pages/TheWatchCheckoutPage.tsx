/**
 * Beacon Momentum — The Watch on-site enrollment
 * Design reminder: controlled, editorial deep-water utility; no external images,
 * no hosted-checkout redirect, and every payment claim stays adjacent to the terms.
 */
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe, type StripeElementsOptions } from "@stripe/stripe-js";
import { useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import BeaconRouteLockup from "@/components/BeaconRouteLockup";
import { trpc } from "@/lib/trpc";
import { usePageMeta } from "@/hooks/usePageMeta";

const C = {
  deep: "#071523",
  water: "#0D263B",
  ink: "#11283B",
  amber: "#D4A94D",
  cream: "#F7F1E5",
  mist: "rgba(247,241,229,0.70)",
  line: "rgba(212,169,77,0.26)",
  alert: "#F5D9A0",
};

const paymentAppearance: StripeElementsOptions["appearance"] = {
  theme: "night",
  variables: {
    colorPrimary: C.amber,
    colorBackground: "#0D263B",
    colorText: C.cream,
    colorDanger: "#F4B7A3",
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
    borderRadius: "4px",
    spacingUnit: "4px",
  },
  rules: {
    ".Input": { border: "1px solid rgba(247,241,229,0.22)", boxShadow: "none" },
    ".Input:focus": { border: `1px solid ${C.amber}`, boxShadow: `0 0 0 1px ${C.amber}` },
    ".Label": { color: "rgba(247,241,229,0.80)" },
  },
};

function PaymentForm({ email, subscriptionId }: { email: string; subscriptionId: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [, navigate] = useLocation();
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!stripe || !elements || status === "submitting") return;
    setStatus("submitting");
    setError("");

    const validation = await elements.submit();
    if (validation.error) {
      setError(validation.error.message ?? "Please review the payment details.");
      setStatus("error");
      return;
    }

    const returnUrl = `${window.location.origin}/the-watch/confirmation`;
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: returnUrl, receipt_email: email },
      redirect: "if_required",
    });

    if (result.error) {
      setError(result.error.message ?? "The payment could not be completed. Please review the details and try again.");
      setStatus("error");
      return;
    }

    if (result.paymentIntent?.status === "succeeded" || result.paymentIntent?.status === "processing") {
      sessionStorage.setItem(
        "watch_checkout_confirmation",
        JSON.stringify({ email, subscriptionId, status: result.paymentIntent.status })
      );
      navigate("/the-watch/confirmation");
      return;
    }

    setError("Your payment needs another step. Please follow any authentication prompt, or contact support@beaconmomentum.com.");
    setStatus("error");
  }

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: "1.25rem" }}>
      <PaymentElement options={{ layout: "tabs" }} />
      {error && <p role="alert" style={{ margin: 0, color: "#F4B7A3", lineHeight: 1.55 }}>{error}</p>}
      <button
        type="submit"
        disabled={!stripe || !elements || status === "submitting"}
        style={{
          border: 0,
          padding: "1rem 1.25rem",
          background: status === "submitting" ? "rgba(212,169,77,0.55)" : C.amber,
          color: C.deep,
          cursor: status === "submitting" ? "wait" : "pointer",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          fontWeight: 800,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          fontSize: "0.78rem",
        }}
      >
        {status === "submitting" ? "Confirming secure payment…" : "Confirm $497 annual enrollment"}
      </button>
      <p style={{ margin: 0, color: C.mist, fontSize: "0.78rem", lineHeight: 1.6 }}>
        Card data is entered through Stripe’s secure payment fields. Beacon Momentum never receives or stores full card details.
      </p>
    </form>
  );
}

export default function TheWatchCheckoutPage() {
  usePageMeta({
    title: "The Watch secure enrollment",
    description: "Complete secure annual enrollment for The Watch, Beacon Momentum's $497 annual membership.",
    url: "/the-watch/checkout",
  });

  const [, navigate] = useLocation();
  const config = trpc.watchCheckout.publicConfig.useQuery(undefined, { retry: false, refetchOnWindowFocus: false });
  const createSubscription = trpc.watchCheckout.createSubscription.useMutation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [checkout, setCheckout] = useState<{ clientSecret: string; subscriptionId: string } | null>(null);
  const [formError, setFormError] = useState("");

  const stripePromise = useMemo(
    () => (config.data?.publishableKey ? loadStripe(config.data.publishableKey) : null),
    [config.data?.publishableKey]
  );

  async function beginPayment(event: React.FormEvent) {
    event.preventDefault();
    if (!termsAccepted) {
      setFormError("Please confirm that you have reviewed the annual renewal and purchase terms.");
      return;
    }
    setFormError("");
    try {
      const response = await createSubscription.mutateAsync({
        name,
        email,
        termsAccepted: true,
        checkoutAttemptId: crypto.randomUUID(),
      });
      setCheckout({ clientSecret: response.clientSecret, subscriptionId: response.subscriptionId });
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "We could not prepare secure payment entry. Please try again.");
    }
  }

  const checkoutOptions = checkout
    ? { clientSecret: checkout.clientSecret, appearance: paymentAppearance }
    : undefined;

  return (
    <main id="main-content" style={{ minHeight: "100vh", background: C.deep, color: C.cream, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
      <header style={{ borderBottom: `1px solid ${C.line}`, background: "rgba(7,21,35,0.96)" }}>
        <div className="container" style={{ minHeight: "76px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
          <BeaconRouteLockup descriptor="The Watch · Secure enrollment" href="/the-watch" textColor={C.cream} mutedColor={C.mist} compact />
          <button onClick={() => navigate("/the-watch")} style={{ background: "transparent", border: 0, color: C.mist, cursor: "pointer", fontSize: "0.84rem" }}>← Review membership</button>
        </div>
      </header>

      <section style={{ padding: "clamp(3rem, 7vw, 6rem) 0", background: "radial-gradient(circle at 82% 7%, rgba(212,169,77,0.15), transparent 27%), linear-gradient(135deg, #071523 0%, #0D263B 100%)" }}>
        <div className="container watch-checkout-layout" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.1fr) minmax(320px, 0.9fr)", gap: "clamp(2rem, 6vw, 5rem)", alignItems: "start" }}>
          <div>
            <p style={{ color: C.amber, textTransform: "uppercase", letterSpacing: "0.17em", fontSize: "0.72rem", fontWeight: 800, margin: "0 0 1rem" }}>Founding Year enrollment</p>
            <h1 style={{ maxWidth: "760px", margin: 0, fontFamily: "Georgia, serif", fontSize: "clamp(2.5rem, 5.5vw, 4.6rem)", fontWeight: 500, lineHeight: 1.03, letterSpacing: "-0.035em" }}>Take your post for the year ahead.</h1>
            <p style={{ maxWidth: "650px", margin: "1.5rem 0 0", color: C.mist, fontSize: "1.08rem", lineHeight: 1.75 }}>
              This is a Beacon-controlled annual enrollment for the first 1,000 paid annual members. Your current rate is $497/year—$500 below the later $997 annual rate for new members—and it remains with uninterrupted, paid renewals.
            </p>
            <div style={{ marginTop: "2rem", padding: "1.25rem", borderLeft: `2px solid ${C.amber}`, background: "rgba(247,241,229,0.045)" }}>
              <p style={{ margin: 0, color: C.cream, lineHeight: 1.65 }}><strong>What begins here:</strong> Sentinel membership, the Beacon Venture Execution Sprint, Watch Brief Premium member benefit, Pathfinder Assessment, resource library, and the current execution field kit.</p>
            </div>
          </div>

          <aside style={{ background: "rgba(13,38,59,0.92)", border: `1px solid ${C.line}`, padding: "clamp(1.25rem, 3vw, 2.25rem)", boxShadow: "0 24px 80px rgba(0,0,0,0.25)" }}>
            <p style={{ margin: 0, color: C.amber, textTransform: "uppercase", letterSpacing: "0.15em", fontSize: "0.69rem", fontWeight: 800 }}>Annual membership</p>
            <div style={{ margin: "0.55rem 0 0", display: "flex", alignItems: "baseline", gap: "0.4rem" }}>
              <strong style={{ color: C.cream, fontSize: "2.7rem", letterSpacing: "-0.05em" }}>$497</strong>
              <span style={{ color: C.mist }}>/ year</span>
            </div>
            <p style={{ margin: "0.65rem 0 1.5rem", color: C.mist, fontSize: "0.9rem", lineHeight: 1.65 }}>No free trial. One annual membership. Founding Year enrollment is available to the first 1,000 paid annual members. Earned stages are not separate purchases.</p>

            {!checkout && (
              <form onSubmit={beginPayment} style={{ display: "grid", gap: "1rem" }}>
                <label style={{ display: "grid", gap: "0.45rem", color: C.mist, fontSize: "0.82rem" }}>
                  Full name
                  <input required value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" style={{ background: C.deep, border: "1px solid rgba(247,241,229,0.22)", color: C.cream, padding: "0.85rem", fontSize: "1rem" }} />
                </label>
                <label style={{ display: "grid", gap: "0.45rem", color: C.mist, fontSize: "0.82rem" }}>
                  Email for enrollment and receipts
                  <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" style={{ background: C.deep, border: "1px solid rgba(247,241,229,0.22)", color: C.cream, padding: "0.85rem", fontSize: "1rem" }} />
                </label>
                <label style={{ display: "flex", alignItems: "flex-start", gap: "0.7rem", color: C.mist, fontSize: "0.78rem", lineHeight: 1.55, cursor: "pointer" }}>
                  <input type="checkbox" checked={termsAccepted} onChange={(event) => setTermsAccepted(event.target.checked)} style={{ marginTop: "0.2rem", accentColor: C.amber }} />
                  <span>I have reviewed the annual renewal, cancellation, and purchase-boundary terms below.</span>
                </label>
                {formError && <p role="alert" style={{ margin: 0, color: "#F4B7A3", fontSize: "0.84rem", lineHeight: 1.5 }}>{formError}</p>}
                <button type="submit" disabled={createSubscription.isPending || !config.data?.ready} style={{ border: 0, padding: "1rem 1.25rem", background: createSubscription.isPending || !config.data?.ready ? "rgba(212,169,77,0.55)" : C.amber, color: C.deep, cursor: createSubscription.isPending || !config.data?.ready ? "wait" : "pointer", fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", fontSize: "0.76rem" }}>
                  {config.isLoading ? "Loading secure enrollment…" : createSubscription.isPending ? "Preparing secure payment…" : config.data?.ready ? "Continue to secure payment" : "Enrollment configuration pending"}
                </button>
              </form>
            )}

            {checkout && stripePromise && checkoutOptions && (
              <Elements stripe={stripePromise} options={checkoutOptions}>
                <PaymentForm email={email} subscriptionId={checkout.subscriptionId} />
              </Elements>
            )}
          </aside>
        </div>
      </section>

      <section style={{ padding: "0 0 clamp(4rem, 8vw, 7rem)", background: C.deep }}>
        <div className="container watch-checkout-disclosures" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "1px", background: C.line, border: `1px solid ${C.line}` }}>
          {[
            ["Issuer", "Payments are made to Beacon Momentum LLC."],
            ["Renewal", "Founding Year members renew automatically at $497/year while continuously active and paid, unless they cancel before renewal. Later new enrollment is $997/year after the first 1,000 paid annual members."],
            ["Purchase boundary", "This purchase is not an investment, loan, equity interest, revenue-share interest, promise of financial return, charitable contribution, or tax-deductible donation."],
          ].map(([label, copy]) => (
            <div key={label} style={{ background: C.deep, padding: "1.35rem" }}>
              <p style={{ margin: 0, color: C.amber, textTransform: "uppercase", fontSize: "0.68rem", letterSpacing: "0.14em", fontWeight: 800 }}>{label}</p>
              <p style={{ margin: "0.65rem 0 0", color: C.mist, fontSize: "0.86rem", lineHeight: 1.65 }}>{copy}</p>
            </div>
          ))}
        </div>
        <div className="container" style={{ marginTop: "1.25rem" }}>
          <p style={{ margin: 0, color: "rgba(247,241,229,0.52)", fontSize: "0.78rem", lineHeight: 1.6 }}>
            Questions before enrollment? Contact <a href="mailto:support@beaconmomentum.com" style={{ color: C.alert }}>support@beaconmomentum.com</a>. Cancellation, payment-failure, re-enrollment, privacy, and refund terms apply as published by Beacon Momentum LLC.
          </p>
        </div>
      </section>
      <style>{`@media (max-width: 760px) { .watch-checkout-layout, .watch-checkout-disclosures { grid-template-columns: 1fr !important; } }`}</style>
    </main>
  );
}
