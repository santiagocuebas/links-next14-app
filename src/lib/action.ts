'use server';

import type { ILink, ResRegister } from "@/lib/types/global";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import axios from "@/lib/axios";

export async function getData(url: string): Promise<ResRegister | ILink[]> {
	const token = cookies().get('authenticate');

	return axios({ url, headers: { Authorization: token?.value } })
		.then(res => res.data)
		.catch(() => {
			cookies().delete('authenticate');
			redirect('/register');
		});
}
