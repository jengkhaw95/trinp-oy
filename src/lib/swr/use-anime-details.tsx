import useSWR from "swr";
import type { AnimeData } from "./types";

type UseTopAnimeDetailsParams = {
	id?: string;
};

export const useAnimeDetails = ({ id }: UseTopAnimeDetailsParams) => {
	return useSWR<{ data: AnimeData }>(
		id ? `https://api.jikan.moe/v4/anime/${id}/full` : null,
	);
};
