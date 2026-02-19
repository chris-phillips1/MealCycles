import type { MealPlan, Meal, Ingredient, GroceryItem } from '$lib/types';

/**
 * Generate a consolidated grocery list from a meal plan.
 * Combines duplicate ingredients and groups by category.
 */
export function generateGroceryList(
	mealPlan: MealPlan,
	meals: Meal[],
	ingredients: Ingredient[]
): GroceryItem[] {
	// Get all meal IDs from the plan (both unscheduled and scheduled)
	const allMealIds = [
		...mealPlan.unscheduledMeals,
		...mealPlan.scheduledMeals.map((sm) => sm.mealId)
	];

	// Get the actual meal objects
	const planMeals = meals.filter((meal) => allMealIds.includes(meal.id));

	// Consolidate ingredients by ID
	const ingredientMap = new Map<string, { quantity: number; ingredient: Ingredient }>();

	for (const meal of planMeals) {
		for (const mealIngredient of meal.ingredients) {
			const ingredient = ingredients.find((i) => i.id === mealIngredient.ingredientId);
			if (!ingredient) continue; // Skip if ingredient not found

			const existing = ingredientMap.get(ingredient.id);
			if (existing) {
				// Add to existing quantity
				existing.quantity += mealIngredient.quantity;
			} else {
				// Add new entry
				ingredientMap.set(ingredient.id, {
					quantity: mealIngredient.quantity,
					ingredient
				});
			}
		}
	}

	// Convert to GroceryItem array
	const groceryItems: GroceryItem[] = Array.from(ingredientMap.values()).map(
		({ quantity, ingredient }) => ({
			id: crypto.randomUUID(),
			ingredientId: ingredient.id,
			name: ingredient.name,
			quantity,
			unit: ingredient.unit,
			category: ingredient.category,
			checked: false,
			isManual: false
		})
	);

	// Sort by category for easier shopping
	return groceryItems.sort((a, b) => a.category.localeCompare(b.category));
}
