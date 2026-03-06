import { type IngredientFilters, type IngredientForm } from './types';

export const DEFAULT_INGREDIENT_FILTERS: IngredientFilters = {
	search: '',
	categories: [],
	phases: []
};

export const DEFAULT_INGREDIENT_FORM: IngredientForm = {
	name: '',
	category: null,
	unit: null,
	beneficialPhases: [],
	notes: ''
};
