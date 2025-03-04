import React, { useEffect, useState } from "react";
import { initData, useSignal } from "@telegram-apps/sdk-react";
import "./ProfileModal.css";
import { checkTelegramWebApp } from "./debug";

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
  }, [isOpen, initDataState]);

  if (!showBackupModal) return null;

  // Render a more beautiful fallback modal with user avatar and stylish design
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>User Information</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          {initDataState?.user && (
            <div className="user-profile-card">
              <div className="user-profile-header">
                <div className="user-avatar-container">
                  <img
                    src={
                      initDataState.user.photoUrl ||
                      "https://telegram.org/img/t_logo.svg"
                    }
                    alt="User Avatar"
                    className="user-avatar-large"
                  />
                  {initDataState.user.isPremium && (
                    <div className="premium-badge">⭐</div>
                  )}
                </div>
                <div className="user-name-container">
                  <h3 className="user-fullname">
                    {initDataState.user.firstName}{" "}
                    {initDataState.user.lastName || ""}
                  </h3>
                  {initDataState.user.username && (
                    <p className="user-username">
                      @{initDataState.user.username}
                    </p>
                  )}
                </div>
              </div>
              <div className="user-details">
                <div className="user-detail-item">
                  <span className="detail-label">🆔 ID</span>
                  <span className="detail-value">{initDataState.user.id}</span>
                </div>
                <div className="user-detail-item">
                  <span className="detail-label">🌐 Language</span>
                  <span className="detail-value">
                    {initDataState.user.languageCode
                      ? initDataState.user.languageCode.toUpperCase()
                      : "Not specified"}
                  </span>
                </div>
                <div className="user-detail-item">
                  <span className="detail-label">⭐ Premium</span>
                  <span className="detail-value premium-status">
                    {initDataState.user.isPremium ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button className="ok-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
