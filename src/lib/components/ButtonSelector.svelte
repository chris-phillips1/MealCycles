<script lang="ts">
	import { toggleArrayItem } from '$lib/utils/array';
	let { label, buttonOptions, selectedButtons = $bindable() } = $props();
</script>

<section class="selector-group">
	<span class="selector-label">{label}</span>
	<div class="selector-buttons">
		{#each buttonOptions as buttonOption (buttonOption)}
			<button
				class="selector-button"
				class:active={selectedButtons.includes(buttonOption)}
				onclick={(e) => {
					e.preventDefault();
					selectedButtons = toggleArrayItem(selectedButtons, buttonOption);
				}}>{buttonOption}</button
			>
		{/each}
	</div>
</section>

<style>
	.selector-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.selector-label {
		display: block;
		font-weight: 600;
		font-size: 0.9rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.selector-buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	.selector-button {
		text-transform: capitalize;
	}

	.selector-button:hover:not(.active) {
		background: gray;
		transform: translateY(-1px);
	}

	.selector-button.active {
		background: mediumpurple;
		color: white;
		border-color: mediumpurple;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}
</style>
