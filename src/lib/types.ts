export type CyclePhase = 'menstrual' | 'follicular' | 'ovulation' | 'luteal';
export const CYCLE_PHASES: CyclePhase[] = ['menstrual', 'follicular', 'ovulation', 'luteal'];

export interface Ingredient {
	id: string;
	name: string;
	phases: CyclePhase[];
}

export interface RecipeIngredient {
	ingredientId: string;
	quantity: string;
}

export interface Recipe {
	id: string;
	name: string;
	description: string;
	ingredients: RecipeIngredient[];
	phases: CyclePhase[];
}

export interface Plan {
	phase: CyclePhase;
	recipeIds: string[];
}

export interface AppData {
	ingredients: Ingredient[];
	recipes: Recipe[];
	plan: Plan;
}
