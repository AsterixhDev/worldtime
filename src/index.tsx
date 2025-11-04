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