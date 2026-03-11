<script lang="ts">
	import { DEFAULT_INGREDIENT_FILTERS } from '$lib/constants';
	import { CyclePhase, IngredientCategory, type IngredientFilters } from '$lib/types';
	import ButtonSelector from '$lib/components/ButtonSelector.svelte';

	let { filters = $bindable() }: { filters: IngredientFilters } = $props();

	function resetFilters() {
		filters = { ...DEFAULT_INGREDIENT_FILTERS };
	}
</script>

<section class="filters">
	<ButtonSelector
		buttonOptions={Object.values(IngredientCategory)}
		bind:selectedButtons={filters.categories}
	/>

	<ButtonSelector buttonOptions={Object.values(CyclePhase)} bind:selectedButtons={filters.phases} />

	<div class="filter-actions">
		<button onclick={resetFilters}>Clear Filters</button>
		<input type="search" bind:value={filters.search} placeholder="Search..." />
	</div>
</section>

<style>
	.filters {
		display: flex;
		flex-wrap: wrap;
		gap: 2rem;
		padding: 1.5rem;
		background: var(--bg-surface);
		border: 1px solid var(--border);
		border-radius: 8px;
	}

	.filter-actions {
		display: flex;
		align-items: flex-end;
		gap: 1rem;
		margin-left: auto;
	}

	.filter-actions input {
		min-width: 200px;
		padding: 0.5rem 1rem;
	}
</style>
