import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig } from "eslint/config";
import jsxA11y from "eslint-plugin-jsx-a11y";
import unusedImports from "eslint-plugin-unused-imports";

export default defineConfig([
	{
		ignores: ["node_modules/", "dist/"],
	},
	js.configs.recommended,
	tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
	reactHooks.configs["recommended-latest"],
	//ШТУКА ДЛЯ SEO
	jsxA11y.flatConfigs.recommended,
	{
		files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
		languageOptions: { globals: { ...globals.browser, ...globals.node } },
		plugins: {
			react: pluginReact,
			"unused-imports": unusedImports,
		},
		settings: {
			react: {
				version: "detect",
			},
		},
		rules: {
			"react/react-in-jsx-scope": "off",

			// "no-unused-vars": "off",
			// "@typescript-eslint/no-unused-vars": "off",
			// "@typescript-eslint/no-unused-expressions": "off",
			// "@typescript-eslint/ban-ts-comment": "warn",

			//MUI ICONS
			"no-restricted-imports": [
				"error",
				{
					patterns: [{ regex: "^@mui/[^/]+$" }],
				},
			],

			// ПРАВИЛО НА any
			"@typescript-eslint/no-explicit-any": "off",

			// ПРАВИЛО НА REACT PROPS
			"react-hooks/exhaustive-deps": "error",
			"react/display-name": "off"

			//react-hooks
			// "react-hooks/rules-of-hooks": "error",
			// 'react-hooks/exhaustive-deps': 'error',

			//НАВРЕМЯ
			// "no-irregular-whitespace": "off",
			// "@typescript-eslint/ban-ts-comment": "off",
			// "react-hooks/exhaustive-deps": "off",
			// "jsx-a11y/media-has-caption": "off",

			// "jsx-a11y/media-has-caption": "off",
			// "jsx-a11y/no-static-element-interactions": "off",
			// "jsx-a11y/click-events-have-key-events": "off",

			//НЕ ИСПОЛЬЗУЕМЫЕ ИМПОРТЫ
			//   "unused-imports/no-unused-imports": "error",
			//     "unused-imports/no-unused-vars": [
			//         "warn",
			//         {
			//             "vars": "all",
			//             "varsIgnorePattern": "^_",
			//             "args": "after-used",
			//             "argsIgnorePattern": "^_",
			//         },
			//     ]
		},
	},
]);
