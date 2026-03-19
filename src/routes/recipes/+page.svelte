<script lang="ts">
	import { appState } from '$lib/stores/state.svelte';
	import RecipeForm from '$lib/components/RecipeForm.svelte';
	import RecipeCard from '$lib/components/RecipeCard.svelte';

	let recipeForm: RecipeForm;
	let recipeCard: RecipeCard;
</script>

<header>
	<h1>Recipes</h1>
	<button onclick={() => recipeForm?.open()}>Add Recipe</button>
</header>

<RecipeForm bind:this={recipeForm} />
<RecipeCard
	bind:this={recipeCard}
	title="Recipe Name"
	description="Recipe Description"
	chipList={['Chip 1', 'Chip 2']}
	onEdit={() => console.log('Edit')}
	onAdd={() => console.log('Add')}
/>

<section class="list">
	{#each appState.recipes as recipe (recipe.id)}
		<div class="row">
			<div class="info">
				<span class="name">{recipe.name}</span>
				<span class="description">{recipe.description}</span>
			</div>
			<div class="phases">
				{#each recipe.phases as phase (phase)}
					<span class="badge {phase}">{phase}</span>
				{/each}
			</div>
			<div class="actions">
				<button onclick={() => recipeForm?.open(recipe)}>Edit</button>
				<button class="danger">Delete</button>
			</div>
		</div>
	{/each}
</section>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
	}

	header h1 {
		margin: 0;
		font-size: 2rem;
	}

	header button {
		cursor: pointer;
		padding: 0.5rem;
		align-self: flex-end;
		border: 1px solid black;
		border-radius: 4px;
	}

	.list {
		border: 1px solid black;
		border-radius: 8px;
		overflow: hidden;
	}

	.row {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		padding: 1rem 1.25rem;
		border-bottom: 1px solid black;
		background: var(black);
		transition: background-color 0.15s ease;
	}

	.row:last-child {
		border-bottom: none;
	}

	.row:hover {
		background: lightblue;
	}

	.info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.name {
		font-weight: 600;
	}

	.description {
		font-size: 0.875rem;
		color: gray;
	}

	.phases {
		display: flex;
		gap: 0.25rem;
		flex-wrap: wrap;
		justify-content: flex-end;
	}

	.badge {
		display: inline-block;
		padding: 0.2rem 0.5rem;
		border-radius: 4px;
		font-size: 0.8rem;
		font-weight: 500;
		text-transform: capitalize;
	}

	.menstrual {
		color: red;
	}
	.follicular {
		color: green;
	}
	.ovulation {
		color: blue;
	}
	.luteal {
		color: orange;
	}

	.actions {
		display: flex;
		gap: 0.5rem;
		flex-shrink: 0;
	}

	.actions button {
		font-size: 0.85rem;
		padding: 0.35rem 0.75rem;
	}
</style>
