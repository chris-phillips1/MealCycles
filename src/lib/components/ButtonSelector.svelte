<script lang="ts">
	import { toggleArrayItem } from '$lib/utils/array';
	let { buttonOptions, selectedButtons = $bindable() } = $props();
</script>

<section>
	{#each buttonOptions as buttonOption (buttonOption)}
		<button
			type="button"
			class:active={selectedButtons.includes(buttonOption)}
			onclick={(e) => {
				e.preventDefault();
				selectedButtons = toggleArrayItem(selectedButtons, buttonOption);
			}}>{buttonOption}</button
		>
	{/each}
</section>

<style>
	section {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	button {
		text-transform: capitalize;
		border: 1px solid lightslategray;
		border-radius: 0.5rem;
		background-color: transparent;
		padding: 0.125rem 0.25rem;
	}

	button.active {
		background-color: mediumpurple;
		color: #f0f0f0;
	}
</style>
