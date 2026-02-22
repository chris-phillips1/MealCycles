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
	}

	section {
		background-color: #f0f0f0;
		padding: 1rem;
		border-radius: 8px;
	}
</style>
