import type { ILinksStore } from './types/global';
import { create } from 'zustand';

export const useLinksStore = create<ILinksStore>(set => ({
  rawLinks: [],
  links: [],
  link: null,
  search: '',
  setLink: link => set({ link }),
  resetLink: () => set({ link: null }),
  addLink: link => set(state => ({ rawLinks: [link, ...state.rawLinks] })),
  editLink: (id, partialLink) => set(state => {
    const reloadLinks = state.rawLinks.map(link => {
      return (link.id === id) ? { ...link, ...partialLink } : link;
    });

    return ({ rawLinks: reloadLinks });
  }),
  removeLink: id => set(state => {
    return ({ rawLinks: state.rawLinks.filter(link => link.id !== id) });
  }),
  findLinks: value => set(state => {
    const links = state.rawLinks.filter(link => value === '' ||
      link.title.toLowerCase().includes(value));

    return ({ links, search: value });
  }),
  actLinks: () => set(state => {
    const links = state.rawLinks.filter(link => state.search === '' ||
      link.title.toLowerCase().includes(state.search));

		return ({ links });
  }),
  resetLinks: () => set({ rawLinks: [], links: [] })
}));
