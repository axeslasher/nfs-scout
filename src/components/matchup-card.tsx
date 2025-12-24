import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { barn } from "@lucide/lab";
import { Clock, Icon } from "lucide-react";
import Image from "next/image";

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
	gameTime: string;
	status: {
		label: string;
		variant: "default" | "secondary" | "destructive" | "outline";
	};
}

export function MatchupCard({
	awayTeam,
	homeTeam,
	venue,
	gameTime,
	status,
}: MatchupCardProps) {
	return (
		<Card className="w-full">
			<CardHeader>
				<div className="flex items-center justify-between">
					<Image
						src={awayTeam.logo}
						width={50}
						height={50}
						alt="{awayTeam.name.default} logo"
					/>
					<Image
						src={homeTeam.logo}
						width={50}
						height={50}
						alt="{homeTeam.name.default} logo"
					/>
					<Badge variant={status.variant}>{status.label}</Badge>
				</div>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{/* Away Team */}
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<Image
								src={awayTeam.logo}
								width={50}
								height={50}
								alt="{awayTeam.name.default} logo"
							/>
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
							<Image
								src={homeTeam.logo}
								width={50}
								height={50}
								alt="{homeTeam.name.default} logo"
							/>
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
			<CardFooter>
				<div className="flex items-center justify-between w-full">
					<CardTitle className="flex items-center text-xs gap-1">
						<Icon
							iconNode={barn}
							size={14}
							strokeWidth={2}
							className="text-muted-foreground"
						/>
						<p className="pt-0.5">{venue}</p>
					</CardTitle>
					<CardDescription className="flex items-center text-xs gap-1">
						<Clock
							size={14}
							strokeWidth={2}
							className="text-muted-foreground"
						/>
						<p>{gameTime}</p>
					</CardDescription>
				</div>
			</CardFooter>
		</Card>
	);
}
