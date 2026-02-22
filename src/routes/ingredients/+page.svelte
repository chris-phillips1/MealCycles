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
		<input type="text" placeholder="Search for an ingredient" />
	</article>
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
