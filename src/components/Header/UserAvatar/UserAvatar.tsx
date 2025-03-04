import { Avatar, Text } from "@telegram-apps/telegram-ui";
import { User } from "@telegram-apps/sdk-react";
import { useState } from "react";
import styles from "./UserAvatar.module.scss";

interface UserAvatarProps {
  user: User | null | undefined;
  onClick: () => void;
}

/* eslint-disable react/prop-types */
/**
 * Component for displaying user avatar and name
 * @param {UserAvatarProps} props - Component props
 * @param {User|null|undefined} props.user - User object with profile information
 * @param {Function} props.onClick - Function to call when avatar is clicked
 */
export const UserAvatar: React.FC<UserAvatarProps> = ({ user, onClick }) => {
  const [imageError, setImageError] = useState(false);
  // Визначаємо доступні дані користувача, з обробкою випадку відсутності даних
  const photoUrl = user?.photoUrl || "";
  const firstName = user?.firstName || "Користувач";

  // Функція для створення ініціалів із імені користувача
  const getInitials = (): string => {
    if (!user) return "?";
    return user.firstName.charAt(0).toUpperCase();
  };

  // Показуємо аватар з фото або ініціалами, якщо фото недоступне
  const renderAvatar = () => {
    if (!photoUrl || imageError) {
      return (
        <div className={styles["fallback-avatar"]}>
          <span>{getInitials()}</span>
        </div>
      );
    }

    return (
      <Avatar
        size={48}
        src={photoUrl}
        className={styles["user-avatar"]}
        onError={() => setImageError(true)}
      />
    );
  };

  return (
    <div
      className={styles["user-profile-container"]}
      onClick={onClick}
      role="button"
      aria-label="Open user profile"
    >
      {renderAvatar()}
      <Text weight="3">{firstName}</Text>
    </div>
  );
};
/* eslint-enable react/prop-types */
