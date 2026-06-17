/**
 * Beacon Momentum — /company
 * Design: Deep Water Editorial / Quiet Authority
 * Company information, contact, and affiliated properties.
 */

import { Link } from "wouter";
import { Mail, Globe, Building2, ArrowUpRight } from "lucide-react";

const AFFILIATED = [
  { name: "Beacon Labs",     domain: "beaconlabs.ai",              role: "Signal Check, AI audit, and research delivery",                                                                                    href: "https://beaconlabs.ai" },
  { name: "Beacon Trading", domain: "beacontrading.ai",            role: "Financial sovereignty and market literacy academy",                                                                               href: "https://beacontrading.ai" },
  { name: "Digital Grandpa",domain: "digitalgrandpa.org",          role: "AI literacy platform for older adults and families — helping the people who raised us navigate the digital world with confidence",  href: "https://digitalgrandpa.org" },
  { name: "Hollow Threads", domain: "hollowthread.store",          role: "Alternative lifestyle apparel brand — dark-aesthetic, made-to-order fashion for the beautifully complex",                          href: "https://hollowthread.store" },
  { name: "The Void",       domain: "hollowthread.store/discord",  role: "Hollow Threads\u2019 Discord community \u2014 the home of the brand\u2019s alt-lifestyle audience",                                href: "https://hollowthread.store/discord" },
];

export default function CompanyPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--beacon-parchment)" }}>
      {/* Nav — consistent with Privacy/Terms pages */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(250,248,244,0.97)",
        borderBottom: "1px solid var(--beacon-parchment-dark)",
        backdropFilter: "blur(8px)",
      }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.625rem" }}>
            <img
              src="/icons/beacon-logo.webp"
              alt="Beacon Momentum"
              style={{ width: "1.75rem", height: "1.75rem", objectFit: "contain", flexShrink: 0 }}
            />
            <span style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 600, fontSize: "1.05rem",
              color: "var(--beacon-charcoal)", letterSpacing: "-0.01em",
            }}>Beacon Momentum</span>
          </Link>
          <Link href="/" style={{
            fontFamily: "'Outfit', system-ui, sans-serif",
            fontWeight: 400, fontSize: "0.8rem",
            color: "var(--beacon-charcoal-mid)", textDecoration: "none",
          }}>← Home</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: "7rem 0 4rem" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <span style={{
            fontFamily: "'Outfit', system-ui, sans-serif",
            fontWeight: 400, fontSize: "0.75rem",
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: "var(--beacon-amber)",
            display: "flex", alignItems: "center", gap: "0.75rem",
            marginBottom: "1.5rem",
          }}>
            <span style={{ width: "2rem", height: "1px", background: "var(--beacon-amber)", display: "inline-block" }} />
            Company Information
          </span>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 600, fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
            lineHeight: 1.1, letterSpacing: "-0.025em",
            color: "var(--beacon-charcoal)", marginBottom: "1.5rem",
          }}>
            Beacon Momentum
          </h1>
          <p style={{
            fontFamily: "'Lora', Georgia, serif",
            fontWeight: 400, fontSize: "1.05rem",
            lineHeight: 1.8, color: "var(--beacon-charcoal-mid)",
            maxWidth: "600px",
          }}>
            The AI-era human capability and operations company. We help people and small organizations remain human, capable, economically active, and sovereign through the AI transition — without hype, shame, spam, or guru dependency.
          </p>
        </div>
      </section>

      {/* Company details */}
      <section style={{ padding: "0 0 5rem" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "0",
            border: "1px solid var(--beacon-parchment-dark)",
            marginBottom: "4rem",
          }}>
            {[
              { icon: Building2, label: "Legal Name", value: "Beacon Momentum" },
              { icon: Globe, label: "Primary Domain", value: "beaconmomentum.com" },
              { icon: Mail, label: "Business Inquiries", value: "Via Beacon Labs contact page" },
            ].map((item, i) => (
              <div key={i} style={{
                padding: "2rem",
                borderRight: i < 2 ? "1px solid var(--beacon-parchment-dark)" : "none",
              }}>
                <item.icon size={16} style={{ color: "var(--beacon-teal)", marginBottom: "0.75rem" }} />
                <div style={{
                  fontFamily: "'Outfit', system-ui, sans-serif",
                  fontWeight: 400, fontSize: "0.7rem",
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  color: "var(--beacon-charcoal-mid)", marginBottom: "0.5rem",
                }}>
                  {item.label}
                </div>
                <div style={{
                  fontFamily: "'Lora', Georgia, serif",
                  fontWeight: 400, fontSize: "0.95rem",
                  color: "var(--beacon-charcoal)", lineHeight: 1.5,
                }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          {/* Mission */}
          <div style={{
            padding: "2.5rem",
            borderLeft: "3px solid var(--beacon-teal)",
            background: "rgba(46,125,107,0.04)",
            marginBottom: "4rem",
          }}>
            <div style={{
              fontFamily: "'Outfit', system-ui, sans-serif",
              fontWeight: 400, fontSize: "0.7rem",
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: "var(--beacon-teal)", marginBottom: "1rem",
            }}>
              Mission Statement
            </div>
            <p style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 400, fontStyle: "italic",
              fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
              lineHeight: 1.55, color: "var(--beacon-charcoal)",
            }}>
              "To help people and small organizations remain human, capable, economically active, and sovereign through the AI transition."
            </p>
          </div>

          {/* Affiliated properties */}
          <div style={{ marginBottom: "4rem" }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 600, fontSize: "clamp(1.5rem, 3vw, 2rem)",
              letterSpacing: "-0.02em", color: "var(--beacon-charcoal)",
              marginBottom: "0.5rem",
            }}>
              Affiliated Properties
            </h2>
            <p style={{
              fontFamily: "'Lora', Georgia, serif",
              fontWeight: 400, fontSize: "0.9rem",
              color: "var(--beacon-charcoal-mid)", lineHeight: 1.7,
              marginBottom: "2rem",
            }}>
              Beacon Momentum operates a network of purpose-built brands and platforms, each serving a distinct audience within the broader mission.
            </p>
            <div style={{
              border: "1px solid var(--beacon-parchment-dark)",
              overflow: "hidden",
            }}>
              {AFFILIATED.map((prop, i) => (
                <div key={i} style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: "1rem",
                  padding: "1.5rem 2rem",
                  borderBottom: i < AFFILIATED.length - 1 ? "1px solid var(--beacon-parchment-dark)" : "none",
                  background: i % 2 === 0 ? "transparent" : "rgba(250,248,244,0.5)",
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontFamily: "'Outfit', system-ui, sans-serif",
                      fontWeight: 500, fontSize: "0.9rem",
                      color: "var(--beacon-charcoal)", marginBottom: "0.25rem",
                    }}>
                      {prop.name}
                      <span style={{
                        fontFamily: "'Outfit', system-ui, sans-serif",
                        fontWeight: 300, fontSize: "0.75rem",
                        color: "var(--beacon-charcoal-mid)",
                        marginLeft: "0.75rem",
                      }}>
                        {prop.domain}
                      </span>
                    </div>
                    <div style={{
                      fontFamily: "'Lora', Georgia, serif",
                      fontWeight: 400, fontSize: "0.85rem",
                      color: "var(--beacon-charcoal-mid)", lineHeight: 1.6,
                    }}>
                      {prop.role}
                    </div>
                  </div>
                  <a
                    href={prop.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex", alignItems: "center",
                      color: "var(--beacon-teal)",
                      flexShrink: 0, marginTop: "2px",
                    }}
                    aria-label={`Visit ${prop.name}`}
                  >
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div style={{
            padding: "2.5rem",
            background: "var(--beacon-charcoal)",
          }}>
            <div style={{
              fontFamily: "'Outfit', system-ui, sans-serif",
              fontWeight: 400, fontSize: "0.7rem",
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: "var(--beacon-amber-light)", marginBottom: "1rem",
            }}>
              Contact & Inquiries
            </div>
            <p style={{
              fontFamily: "'Lora', Georgia, serif",
              fontWeight: 400, fontSize: "0.95rem",
              lineHeight: 1.75, color: "rgba(250,248,244,0.7)",
              marginBottom: "1.5rem",
            }}>
              For business inquiries, partnership requests, press contact, or general questions, please reach out through the Beacon Labs contact page.
            </p>
            <a
              href="https://beaconlabs.ai"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                fontFamily: "'Outfit', system-ui, sans-serif",
                fontWeight: 500, fontSize: "0.8rem",
                letterSpacing: "0.06em", textTransform: "uppercase",
                color: "var(--beacon-amber-light)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(200,134,10,0.4)",
                paddingBottom: "2px",
              }}
            >
              Contact via Beacon Labs <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "var(--beacon-charcoal)", borderTop: "1px solid rgba(250,248,244,0.06)", padding: "2.5rem 0" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{
            fontFamily: "'Outfit', system-ui, sans-serif",
            fontWeight: 300, fontSize: "0.75rem",
            color: "rgba(250,248,244,0.3)", letterSpacing: "0.04em",
          }}>
            © {new Date().getFullYear()} Beacon Momentum. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <Link href="/privacy" style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 300, fontSize: "0.75rem", color: "rgba(250,248,244,0.3)", textDecoration: "none" }}>Privacy</Link>
            <Link href="/terms" style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 300, fontSize: "0.75rem", color: "rgba(250,248,244,0.3)", textDecoration: "none" }}>Terms</Link>
          </div>
          <p style={{
            fontFamily: "'Outfit', system-ui, sans-serif",
            fontWeight: 300, fontSize: "0.75rem",
            color: "rgba(250,248,244,0.2)", letterSpacing: "0.04em",
          }}>
            Earn · Prove · Amplify
          </p>
        </div>
      </footer>
    </div>
  );
}
