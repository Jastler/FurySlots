import { Text } from "@telegram-apps/telegram-ui";
import styles from "./ResultCard.module.scss";
import classNames from "classnames";

interface ResultCardProps {
  result: string | null;
  resultType: "win" | "loss" | "error" | null;
}

export const ResultCard = ({ result, resultType }: ResultCardProps) => {
  if (!result) return null;

  return (
    <div
      className={classNames(
        styles.resultCard,
        resultType === "win" && styles.win,
        resultType === "loss" && styles.loss,
        resultType === "error" && styles.error
      )}
    >
      <div>
        <Text
          className={classNames(
            styles.resultText,
            resultType === "win" ? styles.winText : styles.standardText
          )}
        >
          {result}
        </Text>

        {resultType === "win" && (
          <div className={styles.congratulations}>
            Congratulations on your win! 🎊
          </div>
        )}
      </div>
    </div>
  );
};
