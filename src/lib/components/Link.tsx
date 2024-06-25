import type { LinkProp } from '../types/props';
import { FaPlus } from 'react-icons/fa';
import { format } from 'timeago.js';
import styles from'../styles/Link.module.css';

export default function Link({ link, change }: LinkProp) {
  return (
    <div className={styles.link}>
      <button onClick={() => change(link)}>
        <FaPlus size={20} />
      </button>
      <h2>
        {link.title}
      </h2>
      <a href={link.url} target="_blank" rel="noreferrer" title={link.url}>
        {link.url}
      </a>
      <div>
        {link.description}
      </div>
      <p>
        {format(link.createdAt)}
      </p>
    </div>
  );
}
