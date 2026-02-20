<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav>
	<a href="/" class:active={page.url.pathname === '/'}>Home</a>
	<a href="/ingredients" class:active={page.url.pathname.startsWith('/ingredients')}>Ingredients</a>
	<a href="/meals" class:active={page.url.pathname.startsWith('/meals')}>Meals</a>
	<a href="/plan" class:active={page.url.pathname.startsWith('/plan')}>Plan</a>
	<a href="/grocery" class:active={page.url.pathname.startsWith('/grocery')}>Grocery</a>
	<a href="/settings" class:active={page.url.pathname.startsWith('/settings')}>Settings</a>
	<a href="/" class="site-title" class:active={page.url.pathname === '/'}>Meal Cycles</a>
</nav>

<main>
	{@render children()}
</main>

<style>
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

	.site-title {
		text-transform: uppercase;
		font-weight: bold;
		margin: 0 0 0 auto;
	}

	main {
		padding: 2rem;
	}
</style>
