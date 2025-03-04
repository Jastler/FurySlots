import { useState } from "react";
import { Logo } from "./Logo/Logo";
import ProfileModal from "./ProfileModal/ProfileModal";
import { StarsBalance } from "./StarsBalance";
import { UserAvatar } from "./UserAvatar";
import { useUser } from "../../hooks";
import { checkTelegramWebApp } from "./debug";
import styles from "./Header.module.scss";

/**
 * Main application header component
 */
export default function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user } = useUser();

  // Balance refresh trigger to sync balance between components
  const [balanceRefreshTrigger, setBalanceRefreshTrigger] = useState(0);

  const handleAvatarClick = () => {
    console.log("Avatar clicked, opening profile");

    // Check Telegram WebApp API availability
    const tg = checkTelegramWebApp();
    console.log("Telegram WebApp API loading status:", !!tg);

    setIsProfileOpen(true);
  };

  const handleCloseProfile = () => {
    console.log("Closing profile");
    setIsProfileOpen(false);

    setBalanceRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <Logo />
        <div className={styles.spacer} />
        <StarsBalance refreshTrigger={balanceRefreshTrigger} />
        <UserAvatar user={user} onClick={handleAvatarClick} />
      </div>

      <ProfileModal isOpen={isProfileOpen} onClose={handleCloseProfile} />
    </div>
  );
}
