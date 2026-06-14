/**
 * Beacon Momentum — Disclaimer Page
 * Design: Deep Water Editorial / Quiet Authority
 *
 * Covers all Beacon offerings: educational content, Beacon Trading simulation,
 * AI tools, coaching, and community. Provides liability protection while
 * maintaining the brand's honest, direct voice.
 *
 * Effective Date: June 2026
 * Governing Law: Wyoming (Beacon Momentum LLC)
 */

import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

const LAST_UPDATED = "June 13, 2026";

interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
}

const SECTIONS: Section[] = [
  {
    id: "general",
    title: "General Educational Disclaimer",
    content: (
      <>
        <p>
          All content, programs, courses, assessments, tools, community discussions, and communications
          provided by Beacon Momentum LLC — including but not limited to The Five Pillars curriculum,
          Beacon Labs research, Signal Check reports, the Pathfinder Assessment, and all written,
          audio, and video materials — are provided <strong>for educational and informational purposes only</strong>.
        </p>
        <p>
          Nothing on this website or within any Beacon Momentum program constitutes professional advice
          of any kind, including but not limited to financial, legal, medical, psychological, investment,
          or career advice. The information provided is general in nature and may not be appropriate for
          your specific circumstances.
        </p>
        <p>
          You should consult a qualified professional before making any significant personal, financial,
          legal, or career decisions. Beacon Momentum LLC expressly disclaims any liability for actions
          taken or not taken based on the content of its programs, materials, or community discussions.
        </p>
      </>
    ),
  },
  {
    id: "trading",
    title: "Beacon Trading Education — Simulated Trading Disclaimer",
    content: (
      <>
        <p>
          The Beacon Trading Education program, including all simulated trading exercises, market
          analysis tools, strategy frameworks, and related content, is designed exclusively as an
          <strong> educational simulation</strong>. It is not a live trading platform, investment
          advisory service, brokerage, or financial planning service.
        </p>
        <p>
          <strong>Simulated trading results do not represent actual trading performance.</strong> Past
          simulated results are not indicative of future actual results. Trading in real financial
          markets involves substantial risk of loss and is not suitable for all individuals. You may
          lose some or all of your invested capital.
        </p>
        <p>
          Beacon Momentum LLC is not a registered investment advisor, broker-dealer, or financial
          planner. Nothing in the Beacon Trading Education program constitutes a recommendation to buy,
          sell, or hold any security, commodity, currency, or other financial instrument. All examples,
          case studies, and scenarios presented are for illustrative and educational purposes only.
        </p>
        <p>
          Before engaging in any actual trading or investment activity, you should consult a licensed
          financial advisor and thoroughly understand the risks involved. Beacon Momentum LLC assumes
          no responsibility for any financial losses incurred as a result of applying concepts learned
          in the Beacon Trading Education program to real markets.
        </p>
      </>
    ),
  },
  {
    id: "ai-tools",
    title: "AI Tools and Automation Guidance",
    content: (
      <>
        <p>
          Beacon Momentum provides guidance, frameworks, and educational content related to artificial
          intelligence tools, automation systems, and AI-assisted workflows. This content is provided
          for educational purposes to help individuals and organizations understand and evaluate AI
          technologies.
        </p>
        <p>
          Beacon Momentum LLC does not warrant the accuracy, reliability, or fitness for purpose of
          any third-party AI tool, platform, or service referenced in its programs. AI technologies
          evolve rapidly; information that is accurate at the time of publication may become outdated.
          Users are responsible for independently verifying the current capabilities, limitations,
          costs, and terms of service of any AI tool before adopting it.
        </p>
        <p>
          Beacon Momentum LLC is not responsible for any outcomes — including data loss, security
          incidents, financial costs, or business disruption — resulting from the use of AI tools
          or automation systems discussed in its programs.
        </p>
      </>
    ),
  },
  {
    id: "coaching",
    title: "Coaching, Mentorship, and Community Support",
    content: (
      <>
        <p>
          Coaching, mentorship, and peer support provided through Beacon Momentum programs and
          community platforms are offered as educational support and accountability resources.
          They do not constitute licensed therapy, counseling, medical treatment, legal representation,
          or financial advisory services.
        </p>
        <p>
          Beacon Momentum coaches and mentors share their personal experience, frameworks, and
          perspectives. Their guidance is not a substitute for professional services. If you are
          experiencing a mental health crisis, medical emergency, or legal matter requiring
          professional intervention, please seek qualified professional help immediately.
        </p>
        <p>
          Results described by program participants represent individual experiences and are not
          guaranteed. Individual outcomes will vary based on personal effort, circumstances,
          background, and other factors outside Beacon Momentum's control.
        </p>
      </>
    ),
  },
  {
    id: "signal-check",
    title: "Signal Check Reports and Research",
    content: (
      <>
        <p>
          Beacon Labs Signal Check reports, research summaries, and competitive analyses are
          produced using publicly available information, AI-assisted research tools, and the
          professional judgment of Beacon Momentum staff. They are provided for informational
          and strategic planning purposes only.
        </p>
        <p>
          Signal Check reports do not constitute audits, certifications, legal opinions, or
          investment recommendations. The information contained in these reports may be incomplete,
          may contain errors, and may not reflect the most current conditions. Beacon Momentum LLC
          makes no warranty regarding the accuracy or completeness of Signal Check reports.
        </p>
        <p>
          Recipients of Signal Check reports should independently verify material information
          before making business decisions based on report findings.
        </p>
      </>
    ),
  },
  {
    id: "results",
    title: "No Guarantee of Results",
    content: (
      <>
        <p>
          Beacon Momentum LLC makes no guarantee, express or implied, that participation in any
          program, course, community, or service will result in any specific outcome, including
          but not limited to employment, income, business success, financial gain, or personal
          transformation.
        </p>
        <p>
          Success in any endeavor depends on many factors, including individual effort, market
          conditions, personal circumstances, and factors beyond anyone's control. Testimonials
          and case studies presented on this website represent individual experiences and are
          not typical results.
        </p>
        <p>
          Any income figures, business results, or performance metrics referenced in Beacon
          Momentum materials are illustrative examples and should not be interpreted as typical
          or expected results for program participants.
        </p>
      </>
    ),
  },
  {
    id: "third-party",
    title: "Third-Party Links and Resources",
    content: (
      <>
        <p>
          Beacon Momentum programs and materials may reference or link to third-party websites,
          tools, platforms, books, and resources. These references are provided for convenience
          and educational context only. Beacon Momentum LLC does not endorse, control, or assume
          responsibility for the content, accuracy, privacy practices, or availability of any
          third-party resource.
        </p>
        <p>
          Inclusion of a third-party resource in Beacon Momentum materials does not constitute
          a commercial endorsement or affiliate relationship unless explicitly disclosed.
        </p>
      </>
    ),
  },
  {
    id: "limitation",
    title: "Limitation of Liability",
    content: (
      <>
        <p>
          To the fullest extent permitted by applicable law, Beacon Momentum LLC, its officers,
          employees, contractors, and affiliates shall not be liable for any direct, indirect,
          incidental, consequential, special, or punitive damages arising from your use of or
          reliance on any Beacon Momentum content, program, tool, or service — including but
          not limited to financial losses, lost profits, loss of data, or personal injury.
        </p>
        <p>
          In jurisdictions that do not allow the exclusion of certain warranties or limitation
          of liability, Beacon Momentum's liability shall be limited to the maximum extent
          permitted by law.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "Questions About This Disclaimer",
    content: (
      <>
        <p>
          If you have questions about this disclaimer or the scope of any Beacon Momentum program,
          please contact us before enrolling or making any decisions based on our content.
        </p>
        <div className="mt-4 space-y-1 text-sm">
          <p><strong>Beacon Momentum LLC</strong></p>
          <p>1309 Coffeen Avenue, Suite #19387</p>
          <p>Sheridan, Wyoming 82801</p>
          <p>Mailing: PO Box 244, Cheshire, MA 01225</p>
          <p>
            Email:{" "}
            <a href="mailto:info@beaconmomentum.com" className="text-[#1A5C6B] hover:underline">
              info@beaconmomentum.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href="tel:+18884377657" className="text-[#1A5C6B] hover:underline">
              (888) 437-7657
            </a>
          </p>
        </div>
      </>
    ),
  },
];

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F4] font-body" id="main-content">
      {/* Header */}
      <div className="bg-[#1C1814] py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#9B8E7E] hover:text-[#C8BFB0] text-sm font-ui tracking-widest uppercase mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="text-[#D4A843] font-ui text-xs tracking-widest uppercase mb-4">
            Beacon Momentum LLC
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-white mb-4">
            Disclaimer
          </h1>
          <p className="text-[#9B8E7E] text-sm">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </div>

      {/* Intro */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-[#FFF8E8] border border-[#D4A843]/30 rounded-sm p-6 mb-12">
          <p className="text-[#4A3E30] text-sm leading-relaxed">
            Beacon Momentum is committed to honest, transparent communication about what our programs
            are and what they are not. Please read this disclaimer carefully before participating in
            any Beacon Momentum program, using any of our tools, or making decisions based on our
            content. If you have questions, contact us before enrolling.
          </p>
        </div>

        {/* Table of Contents */}
        <nav aria-label="Disclaimer sections" className="mb-12">
          <h2 className="font-ui text-xs tracking-widest uppercase text-[#9B8E7E] mb-4">
            Contents
          </h2>
          <ol className="space-y-2">
            {SECTIONS.map((section, idx) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-[#1A5C6B] hover:text-[#154F5C] text-sm transition-colors"
                >
                  {idx + 1}. {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Sections */}
        <div className="space-y-12">
          {SECTIONS.map((section, idx) => (
            <section key={section.id} id={section.id} aria-labelledby={`heading-${section.id}`}>
              <h2
                id={`heading-${section.id}`}
                className="font-display text-2xl text-[#2C2416] mb-6 pb-3 border-b border-[#E8E4DC]"
              >
                {idx + 1}. {section.title}
              </h2>
              <div className="prose prose-sm max-w-none text-[#4A3E30] leading-relaxed space-y-4 [&_strong]:text-[#2C2416] [&_a]:text-[#1A5C6B] [&_a:hover]:underline">
                {section.content}
              </div>
            </section>
          ))}
        </div>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-[#E8E4DC] flex flex-wrap gap-4 text-sm text-[#9B8E7E]">
          <Link href="/privacy" className="hover:text-[#1A5C6B] transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-[#1A5C6B] transition-colors">Terms of Use</Link>
          <Link href="/cookies" className="hover:text-[#1A5C6B] transition-colors">Cookie Policy</Link>
          <Link href="/" className="hover:text-[#1A5C6B] transition-colors">Return to Home</Link>
        </div>
      </div>
    </div>
  );
}
