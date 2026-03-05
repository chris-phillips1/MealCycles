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
	<div class="dialog-content">
		<h2>{title}</h2>
		{@render children()}
	</div>
</dialog>
