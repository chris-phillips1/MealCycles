<script lang="ts">
	function test() {
		console.log('Test function called');
	}
</script>

<section>
	<label for="cycle-start-date">Start Date</label>
	<input id="cycle-start-date" type="date" />

	<label for="cycle-length">Cycle Length</label>
	<input id="cycle-length" type="number" min="20" max="35" value="28" />

	<input type="submit" onclick={test} />
</section>

<style>
	section {
		max-width: 400px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
	}

	section input {
		margin: 0.5rem 0;
		padding: 0.5rem;
		font-size: 1rem;
		border: 1px solid #ccc;
		border-radius: 4px;
	}
</style>
