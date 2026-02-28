<script lang="ts">
	let { headers }: { headers: object[] } = $props();
</script>

<thead>
	<tr>
		{#each headers as header (header)}
			<th scope="col">{header.headerTitle}</th>
		{/each}
	</tr>
</thead>

<style>
	th {
		text-align: left;
	}
</style>
