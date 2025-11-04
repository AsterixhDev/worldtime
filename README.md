# Welcome to WorldTime — website user guide

This document is a user-facing guide describing what the WorldTime website does and how to use its features. It's written for visitors and end users, not developers.

## What WorldTime does

- Shows the current local time for countries, regions, and timezones worldwide.
- Lets you build a personalized dashboard of clocks so you can monitor multiple locations at once.
- Provides detailed per-country timezone information and region-level time displays.
- Includes a fast search interface to find countries, regions, or timezones.
- Works offline for previously viewed data and supports installing the site as an app (PWA).
- Offers theme and accessibility controls so you can adjust colors and contrast to your needs.

## Quick start — main screens and actions

Below are the main screens you'll use and step-by-step guidance for each.

Home / World Clock Dashboard

1. Open the website and you land on the World Clock Dashboard.
2. Add a clock:
  - Use the search input (top or in the side panel) and type a country, city, or timezone name.
  - Select a result to add that location to your dashboard.
3. Rearrange or remove clocks:
  - Drag cards (if drag handle is shown) or use the card menu to remove a clock.
4. Save and reuse:
  - Your dashboard selections are stored locally so returning to the site shows your saved clocks.

Searching and filtering

1. Click the search box or press the keyboard shortcut (if shown) to focus it.
2. Type a country name (e.g., “Japan”), a city (e.g., “London”), or a timezone (e.g., “Europe/London”).
3. Results appear instantly. Use the arrow keys and Enter to select via keyboard.
4. Tip: partial terms and common spellings are supported — try “US”, “United”, or “New”.

Country & Timezone details page

1. From a dashboard card or search result, click the country name to open its detail page.
2. What you’ll see:
  - Country header with flag and basic info.
  - A list of regions/timezones for that country (each region has a Timezone Card).
  - For each timezone: current local time, UTC offset, and daylight saving status (if applicable).
3. Use region cards to quickly add a particular timezone to your dashboard.

Understanding a Timezone Card

- Current local time — updated live.
- UTC offset (e.g., +02:00) — shows the difference from UTC.
- DST indicator — shows if daylight saving is active or scheduled.
- Add / Remove button — quickly sync this timezone with your dashboard.

Offline mode (working without internet)

- The site caches previously visited country lists and your dashboard settings.
- If you lose connection, you’ll see an offline banner and the cached UI becomes active.
- Available offline features:
  - View cached country lists and timecards you previously opened.
  - Search within cached entries.
  - View your saved dashboard clocks.
- Limitations when offline:
  - New or rarely used timezone/country lookups may be unavailable until you reconnect.

Geolocation and permissions

1. The site may ask for permission to access your location to show your local timezone.
2. If you allow it:
  - The app displays a “Your location” clock and suggests nearby timezones.
3. If you deny permission:
  - You can still use the site fully — just use the search to add locations manually.
4. Change permissions via your browser settings or the device privacy controls.

Settings & personalization

Open Settings to change preferences. Common options include:

- Theme (Light / Dark / System) — choose the look that matches your device.
- Color scheme — pick an accent color for UI elements.
- Contrast tool — a utility to adjust contrast for readability.
- Notification/PWA install controls — manage whether the site can show install prompts or notifications.

How to install as an app (PWA)

1. If your browser supports PWA install, the site will show an install prompt in Settings or near the address bar.
2. Click “Install” and follow the browser prompts to add WorldTime to your device.
3. Once installed, WorldTime behaves like a native app and can be launched from your app list.

Accessibility and keyboard usage

- Keyboard navigation: most interactive elements are reachable via Tab and actionable with Enter/Space.
- Screen reader labels are included for key buttons and inputs.
- Use the Contrast tool in Settings to ensure color combinations meet your readability needs.

Frequently asked questions (FAQ)

Q: Does the site show seconds or update in real time?
A: Time displays update live. The primary clock shows hours and minutes continuously; seconds may be shown on expanded cards depending on the layout.

Q: Why can’t I find a small or obscure place?
A: The app focuses on country/region and common timezone names. If a place is very small or uses an uncommon timezone identifier, try searching the nearest major city or the canonical timezone name (like `America/Los_Angeles`).

Q: Is my data shared or sent to third parties?
A: The site stores only local settings (dashboard choices, theme) in your browser. If a remote API is used for timezone data, it may fetch current timezone rules — check the site’s privacy statement for details.

Troubleshooting (user-side)

- I see the offline banner but recently-added clocks disappeared: Refresh the page after reconnecting — cached clocks sync back if they were stored locally.
- The install prompt didn’t appear: Use the browser menu (⋯ or •••) and choose “Install” or “Add to home screen” — some browsers hide the prompt behind the menu.
- Time seems wrong for my location: Confirm your device clock/timezone is correct and that you granted geolocation permission if you’re using the local timezone feature.

Privacy & data

- Local storage: dashboard and display preferences are stored in your browser only.
- Geolocation: only used locally to determine your timezone; it’s optional and can be revoked via browser settings.
- External APIs: the site may query timezone metadata (offsets, DST rules). The service used is read-only and used to compute local times.

Contact & feedback

If you find an issue or want to request a feature, open the site’s feedback link or contact the site owner (look for a link in footer or the settings page).

Want this guide as a help page?

If you’d like, I can convert this documentation into an in-app Help page or a short, printable quickstart card with screenshots and tooltips. Tell me which format (help page, PDF, or in-app tour) and I’ll prepare it.

