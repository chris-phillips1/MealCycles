<script lang="ts">
	import { appState } from '$lib/stores/state.svelte';
	import DataCard from '$lib/components/DataCard.svelte';

	let formData = $state({
		startDate: appState.cycle.startDate,
		cycleLength: appState.cycle.cycleLength
	});

	function onsubmit(event: Event) {
		event.preventDefault();
		appState.updateCycle({ startDate: formData.startDate, cycleLength: formData.cycleLength });
	}
</script>

<div class="data-model">
	<DataCard name="Cycle" jsonObject={appState.cycle} />
	<DataCard name="Ingredients" jsonObject={appState.ingredients} />
	<DataCard name="Meals" jsonObject={appState.meals} />
	<DataCard name="Meal Plans" jsonObject={appState.mealPlans} />

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
	.data-model {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1rem;
	}

	.data-model-item {
		background-color: var(--bg-surface);
		color: var(--text);
		border: 1px solid var(--border);
		padding: 1rem;
		border-radius: 8px;
		gap: 0.5rem;
		align-items: flex-start;
		justify-content: flex-start;
	}
</style>
