import { SWRConfig } from "swr";

export function SWRProvider({ children }: { children: React.ReactNode }) {
	return (
		<SWRConfig
			value={{
				fetcher: (resource, init) =>
					fetch(resource, init).then((res) => res.json()),
			}}
		>
			{children}
		</SWRConfig>
	);
}

export type Pagination = {
	current_page: number;
	last_visible_page: number;
	has_next_page: boolean;
	items: {
		count: number;
		total: number;
		per_page: number;
	};
};
