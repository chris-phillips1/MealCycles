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
		<label for="categoryFilter">Category:</label>
		<select name="category" id="categoryFilter" multiple>
			{#each Object.values(IngredientCategory) as category (category)}
				<option value={category}>{category}</option>
			{/each}
		</select>
	</article>
	<article class="filter">
		<label for="phaseFilter">Phase:</label>
		<select name="phases" id="phaseFilter" multiple>
			{#each Object.values(CyclePhase) as phase (phase)}
				<option value={phase}>{phase}</option>
			{/each}
		</select>
	</article>
	<article>
		<button>Clear Filters</button>
	</article>
</section>

<section class="table-header">
	<p>Showing x / {ingredients.length} ingredients</p>
	<input type="text" placeholder="Search for an ingredient" />
</section>

<section class="table-container">
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

	.ingredient-form-buttons {
		display: flex;
		justify-content: flex-end;
		gap: 0.75rem;
	}

	.filters {
		display: flex;
		gap: 1rem;
	}

	.filter {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.table-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.table-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border: 4px solid var(--border);
		border-radius: 0.25rem;
	}

	.table-container table {
		width: 100%;
		border-collapse: collapse;
	}

	.table-container table th,
	.table-container table td {
		padding: 0.5rem;
		border: 1px solid var(--border-color);
	}

	.table-container table th {
		background-color: var(--background-color);
		text-align: left;
	}

	.phase-badge {
		display: inline-block;
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		font-size: 0.85rem;
		margin-right: 0.25rem;
	}

	.phase-badge.menstrual {
		background: #ffebee;
		color: #c62828;
	}
	.phase-badge.follicular {
		background: #e8f5e9;
		color: #2e7d32;
	}
	.phase-badge.ovulation {
		background: #e3f2fd;
		color: #1565c0;
	}
	.phase-badge.luteal {
		background: #fff3e0;
		color: #e65100;
	}
</style>
