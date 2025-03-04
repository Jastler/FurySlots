/**
 * Service for managing stars/tokens balance
 * This is a demonstration service that would connect to your backend in a real app
 */

import { initData } from "@telegram-apps/sdk-react";

// Local storage key for stars balance (for demo only)
const STARS_BALANCE_KEY = "fury_slots_stars_balance";

export interface StarsPurchaseOption {
  id: string;
  amount: number;
  price: number;
  currency: string;
  discount?: number;
}

/**
 * Available purchase options for stars
 */
export const purchaseOptions: StarsPurchaseOption[] = [
  {
    id: "small",
    amount: 100,
    price: 1,
    currency: "USD",
  },
  {
    id: "medium",
    amount: 500,
    price: 4,
    currency: "USD",
    discount: 20,
  },
  {
    id: "large",
    amount: 1000,
    price: 7,
    currency: "USD",
    discount: 30,
  },
  {
    id: "xl",
    amount: 5000,
    price: 30,
    currency: "USD",
    discount: 40,
  },
];

/**
 * Get user's current stars balance
 * In a real app, this would make an API call to your backend
 */
export function getStarsBalance(): number {
  try {
    // In a real app, you'd fetch this from your backend based on the user ID
    const userId = initData.user?.id;
    if (!userId) return 0;

    const savedBalance = localStorage.getItem(`${STARS_BALANCE_KEY}_${userId}`);
    if (savedBalance) {
      return parseInt(savedBalance, 10);
    }

    // Default balance for new users (for demo)
    const defaultBalance = 100;
    localStorage.setItem(
      `${STARS_BALANCE_KEY}_${userId}`,
      defaultBalance.toString()
    );
    return defaultBalance;
  } catch (error) {
    console.error("Error getting stars balance:", error);
    return 0;
  }
}

/**
 * Add stars to the user's balance
 * In a real app, this would make an API call to your backend
 */
export function addStars(amount: number): Promise<number> {
  return new Promise((resolve, reject) => {
    try {
      const userId = initData.user?.id;
      if (!userId) {
        reject(new Error("User not authenticated"));
        return;
      }

      const currentBalance = getStarsBalance();
      const newBalance = currentBalance + amount;

      localStorage.setItem(
        `${STARS_BALANCE_KEY}_${userId}`,
        newBalance.toString()
      );
      resolve(newBalance);
    } catch (error) {
      console.error("Error adding stars:", error);
      reject(error);
    }
  });
}

/**
 * Spend stars from the user's balance
 * In a real app, this would make an API call to your backend
 */
export function spendStars(amount: number): Promise<number> {
  return new Promise((resolve, reject) => {
    try {
      const userId = initData.user?.id;
      if (!userId) {
        reject(new Error("User not authenticated"));
        return;
      }

      const currentBalance = getStarsBalance();

      if (currentBalance < amount) {
        reject(new Error("Insufficient stars balance"));
        return;
      }

      const newBalance = currentBalance - amount;
      localStorage.setItem(
        `${STARS_BALANCE_KEY}_${userId}`,
        newBalance.toString()
      );
      resolve(newBalance);
    } catch (error) {
      console.error("Error spending stars:", error);
      reject(error);
    }
  });
}

/**
 * Process a purchase of stars via Telegram payments
 * In a real app, this would connect to Telegram's payment API
 */
export function purchaseStars(optionId: string): Promise<number> {
  return new Promise((resolve, reject) => {
    try {
      const option = purchaseOptions.find((opt) => opt.id === optionId);
      if (!option) {
        reject(new Error("Invalid purchase option"));
        return;
      }

      // In a real app, here you would:
      // 1. Connect to Telegram's payment API
      // 2. Process the payment
      // 3. Verify the payment on your backend
      // 4. Add the stars to the user's account

      // For demo purposes, just add the stars directly
      addStars(option.amount)
        .then((newBalance) => resolve(newBalance))
        .catch((error) => reject(error));
    } catch (error) {
      console.error("Error purchasing stars:", error);
      reject(error);
    }
  });
}
