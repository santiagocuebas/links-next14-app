import { FaGithub } from 'react-icons/fa';
import styles from'../styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
			<p>imgShare.io | &#169; Copyright 2024</p>
			<a href="https://github.com/santiagocuebas?tab=repositories" target="_blank" rel="noreferrer">
				<FaGithub size={32} />
			</a>
		</footer>
  );
}
