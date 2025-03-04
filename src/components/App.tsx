import { useLaunchParams, miniApp, useSignal } from "@telegram-apps/sdk-react";
import { AppRoot } from "@telegram-apps/telegram-ui";
import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";
import { StarsProvider } from "../services/StarsContext";
import { ErrorBoundary } from "./ErrorBoundary";

import { routes } from "@/navigation/routes.tsx";
import Header from "./Header";
import styles from "./App.module.scss";

export function App() {
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);

  return (
    <ErrorBoundary>
      <AppRoot
        appearance={isDark ? "dark" : "light"}
        platform={["macos", "ios"].includes(lp.platform) ? "ios" : "base"}
      >
        <StarsProvider>
          <BrowserRouter basename="/FurySlots">
            <div className={styles.app}>
              <Header />
              <div className={styles.content}>
                <Routes>
                  {routes.map((route) => (
                    <Route key={route.path} {...route} />
                  ))}
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </div>
            </div>
          </BrowserRouter>
        </StarsProvider>
      </AppRoot>
    </ErrorBoundary>
  );
}
