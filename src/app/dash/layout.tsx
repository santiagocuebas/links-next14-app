import type { ChildProp } from "@/lib/types/props";
import { Nav, Footer } from '@/lib/components';
import styles from '@/lib/styles/Layout.module.css';

export default async function DashLayout({ children }: Readonly<ChildProp>) {
	return (
		<div className={styles.main}>
			<Nav />
			{children}
			<Footer />
		</div>
	);
}
