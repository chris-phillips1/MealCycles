import { CyclePhase, IngredientCategory, MealType, Unit } from '../types';
import type { Ingredient, Meal } from '../types';

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
	},
	{
		id: '4',
		name: 'Steak',
		category: IngredientCategory.PROTEIN,
		unit: Unit.PIECE,
		beneficialPhases: [CyclePhase.MENSTRUAL],
		notes: 'A piece of steak'
	},
	{
		id: '5',
		name: 'Potato',
		category: IngredientCategory.GRAIN,
		unit: Unit.PIECE,
		beneficialPhases: [CyclePhase.FOLLICULAR, CyclePhase.OVULATION],
		notes: 'A medium-sized potato'
	}
];

export const meals: Meal[] = [
	{
		id: '6',
		name: 'Steak & Potatos',
		description: 'A timelessly classic dish',
		ingredients: [
			{
				ingredientId: '4',
				quantity: 1
			},
			{ ingredientId: '5', quantity: 1 }
		],
		beneficialPhases: [CyclePhase.MENSTRUAL],
		mealTypes: [MealType.DINNER],
		prepTime: 10,
		cookTime: 35,
		instructions:
			'Boil a pot of water. Dice potatos.Add the potatos to the boiling water.Let boil for 35 minutes.Meanwhile, cook the steak to your liking.'
	}
];
