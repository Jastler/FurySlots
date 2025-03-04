import { useState } from "react";
import { Button, Card, Cell, Section, Text } from "@telegram-apps/telegram-ui";
import { Page } from "@/components/Page.tsx";
import { useStars } from "@/services/StarsContext";
import { ResultCard, WinningChances, BetButton } from "./components";
import styles from "./CasinoPage.module.scss";

export const CasinoPage = () => {
  const { balance, spendFromBalance, addToBalance } = useStars();
  const [bet, setBet] = useState(10);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [winAmount, setWinAmount] = useState(0);
  const [resultType, setResultType] = useState<"win" | "loss" | "error" | null>(
    null
  );

  // Bet options
  const betOptions = [10, 20, 50, 100];

  // Spin the wheel with different win possibilities
  const spinWheel = async () => {
    if (balance < bet) {
      setResult("Not enough stars! Please top up your balance.");
      setResultType("error");
      return;
    }

    try {
      // Start spinning
      setSpinning(true);
      setResult("Spinning...");
      setResultType(null);

      // Spend stars on the bet
      await spendFromBalance(bet);

      // Simulate wheel spinning (2 seconds)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate random result
      const random = Math.random() * 100;
      let winMultiplier = 0;
      let resultText = "";

      if (random < 50) {
        // 50% chance of loss
        resultText = "Sorry, you lost 😢";
        setResultType("loss");
      } else if (random < 75) {
        // 25% chance of win x1.5
        winMultiplier = 1.5;
        resultText = `Win! x1.5 (+${Math.floor(bet * 1.5)} stars) 🎉`;
        setResultType("win");
      } else if (random < 90) {
        // 15% chance of win x2
        winMultiplier = 2;
        resultText = `Win! x2 (+${bet * 2} stars) 🎉🎉`;
        setResultType("win");
      } else if (random < 98) {
        // 8% chance of win x3
        winMultiplier = 3;
        resultText = `Big Win! x3 (+${bet * 3} stars) 🎉🎉🎉`;
        setResultType("win");
      } else {
        // 2% chance of jackpot x10
        winMultiplier = 10;
        resultText = `JACKPOT! x10 (+${bet * 10} stars) 🎊🎊🎊🎊`;
        setResultType("win");
      }

      setResult(resultText);

      // Process winnings if any
      if (winMultiplier > 0) {
        const winnings = Math.floor(bet * winMultiplier);
        setWinAmount(winnings);
        await addToBalance(winnings);
      } else {
        setWinAmount(0);
      }
    } catch (error) {
      setResult(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
      setResultType("error");
    } finally {
      setSpinning(false);
    }
  };

  return (
    <Page back>
      <div className={styles.casinoPage}>
        <Card>
          <div className={styles.card}>
            <Text className={styles.title}>🎰 Lucky Roulette 🎰</Text>
            <Text className={styles.description}>
              Place your bet and try your luck on our roulette!
            </Text>

            <Section>
              <Cell before="⭐" after={`${balance} stars`}>
                Your Balance
              </Cell>
            </Section>

            <Text weight="2">Choose your bet amount:</Text>
            <div className={styles.betSelector}>
              {betOptions.map((option) => (
                <BetButton
                  key={option}
                  amount={option}
                  selected={bet === option}
                  disabled={spinning}
                  onClick={() => setBet(option)}
                />
              ))}
            </div>

            <Button
              size="l"
              color="primary"
              onClick={spinWheel}
              disabled={spinning || balance < bet}
              loading={spinning}
              className={styles.spinButton}
              data-loading={spinning}
            >
              {spinning ? "Spinning... 🎡" : "Spin the Roulette! 🎲"}
            </Button>

            <ResultCard result={result} resultType={resultType} />
          </div>
        </Card>

        <Card>
          <WinningChances />
        </Card>
      </div>
    </Page>
  );
};

export default CasinoPage;
