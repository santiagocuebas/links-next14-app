'use client';

import type { ResRegister } from '@/lib/types/global';
import type { MetadataProp } from '@/lib/types/props';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FaGithub } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';
import axios from '@/lib/axios';
import { GITHUB_URI, GOOGLE_URI } from '@/lib/config';
import { Logo } from '@/lib/components';
import { loadToken } from '@/lib/services';
import styles from '@/lib/styles/Register.module.css';
import { Method } from '@/lib/types/enums';

export default function RegisterPage(metadata: MetadataProp) {
	const { searchParams } = metadata;
	const router = useRouter();

	async function getUserData(url: string) {
		const data: ResRegister | null = await axios({ method: Method.POST, url })
			.then(res => res.data)
			.catch(err => {
				console.log(err?.message);
				return null;
			});

		if (data !== null) {
			loadToken(data.token);
			router.push('/dash');
		}
	}

	async function handleGoogle() {
		const state = crypto
			.getRandomValues(new Uint8Array(16))
			.reduce((val, acc) => val += acc.toString(16), '');
		
		localStorage.setItem("latestCSRFToken", state);

		window.location.assign(GOOGLE_URI + `&state=${state}&redirect_uri=${location.origin}/register?type=google`);
	};
  
	async function handleGithub() {
		window.location.assign(GITHUB_URI + `&redirect_uri=${location.origin}/register?type=github`);
	};

	useEffect(() => {
		if (searchParams?.type === 'google' &&
			searchParams.state === localStorage.getItem("latestCSRFToken")) {
			localStorage.removeItem("latestCSRFToken");

			getUserData('/auth/googleRegister?code=' + searchParams.code);
		}
	}, []);

	useEffect(() => {
		if (searchParams?.type === 'github' && searchParams.code) {
			getUserData('/auth/githubRegister?code=' + searchParams.code);
		}
	}, []);

	return (
		<div className={styles.register}>
			<Logo nameClass='register' />
			<h2>
        Register to FavLinks!
      </h2>
			<div>
        Log in with your favorite social provider to get started:
			</div>
			<span>
				<button id="google" onClick={handleGoogle}>
					<FcGoogle width={16} height={16} />
					Continue with Google
				</button>
				<button id="github" onClick={handleGithub}>
					<FaGithub width={16} height={16} />
					Continue with Github
				</button>
			</span>
		</div>
	);
}
