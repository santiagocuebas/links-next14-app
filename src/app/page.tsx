import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import styles from '@/lib/styles/Home.module.css';
import main from '@/lib/styles/Layout.module.css';

async function getData() {
  const token = cookies().get('authenticate');

	if (token) redirect('/dash');
}

export default async function Home() {
  await getData();
	
	return (
    <main className={`${main.main} ${main.image}`}>
      <div className={styles.index}>
        <h1>
          Favorite Links
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
