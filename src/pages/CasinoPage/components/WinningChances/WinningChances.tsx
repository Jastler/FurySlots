import { Text } from "@telegram-apps/telegram-ui";
import styles from "./WinningChances.module.scss";
import classNames from "classnames";

export const WinningChances = () => {
  return (
    <div className={styles.container}>
      <Text className={styles.title}>📊 Winning Chances 📊</Text>
      <div className={styles.divider} />

      <div className={styles.chancesList}>
        <div className={classNames(styles.chanceItem, styles.noWin)}>
          <Text className={styles.percentage}>50%</Text>
          <Text className={styles.description}>No win</Text>
          <Text className={styles.multiplier}>x0</Text>
        </div>

        <div className={classNames(styles.chanceItem, styles.smallWin)}>
          <Text className={styles.percentage}>25%</Text>
          <Text className={styles.description}>Small win</Text>
          <Text className={styles.multiplier}>x1.5</Text>
        </div>

        <div className={classNames(styles.chanceItem, styles.mediumWin)}>
          <Text className={styles.percentage}>15%</Text>
          <Text className={styles.description}>Medium win</Text>
          <Text className={styles.multiplier}>x2</Text>
        </div>

        <div className={classNames(styles.chanceItem, styles.bigWin)}>
          <Text className={styles.percentage}>8%</Text>
          <Text className={styles.description}>Big win</Text>
          <Text className={styles.multiplier}>x3</Text>
        </div>

        <div className={classNames(styles.chanceItem, styles.jackpot)}>
          <Text className={styles.percentage}>2%</Text>
          <Text className={classNames(styles.description, styles.jackpotText)}>
            JACKPOT
          </Text>
          <Text className={styles.multiplier}>x10</Text>
        </div>
      </div>

      <div className={styles.tip}>
        <Text className={styles.tipText}>
          💡 The higher your bet, the higher your potential win!
        </Text>
      </div>
    </div>
  );
};
