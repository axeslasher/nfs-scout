"use client";

import { useEffect, useState } from "react";
import {
	formatGameTime,
	getRelativeTime,
	isGameSoon,
} from "@/lib/time-utils";

interface GameTimeProps {
	startTimeUTC: string;
	showRelative?: boolean;
}

/**
 * Client component that displays game time in the user's local timezone
 * with optional relative time (e.g., "in 2 hours")
 *
 * This must be a client component because:
 * 1. Server components would render in the server's timezone
 * 2. Relative time needs to update periodically on the client
 */
export function GameTime({ startTimeUTC, showRelative = true }: GameTimeProps) {
	const [mounted, setMounted] = useState(false);
	const [relativeTime, setRelativeTime] = useState<string>("");

	// Avoid hydration mismatch by only rendering client-specific content after mount
	useEffect(() => {
		setMounted(true);
	}, []);

	// Update relative time every minute
	useEffect(() => {
		if (!showRelative || !mounted) return;

		const updateRelative = () => {
			setRelativeTime(getRelativeTime(startTimeUTC));
		};

		updateRelative();
		const interval = setInterval(updateRelative, 60000); // Update every minute

		return () => clearInterval(interval);
	}, [startTimeUTC, showRelative, mounted]);

	// Before hydration, show a placeholder to avoid mismatch
	if (!mounted) {
		return <span className="text-muted-foreground">Loading...</span>;
	}

	const absoluteTime = formatGameTime(startTimeUTC);
	const isSoon = isGameSoon(startTimeUTC);

	if (!showRelative) {
		return <span>{absoluteTime}</span>;
	}

	return (
		<span>
			{absoluteTime}
			{relativeTime && (
				<span className={isSoon ? "text-orange-500 font-medium" : "text-muted-foreground"}>
					{" "}
					({relativeTime})
				</span>
			)}
		</span>
	);
}
