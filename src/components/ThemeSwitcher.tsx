import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export const ThemeSwitcher = ({ ...props }) => {
	const { theme, setTheme } = useTheme();
	const isDark: boolean = theme === "dark";

	const changeTheme = () => (isDark ? setTheme("light") : setTheme("dark"));

	return (
		<div {...props}>
			<Button variant="ghost" onClick={changeTheme}>
				{isDark ? "Dark Mode" : "Light Mode"}
			</Button>
		</div>
	);
};
