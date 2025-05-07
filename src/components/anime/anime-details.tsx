import { Link, useParams } from "react-router";
import { Button } from "../ui/button";
import { AnimeCover } from "./anime-cover";
import { Loading } from "../loading";
import { NoData } from "../no-data";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { IconStar, IconStarFilled } from "@tabler/icons-react";
import { toast } from "sonner";
import {
	ArrowLeftIcon,
	FlameIcon,
	PlayIcon,
	StarIcon,
	StarsIcon,
	Users2Icon,
} from "lucide-react";
import { useAnimeDetails } from "@/lib/swr/use-anime-details";

export function AnimeDetails() {
	const { id } = useParams<{ id: string }>();
	const { data, isLoading } = useAnimeDetails({ id });

	const [favAnimeIds, setFavAnimeIds] = useLocalStorage<string[]>(
		"favAnimeIds",
		[],
	);

	const isFav = favAnimeIds.includes(id ?? "");

	const animeData = data?.data;

	const [showFullSynopsis, setShowFullSynopsis] = useState(false);

	return (
		<div className="flex flex-col gap-4">
			<div>
				<Link to="/">
					<Button variant={"secondary"} className="gap-2">
						<ArrowLeftIcon />
						Back
					</Button>
				</Link>
			</div>
			{isLoading ? (
				<Loading />
			) : !animeData ? (
				<NoData />
			) : (
				<div className="min-h-[calc(100vh-192px)]">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						<div className="relative">
							<div className="sticky top-6">
								<AnimeCover
									src={animeData.images.webp.large_image_url}
									title={animeData.title}
									alt={animeData.title}
								/>
								<Button
									type="button"
									size={"icon"}
									variant={"ghost"}
									className="absolute right-3 top-3 z-10 text-yellow-300 hover:bg-transparent hover:text-yellow-500 cursor-pointer"
									onClick={() => {
										if (!id) {
											return;
										}
										if (isFav) {
											// @ts-ignore
											setFavAnimeIds((prev) =>
												// @ts-ignore
												prev.filter((favId) => favId !== id),
											);
											toast.success("Removed from favorites");
										} else {
											// @ts-ignore
											setFavAnimeIds((prev) => [...prev, id]);
											toast.success("Added to favorites");
										}
									}}
								>
									{isFav ? (
										<IconStarFilled className="size-6" />
									) : (
										<IconStar className="size-6" />
									)}
								</Button>
							</div>
						</div>
						<div className="flex flex-col gap-4 lg:col-span-2">
							<h1 className="text-2xl font-bold">{animeData.title}</h1>
							<div className="flex items-center gap-2">
								{animeData.genres.map((genre) => (
									<Badge
										key={genre.mal_id}
										className="bg-indigo-500 text-white"
									>
										{genre.name}
									</Badge>
								))}
							</div>
							<div>
								<p
									className={cn("text-sm text-muted-foreground", {
										"line-clamp-3": !showFullSynopsis,
									})}
								>
									{animeData.synopsis}
								</p>
								{showFullSynopsis || !animeData.synopsis ? null : (
									<Button
										type="button"
										variant={"link"}
										size={"sm"}
										className="px-0 py-0 text-sm text-indigo-500"
										onClick={() => {
											setShowFullSynopsis(true);
										}}
									>
										Show more
									</Button>
								)}
							</div>
							<div>
								<h2 className="mb-2">Episodes</h2>
								{animeData.episodes ? (
									<div className="grid grid-cols-3 gap-4 lg:grid-cols-6">
										{new Array(animeData.episodes).fill(0).map((_, index) => (
											<div
												key={index}
												className="flex items-center justify-center w-full text-sm h-10 bg-indigo-50 hover:bg-indigo-500 hover:text-white rounded-md"
											>
												{index + 1}
											</div>
										))}
									</div>
								) : (
									<NoData />
								)}
							</div>
						</div>
					</div>
				</div>
			)}
			{isLoading || !animeData ? null : (
				<div className="sticky bottom-6 w-max mx-auto border rounded-lg shadow bg-background p-3 pl-4 flex items-center gap-3">
					<div className="flex items-center gap-1">
						<StarIcon size={16} className="text-yellow-500" />
						<span className="text-sm">
							{animeData?.score ? animeData.score.toFixed(1) : "No rating"}
						</span>
					</div>
					<div className="flex items-center gap-1">
						<Users2Icon size={16} className="text-emerald-500" />
						<span className="text-sm">
							{animeData?.scored_by
								? animeData.scored_by.toLocaleString()
								: "No votes"}
						</span>
					</div>
					{animeData?.popularity ? (
						<div className="flex items-center gap-1">
							<FlameIcon size={16} className="text-orange-500" />
							<span className="text-sm">
								{animeData.popularity.toLocaleString()}
							</span>
						</div>
					) : null}
					<Button
						className="gap-2 text-sm bg-indigo-500 hover:bg-indigo-600"
						size={"sm"}
					>
						<PlayIcon size={20} />
						<div>Watch Now</div>
					</Button>
				</div>
			)}
		</div>
	);
}
