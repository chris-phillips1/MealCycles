<script lang="ts">
	import { appState } from '$lib/stores/state.svelte';
	import { type Ingredient } from '$lib/types';
	import IngredientFilters from '$lib/components/IngredientFilters.svelte';
	import { DEFAULT_INGREDIENT_FILTERS } from '$lib/constants';
	import IngredientForm from '$lib/components/IngredientForm.svelte';
	import BasicDialog from '$lib/components/BasicDialog.svelte';

	// ========== DIALOGS ==========
	let form: IngredientForm;
	let confirm: BasicDialog;

	let filters = $state({ ...DEFAULT_INGREDIENT_FILTERS });

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

	// ========== DELETE ==========
	let deletingIngredient = $state<Ingredient | null>(null);

	function confirmDelete(ingredient: Ingredient) {
		deletingIngredient = ingredient;
		confirm.open();
	}

	function deleteIngredient() {
		if (deletingIngredient) {
			appState.removeIngredient(deletingIngredient.id);
		}
	}
</script>

<!-- Header -->
<header>
	<h1>Ingredients</h1>
	<button onclick={() => form.open()}>Add Ingredient</button>
</header>

<IngredientFilters bind:filters />
<!-- <IngredientTable
	{filters}
	onEdit={(ingredient) => form.open(ingredient)}
	onDelete={confirmDelete}
/> -->
<IngredientForm bind:this={form} />
<BasicDialog
	bind:this={confirm}
	title="Delete Ingredient"
	message="Are you sure you want to delete this ingredient?"
	cancelDetails={{ label: 'Cancel' }}
	confirmDetails={{ label: 'Delete', onConfirm: deleteIngredient }}
/>

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
							<button onclick={() => form.open(ingredient)}>Edit</button>
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
