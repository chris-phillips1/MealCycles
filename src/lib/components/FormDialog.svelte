<script lang="ts">
	import DialogShell from '$lib/components/DialogShell.svelte';
	import type { Snippet } from 'svelte';

	let {
		title,
		children
	}: {
		title: string;
		children: Snippet;
	} = $props();

	let shell: DialogShell;

	export function open() {
		shell.open();
	}

	export function close() {
		shell.close();
	}
</script>

<DialogShell bind:this={shell} closeOnBackdrop={false}>
	<h2>{title}</h2>
	<div class="form-content">
		{@render children()}
	</div>
</DialogShell>

<style>
	h2 {
		margin: 0 0 1.5rem 0;
		font-size: 1.25rem;
	}

	.form-content {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
