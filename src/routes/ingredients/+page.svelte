<script lang="ts">
	import {
		addIngredient,
		getIngredients,
		removeIngredient,
		updateIngredient
	} from '$lib/stores/state.svelte';
	import { CyclePhase, IngredientCategory, Unit, type Ingredient } from '$lib/types';

	let ingredients = $derived(getIngredients());
	let filteredIngredients: Ingredient[] = $derived.by(() => {
		let filtered = ingredients;

		// Filter by search term
		if (filters.search.trim()) {
			filtered = filtered.filter((ingredient) =>
				ingredient.name.toLowerCase().includes(filters.search.toLowerCase())
			);
		}

		// Filter by category
		if (filters.categories.length > 0) {
			filtered = filtered.filter((ingredient) => filters.categories.includes(ingredient.category));
		}

		// Filter by phase
		if (filters.phases.length > 0) {
			filtered = filtered.filter((ingredient) =>
				filters.phases.some((phase) => ingredient.beneficialPhases.includes(phase))
			);
		}

		return filtered;
	});

	let addIngredientDialog: HTMLDialogElement;
	let confirmationDialog: HTMLDialogElement;

	let filters = $state({
		search: '',
		categories: [] as IngredientCategory[],
		phases: [] as CyclePhase[]
	});

	let deletingIngredient = $state<Ingredient | null>(null);
	let editingIngredient = $state<Ingredient | null>(null);
	let validationErrors = $state<Record<string, string>>({});
	let formData = $state({
		name: '',
		category: null,
		unit: null,
		beneficialPhases: [] as CyclePhase[],
		notes: ''
	});

	function clearFilters() {
		filters = {
			search: '',
			categories: [],
			phases: []
		};
	}

	function toggleCategory(category: IngredientCategory) {
		if (filters.categories.includes(category)) {
			filters.categories = filters.categories.filter((c) => c !== category);
		} else {
			filters.categories = [...filters.categories, category];
		}
	}

	function togglePhase(phase: CyclePhase) {
		if (filters.phases.includes(phase)) {
			filters.phases = filters.phases.filter((p) => p !== phase);
		} else {
			filters.phases = [...filters.phases, phase];
		}
	}

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
	<h2>{editingIngredient ? 'Edit Ingredient' : 'Add Ingredient'}</h2>
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
		<textarea name="notes" placeholder="Notes (optional)" rows="3" bind:value={formData.notes}>
		</textarea>
		<div class="form-buttons">
			<input type="button" value="Cancel" onclick={closeAddIngredientDialog} />
			<input type="submit" value={editingIngredient ? 'Update Ingredient' : 'Add Ingredient'} />
		</div>
	</form>
</dialog>

<dialog bind:this={confirmationDialog}>
	<h2>Delete Ingredient</h2>
	<p>Are you sure you want to delete this ingredient?</p>
	<div class="form-buttons">
		<input type="button" value="Cancel" onclick={closeConfirmationDialog} />
		<input type="button" value="Delete" onclick={deleteIngredient} />
	</div>
</dialog>

<section class="filters">
	<article class="filter">
		<p>Category:</p>
		<div class="filter-choices">
			{#each Object.values(IngredientCategory) as category (category)}
				<button
					class:active={filters.categories.includes(category)}
					class="capitalize"
					onclick={() => toggleCategory(category)}>{category}</button
				>
			{/each}
		</div>
	</article>
	<article class="filter">
		<p>Phase:</p>
		<div class="filter-choices">
			{#each Object.values(CyclePhase) as phase (phase)}
				<button
					class:active={filters.phases.includes(phase)}
					class="capitalize"
					onclick={() => togglePhase(phase)}>{phase}</button
				>
			{/each}
		</div>
	</article>
	<article class="filter-actions">
		<button onclick={clearFilters}>Clear Filters</button>
		<input type="search" bind:value={filters.search} placeholder="Search ingredients..." />
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
			{#each filteredIngredients as ingredient (ingredient.id)}
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
						<div class="action-buttons">
							<button onclick={() => handleEditIngredient(ingredient)}>Edit</button>
							<button class="danger" onclick={() => handleDeleteIngredient(ingredient)}
								>Delete</button
							>
						</div>
					</td>
				</tr>
			{:else}
				{#if filters.search.trim() || filters.categories.length > 0 || filters.phases.length > 0}
					<tr>
						<td colspan="5" class="empty-state">
							<div class="empty-state-content">
								<p class="empty-state-title">No ingredients found</p>
								<p class="empty-state-subtitle">Try adjusting your filters</p>
							</div>
						</td>
					</tr>
				{:else}
					<tr>
						<td colspan="5" class="empty-state">
							<div class="empty-state-content">
								<p class="empty-state-title">No ingredients yet</p>
								<p class="empty-state-subtitle">Click "Add Ingredient" to get started</p>
							</div>
						</td>
					</tr>
				{/if}
			{/each}
		</tbody>
	</table>
</section>

<style>
	/* Header */
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
	}

	header h1 {
		margin: 0;
		font-size: 2rem;
	}

	header nav button {
		padding: 0.6rem 1.2rem;
		font-weight: 500;
	}

	/* Dialog */
	dialog {
		background: var(--bg-surface);
		color: var(--text);
		border: 1px solid var(--border);
		border-radius: 12px;
		padding: 2rem;
		min-width: 400px;
		max-width: 500px;
		box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(4px);
	}

	dialog h2 {
		margin-top: 0;
		margin-bottom: 1rem;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.form-buttons {
		align-self: flex-end;
	}

	textarea {
		resize: vertical;
		min-height: 80px;
		font-family: inherit;
	}

	.error {
		color: #ef4444;
		font-size: 0.85rem;
		margin-top: -0.5rem;
	}

	/* Filters */
	.filters {
		display: flex;
		flex-wrap: wrap;
		gap: 2rem;
		padding: 1.5rem;
		background: var(--bg-surface);
		border: 1px solid var(--border);
		border-radius: 8px;
		margin-bottom: 1.5rem;
	}

	.filter {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.filter > p {
		margin: 0;
		font-weight: 600;
		font-size: 0.9rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.filter-choices {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		max-width: 40vw;
	}

	.filter-choices button {
		min-width: 50px;
		background: var(--bg-surface-2);
		font-size: 0.9rem;
		transition: all 0.2s ease;
	}

	.filter-choices button:hover:not(.active) {
		background: var(--bg-surface);
		transform: translateY(-1px);
	}

	.filter-choices button.active {
		background: var(--accent);
		color: white;
		border-color: var(--accent);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.filter-actions {
		display: flex;
		align-items: flex-end;
		gap: 1rem;
		margin-left: auto;
	}

	.filter-actions button {
		white-space: nowrap;
	}

	input[type='search'] {
		min-width: 200px;
		padding: 0.5rem 1rem;
	}

	/* Table */
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

	tbody tr {
		transition: background-color 0.15s ease;
	}

	tbody tr:hover {
		background: var(--bg-surface);
	}

	td:nth-child(2) {
		text-transform: capitalize;
	}

	/* Action buttons */
	.action-buttons {
		display: flex;
		gap: 0.5rem;
	}

	.action-buttons button {
		padding: 0.35rem 0.75rem;
		font-size: 0.85rem;
	}

	button.danger {
		color: #ef4444;
		border-color: #ef4444;
	}

	button.danger:hover {
		background: #ef4444;
		color: white;
	}

	/* Badges */
	.badge {
		display: inline-block;
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		font-size: 0.85rem;
		margin-right: 0.25rem;
		font-weight: 500;
	}

	.menstrual {
		background: var(--badge-menstrual-bg);
		color: var(--badge-menstrual-text);
	}

	.follicular {
		background: var(--badge-follicular-bg);
		color: var(--badge-follicular-text);
	}

	.ovulation {
		background: var(--badge-ovulation-bg);
		color: var(--badge-ovulation-text);
	}

	.luteal {
		background: var(--badge-luteal-bg);
		color: var(--badge-luteal-text);
	}

	/* Empty state */
	.empty-state {
		text-align: center;
		padding: 3rem 1rem !important;
	}

	.empty-state-content {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.empty-state-title {
		margin: 0;
		font-size: 1.1rem;
		font-weight: 600;
	}

	.empty-state-subtitle {
		margin: 0;
		font-size: 0.9rem;
		color: var(--text-muted);
	}

	/* Utilities */
	.capitalize {
		text-transform: capitalize;
	}
</style>
