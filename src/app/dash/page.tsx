'use client';

import type { ILink } from "@/lib/types/global";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { getUserData } from "@/lib/actions";
import { Link, Search, Form } from '@/lib/components';
import { loadUser } from "@/lib/services";
import { useLinksStore, useUserStore } from "@/lib/store";
import styles from '@/lib/styles/Profile.module.css';

export default function DashPage() {
	const user = useUserStore(state => state.user);
	const links = useLinksStore(state => state.links);
	const setUser = useUserStore(state => state.setUser);
	const setLink = useLinksStore(state => state.setLink);
	const [visible, setVisible] = useState(false);
	
	function changeVisibility(value: ILink) {
		setLink(value);
		setVisible(true);
	}

	useEffect(() => {
		const setData = async () => {
			const data = await getUserData();

			if (data) {
				loadUser(data, setUser);
				useLinksStore.setState({ links: data.links, rawLinks: data.links });
			}
		};

		setData();
	}, []);
	
	return (
		<>
			{
				visible
					? <div className={styles.absolute}>
							<Form setVisible={setVisible} />
						</div>
					: null
			}

			<div className={styles.user}>
				Welcome {user?.username}
			</div>

			<div className={styles.links}>
				<Search />
				{
					links.length > 0
						? <>
								{
									links.map(link => (
										<Link key={link.id} link={link} change={changeVisibility} />
									))
								}
								<div className={styles.box}>
									<button className={styles.button} onClick={() => setVisible(true)}>
										<FaPlus size={32} />
									</button>
								</div>
							</>
						: <div className={styles.message}>
								Haven&apos;t saved any links yet?
								<button className={styles.save} onClick={() => setVisible(true)}>
									Starts now!
								</button>
							</div>
				}
			</div>
		</>
	);
}
