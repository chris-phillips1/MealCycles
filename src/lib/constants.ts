import type { IngredientForm } from './forms';
import { type IngredientFilters } from './types';

export const DEFAULT_INGREDIENT_FILTERS: IngredientFilters = {
	search: '',
	categories: [],
	phases: []
};

export const DEFAULT_INGREDIENT_FORM: IngredientForm = {
	values: {
		name: '',
		category: null,
		unit: null,
		beneficialPhases: [],
		notes: ''
	},
	errors: {}
};
