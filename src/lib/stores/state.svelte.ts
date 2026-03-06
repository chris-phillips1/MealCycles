import { loadAppData, saveAppData } from '$lib/utils/storage';
import type {
	Cycle,
	Ingredient,
	Meal,
	MealPlan,
	IngredientCategory,
	CyclePhase,
	MealType
} from '$lib/types';

const appData = loadAppData();

class AppState {
	cycle = $state(appData.cycle);
	ingredients = $state(appData.ingredients);
	meals = $state(appData.meals);
	mealPlans = $state(appData.mealPlans);
	config = $state(appData.config);

	constructor() {
		$effect.root(() => {
			$effect(() => {
				saveAppData({
					cycle: this.cycle,
					ingredients: this.ingredients,
					meals: this.meals,
					mealPlans: this.mealPlans,
					config: this.config
				});
			});
		});
	}

	updateConfig(updates: Partial<typeof this.config>) {
		this.config = { ...this.config, ...updates };
	}

	updateCycle(updates: Partial<Cycle>) {
		this.cycle = { ...this.cycle, ...updates };
	}

	addIngredient(ingredient: Omit<Ingredient, 'id'>) {
		const newIngredient: Ingredient = {
			...ingredient,
			id: crypto.randomUUID()
		};
		this.ingredients = [...this.ingredients, newIngredient];
	}

	updateIngredient(id: string, updates: Partial<Omit<Ingredient, 'id'>>) {
		this.ingredients = this.ingredients.map((ingredient) =>
			ingredient.id === id ? { ...ingredient, ...updates } : ingredient
		);
	}

	removeIngredient(id: string) {
		this.ingredients = this.ingredients.filter((ingredient) => ingredient.id !== id);
	}

	getIngredientById(id: string) {
		return this.ingredients.find((ingredient) => ingredient.id === id);
	}

	getIngredientByName(name: string) {
		return this.ingredients.find(
			(ingredient) => ingredient.name.toLowerCase() === name.toLowerCase()
		);
	}

	getIngredientsByCategory(category: IngredientCategory) {
		return this.ingredients.filter((ingredient) => ingredient.category === category);
	}

	getIngredientsByPhase(phases: CyclePhase[]) {
		return this.ingredients.filter((ingredient) =>
			phases.some((phase) => ingredient.beneficialPhases.includes(phase))
		);
	}

	addMeal(meal: Omit<Meal, 'id'>) {
		const newMeal: Meal = {
			...meal,
			id: crypto.randomUUID()
		};
		this.meals = [...this.meals, newMeal];
	}

	updateMeal(id: string, updates: Partial<Omit<Meal, 'id'>>) {
		this.meals = this.meals.map((meal) => (meal.id === id ? { ...meal, ...updates } : meal));
	}

	removeMeal(id: string) {
		this.meals = this.meals.filter((meal) => meal.id !== id);
	}

	getMealById(id: string) {
		return this.meals.find((meal) => meal.id === id);
	}

	getMealsByPhase(phases: CyclePhase[]) {
		return this.meals.filter((meal) =>
			phases.some((phase) => meal.beneficialPhases.includes(phase))
		);
	}

	getMealsByType(types: MealType[]) {
		return this.meals.filter((meal) => types.some((type) => meal.tags.includes(type)));
	}

	addMealPlan(mealPlan: Omit<MealPlan, 'id'>) {
		const newMealPlan: MealPlan = {
			...mealPlan,
			id: crypto.randomUUID()
		};
		this.mealPlans = [...this.mealPlans, newMealPlan];
	}

	updateMealPlan(id: string, updates: Partial<Omit<MealPlan, 'id'>>) {
		this.mealPlans = this.mealPlans.map((plan) =>
			plan.id === id ? { ...plan, ...updates } : plan
		);
	}

	removeMealPlan(id: string) {
		this.mealPlans = this.mealPlans.filter((plan) => plan.id !== id);
	}

	getMealPlans(activeOnly: boolean = true) {
		if (activeOnly) {
			return this.mealPlans.filter((plan) => !plan.isArchived);
		}
		return this.mealPlans.filter((plan) => plan.isArchived);
	}

	getMealPlanById(id: string) {
		return this.mealPlans.find((plan) => plan.id === id);
	}

	archiveMealPlan(id: string, archive: boolean) {
		this.updateMealPlan(id, { isArchived: archive });
	}

	addUnscheduledMeal(planId: string, mealId: string) {
		const plan = this.getMealPlanById(planId);
		if (!plan) return;

		this.updateMealPlan(planId, {
			unscheduledMeals: [...plan.unscheduledMeals, mealId]
		});
	}

	scheduleMeal(planId: string, mealId: string, date: string, mealType: MealType) {
		const plan = this.getMealPlanById(planId);
		if (!plan) return;

		this.updateMealPlan(planId, {
			unscheduledMeals: plan.unscheduledMeals.filter((id) => id !== mealId),
			scheduledMeals: [...plan.scheduledMeals, { mealId, date, mealType }]
		});
	}

	unscheduleMeal(planId: string, mealId: string, date: string, mealType: MealType) {
		const plan = this.getMealPlanById(planId);
		if (!plan) return;

		this.updateMealPlan(planId, {
			scheduledMeals: plan.scheduledMeals.filter(
				(sm) => !(sm.mealId === mealId && sm.date === date && sm.mealType === mealType)
			),
			unscheduledMeals: [...plan.unscheduledMeals, mealId]
		});
	}
}

export const appState = new AppState();
