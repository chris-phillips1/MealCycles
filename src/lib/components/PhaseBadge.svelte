<script lang="ts">
	let { phases }: { phases: string[] } = $props();
</script>

<ul>
	{#each phases as phase (phase)}
		<li class={phase}>{phase}</li>
	{/each}
</ul>

<style>
	ul {
		list-style: none;
		padding: 0;
		display: flex;
		gap: 4px;
		flex-wrap: wrap;
	}

	ul li {
		padding: 2px 12px;
		border: 1px solid #ccc;
		border-radius: 999px;
		font-size: 0.8rem;
	}

	.menstrual {
		background-color: #ffb6c1;
		color: #333;
	}
	.follicular {
		background-color: #e6e6fa;
		color: #333;
	}
	.ovulation {
		background-color: #fffacd;
		color: #333;
	}
	.luteal {
		background-color: #ffd1dc;
		color: #333;
	}
</style>
