"use client";

import { useEffect, useState } from "react";
import { MatchupCard } from "@/components/matchup-card";
import { Card, CardContent } from "@/components/ui/card";

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

/**
 * Get today's date in the user's local timezone (YYYY-MM-DD format)
 */
function getLocalTodayDate(): string {
	const now = new Date();
	return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
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

export default function TodaySchedulePage() {
	const [data, setData] = useState<ScheduleData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [todayDate, setTodayDate] = useState<string>("");

	useEffect(() => {
		const localDate = getLocalTodayDate();
		setTodayDate(localDate);

		async function fetchSchedule() {
			try {
				const res = await fetch(`/api/schedule/${localDate}`);
				if (!res.ok) {
					throw new Error("Failed to fetch schedule");
				}
				const scheduleData = await res.json();
				setData(scheduleData);
			} catch (err) {
				setError(err instanceof Error ? err.message : "An error occurred");
			} finally {
				setLoading(false);
			}
		}

		fetchSchedule();
	}, []);

	const displayDate = todayDate
		? new Date(todayDate + "T00:00:00").toLocaleDateString("en-US", {
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric",
			})
		: "";

	if (loading) {
		return (
			<div className="container mx-auto py-8 px-4">
				<div className="mb-8">
					<h1 className="text-4xl font-bold mb-2">Today&apos;s Games</h1>
					<p className="text-muted-foreground">Loading...</p>
				</div>
				<Card>
					<CardContent className="py-12">
						<p className="text-center text-muted-foreground">
							Loading schedule...
						</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	if (error) {
		return (
			<div className="container mx-auto py-8 px-4">
				<div className="mb-8">
					<h1 className="text-4xl font-bold mb-2">Today&apos;s Games</h1>
					<p className="text-muted-foreground">{displayDate}</p>
				</div>
				<Card>
					<CardContent className="py-12">
						<p className="text-center text-muted-foreground">
							Error loading schedule: {error}
						</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="container mx-auto py-8 px-4">
			<div className="mb-8">
				<h1 className="text-4xl font-bold mb-2">Today&apos;s Games</h1>
				<p className="text-muted-foreground">{displayDate}</p>
			</div>

			{data?.games && data.games.length > 0 ? (
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{data.games.map((game) => {
						const gameStatus = getGameStateLabel(game.gameState);

						return (
							<MatchupCard
								key={game.id}
								awayTeam={game.awayTeam}
								homeTeam={game.homeTeam}
								venue={game.venue.default}
								startTimeUTC={game.startTimeUTC}
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
