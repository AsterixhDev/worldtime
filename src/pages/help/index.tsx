import Header from "components/ui/Header";
import Navbar from "components/ui/Navbar";
import React from "react";
import { Link } from "react-router-dom";

const HelpPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navbar />
      <main className="pt-16 pb-8 lg:pl-72 max-w-4xl mx-auto p-6 prose lg:prose-lg">
        <h1>Help — WorldTime</h1>

        <p>
          This Help page explains what WorldTime does and how to use the site’s
          features. It is written for end users who want to learn how to view,
          track, and manage world times.
        </p>

        <h2 id="what-it-does">What WorldTime does</h2>
        <ul>
          <li>
            Shows the current local time for countries, regions, and timezones
            worldwide.
          </li>
          <li>
            Lets you build a personalized dashboard of clocks to monitor
            multiple locations.
          </li>
          <li>
            Provides detailed per-country timezone information and region-level
            time displays.
          </li>
          <li>
            Contains a fast search interface to find countries, regions, or
            timezones.
          </li>
          <li>
            Works offline for previously-viewed data and supports installing the
            site as a PWA.
          </li>
          <li>
            Offers theme and accessibility controls so you can adjust colors and
            contrast.
          </li>
        </ul>

        <h2 id="dashboard">Quick start — main screens and actions</h2>

        <h3>Home / World Clock Dashboard</h3>
        <ol>
          <li>Open the website and you land on the World Clock Dashboard.</li>
          <li>
            Add a clock:
            <ul>
              <li>
                Use the search input and type a country, city, or timezone name.
              </li>
              <li>Select a result to add that location to your dashboard.</li>
            </ul>
          </li>
          <li>
            Rearrange or remove clocks: drag cards (if a drag handle is shown)
            or use the card menu to remove a clock.
          </li>
          <li>
            Your dashboard selections are stored locally so returning to the
            site shows your saved clocks.
          </li>
        </ol>

        <h3>Searching and filtering</h3>
        <ol>
          <li>
            Click the search box or press the keyboard shortcut (if shown) to
            focus it.
          </li>
          <li>
            Type a country name (for example, “Japan”), a city (for example,
            “London”), or a timezone name.
          </li>
          <li>
            Results appear instantly. Use the arrow keys and Enter to select via
            keyboard.
          </li>
          <li>Tip: partial terms and common spellings are supported.</li>
        </ol>

        <h3>Country & timezone details page</h3>
        <ol>
          <li>
            From a dashboard card or search result, click the country name to
            open its detail page.
          </li>
          <li>
            What you’ll see:
            <ul>
              <li>Country header with flag and basic info.</li>
              <li>A list of regions/timezones for that country.</li>
              <li>
                For each timezone: current time, UTC offset, and daylight saving
                status (if applicable).
              </li>
            </ul>
          </li>
          <li>
            Use region cards to quickly add that timezone to your dashboard.
          </li>
        </ol>

        <h3>Understanding a Timezone Card</h3>
        <ul>
          <li>Current local time — updated live.</li>
          <li>UTC offset (for example, +02:00).</li>
          <li>
            DST indicator — shows if daylight saving is active or scheduled.
          </li>
          <li>Add / Remove button — sync this timezone with your dashboard.</li>
        </ul>

        <h2 id="offline">Offline mode (working without internet)</h2>
        <ul>
          <li>
            The site caches previously visited country lists and your dashboard
            settings.
          </li>
          <li>
            If you lose connection, you’ll see an offline banner and the cached
            UI becomes active.
          </li>
          <li>
            Available offline features: view cached country lists, cached
            timecards, search within cached entries, and view your saved
            dashboard clocks.
          </li>
          <li>
            Limitations: new or rarely used lookups may be unavailable until you
            reconnect.
          </li>
        </ul>

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

        <h2 id="settings">Settings & personalization</h2>
        <p>
          Open <Link to="/settings">Settings</Link> to change preferences.
          Common options include:
        </p>
        <ul>
          <li>Theme (Light / Dark / System)</li>
          <li>Color scheme — pick an accent color for UI elements.</li>
          <li>Contrast tool — utility to adjust contrast for readability.</li>
          <li>Notification / PWA install controls.</li>
        </ul>

        <h2 id="pwa">How to install as an app (PWA)</h2>
        <ol>
          <li>
            If your browser supports PWA install, the site will show an install
            prompt in Settings or near the address bar.
          </li>
          <li>
            Click “Install” and follow the browser prompts to add WorldTime to
            your device.
          </li>
          <li>
            Once installed, WorldTime behaves like a native app and can be
            launched from your app list.
          </li>
        </ol>

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

        <h2 id="faq">Frequently asked questions (FAQ)</h2>
        <dl>
          <dt>Does the site show seconds or update in real time?</dt>
          <dd>
            Time displays update live. Primary clocks show hours and minutes
            continuously; seconds may be shown on expanded cards depending on
            layout.
          </dd>

          <dt>Why can’t I find a small or obscure place?</dt>
          <dd>
            Search focuses on country/region and common timezone names. If a
            place is very small, try searching the nearest major city or the
            canonical timezone name (for example:{" "}
            <code>America/Los_Angeles</code>).
          </dd>

          <dt>Is my data shared or sent to third parties?</dt>
          <dd>
            Local settings (dashboard choices, theme) are stored in your
            browser. If the site uses a remote API for timezone data, it may
            fetch timezone rules — consult the privacy statement (if available)
            for details.
          </dd>
        </dl>

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

        <h2 id="contact">Contact & feedback</h2>
        <p>
          To report an issue or request a feature, use the site’s feedback link
          (footer or Settings) or contact the site owner directly.
        </p>

        <p className="mt-8">
          Want this guide as an in-app tour or printable quickstart? Contact the
          site owner or open the feedback link in Settings.
        </p>
      </main>
    </div>
  );
};

export default HelpPage;
