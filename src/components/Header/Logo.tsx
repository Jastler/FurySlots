import { Text } from "@telegram-apps/telegram-ui";
import "./Logo.css";

export default function Logo() {
  return (
    <div className="logo-container">
      <div className="logo-icon">🔥</div>
      <Text className="logo-text" weight="3">
        FurySlots
      </Text>
    </div>
  );
}
