<script lang="ts">
	import { getCycle, updateCycle } from '$lib/stores/state.svelte';
	import { CyclePhase } from '$lib/types';
	import { getPhaseDateRange, getPhaseDayOffset } from '$lib/utils/cycleCalculations';

	let cycle = getCycle();
	let startDates = {
		menstrual: getPhaseDateRange(
			new Date(cycle.startDate),
			getPhaseDayOffset(CyclePhase.MENSTRUAL, cycle.phaseDurations),
			cycle.phaseDurations.menstrual
		).startDate,
		follicular: getPhaseDateRange(
			new Date(cycle.startDate),
			getPhaseDayOffset(CyclePhase.FOLLICULAR, cycle.phaseDurations),
			cycle.phaseDurations.follicular
		).startDate,
		ovulation: getPhaseDateRange(
			new Date(cycle.startDate),
			getPhaseDayOffset(CyclePhase.OVULATION, cycle.phaseDurations),
			cycle.phaseDurations.ovulation
		).startDate,
		luteal: getPhaseDateRange(
			new Date(cycle.startDate),
			getPhaseDayOffset(CyclePhase.LUTEAL, cycle.phaseDurations),
			cycle.phaseDurations.luteal
		).startDate
	};
</script>

<section>
	<form
		onsubmit={() => updateCycle({ startDate: cycle.startDate, cycleLength: cycle.cycleLength })}
	>
		<label for="cycle-start-date">Cycle Start Date</label>
		<input id="cycle-start-date" type="date" bind:value={cycle.startDate} />

		<label for="cycle-duration">Cycle Duration</label>
		<input id="cycle-duration" type="number" bind:value={cycle.cycleLength} />

		<label for="menstrual-start-date">Menstrual Start Date</label>
		<input id="menstrual-start-date" type="date" bind:value={startDates.menstrual} />

		<label for="menstrual-duration">Menstrual Duration</label>
		<input id="menstrual-duration" type="number" bind:value={cycle.phaseDurations.menstrual} />

		<label for="follicular-start-date">Follicular Start Date</label>
		<input id="follicular-start-date" type="date" bind:value={startDates.follicular} />

		<label for="follicular-duration">Follicular Duration</label>
		<input id="follicular-duration" type="number" bind:value={cycle.phaseDurations.follicular} />

		<label for="ovulation-start-date">Ovulation Start Date</label>
		<input id="ovulation-start-date" type="date" bind:value={startDates.ovulation} />

		<label for="ovulation-duration">Ovulation Duration</label>
		<input id="ovulation-duration" type="number" bind:value={cycle.phaseDurations.ovulation} />

		<label for="luteal-start-date">Luteal Start Date</label>
		<input id="luteal-start-date" type="date" bind:value={startDates.luteal} />

		<label for="luteal-duration">Luteal Duration</label>
		<input id="luteal-duration" type="number" bind:value={cycle.phaseDurations.luteal} />

		<input type="submit" value="Save" />
	</form>
</section>

<style>
	section {
		max-width: 800px;
		margin: 0 auto;
	}

	form {
		display: flex;
		flex-direction: column;
	}

	form input {
		margin: 0.5rem 0;
		padding: 0.5rem;
		font-size: 1rem;
		border: 1px solid #ccc;
		border-radius: 4px;
	}
</style>
