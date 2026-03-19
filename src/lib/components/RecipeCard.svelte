<script lang="ts">
	let {
		title,
		description,
		chipList,
		onClose,
		onEdit,
		onAdd
	}: {
		title: string;
		description: string;
		chipList: string[];
		onClose: () => void;
		onEdit: () => void;
		onAdd: () => void;
	} = $props();
</script>

<section>
	<header>
		<h2>{title}</h2>
		<ul>
			{#each chipList as chip (chip)}
				<li>{chip}</li>
			{/each}
		</ul>
	</header>

	<hr />

	<p>{description}</p>

	<div class="actions">
		<button type="button" onclick={onClose}>Delete</button>

		<div class="right-actions">
			<button type="button" onclick={onEdit}>Edit</button>
			<button type="button" onclick={onAdd}>Plan</button>
		</div>
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		border: 1px solid slategray;
		max-width: 450px;
	}

	header ul {
		list-style: none;
		padding: 0;
		display: flex;
		gap: 8px;
	}

	header ul li {
		background-color: paleturquoise;
		padding: 4px 8px;
		border-radius: 12px;
	}

	.actions {
		display: flex;
		justify-content: space-between;
	}

	.right-actions {
		display: flex;
	}
</style>
