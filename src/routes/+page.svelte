<script lang="ts">
	import {
		getCycle,
		getIngredients,
		getMealPlans,
		getMeals,
		updateCycle
	} from '$lib/stores/state.svelte';
	import DataCard from '$lib/components/DataCard.svelte';

	const cycle = $derived(getCycle());
	const ingredients = $derived(getIngredients());
	const meals = $derived(getMeals());
	const mealPlans = $derived(getMealPlans());

	let formData = $state({
		startDate: getCycle().startDate,
		cycleLength: getCycle().cycleLength
	});

	function onsubmit(event: Event) {
		event.preventDefault();
		updateCycle({ startDate: formData.startDate, cycleLength: formData.cycleLength });
	}
</script>

<h1>Data Models</h1>
<div class="data-model">
	<DataCard name="Cycle" jsonObject={cycle} />
	<DataCard name="Ingredients" jsonObject={ingredients} />
	<DataCard name="Meals" jsonObject={meals} />
	<DataCard name="Meal Plans" jsonObject={mealPlans} />

	<div class="data-model-item">
		<h2>Edit Cycle</h2>
		<form {onsubmit}>
			<div>
				<label for="cycle-date">Cycle Start:</label>
				<input id="cycle-date" type="date" bind:value={formData.startDate} />
			</div>
			<div>
				<label for="cycle-length">Cycle Length:</label>
				<input id="cycle-length" type="number" bind:value={formData.cycleLength} />
			</div>
			<input type="submit" />
		</form>
	</div>
	<div class="data-model-item">
		<h2>Add Ingredient</h2>
	</div>
	<div class="data-model-item">
		<h2>Create Meal</h2>
	</div>
	<div class="data-model-item">
		<h2>Create Meal Plan</h2>
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
		gap: 0.5rem;
		align-items: flex-start;
		justify-content: flex-start;
	}
</style>
