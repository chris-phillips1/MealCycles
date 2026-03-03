<script lang="ts">
	import { addIngredient, getIngredients } from '$lib/stores/state.svelte';
	import { CyclePhase, IngredientCategory, Unit } from '$lib/types';

	let ingredients = $derived(getIngredients());

	// Dialog variables
	let addIngredientDialog: HTMLDialogElement;

	// Form variables
	let formData = $state({
		name: '',
		category: null,
		unit: null,
		beneficialPhases: [] as CyclePhase[],
		notes: ''
	});

	function validateForm(data: typeof formData) {
		const errors: Record<string, string> = {};

		if (!data.name.trim()) {
			errors.name = 'Name is required';
		}

		if (!data.category) {
			errors.category = 'Category is required';
		}

		if (!data.unit) {
			errors.unit = 'Unit is required';
		}

		if (data.beneficialPhases.length === 0) {
			errors.beneficialPhases = 'Select at least one phase';
		}

		return Object.keys(errors).length > 0 ? errors : null;
	}

	function openAddIngredientDialog() {
		addIngredientDialog.showModal();
	}

	function closeAddIngredientDialog() {
		addIngredientDialog.close();
	}

	function handleAddIngredient() {
		openAddIngredientDialog();
	}

	function handleAddIngredientClose() {
		console.log('Dialog closed');
	}

	function handleAddIngredientSubmit() {
		closeAddIngredientDialog();

		const validationErrors = validateForm(formData);
		if (validationErrors) {
			return;
		}

		addIngredient({
			name: formData.name,
			category: formData.category!,
			unit: formData.unit!,
			beneficialPhases: formData.beneficialPhases,
			notes: formData.notes
		});
	}
</script>

<header>
	<h1>Ingredients</h1>
	<nav>
		<button onclick={handleAddIngredient}>Add Ingredient</button>
	</nav>
</header>

<pre>{JSON.stringify(formData, null, 2)}</pre>

<dialog
	bind:this={addIngredientDialog}
	onclose={handleAddIngredientClose}
	onsubmit={handleAddIngredientSubmit}
>
	<form>
		<input type="text" name="name" placeholder="Name" bind:value={formData.name} />
		<select name="category" bind:value={formData.category}>
			{#each Object.values(IngredientCategory) as category (category)}
				<option value={category}>{category}</option>
			{/each}
		</select>

		<select name="unit" bind:value={formData.unit}>
			{#each Object.values(Unit) as unit (unit)}
				<option value={unit}>{unit}</option>
			{/each}
		</select>

		{#each Object.values(CyclePhase) as phase (phase)}
			<label class="capitalize">
				<input type="checkbox" value={phase} bind:group={formData.beneficialPhases} />
				{phase}
			</label>
		{/each}
		<textarea name="notes" placeholder="Notes" bind:value={formData.notes}></textarea>
		<input type="button" value="Cancel" onclick={closeAddIngredientDialog} />
		<input type="submit" value="Add Ingredient" />
	</form>
</dialog>

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
					<td colspan="5">No ingredients yet!</td>
				</tr>
			{/each}
		</tbody>
	</table>
</section>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	header h1 {
		margin: 0;
	}

	header nav {
		align-self: center;
	}

	header nav button {
		max-height: 100%;
		padding: 0.5rem;
	}

	.capitalize {
		text-transform: capitalize;
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
