<script lang="ts">
	let { title, children, onClose } = $props();
	let dialog: HTMLDialogElement;

	export function show() {
		dialog?.showModal();
	}
	export function close() {
		dialog?.close();
	}
</script>

<dialog bind:this={dialog} onclose={onClose}>
	<h2>{title}</h2>
	{@render children()}
</dialog>

<style>
	dialog {
		background: var(--bg-surface);
		color: var(--text);
		border: 1px solid var(--border);
		border-radius: 12px;
		padding: 2rem;
		min-width: 400px;
		max-width: 500px;
		box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(4px);
	}

	dialog h2 {
		margin-top: 0;
		margin-bottom: 1rem;
	}
</style>
