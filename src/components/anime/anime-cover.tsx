import { Loader } from "lucide-react";
import { Loading } from "../loading";

type AnimeCoverProps = {
	src: string;
	alt?: string;
	title: string;
};
export function AnimeCover({ alt, src, title }: AnimeCoverProps) {
	return (
		<div className="relative w-full h-auto bg-neutral-50">
			<div className="flex items-center justify-center absolute inset-0">
				<Loading />
			</div>
			<img
				src={src}
				alt={alt ?? title}
				className="relative w-full aspect-[3/4] object-cover z-10"
			/>
		</div>
	);
}
