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

// ============================================
// INITIAL STATE
// ============================================

const initialData = loadAppData();

let cycle = $state(initialData.cycle);
let ingredients = $state(initialData.ingredients);
let meals = $state(initialData.meals);
let mealPlans = $state(initialData.mealPlans);
let config = $state(initialData.config);

function save() {
	saveAppData({ cycle, ingredients, meals, mealPlans, config });
}

// ============================================
// CONFIG FUNCTIONS
// ============================================

export function updateConfig(updates: Partial<typeof config>) {
	config = { ...config, ...updates };
	save();
}

export function getConfig() {
	return config;
}

// ============================================
// CYCLE FUNCTIONS
// ============================================

export function updateCycle(updates: Partial<Cycle>) {
	cycle = { ...cycle, ...updates };
	save();
}

export function getCycle() {
	return cycle;
}

// ============================================
// INGREDIENT FUNCTIONS
// ============================================

export function addIngredient(ingredient: Omit<Ingredient, 'id'>) {
	const newIngredient: Ingredient = {
		...ingredient,
		id: crypto.randomUUID()
	};
	ingredients = [...ingredients, newIngredient];
	save();
}

export function updateIngredient(id: string, updates: Partial<Omit<Ingredient, 'id'>>) {
	ingredients = ingredients.map((ingredient) =>
		ingredient.id === id ? { ...ingredient, ...updates } : ingredient
	);
	save();
}

export function removeIngredient(id: string) {
	ingredients = ingredients.filter((ingredient) => ingredient.id !== id);
	save();
}

export function getIngredients() {
	return ingredients;
}

export function getIngredientById(id: string) {
	return ingredients.find((ingredient) => ingredient.id === id);
}

export function getIngredientByName(name: string) {
	return ingredients.find((ingredient) => ingredient.name.toLowerCase() === name.toLowerCase());
}

export function getIngredientsByCategory(category: IngredientCategory) {
	return ingredients.filter((ingredient) => ingredient.category === category);
}

export function getIngredientsByPhase(phases: CyclePhase[]) {
	return ingredients.filter((ingredient) =>
		phases.some((phase) => ingredient.beneficialPhases.includes(phase))
	);
}

// ============================================
// MEAL FUNCTIONS
// ============================================

export function addMeal(meal: Omit<Meal, 'id'>) {
	const newMeal: Meal = {
		...meal,
		id: crypto.randomUUID()
	};
	meals = [...meals, newMeal];
	save();
}

export function updateMeal(id: string, updates: Partial<Omit<Meal, 'id'>>) {
	meals = meals.map((meal) => (meal.id === id ? { ...meal, ...updates } : meal));
	save();
}

export function removeMeal(id: string) {
	meals = meals.filter((meal) => meal.id !== id);
	save();
}

export function getMeals() {
	return meals;
}

export function getMealById(id: string) {
	return meals.find((meal) => meal.id === id);
}

export function getMealsByPhase(phases: CyclePhase[]) {
	return meals.filter((meal) => phases.some((phase) => meal.beneficialPhases.includes(phase)));
}

export function getMealsByType(types: MealType[]) {
	return meals.filter((meal) => types.some((type) => meal.tags.includes(type)));
}

// ============================================
// MEAL PLAN FUNCTIONS
// ============================================

export function addMealPlan(mealPlan: Omit<MealPlan, 'id'>) {
	const newMealPlan: MealPlan = {
		...mealPlan,
		id: crypto.randomUUID()
	};
	mealPlans = [...mealPlans, newMealPlan];
	save();
}

export function updateMealPlan(id: string, updates: Partial<Omit<MealPlan, 'id'>>) {
	mealPlans = mealPlans.map((plan) => (plan.id === id ? { ...plan, ...updates } : plan));
	save();
}

export function removeMealPlan(id: string) {
	mealPlans = mealPlans.filter((plan) => plan.id !== id);
	save();
}

export function getMealPlans(activeOnly: boolean = true) {
	if (activeOnly) {
		return mealPlans.filter((plan) => !plan.isArchived);
	}
	return mealPlans.filter((plan) => plan.isArchived);
}

export function getAllMealPlans() {
	return mealPlans;
}

export function getMealPlanById(id: string) {
	return mealPlans.find((plan) => plan.id === id);
}

export function archiveMealPlan(id: string, archive: boolean) {
	updateMealPlan(id, { isArchived: archive });
}

// ============================================
// MEAL PLAN - MEAL MANAGEMENT
// ============================================

export function addUnscheduledMeal(planId: string, mealId: string) {
	const plan = getMealPlanById(planId);
	if (!plan) return;

	updateMealPlan(planId, {
		unscheduledMeals: [...plan.unscheduledMeals, mealId]
	});
}

export function scheduleMeal(planId: string, mealId: string, date: string, mealType: MealType) {
	const plan = getMealPlanById(planId);
	if (!plan) return;

	updateMealPlan(planId, {
		unscheduledMeals: plan.unscheduledMeals.filter((id) => id !== mealId),
		scheduledMeals: [...plan.scheduledMeals, { mealId, date, mealType }]
	});
}

export function unscheduleMeal(planId: string, mealId: string, date: string, mealType: MealType) {
	const plan = getMealPlanById(planId);
	if (!plan) return;

	updateMealPlan(planId, {
		scheduledMeals: plan.scheduledMeals.filter(
			(sm) => !(sm.mealId === mealId && sm.date === date && sm.mealType === mealType)
		),
		unscheduledMeals: [...plan.unscheduledMeals, mealId]
	});
}
