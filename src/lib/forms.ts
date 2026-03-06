import type { CyclePhase, IngredientCategory, Unit } from './types';

export interface IngredientForm {
	values: {
		name: string;
		category: IngredientCategory | null;
		unit: Unit | null;
		beneficialPhases: CyclePhase[];
		notes: string;
	};
	errors: {
		name?: string;
		category?: string;
		unit?: string;
		beneficialPhases?: string;
		notes?: string;
	};
}
