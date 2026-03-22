<script lang="ts">
	import type { CyclePhase } from '$lib/types';
	import { appState } from '$lib/stores/state.svelte';
	import PhaseBadge from '$lib/components/PhaseBadge.svelte';

	const PHASE_DURATIONS: { phase: CyclePhase; days: number }[] = [
		{ phase: 'menstrual', days: 5 },
		{ phase: 'follicular', days: 7 },
		{ phase: 'ovulation', days: 3 },
		{ phase: 'luteal', days: 13 }
	];

	function getCurrentPhase(cycleStartDate: string): CyclePhase {
		const start = new Date(cycleStartDate);
		const today = new Date();
		const cycleDay = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) % 28;
		let elapsed = 0;
		for (const { phase, days } of PHASE_DURATIONS) {
			elapsed += days;
			if (cycleDay < elapsed) return phase;
		}
		return 'luteal';
	}

	const currentPhase = $derived(getCurrentPhase(appState.cycleStartDate));

	const filteredRecipes = $derived(appState.recipes.filter((r) => r.phases.includes(currentPhase)));

	const planRecipes = $derived(
		appState.plan.recipeIds
			.map((id) => appState.recipes.find((r) => r.id === id))
			.filter((r) => r !== undefined)
	);

	let phaseResetNotice = $state(false);

	$effect(() => {
		if (currentPhase !== appState.plan.phase) {
			appState.startNewPlan(currentPhase);
			phaseResetNotice = true;
		}
	});
</script>

{#if phaseResetNotice}
	<div class="notice">
		Your phase changed to <strong>{currentPhase}</strong> — your plan has been reset.
		<button onclick={() => (phaseResetNotice = false)}>Dismiss</button>
	</div>
{/if}

<div class="layout">
	<section class="browser">
		<header>
			<h1>Recipes for <span class="phase">{currentPhase}</span></h1>
			<PhaseBadge phase={currentPhase} />
		</header>

		{#if filteredRecipes.length === 0}
			<p class="empty">No recipes found for this phase.</p>
		{:else}
			<ul class="recipe-list">
				{#each filteredRecipes as recipe (recipe.id)}
					<li class="recipe-row">
						<div class="info">
							<span class="name">{recipe.name}</span>
							<span class="description">{recipe.description}</span>
						</div>
						<button
							onclick={() => appState.addRecipeToPlan(recipe.id)}
							disabled={appState.plan.recipeIds.includes(recipe.id)}
						>
							{appState.plan.recipeIds.includes(recipe.id) ? 'Added' : 'Add to Plan'}
						</button>
					</li>
				{/each}
			</ul>
		{/if}
	</section>

	<section class="plan">
		<h2>Current Plan</h2>

		{#if planRecipes.length === 0}
			<p class="empty">No recipes in your plan yet.</p>
		{:else}
			<ul class="recipe-list">
				{#each planRecipes as recipe (recipe.id)}
					<li class="recipe-row">
						<div class="info">
							<span class="name">{recipe.name}</span>
							<span class="description">{recipe.description}</span>
						</div>
						<button onclick={() => appState.removeRecipeFromPlan(recipe.id)}>Remove</button>
					</li>
				{/each}
			</ul>
		{/if}
	</section>
</div>

<style>
	.notice {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.75rem 1.25rem;
		margin-bottom: 1.5rem;
		border-radius: 8px;
		background: #fef9c3;
		color: #713f12;
		font-size: 0.9rem;
	}

	.notice button {
		margin-left: auto;
		font-size: 0.8rem;
		padding: 0.2rem 0.6rem;
	}

	.layout {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		align-items: start;
	}

	section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	h1 {
		font-size: 1.5rem;
	}

	h2 {
		font-size: 1.25rem;
	}

	.phase {
		text-transform: capitalize;
	}

	.recipe-list {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		border: 1px solid #e5e7eb;
		border-radius: 8px;
		overflow: hidden;
	}

	.recipe-row {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.75rem 1rem;
		border-bottom: 1px solid #e5e7eb;
	}

	.recipe-row:last-child {
		border-bottom: none;
	}

	.info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.name {
		font-weight: 600;
		font-size: 0.95rem;
	}

	.description {
		font-size: 0.8rem;
		color: #666;
	}

	.empty {
		color: #999;
		font-size: 0.9rem;
	}

	button:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}
</style>
