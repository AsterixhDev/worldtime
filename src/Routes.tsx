import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import CountryTimezoneDetails from "./pages/country-timezone-details";
import WorldClockDashboard from "./pages/world-clock-dashboard";
import OfflineModePage from "./pages/offline-mode";
import SettingsPage from "./pages/settings";
import HelpPage from "./pages/help";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Define your routes here */}
          <Route path="/" element={<WorldClockDashboard />} />
          <Route path="/help" element={<HelpPage />} />
          <Route
            path="/country-timezone-details"
            element={<CountryTimezoneDetails />}
          />
          <Route
            path="/world-clock-dashboard"
            element={<WorldClockDashboard />}
          />
          <Route path="/offline-mode" element={<OfflineModePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
