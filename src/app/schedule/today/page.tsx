import { MatchupCard } from "@/components/matchup-card";
import { Card, CardContent } from "@/components/ui/card";
import { fetchTodaySchedule } from "@/lib/nhl-api";

interface Team {
	abbrev: string;
	name: {
		default: string;
	};
	score?: number;
	logo: string;
}

interface Game {
	id: number;
	season: number;
	gameType: number;
	gameDate: string;
	venue: {
		default: string;
	};
	startTimeUTC: string;
	easternUTCOffset: string;
	venueUTCOffset: string;
	gameState: string;
	gameScheduleState: string;
	awayTeam: Team;
	homeTeam: Team;
}

interface ScheduleData {
	games: Game[];
}

async function getSchedule(): Promise<ScheduleData> {
	return fetchTodaySchedule();
}

function formatGameTime(startTimeUTC: string): string {
	const date = new Date(startTimeUTC);
	return date.toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "2-digit",
		timeZoneName: "short",
	});
}

function getGameStateLabel(
	gameState: string
): {
	label: string;
	variant: "default" | "secondary" | "destructive" | "outline";
} {
	if (gameState === "LIVE") {
		return { label: "Live", variant: "destructive" };
	}
	if (gameState === "FINAL" || gameState === "OFF") {
		return { label: "Final", variant: "outline" };
	}
	if (gameState === "FUT") {
		return { label: "Scheduled", variant: "secondary" };
	}
	return { label: gameState, variant: "default" };
}

export default async function TodaySchedulePage() {
	const data = await getSchedule();
	const today = new Date().toLocaleDateString("en-US", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return (
		<div className="container mx-auto py-8 px-4">
			<div className="mb-8">
				<h1 className="text-4xl font-bold mb-2">Today&apos;s Games</h1>
				<p className="text-muted-foreground">{today}</p>
			</div>

			{data.games && data.games.length > 0 ? (
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{data.games.map((game) => {
						const gameStatus = getGameStateLabel(game.gameState);
						const gameTime = formatGameTime(game.startTimeUTC);

						return (
							<MatchupCard
								key={game.id}
								awayTeam={game.awayTeam}
								homeTeam={game.homeTeam}
								venue={game.venue.default}
								gameTime={gameTime}
								status={gameStatus}
							/>
						);
					})}
				</div>
			) : (
				<Card>
					<CardContent className="py-12">
						<p className="text-center text-muted-foreground">
							No games scheduled for today
						</p>
					</CardContent>
				</Card>
			)}
		</div>
	);
}
