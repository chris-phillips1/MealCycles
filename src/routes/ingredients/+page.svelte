<script lang="ts">
	import { appState } from '$lib/stores/state.svelte';
	import { CyclePhase, IngredientCategory, Unit, type Ingredient } from '$lib/types';
	import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';

	// ========== DIALOGS ==========
	let formDialog: HTMLDialogElement;
	let confirmDialog: ConfirmDialog;

	// ========== FILTERS ==========
	let filters = $state({
		search: '',
		categories: [] as IngredientCategory[],
		phases: [] as CyclePhase[]
	});

	let filteredIngredients = $derived.by(() => {
		return appState.ingredients
			.filter(
				(i) => !filters.search.trim() || i.name.toLowerCase().includes(filters.search.toLowerCase())
			)
			.filter((i) => !filters.categories.length || filters.categories.includes(i.category))
			.filter(
				(i) => !filters.phases.length || filters.phases.some((p) => i.beneficialPhases.includes(p))
			);
	});

	function toggleCategory(category: IngredientCategory) {
		filters.categories = filters.categories.includes(category)
			? filters.categories.filter((c) => c !== category)
			: [...filters.categories, category];
	}

	function togglePhase(phase: CyclePhase) {
		filters.phases = filters.phases.includes(phase)
			? filters.phases.filter((p) => p !== phase)
			: [...filters.phases, phase];
	}

	function clearFilters() {
		filters = { search: '', categories: [], phases: [] };
	}

	// ========== FORM MANAGEMENT ==========
	let editingIngredient = $state<Ingredient | null>(null);
	let validationErrors = $state<Record<string, string>>({});
	let formData = $state({
		name: '',
		category: null as IngredientCategory | null,
		unit: null as Unit | null,
		beneficialPhases: [] as CyclePhase[],
		notes: ''
	});

	function openForm(ingredient?: Ingredient) {
		editingIngredient = ingredient ?? null;
		formData = ingredient
			? {
					name: ingredient.name,
					category: ingredient.category,
					unit: ingredient.unit,
					beneficialPhases: ingredient.beneficialPhases,
					notes: ingredient.notes ?? ''
				}
			: {
					name: '',
					category: null,
					unit: null,
					beneficialPhases: [],
					notes: ''
				};
		validationErrors = {};
		formDialog?.showModal();
	}

	function closeForm() {
		formDialog?.close();
		editingIngredient = null;
		validationErrors = {};
	}

	function validateForm() {
		const errors: Record<string, string> = {};
		if (!formData.name.trim()) errors.name = 'Name is required';
		if (!formData.category) errors.category = 'Category is required';
		if (!formData.unit) errors.unit = 'Unit is required';
		if (!formData.beneficialPhases.length) errors.beneficialPhases = 'Select at least one phase';
		return Object.keys(errors).length ? errors : null;
	}

	function saveIngredient(e: SubmitEvent) {
		e.preventDefault();

		const errors = validateForm();
		if (errors) {
			validationErrors = errors;
			return;
		}

		const data = {
			name: formData.name,
			category: formData.category!,
			unit: formData.unit!,
			beneficialPhases: formData.beneficialPhases,
			notes: formData.notes
		};

		if (editingIngredient) {
			appState.updateIngredient(editingIngredient.id, data);
		} else {
			appState.addIngredient(data);
		}

		closeForm();
	}

	// ========== DELETE ==========
	let deletingIngredient = $state<Ingredient | null>(null);

	function confirmDelete(ingredient: Ingredient) {
		deletingIngredient = ingredient;
		confirmDialog.show();
	}

	function deleteIngredient() {
		if (deletingIngredient) {
			appState.removeIngredient(deletingIngredient.id);
		}
	}
</script>

<!-- Dialogs -->
<dialog bind:this={formDialog} onclose={closeForm}>
	<h2>{editingIngredient ? 'Edit' : 'Add'} Ingredient</h2>
	<form onsubmit={saveIngredient}>
		<input
			type="text"
			placeholder="Name"
			bind:value={formData.name}
			oninput={() => (validationErrors.name = '')}
		/>
		{#if validationErrors.name}<span class="error">{validationErrors.name}</span>{/if}

		<select bind:value={formData.category} oninput={() => (validationErrors.category = '')}>
			<option value={null}>Select category...</option>
			{#each Object.values(IngredientCategory) as cat (cat)}
				<option value={cat}>{cat}</option>
			{/each}
		</select>
		{#if validationErrors.category}<span class="error">{validationErrors.category}</span>{/if}

		<select bind:value={formData.unit} oninput={() => (validationErrors.unit = '')}>
			<option value={null}>Select unit...</option>
			{#each Object.values(Unit) as unit (unit)}
				<option value={unit}>{unit}</option>
			{/each}
		</select>
		{#if validationErrors.unit}<span class="error">{validationErrors.unit}</span>{/if}

		{#each Object.values(CyclePhase) as phase (phase)}
			<label class="capitalize">
				<input
					type="checkbox"
					value={phase}
					bind:group={formData.beneficialPhases}
					oninput={() => (validationErrors.beneficialPhases = '')}
				/>
				{phase}
			</label>
		{/each}
		{#if validationErrors.beneficialPhases}<span class="error"
				>{validationErrors.beneficialPhases}</span
			>{/if}

		<textarea placeholder="Notes (optional)" rows="3" bind:value={formData.notes}></textarea>

		<div class="form-buttons">
			<button type="button" onclick={closeForm}>Cancel</button>
			<button type="submit">{editingIngredient ? 'Update' : 'Add'}</button>
		</div>
	</form>
</dialog>

<ConfirmDialog
	bind:this={confirmDialog}
	title="Delete Ingredient"
	message="Are you sure you want to delete this ingredient?"
	onConfirm={deleteIngredient}
/>

<!-- Header -->
<header>
	<h1>Ingredients</h1>
	<button onclick={() => openForm()}>Add Ingredient</button>
</header>

<!-- Filters -->
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
		<input type="search" bind:value={filters.search} placeholder="Search..." />
	</article>
</section>

<!-- Table -->
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
					<td class="capitalize">{ingredient.category}</td>
					<td>
						{#each ingredient.beneficialPhases as phase (phase)}
							<span class="badge {phase}">{phase}</span>
						{/each}
					</td>
					<td>{ingredient.notes ?? ''}</td>
					<td>
						<div class="action-buttons">
							<button onclick={() => openForm(ingredient)}>Edit</button>
							<button class="danger" onclick={() => confirmDelete(ingredient)}>Delete</button>
						</div>
					</td>
				</tr>
			{:else}
				{#if filters.search || filters.categories.length || filters.phases.length}
					<tr
						><td colspan="5" class="empty-state">
							<div class="empty-state-content">
								<p class="empty-state-title">No ingredients found</p>
								<p class="empty-state-subtitle">Try adjusting your filters</p>
							</div>
						</td></tr
					>
				{:else}
					<tr
						><td colspan="5" class="empty-state">
							<div class="empty-state-content">
								<p class="empty-state-title">No ingredients yet</p>
								<p class="empty-state-subtitle">Click "Add Ingredient" to get started</p>
							</div>
						</td></tr
					>
				{/if}
			{/each}
		</tbody>
	</table>
</section>

<style>
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

	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	/* Form Dialog */
	dialog {
		background: var(--bg-surface);
		color: var(--text);
		border: 1px solid var(--border);
		border-radius: 12px;
		padding: 2rem;
		min-width: 500px;
		max-width: 600px;
		box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(4px);
	}

	dialog h2 {
		margin: 0 0 1.5rem 0;
		font-size: 1.5rem;
		color: var(--text);
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	/* Form inputs */
	input[type='text'],
	select,
	textarea {
		width: 100%;
		font-size: 1rem;
	}

	textarea {
		resize: vertical;
		min-height: 80px;
		font-family: inherit;
	}

	/* Checkbox group */
	label.capitalize {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem;
		border-radius: 4px;
		transition: background-color 0.15s ease;
		cursor: pointer;
	}

	label.capitalize:hover {
		background: var(--bg-surface-2);
	}

	label.capitalize input[type='checkbox'] {
		width: auto;
		cursor: pointer;
	}

	/* Error messages */
	.error {
		color: #ef4444;
		font-size: 0.85rem;
		margin-top: -0.5rem;
		display: block;
	}

	/* Form actions */
	.form-buttons {
		display: flex;
		gap: 0.75rem;
		justify-content: flex-end;
		margin-top: 0.5rem;
		padding-top: 0.5rem;
		border-top: 1px solid var(--border);
	}

	.form-buttons button {
		padding: 0.6rem 1.25rem;
		font-weight: 500;
	}

	.form-buttons button[type='button'] {
		background: var(--bg-surface-2);
		border-color: var(--border);
	}

	.form-buttons button[type='submit'] {
		background: var(--accent);
		color: white;
		border-color: var(--accent);
	}

	.form-buttons button[type='submit']:hover {
		background: var(--accent-hover);
		border-color: var(--accent-hover);
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
