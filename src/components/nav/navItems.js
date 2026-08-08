/**
 * Nav targets. Education is deliberately absent — eight items is too many for a
 * top bar, and it is the section a visitor is least likely to jump to.
 */
export const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'startup', label: 'Nexa Home' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Work' },
  { id: 'contact', label: 'Contact' },
];

export const NAV_IDS = NAV_ITEMS.map((item) => item.id);

/** Shared scroll behaviour so every variant lands sections identically. */
export const SCROLL_PROPS = { smooth: true, duration: 600, offset: -70 };
