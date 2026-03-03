<script lang="ts">
	import IngredientRow from '$lib/components/IngredientRow.svelte';
	import TableHeader from '$lib/components/TableHeader.svelte';
	import { getIngredients } from '$lib/stores/state.svelte';
	import { CyclePhase, IngredientCategory } from '$lib/types';

	let ingredients = $derived(getIngredients());
	let headers = [
		{
			headerTitle: 'Name',
			propertyName: 'name'
		},
		{
			headerTitle: 'Category',
			propertyName: 'category'
		},
		{
			headerTitle: 'Unit',
			propertyName: 'unit'
		},
		{
			headerTitle: 'Phases',
			propertyName: 'beneficialPhases'
		},
		{
			headerTitle: 'Notes',
			propertyName: 'notes'
		},
		{
			headerTitle: 'Actions',
			propertyName: 'actions',
			actions: ['Edit', 'Delete']
		}
	];
</script>

<header>
	<section>
		<h1>Ingredients</h1>
		<p>
			Manage your ingredients here. Add, edit, and organize ingredients by category and cycle phase.
		</p>
	</section>
	<section class="add-ingredient">
		<button>Add Ingredient</button>
	</section>
</header>

<section class="filters">
	<article class="filter">
		<p>Category:</p>
		<div class="filter-choices">
			{#each Object.values(IngredientCategory) as category (category)}
				<button>{category}</button>
			{/each}
		</div>
	</article>
	<article class="filter">
		<p>Phase:</p>
		<div class="filter-choices">
			{#each Object.values(CyclePhase) as phase (phase)}
				<button>{phase}</button>
			{/each}
		</div>
	</article>
	<article>
		<button>Clear Filters</button>
	</article>
</section>

<section class="table">
	{#if ingredients.length === 0}
		<p>No ingredients yet. Add your first ingredient!</p>
	{:else}
		<table>
			<TableHeader {headers} />
			<tbody>
				{#each ingredients as ingredient (ingredient.id)}
					<IngredientRow {ingredient} {headers} />
				{/each}
			</tbody>
		</table>
	{/if}
</section>

<style>
	header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 1rem;
	}

	header h1,
	header p {
		margin: 0;
	}

	.add-ingredient {
		align-self: center;
	}

	.add-ingredient button {
		max-height: 100%;
		padding: 0.75rem;
	}

	.filters {
		display: flex;
		gap: 1rem;
	}

	.filter-choices {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		max-width: 30vw;
	}

	.filter-choices button {
		min-width: 100px;
		background: var(--bg-surface-2);
	}

	.table {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border: 4px solid var(--border);
		border-radius: 0.25rem;
		margin-top: 1rem;
	}

	.table table {
		width: 100%;
		border-collapse: collapse;
	}
</style>
