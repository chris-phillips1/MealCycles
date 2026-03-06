import type { IngredientForm } from './forms';
import { type IngredientFilters } from './types';

export const DEFAULT_INGREDIENT_FILTERS: IngredientFilters = {
	search: '',
	categories: [],
	phases: []
};

export function createDefaultIngredientForm(): IngredientForm {
	return {
		values: {
			name: '',
			category: null,
			unit: null,
			beneficialPhases: [],
			notes: ''
		},
		errors: {}
	};
}
