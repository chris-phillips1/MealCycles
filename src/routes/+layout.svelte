<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	import { getConfig, updateConfig } from '$lib/stores/state.svelte';

	let { children } = $props();

	const config = $derived(getConfig());

	$effect(() => {
		document.documentElement.setAttribute('data-theme', config.theme ?? 'dark');
	});

	function toggleTheme() {
		updateConfig({ theme: config.theme === 'dark' ? 'light' : 'dark' });
	}
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
	<p>Meal Cycles</p>
	<button class="theme-toggle" onclick={toggleTheme} aria-label="Toggle theme">
		{config.theme === 'dark' ? '☀️' : '🌙'}
	</button>
</nav>

<main>
	{@render children()}
</main>

<style>
	/* ── Theme tokens ─────────────────────────────────────── */
	:global([data-theme='dark']) {
		--bg: #0f0f0f;
		--bg-surface: #1a1a1a;
		--bg-surface-2: #242424;
		--border: #2e2e2e;
		--text: #e8e8e8;
		--text-muted: #888;
		--accent: #c084fc;
		--accent-hover: #d8b4fe;
		--nav-bg: #111;
		--nav-border: #222;
		--badge-menstrual-bg: rgba(254, 202, 202, 0.15);
		--badge-menstrual-text: #fca5a5;
		--badge-follicular-bg: rgba(217, 249, 157, 0.15);
		--badge-follicular-text: #bef264;
		--badge-ovulation-bg: rgba(191, 219, 254, 0.15);
		--badge-ovulation-text: #93c5fd;
		--badge-luteal-bg: rgba(254, 215, 170, 0.15);
		--badge-luteal-text: #fdba74;
	}

	:global([data-theme='light']) {
		--bg: #f5f5f5;
		--bg-surface: #ffffff;
		--bg-surface-2: #ebebeb;
		--border: #ddd;
		--text: #111;
		--text-muted: #666;
		--accent: #7c3aed;
		--accent-hover: #6d28d9;
		--nav-bg: #ffffff;
		--nav-border: #e0e0e0;
		--badge-menstrual-bg: #fecaca;
		--badge-menstrual-text: #991b1b;
		--badge-follicular-bg: #d9f99d;
		--badge-follicular-text: #3f6212;
		--badge-ovulation-bg: #bfdbfe;
		--badge-ovulation-text: #1e40af;
		--badge-luteal-bg: #fed7aa;
		--badge-luteal-text: #9a3412;
	}

	/* ── Global base styles ───────────────────────────────── */
	:global(html),
	:global(body) {
		background-color: var(--bg);
		color: var(--text);
		transition:
			background-color 0.2s ease,
			color 0.2s ease;
	}

	:global(button) {
		background-color: var(--bg-surface-2);
		color: var(--text);
		border: 1px solid var(--border);
		border-radius: 6px;
		padding: 0.4rem 0.9rem;
		cursor: pointer;
		transition:
			border-color 0.15s ease,
			background-color 0.15s ease;
	}

	:global(button:hover) {
		border-color: var(--accent);
		background-color: var(--bg-surface);
	}

	:global(input),
	:global(select),
	:global(textarea) {
		background-color: var(--bg-surface-2);
		color: var(--text);
		border: 1px solid var(--border);
		border-radius: 6px;
		padding: 0.4rem 0.7rem;
		transition: border-color 0.15s ease;
	}

	:global(input:focus),
	:global(select:focus),
	:global(textarea:focus) {
		outline: none;
		border-color: var(--accent);
	}

	:global(input::placeholder) {
		color: var(--text-muted);
	}

	/* ── Nav ──────────────────────────────────────────────── */
	nav {
		padding: 1rem;
		border-bottom: 1px solid var(--nav-border);
		background-color: var(--nav-bg);
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	nav a {
		text-decoration: none;
		color: var(--text-muted);
		transition: color 0.15s ease;
	}

	nav a:hover {
		color: var(--text);
	}

	nav a.active {
		font-weight: bold;
		color: var(--accent);
	}

	nav :global(p) {
		text-transform: uppercase;
		font-weight: bold;
		margin: 0 0 0 auto;
		color: var(--text);
	}

	.theme-toggle {
		background: none;
		border: 1px solid var(--border);
		border-radius: 6px;
		padding: 0.25rem 0.5rem;
		cursor: pointer;
		font-size: 1rem;
		line-height: 1;
		transition: border-color 0.15s ease;
	}

	.theme-toggle:hover {
		border-color: var(--accent);
	}

	/* ── Main ─────────────────────────────────────────────── */
	main {
		padding: 2rem;
	}
</style>
