'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { FaEllipsisH, FaRegCaretSquareRight, FaTimesCircle } from 'react-icons/fa';
import axios from '../axios';
import { deleteCookie } from 'cookies-next';
import { Logo } from './index';
import { useOutClick } from '../services';
import { useLinksStore } from '../store';
import styles from'../styles/Nav.module.css';
import { Method } from '../types/enums';

export default function Nav() {
	const router = useRouter();
	const ref = useRef<HTMLUListElement | null>(null);
	const resetLinks = useLinksStore(state => state.resetLinks);
	const [visible, setVisible] = useState(false);

	useOutClick(ref, setVisible);

	const handleLogout = async () => {
		setVisible(false);
		deleteCookie('authenticate', { path: '/', maxAge: 0 });
		axios.defaults.headers.common.Authorization = '';
		resetLinks();
		router.push('/register');
	};

	const handleDelete = async () => {
		setVisible(false);

		const data = await axios({ method: Method.DELETE, url: '/user/delete' })
			.then(res => res.data)
			.catch(err => {
				console.error(err?.message);
				return err.response?.data ?? { delete: false };
			});

		if (data.delete) {
			deleteCookie('authenticate', { path: '/', maxAge: 0 });
			axios.defaults.headers.common.Authorization = '';
			resetLinks();
			router.push('/');
		}
	};

	return (
		<nav className={styles.nav}>
			<Link href={'/'} >
				<Logo nameClass='main' />
			</Link>
			<h2>
				NJLinks
			</h2>
			<ul className={styles.list}>
				<button onClick={handleLogout}>
					<li>
						Logout
					</li>
				</button>
				<span>|</span>
				<button onClick={handleDelete}>
					<li>
						Delete User
					</li>
				</button>
			</ul>
			<button
				className={styles.button}
				onClick={() => setTimeout(() => setVisible(!visible))}
			><FaEllipsisH size={20} /></button>
			{
				visible
					? <ul ref={ref} className={styles.occult}>
							<button className={styles.link} onClick={handleLogout}>
								<FaRegCaretSquareRight size={18} />
								<li>
									Logout
								</li>
							</button>
							<button className={styles.link} onClick={handleDelete}>
								<FaTimesCircle size={18} />
								<li>
									Delete User
								</li>
							</button>
						</ul>
					: null
			}
		</nav>
	);
}
