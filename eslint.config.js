// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import tanstackPlugin from "@tanstack/eslint-plugin-query";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactEslintPlugin from "eslint-plugin-react";
import globals from "globals";

export default tseslint.config(
  {
    ignores: [
      "eslint.config.js",
      "**/dist/**",
      "**/build/**",
      "**/playwright-report/**",
      "apps/web/postcss.config.cjs",
      "apps/web/src/components/ui",
      "apps/web/**/*.js",
      "apps/backend/**/*.js",
      "apps/backend/tsoa/routes.ts",
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  {
    name: "main",
    rules: {
      "no-console": "error",
      "max-classes-per-file": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off", // TODO: Use "@ts-expect-error"
      "@typescript-eslint/consistent-type-definitions": ["off"],
      "@typescript-eslint/prefer-for-of": "off", // For-of is more readable but slower
      "@typescript-eslint/no-empty-function": "off",
      "consistent-return": "off", // Reason: we have TS's noImplicitReturns already
      "@typescript-eslint/switch-exhaustiveness-check": "error",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "variable",
          format: ["camelCase", "PascalCase", "UPPER_CASE", "snake_case"],
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
    languageOptions: {
      parser: tseslint.parser,
    },
  },
  {
    name: "Frontend Web",
    files: ["apps/web/**/*.[jt]s?(x)"],
    plugins: {
      "@tanstack/query": tanstackPlugin,
      "react-hooks": reactHooksPlugin,
      react: reactEslintPlugin,
    },
    languageOptions: {
      parserOptions: {
        project: true,
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      ...tanstackPlugin.configs.recommended.rules, // TS complaining here, but rules obj. does exist, go to definition of tanstackPlugin.configs
      ...reactEslintPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off", // FIXME: should be resolved by TS conversion
      "react-hooks/exhaustive-deps": "error",
      "no-param-reassign": ["error", { props: false }],

      // Reason: In simple cases, bloats up a function that could be written in a single line
      "react/destructuring-assignment": "off",
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "const", next: "return" },
      ],
      "prefer-destructuring": [
        "error",
        {
          array: false,
          object: true,
        },
        {
          enforceForRenamedProperties: false,
        },
      ],
    },
  },
  {
    name: "Config files",
    files: [
      "apps/web/prettier.config.js",
      "apps/web/tailwind.config.ts",
      "apps/web/postcss.config.js",
    ],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    name: "Backend",
    files: ["apps/backend/**/*.[jt]s"],
    languageOptions: {
      parserOptions: {
        project: true,
      },
    },
    rules: {
      "no-console": "off",
      "no-param-reassign": ["error", { props: false }],
      "no-restricted-exports": [
        "error",
        { restrictDefaultExports: { direct: true } },
      ],
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "const", next: "return" },
      ],
      "prefer-destructuring": [
        "error",
        {
          array: false,
          object: true,
        },
        {
          enforceForRenamedProperties: false,
        },
      ],
    },
  },
  {
    name: "Types",
    files: ["apps/types/**/*.[jt]s"],
    languageOptions: {
      parserOptions: {
        project: true,
      },
    },
    rules: {
      "no-param-reassign": ["error", { props: false }],
      "no-restricted-exports": [
        "error",
        { restrictDefaultExports: { direct: true } },
      ],
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "const", next: "return" },
      ],
      "prefer-destructuring": [
        "error",
        {
          array: false,
          object: true,
        },
        {
          enforceForRenamedProperties: false,
        },
      ],
    },
  },
  {
    name: "Config files",
    files: [
      "apps/web/prettier.config.js",
      "apps/web/tailwind.config.ts",
      "apps/web/postcss.config.js",
    ],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
);
