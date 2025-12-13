import { MatchupCard } from "@/components/matchup-card";
import { Card, CardContent } from "@/components/ui/card";
import { fetchScheduleByDate } from "@/lib/nhl-api";
import { notFound } from "next/navigation";

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

interface PageProps {
	params: Promise<{
		date: string;
	}>;
}

function isValidDate(dateString: string): boolean {
	// Validate YYYY-MM-DD format
	const regex = /^\d{4}-\d{2}-\d{2}$/;
	if (!regex.test(dateString)) {
		return false;
	}

	const date = new Date(dateString);
	return date instanceof Date && !isNaN(date.getTime());
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

function formatDisplayDate(dateString: string): string {
	const date = new Date(dateString + "T00:00:00");
	return date.toLocaleDateString("en-US", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

export default async function ScheduleDatePage({ params }: PageProps) {
	const { date } = await params;

	// Validate date format
	if (!isValidDate(date)) {
		notFound();
	}

	let data: ScheduleData;
	try {
		data = await fetchScheduleByDate(date);
	} catch (error) {
		console.error("Error fetching schedule:", error);
		notFound();
	}

	const displayDate = formatDisplayDate(date);

	return (
		<div className="container mx-auto py-8 px-4">
			<div className="mb-8">
				<h1 className="text-4xl font-bold mb-2">Games for {displayDate}</h1>
				<p className="text-muted-foreground">{date}</p>
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
							No games scheduled for this date
						</p>
					</CardContent>
				</Card>
			)}
		</div>
	);
}
