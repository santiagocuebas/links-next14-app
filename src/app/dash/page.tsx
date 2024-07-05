import type { ResAuth } from "@/lib/types/global";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import axios from "@/lib/axios";
import { Dash } from '@/lib/components';

async function getUserData(): Promise<ResAuth> {
	'use server';

  const token = cookies().get('authenticate');

	if (!token) throw redirect('/register');

	return axios({ url: '/user/userData', headers: { Authorization: token.value } })
		.then(res => res.data)
		.catch(() => {
			cookies().delete('authenticate');
			throw redirect('/register');
		});
}

export default async function DashPage() {
	const data = await getUserData();
	
	return <Dash data={data} />;
}
