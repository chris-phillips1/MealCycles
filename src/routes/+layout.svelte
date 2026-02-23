<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	import { getConfig } from '$lib/stores/state.svelte';

	let { children } = $props();

	let config = $derived(getConfig());
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav class:dark={config.theme == 'dark'}>
	<a href="/" class:active={page.url.pathname === '/'}>Home</a>
	<a href="/ingredients" class:active={page.url.pathname.startsWith('/ingredients')}>Ingredients</a>
	<a href="/meals" class:active={page.url.pathname.startsWith('/meals')}>Meals</a>
	<a href="/plan" class:active={page.url.pathname.startsWith('/plan')}>Plan</a>
	<a href="/grocery" class:active={page.url.pathname.startsWith('/grocery')}>Grocery</a>
	<p>Meal Cycles</p>
</nav>

<main class:dark={config.theme == 'dark'}>
	{@render children()}
</main>

<style>
	main {
		background-color: green;
	}

	nav.dark,
	nav.dark > * {
		background-color: #333;
		color: #bbb;
	}

	nav.dark > .active {
		color: #fff;
	}
	main.dark {
		background-color: #333;
	}

	nav {
		padding: 1rem;
		border-bottom: 1px solid #ccc;
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	nav a {
		text-decoration: none;
		color: #333;
	}

	nav a.active {
		font-weight: bold;
		color: #000;
	}

	nav :last-child {
		text-transform: uppercase;
		font-weight: bold;
		margin: 0 0 0 auto;
	}

	main {
		padding: 2rem;
	}
</style>
