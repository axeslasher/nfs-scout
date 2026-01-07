import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { GameTime } from "@/components/game-time";

interface Team {
	abbrev: string;
	name: {
		default: string;
	};
	score?: number;
	logo: string;
}

interface MatchupCardProps {
	awayTeam: Team;
	homeTeam: Team;
	venue: string;
	startTimeUTC: string;
	status: {
		label: string;
		variant: "default" | "secondary" | "destructive" | "outline";
	};
}

export function MatchupCard({
	awayTeam,
	homeTeam,
	venue,
	startTimeUTC,
	status,
}: MatchupCardProps) {
	// Only show relative time for scheduled games (not live or final)
	const showRelative = status.label === "Scheduled";

	return (
		<Card className="w-full">
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle className="text-lg">{venue}</CardTitle>
					<Badge variant={status.variant}>{status.label}</Badge>
				</div>
				<CardDescription>
					<GameTime startTimeUTC={startTimeUTC} showRelative={showRelative} />
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{/* Away Team */}
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="font-semibold">{awayTeam.abbrev}</div>
							<div className="text-sm text-muted-foreground">
								{awayTeam.name.default}
							</div>
						</div>
						{awayTeam.score !== undefined && (
							<div className="text-2xl font-bold">{awayTeam.score}</div>
						)}
					</div>

					{/* Home Team */}
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="font-semibold">{homeTeam.abbrev}</div>
							<div className="text-sm text-muted-foreground">
								{homeTeam.name.default}
							</div>
						</div>
						{homeTeam.score !== undefined && (
							<div className="text-2xl font-bold">{homeTeam.score}</div>
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
