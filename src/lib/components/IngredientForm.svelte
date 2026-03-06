<script lang="ts">
	import FormDialog from '$lib/components/FormDialog.svelte';
	import { DEFAULT_INGREDIENT_FORM } from '$lib/constants';
	import { appState } from '$lib/stores/state.svelte';
	import { CyclePhase, IngredientCategory, Unit, type Ingredient } from '$lib/types';

	type FormMode = { editing: false } | { editing: true; ingredient: Ingredient };

	let dialog: FormDialog;
	let mode = $state<FormMode>({ editing: false });

	let formInformation = $state({ ...DEFAULT_INGREDIENT_FORM });

	export function open(ingredient?: Ingredient) {
		mode = ingredient ? { editing: true, ingredient } : { editing: false };

		formInformation.values = mode.editing
			? { ...mode.ingredient, notes: mode.ingredient.notes ?? '' }
			: { ...DEFAULT_INGREDIENT_FORM.values };

		dialog.open();
	}

	function resetForm() {
		formInformation = { ...DEFAULT_INGREDIENT_FORM };
	}

	function validateForm(): boolean {
		if (!formInformation.values.name.trim()) formInformation.errors.name = 'Name is required';
		if (!formInformation.values.category) formInformation.errors.category = 'Category is required';
		if (!formInformation.values.unit) formInformation.errors.unit = 'Unit is required';
		if (!formInformation.values.beneficialPhases.length)
			formInformation.errors.beneficialPhases = 'Select at least one phase';
		return Object.keys(formInformation.errors).length === 0;
	}

	function handleFormSubmit() {
		if (!validateForm()) return;

		const data = {
			name: formInformation.values.name.trim(),
			category: formInformation.values.category!,
			unit: formInformation.values.unit!,
			beneficialPhases: formInformation.values.beneficialPhases,
			notes: formInformation.values.notes.trim()
		};

		if (mode.editing) {
			appState.updateIngredient(mode.ingredient.id, data);
		} else {
			appState.addIngredient(data);
		}

		resetForm();
		dialog.close();
	}
</script>

<FormDialog bind:this={dialog} title={mode.editing ? 'Edit Ingredient' : 'Add Ingredient'}>
	<form
		onsubmit={(e) => {
			e.preventDefault();
			handleFormSubmit();
		}}
	>
		<div class="field">
			<input
				type="text"
				placeholder="Name"
				bind:value={formInformation.values.name}
				oninput={() => (formInformation.errors.name = '')}
			/>
			{#if formInformation.errors.name}<span class="error">{formInformation.errors.name}</span>{/if}
		</div>

		<div class="field">
			<select
				bind:value={formInformation.values.category}
				oninput={() => (formInformation.errors.category = '')}
			>
				<option value={null}>Select category...</option>
				{#each Object.values(IngredientCategory) as cat (cat)}
					<option value={cat}>{cat}</option>
				{/each}
			</select>
			{#if formInformation.errors.category}<span class="error"
					>{formInformation.errors.category}</span
				>{/if}
		</div>

		<div class="field">
			<select
				bind:value={formInformation.values.unit}
				oninput={() => (formInformation.errors.unit = '')}
			>
				<option value={null}>Select unit...</option>
				{#each Object.values(Unit) as unit (unit)}
					<option value={unit}>{unit}</option>
				{/each}
			</select>
			{#if formInformation.errors.unit}<span class="error">{formInformation.errors.unit}</span>{/if}
		</div>

		<div class="field">
			<p class="field-label">Beneficial Phases</p>
			<div class="checkbox-group">
				{#each Object.values(CyclePhase) as phase (phase)}
					<label class="checkbox-label">
						<input
							type="checkbox"
							value={phase}
							bind:group={formInformation.values.beneficialPhases}
							oninput={() => (formInformation.errors.beneficialPhases = '')}
						/>
						<span class="capitalize">{phase}</span>
					</label>
				{/each}
			</div>
			{#if formInformation.errors.beneficialPhases}<span class="error"
					>{formInformation.errors.beneficialPhases}</span
				>{/if}
		</div>

		<div class="field">
			<textarea placeholder="Notes (optional)" rows="3" bind:value={formInformation.values.notes}
			></textarea>
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
