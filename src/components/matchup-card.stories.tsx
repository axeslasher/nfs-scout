import type { Meta, StoryObj } from "@storybook/react";
import { MatchupCard } from "./matchup-card";

// Helper to create a UTC time string for a given hour offset from now
function getTimeUTC(hoursFromNow: number): string {
	const date = new Date();
	date.setHours(date.getHours() + hoursFromNow);
	return date.toISOString();
}

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
		startTimeUTC: {
			control: "text",
			description: "Game start time in UTC ISO format",
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

// Scheduled game (in 2 hours)
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
		startTimeUTC: getTimeUTC(2),
		status: {
			label: "Scheduled",
			variant: "secondary",
		},
	},
};

// Scheduled game starting soon (in 15 minutes)
export const StartingSoon: Story = {
	args: {
		awayTeam: {
			abbrev: "NYR",
			name: {
				default: "Rangers",
			},
			logo: "https://assets.nhle.com/logos/nhl/svg/NYR_light.svg",
		},
		homeTeam: {
			abbrev: "NJD",
			name: {
				default: "Devils",
			},
			logo: "https://assets.nhle.com/logos/nhl/svg/NJD_light.svg",
		},
		venue: "Prudential Center",
		startTimeUTC: getTimeUTC(0.25),
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
		startTimeUTC: getTimeUTC(-1),
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
		startTimeUTC: getTimeUTC(-3),
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
		startTimeUTC: getTimeUTC(-3),
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
		startTimeUTC: getTimeUTC(-1),
		status: {
			label: "Live",
			variant: "destructive",
		},
	},
};
