import type { AppData, CyclePhase, Ingredient, Plan, Recipe } from '$lib/types';
import { browser } from '$app/environment';
import { sampleIngredients, samplePlan, sampleRecipes } from '$lib/utils/sampleData';

export const STORAGE_KEY = 'MealCycles';

const defaultAppData: AppData = {
	cycleStartDate: new Date().toISOString(),
	ingredients: sampleIngredients,
	recipes: sampleRecipes,
	plan: samplePlan
};

function loadFromStorage(): AppData {
	if (!browser) return defaultAppData;
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? JSON.parse(raw) : defaultAppData;
	} catch {
		return defaultAppData;
	}
}

class AppState {
	STORED_DATA = loadFromStorage();
	cycleStartDate = $state<string>(this.STORED_DATA.cycleStartDate);
	ingredients = $state<Ingredient[]>(this.STORED_DATA.ingredients);
	recipes = $state<Recipe[]>(this.STORED_DATA.recipes);
	plan = $state<Plan>(this.STORED_DATA.plan);

	//Cycle
	updateCycleStart(date: string) {
		this.cycleStartDate = date;
	}

	// Ingredients
	addIngredient(ingredient: Omit<Ingredient, 'id'>) {
		const newIngredient = { ...ingredient, id: crypto.randomUUID() };
		this.ingredients = [...this.ingredients, newIngredient];

		return newIngredient;
	}

	removeIngredient(id: string) {
		this.ingredients = this.ingredients.filter((i) => i.id !== id);
	}

	// Recipes
	addRecipe(recipe: Omit<Recipe, 'id'>) {
		this.recipes = [...this.recipes, { ...recipe, id: crypto.randomUUID() }];
	}

	updateRecipe(id: string, updates: Partial<Omit<Recipe, 'id'>>) {
		this.recipes = this.recipes.map((r) => (r.id === id ? { ...r, ...updates } : r));
	}

	removeRecipe(id: string) {
		this.recipes = this.recipes.filter((r) => r.id !== id);
		this.plan = {
			...this.plan,
			recipeIds: this.plan.recipeIds.filter((rid) => rid !== id)
		};
	}

	// Plan
	startNewPlan(phase: CyclePhase) {
		this.plan = { phase, recipeIds: [], createdAt: new Date().toISOString() };
	}

	addRecipeToPlan(recipeId: string) {
		if (this.plan.recipeIds.includes(recipeId)) return;
		this.plan = { ...this.plan, recipeIds: [...this.plan.recipeIds, recipeId] };
	}

	removeRecipeFromPlan(recipeId: string) {
		this.plan = {
			...this.plan,
			recipeIds: this.plan.recipeIds.filter((id) => id !== recipeId)
		};
	}
}

export const appState = new AppState();
