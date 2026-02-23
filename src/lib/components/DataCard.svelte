<script lang="ts">
	let { name, jsonObject } = $props();
</script>

<section>
	<h2>{name}</h2>
	<pre>{JSON.stringify(jsonObject, null, 2)}</pre>
</section>

<style>
	h2 {
		margin-top: 0;
		color: var(--text);
	}

	section {
		background-color: var(--bg-surface);
		color: var(--text);
		border: 1px solid var(--border);
		padding: 1rem;
		border-radius: 8px;
	}

	pre {
		color: var(--text-muted);
	}
</style>
