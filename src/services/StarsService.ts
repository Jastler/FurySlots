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
 * Get current stars balance from localStorage
 */
export const getStarsBalance = (): number => {
  try {
    console.log("getStarsBalance called");

    // В реальному додатку ми б отримували цю інформацію з бекенду на основі ID користувача
    // @ts-expect-error Тип initData.user невизначений у TypeScript конфігурації
    const userId = initData.user?.id;

    // Використовуємо демо-ключ, якщо userId недоступний
    const storageKey = userId
      ? `${STARS_BALANCE_KEY}_${userId}`
      : `${STARS_BALANCE_KEY}_demo`;

    console.log("Using storage key:", storageKey);

    const storedBalance = localStorage.getItem(storageKey);
    console.log("Stored balance from localStorage:", storedBalance);

    // Якщо баланс не знайдено, повертаємо 500 за замовчуванням
    if (!storedBalance) {
      console.log("No stored balance found, setting default 500");
      localStorage.setItem(storageKey, "500");
      return 500;
    }

    const parsedBalance = parseInt(storedBalance, 10);
    console.log("Parsed balance:", parsedBalance);
    return parsedBalance;
  } catch (e) {
    console.error("Error getting stars balance:", e);
    return 500; // Значення за замовчуванням у разі помилки
  }
};

/**
 * Spend stars from the balance
 * @param amount Amount of stars to spend
 * @returns New balance after spending
 */
export const spendStars = async (amount: number): Promise<number> => {
  try {
    console.log("spendStars called with amount:", amount);

    // @ts-expect-error Тип initData.user невизначений у TypeScript конфігурації
    const userId = initData.user?.id;

    // Використовуємо демо-ключ, якщо userId недоступний
    // const storageKey = userId
    //   ? `${STARS_BALANCE_KEY}_${userId}`
    //   : `${STARS_BALANCE_KEY}_demo`;

    const storageKey = `${STARS_BALANCE_KEY}_demo`;

    console.log("Using storage key:", storageKey);

    // Get current balance
    const currentBalance = getStarsBalance();
    console.log("Current balance in spendStars:", currentBalance);

    // Check if there are enough stars
    if (currentBalance < amount) {
      console.log("Not enough stars to spend");
      throw new Error("Not enough stars");
    }

    // Calculate new balance
    const newBalance = currentBalance - amount;
    console.log("New balance to be saved:", newBalance);

    // Store new balance
    localStorage.setItem(storageKey, newBalance.toString());
    console.log("Balance saved to localStorage with key:", storageKey);

    return newBalance;
  } catch (e) {
    console.error("Error spending stars:", e);
    throw e;
  }
};

/**
 * Add stars to the balance
 * @param amount Amount of stars to add
 * @returns New balance after adding stars
 */
export const addStars = async (amount: number): Promise<number> => {
  try {
    // @ts-expect-error Тип initData.user невизначений у TypeScript конфігурації
    const userId = initData.user?.id;

    // Використовуємо демо-ключ, якщо userId недоступний
    const storageKey = userId
      ? `${STARS_BALANCE_KEY}_${userId}`
      : `${STARS_BALANCE_KEY}_demo`;

    // Get current balance
    const currentBalance = getStarsBalance();

    // Calculate new balance
    const newBalance = currentBalance + amount;

    // Store new balance
    localStorage.setItem(storageKey, newBalance.toString());

    return newBalance;
  } catch (e) {
    console.error("Error adding stars:", e);
    throw e;
  }
};

/**
 * Reset stars balance to specified amount (default 500)
 * @param amount Amount to reset balance to (default: 500)
 * @returns New balance
 */
export const resetStarsBalance = async (
  amount: number = 500
): Promise<number> => {
  try {
    // @ts-expect-error Тип initData.user невизначений у TypeScript конфігурації
    const userId = initData.user?.id;

    // Використовуємо демо-ключ, якщо userId недоступний
    const storageKey = userId
      ? `${STARS_BALANCE_KEY}_${userId}`
      : `${STARS_BALANCE_KEY}_demo`;

    // Store new balance
    localStorage.setItem(storageKey, amount.toString());

    return amount;
  } catch (e) {
    console.error("Error resetting stars balance:", e);
    throw e;
  }
};

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
