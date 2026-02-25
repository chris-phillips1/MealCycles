<script lang="ts">
	import { getIngredients } from '$lib/stores/state.svelte';
	import { CyclePhase, IngredientCategory, Unit } from '$lib/types';

	let ingredients = $derived(getIngredients());
	let dialog;

	function openDialog() {
		dialog.showModal();
	}

	function closeDialog() {
		dialog.close();
	}
</script>

<header>
	<section>
		<h1>Ingredients</h1>
		<p>
			Manage your ingredients here. Add, edit, and organize ingredients by category and cycle phase.
		</p>
	</section>
	<section class="add-ingredient">
		<button onclick={openDialog}>Add Ingredient</button>
	</section>
</header>

<section class="add-ingredient-container">
	<dialog bind:this={dialog} onclose={closeDialog}>
		<form method="dialog">
			<label for="ingredient-name">Name:</label>
			<input type="text" id="ingredient-name" name="ingredient-name" required />

			<label for="ingredient-category">Category:</label>
			<select name="ingredient-category" id="ingredient-category">
				{#each Object.values(IngredientCategory) as category (category)}
					<option value={category}>{category}</option>
				{/each}
			</select>

			<label for="ingredient-unit">Unit:</label>
			<select name="ingredient-unit" id="ingredient-unit">
				{#each Object.values(Unit) as unit (unit)}
					<option value={unit}>{unit}</option>
				{/each}
			</select>

			<label for="ingredient-phases">Beneficial Phases:</label>
			<select name="ingredient-phases" id="ingredient-phases">
				{#each Object.values(CyclePhase) as phase (phase)}
					<option value={phase}>{phase}</option>
				{/each}
			</select>

			<label for="ingredient-notes">Notes:</label>
			<textarea name="ingredient-notes" id="ingredient-notes"></textarea>

			<div class="ingredient-form-buttons">
				<input type="button" value="Cancel" onclick={closeDialog} />
				<input type="submit" />
			</div>
		</form>
	</dialog>
</section>

<section class="filters">
	<article>
		<label for="categoryFilter">Category:</label>
		<select name="category" id="categoryFilter">
			<option value="All">All</option>
		</select>
	</article>
	<article>
		<label for="phaseFilter">Phase:</label>
		<select name="phases" id="phaseFilter" multiple>
			<option value="menstrual">Menstrual</option>
			<option value="follicular">Follicular</option>
			<option value="ovulation">Ovulation</option>
			<option value="luteal">Luteal</option>
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
			<thead>
				<tr>
					<th scope="col">Name</th>
					<th scope="col">Category</th>
					<th scope="col">Unit</th>
					<th scope="col">Phases</th>
					<th scope="col">Notes</th>
				</tr>
			</thead>
			<tbody>
				{#each ingredients as ingredient, id (id)}
					<tr>
						<td>{ingredient.name}</td>
						<td>{ingredient.category}</td>
						<td>{ingredient.unit}</td>
						<td>
							{#each ingredient.beneficialPhases as phase, id (id)}
								<p>{phase}</p>
							{/each}
						</td>
						<td>{ingredient.notes}</td>
					</tr>
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

	.add-ingredient-container dialog {
		background-color: var(--bg);
		color: var(--text);
		width: 35%;
		padding: 1.5rem;
	}

	.add-ingredient-container form {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.ingredient-form-buttons {
		display: flex;
		justify-content: flex-end;
		gap: 0.75rem;
	}

	.filters {
		display: flex;
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
</style>
