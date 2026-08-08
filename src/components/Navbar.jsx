import { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import { NAV_ITEMS, NAV_IDS, SCROLL_PROPS } from './nav/navItems';
import NavCapsule from './nav/NavCapsule';
import ThemeSwitcher from './nav/ThemeSwitcher';
import useScrollSpy from '../hooks/useScrollSpy';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const active = useScrollSpy(NAV_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Stop the page scrolling behind the mobile sheet.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[9999] transition-colors duration-300 ${
          scrolled ? 'nav-scrolled' : ''
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3 md:px-8">
          <Link
            to="home"
            {...SCROLL_PROPS}
            tabIndex={0}
            className="cursor-pointer font-display text-lg font-semibold tracking-tight text-bone transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            MB<span className="text-accent">.</span>
          </Link>

          <div className="hidden lg:block">
            <NavCapsule active={active} />
          </div>

          <div className="hidden lg:block">
            <ThemeSwitcher />
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <ThemeSwitcher />
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-full border border-bone/15 text-bone transition-colors hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <span
                className={`h-px w-4 bg-current transition-transform duration-300 ${
                  menuOpen ? 'translate-y-[3.5px] rotate-45' : ''
                }`}
              />
              <span
                className={`h-px w-4 bg-current transition-transform duration-300 ${
                  menuOpen ? '-translate-y-[3.5px] -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[9998] bg-void/95 pt-24 backdrop-blur-md lg:hidden">
          <ul className="mx-auto max-w-md px-8">
            {NAV_ITEMS.map((item, i) => (
              <li key={item.id} className="border-b border-bone/10">
                <Link
                  to={item.id}
                  {...SCROLL_PROPS}
                  onClick={() => setMenuOpen(false)}
                  className={`flex cursor-pointer items-baseline gap-4 py-5 transition-colors ${
                    active === item.id ? 'text-accent' : 'text-bone'
                  }`}
                >
                  <span className="font-mono text-[10px] tabular-nums text-fog">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-2xl font-semibold tracking-tight">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
