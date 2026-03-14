import type { IngredientForm, MealForm } from './forms';
import { IngredientCategory, Unit, type IngredientFilters } from './types';

export const DEFAULT_INGREDIENT_FILTERS: IngredientFilters = {
	search: '',
	categories: [],
	phases: []
};

export function createDefaultIngredientForm(): IngredientForm {
	return {
		values: {
			name: '',
			category: '' as IngredientCategory,
			unit: '' as Unit,
			beneficialPhases: [],
			notes: ''
		},
		errors: {}
	};
}

export function createDefaultMealForm(): MealForm {
	return {
		values: {
			name: '',
			description: '',
			ingredients: [],
			beneficialPhases: [],
			mealTypes: [],
			prepTime: 0,
			cookTime: 0,
			instructions: ''
		},
		errors: {}
	};
}
