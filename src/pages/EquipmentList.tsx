/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { EQUIPMENT } from '../data';
import { Category } from '../types';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getProductStartingPrice } from '../lib/pricing';

export const EquipmentList: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') as Category | null;
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEquipment = useMemo(() => {
    return EQUIPMENT.filter(item => {
      if (item.hide) return false;
      const matchesCategory = activeCategory ? item.category === activeCategory : true;
      const itemName = t(`items.${item.id}.name`);
      const itemDesc = t(`items.${item.id}.desc`);
      const matchesSearch = itemName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           itemDesc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, t]);

  const categories: (Category | 'All')[] = ['All', 'Snowboard', 'Surfboard', 'Skateboard', 'Boat'];

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <header className="mb-12">
        <h1 className="text-5xl font-serif mb-6">{t('equipment.title')}</h1>
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  if (cat === 'All') {
                    searchParams.delete('category');
                  } else {
                    searchParams.set('category', cat);
                  }
                  setSearchParams(searchParams);
                }}
                className={`px-5 py-2 rounded-full text-xs uppercase tracking-widest font-medium transition-all ${
                  (cat === 'All' && !activeCategory) || activeCategory === cat
                    ? 'bg-brand-primary text-white'
                    : 'bg-[var(--card-bg)] border border-brand-border text-brand-subtle hover:border-brand-primary/30'
                }`}
              >
                {t(`homepage.categories.${cat.toLowerCase().replace(' ', '')}`)}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-subtle" />
            <input
              type="text"
              placeholder={t('equipment.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[var(--card-bg)] border border-brand-border rounded-full py-2 pl-12 pr-4 text-sm focus:outline-none focus:border-brand-primary transition-colors text-brand-deep"
            />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <AnimatePresence mode="popLayout">
          {filteredEquipment.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Link to={`/product/${item.id}`} className="group block">
                <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-6 bg-[var(--card-bg)] border border-brand-border shadow-none">
                  <img
                    src={item.image}
                    alt={t(`items.${item.id}.name`)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-[var(--nav-bg)]/90 backdrop-blur-sm px-3 py-1 rounded-sm text-[10px] uppercase tracking-widest font-bold text-brand-deep shadow-sm">
                    {t(`homepage.categories.${item.category.toLowerCase().replace(' ', '')}`)}
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-serif group-hover:text-brand-primary transition-colors">{t(`items.${item.id}.name`)}</h3>
                    <div className="flex flex-col items-end">
                      <span className="text-brand-primary font-serif text-lg font-medium">
                        €{getProductStartingPrice(item.id)}
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-brand-subtle">
                        {t('equipment.fromPrice')}
                      </span>
                    </div>
                  </div>
                  <p className="text-brand-subtle text-sm font-light line-clamp-2 leading-relaxed">
                    {t(`items.${item.id}.desc`)}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-brand-subtle group-hover:text-brand-deep transition-colors">
                    {t('common.viewDetails')}
                    <div className="h-px bg-brand-border flex-1 group-hover:bg-brand-deep transition-all" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredEquipment.length === 0 && (
        <div className="py-24 text-center">
          <div className="w-16 h-16 bg-[var(--card-bg)] rounded-full flex items-center justify-center mx-auto mb-6 text-brand-subtle/20">
            <Search className="w-8 h-8" />
          </div>
          <p className="text-brand-subtle font-light">{t('equipment.noResults')}</p>
          <button 
            onClick={() => { setSearchQuery(''); searchParams.delete('category'); setSearchParams(searchParams); }}
            className="mt-4 text-xs uppercase tracking-widest font-bold text-brand-primary hover:underline"
          >
            {t('equipment.clearFilters')}
          </button>
        </div>
      )}
    </div>
  );
};

