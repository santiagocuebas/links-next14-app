import type { ChildProp } from "@/lib/types/props";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Nav, Footer } from '@/lib/components';
import styles from '@/lib/styles/Layout.module.css';

export default async function DashLayout({ children }: Readonly<ChildProp>) {
	const token = cookies().get('authenticate');

	if (!token) redirect('/register');
	
	return (
		<div className={styles.main}>
			<Nav />
			{children}
			<Footer />
		</div>
	);
}
