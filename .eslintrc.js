export default {
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:tailwindcss/recommended",
  ],
  plugins: ["react", "@typescript-eslint", 'prettier'],
  settings: {
    react: { version: "detect" },
  },
  rules: {
    "react/react-in-jsx-scope": "off", // Not needed with React 17+
    "react-refresh/only-export-components": "warn", // for Vite + React Refresh
    "prettier/prettier": "error",
    "no-unused-vars": "off",
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "@typescript-eslint/no-unused-vars": "error",
    "tailwindcss/classnames-order": "off",
    "tailwindcss/enforces-shorthand": "error",
    "tailwindcss/no-unnecessary-arbitrary-value": "error",
  },
};
