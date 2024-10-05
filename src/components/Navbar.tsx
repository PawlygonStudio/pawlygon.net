import { useEffect } from "react";
import Image from "next/image";
import {
	motion,
	useMotionTemplate,
	useMotionValue,
	animate,
} from "framer-motion";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export function NavBar() {
	const links = ["commissions", "about"];

	//Animated separator consts
	const separatorInnerColors = ["#ff2495", "#f3ed59", "#59a8f3", "#ff2495"];
	const separatorOuterColors = ["#59a8f3", "#ff2495", "#f3ed59", "#59a8f3"];
	const transitionSpeed = 6;

	// Framer motion animated separator setup
	const InnerColor = useMotionValue(separatorInnerColors[0]);
	const OuterColor = useMotionValue(separatorOuterColors[0]);
	const backgroundImage = useMotionTemplate`radial-gradient(circle at center, ${InnerColor}, ${OuterColor})`;

	useEffect(() => {
		animate(InnerColor, separatorInnerColors, {
			ease: "linear",
			duration: transitionSpeed,
			repeat: Infinity,
		});
	});
	useEffect(() => {
		animate(OuterColor, separatorOuterColors, {
			ease: "linear",
			duration: transitionSpeed,
			repeat: Infinity,
		});
	});

	return (
		<nav className="bright top-0 z-50 w-full bg-backgroundBlurred backdrop-blur-lg backdrop-saturate-50">
			<div className="grid grid-cols-3">
				<div className="col-span-2 mb-2 mt-4 flex items-center justify-center justify-self-start pl-4 md:col-span-1">
					<Image
						src="/logo.png"
						alt="Pawlygon logo"
						width={48}
						height={48}
						className="size-12"
					/>
					<h1 className="select-none font-['Coolveltica'] text-3xl font-semibold">
						Pawlygon
					</h1>
				</div>
				<div className="hidden items-end justify-center place-self-stretch md:flex">
					<div>
						<Link href="/" className={buttonVariants({ variant: "link" })}>
							Home
						</Link>
						{/* Create buttons from 'links' array  */}
						{links.map((link) => (
							<Link
								key={link}
								href={link}
								className={buttonVariants({ variant: "link" })}
							>
								{link}
							</Link>
						))}
					</div>
				</div>
				<ThemeSwitcher className="hidden items-end justify-end place-self-stretch md:flex" />
			</div>
			{/* Animated separator */}
			<motion.div
				style={{
					backgroundImage,
				}}
				className="h-0.5 w-full"
			/>
		</nav>
	);
}
