import { type IngredientFilters, type IngredientForm } from './types';

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
	validation: {
		required: {
			name: true,
			category: true,
			unit: true,
			beneficialPhases: true,
			notes: false
		}
	},
	errors: {
		name: undefined,
		category: undefined,
		unit: undefined,
		beneficialPhases: undefined,
		notes: undefined
	}
};
