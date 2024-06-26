import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';

export interface IKeys<T> {
	[index: string]: T;
}

export interface IUser {
	id: string;
	username: string;
	email: string;
	githubId: number;
	googleId: string;
	createdAt: Date;
}

export interface ILink {
	id: string;
	authorId: string;
	title: string;
	url: string;
	description: string;
	createdAt: Date;
}

export type PartialLink = Pick<ILink, 'title' | 'url' | 'description'>

export interface IUserStore {
	user: IUser |	null;
	setUser: (user: IUser) => void;
	resetUser: () => void;
}

export interface ILinksStore {
	rawLinks: ILink[];
	links: ILink[];
	link: ILink | null;
	search: string;
	setLink: (link: ILink) => void;
	resetLink: () => void;
	addLink: (link: ILink) => void;
	editLink: (id: string, link: PartialLink) => void;
	removeLink: (id: string) => void;
	findLinks: (value: string) => void;
	actLinks: () => void;
	resetLinks: () => void;
}

export interface IData {
	message: string;
	user: IUser;
	links: ILink[];
}

export interface ResLink {
	message?: string;
	errors?: IKeys<string>;
	success?: boolean;
	link?: ILink;
	edit?: PartialLink;
	delete?: boolean;
}

export interface ResRegister {
	message?: string;
	errors?: IKeys<string>;
	user: IUser;
	token: string;
}
