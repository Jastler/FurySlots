/**
 * @returns Повний публічний URL з префіксом базового шляху до статичних ресурсів.
 * @param path - шлях, до якого потрібно додати префікс
 */
export function publicUrl(path: string): string {
  // Базовий URL повинен закінчуватися слешем. Причина в тому, що якщо baseUrl буде
  // дорівнювати "/my-base", то передача шляху "tonconnect-manifest.json" не
  // дасть нам очікуваного результату, фактично буде "/tonconnect-manifest.json", а очікуваний
  // результат - "/my-base/tonconnect-manifest.json". Це пов'язано з конструктором URL.
  let baseUrl = import.meta.env.BASE_URL;
  if (!baseUrl.endsWith("/")) {
    baseUrl += "/";
  }

  let isBaseAbsolute = false;
  try {
    new URL(baseUrl);
    isBaseAbsolute = true;
  } catch {
    /* порожньо */
  }

  return new URL(
    // Шлях не повинен починатися зі слеша, оскільки це порушить
    // базовий URL. Наприклад, маючи базовий URL "/my-base/" і шлях
    // "/tonconnect-manifest.json", ми не отримаємо очікуваний результат
    // "/my-base/tonconnect-manifest.json", а отримаємо "/tonconnect-manifest.json".
    path.replace(/^\/+/, ""),
    isBaseAbsolute ? baseUrl : window.location.origin + baseUrl
  ).toString();
}
