import Header from "components/ui/Header";
import Navbar from "components/ui/Navbar";
import React from "react";
import { Link } from "react-router-dom";
import { Clock, Search, MapPin, Settings, Smartphone, Shield, HelpCircle, ChevronRight } from "lucide-react";

const HelpPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navbar />
      <main className="!pt-16 pb-8 lg:pl-72 max-w-6xl mx-auto p-4 lg:p-6">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <HelpCircle className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Help Center — WorldTime</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn how to use WorldTime to track time across the globe. From basic setup to advanced features,
            find everything you need to make the most of your world clock experience.
          </p>
        </div>

        {/* Quick Start Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-primary mr-3" />
              <h3 className="text-lg font-semibold">Get Started</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Add your first clock and start tracking time around the world.
            </p>
            <Link to="#dashboard" className="text-primary hover:underline flex items-center">
              Learn more <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <Search className="w-6 h-6 text-primary mr-3" />
              <h3 className="text-lg font-semibold">Search & Find</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Discover countries and timezones with our fast search interface.
            </p>
            <Link to="#searching" className="text-primary hover:underline flex items-center">
              Learn more <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <Settings className="w-6 h-6 text-primary mr-3" />
              <h3 className="text-lg font-semibold">Customize</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Personalize your experience with themes, colors, and preferences.
            </p>
            <Link to="#settings" className="text-primary hover:underline flex items-center">
              Learn more <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>

        <h2 className="prose prose-lg max-w-none">
          <HelpCircle className="w-6 h-6 mr-3 text-primary" />
          What WorldTime Does
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div className="flex items-start">
              <Clock className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Global Time Tracking</h3>
                <p className="text-muted-foreground">Shows current local time for countries, regions, and timezones worldwide.</p>
              </div>
            </div>
            <div className="flex items-start">
              <MapPin className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Personal Dashboard</h3>
                <p className="text-muted-foreground">Build a customized collection of clocks to monitor multiple locations.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Search className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Fast Search</h3>
                <p className="text-muted-foreground">Quickly find countries, regions, or timezones with our search interface.</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start">
              <Smartphone className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Offline Support</h3>
                <p className="text-muted-foreground">Works offline for previously-viewed data and supports PWA installation.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Settings className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Accessibility</h3>
                <p className="text-muted-foreground">Theme and contrast controls for personalized viewing experience.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Shield className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Privacy Focused</h3>
                <p className="text-muted-foreground">Your data stays local with optional geolocation features.</p>
              </div>
            </div>
          </div>
        </div>

        <h2 id="dashboard" className="flex items-center text-2xl font-bold mb-6">
          <Clock className="w-6 h-6 mr-3 text-primary" />
          Quick Start — Main Features
        </h2>

        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-primary" />
            Home / World Clock Dashboard
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Getting Started</h4>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                <li>Open the website and you'll land on the World Clock Dashboard.</li>
                <li>Your dashboard selections are saved locally and persist between visits.</li>
              </ol>
            </div>
            <div>
              <h4 className="font-medium mb-2">Managing Your Clocks</h4>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Use the search bar to find and add new locations</li>
                <li>Drag cards to rearrange or use the menu to remove clocks</li>
                <li>All changes are automatically saved to your browser</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Search className="w-5 h-5 mr-2 text-primary" />
            Searching and Finding Locations
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">How to Search</h4>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                <li>Click the search box to focus it</li>
                <li>Type a country name, city, or timezone</li>
                <li>Results appear instantly as you type</li>
                <li>Use arrow keys and Enter for keyboard navigation</li>
              </ol>
            </div>
            <div>
              <h4 className="font-medium mb-2">Search Tips</h4>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Try "Japan", "London", or "America/New_York"</li>
                <li>Partial matches and common spellings work</li>
                <li>Search works even when offline for cached locations</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-primary" />
            Country & Timezone Details
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Exploring Details</h4>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                <li>Click any country name from dashboard or search</li>
                <li>View detailed timezone information</li>
                <li>See all regions and their current times</li>
              </ol>
            </div>
            <div>
              <h4 className="font-medium mb-2">What You'll Find</h4>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Country flag and basic information</li>
                <li>Complete list of timezones by region</li>
                <li>UTC offsets and daylight saving status</li>
                <li>Quick-add buttons for each timezone</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-primary" />
            Understanding Timezone Cards
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <strong className="text-foreground">Current Time</strong>
                  <p className="text-muted-foreground text-sm">Live-updating local time display</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <strong className="text-foreground">UTC Offset</strong>
                  <p className="text-muted-foreground text-sm">Shows difference from UTC (e.g., +02:00)</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <strong className="text-foreground">DST Status</strong>
                  <p className="text-muted-foreground text-sm">Daylight saving active or scheduled</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <strong className="text-foreground">Add/Remove</strong>
                  <p className="text-muted-foreground text-sm">Sync timezone with your dashboard</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 id="offline" className="flex items-center text-2xl font-bold mb-6">
          <Smartphone className="w-6 h-6 mr-3 text-primary" />
          Offline Mode
        </h2>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
          <div className="flex items-start mb-4">
            <Smartphone className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-1 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">Work Without Internet</h3>
              <p className="text-blue-800 dark:text-blue-200">
                WorldTime works offline for previously viewed content, so you can check times even without a connection.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2 text-blue-900 dark:text-blue-100">What Works Offline</h4>
              <ul className="space-y-1 text-blue-800 dark:text-blue-200">
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                  View cached country lists
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                  See your saved dashboard clocks
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                  Search within cached locations
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-blue-900 dark:text-blue-100">Limitations</h4>
              <ul className="space-y-1 text-blue-800 dark:text-blue-200">
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></div>
                  New locations require internet
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></div>
                  Reconnect to sync latest data
                </li>
              </ul>
            </div>
          </div>
        </div>

        <h2 id="geolocation">Geolocation and permissions</h2>
        <ol>
          <li>
            The site may ask permission to access your location to show your
            local timezone.
          </li>
          <li>
            If you allow it: the app displays a “Your location” clock and
            suggests nearby timezones.
          </li>
          <li>
            If you deny it: you can still use the site fully — add locations
            manually via search.
          </li>
          <li>
            Change permissions via your browser or device privacy settings.
          </li>
        </ol>

        <h2 id="settings" className="flex items-center text-2xl font-bold mb-6">
          <Settings className="w-6 h-6 mr-3 text-primary" />
          Settings & Personalization
        </h2>

        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <Settings className="w-6 h-6 text-primary mr-3" />
            <div>
              <h3 className="text-lg font-semibold">Customize Your Experience</h3>
              <p className="text-muted-foreground">Make WorldTime work the way you want it to.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3 mt-1">
                  <span className="text-primary font-semibold text-sm">🎨</span>
                </div>
                <div>
                  <h4 className="font-medium">Theme Selection</h4>
                  <p className="text-sm text-muted-foreground">Light, Dark, or System theme</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3 mt-1">
                  <span className="text-primary font-semibold text-sm">🎯</span>
                </div>
                <div>
                  <h4 className="font-medium">Color Scheme</h4>
                  <p className="text-sm text-muted-foreground">Choose accent colors for UI elements</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3 mt-1">
                  <span className="text-primary font-semibold text-sm">👁️</span>
                </div>
                <div>
                  <h4 className="font-medium">Contrast Tool</h4>
                  <p className="text-sm text-muted-foreground">Adjust contrast for better readability</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3 mt-1">
                  <span className="text-primary font-semibold text-sm">📱</span>
                </div>
                <div>
                  <h4 className="font-medium">PWA Controls</h4>
                  <p className="text-sm text-muted-foreground">Install prompts and notifications</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <Link to="/settings" className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              <Settings className="w-4 h-4 mr-2" />
              Open Settings
            </Link>
          </div>
        </div>

        <h2 id="pwa" className="flex items-center text-2xl font-bold mb-6">
          <Smartphone className="w-6 h-6 mr-3 text-primary" />
          Install as an App (PWA)
        </h2>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-8">
          <div className="flex items-start mb-6">
            <Smartphone className="w-8 h-8 text-green-600 dark:text-green-400 mt-1 mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-2">Get WorldTime on Your Device</h3>
              <p className="text-green-800 dark:text-green-200">
                Install WorldTime as a Progressive Web App for the full native app experience.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">1️⃣</span>
              </div>
              <h4 className="font-medium mb-1">Look for Install Prompt</h4>
              <p className="text-sm text-muted-foreground">Check Settings or browser address bar</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">2️⃣</span>
              </div>
              <h4 className="font-medium mb-1">Click Install</h4>
              <p className="text-sm text-muted-foreground">Follow browser prompts to add to device</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">3️⃣</span>
              </div>
              <h4 className="font-medium mb-1">Launch from Home Screen</h4>
              <p className="text-sm text-muted-foreground">Find WorldTime in your app list</p>
            </div>
          </div>

          <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-4">
            <div className="flex items-start">
              <HelpCircle className="w-5 h-5 text-green-700 dark:text-green-300 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-green-900 dark:text-green-100 mb-1">Don't see the install option?</h4>
                <p className="text-sm text-green-800 dark:text-green-200">
                  Use your browser's menu and look for "Install" or "Add to home screen" options.
                </p>
              </div>
            </div>
          </div>
        </div>

        <h2 id="accessibility">Accessibility and keyboard usage</h2>
        <ul>
          <li>
            Keyboard navigation: interactive elements are reachable via Tab and
            actionable with Enter/Space.
          </li>
          <li>Screen reader labels are included for key buttons and inputs.</li>
          <li>
            Use the Contrast tool in Settings to ensure color combinations meet
            your readability needs.
          </li>
        </ul>

        <h2 id="faq" className="flex items-center text-2xl font-bold mb-6">
          <HelpCircle className="w-6 h-6 mr-3 text-primary" />
          Frequently Asked Questions
        </h2>

        <div className="space-y-6 mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-primary" />
              Does the site show seconds or update in real time?
            </h3>
            <p className="text-muted-foreground">
              Time displays update live every second. Primary clocks show hours and minutes continuously;
              seconds are visible on expanded cards and detail views for precise timing.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Search className="w-5 h-5 mr-2 text-primary" />
              Why can't I find a small or obscure place?
            </h3>
            <p className="text-muted-foreground mb-3">
              Search focuses on countries, major cities, and standard timezone names. For smaller locations:
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
              <li>Try the nearest major city or region</li>
              <li>Use the canonical timezone name (e.g., <code className="bg-muted px-1 py-0.5 rounded text-sm">America/Los_Angeles</code>)</li>
              <li>Search for the country name to see all available timezones</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-primary" />
              Is my data shared or sent to third parties?
            </h3>
            <p className="text-muted-foreground">
              Your privacy is protected. Dashboard preferences and settings are stored locally in your browser only.
              When fetching timezone data, we use reliable public APIs that don't track personal information.
            </p>
          </div>
        </div>

        <h2 id="troubleshooting">Troubleshooting (user-side)</h2>
        <ul>
          <li>
            If recently-added clocks disappeared while offline: refresh after
            reconnecting — cached clocks sync back if stored locally.
          </li>
          <li>
            If the install prompt didn’t appear: use the browser menu and choose
            “Install” or “Add to home screen”.
          </li>
          <li>
            If time seems wrong: confirm your device clock/timezone is correct
            and that you granted geolocation permission if using the local
            timezone feature.
          </li>
        </ul>

        <h2 id="privacy">Privacy & data</h2>
        <ul>
          <li>
            Local storage: dashboard and display preferences are stored in your
            browser only.
          </li>
          <li>
            Geolocation: only used locally to determine your timezone; optional
            and revocable.
          </li>
          <li>
            External APIs: may be queried for timezone metadata (offsets, DST
            rules) to compute local times.
          </li>
        </ul>

        <h2 id="contact" className="flex items-center text-2xl font-bold mb-6">
          <HelpCircle className="w-6 h-6 mr-3 text-primary" />
          Contact & Feedback
        </h2>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6 mb-8">
          <div className="flex items-start mb-4">
            <HelpCircle className="w-6 h-6 text-purple-600 dark:text-purple-400 mt-1 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">Get in Touch</h3>
              <p className="text-purple-800 dark:text-purple-200">
                Have questions, found a bug, or want to suggest a feature? We'd love to hear from you.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/50 dark:bg-black/20 rounded-lg p-4">
              <h4 className="font-medium mb-2 text-purple-900 dark:text-purple-100">Report Issues</h4>
              <p className="text-sm text-purple-800 dark:text-purple-200 mb-3">
                Found a bug or experiencing problems? Let us know so we can fix it.
              </p>
              <Link to="/settings" className="text-purple-700 dark:text-purple-300 hover:underline text-sm">
                Open feedback form →
              </Link>
            </div>
            <div className="bg-white/50 dark:bg-black/20 rounded-lg p-4">
              <h4 className="font-medium mb-2 text-purple-900 dark:text-purple-100">Feature Requests</h4>
              <p className="text-sm text-purple-800 dark:text-purple-200 mb-3">
                Have ideas for new features or improvements? Share your suggestions.
              </p>
              <span className="text-purple-700 dark:text-purple-300 text-sm">
                Contact site owner
              </span>
            </div>
          </div>
        </div>

        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
            <HelpCircle className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Need More Help?</h3>
          <p className="text-muted-foreground mb-4">
            Want this guide as an in-app tour or printable quickstart? Let us know!
          </p>
          <Link to="/settings" className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            <HelpCircle className="w-4 h-4 mr-2" />
            Contact Support
          </Link>
        </div>
      </main>
    </div>
  );
};

export default HelpPage;
