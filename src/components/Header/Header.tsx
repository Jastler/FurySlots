import { useState } from "react";
import { initData, useSignal } from "@telegram-apps/sdk-react";
import { Avatar, Text } from "@telegram-apps/telegram-ui";

import Logo from "./Logo";
import "./Header.css";
import ProfileModal from "./ProfileModal";
import { checkTelegramWebApp } from "./debug";

export default function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const initDataState = useSignal(initData.state);

  const user = initDataState?.user;

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
  };

  return (
    <div className="header">
      <div className="header-content">
        <Logo />

        <div className="spacer" />

        <div
          className="user-profile-container"
          onClick={handleAvatarClick}
          role="button"
          aria-label="Open user profile"
        >
          <Avatar size={48} src={user?.photoUrl} className="user-avatar" />
          <Text weight="3">{user?.firstName || "User"}</Text>
        </div>
      </div>

      <ProfileModal isOpen={isProfileOpen} onClose={handleCloseProfile} />
    </div>
  );
}
