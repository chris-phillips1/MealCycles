<script lang="ts">
	import {
		getCycle,
		getIngredients,
		getMealPlans,
		getMeals,
		updateCycle
	} from '$lib/stores/state.svelte';

	let formData = {
		startDate: getCycle().startDate,
		cycleLength: getCycle().cycleLength
	};

	function onsubmit(event: Event) {
		event.preventDefault();
		updateCycle({ startDate: formData.startDate, cycleLength: formData.cycleLength });
	}
</script>

<h1>Data Models</h1>
<div class="data-model">
	<div class="data-model-item">
		<h2>Cycle</h2>
		<pre>{JSON.stringify(getCycle(), null, 2)}</pre>
	</div>

	<div class="data-model-item edit">
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
		<h2>Ingredients</h2>
		<pre>{JSON.stringify(getIngredients(), null, 2)}</pre>
	</div>

	<div class="data-model-item">
		<h2>Meals</h2>
		<pre>{JSON.stringify(getMeals(), null, 2)}</pre>
	</div>

	<div class="data-model-item">
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

	.data-model-item.edit form {
		gap: 0.5rem;
		align-items: flex-start;
		justify-content: flex-start;
	}
</style>
