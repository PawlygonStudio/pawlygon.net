"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export const ThemeSwitcher = ({ ...props }) => {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();
	const isDark: boolean = theme === "dark";

	const changeTheme = () => (isDark ? setTheme("light") : setTheme("dark"));

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<div {...props}>
			<Button variant="ghost" onClick={changeTheme}>
				{isDark ? "Dark Mode" : "Light Mode"}
			</Button>
		</div>
	);
};
