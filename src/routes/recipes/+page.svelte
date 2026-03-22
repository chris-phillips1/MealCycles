<script lang="ts">
	import { appState } from '$lib/stores/state.svelte';
	import RecipeForm from '$lib/components/RecipeForm.svelte';
	import RecipeCard from '$lib/components/RecipeCard.svelte';

	let recipeForm: RecipeForm;
</script>

<header>
	<h1>Recipes</h1>
	<button onclick={() => recipeForm?.open()}>Add Recipe</button>
</header>

<RecipeForm bind:this={recipeForm} />

<div class="recipe-grid">
	{#each appState.recipes as recipe (recipe.id)}
		<RecipeCard
			title={recipe.name}
			description={recipe.description}
			phases={recipe.phases}
			onEdit={() => recipeForm.open(recipe)}
			onAdd={() => appState.addRecipeToPlan(recipe.id)}
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

	.recipe-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(225px, 1fr));
		gap: 1.5rem;
	}
</style>
