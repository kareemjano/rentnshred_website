/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

export const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="text-6xl font-serif mb-8 leading-tight">
            {t('about.title')} <br />
            <span className="italic">{t('about.titleItalic')}</span>
          </h1>
          <p className="text-xl text-brand-gray font-light leading-relaxed">
            {t('about.intro')}
          </p>
        </motion.div>

        <section className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="rounded-3xl overflow-hidden shadow-xl aspect-[4/5]">
              <img 
                src="https://images.unsplash.com/photo-1517176103784-067645163969?auto=format&fit=crop&q=80&w=800" 
                alt="Nature adventure"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h2 className="text-3xl font-serif mb-6 italic">{t('about.ideaTitle')}</h2>
              <p className="text-brand-gray font-light mb-6 leading-relaxed">
                {t('about.ideaText1')}
              </p>
              <p className="text-brand-gray font-light leading-relaxed">
                {t('about.ideaText2')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
            <div className="md:order-2 rounded-3xl overflow-hidden shadow-xl aspect-[4/5]">
              <img 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800" 
                alt="Our values"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="md:order-1">
              <h2 className="text-3xl font-serif mb-6 italic">{t('about.valuesTitle')}</h2>
              <p className="text-brand-gray font-light mb-6 leading-relaxed">
                {t('about.valuesText1')}
              </p>
              <p className="text-brand-gray font-light leading-relaxed">
                {t('about.valuesText2')}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-24 text-center border-t border-brand-border pt-16">
          <h2 className="text-4xl font-serif mb-8">{t('about.ctaTitle')}</h2>
          <p className="text-brand-gray font-light max-w-lg mx-auto mb-10">
            {t('about.ctaText')}
          </p>
          <div className="flex justify-center gap-4">
            <a href="/equipment" className="btn-primary">{t('about.ctaButton')}</a>
          </div>
        </section>
      </div>
    </div>
  );
};
