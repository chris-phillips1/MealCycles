<script lang="ts">
	import { DEFAULT_INGREDIENT_FILTERS } from '$lib/constants';
	import { CyclePhase, IngredientCategory, type IngredientFilters } from '$lib/types';
	import { toggleArrayItem } from '$lib/utils/array';

	let { filters = $bindable() }: { filters: IngredientFilters } = $props();

	function resetFilters() {
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
		<span class="filter-label">{label}:</span>
		<div class="filter-buttons">
			{#each values as value (value)}
				<button
					class="filter-btn"
					class:active={active.includes(value)}
					onclick={() => onToggle(value)}>{value}</button
				>
			{/each}
		</div>
	</div>
{/snippet}

<section class="filters">
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

	.filter-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.filter-buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.filter-label {
		display: block;
		font-weight: 600;
		font-size: 0.9rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.filter-btn {
		text-transform: capitalize;
	}

	.filter-btn:hover:not(.active) {
		background: var(--bg-surface);
		transform: translateY(-1px);
	}

	.filter-btn.active {
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

	.filter-actions input {
		min-width: 200px;
		padding: 0.5rem 1rem;
	}
</style>
