export function toggleArrayItem<T>(arr: T[], item: T): T[] {
	return arr.includes(item) ? arr.filter((v) => v !== item) : [...arr, item];
}
