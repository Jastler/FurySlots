import React from "react";
import styles from "./BetButton.module.scss";
import classNames from "classnames";

interface BetButtonProps {
  amount: number;
  selected: boolean;
  disabled: boolean;
  onClick: () => void;
}

export const BetButton: React.FC<BetButtonProps> = ({
  amount,
  selected,
  disabled,
  onClick,
}) => {
  return (
    <button
      className={classNames(
        styles.betButton,
        styles[`bet${amount}`],
        selected && styles.selected,
        disabled && styles.disabled
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <span className={styles.betAmount}>
        {amount} <span className={styles.starIcon}>⭐</span>
      </span>
    </button>
  );
};
