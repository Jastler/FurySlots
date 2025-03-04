import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react-swc";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/FurySlots",
  plugins: [
    // Дозволяє використовувати React dev server разом із збіркою React додатку за допомогою Vite.
    // https://npmjs.com/package/@vitejs/plugin-react-swc
    react(),
    // Дозволяє використовувати властивість compilerOptions.paths у tsconfig.json.
    // https://www.npmjs.com/package/vite-tsconfig-paths
    tsconfigPaths(),
    // Створює власний SSL-сертифікат, дійсний для локальної машини.
    // Використання цього плагіна вимагає прав адміністратора при першому запуску в режимі розробки.
    // https://www.npmjs.com/package/vite-plugin-mkcert
    process.env.HTTPS && mkcert(),
  ],
  publicDir: "./public",
  server: {
    // Відкриває ваш dev server і робить його доступним для пристроїв у тій самій мережі.
    host: true,
  },
});
