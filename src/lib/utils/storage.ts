import { browser } from '$app/environment';
import type { AppData } from '$lib/types';
import { ingredients } from './sampleData';

const STORAGE_KEY = 'MealCycles';

function getDefaultAppData(): AppData {
	return {
		cycle: {
			cycleLength: 28,
			startDate: new Date().toISOString().split('T')[0],
			phaseDurations: {
				menstrual: 5,
				follicular: 7,
				ovulation: 3,
				luteal: 13
			}
		},
		ingredients: ingredients,
		meals: [],
		mealPlans: [],
		config: {
			theme: 'dark'
		}
	};
}

function isValidAppData(data: object): data is AppData {
	return (
		data &&
		typeof data === 'object' &&
		'cycle' in data &&
		'ingredients' in data &&
		'meals' in data &&
		'mealPlans' in data &&
		'config' in data &&
		Array.isArray(data.ingredients) &&
		Array.isArray(data.meals) &&
		Array.isArray(data.mealPlans)
	);
}

export function saveAppData(data: AppData): void {
	if (!browser) {
		return;
	}

	try {
		const saveData = JSON.stringify(data);
		localStorage.setItem(STORAGE_KEY, saveData);
	} catch (error) {
		console.error('Application data could not be stored to localStorage:', error);
	}
}

export function loadAppData(): AppData {
	if (!browser) {
		return getDefaultAppData();
	}

	try {
		const storedData = localStorage.getItem(STORAGE_KEY);

		if (!storedData) {
			return getDefaultAppData();
		}

		const appData = JSON.parse(storedData);

		if (!isValidAppData(appData)) {
			console.error('Stored data was not in the correct format. Default data will be used');
			return getDefaultAppData();
		}

		return appData;
	} catch (error) {
		console.error('Failed to load app data from localStorage:', error);
		return getDefaultAppData();
	}
}

function clearAppData(): void {
	if (!browser) {
		return;
	}

	try {
		localStorage.removeItem(STORAGE_KEY);
	} catch (error) {
		console.error('Application data could not be cleared from localStorage:', error);
	}
}

function exportAppData(): string {
	const data = loadAppData();
	return JSON.stringify(data, null, 2);
}

function importAppData(jsonImport: string): boolean {
	try {
		const data = JSON.parse(jsonImport);

		if (!isValidAppData(data)) {
			console.error('Invalid application data was provided for import');
			return false;
		}

		saveAppData(data);
		return true;
	} catch (error) {
		console.error('Issue importing application data: ', error);
		return false;
	}
}
