import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import StarterPackPage from "@/pages/StarterPackPage";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Assessment from "./pages/Assessment";
import PillarPage from "./pages/PillarPage";
import AboutPage from "./pages/AboutPage";
import CompanyPage from "./pages/CompanyPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import BeaconTradingPage from "./pages/BeaconTradingPage";
import PricingPage from "./pages/PricingPage";
import ResourcesPage from "./pages/ResourcesPage";
import CookiePage from "./pages/CookiePage";
import CookieConsent from "./components/CookieConsent";
import DisclaimerPage from "./pages/DisclaimerPage";
import PillarSharePage from "@/pages/PillarSharePage";
import ContactPage from "@/pages/ContactPage";
import DigitalGrandpaLibraryPage from "@/pages/DigitalGrandpaLibraryPage";
import DigitalGrandpaPage from "@/pages/DigitalGrandpaPage";
import BlogPage from "@/pages/BlogPage";
import BlogArticlePage from "@/pages/BlogArticlePage";
import TheWatchPage from "@/pages/TheWatchPage";
import TheWatchCheckoutPage from "@/pages/TheWatchCheckoutPage";
import TheWatchConfirmationPage from "@/pages/TheWatchConfirmationPage";
import TheWatchTestCheckoutPage from "@/pages/TheWatchTestCheckoutPage";
import TheWatchTestConfirmationPage from "@/pages/TheWatchTestConfirmationPage";
import TheWatchIntakePage from "@/pages/TheWatchIntakePage";
import CohortDashboardPage from "@/pages/CohortDashboardPage";
import WatchBriefPremiumPage from "@/pages/WatchBriefPremiumPage";
import HowBeaconWorksPage from "@/pages/HowBeaconWorksPage";
import FoundationYearPage from "@/pages/FoundationYearPage";
import FoundationSupportPage from "@/pages/FoundationSupportPage";
import FoundationSupportThankYouPage from "@/pages/FoundationSupportThankYouPage";

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
      <Route path="/beacon-trading" component={BeaconTradingPage} />
      <Route path="/pricing" component={PricingPage} />
      <Route path="/resources" component={ResourcesPage} />
      <Route path="/cookies" component={CookiePage} />
      <Route path="/disclaimer" component={DisclaimerPage} />
      <Route path="/path/:pillar" component={PillarSharePage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/digital-grandpa" component={DigitalGrandpaPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/blog/:slug" component={BlogArticlePage} />
      <Route path="/watch-brief-premium" component={WatchBriefPremiumPage} />
      <Route path="/how-beacon-works" component={HowBeaconWorksPage} />
      <Route path="/foundation" component={FoundationYearPage} />
      <Route path="/foundation/support" component={FoundationSupportPage} />
      <Route path="/foundation/thank-you" component={FoundationSupportThankYouPage} />
      <Route path="/the-watch" component={TheWatchPage} />
      <Route path="/the-watch/checkout" component={TheWatchCheckoutPage} />
      <Route path="/the-watch/confirmation" component={TheWatchConfirmationPage} />
      <Route path="/_ops/the-watch/test-checkout" component={TheWatchTestCheckoutPage} />
      <Route path="/_ops/the-watch/test-confirmation" component={TheWatchTestConfirmationPage} />
      <Route path="/the-watch/intake" component={TheWatchIntakePage} />
      <Route path="/the-watch/cohort" component={CohortDashboardPage} />
      <Route path="/digital-grandpa/library" component={DigitalGrandpaLibraryPage} />
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
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[#1A5C6B] focus:text-white focus:text-sm focus:font-ui focus:tracking-widest focus:uppercase focus:rounded-sm focus:outline-none"
          >
            Skip to main content
          </a>
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
