import { useEffect, useState } from "react";
import { useAnimeList } from "../swr/use-anime-list";
import { Input } from "../ui/input";
import { AnimeCover } from "./anime-cover";
import { debounce } from "@/lib/utils";
import { Loading } from "../loading";
import { NoData } from "../no-data";
import { StarIcon, Users2Icon } from "lucide-react";
import { Link } from "react-router";
import { AnimePagination } from "./anime-pagination";

export function AnimeList() {
	const [search, setSearch] = useState("");
	const debouncedSearch = debounce(setSearch, 500);

	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);

	const { data, isLoading } = useAnimeList({ search, page, limit });

	const animeList = data?.data ?? [];

	useEffect(() => {
		if (search) {
			setPage(1);
		}
	}, [search]);

	return (
		<div className="flex flex-col gap-4">
			<Input
				type="search"
				defaultValue={search}
				onChange={(e) => {
					debouncedSearch.call(null, e.currentTarget.value ?? "");
				}}
				placeholder="Search for anime..."
			/>
			{isLoading ? (
				<div className="py-12">
					<Loading />
				</div>
			) : !animeList.length ? (
				<div className="py-12">
					<NoData />
				</div>
			) : (
				<div className="flex flex-col gap-4">
					<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
						{animeList.map((anime) => (
							<Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
								<div className="group hover:shadow transition-all relative">
									{/* {JSON.stringify(anime.images.webp)} */}
									<AnimeCover
										key={anime.mal_id}
										src={anime.images.webp.large_image_url}
										title={anime.title}
									/>
									<div className="absolute w-full left-0 bottom-0 z-10 px-3 pb-1.5 pt-6 select-none group-hover:opacity-100 opacity-0 transition-opacity bg-gradient-to-t from-neutral-900 to-transparent text-neutral-50">
										<div>{anime.title}</div>
										<div className="flex items-center gap-2 justify-between text-xs">
											{anime.score ? (
												<div className="flex items-center gap-0.5">
													<StarIcon size={12} />
													<span>{anime.score.toFixed(1)}</span>
												</div>
											) : null}
											{anime.scored_by ? (
												<div className="flex items-center gap-0.5 mt-1">
													<Users2Icon size={12} />
													<span>{anime.scored_by.toLocaleString()}</span>
												</div>
											) : null}
										</div>
									</div>
								</div>
							</Link>
						))}
					</div>

					<AnimePagination
						page={page}
						setPage={setPage}
						limit={limit}
						setLimit={setLimit}
						totalPages={data?.pagination?.last_visible_page ?? 0}
					/>
				</div>
			)}
		</div>
	);
}
