<script lang="ts">
	import { CyclePhase, IngredientCategory, Unit, type Ingredient } from '$lib/types';
	import { appState } from '$lib/stores/state.svelte';

	let dialog: HTMLDialogElement;
	let editingIngredient = $state<Ingredient | null>(null);
	let validationErrors = $state<Record<string, string>>({});
	let formData = $state({
		name: '',
		category: null as IngredientCategory | null,
		unit: null as Unit | null,
		beneficialPhases: [] as CyclePhase[],
		notes: ''
	});

	export function open(ingredient?: Ingredient) {
		editingIngredient = ingredient ?? null;
		formData = ingredient
			? {
					name: ingredient.name,
					category: ingredient.category,
					unit: ingredient.unit,
					beneficialPhases: ingredient.beneficialPhases,
					notes: ingredient.notes ?? ''
				}
			: {
					name: '',
					category: null,
					unit: null,
					beneficialPhases: [],
					notes: ''
				};
		validationErrors = {};
		dialog?.showModal();
	}
	export function close() {
		dialog?.close();
		editingIngredient = null;
		validationErrors = {};
	}

	function validateForm() {
		const errors: Record<string, string> = {};
		if (!formData.name.trim()) errors.name = 'Name is required';
		if (!formData.category) errors.category = 'Category is required';
		if (!formData.unit) errors.unit = 'Unit is required';
		if (!formData.beneficialPhases.length) errors.beneficialPhases = 'Select at least one phase';
		return Object.keys(errors).length ? errors : null;
	}

	function saveIngredient(e: SubmitEvent) {
		e.preventDefault();

		const errors = validateForm();
		if (errors) {
			validationErrors = errors;
			return;
		}

		const data = {
			name: formData.name,
			category: formData.category!,
			unit: formData.unit!,
			beneficialPhases: formData.beneficialPhases,
			notes: formData.notes
		};

		if (editingIngredient) {
			appState.updateIngredient(editingIngredient.id, data);
		} else {
			appState.addIngredient(data);
		}

		close();
	}
</script>

<dialog bind:this={dialog} onclose={close}>
	<h2>{editingIngredient ? 'Edit' : 'Add'} Ingredient</h2>
	<form onsubmit={saveIngredient}>
		<input
			type="text"
			placeholder="Name"
			bind:value={formData.name}
			oninput={() => (validationErrors.name = '')}
		/>
		{#if validationErrors.name}<span class="error">{validationErrors.name}</span>{/if}

		<select bind:value={formData.category} oninput={() => (validationErrors.category = '')}>
			<option value={null}>Select category...</option>
			{#each Object.values(IngredientCategory) as cat (cat)}
				<option value={cat}>{cat}</option>
			{/each}
		</select>
		{#if validationErrors.category}<span class="error">{validationErrors.category}</span>{/if}

		<select bind:value={formData.unit} oninput={() => (validationErrors.unit = '')}>
			<option value={null}>Select unit...</option>
			{#each Object.values(Unit) as unit (unit)}
				<option value={unit}>{unit}</option>
			{/each}
		</select>
		{#if validationErrors.unit}<span class="error">{validationErrors.unit}</span>{/if}

		{#each Object.values(CyclePhase) as phase (phase)}
			<label class="capitalize">
				<input
					type="checkbox"
					value={phase}
					bind:group={formData.beneficialPhases}
					oninput={() => (validationErrors.beneficialPhases = '')}
				/>
				{phase}
			</label>
		{/each}
		{#if validationErrors.beneficialPhases}<span class="error"
				>{validationErrors.beneficialPhases}</span
			>{/if}

		<textarea placeholder="Notes (optional)" rows="3" bind:value={formData.notes}></textarea>

		<div class="form-buttons">
			<button type="button" onclick={close}>Cancel</button>
			<button type="submit">{editingIngredient ? 'Update' : 'Add'}</button>
		</div>
	</form>
</dialog>

<style>
	dialog {
		background: var(--bg-surface);
		color: var(--text);
		border: 1px solid var(--border);
		border-radius: 12px;
		padding: 2rem;
		min-width: 500px;
		max-width: 600px;
		box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(4px);
	}

	dialog h2 {
		margin: 0 0 1.5rem 0;
		font-size: 1.5rem;
		color: var(--text);
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	/* Form inputs */
	input[type='text'],
	select,
	textarea {
		width: 100%;
		font-size: 1rem;
	}

	/* Checkbox group */
	label.capitalize {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem;
		border-radius: 4px;
		transition: background-color 0.15s ease;
		cursor: pointer;
	}

	label.capitalize:hover {
		background: var(--bg-surface-2);
	}

	label.capitalize input[type='checkbox'] {
		width: auto;
		cursor: pointer;
	}

	.error {
		color: #ef4444;
		font-size: 0.85rem;
		margin-top: -0.5rem;
		display: block;
	}

	.form-buttons {
		display: flex;
		gap: 0.75rem;
		justify-content: flex-end;
		margin-top: 0.5rem;
		padding-top: 0.5rem;
		border-top: 1px solid var(--border);
	}

	.form-buttons button {
		padding: 0.6rem 1.25rem;
		font-weight: 500;
	}

	.form-buttons button[type='button'] {
		background: var(--bg-surface-2);
		border-color: var(--border);
	}

	.form-buttons button[type='submit'] {
		background: var(--accent);
		color: white;
		border-color: var(--accent);
	}

	.form-buttons button[type='submit']:hover {
		background: var(--accent-hover);
		border-color: var(--accent-hover);
	}

	textarea {
		resize: vertical;
		min-height: 80px;
		font-family: inherit;
	}
</style>
