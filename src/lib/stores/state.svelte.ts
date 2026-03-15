import type { AppData, CyclePhase, Ingredient, Plan, Recipe } from '$lib/types';
import { browser } from '$app/environment';
import { sampleIngredients, sampleRecipes } from '$lib/utils/sampleData';

const STORAGE_KEY = 'MealCycles';

const defaultAppData: AppData = {
	ingredients: sampleIngredients,
	recipes: sampleRecipes,
	plan: { phase: 'menstrual', recipeIds: [] }
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
	ingredients = $state<Ingredient[]>(loadFromStorage().ingredients);
	recipes = $state<Recipe[]>(loadFromStorage().recipes);
	plan = $state<Plan>(loadFromStorage().plan);

	constructor() {
		$effect.root(() => {
			$effect(() => {
				if (!browser) return;
				localStorage.setItem(
					STORAGE_KEY,
					JSON.stringify({
						ingredients: this.ingredients,
						recipes: this.recipes,
						plan: this.plan
					})
				);
			});
		});
	}

	// Ingredients
	addIngredient(ingredient: Omit<Ingredient, 'id'>) {
		this.ingredients = [...this.ingredients, { ...ingredient, id: crypto.randomUUID() }];
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
		this.plan = { phase, recipeIds: [] };
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
