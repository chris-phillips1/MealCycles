<script lang="ts">
	import { type CyclePhase } from '$lib/types';
	import PhaseBadge from './PhaseBadge.svelte';

	let {
		title,
		description,
		phases,
		onEdit,
		onAdd
	}: {
		title: string;
		description: string;
		phases: string[];
		onEdit: () => void;
		onAdd: () => void;
	} = $props();
</script>

<section>
	<header>
		<h2>{title}</h2>
		{#each phases as phase (phase)}
			<PhaseBadge phase={phase as CyclePhase} active={true} />
		{/each}
	</header>

	<hr />

	<p>{description}</p>

	<div class="actions">
		<button type="button" onclick={onEdit}>Edit</button>
		<button type="button" onclick={onAdd}>Add to Plan</button>
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		border: 0.5px solid #e0e0e0;
		border-radius: 1rem;
		padding: 1rem;
	}

	h2 {
		font-weight: 500;
		margin-bottom: 0.5rem;
	}

	hr {
		border: none;
		border-top: 1px solid #e0e0e0;
		margin: 0;
	}

	section p {
		flex: 1;
		font-size: 0.9rem;
		color: #555;
		line-height: 1.5;
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.actions button {
		padding: 0.5rem 0.75rem;
		border: none;
		border-radius: 0.5rem;
		background-color: #f0f0f0;
		color: #333;
		cursor: pointer;
	}

	.actions :last-child {
		flex: 1;
		background-color: mediumpurple;
		color: #f9f9f9;
	}
</style>
