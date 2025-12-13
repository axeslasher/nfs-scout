import type { Preview } from "@storybook/nextjs-vite";
import React from "react";
import "../src/app/globals.css";
import { ThemeProvider } from "../src/components/theme-provider";

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},

		a11y: {
			// 'todo' - show a11y violations in the test UI only
			// 'error' - fail CI on a11y violations
			// 'off' - skip a11y checks entirely
			test: "todo",
		},

		nextjs: {
			appDirectory: true,
		},

		backgrounds: {
			disable: true, // Disable default backgrounds since we're using next-themes
		},
	},

	globalTypes: {
		theme: {
			description: "Global theme for components",
			defaultValue: "light",
			toolbar: {
				title: "Theme",
				icon: "paintbrush",
				items: [
					{ value: "light", icon: "sun", title: "Light" },
					{ value: "dark", icon: "moon", title: "Dark" },
				],
				dynamicTitle: true,
			},
		},
	},

	decorators: [
		(Story, context) => {
			const theme = context.globals.theme || "light";

			return React.createElement(
				ThemeProvider,
				{
					attribute: "class",
					defaultTheme: theme,
					forcedTheme: theme,
					enableSystem: false,
				},
				React.createElement(
					"div",
					{
						className: theme,
						style: {
							minHeight: "30vh",
							padding: "2rem",
						},
					},
					React.createElement(Story)
				)
			);
		},
	],
};

export default preview;
