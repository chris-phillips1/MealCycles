<script lang="ts">
	import { appState } from '$lib/stores/state.svelte';
	import { CyclePhase, MealType, type Meal } from '$lib/types';
	import ButtonSelector from '$lib/components/ButtonSelector.svelte';
	import FormDialog from '$lib/components/FormDialog.svelte';
	import MultiSelect from '$lib/components/MultiSelect.svelte';

	let options = appState.ingredients.map((ingredient) => ingredient.name);
	let dialog: FormDialog;
	let editData = $state({ isEdit: false, meal: null as Meal | null });
	let formData = $state({
		name: '',
		description: '',
		mealIngredients: {} as Record<string, number>,
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

		<MultiSelect {options} />

		<ButtonSelector
			label="Phase"
			buttonOptions={Object.values(CyclePhase)}
			bind:selectedButtons={formData.beneficialPhases}
		/>

		<ButtonSelector
			label="Type"
			buttonOptions={Object.values(MealType)}
			bind:selectedButtons={formData.mealTypes}
		/>

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
