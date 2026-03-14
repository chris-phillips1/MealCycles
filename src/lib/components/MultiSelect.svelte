<script lang="ts">
	import { toggleArrayItem } from '$lib/utils/array';
	import { appState } from '$lib/stores/state.svelte';

	let { options }: { options: string[] } = $props();

	let searchTerm = $state('');
	let searchOpen = $state(false);
	let selected = $state([] as string[]);

	const filtered = $derived(
		options.filter((o) => o.toLowerCase().includes(searchTerm.toLowerCase()))
	);

	function toggle(option: string) {
		selected = toggleArrayItem(selected, option);
		searchTerm = '';
	}
</script>

<div style="position: relative;">
	<input
		bind:value={searchTerm}
		onfocus={() => (searchOpen = true)}
		onkeydown={(e) => {
			if (e.key === 'Escape') searchOpen = false;
		}}
		type="search"
		placeholder="Search"
	/>

	{#if searchOpen}
		<ul>
			{#each filtered as option (option)}
				<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<li onclick={() => toggle(option)} class:selected={selected.includes(option)}>
					{option}
					{#if selected.includes(option)}
						✓
					{/if}
				</li>
			{/each}
		</ul>
	{/if}
</div>

<table>
	<tbody>
		{#each selected as item (item)}
			<tr>
				<td>{item}</td>
				<td>
					<div>
						<label
							>Quantity:
							<input type="number" /></label
						>
						<span>{appState.getIngredientByName(item)?.unit}</span>
						<button onclick={() => toggle(item)}>remove</button>
					</div>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
