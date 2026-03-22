<script lang="ts">
	import { appState } from '$lib/stores/state.svelte';
	import { SvelteMap } from 'svelte/reactivity';

	const groceryItems = $derived.by(() => {
		const planRecipes = appState.plan.recipeIds
			.map((id) => appState.recipes.find((r) => r.id === id))
			.filter((r) => r !== undefined);

		// Build a map of ingredientId -> { name, entries: [{ recipeName, quantity }] }
		const map = new SvelteMap<
			string,
			{ name: string; entries: { recipeName: string; quantity: string }[] }
		>();

		for (const recipe of planRecipes) {
			for (const { ingredientId, quantity } of recipe.ingredients) {
				const ingredient = appState.ingredients.find((i) => i.id === ingredientId);
				if (!ingredient) continue;

				const existing = map.get(ingredientId);
				if (existing) {
					existing.entries.push({ recipeName: recipe.name, quantity });
				} else {
					map.set(ingredientId, {
						name: ingredient.name,
						entries: [{ recipeName: recipe.name, quantity }]
					});
				}
			}
		}

		return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
	});
</script>

<header>
	<h1>Grocery List</h1>
	<p class="phase">For your <strong>{appState.plan.phase}</strong> phase</p>
</header>

{#if groceryItems.length === 0}
	<p class="empty">No items yet — add some recipes to your plan first.</p>
{:else}
	<ul class="list">
		{#each groceryItems as item (item.name)}
			<li class="item">
				<span class="ingredient-name">{item.name}</span>
				<ul class="entries">
					{#each item.entries as entry (entry)}
						<li>{entry.quantity} <span class="recipe-name">({entry.recipeName})</span></li>
					{/each}
				</ul>
			</li>
		{/each}
	</ul>
{/if}

<style>
	header {
		display: flex;
		align-items: baseline;
		gap: 1rem;
		margin-bottom: 2rem;
	}

	h1 {
		font-size: 2rem;
	}

	.phase {
		color: #666;
		font-size: 0.9rem;
		text-transform: capitalize;
	}

	.list {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		border: 1px solid #e5e7eb;
		border-radius: 8px;
		overflow: hidden;
		max-width: 600px;
	}

	.item {
		display: flex;
		align-items: baseline;
		gap: 1rem;
		padding: 0.75rem 1rem;
		border-bottom: 1px solid #e5e7eb;
	}

	.item:last-child {
		border-bottom: none;
	}

	.ingredient-name {
		font-weight: 600;
		min-width: 140px;
	}

	.entries {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		font-size: 0.9rem;
		color: #444;
	}

	.recipe-name {
		color: #999;
	}

	.empty {
		color: #999;
	}
</style>
