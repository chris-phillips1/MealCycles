<script lang="ts">
	import { appState } from '$lib/stores/state.svelte';
	import { type Ingredient } from '$lib/types';
	import IngredientFilters from '$lib/components/IngredientFilters.svelte';
	import { DEFAULT_INGREDIENT_FILTERS } from '$lib/constants';
	import IngredientForm from '$lib/components/IngredientForm.svelte';
	import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';
	import IngredientTable from '$lib/components/IngredientTable.svelte';

	// ========== DIALOGS ==========
	let form: IngredientForm;
	let confirm: ConfirmDialog;

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
<IngredientTable
	ingredients={filteredIngredients}
	isFiltered={!!(filters.search || filters.categories.length || filters.phases.length)}
	onEdit={(ingredient: Ingredient) => form.open(ingredient)}
	onDelete={confirmDelete}
/>
<IngredientForm bind:this={form} />
<ConfirmDialog
	bind:this={confirm}
	title="Delete Ingredient"
	message="Are you sure? This cannot be undone."
	variant="danger"
	confirmLabel="Delete"
	onConfirm={deleteIngredient}
/>

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
</style>
