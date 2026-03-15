import type { Ingredient, Recipe } from '$lib/types';

export const sampleIngredients: Ingredient[] = [
	{
		id: '1',
		name: 'Spinach',
		phases: ['menstrual', 'follicular']
	},
	{
		id: '2',
		name: 'Salmon',
		phases: ['menstrual', 'luteal']
	},
	{
		id: '3',
		name: 'Avocado',
		phases: ['follicular', 'ovulation']
	},
	{
		id: '4',
		name: 'Sweet Potato',
		phases: ['luteal']
	},
	{
		id: '5',
		name: 'Lentils',
		phases: ['follicular', 'ovulation', 'luteal']
	}
];

export const sampleRecipes: Recipe[] = [
	{
		id: '10',
		name: 'Salmon & Spinach Bowl',
		description: 'A simple iron-rich bowl great for the menstrual phase.',
		ingredients: [
			{ ingredientId: '2', quantity: '1 fillet' },
			{ ingredientId: '1', quantity: '2 cups' }
		],
		phases: ['menstrual']
	},
	{
		id: '11',
		name: 'Lentil Avocado Salad',
		description: 'Light and energising — ideal as energy rises in the follicular phase.',
		ingredients: [
			{ ingredientId: '5', quantity: '1 cup cooked' },
			{ ingredientId: '3', quantity: '1/2 avocado' }
		],
		phases: ['follicular', 'ovulation']
	},
	{
		id: '12',
		name: 'Sweet Potato & Lentil Stew',
		description: 'Warming and grounding for the luteal phase.',
		ingredients: [
			{ ingredientId: '4', quantity: '1 medium' },
			{ ingredientId: '5', quantity: '1 cup cooked' }
		],
		phases: ['luteal']
	}
];
