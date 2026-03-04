<script lang="ts">
	let { title = 'Confirm', message, onConfirm, onCancel } = $props();
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
	<div class="form-buttons">
		<button onclick={onCancel}>Cancel</button>
		<button onclick={onConfirm}>Confirm</button>
	</div>
</dialog>

<style>
	.form-buttons {
		align-self: flex-end;
	}
</style>
