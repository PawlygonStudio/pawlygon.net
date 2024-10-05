import * as React from 'react'
import {
	motion,
	useScroll,
	useMotionValueEvent,
	useMotionTemplate,
	useMotionValue,
	animate
} from 'framer-motion'
import Logo from '/pawlygon logo.png?url'
import { buttonVariants } from './ui/button'
import { ModeToggle } from '@/components/ui/ModeToggle'

const links = ['commissions', 'about']

//Animated separator consts
const separatorInnerColors = ['#ff2495', '#f3ed59', '#59a8f3', '#ff2495']
const separatorOuterColors = ['#59a8f3', '#ff2495', '#f3ed59', '#59a8f3']
const transitionSpeed = 6

export function NavBar() {
	// Framer motion animated separator setup
	const InnerColor = useMotionValue(separatorInnerColors[0])
	const OuterColor = useMotionValue(separatorOuterColors[0])
	const backgroundImage = useMotionTemplate`radial-gradient(circle at center, ${InnerColor}, ${OuterColor})`

	React.useEffect(() => {
		animate(InnerColor, separatorInnerColors, {
			ease: 'linear',
			duration: transitionSpeed,
			repeat: Infinity
		})
	}, [])
	React.useEffect(() => {
		animate(OuterColor, separatorOuterColors, {
			ease: 'linear',
			duration: transitionSpeed,
			repeat: Infinity
		})
	}, [])

	return (
		<nav className="bright top-0 z-50 w-full bg-backgroundBlurred backdrop-blur-lg backdrop-saturate-50">
			<div className="grid grid-cols-3">
				<div className="col-span-2 mb-2 mt-4 flex items-center justify-center justify-self-start pl-4 md:col-span-1">
					<img src={Logo} alt={'Pawlygon logo'} className="size-12" />
					<h1 className="select-none font-['Coolveltica'] text-3xl font-semibold">Pawlygon</h1>
				</div>
				<div className="hidden items-end justify-center place-self-stretch md:flex">
					<div>
						<a href="/" className={buttonVariants({ variant: 'link', size: 'lg' })}>
							Home
						</a>
						{/* Create buttons from 'links' array  */}
						{links.map((link) => (
							<a href={link} className={buttonVariants({ variant: 'link', size: 'lg' })}>
								{link}
							</a>
						))}
					</div>
				</div>
				<div className="hidden items-end justify-end place-self-stretch md:flex">
					<ModeToggle />
				</div>
			</div>
			{/* Animated separator */}
			<motion.div
				style={{
					backgroundImage
				}}
				className="h-0.5 w-full"
			/>
		</nav>
	)
}
