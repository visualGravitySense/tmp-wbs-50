'use client';

import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import { Sun, Moon, Menu, X, CalendarCheck, Eye } from 'lucide-react';
import { LogoOpstarProfit } from './LogoOpstarProfit';
import SiteSearch from './SiteSearch';
import { usePathname } from 'next/navigation';
import { useIsLivePreview } from 'next-sanity/hooks';
import {
  applyColorSchemeFromStorage,
  PREFERS_DARK_MEDIA,
  readStoredColorScheme,
  writeStoredColorScheme,
} from '@/lib/theme-persistence';
import { Container, BrandVibrantButton, WhiteButton } from '@/components/ui';

interface NavLink {
  name: string;
  href: string;
}

interface HeaderData {
  logo?: string;
  navLinks?: NavLink[];
  contactButtonText?: string;
  mobileContactButtonText?: string;
  contactButtonLink?: string;
}

interface HeaderProps {
  data?: HeaderData;
}

const DEFAULT_NAV_LINKS: NavLink[] = [
  { name: 'Home', href: '/' },
  { name: 'Training', href: '/koolitus' },
  { name: 'Product', href: '/product' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
]

export default function Header({ data }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const isLivePreview = useIsLivePreview();
  const linkPrefetch = isLivePreview ? false : undefined;

  // Следим за скроллом для изменения стиля хедера
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);



  useLayoutEffect(() => {
    applyColorSchemeFromStorage();
    setIsDark(document.documentElement.classList.contains('dark'));
  }, [pathname]);

  // Системная тёмная/светлая тема: следуем ей, пока пользователь не выбрал тему вручную (localStorage).
  useEffect(() => {
    const mq = window.matchMedia(PREFERS_DARK_MEDIA);
    const onSystemThemeChange = () => {
      if (readStoredColorScheme() != null) return;
      applyColorSchemeFromStorage();
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    mq.addEventListener('change', onSystemThemeChange);
    return () => mq.removeEventListener('change', onSystemThemeChange);
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.add('disable-transitions');
    
    const nextDark = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', nextDark);
    writeStoredColorScheme(nextDark ? 'dark' : 'light');
    setIsDark(nextDark);

    // Remove the transition block in the next frame tick to maintain high hover responsiveness
    window.setTimeout(() => {
      document.documentElement.classList.remove('disable-transitions');
    }, 0);
  };

  const navLinks = data?.navLinks?.length ? data.navLinks : DEFAULT_NAV_LINKS;
  const registerHref = data?.contactButtonLink?.trim() || '/register'
  const contactButtonText = data?.contactButtonText?.trim() || 'Registreeri'
  const mobileContactButtonText = data?.mobileContactButtonText?.trim() || contactButtonText

  return (
    <>
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-[100] w-full max-w-full overflow-x-hidden transition-all duration-400 ease-in-out ${
      scrolled 
        ? `py-3 backdrop-blur-[12px] border-b ${isDark ? 'border-white/10' : 'border-black/10'} shadow-sm` 
        : 'py-3 sm:py-4 bg-transparent'
    }`}
    style={{
      backgroundColor: scrolled ? (isDark ? 'rgba(28, 27, 23, 0.8)' : 'rgba(249, 250, 251, 0.8)') : 'transparent'
    }}>
      <Container size="full" className="flex min-w-0 max-w-[1536px] items-center justify-between gap-2 px-4 sm:gap-3 sm:px-6 lg:gap-4 lg:px-10 xl:px-14">
        
        {/* Logo */}
        <Link
          href="/"
          prefetch={linkPrefetch}
          className="group min-w-0 max-w-[62%] shrink cursor-pointer rounded-md outline-none [-webkit-tap-highlight-color:transparent] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/35 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:max-w-[68%] lg:max-w-none lg:shrink-0"
          aria-label={data?.logo || 'Site Name'}
          onClick={() => {
            if (pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}
        >
          <div className="transform transition-all duration-300 group-hover:scale-[1.02]">
            <LogoOpstarProfit variant="horizontal" theme={isDark ? 'dark' : 'light'} scrolled={scrolled} />
          </div>
        </Link>

        {/* Desktop Navigation — hidden below lg */}
        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-5 px-2 xl:gap-10 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-[13px] font-bold tracking-wide transition-all duration-400 relative whitespace-nowrap ${
                scrolled 
                  ? 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]' 
                  : isDark ? 'text-white hover:text-white/80' : 'text-[#1C1B17] hover:text-[#1C1B17]/80'
              }`}
              style={{
                fontFamily: 'Gill Sans, Gill Sans MT, Calibri, sans-serif',
                textShadow: scrolled ? 'none' : (isDark ? '0 1px 3px rgba(0,0,0,0.3)' : '0 1px 3px rgba(255,255,255,0.3)'),
                borderBottom: pathname === link.href ? '2px solid #008DD2' : 'none',
                paddingBottom: pathname === link.href ? '6px' : '0'
              }}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex shrink-0 items-center justify-end gap-1.5 sm:gap-2.5">
          <SiteSearch />
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full border bg-white/90 backdrop-blur-sm border-slate-200 shadow-sm dark:bg-slate-900/40 dark:border-white/10 hover:bg-white dark:hover:bg-slate-900/60 transition-all active:scale-90"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-blue-600" />}
          </button>

          {/* Register CTA (was contact) */}
          {registerHref.startsWith('/') ? (
            <Link
              href={registerHref}
              prefetch={linkPrefetch}
              className={`hidden lg:inline-flex items-center justify-center px-5 lg:px-6 py-2.5 text-[11px] lg:text-[12px] font-black uppercase tracking-[0.16em] lg:tracking-widest rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all duration-400 shadow-lg ${
                isDark
                  ? scrolled
                    ? 'bg-[#008DD2] text-white hover:bg-[#0077BB] shadow-[#008DD2]/20'
                    : 'border border-white/30 bg-transparent text-white shadow-black/5 hover:border-white/50 hover:bg-white/10'
                  : scrolled
                    ? 'bg-white text-black shadow-black/5 hover:bg-gray-100'
                    : 'bg-white text-black shadow-black/5'
              }`}
            >
              {contactButtonText}
            </Link>
          ) : (
            <a
              href={registerHref}
              className={`hidden lg:block px-5 lg:px-6 py-2.5 text-[11px] lg:text-[12px] font-black uppercase tracking-[0.16em] lg:tracking-widest rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all duration-400 shadow-lg ${
                isDark
                  ? scrolled
                    ? 'bg-[#008DD2] text-white hover:bg-[#0077BB] shadow-[#008DD2]/20'
                    : 'border border-white/30 bg-transparent text-white shadow-black/5 hover:border-white/50 hover:bg-white/10'
                  : scrolled
                    ? 'bg-white text-black shadow-black/5 hover:bg-gray-100'
                    : 'bg-white text-black shadow-black/5'
              }`}
            >
              {contactButtonText}
            </a>
          )}

          {/* Mobile Menu Toggle */}
          <button
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            className="lg:hidden p-2.5 rounded-full border border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-primary)] transition-all hover:bg-[var(--bg-secondary)] active:scale-95"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>
    </header>

      <div
        className={`fixed inset-0 z-[95] lg:hidden transition-all duration-400 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isOpen}
        inert={!isOpen ? true : undefined}
      >
        <div
          className="absolute inset-0 bg-[#0a1020]/25 backdrop-blur-[6px] transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
        
        <div className="absolute inset-x-4 top-24 max-w-md mx-auto z-10">
          <nav className={`w-full overflow-hidden rounded-[2.25rem] border p-6 sm:p-8 flex flex-col shadow-[0_30px_70px_-15px_rgba(0,0,0,0.18)] transition-all duration-400 transform border-black/5 dark:border-white/10 bg-white/95 dark:bg-[rgba(20,20,25,0.92)] text-black dark:text-white shadow-slate-300/40 dark:shadow-black/40 backdrop-blur-xl ${
            isOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 -translate-y-4 opacity-0'
          }`}
          >
            {/* Menu Links */}
            <div className="flex flex-col mb-8 mt-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="py-3.5 text-lg font-bold tracking-tight transition-all border-b border-black/5 dark:border-white/5 hover:text-black dark:hover:text-white/80"
                  style={{ 
                    color: isDark ? '#ffffff' : '#1c1b17',
                    fontFamily: 'Gill Sans, Gill Sans MT, Calibri, sans-serif' 
                  }}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Social Icons */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full transition-all bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10"
                style={{ color: isDark ? '#ffffff' : '#1c1b17' }}
                aria-label="Facebook"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full transition-all bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10"
                style={{ color: isDark ? '#ffffff' : '#1c1b17' }}
                aria-label="Instagram"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full transition-all bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10"
                style={{ color: isDark ? '#ffffff' : '#1c1b17' }}
                aria-label="LinkedIn"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3">
              <BrandVibrantButton 
                href="/kontakt" 
                icon={CalendarCheck}
                onClick={() => setIsOpen(false)}
                className="w-full"
              >
                Broneeri kõne
              </BrandVibrantButton>
              
              <WhiteButton 
                href={registerHref} 
                icon={Eye}
                onClick={() => setIsOpen(false)}
                className="w-full"
              >
                {mobileContactButtonText}
              </WhiteButton>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
