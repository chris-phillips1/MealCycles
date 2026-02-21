// src/lib/utils/cycleCalculations.ts
import type { Cycle, CyclePhase } from '$lib/types';
import { CyclePhase as Phase } from '$lib/types';

export interface CurrentCycleInfo {
	currentPhase: CyclePhase;
	currentDay: number; // Day within the cycle (1-based)
	phaseDay: number; // Day within the current phase (1-based)
	phaseStartDate: string; // ISO date
	phaseEndDate: string; // ISO date
}

// Calculate days between two dates
function getDaysBetween(start: Date, end: Date): number {
	const msPerDay = 1000 * 60 * 60 * 24;
	return Math.floor((end.getTime() - start.getTime()) / msPerDay);
}

// Get current day in cycle (1-based, wraps around)
function getCurrentCycleDay(startDate: Date, today: Date, cycleLength: number): number {
	const daysSinceStart = getDaysBetween(startDate, today);
	return (daysSinceStart % cycleLength) + 1;
}

// Determine which phase based on current cycle day
function getPhaseFromDay(
	currentDay: number,
	phaseDurations: Cycle['phaseDurations']
): {
	phase: CyclePhase;
	phaseDay: number;
	phaseDayOffset: number;
	phaseDuration: number;
} {
	const { menstrual, follicular, ovulation, luteal } = phaseDurations;

	// Calculate cumulative day boundaries
	const menstrualEnd = menstrual;
	const follicularEnd = menstrualEnd + follicular;
	const ovulationEnd = follicularEnd + ovulation;

	// Determine phase based on which boundary we're before
	if (currentDay <= menstrualEnd) {
		return {
			phase: Phase.MENSTRUAL,
			phaseDay: currentDay,
			phaseDayOffset: 0,
			phaseDuration: menstrual
		};
	} else if (currentDay <= follicularEnd) {
		return {
			phase: Phase.FOLLICULAR,
			phaseDay: currentDay - menstrualEnd,
			phaseDayOffset: menstrualEnd,
			phaseDuration: follicular
		};
	} else if (currentDay <= ovulationEnd) {
		return {
			phase: Phase.OVULATION,
			phaseDay: currentDay - follicularEnd,
			phaseDayOffset: follicularEnd,
			phaseDuration: ovulation
		};
	} else {
		return {
			phase: Phase.LUTEAL,
			phaseDay: currentDay - ovulationEnd,
			phaseDayOffset: ovulationEnd,
			phaseDuration: luteal
		};
	}
}

// Calculate phase date range
export function getPhaseDateRange(
	cycleStartDate: Date,
	phaseDayOffset: number,
	phaseDuration: number
): { startDate: string; endDate: string } {
	const phaseStartDate = new Date(cycleStartDate);
	phaseStartDate.setDate(cycleStartDate.getDate() + phaseDayOffset);

	const phaseEndDate = new Date(phaseStartDate);
	phaseEndDate.setDate(phaseStartDate.getDate() + phaseDuration - 1);

	return {
		startDate: phaseStartDate.toISOString().split('T')[0],
		endDate: phaseEndDate.toISOString().split('T')[0]
	};
}

export function getPhaseDayOffset(
	phase: CyclePhase,
	phaseDurations: Cycle['phaseDurations']
): number {
	switch (phase) {
		case Phase.MENSTRUAL:
			return 0;
		case Phase.FOLLICULAR:
			return phaseDurations.menstrual;
		case Phase.OVULATION:
			return phaseDurations.menstrual + phaseDurations.follicular;
		case Phase.LUTEAL:
			return phaseDurations.menstrual + phaseDurations.follicular + phaseDurations.ovulation;
		default:
			return 0;
	}
}

// Main function - composes the smaller functions
export function getCurrentCycleInfo(cycle: Cycle, today: Date = new Date()): CurrentCycleInfo {
	const startDate = new Date(cycle.startDate);
	const currentDay = getCurrentCycleDay(startDate, today, cycle.cycleLength);
	const phaseInfo = getPhaseFromDay(currentDay, cycle.phaseDurations);
	const dateRange = getPhaseDateRange(startDate, phaseInfo.phaseDayOffset, phaseInfo.phaseDuration);

	return {
		currentPhase: phaseInfo.phase,
		currentDay,
		phaseDay: phaseInfo.phaseDay,
		phaseStartDate: dateRange.startDate,
		phaseEndDate: dateRange.endDate
	};
}
