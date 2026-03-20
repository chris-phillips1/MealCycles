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

<div class="recipe-grid">
	{#each appState.recipes as recipe (recipe.id)}
		<RecipeCard
			bind:this={recipeCard}
			title={recipe.name}
			description={recipe.description}
			chipList={recipe.phases}
			onEdit={() => recipeForm.open(recipe)}
			onAdd={() => console.log('Add to Plan')}
		/>
	{/each}
</div>

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

	.recipe-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(225px, 1fr));
		gap: 1.5rem;
	}
</style>
