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

  // Встановлюємо CSS змінні для RGB кольорів на основі themeParams
  setupRgbColorVariables();
}

/**
 * Конвертує RGB колір у масив чисел
 */
function toRgbArray(rgb: string): number[] {
  const rgbMatch = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (rgbMatch) {
    return [
      parseInt(rgbMatch[1], 10),
      parseInt(rgbMatch[2], 10),
      parseInt(rgbMatch[3], 10),
    ];
  }
  return [255, 255, 255]; // Білий колір за замовчуванням
}

/**
 * Встановлює CSS змінні для RGB кольорів на основі themeParams
 */
function setupRgbColorVariables() {
  const root = document.documentElement;
  const params = themeParams.state;

  // Встановлюємо стандартні RGB значення (для випадку, якщо параметри теми не доступні)
  root.style.setProperty("--tg-theme-bg-color-rgb", "255, 255, 255");
  root.style.setProperty("--tg-theme-text-color-rgb", "0, 0, 0");
  root.style.setProperty("--tg-theme-hint-color-rgb", "153, 153, 153");
  root.style.setProperty("--tg-theme-link-color-rgb", "0, 119, 255");
  root.style.setProperty("--tg-theme-button-color-rgb", "36, 129, 204");
  root.style.setProperty("--tg-theme-button-text-color-rgb", "255, 255, 255");
  root.style.setProperty("--tg-theme-secondary-bg-color-rgb", "245, 245, 245");
}
