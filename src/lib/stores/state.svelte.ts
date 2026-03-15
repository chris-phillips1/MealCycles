import type { AppData, CyclePhase, Ingredient, Recipe } from '$lib/types';
import { persisted } from '$lib/utils/storage.svelte';
import { sampleIngredients, sampleRecipes } from '$lib/utils/sampleData';

const STORAGE_KEY = 'MealCycles';

const defaultAppData: AppData = {
	ingredients: sampleIngredients,
	recipes: sampleRecipes,
	plan: { phase: 'menstrual', recipeIds: [] }
};

const store = persisted<AppData>(STORAGE_KEY, defaultAppData);

class AppState {
	get ingredients() {
		return store.value.ingredients;
	}
	get recipes() {
		return store.value.recipes;
	}
	get plan() {
		return store.value.plan;
	}

	// Ingredients
	addIngredient(ingredient: Omit<Ingredient, 'id'>) {
		store.value = {
			...store.value,
			ingredients: [...store.value.ingredients, { ...ingredient, id: crypto.randomUUID() }]
		};
	}

	// Recipes
	addRecipe(recipe: Omit<Recipe, 'id'>) {
		store.value = {
			...store.value,
			recipes: [...store.value.recipes, { ...recipe, id: crypto.randomUUID() }]
		};
	}

	updateRecipe(id: string, updates: Partial<Omit<Recipe, 'id'>>) {
		store.value = {
			...store.value,
			recipes: store.value.recipes.map((r) => (r.id === id ? { ...r, ...updates } : r))
		};
	}

	removeRecipe(id: string) {
		store.value = {
			...store.value,
			recipes: store.value.recipes.filter((r) => r.id !== id),
			plan: {
				...store.value.plan,
				recipeIds: store.value.plan.recipeIds.filter((rid) => rid !== id)
			}
		};
	}

	// Plan
	startNewPlan(phase: CyclePhase) {
		store.value = { ...store.value, plan: { phase, recipeIds: [] } };
	}

	addRecipeToPlan(recipeId: string) {
		if (store.value.plan.recipeIds.includes(recipeId)) return;
		store.value = {
			...store.value,
			plan: { ...store.value.plan, recipeIds: [...store.value.plan.recipeIds, recipeId] }
		};
	}

	removeRecipeFromPlan(recipeId: string) {
		store.value = {
			...store.value,
			plan: {
				...store.value.plan,
				recipeIds: store.value.plan.recipeIds.filter((id) => id !== recipeId)
			}
		};
	}
}

export const appState = new AppState();
