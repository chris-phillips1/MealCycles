<script lang="ts">
	import { toggleArrayItem } from '$lib/utils/array';

	let {
		placeholder = 'Select',
		options = [],
		selected = $bindable([])
	}: {
		placeholder: string;
		options: { label: string; value: string }[];
		selected: string[];
	} = $props();

	let open = $state(false);
	let query = $state('');

	const filteredOptions = $derived(
		options.filter((option) => option.label.toLowerCase().includes(query.toLowerCase()))
	);

	type Option = (typeof options)[number];

	function isSelected(option: Option) {
		return selected.includes(option.value);
	}
</script>

<div
	class="combo-root"
	onfocusout={(e) => {
		if (!e.currentTarget.contains(e.relatedTarget as Node)) open = false;
	}}
>
	<div class="input-row">
		<input
			bind:value={query}
			type="search"
			{placeholder}
			onfocus={() => (open = true)}
			onkeydown={(e) => {
				if (e.key === 'Escape') open = false;
			}}
		/>
		{#if selected.length > 0}
			<span class="badge">{selected.length} selected</span>
		{/if}
	</div>

	{#if open}
		<ul class="dropdown" role="listbox" onmousedown={(e) => e.preventDefault()}>
			{#each filteredOptions as option (option.value)}
				<li role="option" aria-selected={isSelected(option)}>
					<button
						type="button"
						onclick={() => (selected = toggleArrayItem(selected, option.value))}
					>
						<span class="checkbox">
							{#if isSelected(option)}✓{/if}
						</span>
						{option.label}
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.combo-root {
		position: relative;
	}

	.input-row {
		display: flex;
		align-items: center;
		gap: 8px;
		border-radius: 6px;
		background: var(--bg-surface-2);
	}

	input {
		flex: 1;
	}

	.badge {
		flex-shrink: 0;
		background: var(--bg-surface);
		color: var(--accent);
		font-size: 12px;
		font-weight: 500;
		border-radius: 32px;
		padding: 2px 8px;
		margin-right: 4px;
		white-space: nowrap;
	}

	.dropdown {
		position: absolute;
		top: calc(100% + 4px);
		left: 0;
		right: 0;
		background: var(--bg-surface-2);
		border: 1px solid var(--border);
		border-radius: 6px;
		list-style: none;
		margin: 0;
		padding: 0;
		max-height: 220px;
		overflow-y: auto;
		z-index: 100;
	}

	li {
		padding: 0;
		font-size: 14px;
		cursor: pointer;
	}

	li:hover {
		background: var(--accent);
		color: var(--text);
	}

	li button {
		width: 100%;
		background: none;
		border: none;
		padding: 8px 12px; /* move padding here from li, and remove it from li */
		font-size: 14px;
		text-align: left;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.checkbox {
		width: 15px;
		height: 15px;
		flex-shrink: 0;
		border-radius: 3px;
		border: 1px solid var(--border);
		background: var(--bg-surface);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 10px;
	}

	li[aria-selected='true'] .checkbox {
		background: #2563eb;
		border-color: #2563eb;
		color: white;
	}
</style>
