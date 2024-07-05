import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import styles from '@/lib/styles/Layout.module.css';

export default async function Home() {
  const token = cookies().get('authenticate');

	if (token) redirect('/dash');
	
	return (
    <main className={`${styles.main} ${styles.image}`}>
      <div className={styles.index}>
        <h1>
          NJLinks
        </h1>
        <h2>
          <i>Store your favorite Website&apos;s Links</i>
        </h2>
        <Link href={'/register'}>
          Create a Link!
        </Link>
      </div>
    </main>
  );
}
