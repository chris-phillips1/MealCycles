<script lang="ts">
	import {
		addIngredient,
		getIngredients,
		removeIngredient,
		updateIngredient
	} from '$lib/stores/state.svelte';
	import { CyclePhase, IngredientCategory, Unit, type Ingredient } from '$lib/types';

	let ingredients = $derived(getIngredients());
	let deletingIngredient = $state<Ingredient | null>(null);

	// Dialog variables
	let addIngredientDialog: HTMLDialogElement;
	let confirmationDialog: HTMLDialogElement;

	// Form variables
	let editingIngredient = $state<Ingredient | null>(null);
	let validationErrors = $state<Record<string, string>>({});
	let formData = $state({
		name: '',
		category: null,
		unit: null,
		beneficialPhases: [] as CyclePhase[],
		notes: ''
	});

	function handleEditIngredient(ingredient: Ingredient) {
		editingIngredient = ingredient;
		formData = {
			name: ingredient.name,
			category: ingredient.category,
			unit: ingredient.unit,
			beneficialPhases: ingredient.beneficialPhases,
			notes: ingredient.notes ?? ''
		};
		validationErrors = {};

		openAddIngredientDialog();
	}

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

	function openConfirmationDialog() {
		confirmationDialog?.showModal();
	}

	function closeConfirmationDialog() {
		confirmationDialog?.close();
	}

	function handleDeleteIngredient(ingredient: Ingredient) {
		deletingIngredient = ingredient;
		openConfirmationDialog();
	}

	function deleteIngredient() {
		if (deletingIngredient?.id) {
			removeIngredient(deletingIngredient!.id);
			closeConfirmationDialog();
		}
	}

	function openAddIngredientDialog() {
		addIngredientDialog?.showModal();
	}

	function closeAddIngredientDialog() {
		addIngredientDialog?.close();
	}

	function handleAddIngredient() {
		editingIngredient = null;
		formData = {
			name: '',
			category: null,
			unit: null,
			beneficialPhases: [] as CyclePhase[],
			notes: ''
		};
		validationErrors = {};
		openAddIngredientDialog();
	}

	function handleAddIngredientClose() {
		resetForm();
	}

	function handleAddIngredientSubmit(e: SubmitEvent) {
		e.preventDefault();

		const errors = validateForm(formData);
		if (errors) {
			validationErrors = errors;
			return;
		}

		if (editingIngredient) {
			updateIngredient(editingIngredient.id, {
				name: formData.name,
				category: formData.category!,
				unit: formData.unit!,
				beneficialPhases: formData.beneficialPhases,
				notes: formData.notes
			});
		} else {
			addIngredient({
				name: formData.name,
				category: formData.category!,
				unit: formData.unit!,
				beneficialPhases: formData.beneficialPhases,
				notes: formData.notes
			});
		}

		closeAddIngredientDialog();
		resetForm();
	}

	function resetForm() {
		formData = {
			name: '',
			category: null,
			unit: null,
			beneficialPhases: [] as CyclePhase[],
			notes: ''
		};

		validationErrors = {};
		editingIngredient = null;
	}
</script>

<header>
	<h1>Ingredients</h1>
	<nav>
		<button onclick={handleAddIngredient}>Add Ingredient</button>
	</nav>
</header>

<dialog bind:this={addIngredientDialog} onclose={handleAddIngredientClose}>
	<form onsubmit={handleAddIngredientSubmit}>
		<input
			type="text"
			name="name"
			placeholder="Name"
			bind:value={formData.name}
			oninput={() => {
				validationErrors.name = '';
			}}
		/>
		{#if validationErrors.name}
			<span class="error">{validationErrors.name}</span>
		{/if}
		<select
			name="category"
			bind:value={formData.category}
			oninput={() => {
				validationErrors.category = '';
			}}
		>
			<option value={null}>Select a category...</option>
			{#each Object.values(IngredientCategory) as category (category)}
				<option value={category}>{category}</option>
			{/each}
		</select>
		{#if validationErrors.category}
			<span class="error">{validationErrors.category}</span>
		{/if}

		<select
			name="unit"
			bind:value={formData.unit}
			oninput={() => {
				validationErrors.unit = '';
			}}
		>
			<option value={null}>Select a unit...</option>
			{#each Object.values(Unit) as unit (unit)}
				<option value={unit}>{unit}</option>
			{/each}
		</select>
		{#if validationErrors.unit}
			<span class="error">{validationErrors.unit}</span>
		{/if}

		{#each Object.values(CyclePhase) as phase (phase)}
			<label class="capitalize">
				<input
					type="checkbox"
					value={phase}
					bind:group={formData.beneficialPhases}
					oninput={() => {
						validationErrors.beneficialPhases = '';
					}}
				/>
				{phase}
			</label>
		{/each}
		{#if validationErrors.beneficialPhases}
			<span class="error">{validationErrors.beneficialPhases}</span>
		{/if}
		<textarea name="notes" placeholder="Notes" bind:value={formData.notes}></textarea>
		<input type="button" value="Cancel" onclick={closeAddIngredientDialog} />
		<input type="submit" value={editingIngredient ? 'Update Ingredient' : 'Add Ingredient'} />
	</form>
</dialog>

<dialog bind:this={confirmationDialog}>
	<p>Are you sure you want to delete this ingredient?</p>
	<input type="button" value="Cancel" onclick={closeConfirmationDialog} />
	<input type="button" value="Delete" onclick={deleteIngredient} />
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
						<button onclick={() => handleEditIngredient(ingredient)}>Edit</button>
						<button onclick={() => handleDeleteIngredient(ingredient)}>Delete</button>
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

	form {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
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
