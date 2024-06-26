import type { ReactNode } from "react";
import type { ILink, IKeys } from "./global";

export interface ChildProp {
	children: ReactNode;
}

export interface ErrorProp {
	hide: Dispatch<SetStateAction<null>>;
	errors: IKeys<string>;
}

export interface FormProp {
	setVisible: Dispatch<SetStateAction<boolean>>;
}

export interface LinkProp {
	link: ILink;
	change: (value: ILink) => void;
}
