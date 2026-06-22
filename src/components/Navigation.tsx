/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { useTranslation } from 'react-i18next';
import { Globe, Instagram } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { SHOW_ABOUT_PAGE, HIDE_CONTACT_PAGE } from '../data';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  
  const navItems = [
    { name: t('navbar.home'), path: '/' },
    { name: t('navbar.equipment'), path: '/equipment' },
    ...(SHOW_ABOUT_PAGE ? [{ name: t('navbar.about'), path: '/about' }] : []),
    ...(!HIDE_CONTACT_PAGE ? [{ name: t('navbar.contact'), path: '/contact' }] : []),
  ];

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'de' : 'en';
    i18n.changeLanguage(nextLang);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--nav-bg)] border-b border-brand-border h-[80px] px-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <Logo className="h-10 w-10 text-brand-deep" />
        </Link>
        
        <div className="flex items-center gap-6 h-full">
          <div className="hidden md:flex items-center gap-8 h-full">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="h-4 w-px bg-brand-border mx-2 hidden md:block" />

          <div className="flex items-center gap-3">
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-gray hover:text-brand-primary transition-colors py-2 px-3 rounded-md hover:bg-brand-bg h-10 border border-brand-border"
              title="Switch Language"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{i18n.language.toUpperCase().split('-')[0]}</span>
            </button>

            <ThemeToggle />

            <a 
              href="https://www.instagram.com/rentnshred/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center p-2 rounded-full hover:bg-brand-bg transition-colors h-10 w-10 border border-brand-border text-brand-gray hover:text-brand-primary"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-[var(--card-bg)] border-t border-brand-border h-[60px] px-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        <div className="text-[12px] text-brand-subtle">
          © {new Date().getFullYear()} {t('common.brandName')}. {t('footer.rights')}
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex gap-6">
            <Link to="/impressum" className="text-[12px] text-brand-subtle hover:text-brand-primary">{t('legal.impressum')}</Link>
            <Link to="/privacy" className="text-[12px] text-brand-subtle hover:text-brand-primary">{t('legal.privacy')}</Link>
            <Link to="/terms" className="text-[12px] text-brand-subtle hover:text-brand-primary">{t('legal.terms')}</Link>
          </div>
          <div className="h-4 w-px bg-brand-border" />
          <a 
            href="https://www.instagram.com/rentnshred/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-brand-subtle hover:text-brand-primary transition-colors flex items-center"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};

