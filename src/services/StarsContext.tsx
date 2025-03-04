import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  getStarsBalance,
  addStars,
  spendStars,
  resetStarsBalance,
} from "./StarsService";

// Define interface for the context state
interface StarsContextType {
  balance: number;
  updateBalance: (newBalance: number) => void;
  refreshBalance: () => void;
  addToBalance: (amount: number) => Promise<number>;
  spendFromBalance: (amount: number) => Promise<number>;
  resetBalance: (amount?: number) => Promise<number>;
}

// Create context with default values
const StarsContext = createContext<StarsContextType>({
  balance: 500,
  updateBalance: () => {},
  refreshBalance: () => {},
  addToBalance: async () => 0,
  spendFromBalance: async () => 0,
  resetBalance: async () => 0,
});

// Provider component to wrap around the app
export const StarsProvider = ({ children }: { children: ReactNode }) => {
  const [balance, setBalance] = useState<number>(500);

  // Initialize balance
  useEffect(() => {
    refreshBalance();
  }, []);

  // Get current balance from service
  const refreshBalance = () => {
    const currentBalance = getStarsBalance();
    setBalance(currentBalance);
    return currentBalance;
  };

  // Direct update for the balance (e.g. for UI updates)
  const updateBalance = (newBalance: number) => {
    setBalance(newBalance);
  };

  // Add stars and update balance
  const addToBalance = async (amount: number): Promise<number> => {
    try {
      const newBalance = await addStars(amount);
      setBalance(newBalance);
      return newBalance;
    } catch (error) {
      console.error("Error adding stars:", error);
      throw error;
    }
  };

  // Spend stars and update balance
  const spendFromBalance = async (amount: number): Promise<number> => {
    try {
      console.log("spendFromBalance called with amount:", amount);
      console.log("Current balance before spending:", balance);
      const newBalance = await spendStars(amount);
      console.log("New balance after spending:", newBalance);
      setBalance(newBalance);
      return newBalance;
    } catch (error) {
      console.error("Error spending stars:", error);
      throw error;
    }
  };

  // Reset balance
  const resetBalanceFn = async (amount: number = 500): Promise<number> => {
    try {
      const newBalance = await resetStarsBalance(amount);
      setBalance(newBalance);
      return newBalance;
    } catch (error) {
      console.error("Error resetting stars balance:", error);
      throw error;
    }
  };

  return (
    <StarsContext.Provider
      value={{
        balance,
        updateBalance,
        refreshBalance,
        addToBalance,
        spendFromBalance,
        resetBalance: resetBalanceFn,
      }}
    >
      {children}
    </StarsContext.Provider>
  );
};

// Custom hook to use stars context
export const useStars = () => useContext(StarsContext);
