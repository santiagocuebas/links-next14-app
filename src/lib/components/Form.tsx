'use client';

import type { FormEvent } from 'react';
import type { IKeys, ResLink } from '../types/global';
import type { FormProp } from '../types/props';
import { useRef, useState } from 'react';
import { ErrorBox } from './index';
import { handleForm, useOutClick } from '../services';
import { useLinksStore } from '../store';
import styles from'../styles/Form.module.css';
import { Link, Method } from '../types/enums';

export default function FormLink({ setVisible }: FormProp) {
	const ref = useRef<HTMLFormElement | null>(null);
	const link = useLinksStore(state => state.link);
	const resetLink = useLinksStore(state => state.resetLink);
	const addLink = useLinksStore(state => state.addLink);
	const editLink = useLinksStore(state => state.editLink);
	const removeLink = useLinksStore(state => state.removeLink);
	const actLinks = useLinksStore(state => state.actLinks);
	const [props, setProps] = useState<IKeys<string>>({ action: Link.ADD, method: Method.POST });
	const [errors, setErrors] = useState<IKeys<string> | null>(null);

	useOutClick(ref, setVisible, resetLink);
	
	function handleProps(action: string, method: string) {
		setProps({ action, method });
	}

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const data: ResLink = await handleForm(e.currentTarget);

		if (data.message) console.log(data.message); 
		else if (data.errors) setErrors(data.errors as never);
		else if (data.success) {
			if (data.link) addLink(data.link);
			else if (data.delete && link) removeLink(link.id);
			else if (data.edit && link) editLink(link.id, data.edit);

			resetLink();
			setErrors(null);
			actLinks();
			setVisible(false);
		}
	}
	
	return (
		<form
			ref={ref}
			className={styles.form}
			action={props.action}
			method={props.method}
			onSubmit={handleSubmit}
		>
			{errors ? <ErrorBox hide={setErrors} errors={errors} /> : null}
			<input
				type='text' name='title' placeholder='Title' defaultValue={link?.title} />
			<input
				type='url' name='url' placeholder='URL' defaultValue={link?.url} />
			<textarea name="description" placeholder="Description" rows={5}  spellCheck="false" defaultValue={link?.description}></textarea>
			{
				link 
					? <>
							<button
								className={styles.delete}
								onClick={() => handleProps(Link.DELETE + link?.id, Method.DELETE)}
							>Delete</button>
							<button
								className={styles.edit}
								onClick={() => handleProps(Link.EDIT + link?.id, Method.PUT)}
							>Edit</button>
						</>
					: <button
							className={styles.add}
							onClick={() => handleProps(Link.ADD, Method.POST)}
						>Add Link</button>
			}
		</form>
	);
}
