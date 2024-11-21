import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app.tsx";
import "@/styles/global.css";

// Fonts Inter
import "@fontsource-variable/inter";

const rootElement = document.querySelector("#root") as HTMLElement;
const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
