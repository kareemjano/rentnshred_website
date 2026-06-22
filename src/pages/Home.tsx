/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
// import { Logo } from '../components/Logo'; // Logo is not used in the Home component itself anymore as per the sidebar design but I can keep it if needed
import { useTranslation } from 'react-i18next';
import { getProductStartingPrice } from '../lib/pricing';
import { EQUIPMENT, SHOW_ABOUT_PAGE } from '../data';

export const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-[80px]">
      <div className="sidebar-layout">
        {/* Sidebar */}
        <aside className="sidebar-panel">
          <div>
            <h1 className="text-[42px] font-serif leading-[1.1] text-brand-deep mb-5">
              {t('homepage.hero.title')}<br />
              <span className="italic">{t('homepage.hero.titleItalic')}</span>
            </h1>
            <p className="text-[16px] leading-[1.6] text-brand-gray mb-8">
              {t('homepage.hero.description')}
            </p>
            <div className="flex gap-3">
              <Link to="/equipment" className="btn-primary">
                {t('homepage.hero.browse')}
              </Link>
              {SHOW_ABOUT_PAGE && (
                <Link to="/about" className="btn-secondary">
                  {t('homepage.hero.howItWorks')}
                </Link>
              )}
            </div>
          </div>
          
          <div className="mt-10">
            <div className="text-[11px] uppercase tracking-widest text-brand-subtle mb-4 font-semibold">
              {t('homepage.categories.featured')}
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="category-pill">{t('homepage.categories.snowboard')}</span>
              <span className="category-pill">{t('homepage.categories.surfboard')}</span>
              <span className="category-pill">{t('homepage.categories.skateboard')}</span>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="content-panel">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
            {EQUIPMENT.filter(item => !item.hide).map((item, idx) => (
              <Link 
                key={idx} 
                to={`/product/${item.id}`} 
                className="card flex flex-col justify-between group hover:border-brand-primary/30 transition-all duration-300 block text-left"
              >
                <div>
                  <div className="aspect-[2/3] bg-brand-bg rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={t(`items.${item.id}.name`)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h3 className="text-[16px] font-semibold text-brand-deep mb-1 font-sans group-hover:text-brand-primary transition-colors">{t(`items.${item.id}.name`)}</h3>
                    <p className="text-[13px] text-brand-subtle leading-relaxed mb-3 line-clamp-2">{t(`items.${item.id}.desc`)}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-brand-bg">
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-brand-primary">€{getProductStartingPrice(item.id)}</span>
                    <span className="text-[9px] uppercase tracking-widest text-brand-subtle font-semibold">{t('equipment.fromPrice')}</span>
                  </div>
                  <span className="text-[12px] text-brand-primary font-semibold group-hover:underline">{t('common.viewDetails')}</span>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

