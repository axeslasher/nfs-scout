/**
 * Time utilities for formatting game times relative to the user's timezone
 */

/**
 * Formats a UTC timestamp to a localized time string
 */
export function formatGameTime(startTimeUTC: string): string {
	const date = new Date(startTimeUTC);
	return date.toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "2-digit",
		timeZoneName: "short",
	});
}

/**
 * Calculates the relative time until a game starts
 * Returns a human-readable string like "in 2 hours" or "starting soon"
 */
export function getRelativeTime(startTimeUTC: string): string {
	const now = new Date();
	const gameTime = new Date(startTimeUTC);
	const diffMs = gameTime.getTime() - now.getTime();

	// Game is in the past
	if (diffMs < 0) {
		const absDiffMs = Math.abs(diffMs);
		const minutes = Math.floor(absDiffMs / (1000 * 60));
		const hours = Math.floor(absDiffMs / (1000 * 60 * 60));

		if (minutes < 60) {
			return `${minutes}m ago`;
		}
		if (hours < 24) {
			return `${hours}h ago`;
		}
		return "past";
	}

	const minutes = Math.floor(diffMs / (1000 * 60));
	const hours = Math.floor(diffMs / (1000 * 60 * 60));

	if (minutes < 5) {
		return "starting soon";
	}
	if (minutes < 60) {
		return `in ${minutes}m`;
	}
	if (hours < 24) {
		const remainingMinutes = minutes % 60;
		if (remainingMinutes === 0) {
			return `in ${hours}h`;
		}
		return `in ${hours}h ${remainingMinutes}m`;
	}

	const days = Math.floor(hours / 24);
	return `in ${days}d`;
}

/**
 * Formats a game time with both absolute time and relative time
 * Example: "7:00 PM EST (in 2 hours)"
 */
export function formatGameTimeWithRelative(startTimeUTC: string): {
	absolute: string;
	relative: string;
} {
	return {
		absolute: formatGameTime(startTimeUTC),
		relative: getRelativeTime(startTimeUTC),
	};
}

/**
 * Checks if a game is happening soon (within the threshold)
 * @param startTimeUTC - The game start time in UTC
 * @param thresholdMinutes - Minutes threshold (default 30)
 */
export function isGameSoon(
	startTimeUTC: string,
	thresholdMinutes: number = 30
): boolean {
	const now = new Date();
	const gameTime = new Date(startTimeUTC);
	const diffMs = gameTime.getTime() - now.getTime();
	const diffMinutes = diffMs / (1000 * 60);

	return diffMinutes > 0 && diffMinutes <= thresholdMinutes;
}

/**
 * Checks if a game has already started
 */
export function hasGameStarted(startTimeUTC: string): boolean {
	const now = new Date();
	const gameTime = new Date(startTimeUTC);
	return now >= gameTime;
}

/**
 * Formats a date string for display (e.g., "Monday, January 6, 2025")
 */
export function formatDisplayDate(dateString: string): string {
	const date = new Date(dateString + "T00:00:00");
	return date.toLocaleDateString("en-US", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}
