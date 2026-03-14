import type { Ingredient, IngredientCategory, Meal, Unit } from './types';

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

export interface MealForm {
	values: Omit<Meal, 'id'>;
	errors: {
		name?: string;
		description?: string;
		ingredients?: string;
		beneficialPhases?: string;
		mealTypes?: string;
		prepTime?: string;
		cookTime?: string;
		instructions?: string;
	};
}
