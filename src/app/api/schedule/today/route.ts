import { NextResponse } from "next/server";
import { fetchTodaySchedule } from "@/lib/nhl-api";

export async function GET() {
	try {
		const data = await fetchTodaySchedule();
		return NextResponse.json(data);
	} catch (error) {
		console.error("Error fetching schedule:", error);
		return NextResponse.json(
			{ error: "Failed to fetch schedule" },
			{ status: 500 }
		);
	}
}
