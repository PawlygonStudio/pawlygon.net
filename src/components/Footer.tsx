import { buttonVariants } from "./ui/button";
import icons from "../lib/socialIcons";
import Link from "next/link";

export function Footer() {
	const socials = [
		{
			name: "Twitter",
			link: "https://x.com/Pawlygon_studio",
			icon: icons.twitter,
		},
		{
			name: "Youtube",
			link: "https://www.youtube.com/@Pawlygon",
			icon: icons.youtube,
		},
		{
			name: "TikTok",
			link: "https://www.tiktok.com/@pawlygon_studio",
			icon: icons.tiktok,
		},
		{
			name: "Bluesky",
			link: "https://bsky.app/profile/pawlygon.net",
			icon: icons.bluesky,
		},
		{
			name: "BiliBili",
			link: "https://space.bilibili.com/3546767433927187?spm_id_from=333.1007.0.0",
			icon: icons.bilibili,
		},
	];

	return (
		<div className="flex h-14 w-full place-items-stretch justify-center border-t-2 bg-backgroundBlurred align-middle backdrop-blur-lg backdrop-saturate-50 md:justify-between">
			<p className="my-auto fill-foreground pl-8 hidden md:inline">
				©{new Date().getFullYear()} - Pawlygon Studio
			</p>
			<div>
				{socials.map((social) => (
					<Link
						key={social.name}
						href={social.link}
						// @ts-expect-error socialName is a custom HTML parameter
						socialname={social.name}
						className={
							buttonVariants({ variant: "link" }) +
							" my-auto fill-foreground md:before:mr-2 md:before:content-[attr(socialname)]"
						}
					>
						{social.icon}
					</Link>
				))}
			</div>
		</div>
	);
}
