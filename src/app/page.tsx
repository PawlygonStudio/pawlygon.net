import { buttonVariants } from "@/components/ui/button";
import { Suspense } from "react";
import icons from "../lib/socialIcons";
import Image from "next/image";

export default function Home() {
	return (
		<>
			<div className="grid h-full w-full grid-cols-2 gap-2">
				<div className="col-span-full border-b-2 border-muted md:col-span-1 md:border-b-0 md:border-r-2 flex flex-col justify-center ">
					<div>
						<div className="md:size-[16vw] size-32 mx-auto">
							<Image
								src={"/logo.png"}
								width={2000}
								height={2000}
								alt="Pawlygon logo"
							/>
						</div>
						<h1 className="md:text-[3vw] md:leading-tight text-4xl text-center">
							Pawlygon Studio
						</h1>
						<p className="md:text-[2.5vw] md:leading-relaxed text-2xl text-center">
							Upgrading your 3D experience!
						</p>
						<p className="md:text-[1vw] md:leading-relaxed text-md text-center">
							Face Tracking addons and 3d accessories
						</p>
					</div>
				</div>
				<div className="col-span-full md:col-span-1 flex flex-col md:p-4 w-full h-full">
					<div className="w-full min-w-[360px] max-w-[1280px] h-fit mx-auto aspect-video">
						<div className="relative w-full overflow-hidden pt-[56.25%]">
							<Suspense fallback={<p>Loading video...</p>}>
								<iframe
									width="560"
									height="315"
									src="https://www.youtube.com/embed?autoplay=1&mute=1&listType=playlist&list=UUSwcAsfgsbRkkgC1u5TcvZw"
									title="YouTube video player"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; muted"
									referrerPolicy="strict-origin-when-cross-origin"
									allowFullScreen
									className="rounded-md  w-full h-full absolute top-0 right-0 left-0"
								></iframe>
							</Suspense>
						</div>
					</div>
					<div className=" grow flex flex-col justify-around">
						<p className="w-full text-center mx-auto text-2xl md:text-[4vw] select-none">
							Check out our work!
						</p>
						<div className="flex justify-around">
							<a
								href="https://pawlygon.gumroad.com"
								className={
									buttonVariants({ variant: "default", size: "lg" }) +
									" !bg-[#ff90e8] text-black before:content-['Gumroad'] before:mr-2 md:h-[8vh] md:w-[16vw] md:text-2xl"
								}
							>
								{icons.Gumroad}
							</a>
							<a
								href="https://pawlygon.booth.pm"
								className={
									buttonVariants({ variant: "default", size: "lg" }) +
									" !bg-[#e16055] text-black before:content-['Booth'] before:mr-2 md:h-[8vh] md:w-[16vw] md:text-2xl"
								}
							>
								{icons.Pixiv}
							</a>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
