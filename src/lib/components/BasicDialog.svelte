<script lang="ts">
	let {
		title,
		message,
		cancelDetails,
		confirmDetails,
		children
	}: {
		title: string;
		message: string;
		cancelDetails: { label: string };
		confirmDetails: { label: string; onConfirm: () => void };
		children?: () => void;
	} = $props();
	let dialog: HTMLDialogElement;

	export function show() {
		dialog?.showModal();
	}
	export function close() {
		dialog?.close();
	}
</script>

<dialog bind:this={dialog}>
	<h2>{title}</h2>
	<p>{message}</p>
	<div class="dialog-form">
		{#if children}
			{@render children()}
		{/if}
	</div>
	<div class="dialog-actions">
		<button type="button" class="secondary" onclick={close}>{cancelDetails.label}</button>
		<button
			type="button"
			onclick={() => {
				confirmDetails.onConfirm();
				close();
			}}
		>
			{confirmDetails.label}
		</button>
	</div>
</dialog>

<style>
	dialog {
		background: var(--bg-surface);
		color: var(--text);
		border: 1px solid var(--border);
		border-radius: 12px;
		padding: 0;
		max-width: 450px;
		box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(4px);
	}

	.dialog-content {
		padding: 2rem;
	}

	h2 {
		margin: 0 0 1rem 0;
		font-size: 1.25rem;
		color: var(--text);
	}

	p {
		margin: 0 0 2rem 0;
		color: var(--text-muted);
		line-height: 1.5;
	}

	.dialog-actions {
		display: flex;
		gap: 0.75rem;
		justify-content: flex-end;
	}

	button {
		padding: 0.6rem 1.25rem;
		font-weight: 500;
		transition: all 0.2s ease;
	}

	.secondary {
		background: var(--bg-surface-2);
		border-color: var(--border);
	}

	.secondary:hover {
		background: var(--bg);
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
