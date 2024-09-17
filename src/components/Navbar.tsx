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

const links = ['Products', 'About', 'Contact']
const separatorInnerColors = ['#ff2495', '#f3ed59', '#59a8f3', '#ff2495']
const separatorOuterColors = ['#59a8f3', '#ff2495', '#f3ed59', '#59a8f3']
const transitionSpeed = 3

export function NavBar() {
	const { scrollY } = useScroll()
	const [hidden, setHidden] = React.useState(false)

	useMotionValueEvent(scrollY, 'change', (latest) => {
		const previous = scrollY.getPrevious() ?? 0
		if (previous > 50 && latest > previous) {
			setHidden(true)
		} else {
			setHidden(false)
		}
	})

	const InnerColor = useMotionValue(separatorInnerColors[0])
	const OuterColor = useMotionValue(separatorOuterColors[0])
	const backgroundImage = useMotionTemplate`radial-gradient(circle at center, ${InnerColor}, ${OuterColor})`

	React.useEffect(() => {
		animate(InnerColor, separatorInnerColors, {
			ease: 'easeInOut',
			duration: transitionSpeed,
			repeat: Infinity
		})
	}, [])
	React.useEffect(() => {
		animate(OuterColor, separatorOuterColors, {
			ease: 'easeInOut',
			duration: transitionSpeed,
			repeat: Infinity
		})
	}, [])

	return (
		<motion.nav
			variants={{
				visible: { y: 0 },
				hidden: { y: '-68%' }
			}}
			animate={hidden ? 'hidden' : 'visible'}
			transition={{
				duration: 0.2,
				ease: 'easeInOut'
			}}
			className="bright fixed top-0 z-50 w-full bg-backgroundBlurred backdrop-blur-md"
		>
			<div className="mb-2 mt-4 flex items-baseline justify-center">
				<img src={Logo} alt={'Pawlygon logo'} className="size-16" />
				<h1 className="select-none font-['Coolveltica'] text-5xl font-semibold">Pawlygon</h1>
			</div>
			<div className="flex items-center justify-between">
				<div className="w-10"></div>
				<div>
					<a href="/" className={buttonVariants({ variant: 'link' })}>
						Home
					</a>
					{/* Create buttons from 'links' array  */}
					{links.map((link) => (
						<a href={link} className={buttonVariants({ variant: 'link' })}>
							{link}
						</a>
					))}
				</div>
				<ModeToggle />
			</div>
			{/* Animated separator */}
			<motion.div
				style={{
					backgroundImage
				}}
				className="h-0.5 w-full"
			/>
		</motion.nav>
	)
}
