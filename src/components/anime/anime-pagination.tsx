import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";

export function AnimePagination({
	page,
	setPage,
	limit = 25,
	setLimit,
	totalPages,
}: {
	page: number;
	setPage: (page: number) => void;
	limit: number;
	setLimit: (limit: number) => void;
	totalPages: number;
}) {
	const prevCount = Math.min(page - 1, 2);
	const showLeftEllipsis = page > 3;
	const nextCount = Math.min(totalPages - page, 2);
	const showRightEllipsis = totalPages - page > 2;
	console.log({
		page,
		totalPages,
		prevCount,
		showLeftEllipsis,
		showRightEllipsis,
		nextCount,
	});

	return (
		<div className="flex items-center justify-end gap-4">
			<Pagination className="w-auto mx-0">
				<PaginationContent>
					{page === 1 ? null : (
						<PaginationItem
							onClick={() => {
								setPage(1);
							}}
						>
							<PaginationLink
								aria-label="Go to previous page"
								size="default"
								className={cn("size-9")}
							>
								<ChevronsLeftIcon />
							</PaginationLink>
						</PaginationItem>
					)}
					{page === 1 ? null : (
						<PaginationItem
							onClick={() => {
								setPage(Math.max(page - 1, 1));
							}}
						>
							<PaginationPrevious href="#" className="size-9" />
						</PaginationItem>
					)}
					{new Array(prevCount).fill(0).map((_, i) => (
						<PaginationItem key={i}>
							<PaginationLink
								className="cursor-pointer"
								onClick={() => {
									setPage(i + 1 + Math.max(page - 4, 0));
								}}
							>
								{i + 1 + Math.max(page - 4, 0)}
							</PaginationLink>
						</PaginationItem>
					))}
					{showLeftEllipsis ? (
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
					) : null}
					<PaginationItem className="">
						<PaginationLink
							href="#"
							className="bg-indigo-600 text-white hover:text-white hover:bg-indigo-600"
						>
							{page}
						</PaginationLink>
					</PaginationItem>

					{showRightEllipsis ? (
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
					) : null}
					{new Array(nextCount).fill(0).map((_, i) => (
						<PaginationItem key={i}>
							<PaginationLink
								className="cursor-pointer"
								onClick={() => {
									setPage(page + i + 1 + (showRightEllipsis ? 1 : 0));
								}}
							>
								{page + i + 1 + (showRightEllipsis ? 1 : 0)}
							</PaginationLink>
						</PaginationItem>
					))}

					{page === totalPages ? null : (
						<PaginationItem
							onClick={() => {
								setPage(Math.min(page + 1, totalPages));
							}}
						>
							<PaginationNext href="#" />
						</PaginationItem>
					)}
					{page === totalPages ? null : (
						<PaginationItem
							onClick={() => {
								setPage(totalPages);
							}}
						>
							<PaginationLink
								aria-label="Go to previous page"
								size="default"
								className={cn("size-9")}
							>
								<ChevronsRightIcon />
							</PaginationLink>
						</PaginationItem>
					)}
				</PaginationContent>
			</Pagination>
			<Select
				defaultValue={limit?.toString() ?? "25"}
				onValueChange={(v) => setLimit?.(Number(v))}
			>
				<SelectTrigger className="w-[80px]">
					<SelectValue placeholder="Limit" />
				</SelectTrigger>
				<SelectContent align="end">
					<SelectItem value="5">5</SelectItem>
					<SelectItem value="10">10</SelectItem>
					<SelectItem value="25">25</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
}
