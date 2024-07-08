import type { ChildProp } from "@/lib/types/props";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import styles from '@/lib/styles/Layout.module.css';

export default async function RegisterLayout({ children }: Readonly<ChildProp>) {
  const token = cookies().get('authenticate');

	console.log(`Register token: ${token?.value}`);

  if (token) redirect('/dash');
  
  return (
    <div className={styles.main}>
      {children}
    </div>
  );
}
