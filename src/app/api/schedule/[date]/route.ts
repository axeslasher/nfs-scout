import { NextResponse } from "next/server";
import { fetchScheduleByDate } from "@/lib/nhl-api";

interface RouteParams {
	params: Promise<{
		date: string;
	}>;
}

function isValidDate(dateString: string): boolean {
	const regex = /^\d{4}-\d{2}-\d{2}$/;
	if (!regex.test(dateString)) {
		return false;
	}
	const date = new Date(dateString);
	return date instanceof Date && !isNaN(date.getTime());
}

export async function GET(_request: Request, { params }: RouteParams) {
	const { date } = await params;

	if (!isValidDate(date)) {
		return NextResponse.json(
			{ error: "Invalid date format. Use YYYY-MM-DD" },
			{ status: 400 }
		);
	}

	try {
		const data = await fetchScheduleByDate(date);
		return NextResponse.json(data);
	} catch (error) {
		console.error("Error fetching schedule:", error);
		return NextResponse.json(
			{ error: "Failed to fetch schedule" },
			{ status: 500 }
		);
	}
}
