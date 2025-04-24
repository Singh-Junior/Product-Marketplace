import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { AlertProvider } from "./services/AlertContext";
import AlertStack from "./services/AlertStack";
import "./styles/main.scss";

const root = createRoot(document.getElementById("root")!);

root.render(
  <BrowserRouter>
    <AlertProvider>
      <App />
      <AlertStack />
    </AlertProvider>
  </BrowserRouter>
);
