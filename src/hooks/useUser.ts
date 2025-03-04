import { useSignal } from "@telegram-apps/sdk-react";
import { initData } from "@telegram-apps/sdk-react";
import { useState, useEffect } from "react";

/**
 * Custom hook for working with Telegram user data
 */
export const useUser = () => {
  const initDataState = useSignal(initData.state);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // We can add additional loading logic here if needed
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [initDataState]);

  return {
    user: initDataState?.user,
    isLoading,
    isAuthenticated: !!initDataState?.user,
    isPremium: !!initDataState?.user?.isPremium,
  };
};
