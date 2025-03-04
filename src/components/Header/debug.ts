/**
 * Цей файл містить функції для перевірки доступності Telegram WebApp API
 */

/**
 * Перевіряє наявність Telegram WebApp API та його методів
 */
export function checkTelegramWebApp() {
  const tg = window.Telegram?.WebApp;

  console.group("Telegram WebApp API Доступність");
  console.log("window.Telegram існує:", !!window.Telegram);
  console.log("window.Telegram.WebApp існує:", !!tg);

  if (tg) {
    console.log("showPopup метод існує:", typeof tg.showPopup === "function");
    console.log("showAlert метод існує:", typeof tg.showAlert === "function");
    console.log("close метод існує:", typeof tg.close === "function");

    if (typeof tg.version === "string") {
      console.log("WebApp версія:", tg.version);
    }

    if (typeof tg.platform === "string") {
      console.log("WebApp платформа:", tg.platform);
    }
  }

  console.groupEnd();

  return tg;
}

/**
 * Типи для Telegram WebApp API
 */
declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        showPopup(
          params: {
            title?: string;
            message: string;
            buttons?: Array<{
              type?: string;
              text?: string;
              id?: string;
            }>;
          },
          callback?: (buttonId: string) => void
        ): void;
        showAlert(message: string, callback?: () => void): void;
        close(): void;
        version: string;
        platform: string;
      };
    };
  }
}
