import useSWR from "swr";
import type { Pagination } from "./swr-provider";
import type { AnimeData } from "./types";

type UseTopAnimeListParams = {
	search?: string;
	page?: number;
	limit?: number;
};

export const useAnimeList = ({
	search,
	page = 1,
	limit = 1,
}: UseTopAnimeListParams) => {
	const sp = new URLSearchParams({
		q: search ?? "",
		page: page.toString(),
		limit: limit.toString(),
	});

	return useSWR<{ data: AnimeData[]; pagination: Pagination }>(
		`https://api.jikan.moe/v4/anime?${sp.toString()}`,
	);
};
