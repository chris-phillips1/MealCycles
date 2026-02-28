<script lang="ts">
	import type { Ingredient } from '$lib/types';
	let {
		ingredient,
		headers
	}: {
		ingredient: Ingredient;
		headers: Array<{ name: string; propertyName: string; actions: string[] }>;
	} = $props();
</script>

<tr>
	{#each headers as header (header)}
		{#if header.actions}
			<td>
				{#each header.actions as action (action)}
					<button>{action}</button>
				{/each}
			</td>
		{:else}
			<td>{ingredient[header.propertyName]}</td>
		{/if}
	{/each}
</tr>

<style>
</style>
