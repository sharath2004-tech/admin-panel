import { useTheme } from "./hooks/useThemeContext";
import * as Toast from "@radix-ui/react-toast";
import "./styles/Toast.css";
import AuthRoutes from "./routes/AuthRoutes";
import { useAuth } from "./hooks/useAuthContext";
import { Suspense, useCallback } from "react";
import { Toaster } from "@/lib/ui/Toaster";
import { MainLoader } from "./constants/Loader";
import NoAuthRoutes from "./routes/NoAuthRoutes";
import { systemTheme } from "./constants/Color";
const App = () => {
  const { currentTheme } = useTheme();
  const { loaded, user, token } = useAuth();

  function AuthRoute() {
    return <AuthRoutes />;
  }
  function NoAuthRoute() {
    return (
      <Suspense fallback={<MainLoader />}>
        <NoAuthRoutes />
      </Suspense>
    );
  }
  const determineRoute = useCallback(() => {
    if (user && token) return <AuthRoute />;
    return <NoAuthRoute />;
  }, [user, token]);
  return (
    <Toast.Provider swipeDirection="right">
      {loaded ? (
        <div
          className={`${
            currentTheme === "dark" || (currentTheme === "dark" && systemTheme)
              ? "dark"
              : ""
          }  `}
        >
          {determineRoute()}
          <Toaster />
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <MainLoader />
        </div>
      )}
    </Toast.Provider>
  );
};

export default App;
