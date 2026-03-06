import type { Ingredient, IngredientCategory, Unit } from './types';

export interface IngredientForm {
	values: Omit<Ingredient, 'id'> & {
		category: IngredientCategory | null;
		unit: Unit | null;
	};
	errors: {
		name?: string;
		category?: string;
		unit?: string;
		beneficialPhases?: string;
		notes?: string;
	};
}
