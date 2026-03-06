<script lang="ts">
	import { DEFAULT_INGREDIENT_FILTERS } from '$lib/constants';
	import { CyclePhase, IngredientCategory, type IngredientFilters } from '$lib/types';
	import { toggleArrayItem } from '$lib/utils/array';

	let { filters = $bindable() }: { filters: IngredientFilters } = $props();

	function clearFilters() {
		filters = { ...DEFAULT_INGREDIENT_FILTERS };
	}
</script>

{#snippet filterGroup<T extends string>(
	label: string,
	values: T[],
	active: T[],
	onToggle: (v: T) => void
)}
	<div class="filter-group">
		<span>{label}:</span>
		{#each values as value (value)}
			<button class:active={active.includes(value)} onclick={() => onToggle(value)}>{value}</button>
		{/each}
	</div>
{/snippet}

<section>
	{@render filterGroup(
		'Category',
		Object.values(IngredientCategory),
		filters.categories,
		(v: IngredientCategory) => (filters.categories = toggleArrayItem(filters.categories, v))
	)}

	{@render filterGroup(
		'Phase',
		Object.values(CyclePhase),
		filters.phases,
		(v: CyclePhase) => (filters.phases = toggleArrayItem(filters.phases, v))
	)}

	<div class="filter-actions">
		<button onclick={clearFilters}>Clear Filters</button>
		<input type="search" bind:value={filters.search} placeholder="Search..." />
	</div>
</section>

<style>
	section {
		display: flex;
		padding: 1.5rem;
		background: var(--bg-surface);
		border: 1px solid var(--border);
		border-radius: 8px;
	}

	.filter-group {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		max-width: 40vw;
	}

	.filter-group span {
		flex-basis: 100%;
	}

	.filter-group button:hover:not(.active) {
		background: var(--bg-surface);
		transform: translateY(-1px);
	}

	.filter-group button.active {
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
</style>
