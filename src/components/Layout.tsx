import { Footer } from "./Footer";
import { NavBar } from "./Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import Head from "next/head";

export default function Layout({ children }) {
	return (
		<>
			<Head>
				<title>Pawlygon</title>
			</Head>
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
		</>
	);
}
