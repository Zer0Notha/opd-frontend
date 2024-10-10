export interface DebounceProps {
	callback: () => void;
	delay?: number;
}

export const debounce = (() => {
	let timers: ReturnType<typeof setTimeout>;

	return (callback: DebounceProps['callback'], delay = 300) => {
		const timer = delay;
		if (timers) {
			clearTimeout(timers);
		}

		timers = setTimeout(callback, timer);
	};
})();
