export function debounce<T>(callback: (args: T[]) => void) {
	let timeoutId: number;

	return (...args: T[]) => {
		if (window !== undefined) {
			window.cancelAnimationFrame(timeoutId);
			timeoutId = window.requestAnimationFrame(() => {
				callback(args);
			});
		}

		return callback(args);
	};
}
