<script lang="ts">
	import { addIngredient, getIngredients } from '$lib/stores/state.svelte';
	import { CyclePhase, IngredientCategory, Unit, type Ingredient } from '$lib/types';

	const filters = $state({
		categories: [],
		phases: []
	});

	const ingredientFields = $state({
		name: '',
		category: '',
		unit: '',
		beneficialPhases: [],
		notes: ''
	});

	let ingredients = $derived(getIngredients());
	let dialog: HTMLDialogElement;

	function onsubmit(event: Event) {
		event.preventDefault();

		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		const ingredientData = {
			name: formData.get('name') as string,
			category: formData.get('category') as IngredientCategory,
			unit: formData.get('unit') as Unit,
			beneficialPhases: formData.getAll('beneficialPhases') as CyclePhase[],
			notes: formData.get('notes') as string
		};

		if (ingredientData.beneficialPhases.length === 0) {
			alert('Please select at least one beneficial phase');
			return;
		}

		addIngredient(ingredientData);

		form.reset();
		dialog.close();
	}

	function openDialog(ingredient: Ingredient) {
		ingredientFields.name = ingredient.name;
		ingredientFields.category = ingredient.category;
		ingredientFields.unit = ingredient.unit;
		ingredientFields.beneficialPhases = ingredient.beneficialPhases;
		ingredientFields.notes= ingredient.notes;
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
		<form method="dialog" {onsubmit}>
			<label for="ingredient-name">Name:</label>
			<input
				type="text"
				name="name"
				id="ingredient-name"
				bind:value={ingredientFields.name}
				required
			/>

			<label for="ingredient-category">Category:</label>
			<select name="category" id="ingredient-category" bind:value={ingredientFields.category}>
				{#each Object.values(IngredientCategory) as category (category)}
					<option value={category}>{category}</option>
				{/each}
			</select>

			<label for="ingredient-unit">Unit:</label>
			<select name="unit" id="ingredient-unit" bind:value={ingredientFields.unit}>
				{#each Object.values(Unit) as unit (unit)}
					<option value={unit}>{unit}</option>
				{/each}
			</select>

			<fieldset>
				<legend>Beneficial Phases: (select at least one)</legend>
				{#each Object.values(CyclePhase) as phase (phase)}
					<label>
						<input
							type="checkbox"
							name="beneficialPhases"
							value={phase}
							bind:group={ingredientFields.beneficialPhases}
						/>
						{phase}
					</label>
				{/each}
			</fieldset>

			<label for="ingredient-notes">Notes:</label>
			<textarea name="notes" id="ingredient-notes" bind:value={ingredientFields.notes}></textarea>

			<div class="ingredient-form-buttons">
				<input type="button" value="Cancel" onclick={closeDialog} />
				<input type="submit" />
			</div>
		</form>
	</dialog>
</section>

<section class="filters">
	<article class="filter">
		<label for="categoryFilter">Category:</label>
		<select name="category" id="categoryFilter" multiple bind:value={filters.categories}>
			{#each Object.values(IngredientCategory) as category (category)}
				<option value={category}>{category}</option>
			{/each}
		</select>
	</article>
	<article class="filter">
		<label for="phaseFilter">Phase:</label>
		<select name="phases" id="phaseFilter" multiple bind:value={filters.phases}>
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
			<thead>
				<tr>
					<th scope="col">Name</th>
					<th scope="col">Category</th>
					<th scope="col">Unit</th>
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
						<td>{ingredient.unit}</td>
						<td>
							{#each ingredient.beneficialPhases as phase (phase)}
								<span class="phase-badge {phase}">{phase}</span>
							{/each}
						</td>
						<td>{ingredient.notes}</td>
						<td>
							<button>Edit</button>
							<button>Delete</button>
						</td>
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

	fieldset {
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
