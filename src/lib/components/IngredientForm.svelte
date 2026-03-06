<script lang="ts">
	import FormDialog from '$lib/components/FormDialog.svelte';
	import { DEFAULT_INGREDIENT_FORM } from '$lib/constants';
	import { appState } from '$lib/stores/state.svelte';
	import { CyclePhase, IngredientCategory, Unit, type Ingredient } from '$lib/types';

	type FormMode = { editing: false } | { editing: true; ingredient: Ingredient };

	let dialog: FormDialog;
	let mode = $state<FormMode>({ editing: false });

	let formInformation = $state({ ...DEFAULT_INGREDIENT_FORM });

	function updateFormValidation(
		validation: 'required',
		property: keyof (typeof formInformation)['validation']['required'],
		value: boolean
	) {
		formInformation.validation[validation][property] = value;
	}

	function updateFormValue() {}

	function updateFormErrors() {}

	export function open(ingredient?: Ingredient) {
		mode = ingredient ? { editing: true, ingredient } : { editing: false };

		formInformation.values = mode.editing
			? { ...mode.ingredient, notes: mode.ingredient.notes ?? '' }
			: { ...DEFAULT_INGREDIENT_FORM.values };

		dialog.open();
	}

	function validate(): boolean {
		const next: Record<string, string> = {};
		if (!formData.name.trim()) next.name = 'Name is required';
		if (!formData.category) next.category = 'Category is required';
		if (!formData.unit) next.unit = 'Unit is required';
		if (!formData.beneficialPhases.length) next.beneficialPhases = 'Select at least one phase';
		formErrors = next;
		return Object.keys(next).length === 0;
	}

	function validateForm(): boolean {}

	function resetForm() {
		formInformation = { ...DEFAULT_INGREDIENT_FORM };
	}

	function handleFormSubmit() {}

	function handleSubmit() {
		if (!validate()) return;

		const data = {
			name: formData.name.trim(),
			category: formData.category!,
			unit: formData.unit!,
			beneficialPhases: formData.beneficialPhases,
			notes: formData.notes.trim()
		};

		if (mode.editing) {
			appState.updateIngredient(mode.ingredient.id, data);
		} else {
			appState.addIngredient(data);
		}

		dialog.close();
	}
</script>

<FormDialog bind:this={dialog} title={mode.editing ? 'Edit Ingredient' : 'Add Ingredient'}>
	<form
		onsubmit={(e) => {
			e.preventDefault();
			handleSubmit();
		}}
	>
		<div class="field">
			<input
				type="text"
				placeholder="Name"
				bind:value={formData.name}
				oninput={() => (formErrors.name = '')}
			/>
			{#if formErrors.name}<span class="error">{formErrors.name}</span>{/if}
		</div>

		<div class="field">
			<select bind:value={formData.category} oninput={() => (formErrors.category = '')}>
				<option value={null}>Select category...</option>
				{#each Object.values(IngredientCategory) as cat (cat)}
					<option value={cat}>{cat}</option>
				{/each}
			</select>
			{#if formErrors.category}<span class="error">{formErrors.category}</span>{/if}
		</div>

		<div class="field">
			<select bind:value={formData.unit} oninput={() => (formErrors.unit = '')}>
				<option value={null}>Select unit...</option>
				{#each Object.values(Unit) as unit (unit)}
					<option value={unit}>{unit}</option>
				{/each}
			</select>
			{#if formErrors.unit}<span class="error">{formErrors.unit}</span>{/if}
		</div>

		<div class="field">
			<p class="field-label">Beneficial Phases</p>
			<div class="checkbox-group">
				{#each Object.values(CyclePhase) as phase (phase)}
					<label class="checkbox-label">
						<input
							type="checkbox"
							value={phase}
							bind:group={formData.beneficialPhases}
							oninput={() => (formErrors.beneficialPhases = '')}
						/>
						<span class="capitalize">{phase}</span>
					</label>
				{/each}
			</div>
			{#if formErrors.beneficialPhases}<span class="error">{formErrors.beneficialPhases}</span>{/if}
		</div>

		<div class="field">
			<textarea placeholder="Notes (optional)" rows="3" bind:value={formData.notes}></textarea>
		</div>

		<div class="form-actions">
			<button type="button" class="secondary" onclick={() => dialog.close()}>Cancel</button>
			<button type="submit" class="primary">
				{mode.editing ? 'Update' : 'Add'} Ingredient
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

	.field {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.field-label {
		margin: 0;
		font-size: 0.9rem;
		font-weight: 500;
		color: var(--text-muted);
	}

	input[type='text'],
	select,
	textarea {
		width: 100%;
		font-size: 1rem;
	}

	textarea {
		resize: vertical;
		min-height: 80px;
		font-family: inherit;
	}

	.checkbox-group {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.checkbox-label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.4rem 0.5rem;
		border-radius: 4px;
		cursor: pointer;
		transition: background-color 0.15s ease;
	}

	.checkbox-label:hover {
		background: var(--bg-surface-2);
	}

	.checkbox-label input[type='checkbox'] {
		width: auto;
		cursor: pointer;
	}

	.capitalize {
		text-transform: capitalize;
	}

	.error {
		color: #ef4444;
		font-size: 0.85rem;
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
