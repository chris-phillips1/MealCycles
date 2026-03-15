import { browser } from '$app/environment';

export function persisted<T>(key: string, defaultValue: T) {
	const initial: T = browser
		? (() => {
				try {
					const raw = localStorage.getItem(key);
					return raw ? (JSON.parse(raw) as T) : defaultValue;
				} catch {
					return defaultValue;
				}
			})()
		: defaultValue;

	let value = $state<T>(initial);

	$effect.root(() => {
		$effect(() => {
			if (!browser) return;
			try {
				localStorage.setItem(key, JSON.stringify(value));
			} catch (e) {
				console.error(`Failed to persist "${key}":`, e);
			}
		});
	});

	return {
		get value(): T {
			return value;
		},
		set value(v: T) {
			value = v;
		}
	};
}
