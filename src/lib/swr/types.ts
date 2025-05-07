export type AnimeData = {
	mal_id: number;
	images: {
		webp: { image_url: string; large_image_url: string };
		jpg: { image_url: string; large_image_url: string };
	};
	title: string;
	score: number;
	scored_by: number;
	synopsis: string;
	genres: {
		name: string;
		mal_id: number;
		type: string;
	}[];
	popularity: number;
	episodes: number;
};
