<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		closeOnBackdrop = true
	}: {
		children: Snippet;
		closeOnBackdrop?: boolean;
	} = $props();

	let dialog: HTMLDialogElement;

	export function open() {
		dialog?.showModal();
	}

	export function close() {
		dialog?.close();
	}

	function handleBackdropClick(e: MouseEvent) {
		if (closeOnBackdrop && e.target === dialog) {
			close();
		}
	}
</script>

<dialog bind:this={dialog} onclick={handleBackdropClick}>
	{@render children()}
</dialog>

<style>
	dialog {
		border: 1px solid;
		border-radius: 12px;
		padding: 2rem;
		min-width: 450px;
		max-width: 600px;
		box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(4px);
	}
</style>
