const NHL_API_BASE = process.env.NHL_API_BASE_URL || "https://api-web.nhle.com";

/**
 * Get today's date in YYYY-MM-DD format (local timezone)
 */
export function getTodayDate(): string {
	const now = new Date();
	return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

/**
 * Fetch today's NHL schedule
 */
export async function fetchTodaySchedule() {
	const today = getTodayDate();
	const res = await fetch(`${NHL_API_BASE}/v1/score/${today}`, {
		next: { revalidate: 3600 }, // Cache for 1 hour
	});

	if (!res.ok) {
		throw new Error(`NHL API responded with status: ${res.status}`);
	}

	return res.json();
}

/**
 * Fetch NHL schedule for a specific date
 */
export async function fetchScheduleByDate(date: string) {
	const res = await fetch(`${NHL_API_BASE}/v1/score/${date}`, {
		next: { revalidate: 3600 },
	});

	if (!res.ok) {
		throw new Error(`NHL API responded with status: ${res.status}`);
	}

	return res.json();
}
