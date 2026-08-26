import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense, useEffect } from "react";
import { Route, Switch, useLocation, useParams } from "wouter";
import { useRouteMetadata } from "@/hooks/usePageMeta";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import CookieConsent from "./components/CookieConsent";

// Keep the application shell small. Each public route is loaded only when requested,
// which prevents payment, editorial, and operations modules from delaying the home page.
const NotFound = lazy(() => import("@/pages/NotFound"));
const StarterPackPage = lazy(() => import("@/pages/StarterPackPage"));
const Home = lazy(() => import("./pages/Home"));
const Assessment = lazy(() => import("./pages/Assessment"));
const PillarPage = lazy(() => import("./pages/PillarPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const CompanyPage = lazy(() => import("./pages/CompanyPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const RefundPage = lazy(() => import("./pages/RefundPage"));
const BeaconTradingPage = lazy(() => import("./pages/BeaconTradingPage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const ResourcesPage = lazy(() => import("./pages/ResourcesPage"));
const FieldGuidesPage = lazy(() => import("./pages/FieldGuidesPage"));
const CookiePage = lazy(() => import("./pages/CookiePage"));
const DisclaimerPage = lazy(() => import("./pages/DisclaimerPage"));
const PillarSharePage = lazy(() => import("@/pages/PillarSharePage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const DigitalGrandpaLibraryPage = lazy(() => import("@/pages/DigitalGrandpaLibraryPage"));
const DigitalGrandpaPage = lazy(() => import("@/pages/DigitalGrandpaPage"));
const BlogPage = lazy(() => import("@/pages/BlogPage"));
const BlogArticlePage = lazy(() => import("@/pages/BlogArticlePage"));
const TheWatchPage = lazy(() => import("@/pages/TheWatchPage"));
const TheWatchCheckoutPage = lazy(() => import("@/pages/TheWatchCheckoutPage"));
const TheWatchConfirmationPage = lazy(() => import("@/pages/TheWatchConfirmationPage"));
const TheWatchTestCheckoutPage = lazy(() => import("@/pages/TheWatchTestCheckoutPage"));
const TheWatchTestConfirmationPage = lazy(() => import("@/pages/TheWatchTestConfirmationPage"));
const TheWatchIntakePage = lazy(() => import("@/pages/TheWatchIntakePage"));
const CohortDashboardPage = lazy(() => import("@/pages/CohortDashboardPage"));
const WatchBriefPremiumPage = lazy(() => import("@/pages/WatchBriefPremiumPage"));
const HowBeaconWorksPage = lazy(() => import("@/pages/HowBeaconWorksPage"));
const FoundationYearPage = lazy(() => import("@/pages/FoundationYearPage"));
const FounderNotePage = lazy(() => import("@/pages/FounderNotePage"));
const FoundationSupportPage = lazy(() => import("@/pages/FoundationSupportPage"));
const FoundationSupportThankYouPage = lazy(() => import("@/pages/FoundationSupportThankYouPage"));
const FiveQuestionsFieldNotePage = lazy(() => import("@/pages/FiveQuestionsFieldNotePage"));
const ControlledAIWorkflowKitPage = lazy(() => import("@/pages/ControlledAIWorkflowKitPage"));
const ControlledWorkflowPilotsPage = lazy(() => import("@/pages/ControlledWorkflowPilotsPage"));
const CommunityBuildGrantPage = lazy(() => import("@/pages/CommunityBuildGrantPage"));
const CommunityBuildSocialPage = lazy(() => import("@/pages/CommunityBuildSocialPage"));
const DigitalRampUpFieldNotesIndexPage = lazy(() => import("@/pages/DigitalRampUpFieldNotesIndexPage"));
const DigitalRampUpFieldNotePage = lazy(() => import("@/pages/DigitalRampUpFieldNotePage"));
const ManifestoPage = lazy(() => import("@/pages/ManifestoPage"));
const ManifestoQAPage = lazy(() => import("@/pages/ManifestoQAPage"));
const PracticalAISkillsPage = lazy(() => import("@/pages/PracticalAISkillsPage"));

function LegacyBlogIndexRedirect() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    setLocation("/signal", { replace: true });
  }, [setLocation]);

  return <main id="main-content" aria-live="polite">Taking you to The Signal.</main>;
}

function LegacyBlogArticleRedirect() {
  const { slug } = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();

  useEffect(() => {
    setLocation(`/signal/${slug}`, { replace: true });
  }, [setLocation, slug]);

  return <main id="main-content" aria-live="polite">Taking you to The Signal.</main>;
}

function RouteMetadataController() {
  const [location] = useLocation();
  useRouteMetadata(location);
  return null;
}

function RouteLoading() {
  return (
    <main id="main-content" aria-live="polite" className="grid min-h-screen place-items-center bg-[#061A29] px-6 text-center text-sm font-semibold uppercase tracking-[0.16em] text-[#D8A94A]">
      Loading Beacon Momentum…
    </main>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/assessment" component={Assessment} />
      <Route path="/pillar/:id" component={PillarPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/company" component={CompanyPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/terms" component={TermsPage} />
      <Route path="/refund" component={RefundPage} />
      <Route path="/beacon-trading" component={BeaconTradingPage} />
      <Route path="/pricing" component={PricingPage} />
      <Route path="/resources" component={ResourcesPage} />
      <Route path="/field-guides" component={FieldGuidesPage} />
      <Route path="/cookies" component={CookiePage} />
      <Route path="/disclaimer" component={DisclaimerPage} />
      <Route path="/path/:pillar" component={PillarSharePage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/digital-grandpa" component={DigitalGrandpaPage} />
      <Route path="/signal/:slug" component={BlogArticlePage} />
      <Route path="/signal" component={BlogPage} />
      <Route path="/blog/:slug" component={LegacyBlogArticleRedirect} />
      <Route path="/blog" component={LegacyBlogIndexRedirect} />
      <Route path="/community-build-grant" component={CommunityBuildGrantPage} />
      <Route path="/community-build-grant/social" component={CommunityBuildSocialPage} />
      <Route path="/field-notes" component={DigitalRampUpFieldNotesIndexPage} />
      <Route path="/watch-brief-premium" component={WatchBriefPremiumPage} />
      <Route path="/how-beacon-works" component={HowBeaconWorksPage} />
      <Route path="/foundation" component={FoundationYearPage} />
      <Route path="/foundation/founders-note" component={FounderNotePage} />
      <Route path="/foundation/support" component={FoundationSupportPage} />
      <Route path="/foundation/thank-you" component={FoundationSupportThankYouPage} />
      <Route path="/field-notes/five-questions-keep-you-in-charge" component={FiveQuestionsFieldNotePage} />
      <Route path="/field-notes/:slug" component={DigitalRampUpFieldNotePage} />
      <Route path="/the-watch" component={TheWatchPage} />
      <Route path="/the-watch/controlled-ai-workflow-kit" component={ControlledAIWorkflowKitPage} />
      <Route path="/the-watch/controlled-workflow-pilots" component={ControlledWorkflowPilotsPage} />
      <Route path="/the-watch/checkout" component={TheWatchCheckoutPage} />
      <Route path="/the-watch/confirmation" component={TheWatchConfirmationPage} />
      <Route path="/_ops/the-watch/test-checkout" component={TheWatchTestCheckoutPage} />
      <Route path="/_ops/the-watch/test-confirmation" component={TheWatchTestConfirmationPage} />
      <Route path="/the-watch/intake" component={TheWatchIntakePage} />
      <Route path="/the-watch/cohort" component={CohortDashboardPage} />
      <Route path="/manifesto/questions" component={ManifestoQAPage} />
      <Route path="/manifesto" component={ManifestoPage} />
      <Route path="/digital-grandpa/library" component={DigitalGrandpaLibraryPage} />
      <Route path="/practical-ai-skills" component={PracticalAISkillsPage} />
      <Route path="/start" component={StarterPackPage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <CookieConsent />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[#1A5C6B] focus:text-white focus:text-sm focus:font-ui focus:tracking-widest focus:uppercase"
          >
            Skip to main content
          </a>
          <RouteMetadataController />
          <Suspense fallback={<RouteLoading />}>
            <Router />
          </Suspense>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
