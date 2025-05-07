import { Loader2Icon } from "lucide-react";

export function Loading() {
	return (
		<div className="flex flex-col items-center justify-center w-full h-full text-neutral-500">
			<Loader2Icon className="animate-spin" />
			<p>Loading...</p>
		</div>
	);
}
