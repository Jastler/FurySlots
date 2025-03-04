import { Text } from "@telegram-apps/telegram-ui";
import styles from "./Logo.module.scss";

/**
 * Application logo component
 */
export const Logo: React.FC = () => {
  return (
    <div className={styles.logoContainer}>
      <div className={styles.logoIcon}>🔥</div>
      <Text className={styles.logoText} weight="3">
        FurySlots
      </Text>
    </div>
  );
};
