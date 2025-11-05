import { createRoot } from "react-dom/client";
import App from "./App";
// @ts-ignore: Allow side-effect CSS import without type declarations
import "./styles/tailwind.css";
// @ts-ignore: Allow side-effect CSS import without type declarations
import "./styles/index.css";

const container = document.getElementById("root");

if (!container) {
    throw new Error("Root element not found");
}

const root = createRoot(container);

root.render(<App />);

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);

        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content is available, show update prompt
                if (confirm('New version available! Refresh to update?')) {
                  newWorker.postMessage({ type: 'SKIP_WAITING' });
                  window.location.reload();
                }
              }
            });
          }
        });
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}