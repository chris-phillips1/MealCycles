<script lang="ts">
	import { DEFAULT_INGREDIENT_FILTERS } from '$lib/constants';
	import { type Ingredient } from '$lib/types';
	import { appState } from '$lib/stores/state.svelte';
	import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';
	import IngredientFilters from '$lib/components/ingredientComponents/IngredientFilters.svelte';
	import IngredientForm from '$lib/components/ingredientComponents/IngredientForm.svelte';
	import IngredientTable from '$lib/components/ingredientComponents/IngredientTable.svelte';

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

	let deletingIngredient = $state<Ingredient | null>(null);

	function confirmDelete(ingredient: Ingredient) {
		deletingIngredient = ingredient;
		confirm.open();
	}
</script>

<header>
	<h1>Ingredients</h1>
	<button onclick={() => form.open()}>Add Ingredient</button>
</header>

<IngredientFilters bind:filters />
<IngredientTable
	ingredients={filteredIngredients}
	isFiltered={!!(filters.search || filters.categories.length || filters.phases.length)}
	onEdit={(ingredient) => form.open(ingredient)}
	onDelete={confirmDelete}
/>
<IngredientForm bind:this={form} />
<ConfirmDialog
	bind:this={confirm}
	title="Delete Ingredient"
	message="Are you sure? This cannot be undone."
	variant="danger"
	confirmLabel="Delete"
	onConfirm={() => deletingIngredient && appState.removeIngredient(deletingIngredient.id)}
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
