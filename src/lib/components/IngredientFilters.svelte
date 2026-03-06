<script lang="ts">
	import { CyclePhase, IngredientCategory } from '$lib/types';
	import { toggleArrayItem } from '$lib/utils/array';
	let { filters = $bindable() } = $props();

	function clearFilters() {
		filters = { search: '', categories: [], phases: [] };
	}
</script>

<section class="filters">
	{#snippet filterGroup<T extends string>(
		label: string,
		values: T[],
		active: T[],
		onToggle: (v: T) => void
	)}
		<article class="filter">
			<p>{label}:</p>
			<div class="filter-choices">
				{#each values as value (value)}
					<button
						class:active={active.includes(value)}
						class="capitalize"
						onclick={() => onToggle(value)}>{value}</button
					>
				{/each}
			</div>
		</article>
	{/snippet}

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

	<article class="filter-actions">
		<button onclick={clearFilters}>Clear Filters</button>
		<input type="search" bind:value={filters.search} placeholder="Search..." />
	</article>
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
</style>
