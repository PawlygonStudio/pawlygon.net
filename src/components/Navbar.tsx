"use client";

import { useEffect, useState } from "react";
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
import useSWR from "swr";

// @ts-expect-error: A spread argument must either have a tuple type or be passed to a rest parameter.
const fetcher = (...args) => fetch(...args).then((res) => res.json());

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
		animate(OuterColor, separatorOuterColors, {
			ease: "linear",
			duration: transitionSpeed,
			repeat: Infinity,
		});
	});

	// Get Commission state from api
	const [isCommission, setIsCommission] = useState(false);
	const { data } = useSWR("https://api.pawlygon.net/commissions", fetcher);

	// Update Commission state
	useEffect(() => {
		if (data)
			return data.length === 0 ? setIsCommission(false) : setIsCommission(true);
	}, [data]);

	return (
		<nav className="bright top-0 z-50 w-full bg-backgroundBlurred backdrop-blur-lg backdrop-saturate-50">
			<div className="grid grid-cols-3">
				<Link
					href={"/"}
					className="col-span-2 mb-2 mt-4 flex items-center justify-center justify-self-start pl-4 md:col-span-1"
				>
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
				</Link>
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
				variants={{
					closed: {
						height: "0.125rem",
					},
					open: {
						height: "2.5rem",
					},
				}}
				initial={"closed"}
				animate={isCommission ? "open" : "closed"}
				className="w-full overflow-hidden flex flex-row justify-center"
			>
				<div className="mr-auto"></div>
				<div className="my-auto">
					<span className="text-center text-black">
						We are open for commissions! Click{" "}
						<Link href={"commissions"} className="underline">
							here
						</Link>{" "}
						for more info!
					</span>
				</div>
				<div className="my-auto ml-auto pr-4">
					<button
						onClick={() => setIsCommission(false)}
						className={isCommission ? "visible" : "hidden"}
					>
						<span className="text-black">X</span>
					</button>
				</div>
			</motion.div>
		</nav>
	);
}
