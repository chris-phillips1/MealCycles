<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<h1>Meal Cycles</h1>

<nav>
	<a href="/" class:active={page.url.pathname === '/'}>Home</a>
	<a href="/ingredients" class:active={page.url.pathname.startsWith('/ingredients')}>Ingredients</a>
	<a href="/meals" class:active={page.url.pathname.startsWith('/meals')}>Meals</a>
	<a href="/plan" class:active={page.url.pathname.startsWith('/plan')}>Plan</a>
	<a href="/grocery" class:active={page.url.pathname.startsWith('/grocery')}>Grocery</a>
</nav>

<main>
	{@render children()}
</main>

<style>
	h1 {
		padding-left: 1rem;
	}

	nav {
		padding: 1rem;
		border-bottom: 1px solid #ccc;
		display: flex;
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

	main {
		padding: 2rem;
	}
</style>
