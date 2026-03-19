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

	let menuOpen = $state(false);
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
		<button type="button" onclick={onAdd}>Add to Plan</button>
		<button type="button" onclick={() => (menuOpen = !menuOpen)}>...</button>
		{#if menuOpen}
			<button type="button" onclick={onEdit}>Edit</button>
			<button type="button" onclick={onClose}>Delete</button>
		{/if}
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		border: 0.5px solid #e0e0e0;
		border-radius: 1rem;
		padding: 1rem;
	}

	h2 {
		font-weight: 500;
		margin-bottom: 0.5rem;
	}

	header ul {
		list-style: none;
		padding: 0;
		display: flex;
		gap: 4px;
		flex-wrap: wrap;
	}

	header ul li {
		padding: 2px 12px;
		border: 1px solid #ccc;
		border-radius: 999px;
		font-size: 0.8rem;
	}

	hr {
		border: none;
		border-top: 1px solid #e0e0e0;
		margin: 0;
	}

	section p {
		flex: 1;
		font-size: 0.9rem;
		color: #555;
		line-height: 1.5;
	}

	.actions {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
