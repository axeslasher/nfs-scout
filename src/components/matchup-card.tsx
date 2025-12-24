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
		<Card className="w-full relative pt-0 pb-4">
			<CardHeader className="p-0">
				<div className="flex items-center justify-between w-full h-16 bg-accent overflow-hidden">
					{/*<div className="w-full items-center">
						<Image
							src={awayTeam.logo}
							width={150}
							height={50}
							alt="{awayTeam.name.default} logo"
							className="object-fill"
						/>
					</div>
					<div className="w-full">
						<Image
							src={homeTeam.logo}
							width={150}
							height={50}
							alt="{homeTeam.name.default} logo"
							className="object-cover"
						/>
					</div>*/}
					<Badge className="absolute right-4 top-4" variant={status.variant}>
						{status.label}
					</Badge>
				</div>
			</CardHeader>
			<CardContent className="pl-2 ">
				<div className="space-y-3">
					{/* Away Team */}
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Image
								src={awayTeam.logo}
								width={60}
								height={60}
								alt="{awayTeam.name.default} logo"
								className="object-none"
							/>

							<div className="font-semibold text-lg -ml-2">
								{awayTeam.name.default}
							</div>
							<div className="text-sm text-muted-foreground">
								{awayTeam.abbrev}
							</div>
						</div>
						{awayTeam.score !== undefined && (
							<div className="text-2xl font-bold">{awayTeam.score}</div>
						)}
					</div>

					{/* Home Team */}
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Image
								src={homeTeam.logo}
								width={60}
								height={60}
								alt="{homeTeam.name.default} logo"
							/>
							<div className="font-semibold text-lg -ml-2">
								{homeTeam.name.default}
							</div>
							<div className="text-sm text-muted-foreground">
								{homeTeam.abbrev}
							</div>
						</div>
						{homeTeam.score !== undefined && (
							<div className="text-2xl font-bold">{homeTeam.score}</div>
						)}
					</div>
				</div>
			</CardContent>
			<CardFooter className="border-t-2 border-muted pt-3">
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
