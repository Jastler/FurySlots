import { useState, useEffect } from "react";
import { initData, useSignal } from "@telegram-apps/sdk-react";
import { purchaseOptions } from "../../../services/StarsService";
import { useStars } from "../../../services/StarsContext";
import styles from "./StarsBalance.module.scss";

interface StarsBalanceProps {
  refreshTrigger?: number; // Optional prop to trigger balance refresh
}

/**
 * Component for displaying and managing user's stars balance
 */
export const StarsBalance: React.FC<StarsBalanceProps> = ({
  refreshTrigger = 0,
}) => {
  const { balance, refreshBalance, addToBalance } = useStars();
  const initDataState = useSignal(initData.state);

  // Get initial stars balance
  useEffect(() => {
    if (initDataState?.user) {
      refreshBalance();
    }
  }, [initDataState?.user, refreshTrigger, refreshBalance]);

  const handleAddStars = () => {
    // Open stars purchase dialog
    console.log("Opening stars purchase dialog");
    const tg = window.Telegram?.WebApp;

    if (tg && typeof tg.showPopup === "function") {
      // Format purchase options for display
      const optionsText = purchaseOptions
        .map((option) => {
          const discountText = option.discount
            ? ` (${option.discount}% OFF!)`
            : "";
          return `• ${option.amount} Stars - $${option.price}${discountText}`;
        })
        .join("\n");

      const message = `Choose how many stars you want to purchase:\n\n${optionsText}\n\nIn a real app, selecting an option would connect to Telegram's payment system.`;

      tg.showPopup(
        {
          title: "Purchase Stars",
          message: message,
          buttons: [
            { type: "default", text: "Buy 100 Stars", id: "small" },
            { type: "default", text: "Buy 500 Stars", id: "medium" },
            { type: "default", text: "Buy 1000 Stars", id: "large" },
            { type: "cancel", text: "Cancel" },
          ],
        },
        (buttonId) => {
          if (buttonId && buttonId !== "cancel") {
            // Find the selected option
            const selectedOption = purchaseOptions.find(
              (opt) => opt.id === buttonId
            );
            if (selectedOption) {
              // For demo, add stars directly
              addToBalance(selectedOption.amount)
                .then((newBalance) => {
                  tg.showPopup({
                    title: "Purchase Successful",
                    message: `You've successfully purchased ${selectedOption.amount} stars!\nYour new balance: ${newBalance} stars`,
                    buttons: [{ type: "ok", text: "OK" }],
                  });
                })
                .catch((error) => {
                  tg.showPopup({
                    title: "Purchase Failed",
                    message: `Error: ${error.message}`,
                    buttons: [{ type: "ok", text: "OK" }],
                  });
                });
            }
          }
        }
      );
    } else {
      // Fallback for when Telegram WebApp API is not available
      // For demo purposes, just add 100 stars
      addToBalance(100)
        .then((newBalance) => {
          alert(
            `Added 100 stars! Your new balance: ${newBalance} stars\n\nIn a real app, this would use Telegram's payment system.`
          );
        })
        .catch((error) => {
          alert(`Error: ${error.message}`);
        });
    }
  };

  return (
    <div className={styles["stars-balance-container"]}>
      <button className={styles["add-stars-button"]} onClick={handleAddStars}>
        +
      </button>
      <div className={styles["stars-balance"]}>
        <span className={styles["stars-icon"]}>⭐</span>
        <span className={styles["stars-count"]}>
          {balance.toLocaleString()}
        </span>
      </div>
    </div>
  );
};
