'use server';

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function existsToken() {
	const token = cookies().get('authenticate');

	if (token) redirect('/dash');
}

export async function notExistsToken() {
	const token = cookies().get('authenticate');

	if (!token) throw redirect('/register');
}
