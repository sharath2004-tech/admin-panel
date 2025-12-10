import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import HomeProvider from "./context/HomeContext.tsx";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "./context/ThemeContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./context/AuthContext.tsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <PayPalScriptProvider
    options={{ clientId: import.meta.env.VITE_REACT_APP_PAYPAL_CLIENT_ID }}
  >
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HomeProvider>
          <ThemeProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ThemeProvider>
        </HomeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </PayPalScriptProvider>
);
