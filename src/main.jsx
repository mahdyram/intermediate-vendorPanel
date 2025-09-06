import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import VendorProvider from "./context/VendorProvider.jsx";

createRoot(document.getElementById("root")).render(
  <VendorProvider>
    <App />
  </VendorProvider>
);
