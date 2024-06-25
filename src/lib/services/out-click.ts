import type { MutableRefObject, Dispatch, SetStateAction } from "react";
import { useEffect } from "react";

export function useOutClick(
	ref: MutableRefObject<HTMLFormElement | HTMLUListElement | null>,
	setVisible: Dispatch<SetStateAction<boolean>>,
	resetLink?: () => void
) {
	useEffect(() => {
		function handleClick(e: MouseEvent) {
			const target = e.target as HTMLElement;

			if (ref.current && !ref.current.contains(target)) {
				setVisible(false);
				if (resetLink) resetLink();
			}
		}

		document.addEventListener('click', handleClick, false);

		return () => document.removeEventListener('click', handleClick, false);
	}, [ref, setVisible, resetLink]);
}
