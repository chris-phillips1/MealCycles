<script lang="ts">
	import { appState } from '$lib/stores/state.svelte';
	import { CyclePhase, MealType, type Meal } from '$lib/types';
	import FormDialog from './FormDialog.svelte';

	let dialog: FormDialog;
	let selectedIngredients = $state([] as string[]);
	let editData = $state({ isEdit: false, meal: null as Meal | null });
	let formData = $state({
		name: '',
		description: '',
		mealIngredients: {} as Record<string, { quantity: number }>,
		beneficialPhases: [] as CyclePhase[],
		mealTypes: [] as MealType[],
		prepTime: 0,
		cookTime: 0,
		instructions: ''
	});

	export function open(meal?: Meal) {
		editData = { isEdit: !!meal, meal: meal ?? null };
		dialog.open();
	}

	function handleFormSubmit() {
		dialog.close();
	}
</script>

<FormDialog bind:this={dialog} title={editData.isEdit ? 'Edit Meal' : 'Add Meal'}>
	<form
		onsubmit={(e) => {
			e.preventDefault();
			handleFormSubmit();
		}}
	>
		<input type="text" value={formData.name} name="name" placeholder="Meal Name" />
		<input type="text" value={formData.description} name="description" placeholder="Description" />

		<select name="" id="" bind:value={selectedIngredients} multiple>
			{#each appState.ingredients as ingredient (ingredient)}
				<option value={ingredient.id}>{ingredient.name}</option>
			{/each}
		</select>

		<div>
			{#if selectedIngredients && selectedIngredients.length > 0}
				{#each selectedIngredients as ingredientId (ingredientId)}
					<input type="text" value={appState.getIngredientById(ingredientId)?.name} />
					<input type="number" bind:value={formData.mealIngredients[ingredientId].quantity} />
					<input type="text" disabled />
				{/each}
			{/if}
		</div>

		<select bind:value={formData.beneficialPhases} multiple>
			{#each Object.values(CyclePhase) as phase (phase)}
				<option value={phase}>{phase}</option>
			{/each}
		</select>

		<select bind:value={formData.mealTypes} multiple>
			{#each Object.values(MealType) as type (type)}
				<option value={type}>{type}</option>
			{/each}
		</select>

		<input type="number" value={formData.prepTime} name="prepTime" />
		<input type="number" value={formData.cookTime} name="cookTime" />
		<input
			type="text"
			value={formData.instructions}
			name="instructions"
			placeholder="Instructions"
		/>

		<div class="form-actions">
			<button type="button" class="secondary" onclick={() => dialog.close()}>Cancel</button>
			<button type="submit" class="primary">
				{editData.isEdit ? 'Update' : 'Add'} Meal
			</button>
		</div>
	</form>
</FormDialog>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.form-actions {
		display: flex;
		gap: 0.75rem;
		justify-content: flex-end;
		padding-top: 0.5rem;
		border-top: 1px solid var(--border);
	}

	.form-actions button {
		padding: 0.6rem 1.25rem;
		font-weight: 500;
	}

	.secondary {
		background: var(--bg-surface-2);
		border-color: var(--border);
	}

	.secondary:hover {
		background: var(--bg);
	}

	.primary {
		background: var(--accent);
		color: white;
		border-color: var(--accent);
	}

	.primary:hover {
		background: var(--accent-hover);
		border-color: var(--accent-hover);
	}
</style>
