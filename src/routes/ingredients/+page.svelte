<script lang="ts">
	import { getIngredients } from '$lib/stores/state.svelte';

	let ingredients = $derived(getIngredients());
</script>

<header>
	<section>
		<h1>Ingredients</h1>
		<p>
			Manage your ingredients here. Add, edit, and organize ingredients by category and cycle phase.
		</p>
	</section>
	<section>
		<button>Add Ingredient</button>
	</section>
</header>

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

	header > section:last-child {
		align-self: center;
	}

	header > section:last-child button {
		max-height: 100%;
		padding: 0.75rem;
	}

	.filters {
		display: flex;
	}

	.table-header {
		display: flex;
		margin-bottom: 1rem;
		align-items: center;
		justify-content: space-between;
	}

	.table-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
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
