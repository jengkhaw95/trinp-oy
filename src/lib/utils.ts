import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type DebounceFunction<T extends (...args: any[]) => any> = (
	this: ThisParameterType<T>,
	...args: Parameters<T>
) => void;

export function debounce<T extends (...args: any[]) => any>(
	func: T,
	delay: number,
): DebounceFunction<T> {
	let timeoutId: NodeJS.Timeout;

	return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
		clearTimeout(timeoutId);

		timeoutId = setTimeout(() => {
			func.apply(this, args);
		}, delay);
	};
}
