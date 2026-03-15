<script lang="ts">
	import { CYCLE_PHASES, type CyclePhase, type Recipe } from '$lib/types';
	import ButtonSelector from '$lib/components/ButtonSelector.svelte';
	import MultiSelect from '$lib/components/MultiSelect.svelte';
	import { appState } from '$lib/stores/state.svelte';

	let dialog: HTMLDialogElement;
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
		dialog?.showModal();
	}

	export function closeDialog() {
		console.log('closeDialog called', dialog);
		dialog?.close();
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

<dialog bind:this={dialog}>
	<h2>{editingRecipe ? 'Edit Recipe' : 'Add Recipe'}</h2>
	<input type="text" bind:value={form.name} placeholder="Name" />
	<textarea bind:value={form.description} placeholder="Description"></textarea>

	<ButtonSelector label="Phases" buttonOptions={CYCLE_PHASES} bind:selectedButtons={form.phases} />

	<MultiSelect
		placeholder="Ingredients"
		options={ingredientOptions}
		bind:selected={form.ingredientIds}
	/>

	{#each selectedIngredients as ingredient (ingredient.id)}
		<div>
			<span>{ingredient.name}</span>
			<input type="text" bind:value={form.quantities[ingredient.id]} placeholder="e.g. 2 cups" />
		</div>
	{/each}

	<button type="button" onclick={closeDialog}>Cancel</button>
	<button type="submit" onclick={handleSubmit}>{editingRecipe ? 'Update' : 'Add'} Recipe</button>
</dialog>

<style>
	dialog[open] {
		display: flex;
		flex-direction: column;
	}
</style>
