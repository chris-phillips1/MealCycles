import { CyclePhase, IngredientCategory, Unit } from '../types';
import type { Ingredient } from '../types';

export const ingredients: Ingredient[] = [
	{
		id: '1',
		name: 'Apple',
		category: IngredientCategory.FRUIT,
		unit: Unit.PIECE,
		beneficialPhases: [CyclePhase.FOLLICULAR, CyclePhase.LUTEAL],
		notes: 'This is a sample ingredient.'
	},
	{
		id: '2',
		name: 'Banana',
		category: IngredientCategory.FRUIT,
		unit: Unit.PIECE,
		beneficialPhases: [CyclePhase.MENSTRUAL, CyclePhase.LUTEAL],
		notes: 'This is a sample ingredient.'
	},
	{
		id: '3',
		name: 'Carrot',
		category: IngredientCategory.VEGETABLE,
		unit: Unit.PIECE,
		beneficialPhases: [CyclePhase.FOLLICULAR, CyclePhase.OVULATION],
		notes: 'This is a sample ingredient.'
	}
];
