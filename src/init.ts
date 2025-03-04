import {
  backButton,
  viewport,
  themeParams,
  miniApp,
  initData,
  $debug,
  init as initSDK,
} from "@telegram-apps/sdk-react";

/**
 * Ініціалізує додаток та налаштовує його залежності.
 */
export function init(debug: boolean): void {
  // Встановлюємо режим налагодження для @telegram-apps/sdk-react.
  $debug.set(debug);

  // Ініціалізуємо спеціальні обробники подій для Telegram Desktop, Android, iOS тощо.
  // Також налаштовуємо пакет.
  initSDK();

  // Додаємо Eruda, якщо потрібно.
  debug &&
    import("eruda").then((lib) => lib.default.init()).catch(console.error);

  // Перевіряємо, чи підтримуються всі необхідні компоненти.
  if (!backButton.isSupported() || !miniApp.isSupported()) {
    throw new Error("ERR_NOT_SUPPORTED");
  }

  // Монтуємо всі компоненти, що використовуються в проекті.
  backButton.mount();
  miniApp.mount();
  themeParams.mount();
  initData.restore();
  void viewport
    .mount()
    .catch((e) => {
      console.error("Something went wrong mounting the viewport", e);
    })
    .then(() => {
      viewport.bindCssVars();
    });

  // Визначаємо CSS-змінні, пов'язані з компонентами.
  miniApp.bindCssVars();
  themeParams.bindCssVars();
}
