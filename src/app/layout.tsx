import type { Metadata } from "next";
import type { ChildProp } from "@/lib/types/props";
import { Inter } from "next/font/google";
import "@/lib/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "NJLinks",
	description: "Simple app to save links"
};

export default async function RootLayout({ children }: Readonly<ChildProp>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				{children}
			</body>
		</html>
	);
}
