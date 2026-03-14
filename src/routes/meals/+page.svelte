<script lang="ts">
	import MealForm from '$lib/components/mealComponents/MealForm.svelte';
	import { appState } from '$lib/stores/state.svelte';

	let form: MealForm;
</script>

<header>
	<h1>Meals</h1>
	<button onclick={() => form.open()}>Add Meal</button>
</header>

<section class="meal-list">
	{#each appState.meals as meal (meal)}
		<div class="meal-card">
			<h2>{meal.name}</h2>
			<div class="meal-card-phase-container">
				{#each meal.beneficialPhases as phase (phase)}
					<span class="badge {phase}">{phase}</span>
				{/each}
			</div>
			<div class="meal-card-subheading">
				<span>Prep Time: {meal.prepTime} min</span>
				<span>--</span>
				<span>Cook Time: {meal.cookTime} min</span>
			</div>
			<div class="meal-card-body">
				<p>{meal.description}</p>
				<p>{meal.ingredients.length} Ingredients:</p>
			</div>
		</div>
	{:else}
		<p>No meals found.</p>
	{/each}
</section>

<MealForm bind:this={form} />

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

	.meal-list {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
		gap: 2rem;
	}

	.meal-card {
		display: flex;
		flex-direction: column;
		border: 1px solid #ccc;
		border-radius: 12px;
		padding: 1rem;
	}

	.meal-card-heading {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}

	.meal-card h2 {
		margin: 0.5rem 0;
	}

	.meal-card-phase-container {
		display: flex;
		gap: 0.25rem;
		margin-bottom: 0.5rem;
	}

	.badge {
		border: 1px solid gray;
		border-radius: 0.5rem;
		padding: 0.25rem 0.5rem;
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
</style>
