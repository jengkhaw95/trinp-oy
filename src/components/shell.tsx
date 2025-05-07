import { IconPlanet } from "@tabler/icons-react";
import { Link, Outlet } from "react-router";

export function AppShell() {
	return (
		<main>
			<nav className="bg-indigo-700">
				<div className="flex items-center justify-between container mx-auto h-16 text-white font-bold text-lg">
					<Link to="/" className="px-4 flex items-center gap-2">
						<IconPlanet />
						Anime Search App
					</Link>
				</div>
			</nav>
			<div className="container mx-auto p-4">
				<Outlet />
			</div>
			{/* <Link to="/">Home</Link>
			<Link to="/anime/1">Anime</Link>
			<Link to="/anime/2">Anime 2</Link>
			<Link to="/anime/3">Anime 3</Link> */}
		</main>
	);
}
