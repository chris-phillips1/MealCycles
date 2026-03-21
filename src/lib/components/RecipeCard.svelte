<script lang="ts">
	let {
		title,
		description,
		chipList,
		onEdit,
		onAdd
	}: {
		title: string;
		description: string;
		chipList: string[];
		onEdit: () => void;
		onAdd: () => void;
	} = $props();
</script>

<section>
	<header>
		<h2>{title}</h2>
		<ul>
			{#each chipList as chip (chip)}
				<li class={chip}>{chip}</li>
			{/each}
		</ul>
	</header>

	<hr />

	<p>{description}</p>

	<div class="actions">
		<button type="button" onclick={onEdit}>Edit</button>
		<button type="button" onclick={onAdd}>Add to Plan</button>
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

	.menstrual {
		background-color: #ffb6c1;
		color: #333;
	}
	.follicular {
		background-color: #e6e6fa;
		color: #333;
	}
	.ovulation {
		background-color: #fffacd;
		color: #333;
	}
	.luteal {
		background-color: #ffd1dc;
		color: #333;
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
		align-items: center;
		gap: 8px;
	}

	.actions button {
		padding: 0.5rem 0.75rem;
		border: none;
		border-radius: 0.5rem;
		background-color: #f0f0f0;
		color: #333;
		cursor: pointer;
	}

	.actions :last-child {
		flex: 1;
		background-color: mediumpurple;
		color: #f9f9f9;
	}
</style>
