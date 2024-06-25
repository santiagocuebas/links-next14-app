import type { MouseEventHandler } from 'react';
import type { ErrorProp } from '../types/props';
import { FaTimes } from 'react-icons/fa';
import styles from'../styles/ErrorBox.module.css';

export default function ErrorBox({ hide, errors }: ErrorProp) {
	const handleClick: MouseEventHandler<HTMLButtonElement> = e => {
		e.preventDefault();
		hide(null);
	}

  return (
    <div className={styles.error}>
      <div>
        <p>The following errors have been found:</p>
        <ul>
          {Object.entries(errors).map(([key, value]) => <li key={key}>{value}</li>)}
        </ul>
      </div>
      <button onClick={handleClick}>
        <FaTimes />
      </button>
    </div>
  );
}
