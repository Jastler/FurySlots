import React, { useEffect, useState } from "react";
import { initData, useSignal } from "@telegram-apps/sdk-react";
import styles from "./ProfileModal.module.scss";
import { checkTelegramWebApp } from "../debug";
import { getStarsBalance } from "../../../services/StarsService";
import { List, Section, Cell, Text, Avatar } from "@telegram-apps/telegram-ui";
import "@telegram-apps/telegram-ui/dist/styles.css";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Component that displays user information in a Telegram native popup.
 * Uses Telegram WebApp API for displaying the native interface.
 */
const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const initDataState = useSignal(initData.state);
  const [showBackupModal, setShowBackupModal] = useState<boolean>(false);
  const [starsBalance, setStarsBalance] = useState<number>(0);

  // Get user's stars balance
  useEffect(() => {
    if (isOpen && initDataState?.user) {
      setStarsBalance(getStarsBalance());
    }
  }, [isOpen, initDataState?.user]);

  useEffect(() => {
    if (isOpen && initDataState?.user) {
      // Check Telegram WebApp API availability
      const tg = checkTelegramWebApp();

      const user = initDataState.user;

      // Format user information with emojis for better appearance
      const infoLines = [
        `🆔 ID: ${user.id}`,
        `👤 Name: ${user.firstName}${user.lastName ? " " + user.lastName : ""}`,
        `🔖 Username: ${user.username ? "@" + user.username : "not specified"}`,
        `🌐 Language: ${
          user.languageCode ? user.languageCode.toUpperCase() : "not specified"
        }`,
        `⭐ Premium: ${user.isPremium ? "Yes" : "No"}`,
        `💰 Stars Balance: ${starsBalance.toLocaleString()}`,
      ];

      const formattedMessage = infoLines.join("\n");

      try {
        if (tg && typeof tg.showPopup === "function") {
          // Use native Telegram popup
          tg.showPopup({
            title: "User Information",
            message: formattedMessage,
            buttons: [{ type: "ok", text: "OK" }],
          });
        } else {
          console.warn(
            "Telegram WebApp API unavailable or missing showPopup method, using fallback"
          );
          setShowBackupModal(true);
        }
      } catch (error) {
        console.error("Error when trying to show popup:", error);
        setShowBackupModal(true);
      }
    } else {
      setShowBackupModal(false);
    }
  }, [isOpen, initDataState, starsBalance]);

  if (!showBackupModal) return null;

  // Render a more beautiful fallback modal with user avatar and stylish design
  return (
    <div className={styles["modal-backdrop"]} onClick={onClose}>
      <div
        className={styles["modal-content"]}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles["modal-header"]}>
          <Text weight="2" size={18}>
            Інформація користувача
          </Text>
          <button className={styles["close-button"]} onClick={onClose}>
            ×
          </button>
        </div>
        <div className={styles["modal-body"]}>
          {initDataState?.user && (
            <div className={styles["user-profile-card"]}>
              <div className={styles["user-profile-header"]}>
                <Avatar
                  size={48}
                  src={
                    initDataState.user.photoUrl ||
                    "https://telegram.org/img/t_logo.svg"
                  }
                />
                <div className={styles["user-name-container"]}>
                  <Text weight="2" size={16}>
                    {initDataState.user.firstName}{" "}
                    {initDataState.user.lastName || ""}
                  </Text>
                  {initDataState.user.username && (
                    <Text color="secondary" size={14}>
                      @{initDataState.user.username}
                    </Text>
                  )}
                </div>
              </div>
              <List>
                <Section>
                  <Cell
                    before={<Text>🆔</Text>}
                    subtitle={initDataState.user.id}
                  >
                    ID користувача
                  </Cell>
                  <Cell
                    before={<Text>🌐</Text>}
                    subtitle={
                      initDataState.user.languageCode?.toUpperCase() ||
                      "Не вказано"
                    }
                  >
                    Мова
                  </Cell>
                  <Cell
                    before={<Text>⭐</Text>}
                    subtitle={initDataState.user.isPremium ? "Так" : "Ні"}
                  >
                    Преміум
                  </Cell>
                  <Cell
                    before={<Text>💰</Text>}
                    subtitle={starsBalance.toLocaleString()}
                    className={styles["stars-balance-item"]}
                  >
                    Баланс зірок
                  </Cell>
                </Section>
              </List>
            </div>
          )}
        </div>
        <div className={styles["modal-footer"]}>
          <button className={styles["ok-button"]} onClick={onClose}>
            Закрити
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
