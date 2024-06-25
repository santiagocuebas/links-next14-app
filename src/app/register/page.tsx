'use client';

import type { ResponseRegister } from '@/lib/types/global';
import type { MetadataProp } from '@/lib/types/props';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FaGithub } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';
import axios from '@/lib/axios';
import { GITHUB_ACCESS, GOOGLE_ID } from '@/lib/config';
import { loadUser } from '@/lib/services';
import { useUserStore } from "@/lib/store";
import styles from '@/lib/styles/Register.module.css';
import { Method } from '@/lib/types/enums';

export default function RegisterPage(metadata: MetadataProp) {
	const { searchParams } = metadata;
	const router = useRouter();
	const setUser = useUserStore(state => state.setUser);

	async function getUserData(url: string) {
		const data: ResponseRegister | null = await axios({ method: Method.POST, url })
			.then(res => res.data)
			.catch(err => {
				console.log(err?.message);
				return null;
			});

		if (data !== null) {
			loadUser(data, setUser);
			router.push('/dash');
		}
	}

	async function handleGoogle() {
		const state = crypto
			.getRandomValues(new Uint8Array(16))
			.reduce((val, acc) => val += acc.toString(16), '');
		
		localStorage.setItem("latestCSRFToken", state);

		const link = `https://accounts.google.com/o/oauth2/auth?scope=${'openid email'}&response_type=code&access_type=offline&state=${state}&redirect_uri=${location.origin}/register?type=google&client_id=${GOOGLE_ID}`;

		window.location.assign(link);
	};
  
	async function handleGithub() {
		window.location.assign(GITHUB_ACCESS + `&redirect_uri=${location.origin}/register?type=github`);
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
			<svg className={styles.icon} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
				<rect />
				<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" x='18%' y='18%'>
					<path d="M12.58,38a12.63,12.63,0,0,1-8.83-3.63A12.36,12.36,0,0,1,3.6,16.79l2.51-2.56a2,2,0,0,1,2.86,0A2,2,0,0,1,9,17L6.49,19.57a8.41,8.41,0,0,0,.1,12,8.58,8.58,0,0,0,6,2.48h0.05a8.46,8.46,0,0,0,6-2.54l2.51-2.57a2,2,0,0,1,2.86,0,2,2,0,0,1,0,2.82l-2.52,2.6A12.49,12.49,0,0,1,12.66,38H12.58Z" />
					<path d="M30.44,24.38A2,2,0,0,1,29,23.82,2,2,0,0,1,29,21l2.52-2.56a8.41,8.41,0,0,0-.1-12,8.58,8.58,0,0,0-6-2.48H25.37a8.47,8.47,0,0,0-6,2.55L16.86,9.12a2,2,0,0,1-2.86,0,2,2,0,0,1,0-2.82l2.52-2.6A12.49,12.49,0,0,1,25.35,0h0.07a12.63,12.63,0,0,1,8.83,3.63,12.36,12.36,0,0,1,.15,17.58l-2.51,2.56A2,2,0,0,1,30.44,24.38Z" />
					<path d="M14.06,26a2,2,0,0,1-1.42-.58,2,2,0,0,1,0-2.83l9.87-9.9a2,2,0,0,1,2.86,0,2,2,0,0,1,0,2.83l-9.87,9.9A2,2,0,0,1,14.06,26Z" />
				</svg>
			</svg>
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
