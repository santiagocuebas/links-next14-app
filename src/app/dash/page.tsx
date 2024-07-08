'use client';

import type { ILink, IUser } from "@/lib/types/global";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { getData } from "@/lib/action";
import { Link, Search, Form } from '@/lib/components';
import { loadToken } from "@/lib/services";
import { useLinksStore } from "@/lib/store";
import styles from '@/lib/styles/Profile.module.css';

export default function DashPage() {
	const links = useLinksStore(state => state.links);
	const setLink = useLinksStore(state => state.setLink);
	const [user, setUser] = useState<IUser | null>(null);
	const [visible, setVisible] = useState(false);
	
	function changeVisibility(value: ILink) {
		setLink(value);
		setVisible(true);
	}

	useEffect(() => {
		async function loadData() {
			const data = await getData('/auth/userData');

			if (!(data instanceof Array)) {
    		setUser(data.user);
    		loadToken(data.token);
			}
		}

		loadData();
	}, []);

	useEffect(() => {
		async function loadData() {
			const links = await getData('/user/links');

			if (links instanceof Array) {
				useLinksStore.setState({ links, rawLinks: links });
			}
		}

		loadData();
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
