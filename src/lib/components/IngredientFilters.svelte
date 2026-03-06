<script lang="ts">
	import { CyclePhase, IngredientCategory } from '$lib/types';
	let { filters = $bindable() } = $props();

	function toggleCategory(category: IngredientCategory) {
		filters.categories = filters.categories.includes(category)
			? filters.categories.filter((c: IngredientCategory) => c !== category)
			: [...filters.categories, category];
	}

	function togglePhase(phase: CyclePhase) {
		filters.phases = filters.phases.includes(phase)
			? filters.phases.filter((p: CyclePhase) => p !== phase)
			: [...filters.phases, phase];
	}

	function clearFilters() {
		filters = { search: '', categories: [], phases: [] };
	}
</script>

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
