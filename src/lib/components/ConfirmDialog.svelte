<script lang="ts">
	import DialogShell from '$lib/components/DialogShell.svelte';

	let {
		title,
		message,
		confirmLabel = 'Confirm',
		cancelLabel = 'Cancel',
		variant = 'default',
		onConfirm
	}: {
		title: string;
		message: string;
		confirmLabel?: string;
		cancelLabel?: string;
		variant?: 'danger' | 'default';
		onConfirm: () => void;
	} = $props();

	let shell: DialogShell;

	export function open() {
		shell.open();
	}

	export function close() {
		shell.close();
	}

	function handleConfirm() {
		onConfirm();
		close();
	}
</script>

<DialogShell bind:this={shell}>
	<h2>{title}</h2>
	<p>{message}</p>
	<div class="actions">
		<button type="button" onclick={close}>{cancelLabel}</button>
		<button type="button" class={variant} onclick={handleConfirm}>{confirmLabel}</button>
	</div>
</DialogShell>

<style>
	h2 {
		margin: 0 0 0.75rem 0;
		font-size: 1.25rem;
	}

	p {
		margin: 0 0 2rem 0;
		line-height: 1.5;
	}

	.actions {
		display: flex;
		gap: 0.75rem;
		justify-content: flex-end;
	}

	button {
		padding: 0.6rem 1.25rem;
		font-weight: 500;
	}

	.danger {
		background: rgba(239, 68, 68, 0.1);
		color: #ef4444;
		border-color: rgba(239, 68, 68, 0.3);
	}

	.danger:hover {
		background: #ef4444;
		color: white;
		border-color: #ef4444;
	}
</style>
