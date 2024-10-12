import "@/styles/globals.css";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Pawlygon",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<div className="flex h-screen flex-col overflow-hidden">
						<NavBar />
						<main className="z-20 m-2 box-border grow overflow-auto overscroll-contain rounded-md border-2 border-transparent bg-backgroundBlurred p-2 backdrop-blur-lg backdrop-saturate-50 backdrop-filter transition duration-300 ease-in-out hover:border-muted-foreground md:m-8">
							{children}
						</main>
						<Footer />
						<video
							src="/test.mp4"
							autoPlay
							muted
							loop
							disablePictureInPicture
							className="absolute top-0 -z-20 h-screen w-screen object-cover"
						></video>
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
