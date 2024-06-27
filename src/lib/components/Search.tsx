import { FaSearch } from 'react-icons/fa';
import { Logo } from './index';
import { useLinksStore } from '../store';
import styles from'../styles/Search.module.css';

export default function Search() {
	const findLinks = useLinksStore(state => state.findLinks);

  return (
    <div className={styles.search}>
			<div>
				<FaSearch size={24} />
				<input type="text" onKeyUp={e => findLinks(e.currentTarget.value)} />
				<Logo nameClass='main' />
			</div>
		</div>
  );
}
