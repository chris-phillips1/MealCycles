<script lang="ts">
	import { getCycle, getIngredients, getMealPlans, getMeals } from '$lib/stores/state.svelte';
</script>

<h1>Data Models</h1>
<div class="data-model">
	<div class="data-model-item cycle">
		<h2>Cycle</h2>
		<pre>{JSON.stringify(getCycle(), null, 2)}</pre>
	</div>

	<div class="data-model-item ingredients">
		<h2>Ingredients</h2>
		<pre>{JSON.stringify(getIngredients(), null, 2)}</pre>
	</div>

	<div class="data-model-item meals">
		<h2>Meals</h2>
		<pre>{JSON.stringify(getMeals(), null, 2)}</pre>
	</div>

	<div class="data-model-item mealPlans">
		<h2>Meal Plans</h2>
		<pre>{JSON.stringify(getMealPlans(), null, 2)}</pre>
	</div>
</div>

<style>
	h2 {
		margin-top: 0;
	}

	.data-model {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1rem;
	}

	.data-model-item {
		background-color: #f0f0f0;
		padding: 1rem;
		border-radius: 8px;
	}
</style>
