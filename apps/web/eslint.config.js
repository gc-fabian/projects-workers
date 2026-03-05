import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import tseslint from "typescript-eslint";

export default [
  { ignores: ["dist/**"] },

  // ✅ Base JS
  js.configs.recommended,

  // ✅ TypeScript + TSX (incluye parser)
  ...tseslint.configs.recommended,

  // Código del browser (React/Vite)
  {
    files: ["src/**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser, // document, fetch, window, etc.
        ...globals.es2021
      }
    },
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      ...prettier.rules,
      "prettier/prettier": "error"
    }
  },

  // Archivos de config (Node)
  {
    files: ["*.{js,cjs,mjs}", "vite.config.*", "eslint.config.*"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.es2021
      }
    }
  }
];