import type { ChildProp } from "@/lib/types/props";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import styles from '@/lib/styles/Layout.module.css';

async function getData() {
  const token = cookies().get('authenticate');

  if (token) redirect('/dash');
}

export default async function RegisterLayout({ children }: Readonly<ChildProp>) {
  await getData();
  
  return (
    <div className={styles.main}>
      {children}
    </div>
  );
}
