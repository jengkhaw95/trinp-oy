import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { AppShell } from "./components/shell";
import { SWRProvider } from "./components/swr/swr-provider";
import { AnimeList } from "./components/anime/anime-list";
import { AnimeDetails } from "./components/anime/anime-details";
import { Toaster } from "sonner";
import { CheckCircle2 } from "lucide-react";

function App() {
	const [count, setCount] = useState(0);

	return (
		<SWRProvider>
			<BrowserRouter>
				<Routes>
					<Route element={<AppShell />}>
						<Route path="/" element={<AnimeList />} />
						<Route path="/anime/:id" element={<AnimeDetails />} />
					</Route>
				</Routes>
			</BrowserRouter>
			<Toaster
				icons={{
					success: <CheckCircle2 size={16} className="text-emerald-500" />,
				}}
			/>
		</SWRProvider>
	);
}

export default App;
