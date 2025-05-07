import { IconPlanetOff } from "@tabler/icons-react";

export function NoData() {
	return (
		<div className="flex flex-col items-center justify-center w-full h-full text-neutral-500">
			<IconPlanetOff size={24} />
			<p>No data available</p>
		</div>
	);
}
