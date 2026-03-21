<script lang="ts">
	import { CYCLE_PHASES, type CyclePhase, type Recipe } from '$lib/types';
	import { appState } from '$lib/stores/state.svelte';
	import ButtonSelector from '$lib/components/ButtonSelector.svelte';
	import MultiSelect from '$lib/components/MultiSelect.svelte';
	import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';

	let formDialog: HTMLDialogElement;
	let confirmDialog: ConfirmDialog;
	let editingRecipe = $state<Recipe | null>(null);
	let form = $state({
		name: '',
		description: '',
		phases: [] as CyclePhase[],
		ingredientIds: [] as string[],
		quantities: {} as Record<string, string>
	});

	const ingredientOptions = $derived(
		appState.ingredients.map((i) => ({ label: i.name, value: i.id }))
	);

	const selectedIngredients = $derived(
		form.ingredientIds
			.map((id) => appState.ingredients.find((i) => i.id === id))
			.filter((i) => i !== undefined)
	);

	export function open(recipe?: Recipe) {
		editingRecipe = recipe ?? null;
		form.name = editingRecipe?.name ?? '';
		form.description = editingRecipe?.description ?? '';
		form.phases = editingRecipe ? [...editingRecipe.phases] : [];
		form.ingredientIds = editingRecipe ? editingRecipe.ingredients.map((i) => i.ingredientId) : [];
		form.quantities = editingRecipe
			? Object.fromEntries(editingRecipe.ingredients.map((i) => [i.ingredientId, i.quantity]))
			: {};
		formDialog?.showModal();
	}

	export function closeDialog() {
		console.log('closeDialog called', formDialog);
		formDialog?.close();
	}

	function handleSubmit() {
		if (!form.name.trim()) return;

		const recipe = {
			name: form.name.trim(),
			description: form.description.trim(),
			phases: form.phases,
			ingredients: form.ingredientIds.map((id) => ({
				ingredientId: id,
				quantity: form.quantities[id] ?? ''
			}))
		};

		if (editingRecipe) {
			appState.updateRecipe(editingRecipe.id, recipe);
		} else {
			appState.addRecipe(recipe);
		}

		closeDialog();
	}
</script>

<ConfirmDialog
	bind:this={confirmDialog}
	title="Delete Recipe"
	message="Are you sure you want to delete this recipe?"
	onConfirm={() => {
		console.log('Deleted');
		formDialog.close();
	}}
/>

<dialog bind:this={formDialog}>
	<div class="title">
		{#if editingRecipe}
			<h2>Edit Recipe</h2>
			<button type="button" onclick={() => confirmDialog.open()}>Delete</button>
		{:else}
			<h2>Add Recipe</h2>
		{/if}
	</div>
	<input type="text" bind:value={form.name} placeholder="Name" />
	<textarea bind:value={form.description} placeholder="Description"></textarea>

	<ButtonSelector buttonOptions={CYCLE_PHASES} bind:selectedButtons={form.phases} />

	<MultiSelect
		placeholder="Ingredients"
		options={ingredientOptions}
		bind:selected={form.ingredientIds}
	/>

	{#each selectedIngredients as ingredient (ingredient.id)}
		<div class="ingredient-table">
			<span>{ingredient.name}</span>
			<input type="text" bind:value={form.quantities[ingredient.id]} placeholder="e.g. 2 cups" />
			<button type="button">X</button>
		</div>
	{/each}

	<div class="actions">
		<button type="button" onclick={closeDialog}>Cancel</button>
		<button type="submit" onclick={handleSubmit}>{editingRecipe ? 'Update' : 'Add'} Recipe</button>
	</div>
</dialog>

<style>
	dialog[open] {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		border: none;
		border-radius: 0.5rem;
	}

	button {
		padding: 0.5rem 0.75rem;
		border: none;
		border-radius: 0.5rem;
		background-color: #f0f0f0;
		color: #333;
		cursor: pointer;
	}

	.title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.actions {
		display: flex;
		justify-content: flex-end;
		gap: 0.5rem;
	}

	.actions button[type='submit'] {
		background-color: mediumpurple;
		color: #f0f0f0;
	}
</style>
