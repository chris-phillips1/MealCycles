<script lang="ts">
	import type { CyclePhase } from '$lib/types';

	let {
		phase,
		active = false,
		onclick
	}: { phase: CyclePhase; active?: boolean; onclick?: () => void } = $props();
</script>

{#if onclick}
	<button class="badge {phase}" class:active {onclick}>{phase}</button>
{:else}
	<span class="badge {phase}" class:active>{phase}</span>
{/if}

<style>
	.badge {
		padding: 2px 12px;
		border: 1px solid #ccc;
		border-radius: 999px;
		font-size: 0.8rem;
		text-transform: capitalize;
		background-color: transparent;
		color: #333;
	}

	button.badge {
		cursor: pointer;
	}

	span.menstrual {
		background-color: #ffb6c1;
	}
	span.follicular {
		background-color: #e6e6fa;
	}
	span.ovulation {
		background-color: #fffacd;
	}
	span.luteal {
		background-color: #ffd1dc;
	}

	button.menstrual.active {
		background-color: #ffb6c1;
	}
	button.follicular.active {
		background-color: #e6e6fa;
	}
	button.ovulation.active {
		background-color: #fffacd;
	}
	button.luteal.active {
		background-color: #ffd1dc;
	}
</style>
