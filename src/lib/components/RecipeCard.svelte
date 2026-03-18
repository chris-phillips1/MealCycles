<script lang="ts">
	let {
		title,
		description,
		chipList,
		primaryButton,
		secondaryButton
	}: {
		title: string;
		description: string;
		chipList: string[];
		primaryButton: string;
		secondaryButton: string;
	} = $props();
</script>

<section>
	<header>
		<div class="title-bar">
			<h2>{title}</h2>
			<p>X</p>
		</div>
		<ul>
			{#each chipList as chip (chip)}
				<li>{chip}</li>
			{/each}
		</ul>
	</header>

	<hr />

	<p>{description}</p>

	<div class="actions">
		<button type="button">{secondaryButton}</button>
		<button type="button">{primaryButton}</button>
	</div>
</section>
