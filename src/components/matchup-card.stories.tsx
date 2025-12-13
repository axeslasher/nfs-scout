import type { Meta, StoryObj } from "@storybook/react";
import { MatchupCard } from "./matchup-card";

const meta = {
	title: "Components/MatchupCard",
	component: MatchupCard,
	decorators: [
		(Story) => (
			<div
				style={{
					width: "600px",
					maxWidth: "100%",
					margin: "0 auto",
				}}
			>
				<Story />
			</div>
		),
	],
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
	argTypes: {
		awayTeam: {
			description:
				"Away team information including abbreviation, name, score, and logo",
		},
		homeTeam: {
			description:
				"Home team information including abbreviation, name, score, and logo",
		},
		venue: {
			control: "text",
			description: "Venue name where the game is played",
		},
		gameTime: {
			control: "text",
			description: "Formatted game start time",
		},
		status: {
			control: "object",
			description:
				"Game status with label and variant (Scheduled, Live, Final)",
		},
	},
} satisfies Meta<typeof MatchupCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Scheduled game
export const Scheduled: Story = {
	args: {
		awayTeam: {
			abbrev: "CHI",
			name: {
				default: "Blackhawks",
			},
			logo: "https://assets.nhle.com/logos/nhl/svg/CHI_light.svg",
		},
		homeTeam: {
			abbrev: "STL",
			name: {
				default: "Blues",
			},
			logo: "https://assets.nhle.com/logos/nhl/svg/STL_light.svg",
		},
		venue: "Enterprise Center",
		gameTime: "7:00 PM CST",
		status: {
			label: "Scheduled",
			variant: "secondary",
		},
	},
};

// Live game
export const Live: Story = {
	args: {
		awayTeam: {
			abbrev: "SEA",
			name: {
				default: "Kraken",
			},
			score: 2,
			logo: "https://assets.nhle.com/logos/nhl/svg/SEA_light.svg",
		},
		homeTeam: {
			abbrev: "UTA",
			name: {
				default: "Hockey Club",
			},
			score: 3,
			logo: "https://assets.nhle.com/logos/nhl/svg/UTA_light.svg",
		},
		venue: "Delta Center",
		gameTime: "8:30 PM MST",
		status: {
			label: "Live",
			variant: "destructive",
		},
	},
};

// Final game
export const Final: Story = {
	args: {
		awayTeam: {
			abbrev: "ANA",
			name: {
				default: "Ducks",
			},
			score: 2,
			logo: "https://assets.nhle.com/logos/nhl/svg/ANA_light.svg",
		},
		homeTeam: {
			abbrev: "TOR",
			name: {
				default: "Maple Leafs",
			},
			score: 3,
			logo: "https://assets.nhle.com/logos/nhl/svg/TOR_light.svg",
		},
		venue: "Scotiabank Arena",
		gameTime: "7:00 PM EST",
		status: {
			label: "Final",
			variant: "outline",
		},
	},
};

// Blowout game
export const Blowout: Story = {
	args: {
		awayTeam: {
			abbrev: "BOS",
			name: {
				default: "Bruins",
			},
			score: 7,
			logo: "https://assets.nhle.com/logos/nhl/svg/BOS_light.svg",
		},
		homeTeam: {
			abbrev: "CBJ",
			name: {
				default: "Blue Jackets",
			},
			score: 1,
			logo: "https://assets.nhle.com/logos/nhl/svg/CBJ_light.svg",
		},
		venue: "Nationwide Arena",
		gameTime: "7:00 PM EST",
		status: {
			label: "Final",
			variant: "outline",
		},
	},
};

// Tie game (live)
export const TieGame: Story = {
	args: {
		awayTeam: {
			abbrev: "EDM",
			name: {
				default: "Oilers",
			},
			score: 2,
			logo: "https://assets.nhle.com/logos/nhl/svg/EDM_light.svg",
		},
		homeTeam: {
			abbrev: "CGY",
			name: {
				default: "Flames",
			},
			score: 2,
			logo: "https://assets.nhle.com/logos/nhl/svg/CGY_light.svg",
		},
		venue: "Scotiabank Saddledome",
		gameTime: "9:00 PM MST",
		status: {
			label: "Live",
			variant: "destructive",
		},
	},
};
