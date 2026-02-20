<script lang="ts">
	import { getCycle, getIngredients, getMeals, getMealPlans } from '$lib/stores/state.svelte';
	import { getCurrentCycleInfo } from '$lib/utils/cycleCalculations';

	const cycle = $derived(getCycle());
	const cycleInfo = $derived(getCurrentCycleInfo(cycle));
	const ingredients = $derived(getIngredients());
	const meals = $derived(getMeals());
	const activeMealPlans = $derived(getMealPlans(true));

	function generateDateRangeString(start: string, end: string): string {
		const options: Intl.DateTimeFormatOptions = {
			month: 'short',
			day: 'numeric'
		};

		let firstDate = new Date(start).toLocaleDateString('en-US', options);
		let secondDate = new Date(end).toLocaleDateString('en-US', options);
		return firstDate + ' - ' + secondDate;
	}
</script>

<section class="cycle-info">
	<h2>{cycleInfo.currentPhase}</h2>
	<p>
		{generateDateRangeString(cycleInfo.phaseStartDate, cycleInfo.phaseEndDate)}
	</p>
</section>

<section class="stats">
	<h2>Quick Stats</h2>
	<div class="stat-grid">
		<div class="stat">
			<span class="stat-number">{ingredients.length}</span>
			<span class="stat-label">Ingredients</span>
		</div>
		<div class="stat">
			<span class="stat-number">{meals.length}</span>
			<span class="stat-label">Meals</span>
		</div>
		<div class="stat">
			<span class="stat-number">{activeMealPlans.length}</span>
			<span class="stat-label">Active Meal Plans</span>
		</div>
	</div>
</section>

<style>
	section {
		margin-bottom: 2rem;
		padding: 1.5rem;
		border: 1px solid #ddd;
		border-radius: 4px;
	}

	.cycle-info > * {
		margin: 0;
	}

	h2 {
		text-transform: capitalize;
		margin: 0.25rem 0;
	}

	.cycle-info p {
		color: #666;
		font-size: 0.9rem;
		margin-top: 0.25rem;
	}

	.stat-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
		margin-top: 1rem;
	}

	.stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem;
		background: #f5f5f5;
		border-radius: 4px;
	}

	.stat-number {
		font-size: 2rem;
		font-weight: bold;
	}

	.stat-label {
		font-size: 0.9rem;
		color: #666;
	}
</style>
