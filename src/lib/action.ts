'use server';

import type { ResAuth } from "@/lib/types/global";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import axios from "@/lib/axios";

export async function getUserData(): Promise<ResAuth> {
	const token = cookies().get('authenticate');

	console.log(`Action token: ${token?.value}`);

	if (!token) redirect('/register');

	return axios({ url: '/user/userData', headers: { Authorization: token.value } })
		.then(res => res.data)
		.catch(() => {
			cookies().delete('authenticate');
			redirect('/register');
		});
}
