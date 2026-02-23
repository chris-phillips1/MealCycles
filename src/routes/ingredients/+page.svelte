<script lang="ts">
	import { getIngredients } from '$lib/stores/state.svelte';
	import { IngredientCategory } from '$lib/types';
	import Select from 'svelte-select';

	let phaseChoices = [
		{ value: 'menstrual', label: 'Menstrual' },
		{ value: 'follicular', label: 'Follicular' },
		{ value: 'ovulation', label: 'Ovulation' },
		{ value: 'luteal', label: 'Luteal' }
	];

	let categoryChoices = [
		{ value: IngredientCategory.PROTEIN, label: IngredientCategory.PROTEIN },
		{ value: IngredientCategory.DAIRY, label: IngredientCategory.DAIRY },
		{ value: IngredientCategory.FRUIT, label: IngredientCategory.FRUIT },
		{ value: IngredientCategory.VEGETABLE, label: IngredientCategory.VEGETABLE },
		{ value: IngredientCategory.SPICE, label: IngredientCategory.SPICE },
		{ value: IngredientCategory.GRAIN, label: IngredientCategory.GRAIN },
		{ value: IngredientCategory.OTHER, label: IngredientCategory.OTHER }
	];

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
		<input type="text" placeholder="Search for an ingredient" />
	</article>
	<article>
		<label for="categoryFilter">Category:</label>
		<Select items={categoryChoices} multiple />
	</article>
	<article>
		<label for="phaseFilter">Phase:</label>
		<Select items={phaseChoices} multiple />
	</article>
	<article>
		<button>Clear Filters</button>
	</article>
</section>

<section>
	<p>Showing x / {ingredients.length} ingredients</p>
</section>

<section>
	{#if ingredients.length === 0}
		<p>No ingredients yet. Add your first ingredient!</p>
	{/if}

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
						<ul>
							{#each ingredient.beneficialPhases as phase, id (id)}
								<li class={phase}>
									{phase}
								</li>
							{/each}
						</ul>
					</td>
					<td>{ingredient.notes}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</section>

<style>
	.menstrual {
		color: red;
	}

	.follicular {
		color: blue;
	}

	.ovulation {
		color: green;
	}

	.luteal {
		color: yellow;
	}
</style>
