<script lang="ts">
	import { getIngredients } from '$lib/stores/state.svelte';
	import { CyclePhase, IngredientCategory } from '$lib/types';

	let ingredients = $derived(getIngredients());
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
	<table>
		<thead>
			<tr>
				<th scope="col">Name</th>
				<th scope="col">Category</th>
				<th scope="col">Phases</th>
				<th scope="col">Notes</th>
				<th scope="col">Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each ingredients as ingredient (ingredient.id)}
				<tr>
					<td>{ingredient.name}</td>
					<td>{ingredient.category}</td>
					<td>
						{#each ingredient.beneficialPhases as phase (phase)}
							<span class="badge {phase}">{phase}</span>
						{/each}
					</td>
					<td>{ingredient.notes}</td>
					<td>
						<button>Edit</button>
						<button>Delete</button>
					</td>
				</tr>
			{:else}
				<tr>
					<td colspan="3">No ingredients yet!</td>
				</tr>
			{/each}
		</tbody>
	</table>
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

	table {
		width: 100%;
		border-collapse: collapse;
		margin-top: 1rem;
	}

	th,
	td {
		padding: 0.75rem;
		text-align: left;
		border-bottom: 1px solid var(--border);
	}

	th {
		background: var(--bg-surface-2);
		font-weight: 600;
	}

	thead th {
		position: sticky;
		top: 0;
		background: var(--bg-surface-2);
		z-index: 10;
	}

	.badge {
		display: inline-block;
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		font-size: 0.85rem;
		margin-right: 0.25rem;
		font-weight: 500;
	}

	.menstrual {
		background: #fecaca;
		color: #991b1b;
	}

	.follicular {
		background: #d9f99d;
		color: #3f6212;
	}

	.ovulation {
		background: #bfdbfe;
		color: #1e40af;
	}

	.luteal {
		background: #fed7aa;
		color: #9a3412;
	}

	tr:hover {
		background: var(--bg-surface); /* Helpful for scanning rows */
	}
</style>
