<script lang="ts">
	import { page } from '$app/state';
	import { browser } from '$app/environment';
	import { appState, STORAGE_KEY } from '$lib/stores/state.svelte';
	import favicon from '$lib/assets/favicon.svg';
	import '../reset.css';

	$effect(() => {
		if (!browser) return;
		localStorage.setItem(
			STORAGE_KEY,
			JSON.stringify({
				cycleStartDate: appState.cycleStartDate,
				ingredients: appState.ingredients,
				recipes: appState.recipes,
				plan: appState.plan
			})
		);
	});

	let { children } = $props();
</script>

<svelte:head>
	<title>MealCycles</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav>
	<span class="wordmark">MealCycles</span>
	<a href="/recipes" class:active={page.url.pathname.startsWith('/recipes')}>Recipes</a>
	<a href="/plan" class:active={page.url.pathname === '/plan'}>Plan</a>
	<a href="/grocery" class:active={page.url.pathname.startsWith('/grocery')}>Grocery</a>
</nav>

<main>
	{@render children()}
</main>

<style>
	nav {
		padding: 1rem 2rem;
		border-bottom: 1px solid black;
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	.wordmark {
		font-weight: bold;
		letter-spacing: 0.05em;
		margin-right: auto;
	}

	nav a {
		text-decoration: none;
		color: black;
		transition: color 0.15s ease;
	}

	nav a.active {
		font-weight: bold;
	}

	main {
		padding: 2rem;
	}
</style>
