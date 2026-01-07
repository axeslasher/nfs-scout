/**
 * FPoints calculation utilities for NHL Fantasy Stars
 *
 * Based on NFS scoring rules:
 * - Player cards: Goal (+7), Assist (+4), Hit (+1), Blocked Shot (+1)
 * - Team cards: Win (+3), PPG (+1), SHG (+1), GA (-3), Shutout (+5), Save (+1)
 */

// Scoring constants
export const PLAYER_SCORING = {
	GOAL: 7,
	ASSIST: 4,
	HIT: 1,
	BLOCKED_SHOT: 1,
} as const;

export const TEAM_SCORING = {
	WIN: 3,
	POWERPLAY_GOAL: 1,
	SHORTHANDED_GOAL: 1,
	GOAL_AGAINST: -3,
	SHUTOUT: 5,
	SAVE: 1,
} as const;

/**
 * Player stats input for FPoints calculation
 */
export interface PlayerStats {
	goals: number;
	assists: number;
	hits: number;
	blockedShots: number;
}

/**
 * Team stats input for FPoints calculation
 */
export interface TeamStats {
	wins: number;
	powerplayGoals: number;
	shorthandedGoals: number;
	goalsAgainst: number;
	shutouts: number;
	saves: number;
}

/**
 * Detailed breakdown of FPoints by category
 */
export interface PlayerFPointsBreakdown {
	goals: number;
	assists: number;
	hits: number;
	blockedShots: number;
	total: number;
}

export interface TeamFPointsBreakdown {
	wins: number;
	powerplayGoals: number;
	shorthandedGoals: number;
	goalsAgainst: number;
	shutouts: number;
	saves: number;
	total: number;
}

/**
 * Calculate FPoints for a player based on their stats
 */
export function calculatePlayerFPoints(stats: PlayerStats): number {
	return (
		stats.goals * PLAYER_SCORING.GOAL +
		stats.assists * PLAYER_SCORING.ASSIST +
		stats.hits * PLAYER_SCORING.HIT +
		stats.blockedShots * PLAYER_SCORING.BLOCKED_SHOT
	);
}

/**
 * Calculate FPoints for a player with detailed breakdown
 */
export function calculatePlayerFPointsWithBreakdown(
	stats: PlayerStats
): PlayerFPointsBreakdown {
	const goals = stats.goals * PLAYER_SCORING.GOAL;
	const assists = stats.assists * PLAYER_SCORING.ASSIST;
	const hits = stats.hits * PLAYER_SCORING.HIT;
	const blockedShots = stats.blockedShots * PLAYER_SCORING.BLOCKED_SHOT;

	return {
		goals,
		assists,
		hits,
		blockedShots,
		total: goals + assists + hits + blockedShots,
	};
}

/**
 * Calculate FPoints for a team based on their stats
 */
export function calculateTeamFPoints(stats: TeamStats): number {
	return (
		stats.wins * TEAM_SCORING.WIN +
		stats.powerplayGoals * TEAM_SCORING.POWERPLAY_GOAL +
		stats.shorthandedGoals * TEAM_SCORING.SHORTHANDED_GOAL +
		stats.goalsAgainst * TEAM_SCORING.GOAL_AGAINST +
		stats.shutouts * TEAM_SCORING.SHUTOUT +
		stats.saves * TEAM_SCORING.SAVE
	);
}

/**
 * Calculate FPoints for a team with detailed breakdown
 */
export function calculateTeamFPointsWithBreakdown(
	stats: TeamStats
): TeamFPointsBreakdown {
	const wins = stats.wins * TEAM_SCORING.WIN;
	const powerplayGoals = stats.powerplayGoals * TEAM_SCORING.POWERPLAY_GOAL;
	const shorthandedGoals =
		stats.shorthandedGoals * TEAM_SCORING.SHORTHANDED_GOAL;
	const goalsAgainst = stats.goalsAgainst * TEAM_SCORING.GOAL_AGAINST;
	const shutouts = stats.shutouts * TEAM_SCORING.SHUTOUT;
	const saves = stats.saves * TEAM_SCORING.SAVE;

	return {
		wins,
		powerplayGoals,
		shorthandedGoals,
		goalsAgainst,
		shutouts,
		saves,
		total:
			wins +
			powerplayGoals +
			shorthandedGoals +
			goalsAgainst +
			shutouts +
			saves,
	};
}

/**
 * Calculate total FPoints for a lineup (combines player and team points)
 */
export function calculateLineupFPoints(
	playerStats: PlayerStats[],
	teamStats: TeamStats
): number {
	const playerTotal = playerStats.reduce(
		(sum, stats) => sum + calculatePlayerFPoints(stats),
		0
	);
	const teamTotal = calculateTeamFPoints(teamStats);
	return playerTotal + teamTotal;
}

/**
 * Estimate potential FPoints based on player averages
 * Useful for projecting performance
 */
export function estimatePlayerFPoints(averages: {
	goalsPerGame: number;
	assistsPerGame: number;
	hitsPerGame: number;
	blockedShotsPerGame: number;
}): number {
	return calculatePlayerFPoints({
		goals: averages.goalsPerGame,
		assists: averages.assistsPerGame,
		hits: averages.hitsPerGame,
		blockedShots: averages.blockedShotsPerGame,
	});
}

/**
 * Estimate potential team FPoints based on averages
 */
export function estimateTeamFPoints(averages: {
	winProbability: number;
	powerplayGoalsPerGame: number;
	shorthandedGoalsPerGame: number;
	goalsAgainstPerGame: number;
	shutoutProbability: number;
	savesPerGame: number;
}): number {
	return calculateTeamFPoints({
		wins: averages.winProbability,
		powerplayGoals: averages.powerplayGoalsPerGame,
		shorthandedGoals: averages.shorthandedGoalsPerGame,
		goalsAgainst: averages.goalsAgainstPerGame,
		shutouts: averages.shutoutProbability,
		saves: averages.savesPerGame,
	});
}

/**
 * Format FPoints for display
 */
export function formatFPoints(points: number): string {
	if (points >= 0) {
		return `+${points.toFixed(1)}`;
	}
	return points.toFixed(1);
}

/**
 * Format FPoints as an integer (for actual game results)
 */
export function formatFPointsInt(points: number): string {
	if (points >= 0) {
		return `+${points}`;
	}
	return points.toString();
}
