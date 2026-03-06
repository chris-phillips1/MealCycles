export enum CyclePhase {
	MENSTRUAL = 'menstrual',
	FOLLICULAR = 'follicular',
	OVULATION = 'ovulation',
	LUTEAL = 'luteal'
}

export enum IngredientCategory {
	PROTEIN = 'protein',
	VEGETABLE = 'vegetable',
	FRUIT = 'fruit',
	GRAIN = 'grain',
	DAIRY = 'dairy',
	SPICE = 'spice',
	OTHER = 'other'
}

export enum Unit {
	GRAM = 'g',
	KILOGRAM = 'kg',
	OUNCE = 'oz',
	POUND = 'lb',

	TEASPOON = 'tsp',
	TABLESPOON = 'tbsp',
	CUP = 'cup',
	MILLILITER = 'ml',
	LITER = 'l',
	FLUID_OUNCE = 'fl_oz',

	PIECE = 'piece',
	PINCH = 'pinch'
}

export enum MealType {
	BREAKFAST = 'breakfast',
	LUNCH = 'lunch',
	DINNER = 'dinner',
	SNACK = 'snack'
}

export interface Cycle {
	cycleLength: number; // Default: 28 days
	startDate: string;
	phaseDurations: {
		menstrual: number; // Default: 5 days
		follicular: number; // Default: 7 days
		ovulation: number; // Default: 3 days
		luteal: number; // Default: 13 days
	};
}

export interface Ingredient {
	id: string;
	name: string;
	category: IngredientCategory;
	unit: Unit;
	beneficialPhases: CyclePhase[];
	notes?: string;
}

export interface MealIngredient {
	ingredientId: string;
	quantity: number;
}

export interface Meal {
	id: string;
	name: string;
	description: string;
	ingredients: MealIngredient[];
	beneficialPhases: CyclePhase[];
	mealTypes: MealType[];
	prepTime: number;
	cookTime: number;
	instructions: string;
}

export interface ScheduledMeal {
	mealId: string;
	date: string;
	mealType: MealType;
}

export interface MealPlan {
	id: string;
	name: string;
	createdDate: string;
	dominantPhase: CyclePhase;
	unscheduledMeals: string[];
	scheduledMeals: ScheduledMeal[];
	isArchived: boolean;
}

export interface GroceryItem {
	id: string;
	ingredientId?: string; // Optional link back to ingredient (undefined for manual items)
	name: string;
	quantity: number;
	unit: Unit;
	category: IngredientCategory;
	checked: boolean; // Whether item has been purchased
	isManual: boolean; // True if manually added, false if generated from meal plan
}

export interface AppData {
	cycle: Cycle;
	ingredients: Ingredient[];
	meals: Meal[];
	mealPlans: MealPlan[];
	config: {
		theme: 'dark' | 'light';
	};
}
