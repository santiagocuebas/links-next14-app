'use server';

import type { ILink, ResponseRegister } from "@/lib/types/global";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import axios from "@/lib/axios";

export async function getUserData(): Promise<ResponseRegister & { links: ILink[] }> {
	const token = cookies().get('authenticate');

	if (!token) throw redirect('/register');

	return axios({ url: '/userData', headers: { Authorization: token.value } })
		.then(res => res.data)
		.catch(() => {
			cookies().delete('authenticate');
			throw redirect('/register');
		});
}
