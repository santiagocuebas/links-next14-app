import type { ReactNode } from "react";
import type { ILink, IKeys } from "./global";

export interface ChildProp {
	children: ReactNode;
}

export interface MetadataProp {
	params: object;
	searchParams: IKeys<string | string[] | undefined>
}

export interface ErrorProp {
	hide: Dispatch<SetStateAction<null>>;
	errors: IKeys<string>;
}

export interface FormProp extends ChildProp {
	action: string;
	method: string;
	errors: Dispatch<SetStateAction<null>>;
}

export interface FormLinkProp {
	setVisible: Dispatch<SetStateAction<boolean>>;
}

export interface LinkProp {
	link: ILink;
	change: (value: ILink) => void;
}
